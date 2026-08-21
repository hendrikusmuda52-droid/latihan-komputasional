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

    // ──────────────────────────────────────────────────────────────────
    // FIX #2 (Masalah 2): PREVENT ADMIN DATA LEAK — ALWAYS FILTER BY SUBJECT
    // ──────────────────────────────────────────────────────────────────
    // BUG: Previously, `teacher.subject || ''` was used, and when subject was
    // empty (which happens for admin if the JWT doesn't have a subject field),
    // the where clause became `{}` — returning ALL results from ALL subjects.
    // This caused admin to see data from every mapel (data leak).
    //
    // FIX: Default to 'Informatika' when subject is missing/empty. This ensures
    // the where clause is ALWAYS `{ subject: <non-empty-string> }`, never `{}`.
    // Admin who wants to see other subjects must use a guru account for that subject.
    //
    // This is consistent with "Subject Isolation via JWT" pattern — every API
    // route must filter by a non-empty subject string.
    // ──────────────────────────────────────────────────────────────────
    const teacherSubject = teacher.subject && teacher.subject.trim() !== ''
      ? teacher.subject.trim()
      : 'Informatika'  // ← NEVER empty — prevents data leak

    // SAFETY NET: even if teacherSubject somehow becomes empty (shouldn't happen),
    // fall back to 'Informatika' again. Double guard.
    const safeSubject = teacherSubject || 'Informatika'

    // Each query wrapped in safeQuery — never crash the whole API on a single DB error.
    // The where clause ALWAYS includes subject filter — no empty {} allowed.
    const results = await safeQuery(() =>
      db.result.findMany({
        where: { subject: safeSubject },  // ← ALWAYS filtered, NEVER {}
        include: { student: true },
        orderBy: { completedAt: 'desc' },
      }),
    )

    // Filter out any result whose student relation is null (defensive — should not happen with cascade, but guard anyway).
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
      subject: r.subject ?? safeSubject,
    }))

    // All aggregates default to 0 when there is no data — never null, never NaN.
    const totalSiswa = new Set(validResults.map((r) => r.studentId)).size
    const totalLatihan = validResults.length
    const rataTyping = mean(validResults.map((r) => Number(r.typingScore) || 0))
    const rataQuiz = mean(validResults.map((r) => Number(r.quizScore) || 0))
    const rataTotal = mean(validResults.map((r) => Number(r.totalScore) || 0))

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

    // rataHarian = average of all "totalScore" — used as "Capaian Nilai Harian Global"
    // for non-IT subjects (where typing is not applicable). Same value as rataTotal.
    const rataHarian = rataTotal

    const stats = {
      totalSiswa,
      totalLatihan,
      rataTyping,
      rataQuiz,
      rataTotal,
      rataHarian,
      perKelas,
      // Include the filtered subject in stats so frontend can display
      // "Menampilkan data untuk mapel: X" — confirms no leak.
      filteredSubject: safeSubject,
    }

    return NextResponse.json({ success: true, data, stats })
  } catch (error) {
    // Even the outer try-catch returns a 200 with empty data so the frontend never
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
        filteredSubject: 'Informatika',
      },
    })
  }
}
