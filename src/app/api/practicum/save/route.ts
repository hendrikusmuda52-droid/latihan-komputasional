import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getStudentFromToken } from '@/lib/auth'

// ── POST /api/practicum/save ──
// Auto-save progress siswa (tidak final, tidak di-grade)
export async function POST(req: NextRequest) {
  try {
    const student = getStudentFromToken(req)
    if (!student) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { studentId, assignmentId, spreadsheetData, infoAnswers, formulasUsed, durationSec } = body

    // Verify the studentId matches the token
    if (studentId !== student.studentId) {
      return NextResponse.json({ error: 'Student mismatch' }, { status: 403 })
    }

    // Verify assignment exists
    const assignment = await db.assignment.findUnique({
      where: { id: assignmentId },
      select: { id: true, subject: true, targetKelas: true },
    })
    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
    }

    // Get student record to fetch kelas
    const studentRecord = await db.student.findUnique({
      where: { id: studentId },
      select: { kelas: true },
    })

    // Upsert the practicum submission (only if not yet submitted)
    const existing = await db.practicumSubmission.findFirst({
      where: { studentId, assignmentId, isSubmitted: false },
    })

    let submission
    if (existing) {
      submission = await db.practicumSubmission.update({
        where: { id: existing.id },
        data: {
          spreadsheetData,
          infoAnswers,
          formulasUsed,
          durationSec,
        },
      })
    } else {
      submission = await db.practicumSubmission.create({
        data: {
          studentId,
          assignmentId,
          subject: assignment.subject,
          kelas: studentRecord?.kelas || '8A',
          spreadsheetData,
          infoAnswers,
          formulasUsed,
          durationSec,
          isSubmitted: false,
        },
      })
    }

    return NextResponse.json({
      ok: true,
      submissionId: submission.id,
      savedAt: new Date().toISOString(),
    })
  } catch (e: any) {
    console.error('[practicum/save] Error:', e)
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 })
  }
}

// ── GET /api/practicum/save?assignmentId=X ──
// Get existing saved submission (for resume) — cari DRAFT atau FINAL
export async function GET(req: NextRequest) {
  try {
    const student = getStudentFromToken(req)
    if (!student) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const assignmentId = searchParams.get('assignmentId')
    if (!assignmentId) {
      return NextResponse.json({ error: 'assignmentId required' }, { status: 400 })
    }

    // Cari submission mana saja (draft atau final) yang sudah ada
    const submission = await db.practicumSubmission.findFirst({
      where: {
        studentId: student.studentId,
        assignmentId,
      },
      orderBy: { updatedAt: 'desc' },
    })

    if (!submission) {
      return NextResponse.json({ found: false })
    }

    return NextResponse.json({
      found: true,
      submissionId: submission.id,
      isSubmitted: submission.isSubmitted,
      isReleased: submission.isReleased,
      // Hanya kirim spreadsheetData jika masih draft (belum submit)
      // Kalau sudah submit, jangan kirim data (untuk hindari resume yang tidak diinginkan)
      spreadsheetData: submission.isSubmitted ? '' : submission.spreadsheetData,
      infoAnswers: submission.isSubmitted ? '{}' : submission.infoAnswers,
      formulasUsed: submission.formulasUsed,
      durationSec: submission.durationSec,
      finalScore: submission.isSubmitted ? submission.finalScore : null,
      updatedAt: submission.updatedAt,
    })
  } catch (e: any) {
    console.error('[practicum/save GET] Error:', e)
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 })
  }
}
