import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getStudentFromToken } from '@/lib/auth'

// ── Force-submit backup endpoint ──
// Called via navigator.sendBeacon() by ForceStopOverlay when countdown ends.
// Reads the student's latest uncompleted progress from DB and creates a Result
// record from it, so the student's work is saved even if the event listener
// in typing-stage/quiz-stage doesn't fire in time.
//
// This is idempotent: if a Result already exists for this student+assignment
// (created by the normal submit flow), it does NOT create a duplicate.

export async function POST(req: NextRequest) {
  try {
    const student = getStudentFromToken(req)
    if (!student) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    // Parse body if present (sendBeacon sends a Blob)
    let body: { reason?: string; ts?: number } = {}
    try {
      const text = await req.text()
      if (text) body = JSON.parse(text)
    } catch {
      // Body may be empty or invalid JSON — that's OK, we proceed with JWT-only auth
    }

    console.log('[force-submit] Called for student:', student.studentId, 'reason:', body.reason || 'unknown')

    // 1. Find the latest uncompleted progress for this student
    const progress = await db.progress.findFirst({
      where: {
        studentId: student.studentId,
        isCompleted: false,
      },
      orderBy: { updatedAt: 'desc' },
    })

    if (!progress) {
      // No active progress — student may have already submitted via the normal flow
      return NextResponse.json({ success: true, message: 'No active progress to submit' })
    }

    // 2. Check if a Result already exists for this student + assignment (idempotency)
    //    We use the assignmentId from localStorage if available, otherwise skip.
    //    Since sendBeacon can't read localStorage, we check by studentId + recent timeframe.
    const recentResult = await db.result.findFirst({
      where: {
        studentId: student.studentId,
        completedAt: { gt: new Date(Date.now() - 5 * 60 * 1000) }, // within last 5 min
      },
      orderBy: { completedAt: 'desc' },
    })

    if (recentResult) {
      // Already submitted — just mark progress as completed
      await db.progress.update({
        where: { id: progress.id },
        data: { isCompleted: true, currentStage: 'completed' },
      })
      return NextResponse.json({ success: true, message: 'Already submitted, progress marked complete', resultId: recentResult.id })
    }

    // 3. Create a Result from the progress data
    //    Calculate typing score from progress metrics
    const charCount = progress.charCount || 0
    const correctChars = progress.correctChars || 0
    const accuracy = charCount > 0 ? Math.round((correctChars / charCount) * 100) : 0
    const duration = progress.typingDuration || 1
    const wpm = Math.round((correctChars / 5) / Math.max(duration / 60, 1))
    const typingScore = Math.min(100, Math.round((accuracy * 0.6) + (Math.min(wpm, 60) / 60 * 40)))

    // Parse quiz answers if present
    let quizCorrect = 0
    let quizTotal = 0
    try {
      const answers = JSON.parse(progress.quizAnswers || '{}')
      quizTotal = Object.keys(answers).length
      // We can't determine correctness without the questions, so assume 0 correct
    } catch {
      // quizAnswers may be '{}' or invalid
    }

    const totalScore = typingScore // Force-submit: only typing score is reliable

    const result = await db.result.create({
      data: {
        studentId: student.studentId,
        typedText: progress.typedText || '',
        charCount,
        correctChars,
        typingSpeedWPM: wpm,
        typingAccuracy: accuracy,
        typingDuration: duration,
        typingScore,
        quizAnswers: progress.quizAnswers || '{}',
        quizCorrect,
        quizTotal,
        quizScore: 0,
        totalScore,
        subject: 'Informatika', // Will be overridden if assignment has a subject
      },
    })

    // 4. Mark progress as completed
    await db.progress.update({
      where: { id: progress.id },
      data: { isCompleted: true, currentStage: 'completed' },
    })

    console.log('[force-submit] Result created:', result.id, 'score:', totalScore)

    return NextResponse.json({
      success: true,
      resultId: result.id,
      totalScore,
      message: 'Force-submit completed',
    })
  } catch (error) {
    console.error('[force-submit] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Force-submit failed' },
      { status: 500 }
    )
  }
}
