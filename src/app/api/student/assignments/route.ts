import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'
import { isKelasMatch } from '@/lib/kelas'

export async function GET(req: NextRequest) {
  try {
    if (!(await requireStudentAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const session = getStudentFromToken(req)!
    if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'

    // Ambil semua assignment aktif untuk subject + kelas siswa
    const allActive = await db.assignment.findMany({
      where: { isActive: true, subject },
      orderBy: { createdAt: 'desc' },
    })

    const studentKelas = session.kelas
    // FIX Bug #2: pakai isKelasMatch agar pencocokan kelas case-insensitive
    // dan mengabaikan spasi. Sebelumnya memakai kelasList.includes(studentKelas)
    // yang case-sensitive, sehingga "11 DKV" tidak cocok dengan "11DKV".
    const allMatching = allActive.filter((a) => isKelasMatch(studentKelas, a.targetKelas))

    // ── BUG A FIX: Check completion PER ASSIGNMENT, not globally per subject ──
    // Get ALL results for this student + subject, including assignmentId
    const allResults = await db.result.findMany({
      where: { studentId: session.studentId, subject },
      select: { id: true, assignmentId: true, completedAt: true, isReleased: true },
    })

    // Build a Set of assignmentIds that the student has already completed
    const completedAssignmentIds = new Set(
      allResults
        .filter(r => r.assignmentId)  // only results linked to a specific assignment
        .map(r => r.assignmentId as string)
    )

    // hasCompletedAny = student has at least 1 result for this subject (for backward compat)
    const hasCompletedAny = allResults.length > 0

    // ── FIX: Filter tugas hukuman — siswa yang sudah mengerjakan tugas asli ──
    // TIDAK boleh melihat tugas hukuman untuk tugas asli tersebut.
    // Tugas hukuman punya isPunishment=true dan parentAssignmentId link ke tugas asli.
    // Jika siswa sudah punya Result untuk parentAssignmentId, sembunyikan tugas hukuman.
    const assignments = allMatching.filter((a) => {
      // Cek apakah ini tugas hukuman
      const isPunishment = (a as Record<string, unknown>).isPunishment === true
      const parentAssignmentId = (a as Record<string, unknown>).parentAssignmentId as string | undefined

      if (isPunishment && parentAssignmentId) {
        // Cek apakah siswa sudah mengerjakan tugas asli (parent)
        // Jika sudah → sembunyikan tugas hukuman
        if (completedAssignmentIds.has(parentAssignmentId)) {
          return false
        }
      }

      return true
    })

    const results = await db.result.findMany({
      where: { studentId: session.studentId, isReleased: true, subject },
      orderBy: { releasedAt: 'desc' },
      take: 10,
    })

    const pendingResults = await db.result.count({
      where: { studentId: session.studentId, isReleased: false, subject },
    })

    const activeProgress = await db.progress.findFirst({
      where: { studentId: session.studentId, isCompleted: false },
      orderBy: { updatedAt: 'desc' },
    })

    // ── FIX #3: Deadline expiry auto-zero + hukuman system ──
    // Alur:
    // 1. Jika deadline lewat dan siswa belum mengerjakan → auto-zero + kunci
    // 2. Cek apakah siswa yang sudah mengerjakan lulus/tidak (bandingkan dengan KKM)
    // 3. Generate tugas hukuman otomatis untuk siswa yang tidak mengerjakan
    const now = new Date()
    const expiredAssignments: string[] = []

    // ── Ambil KKM dari SubjectConfig ──
    const subjectConfig = await db.subjectConfig.findFirst({
      where: { subject, tahunAjaran: '2026/2027', semester: 'ganjil' },
      select: { kkm: true },
    })
    const kkm = subjectConfig?.kkm || 75

    for (const a of assignments) {
      // Skip punishment assignments (mereka punya parent)
      if ((a as Record<string, unknown>).isPunishment === true) continue

      // Skip if no deadline
      if (!a.dueDate) continue

      // Skip if already completed
      if (completedAssignmentIds.has(a.id)) continue

      // Check if deadline has passed
      if (new Date(a.dueDate) < now) {
        // Auto-create a zero-score result for this student + assignment
        try {
          await db.result.create({
            data: {
              studentId: session.studentId,
              typedText: '',
              charCount: 0,
              correctChars: 0,
              typingSpeedWPM: 0,
              typingAccuracy: 0,
              typingDuration: 0,
              typingScore: 0,
              quizAnswers: '[]',
              quizCorrect: 0,
              quizTotal: 0,
              quizScore: 0,
              totalScore: 0,
              subject,
              assignmentId: a.id,
              isReleased: true,
              releasedAt: now,
            },
          })
          // Mark any active progress for this assignment as completed
          await db.progress.updateMany({
            where: { studentId: session.studentId, isCompleted: false },
            data: { isCompleted: true, currentStage: 'expired' },
          })
          completedAssignmentIds.add(a.id)
          expiredAssignments.push(a.id)

          // ── NEW: Generate tugas hukuman otomatis ──
          // Cek apakah sudah ada tugas hukuman untuk tugas ini + siswa ini
          const existingPunishment = await db.assignment.findFirst({
            where: {
              parentAssignmentId: a.id,
              isPunishment: true,
              isActive: true,
            },
          })

          if (!existingPunishment) {
            // Buat tugas hukuman: tugas asli + tugas tambahan
            await db.assignment.create({
              data: {
                title: `⚠️ HUKUMAN: ${a.title} (Tidak Dikerjakan + Tugas Tambahan)`,
                description: `Anda tidak mengerjakan tugas "${a.title}" yang deadline-nya ${new Date(a.dueDate).toLocaleDateString('id-ID')}. ` +
                  `Sebagai hukuman, Anda wajib: (1) Mengerjakan ulang tugas asli, (2) Mengerjakan tugas tambahan ini. ` +
                  `Nilai 0 sudah masuk ke daftar nilai. Selesaikan tugas hukuman ini untuk mendapat nilai pengganti.`,
                subject: a.subject,
                targetKelas: a.targetKelas,
                targetJenjang: a.targetJenjang,
                isActive: true,
                dueDate: null, // tidak ada deadline (harus selesaikan)
                exerciseType: 'wajib',
                questionCount: a.questionCount,
                taskType: a.taskType,
                teacherId: a.teacherId,
                cpId: a.cpId,
                tpId: a.tpId,
                taskCategory: a.taskCategory,
                taskTypeName: a.taskTypeName,
                tahunAjaran: a.tahunAjaran,
                semester: a.semester,
                duration: a.duration,
                isPunishment: true,
                parentAssignmentId: a.id,
              },
            })
          }
        } catch (e) {
          // If result already exists (race condition), skip silently
          console.error('[student/assignments] auto-zero/punishment error for assignment', a.id, e)
        }
      }
    }

    // ── Ambil tugas hukuman untuk siswa ini ──
    const punishmentAssignments = assignments.filter(
      (a) => (a as Record<string, unknown>).isPunishment === true
    )

    // ── Ambil nilai siswa untuk cek lulus/tidak ──
    const studentResults = await db.result.findMany({
      where: { studentId: session.studentId, subject },
      select: { assignmentId: true, totalScore: true },
    })
    const resultMap = new Map(studentResults.map(r => [r.assignmentId, r.totalScore]))

    return NextResponse.json({
      success: true,
      student: { id: session.studentId, namaLengkap: session.namaLengkap, nisn: session.nisn, kelas: session.kelas },
      subject,
      kkm, // ── NEW: kirim KKM ke frontend untuk cek lulus/tidak
      assignments: assignments.map((a) => {
        const hasCompletedThisAssignment = completedAssignmentIds.has(a.id)
        const isExpired = !a.dueDate ? false : new Date(a.dueDate) < now && hasCompletedThisAssignment && expiredAssignments.includes(a.id)
        const isPunishment = (a as Record<string, unknown>).isPunishment === true

        // ── NEW: Cek status lulus/tidak berdasarkan KKM ──
        const score = resultMap.get(a.id)
        const isPassed = hasCompletedThisAssignment && score !== undefined && score >= kkm
        const isFailed = hasCompletedThisAssignment && score !== undefined && score < kkm

        // canRetake: persiapan (always), atau belum dikerjakan, atau tidak lulus (remedial)
        const canRetake = a.exerciseType === 'persiapan' || !hasCompletedThisAssignment || isFailed

        return {
          id: a.id, title: a.title, description: a.description,
          dueDate: a.dueDate, createdAt: a.createdAt,
          exerciseType: a.exerciseType, questionCount: a.questionCount,
          taskType: a.taskType,
          duration: a.duration || 0,
          cpId: a.cpId || null,
          tpId: a.tpId || null,
          canRetake,
          hasCompleted: hasCompletedThisAssignment,
          isExpired,
          isPunishment, // ── NEW: flag tugas hukuman
          isPassed,     // ── NEW: lulus (≥ KKM)
          isFailed,     // ── NEW: tidak lulus (< KKM)
          score: score !== undefined ? Number(score) : null, // ── NEW: nilai siswa
        }
      }),
      results: results.map((r) => ({
        id: r.id, typingScore: r.typingScore, quizScore: r.quizScore, totalScore: r.totalScore,
        typingSpeedWPM: r.typingSpeedWPM, typingAccuracy: r.typingAccuracy,
        quizCorrect: r.quizCorrect, quizTotal: r.quizTotal,
        completedAt: r.completedAt, releasedAt: r.releasedAt,
      })),
      pendingResultsCount: pendingResults,
      hasActiveProgress: !!activeProgress,
      activeProgressStage: activeProgress?.currentStage || null,
      hasCompletedAnyExercise: hasCompletedAny,
    })
  } catch (error) {
    console.error('Error fetching student assignments:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}
