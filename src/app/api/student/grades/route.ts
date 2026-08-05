import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const g = globalThis as unknown as { __studentSessions?: Map<string, { studentId: string }> }

export async function GET(req: NextRequest) {
  const token = req.cookies.get('student_token')?.value
  if (!token || !g.__studentSessions?.has(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const session = g.__studentSessions.get(token)!
  
  // Ambil nilai manual yang sudah dirilis
  const manualGrades = await db.manualGrade.findMany({
    where: { studentId: session.studentId, isReleased: true },
    orderBy: { createdAt: 'desc' },
  })
  
  // Ambil nilai otomatis dari hasil latihan yang sudah dirilis
  const autoGrades = await db.result.findMany({
    where: { studentId: session.studentId, isReleased: true },
    orderBy: { releasedAt: 'desc' },
  })
  
  return NextResponse.json({
    success: true,
    manualGrades: manualGrades.map(g => ({
      id: g.id, title: g.title, score: g.score, description: g.description,
      createdAt: g.createdAt,
    })),
    autoGrades: autoGrades.map(g => ({
      id: g.id, title: 'Latihan Mengetik & HOTS', score: g.totalScore,
      typingScore: g.typingScore, quizScore: g.quizScore,
      typingSpeedWPM: g.typingSpeedWPM, typingAccuracy: g.typingAccuracy,
      quizCorrect: g.quizCorrect, quizTotal: g.quizTotal,
      releasedAt: g.releasedAt,
    })),
  })
}
