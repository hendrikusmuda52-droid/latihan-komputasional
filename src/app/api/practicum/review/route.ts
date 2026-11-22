import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getTeacherFromToken } from '@/lib/auth'

// ── GET /api/practicum/review?id=X ──
// Detail submission untuk guru melihat spreadsheet siswa + grading
export async function GET(req: NextRequest) {
  try {
    const teacher = getTeacherFromToken(req)
    if (!teacher) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 })
    }

    const submission = await db.practicumSubmission.findUnique({
      where: { id },
      include: {
        student: {
          select: { id: true, namaLengkap: true, nisn: true, kelas: true },
        },
        assignment: {
          select: { id: true, title: true, subject: true, duration: true },
        },
      },
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    // Restrict teacher from viewing other subjects (unless admin)
    if (teacher.role !== 'admin' && submission.subject !== teacher.subject) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ submission })
  } catch (e: any) {
    console.error('[practicum/review] Error:', e)
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 })
  }
}
