import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/questions/mass-delete?grade=11DKV&subject=Mapel+Kejuruan
//
// Bulk delete all questions matching grade + subject filter.
// Used by the "Hapus Massal" button in Bank Soal.
//
// Security:
//   - requireTeacherAuth: only logged-in teachers can delete
//   - grade + subject required (won't delete without explicit filter)
//   - Returns count of deleted questions
// ─────────────────────────────────────────────────────────────────────────────

export async function DELETE(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const grade = req.nextUrl.searchParams.get('grade')
    const subject = req.nextUrl.searchParams.get('subject')

    if (!grade) {
      return NextResponse.json(
        { error: 'Parameter grade wajib diisi untuk menghindari penghapusan massal yang tidak diinginkan.' },
        { status: 400 }
      )
    }
    if (!subject) {
      return NextResponse.json(
        { error: 'Parameter subject wajib diisi.' },
        { status: 400 }
      )
    }

    // Count before delete
    const where = {
      gradeLevel: grade,
      subject: subject,
    }
    const countBefore = await db.question.count({ where })

    if (countBefore === 0) {
      return NextResponse.json({
        success: true,
        message: `Tidak ada soal untuk Kelas ${grade} — ${subject}. Tidak ada yang dihapus.`,
        deletedCount: 0,
      })
    }

    // Execute bulk delete
    const result = await db.question.deleteMany({ where })

    return NextResponse.json({
      success: true,
      message: `${result.count} soal berhasil dihapus untuk Kelas ${grade} — ${subject}`,
      deletedCount: result.count,
      countBefore,
    })
  } catch (error) {
    console.error('[mass-delete] error:', error)
    return NextResponse.json(
      { error: 'Gagal hapus massal: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 },
    )
  }
}
