import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getTeacherFromToken } from '@/lib/auth'

// ── POST /api/practicum/manual-grade ──
// Guru memberi nilai manual (override auto-grade) + release nilai
export async function POST(req: NextRequest) {
  try {
    const teacher = getTeacherFromToken(req)
    if (!teacher) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { submissionId, manualGrade, release } = body
    if (!submissionId) {
      return NextResponse.json({ error: 'submissionId required' }, { status: 400 })
    }

    const existing = await db.practicumSubmission.findUnique({
      where: { id: submissionId },
      select: { id: true, subject: true, totalScore: true },
    })
    if (!existing) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    // Restrict teacher from grading other subjects
    if (teacher.role !== 'admin' && existing.subject !== teacher.subject) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updateData: any = {}
    if (typeof manualGrade === 'number') {
      updateData.manualGrade = manualGrade
      updateData.finalScore = manualGrade
    }
    if (typeof release === 'boolean') {
      updateData.isReleased = release
    }

    const updated = await db.practicumSubmission.update({
      where: { id: submissionId },
      data: updateData,
    })

    return NextResponse.json({ ok: true, submission: updated })
  } catch (e: any) {
    console.error('[practicum/manual-grade] Error:', e)
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 })
  }
}
