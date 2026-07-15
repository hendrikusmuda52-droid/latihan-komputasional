import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const results = await db.result.findMany({
      include: {
        student: true,
      },
      orderBy: { completedAt: 'desc' },
    })

    // Mapping ke format yang lebih ringkas untuk dashboard
    const data = results.map((r) => ({
      id: r.id,
      studentId: r.studentId,
      namaLengkap: r.student.namaLengkap,
      nisn: r.student.nisn,
      kelas: r.student.kelas,
      sekolah: r.student.sekolah,
      jenisKelamin: r.student.jenisKelamin,
      // typing
      charCount: r.charCount,
      correctChars: r.correctChars,
      typingSpeedWPM: r.typingSpeedWPM,
      typingAccuracy: r.typingAccuracy,
      typingDuration: r.typingDuration,
      typingScore: r.typingScore,
      copyWarnings: r.typedText ? 0 : 0, // tidak disimpan terpisah, skip
      // quiz
      quizCorrect: r.quizCorrect,
      quizTotal: r.quizTotal,
      quizScore: r.quizScore,
      // total
      totalScore: r.totalScore,
      completedAt: r.completedAt.toISOString(),
    }))

    // Statistik ringkasan
    const stats = {
      totalSiswa: new Set(results.map((r) => r.studentId)).size,
      totalLatihan: results.length,
      rataTyping: results.length
        ? Math.round(
            (results.reduce((a, b) => a + b.typingScore, 0) / results.length) * 10
          ) / 10
        : 0,
      rataQuiz: results.length
        ? Math.round(
            (results.reduce((a, b) => a + b.quizScore, 0) / results.length) * 10
          ) / 10
        : 0,
      rataTotal: results.length
        ? Math.round(
            (results.reduce((a, b) => a + b.totalScore, 0) / results.length) * 10
          ) / 10
        : 0,
      perKelas: ['8A', '8B', '8C', '9A', '9B'].map((k) => {
        const kelasResults = results.filter((r) => r.student.kelas === k)
        return {
          kelas: k,
          jumlahSiswa: new Set(kelasResults.map((r) => r.studentId)).size,
          jumlahLatihan: kelasResults.length,
          rataTotal: kelasResults.length
            ? Math.round(
                (kelasResults.reduce((a, b) => a + b.totalScore, 0) /
                  kelasResults.length) *
                  10
              ) / 10
            : 0,
        }
      }),
    }

    return NextResponse.json({ success: true, data, stats })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data dashboard' },
      { status: 500 }
    )
  }
}
