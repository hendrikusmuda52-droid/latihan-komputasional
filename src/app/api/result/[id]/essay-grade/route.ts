import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// POST /api/result/[id]/essay-grade
//
// Body: { grades: { questionId: score, ... } }
//   - score: number 0-100 (nilai essai yang diberikan guru per soal)
//
// Logic:
// 1. Lookup Result by id
// 2. Validasi grades: semua score harus 0-100
// 3. Hitung essayScore = average dari semua grades
// 4. Update Result:
//    - essayGrades = JSON {questionId: score}
//    - essayScore = average
//    - totalScore = 0.6 * quizScore + 0.4 * essayScore (jika ada essai yang dinilai)
//                 = quizScore (jika tidak ada essai, fallback)
// 5. Return updated Result

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const { id } = await params

    // ── Parse body ──
    let body: { grades?: Record<string, number> }
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    const grades = body.grades
    if (!grades || typeof grades !== 'object') {
      return NextResponse.json({ error: 'Field "grades" wajib diisi (object {questionId: score})' }, { status: 400 })
    }

    // ── Validasi semua score 0-100 ──
    const validGrades: Record<string, number> = {}
    for (const [qId, score] of Object.entries(grades)) {
      const numScore = Number(score)
      if (isNaN(numScore) || numScore < 0 || numScore > 100) {
        return NextResponse.json(
          { error: `Score untuk soal ${qId} tidak valid (harus 0-100, dapat: ${score})` },
          { status: 400 }
        )
      }
      validGrades[qId] = numScore
    }

    // ── Lookup result ──
    const result = await db.result.findUnique({
      where: { id },
      select: {
        id: true,
        studentId: true,
        quizScore: true,
        quizTotal: true,
        quizCorrect: true,
        totalScore: true,
        subject: true,
        cpId: true,
        tpId: true,
        assignmentId: true,
      },
    })

    if (!result) {
      return NextResponse.json({ error: 'Hasil tidak ditemukan' }, { status: 404 })
    }

    // ── Hitung essayScore = average dari semua grades ──
    const gradeValues = Object.values(validGrades)
    const essayScore = gradeValues.length > 0
      ? Math.round((gradeValues.reduce((a, b) => a + b, 0) / gradeValues.length) * 100) / 100
      : 0

    // ── Hitung totalScore baru: 60% PG + 40% essai (hanya jika ada essai) ──
    // Jika tidak ada essai di-grades (grades kosong), totalScore = quizScore (default 100% PG)
    let newTotalScore: number
    if (gradeValues.length > 0) {
      // Ada essai yang dinilai → rumus 60/40
      newTotalScore = Math.round((0.6 * result.quizScore + 0.4 * essayScore) * 100) / 100
    } else {
      // Tidak ada essai → fallback ke quizScore saja
      newTotalScore = result.quizScore
    }

    // ── Update Result ──
    // Gunakan try-catch untuk handle case dimana kolom essayGrades/essayScore belum ada di DB
    // (sebelum SQL migration dijalankan) — fallback ke update totalScore saja
    try {
      const updated = await db.result.update({
        where: { id },
        data: {
          essayGrades: JSON.stringify(validGrades),
          essayScore,
          totalScore: newTotalScore,
        },
        select: {
          id: true,
          quizScore: true,
          quizTotal: true,
          quizCorrect: true,
          essayScore: true,
          essayGrades: true,
          totalScore: true,
        },
      })

      return NextResponse.json({
        success: true,
        result: updated,
        meta: {
          formula: gradeValues.length > 0 ? '60% PG + 40% Essai' : '100% PG (tanpa essai)',
          quizScore: result.quizScore,
          essayScore,
          totalScore: newTotalScore,
          gradesCount: gradeValues.length,
        },
      })
    } catch (updateErr) {
      // Fallback: kolom essayGrades/essayScore belum ada → update totalScore saja
      console.error('[essay-grade] Fallback update (kolom essayGrades belum ada?):', updateErr)
      await db.result.update({
        where: { id },
        data: { totalScore: newTotalScore },
      })
      return NextResponse.json({
        success: true,
        result: {
          id: result.id,
          quizScore: result.quizScore,
          quizTotal: result.quizTotal,
          quizCorrect: result.quizCorrect,
          essayScore,
          essayGrades: JSON.stringify(validGrades),
          totalScore: newTotalScore,
        },
        meta: {
          formula: gradeValues.length > 0 ? '60% PG + 40% Essai' : '100% PG (tanpa essai)',
          quizScore: result.quizScore,
          essayScore,
          totalScore: newTotalScore,
          gradesCount: gradeValues.length,
          warning: 'Kolom essayGrades/essayScore belum ada di DB. Jalankan migration SQL: download/migration_essay_grades.sql',
        },
      })
    }
  } catch (error) {
    console.error('[essay-grade] FATAL error:', error)
    return NextResponse.json({ error: 'Gagal menyimpan nilai essai' }, { status: 500 })
  }
}
