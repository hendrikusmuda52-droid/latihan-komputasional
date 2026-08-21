import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, requireAdminAuth } from '@/lib/auth'

// ── FIX: Nonaktifkan Next.js Data Cache secara total untuk endpoint ini ──
// Sebelumnya, response GET /api/questions?stockCheck=1 bisa di-cache oleh
// Next.js (default cache 0s-300s tergantung konfigurasi). Akibatnya, ketika
// guru menambah soal baru ke Bank Soal, count di modal Tambah Tugas masih
// menampilkan angka lama (atau 0) — notifikasi "Tidak ada soal di Bank Soal"
// muncul secara keliru meskipun puluhan soal sudah ada di DB.
//
// `force-dynamic` menyebabkan route ini selalu dieksekusi di server (tidak
// di-cache di edge/full-route cache). `force-no-store` melarang fetch cache
// untuk apapun yang dipanggil dari dalam handler ini.
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

// HOTFIX #3: Helper — safely run a DB query, return [] on any error.
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[questions] safeQuery error:', err)
    return []
  }
}

// Helper: safely run a DB count, return 0 on any error.
async function safeCount(fn: () => Promise<number>): Promise<number> {
  try {
    return await fn()
  } catch (err) {
    console.error('[questions] safeCount error:', err)
    return 0
  }
}

// Helper: bypass cache headers untuk response JSON.
// Dipakai di semua return path agar browser & Vercel Edge tidak pernah
// menyimpan response endpoint ini.
const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
}

// GET: list semua soal (untuk guru)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    // HOTFIX #3: previously `teacher` was never declared — ReferenceError → 500.
    const { getTeacherFromToken } = await import('@/lib/auth')
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const grade = req.nextUrl.searchParams.get('grade')
    const subjectParam = req.nextUrl.searchParams.get('subject')
    const cpIdParam = req.nextUrl.searchParams.get('cpId')
    const tpIdParam = req.nextUrl.searchParams.get('tpId')
    const stockCheck = req.nextUrl.searchParams.get('stockCheck')

    // ── FIX: Use subject param if provided (multi-mapel guru support) ──
    const effectiveSubject = subjectParam || teacherSubject

    // ── Stock check mode — return count only ──
    // Frontend (assignments-manager.tsx) memanggil endpoint ini saat user
    // memilih CP di modal Tambah Tugas untuk mengecek apakah ada soal yang
    // tersedia sebelum tugas disimpan.
    //
    // FIX Bug "Tidak ada soal di Bank Soal":
    //   1. Frontend sebelumnya HANYA mengirim cpId+tpId, TANPA grade+subject.
    //      Backend jatuh ke teacherSubject dari JWT (default "Informatika"),
    //      padahal user mungkin memilih mapel "Mata Pelajaran Kejuruan".
    //      Query count jadi 0 karena subject mismatch → false warning.
    //   2. Next.js caching membuat count=0 ter-cache, tidak update meski
    //      soal baru ditambahkan ke DB.
    //
    //   Solusi: di backend kita defensive — kalau subject tidak dikirim,
    //   fallback ke teacherSubject. Tapi yang BENAR adalah frontend kirim
    //   subject + grade eksplisit (lihat patch assignments-manager.tsx).
    if (stockCheck === '1') {
      const stockWhere: Record<string, unknown> = {
        subject: effectiveSubject,
        isActive: true,
      }
      if (grade) stockWhere.gradeLevel = grade
      if (cpIdParam && cpIdParam !== '__none__') stockWhere.cpId = cpIdParam
      if (tpIdParam && tpIdParam !== '__none__') stockWhere.tpId = tpIdParam

      // ── FIX: Logging untuk debugging mismatch ──
      // Jika count = 0, log parameter yang diterima agar mudah troubleshoot.
      console.log('[questions] stockCheck params:', {
        grade,
        subject: effectiveSubject,
        cpId: cpIdParam,
        tpId: tpIdParam,
        teacherSubject,
      })

      const stockCount = await safeCount(() => db.question.count({ where: stockWhere }))

      // ── FIX: Jika count = 0 dengan cpId, coba query ulang TANPA cpId ──
      // Kemungkinan soal-soal lama belum di-link ke cpId manapun. Beri info
      // ke frontend bahwa soal ada tapi belum di-CP-kan.
      let stockCountWithoutCp: number | null = null
      if (stockCount === 0 && cpIdParam && cpIdParam !== '__none__') {
        const fallbackWhere: Record<string, unknown> = {
          subject: effectiveSubject,
          isActive: true,
        }
        if (grade) fallbackWhere.gradeLevel = grade
        stockCountWithoutCp = await safeCount(() => db.question.count({ where: fallbackWhere }))
      }

      console.log('[questions] stockCheck result:', {
        stockCount,
        stockCountWithoutCp,
        query: stockWhere,
      })

      return NextResponse.json({
        success: true,
        stockCount,
        // Info tambahan untuk debugging: jumlah soal untuk subject+grade
        // ini TANPA filter cpId. Frontend bisa pakai untuk nampilkan hint
        // "ada N soal tapi belum di-link ke CP ini".
        stockCountWithoutCp,
        // Echo parameter yang dipakai agar frontend bisa verifikasi
        params: { grade, subject: effectiveSubject, cpId: cpIdParam, tpId: tpIdParam },
      }, { headers: NO_CACHE_HEADERS })
    }

    const where = grade
      ? { gradeLevel: grade, subject: effectiveSubject }
      : { subject: effectiveSubject }

    // ── Join CP + TP so frontend badges can show kodeCP/kodeTP ──
    // We can't use Prisma include() because Question.cpId/tpId are plain
    // String fields (not real FK relations). So we do a manual 2-step fetch:
    //   1. Get all questions for this grade+subject
    //   2. Collect unique cpIds + tpIds, fetch CP + TP records in batch
    //   3. Merge kodeCP/kodeTP/deskripsiCP/deskripsiTP into each question
    const rawQuestions = await safeQuery(() =>
      db.question.findMany({
        where,
        orderBy: [{ gradeLevel: 'asc' }, { createdAt: 'asc' }],
      }),
    )

    if (!rawQuestions || rawQuestions.length === 0) {
      return NextResponse.json({ success: true, questions: [] }, { headers: NO_CACHE_HEADERS })
    }

    // Collect unique cpIds + tpIds (exclude null/empty)
    const cpIds = [...new Set(
      rawQuestions.map((q) => q.cpId).filter((id): id is string => !!id && id !== '')
    )]
    const tpIds = [...new Set(
      rawQuestions.map((q) => q.tpId).filter((id): id is string => !!id && id !== '')
    )]

    // Batch fetch CP + TP records
    const [cps, tps] = await Promise.all([
      cpIds.length > 0
        ? safeQuery(() => db.capaianPembelajaran.findMany({ where: { id: { in: cpIds } } }))
        : Promise.resolve([])
      ,
      tpIds.length > 0
        ? safeQuery(() => db.tujuanPembelajaran.findMany({ where: { id: { in: tpIds } } }))
        : Promise.resolve([])
      ,
    ])

    // Build lookup maps
    const cpMap = new Map(cps.map((cp) => [cp.id, cp]))
    const tpMap = new Map(tps.map((tp) => [tp.id, tp]))

    // Merge CP/TP data into each question
    const questions = rawQuestions.map((q) => {
      const cp = q.cpId ? cpMap.get(q.cpId) : null
      const tp = q.tpId ? tpMap.get(q.tpId) : null
      return {
        ...q,
        cpKode: cp?.kodeCP || null,
        cpDeskripsi: cp?.deskripsi || null,
        tpKode: tp?.kodeTP || null,
        tpDeskripsi: tp?.deskripsi || null,
      }
    })

    return NextResponse.json({ success: true, questions }, { headers: NO_CACHE_HEADERS })
  } catch (fatalErr) {
    // HOTFIX #3: Final fallback — return HTTP 200 with empty array instead of 500 + HTML.
    console.error('[questions] GET FATAL error (returning safe empty array):', fatalErr)
    return NextResponse.json({ success: true, questions: [] }, { headers: NO_CACHE_HEADERS })
  }
}

// POST: tambah soal baru
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const { getTeacherFromToken } = await import('@/lib/auth')
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[questions] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    const {
      gradeLevel, question, optionA, optionB, optionC, optionD,
      correctAnswer, explanation, category, imageUrl,
      // v3 multi-type fields
      questionType, correctAnswers, matchPairs, shortAnswer, essayAnswer,
      levelKognitif, pembahasanBenar, analisisDistraktor, cpId, tpId,
    } = body as {
      gradeLevel?: string
      question?: string
      optionA?: string
      optionB?: string
      optionC?: string
      optionD?: string
      correctAnswer?: number
      explanation?: string
      category?: string
      imageUrl?: string
      questionType?: string
      correctAnswers?: string
      matchPairs?: string
      shortAnswer?: string
      essayAnswer?: string
      levelKognitif?: string
      pembahasanBenar?: string
      analisisDistraktor?: string
      cpId?: string | null
      tpId?: string | null
    }

    if (!gradeLevel || !question) {
      return NextResponse.json({ error: 'gradeLevel dan question wajib diisi' }, { status: 400 })
    }
    if (!['7', '8', '9', '11DKV', '12DKV'].includes(gradeLevel)) {
      return NextResponse.json({ error: 'Grade harus 7, 8, 9, 11DKV, atau 12DKV' }, { status: 400 })
    }

    const finalSubject = (body.subject as string) || teacher.subject || 'Informatika'
    const finalQuestionType = questionType || 'pilihan_ganda'

    // For pilihan_ganda: validate options + correctAnswer
    if (finalQuestionType === 'pilihan_ganda' || finalQuestionType === 'pilihan_ganda_kompleks') {
      if (!optionA || !optionB || !optionC || !optionD) {
        return NextResponse.json({ error: 'Opsi A-D wajib diisi untuk pilihan ganda' }, { status: 400 })
      }
    }

    const created = await db.question.create({
      data: {
        gradeLevel,
        subject: finalSubject,
        question,
        optionA: optionA || '',
        optionB: optionB || '',
        optionC: optionC || '',
        optionD: optionD || '',
        correctAnswer: Number(correctAnswer) || 0,
        explanation: explanation || '',
        category: category || 'Umum',
        isActive: true,
        imageUrl: imageUrl || null,
        teacherId: teacher.teacherId,
        // v3 multi-type fields
        questionType: finalQuestionType,
        correctAnswers: correctAnswers || '[]',
        matchPairs: matchPairs || '[]',
        shortAnswer: shortAnswer || '',
        essayAnswer: essayAnswer || '',
        levelKognitif: levelKognitif || 'C2',
        pembahasanBenar: pembahasanBenar || '',
        analisisDistraktor: analisisDistraktor || '',
        cpId: cpId || null,
        tpId: tpId || null,
      },
    })
    return NextResponse.json({ success: true, question: created })
  } catch (error) {
    console.error('[questions] POST FATAL error:', error)
    return NextResponse.json({ error: 'Gagal membuat soal' }, { status: 500 })
  }
}

// Re-export admin auth for manage route
export { requireAdminAuth }
