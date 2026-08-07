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
