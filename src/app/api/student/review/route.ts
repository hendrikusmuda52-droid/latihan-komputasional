import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/student/review?resultId=xxx
//
// Returns detailed quiz review data for a specific result:
//   - Each question with options (A, B, C, D)
//   - Student's selected answer (highlighted red/green)
//   - Correct answer from the question bank
//   - Explanation/pembahasan
//   - imageUrl if the question has one
//
// SECURITY (Fix #3):
//   - Student must be authenticated (student_token cookie)
//   - Result must belong to the authenticated student
//   - Result.isReleased MUST be true — if false, return 403 with
//     "Belum dirilis" message. This prevents answer leakage before
//     all students have finished.
// ─────────────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    if (!(await requireStudentAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const session = getStudentFromToken(req)
    if (!session) {
      return NextResponse.json({ error: 'Token invalid' }, { status: 401 })
    }

    const resultId = req.nextUrl.searchParams.get('resultId')
    if (!resultId) {
      return NextResponse.json({ error: 'resultId wajib diisi' }, { status: 400 })
    }

    // ── Fetch the result — must belong to this student ──
    const result = await db.result.findUnique({
      where: { id: resultId },
    })

    if (!result) {
      return NextResponse.json({ error: 'Hasil tidak ditemukan' }, { status: 404 })
    }

    // Security: verify ownership
    if (result.studentId !== session.studentId) {
      return NextResponse.json({ error: 'Akses ditolak — hasil milik siswa lain' }, { status: 403 })
    }

    // ── FIX #3: Security check — result must be released ──
    if (!result.isReleased) {
      return NextResponse.json(
        {
          error: 'Nilai belum dirilis oleh guru. Jawaban dan pembahasan tidak dapat dilihat.',
          isReleased: false,
        },
        { status: 403 }
      )
    }

    // ── Parse quiz answers from result ──
    // quizAnswers is stored as JSON: { "0": 2, "1": 0, "2": 3, ... }
    // Key = question index (0-based), value = selected option index (0-3)
    let studentAnswers: Record<string, number> = {}
    try {
      // Handle both { "0": 2 } and [2, 0, 3] formats
      const parsed = JSON.parse(result.quizAnswers || '{}')
      if (Array.isArray(parsed)) {
        parsed.forEach((val, idx) => {
          if (typeof val === 'number') studentAnswers[idx] = val
        })
      } else {
        studentAnswers = parsed as Record<string, number>
      }
    } catch {
      studentAnswers = {}
    }

    // ── If result has an assignmentId, fetch questions by assignment's CP/TP ──
    // Otherwise, we can't reliably match which questions were shown.
    // In that case, return just the answers without question details.
    let reviewQuestions: Array<{
      index: number
      question: string
      options: string[]
      correctAnswer: number
      studentAnswer: number | null
      isCorrect: boolean
      explanation: string
      imageUrl: string | null
    }> = []

    if (result.assignmentId) {
      // Fetch the assignment to get cpId/tpId/gradeLevel for question matching
      const assignment = await db.assignment.findUnique({
        where: { id: result.assignmentId },
        select: {
          cpId: true,
          tpId: true,
          questionCount: true,
          subject: true,
          targetKelas: true,
        },
      })

      if (assignment) {
        // Derive gradeLevel from targetKelas
        let gradeLevel: string | null = null
        if (assignment.targetKelas && assignment.targetKelas !== 'ALL' && !assignment.targetKelas.includes(',')) {
          const k = assignment.targetKelas.trim()
          if (k.startsWith('11')) gradeLevel = '11DKV'
          else if (k.startsWith('12')) gradeLevel = '12DKV'
          else if (/^[789]/.test(k)) gradeLevel = k.charAt(0)
        }

        // Build where clause for fetching the same questions
        const qWhere: Record<string, unknown> = {
          subject: assignment.subject || 'Informatika',
          isActive: true,
        }
        if (gradeLevel) qWhere.gradeLevel = gradeLevel
        if (assignment.cpId) qWhere.cpId = assignment.cpId
        if (assignment.tpId) qWhere.tpId = assignment.tpId

        const questions = await db.question.findMany({
          where: qWhere,
          orderBy: { createdAt: 'asc' },
          take: assignment.questionCount > 0 ? assignment.questionCount : 100,
        })

        // Build review data
        reviewQuestions = questions.map((q, idx) => {
          const studentAnswer = studentAnswers[String(idx)] ?? studentAnswers[idx] ?? null
          const isCorrect = studentAnswer !== null && studentAnswer === q.correctAnswer
          return {
            index: idx + 1,
            question: q.question,
            options: [q.optionA, q.optionB, q.optionC, q.optionD],
            correctAnswer: q.correctAnswer,
            studentAnswer,
            isCorrect,
            explanation: q.explanation || '',
            imageUrl: q.imageUrl || null,
          }
        })
      }
    }

    return NextResponse.json({
      success: true,
      result: {
        id: result.id,
        totalScore: result.totalScore,
        typingScore: result.typingScore,
        quizScore: result.quizScore,
        quizCorrect: result.quizCorrect,
        quizTotal: result.quizTotal,
        completedAt: result.completedAt,
        releasedAt: result.releasedAt,
        isReleased: result.isReleased,
        assignmentId: result.assignmentId,
      },
      questions: reviewQuestions,
      studentAnswers,
    })
  } catch (error) {
    console.error('[student/review] error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data review: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 },
    )
  }
}
