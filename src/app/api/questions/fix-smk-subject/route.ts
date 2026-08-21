import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth } from '@/lib/auth'

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/questions/fix-smk-subject
//
// One-click bulk fix: update SMK questions that have wrong subject
// (Umum, Informatika, or empty) to the correct SMK subject.
//
// Query params:
//   ?to=Mapel Kejuruan  — target subject (default: 'Mata Pelajaran Kejuruan')
//   ?grade=11DKV        — grade to fix (default: both 11DKV + 12DKV)
//
// Fixes:
//   - subject='Umum' → target subject
//   - subject='Informatika' → target subject (for SMK grades only)
//   - subject='' (empty) → target subject
//
// Safe: only touches SMK grades (11DKV, 12DKV). SMP questions untouched.
// ─────────────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const toSubject = req.nextUrl.searchParams.get('to') || 'Mata Pelajaran Kejuruan'
    const gradeFilter = req.nextUrl.searchParams.get('grade')

    const smkGrades = gradeFilter ? [gradeFilter] : ['11DKV', '12DKV']

    // Build where: SMK grades + subject in wrong values
    const where = {
      gradeLevel: { in: smkGrades },
      OR: [
        { subject: 'Umum' },
        { subject: 'Informatika' },
        { subject: '' },
      ],
    }

    // Count how many will be updated
    const countBefore = await db.question.count({ where })

    if (countBefore === 0) {
      // Also check for any SMK questions with other wrong subjects
      const allSmkCount = await db.question.count({
        where: { gradeLevel: { in: smkGrades } },
      })
      return NextResponse.json({
        success: true,
        message: `Tidak ada soal SMK dengan subject "Umum"/"Informatika" yang perlu diperbaiki. Total soal SMK: ${allSmkCount}.`,
        countBefore: 0,
        countAfter: 0,
        smkGrades,
      })
    }

    // Execute bulk update
    const result = await db.question.updateMany({
      where,
      data: { subject: toSubject },
    })

    // Verify after update
    const remainingWrong = await db.question.count({ where })

    return NextResponse.json({
      success: true,
      message: `${result.count} soal SMK berhasil diperbarui ke "${toSubject}"`,
      countBefore,
      countAfter: result.count,
      remainingWrong,
      details: {
        from: ['Umum', 'Informatika', '(kosong)'],
        to: toSubject,
        grades: smkGrades,
      },
    })
  } catch (error) {
    console.error('[fix-smk-subject] error:', error)
    return NextResponse.json(
      { error: 'Gagal fix: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 },
    )
  }
}
