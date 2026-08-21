import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'

// Student auth via stateless JWT

export async function GET(req: NextRequest) {
  if (!(await requireStudentAuth(req))) { return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 }) }
  const session = getStudentFromToken(req)!

  // Ambil nilai manual yang sudah dirilis
  const manualGrades = await db.manualGrade.findMany({
    where: { studentId: session.studentId, isReleased: true },
    orderBy: { createdAt: 'desc' },
  })

  // Ambil nilai otomatis dari hasil latihan yang sudah dirilis
  // ── FIX: include assignmentId and assignment title for proper remedial mapping ──
  const autoGrades = await db.result.findMany({
    where: { studentId: session.studentId, isReleased: true },
    orderBy: { releasedAt: 'desc' },
  })

  // Fetch assignment titles for all assignmentIds in the results
  const assignmentIds = autoGrades
    .map(g => g.assignmentId)
    .filter((id): id is string => id !== null && id !== undefined)

  const assignments = assignmentIds.length > 0
    ? await db.assignment.findMany({
        where: { id: { in: assignmentIds } },
        select: { id: true, title: true },
      })
    : []

  // Build a map of assignmentId → title for quick lookup
  const assignmentTitleMap = new Map(assignments.map(a => [a.id, a.title]))

  return NextResponse.json({
    success: true,
    manualGrades: manualGrades.map(g => ({
      id: g.id, title: g.title, score: g.score, description: g.description,
      createdAt: g.createdAt,
      // v3: include assignmentId if linked
      assignmentId: g.babId || null, // ManualGrade doesn't have assignmentId field, use babId as fallback
    })),
    autoGrades: autoGrades.map(g => ({
      id: g.id,
      // ── FIX: use actual assignment title, not global "Latihan Mengetik & HOTS" ──
      title: g.assignmentId ? (assignmentTitleMap.get(g.assignmentId) || 'Latihan Daring') : 'Latihan Mengetik & HOTS',
      score: g.totalScore,
      typingScore: g.typingScore, quizScore: g.quizScore,
      typingSpeedWPM: g.typingSpeedWPM, typingAccuracy: g.typingAccuracy,
      quizCorrect: g.quizCorrect, quizTotal: g.quizTotal,
      releasedAt: g.releasedAt,
      // ── FIX: include assignmentId so frontend can send it in remedial request ──
      assignmentId: g.assignmentId || null,
      subject: g.subject,
    })),
  })
}
