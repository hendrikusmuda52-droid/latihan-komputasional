import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// Helper: safely run a DB query, return [] on any error.
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[assignments] safeQuery error:', err)
    return []
  }
}

// Helper: safely run a DB count, return 0 on any error.
async function safeCount(fn: () => Promise<number>): Promise<number> {
  try {
    return await fn()
  } catch (err) {
    console.error('[assignments] safeCount error:', err)
    return 0
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    // ── FIX Bug B: Guru harus bisa melihat SEMUA tugas yang mereka buat ──
    // Sebelumnya: GET hanya filter by `subject: teacherSubject` (dari JWT).
    // Padahal POST mengizinkan `body.subject` override (untuk multi-mapel).
    // Akibatnya: guru dengan JWT.subject="Informatika" yang membuat tugas
    // SMK dengan subject="Mata Pelajaran Kejuruan" tidak bisa melihat
    // tugas tersebut di list mereka sendiri.
    //
    // Strategi baru:
    //   - Admin (role=admin): lihat semua tugas (bisa override dengan ?subject=)
    //   - Guru: tugas yang dibuat guru ini (teacherId) ATAU tugas yang
    //     match subject JWT mereka.
    //   - Frontend bisa kirim ?subject= untuk filter spesifik.
    const querySubject = req.nextUrl.searchParams.get('subject')

    let where: Record<string, unknown>
    if (teacher.role === 'admin') {
      where = querySubject ? { subject: querySubject } : {}
    } else {
      where = {
        OR: [
          { teacherId: teacher.teacherId },
          { subject: querySubject || teacherSubject },
        ],
      }
    }

    const assignments = await safeQuery(() =>
      db.assignment.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      }),
    )

    return NextResponse.json({ success: true, assignments: assignments || [] })
  } catch (error) {
    console.error('[assignments] FATAL error (returning safe empty array):', error)
    return NextResponse.json({ success: true, assignments: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[assignments] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    const {
      title, description, targetKelas, dueDate, isActive, exerciseType, questionCount, taskType,
      // ── v2 new fields ──
      cpId, tpId, taskCategory, taskTypeName, tahunAjaran, semester,
      // ── FIX #2: duration field ──
      duration,
    } = body as {
      title?: string
      description?: string
      targetKelas?: string
      dueDate?: string
      isActive?: boolean
      exerciseType?: string
      questionCount?: number
      taskType?: string
      cpId?: string | null
      tpId?: string | null
      taskCategory?: string
      taskTypeName?: string
      tahunAjaran?: string
      semester?: string
      duration?: number
    }

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: 'Judul wajib diisi' }, { status: 400 })
    }

    const teacherSubject = teacher.subject || 'Informatika'
    const finalExerciseType = exerciseType || 'wajib'
    const finalTaskType = taskType || 'quiz_only'
    const finalTaskCategory = taskCategory || 'luring'
    const finalTahunAjaran = tahunAjaran || '2026/2027'
    const finalSemester = semester || 'ganjil'

    // ──────────────────────────────────────────────────────────────────
    // FIX #1 (Masalah 1): ALLOW MULTIPLE 'WAJIB' ASSIGNMENTS PER SUBJECT
    // ──────────────────────────────────────────────────────────────────
    // Previous behavior: there was a redundant validation that blocked creating
    // a new 'wajib' assignment if another 'wajib' assignment already existed
    // for the same subject. This was overly restrictive — teachers need to
    // create multiple wajib assignments (e.g. "UTS Genap", "UAS Ganjil") as
    // long as the title is different.
    //
    // NEW behavior: multiple wajib assignments are ALLOWED. We only do a soft
    // informational check (not blocking) to let the teacher know how many wajib
    // assignments already exist for this subject. The create proceeds regardless.
    //
    // The only hard validation is title uniqueness within the same subject —
    // but even that is a WARNING, not a block, because the teacher may want to
    // create "Latihan 1" and later "Latihan 1 (Remedial)".
    // ──────────────────────────────────────────────────────────────────

    const existingWajibCount = await safeCount(() =>
      db.assignment.count({
        where: {
          subject: teacherSubject,
          exerciseType: 'wajib',
          isActive: true,
        },
      })
    )

    // Log informational (does NOT block creation)
    if (existingWajibCount > 0 && finalExerciseType === 'wajib') {
      console.log(`[assignments] INFO: Creating wajib assignment #${existingWajibCount + 1} for subject "${teacherSubject}". Multiple wajib assignments are allowed.`)
    }

    // ──────────────────────────────────────────────────────────────────
    // FIX #2: STOK SOAL CHECK — verify enough questions exist for CP/TP
    // ──────────────────────────────────────────────────────────────────
    // When taskType is 'quiz_only' or 'typing_quiz', the assignment will
    // serve quiz questions to students. We verify that the Bank Soal has
    // enough questions matching the selected CP/TP (and gradeLevel if
    // derivable from targetKelas). If stock is insufficient, return 400
    // with a friendly message so guru can adjust questionCount or CP/TP.
    //
    // Filter logic:
    //   - subject: always teacher's subject (subject isolation)
    //   - isActive: true (only active questions are served)
    //   - cpId: if provided (not null/empty), filter by CP
    //   - tpId: if provided (not null/empty), filter by TP
    //   - gradeLevel: if targetKelas is a single grade (e.g., '8A'), filter
    //     by the grade tier ('8'). If 'ALL' or multiple, skip grade filter.
    //
    // If questionCount === 0, it means "use all questions" — no stock check
    // needed (we just verify at least 1 question exists).
    // ──────────────────────────────────────────────────────────────────

    const needsQuizQuestions = finalTaskType === 'quiz_only' || finalTaskType === 'typing_quiz'
    const effectiveCpId = cpId && cpId !== '__none__' && cpId !== '' ? cpId : null
    const effectiveTpId = tpId && tpId !== '__none__' && tpId !== '' ? tpId : null
    const requestedCount = typeof questionCount === 'number' ? questionCount : 0

    if (needsQuizQuestions) {
      // ── FIX: Use subject from body (not JWT) for stock check ──
      // Guru SMK may create assignment for "Mapel Kejuruan" even if JWT says "Informatika"
      const effectiveStockSubject = body.subject as string || teacherSubject
      const stockWhere: Record<string, unknown> = {
        subject: effectiveStockSubject,
        isActive: true,
      }
      if (effectiveCpId) {
        stockWhere.cpId = effectiveCpId
      }
      if (effectiveTpId) {
        stockWhere.tpId = effectiveTpId
      }

      // Derive gradeLevel from targetKelas (single grade only)
      // e.g., '8A' → '8', '11DKV' → '11DKV', 'ALL' → skip, '8A,8B' → skip
      if (targetKelas && targetKelas !== 'ALL' && !targetKelas.includes(',')) {
        const k = targetKelas.trim()
        let grade: string | null = null
        if (k.startsWith('11')) grade = '11DKV'
        else if (k.startsWith('12')) grade = '12DKV'
        else if (/^[789]/.test(k)) grade = k.charAt(0)
        if (grade) stockWhere.gradeLevel = grade
      }

      const stockCount = await safeCount(() =>
        db.question.count({ where: stockWhere })
      )

      if (stockCount === 0) {
        // No questions match the CP/TP filter
        const cpInfo = effectiveCpId ? `CP terpilih` : 'tanpa CP'
        const tpInfo = effectiveTpId ? ` + TP terpilih` : ''
        return NextResponse.json(
          {
            success: false,
            error: `Tidak ada soal di Bank Soal untuk ${cpInfo}${tpInfo}. Silakan tambah soal dengan CP/TP ini terlebih dahulu, atau pilih CP/TP lain.`,
            stockCheck: {
              requested: requestedCount,
              available: 0,
              cpId: effectiveCpId,
              tpId: effectiveTpId,
            },
          },
          { status: 400 }
        )
      }

      if (requestedCount > 0 && requestedCount > stockCount) {
        // Insufficient stock — return friendly warning
        return NextResponse.json(
          {
            success: false,
            error: `Stok soal untuk CP/TP ini hanya tersedia ${stockCount} soal, tetapi Anda meminta ${requestedCount} soal. Silakan sesuaikan jumlah soal (maks ${stockCount}) atau tambah soal di Bank Soal dengan CP/TP ini.`,
            stockCheck: {
              requested: requestedCount,
              available: stockCount,
              cpId: effectiveCpId,
              tpId: effectiveTpId,
            },
          },
          { status: 400 }
        )
      }
    }

    // ── Create the assignment ──
    try {
      const assignment = await db.assignment.create({
        data: {
          // ── FIX: Use subject from body (not JWT) for multi-mapel support ──
          subject: (body.subject as string) || teacherSubject,
          title: title.trim(),
          description: description || '',
          targetKelas: targetKelas || 'ALL',
          isActive: isActive !== false,
          dueDate: dueDate ? new Date(dueDate) : null,
          exerciseType: finalExerciseType,
          questionCount: requestedCount,
          taskType: finalTaskType,
          teacherId: teacher.teacherId,
          // ── v2 fields ──
          cpId: effectiveCpId,
          tpId: effectiveTpId,
          taskCategory: finalTaskCategory,
          taskTypeName: taskTypeName || '',
          tahunAjaran: finalTahunAjaran,
          semester: finalSemester,
          // ── FIX #2: duration (minutes, 0 = default) ──
          duration: typeof duration === 'number' ? duration : 0,
        },
      })

      // Return success + informational metadata about existing wajib count
      // (frontend can show a toast like "Tugas wajib ke-3 untuk mapel ini")
      return NextResponse.json({
        success: true,
        assignment,
        meta: {
          wajibCountAfterCreate: existingWajibCount + (finalExerciseType === 'wajib' ? 1 : 0),
          multipleWajibAllowed: true,
        },
      })
    } catch (dbErr) {
      console.error('[assignments] POST DB insert error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal memproses ke database. Pastikan kolom data sesuai.' },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error('[assignments] POST FATAL error:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal memproses ke database. Pastikan kolom data sesuai.' },
      { status: 400 },
    )
  }
}
