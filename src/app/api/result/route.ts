import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      studentId,
      typedText,
      charCount,
      correctChars,
      typingSpeedWPM,
      typingAccuracy,
      typingDuration,
      typingScore,
      quizAnswers,
      quizCorrect,
      quizTotal,
      quizScore,
      quizDuration,
      totalScore,
    } = body

    if (!studentId) {
      return NextResponse.json(
        { error: 'studentId wajib diisi' },
        { status: 400 }
      )
    }

    const result = await db.result.create({
      data: {
        studentId,
        typedText: typedText || '',
        charCount: charCount || 0,
        correctChars: correctChars || 0,
        typingSpeedWPM: typingSpeedWPM || 0,
        typingAccuracy: typingAccuracy || 0,
        typingDuration: typingDuration || 0,
        typingScore: typingScore || 0,
        quizAnswers: quizAnswers || '[]',
        quizCorrect: quizCorrect || 0,
        quizTotal: quizTotal || 0,
        quizScore: quizScore || 0,
        totalScore: totalScore || 0,
      },
    })

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Error saving result:', error)
    return NextResponse.json(
      { error: 'Gagal menyimpan hasil latihan' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const results = await db.result.findMany({
      include: { student: true },
      orderBy: { completedAt: 'desc' },
    })
    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Error fetching results:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil hasil latihan' },
      { status: 500 }
    )
  }
}
