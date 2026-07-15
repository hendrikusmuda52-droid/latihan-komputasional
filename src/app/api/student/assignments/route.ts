import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const g = globalThis as unknown as {
  __studentSessions?: Map<string, { studentId: string; nisn: string; namaLengkap: string; kelas: string }>
}

// GET: ambil assignment aktif untuk siswa yang login
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('student_token')?.value
    if (!token || !g.__studentSessions?.has(token)) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const session = g.__studentSessions.get(token)!

    // Ambil semua assignment aktif
    const allActive = await db.assignment.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })

    // Filter: assignment untuk kelas siswa ini
    const studentKelas = session.kelas
    const assignments = allActive.filter((a) => {
      if (a.targetKelas === 'ALL') return true
      const kelasList = a.targetKelas.split(',').map((k) => k.trim())
      return kelasList.includes(studentKelas)
    })

    // Ambil hasil latihan siswa yang SUDAH DIRILIS guru saja
    const results = await db.result.findMany({
      where: { studentId: session.studentId, isReleased: true },
      orderBy: { releasedAt: 'desc' },
      take: 10,
    })

    // Hitung juga jumlah tugas yang sudah dikerjakan tapi belum dirilis
    const pendingResults = await db.result.count({
      where: { studentId: session.studentId, isReleased: false },
    })

    // Ambil progress aktif (belum selesai)
    const activeProgress = await db.progress.findFirst({
      where: { studentId: session.studentId, isCompleted: false },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      student: {
        id: session.studentId,
        namaLengkap: session.namaLengkap,
        nisn: session.nisn,
        kelas: session.kelas,
      },
      assignments: assignments.map((a) => ({
        id: a.id,
        title: a.title,
        description: a.description,
        dueDate: a.dueDate,
        createdAt: a.createdAt,
      })),
      results: results.map((r) => ({
        id: r.id,
        typingScore: r.typingScore,
        quizScore: r.quizScore,
        totalScore: r.totalScore,
        typingSpeedWPM: r.typingSpeedWPM,
        typingAccuracy: r.typingAccuracy,
        quizCorrect: r.quizCorrect,
        quizTotal: r.quizTotal,
        completedAt: r.completedAt,
        releasedAt: r.releasedAt,
      })),
      pendingResultsCount: pendingResults,
      hasActiveProgress: !!activeProgress,
      activeProgressStage: activeProgress?.currentStage || null,
    })
  } catch (error) {
    console.error('Error fetching student assignments:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}
