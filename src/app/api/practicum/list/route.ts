import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getTeacherFromToken } from '@/lib/auth'

// ── GET /api/practicum/list?assignmentId=X&kelas=8A ──
// List semua submission praktikum untuk guru
export async function GET(req: NextRequest) {
  try {
    const teacher = getTeacherFromToken(req)
    if (!teacher) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const assignmentId = searchParams.get('assignmentId')
    const kelas = searchParams.get('kelas')
    const subject = searchParams.get('subject') || teacher.subject

    // If admin, allow filtering by any subject. If teacher, restrict to their subject.
    const where: any = {}
    if (assignmentId) where.assignmentId = assignmentId
    if (kelas) where.kelas = kelas
    if (teacher.role !== 'admin') {
      where.subject = teacher.subject
    } else if (subject && subject !== 'ALL') {
      where.subject = subject
    }

    const submissions = await db.practicumSubmission.findMany({
      where,
      include: {
        student: {
          select: { id: true, namaLengkap: true, nisn: true, kelas: true },
        },
        assignment: {
          select: { id: true, title: true, subject: true },
        },
      },
      orderBy: { submittedAt: 'desc' },
    })

    return NextResponse.json({ submissions })
  } catch (e: any) {
    console.error('[practicum/list] Error:', e)
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 })
  }
}
