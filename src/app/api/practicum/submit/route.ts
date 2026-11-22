import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getStudentFromToken } from '@/lib/auth'
import { gradePracticum } from '@/lib/practicum-grader'

// ── POST /api/practicum/submit ──
// Submit final praktikum + auto-grade
export async function POST(req: NextRequest) {
  try {
    const student = getStudentFromToken(req)
    if (!student) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { studentId, assignmentId, spreadsheetData, infoAnswers, formulasUsed, durationSec } = body

    if (studentId !== student.studentId) {
      return NextResponse.json({ error: 'Student mismatch' }, { status: 403 })
    }

    const assignment = await db.assignment.findUnique({
      where: { id: assignmentId },
      select: { id: true, subject: true },
    })
    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
    }

    // Cek apakah sudah pernah submit (1 assignment = 1 submission final)
    const alreadySubmitted = await db.practicumSubmission.findFirst({
      where: { studentId, assignmentId, isSubmitted: true },
    })
    if (alreadySubmitted) {
      return NextResponse.json(
        { error: 'Anda sudah submit praktikum ini. Hubungi guru untuk reset.' },
        { status: 400 }
      )
    }

    // Parse spreadsheet state
    let sheetState: { cells: Record<string, any> } = { cells: {} }
    try {
      sheetState = JSON.parse(spreadsheetData)
    } catch {
      sheetState = { cells: {} }
    }

    // Parse info answers
    let infoAnswersObj: Record<string, string> = {}
    try {
      infoAnswersObj = JSON.parse(infoAnswers)
    } catch {
      infoAnswersObj = {}
    }

    // ── AUTO-GRADE ──
    const grading = gradePracticum(sheetState, infoAnswersObj)

    // Get student record
    const studentRecord = await db.student.findUnique({
      where: { id: studentId },
      select: { kelas: true },
    })

    // Upsert: hapus draft lama, simpan submission final
    const existingDraft = await db.practicumSubmission.findFirst({
      where: { studentId, assignmentId, isSubmitted: false },
    })

    const submissionData = {
      spreadsheetData,
      infoAnswers,
      formulasUsed,
      formulaScore: grading.formulaScore,
      infoScore: grading.infoScore,
      totalScore: grading.totalScore,
      finalScore: grading.totalScore, // default = totalScore, bisa di-override manual
      gradingDetails: JSON.stringify({
        formulaResults: grading.formulaResults,
        infoResults: grading.infoResults,
      }),
      durationSec,
      isSubmitted: true,
      isGraded: true, // auto-graded
      submittedAt: new Date(),
    }

    let submission
    if (existingDraft) {
      submission = await db.practicumSubmission.update({
        where: { id: existingDraft.id },
        data: submissionData,
      })
    } else {
      submission = await db.practicumSubmission.create({
        data: {
          studentId,
          assignmentId,
          subject: assignment.subject,
          kelas: studentRecord?.kelas || '8A',
          ...submissionData,
        },
      })
    }

    return NextResponse.json({
      ok: true,
      submissionId: submission.id,
      totalScore: grading.totalScore,
      formulaScore: grading.formulaScore,
      infoScore: grading.infoScore,
      formulaEarned: grading.formulaEarned,
      formulaMax: grading.formulaMax,
      infoEarned: grading.infoEarned,
      infoMax: grading.infoMax,
      formulasUsed: grading.formulasUsed,
    })
  } catch (e: any) {
    console.error('[practicum/submit] Error:', e)
    return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 })
  }
}
