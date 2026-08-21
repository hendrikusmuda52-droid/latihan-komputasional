import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth } from '@/lib/auth'

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/questions/fix-umum
//
// One-time fix endpoint: bulk update questions that were incorrectly saved
// with subject='Umum' (or wrong subject) for SMK grades (11DKV, 12DKV).
//
// This fixes the bug where import soal didn't send subject from FormData,
// causing all SMK questions to fall back to teacher's JWT subject.
//
// Query params:
//   ?from=Umum          — old subject to fix (default: 'Umum')
//   ?to=Mapel Kejuruan  — new subject to set (default: 'Mata Pelajaran Kejuruan')
//   ?grade=11DKV        — filter by grade (default: all SMK grades)
//
// Example usage:
//   /api/questions/fix-umum                              — fix all Umum → Mapel Kejuruan for 11DKV+12DKV
//   /api/questions/fix-umum?from=Informatika&to=Mapel+Pilihan&grade=12DKV
// ─────────────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const fromSubject = req.nextUrl.searchParams.get('from') || 'Umum'
    const toSubject = req.nextUrl.searchParams.get('to') || 'Mata Pelajaran Kejuruan'
    const gradeFilter = req.nextUrl.searchParams.get('grade')

    // Build where clause
    const where: Record<string, unknown> = {
      subject: fromSubject,
    }
    if (gradeFilter) {
      where.gradeLevel = gradeFilter
    } else {
      // Default: fix all SMK grades
      where.gradeLevel = { in: ['11DKV', '12DKV'] }
    }

    // Count how many will be updated
    const countBefore = await db.question.count({ where })

    if (countBefore === 0) {
      return NextResponse.json({
        success: true,
        message: `Tidak ada soal dengan subject="${fromSubject}" untuk SMK. Tidak perlu diperbaiki.`,
        countBefore: 0,
        countAfter: 0,
      })
    }

    // Execute bulk update
    const result = await db.question.updateMany({
      where,
      data: { subject: toSubject },
    })

    return NextResponse.json({
      success: true,
      message: `${result.count} soal berhasil diperbarui dari "${fromSubject}" → "${toSubject}"`,
      countBefore,
      countAfter: result.count,
      details: {
        from: fromSubject,
        to: toSubject,
        gradeFilter: gradeFilter || '11DKV, 12DKV',
      },
    })
  } catch (error) {
    console.error('[fix-umum] error:', error)
    return NextResponse.json(
      { error: 'Gagal fix: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 },
    )
  }
}
