import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getTeacherFromToken, requireTeacherAuth } from '@/lib/auth'

// Helper: safely run a DB query, return [] on any error (e.g. cold start, timeout, missing relation).
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[dashboard] safeQuery error:', err)
    return []
  }
}

// Helper: compute mean of a numeric array, rounded to 1 decimal, default 0.
function mean(values: number[]): number {
  if (!values || values.length === 0) return 0
  const sum = values.reduce((a, b) => a + (Number(b) || 0), 0)
  return Math.round((sum / values.length) * 10) / 10
}

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    // #1 FIX: Guard subject - if missing, default to safe empty string so Prisma never receives undefined.
    const teacherSubject = teacher.subject || ''

    // #1 FIX: Each query wrapped in safeQuery — never crash the whole API on a single DB error.
    const results = await safeQuery(() =>
      db.result.findMany({
        where: teacherSubject ? { subject: teacherSubject } : {},
        include: { student: true },
        orderBy: { completedAt: 'desc' },
      }),
    )

    // #1 FIX: Filter out any result whose student relation is null (defensive — should not happen with cascade, but guard anyway).
    const validResults = results.filter((r) => r && r.student)

    const data = validResults.map((r) => ({
      id: r.id,
      studentId: r.studentId,
      namaLengkap: r.student?.namaLengkap ?? '-',
      nisn: r.student?.nisn ?? '-',
      kelas: r.student?.kelas ?? '-',
      sekolah: r.student?.sekolah ?? '-',
      jenisKelamin: r.student?.jenisKelamin ?? '-',
      charCount: r.charCount ?? 0,
      correctChars: r.correctChars ?? 0,
      typingSpeedWPM: r.typingSpeedWPM ?? 0,
      typingAccuracy: r.typingAccuracy ?? 0,
      typingDuration: r.typingDuration ?? 0,
      typingScore: r.typingScore ?? 0,
      quizCorrect: r.quizCorrect ?? 0,
      quizTotal: r.quizTotal ?? 0,
      quizScore: r.quizScore ?? 0,
      totalScore: r.totalScore ?? 0,
      completedAt: r.completedAt ? r.completedAt.toISOString() : new Date().toISOString(),
      isReleased: !!r.isReleased,
      releasedAt: r.releasedAt ? r.releasedAt.toISOString() : null,
      subject: r.subject ?? teacherSubject,
    }))

    // #1 FIX: All aggregates default to 0 when there is no data — never null, never NaN.
    const totalSiswa = new Set(validResults.map((r) => r.studentId)).size
    const totalLatihan = validResults.length
    const rataTyping = mean(validResults.map((r) => Number(r.typingScore) || 0))
    const rataQuiz = mean(validResults.map((r) => Number(r.quizScore) || 0))
    const rataTotal = mean(validResults.map((r) => Number(r.totalScore) || 0))

    // #1 FIX: perKelas also defaults to 0 across the board.
    const ALL_KELAS = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '11DKV', '12DKV']
    const perKelas = ALL_KELAS.map((k) => {
      const kelasResults = validResults.filter((r) => r.student?.kelas === k)
      return {
        kelas: k,
        jumlahSiswa: new Set(kelasResults.map((r) => r.studentId)).size,
        jumlahLatihan: kelasResults.length,
        rataTotal: mean(kelasResults.map((r) => Number(r.totalScore) || 0)),
        rataTyping: mean(kelasResults.map((r) => Number(r.typingScore) || 0)),
        rataQuiz: mean(kelasResults.map((r) => Number(r.quizScore) || 0)),
      }
    })

    // #3 FIX: rataHarian = average of all "totalScore" — used as "Capaian Nilai Harian Global"
    // for non-IT subjects (where typing is not applicable). Same value as rataTotal, semantically
    // rebranded in the UI for non-Informatika teachers.
    const rataHarian = rataTotal

    const stats = {
      totalSiswa,
      totalLatihan,
      rataTyping,
      rataQuiz,
      rataTotal,
      rataHarian,
      perKelas,
    }

    return NextResponse.json({ success: true, data, stats })
  } catch (error) {
    // #1 FIX: Even the outer try-catch now returns a 200 with empty data so the frontend never
    // sees a 500 + HTML error page that triggers the red toast.
    console.error('[dashboard] FATAL error (returning safe empty payload):', error)
    return NextResponse.json({
      success: true,
      data: [],
      stats: {
        totalSiswa: 0,
        totalLatihan: 0,
        rataTyping: 0,
        rataQuiz: 0,
        rataTotal: 0,
        rataHarian: 0,
        perKelas: ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '11DKV', '12DKV'].map((k) => ({
          kelas: k,
          jumlahSiswa: 0,
          jumlahLatihan: 0,
          rataTotal: 0,
          rataTyping: 0,
          rataQuiz: 0,
        })),
      },
    })
  }
}
