import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    if (!(await requireStudentAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const session = getStudentFromToken(req)!
    if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    // Get subject from query param
    const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'

    // Ambil semua assignment aktif untuk subject + kelas siswa
    const allActive = await db.assignment.findMany({
      where: { isActive: true, subject },
      orderBy: { createdAt: 'desc' },
    })

    const studentKelas = session.kelas
    const assignments = allActive.filter((a) => {
      if (a.targetKelas === 'ALL') return true
      const kelasList = a.targetKelas.split(',').map((k) => k.trim())
      return kelasList.includes(studentKelas)
    })

    // Cek apakah siswa sudah pernah mengerjakan
    const allResults = await db.result.findMany({
      where: { studentId: session.studentId },
      select: { id: true, completedAt: true, subject: true },
    })
    const hasCompletedAny = allResults.some(r => r.subject === subject)

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

    return NextResponse.json({
      success: true,
      student: { id: session.studentId, namaLengkap: session.namaLengkap, nisn: session.nisn, kelas: session.kelas },
      subject,
      assignments: assignments.map((a) => ({
        id: a.id, title: a.title, description: a.description,
        dueDate: a.dueDate, createdAt: a.createdAt,
        exerciseType: a.exerciseType, questionCount: a.questionCount,
        taskType: a.taskType, canRetake: a.exerciseType === 'persiapan' || !hasCompletedAny,
        hasCompleted: hasCompletedAny,
      })),
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
