import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getTeacherFromToken, requireTeacherAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    // #3 FIX: Filter results by teacher's subject
    const results = await db.result.findMany({
      where: { subject: teacher.subject },
      include: { student: true },
      orderBy: { completedAt: 'desc' },
    })

    const data = results.map((r) => ({
      id: r.id,
      studentId: r.studentId,
      namaLengkap: r.student.namaLengkap,
      nisn: r.student.nisn,
      kelas: r.student.kelas,
      sekolah: r.student.sekolah,
      jenisKelamin: r.student.jenisKelamin,
      charCount: r.charCount,
      correctChars: r.correctChars,
      typingSpeedWPM: r.typingSpeedWPM,
      typingAccuracy: r.typingAccuracy,
      typingDuration: r.typingDuration,
      typingScore: r.typingScore,
      quizCorrect: r.quizCorrect,
      quizTotal: r.quizTotal,
      quizScore: r.quizScore,
      totalScore: r.totalScore,
      completedAt: r.completedAt.toISOString(),
      isReleased: r.isReleased,
      releasedAt: r.releasedAt ? r.releasedAt.toISOString() : null,
      subject: r.subject,
    }))

    const stats = {
      totalSiswa: new Set(results.map((r) => r.studentId)).size,
      totalLatihan: results.length,
      rataTyping: results.length
        ? Math.round((results.reduce((a, b) => a + b.typingScore, 0) / results.length) * 10) / 10
        : 0,
      rataQuiz: results.length
        ? Math.round((results.reduce((a, b) => a + b.quizScore, 0) / results.length) * 10) / 10
        : 0,
      rataTotal: results.length
        ? Math.round((results.reduce((a, b) => a + b.totalScore, 0) / results.length) * 10) / 10
        : 0,
      perKelas: ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '11DKV', '12DKV'].map((k) => {
        const kelasResults = results.filter((r) => r.student.kelas === k)
        return {
          kelas: k,
          jumlahSiswa: new Set(kelasResults.map((r) => r.studentId)).size,
          jumlahLatihan: kelasResults.length,
          rataTotal: kelasResults.length
            ? Math.round((kelasResults.reduce((a, b) => a + b.totalScore, 0) / kelasResults.length) * 10) / 10
            : 0,
          rataTyping: kelasResults.length
            ? Math.round((kelasResults.reduce((a, b) => a + b.typingScore, 0) / kelasResults.length) * 10) / 10
            : 0,
          rataQuiz: kelasResults.length
            ? Math.round((kelasResults.reduce((a, b) => a + b.quizScore, 0) / kelasResults.length) * 10) / 10
            : 0,
        }
      }),
    }

    return NextResponse.json({ success: true, data, stats })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Gagal mengambil data dashboard' }, { status: 500 })
  }
}
