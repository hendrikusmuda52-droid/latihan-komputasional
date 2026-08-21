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
    const assignments = allActive.filter((a) => isKelasMatch(studentKelas, a.targetKelas))

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

    // ── FIX #3: Deadline expiry auto-zero ──
    // For each assignment with a dueDate that has passed AND the student
    // hasn't submitted yet, auto-create a Result with score 0 and mark
    // as completed. This locks the assignment permanently and the score
    // appears in the teacher's grade book immediately.
    const now = new Date()
    const expiredAssignments: string[] = []

    for (const a of assignments) {
      // Skip if no deadline, or already completed
      if (!a.dueDate) continue
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
        } catch (e) {
          // If result already exists (race condition), skip silently
          console.error('[student/assignments] auto-zero error for assignment', a.id, e)
        }
      }
    }

    return NextResponse.json({
      success: true,
      student: { id: session.studentId, namaLengkap: session.namaLengkap, nisn: session.nisn, kelas: session.kelas },
      subject,
      assignments: assignments.map((a) => {
        const hasCompletedThisAssignment = completedAssignmentIds.has(a.id)
        // ── FIX #3: If assignment is expired, mark it as expired ──
        const isExpired = !a.dueDate ? false : new Date(a.dueDate) < now && hasCompletedThisAssignment && expiredAssignments.includes(a.id)

        const canRetake = a.exerciseType === 'persiapan' || !hasCompletedThisAssignment

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
