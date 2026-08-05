import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET: ambil soal aktif untuk jenjang tertentu
// ?grade=8 atau ?grade=9
export async function GET(req: NextRequest) {
  try {
    const grade = req.nextUrl.searchParams.get('grade')
    if (!grade || !['7', '8', '9'].includes(grade)) {
      return NextResponse.json({ error: 'Grade tidak valid' }, { status: 400 })
    }

    const questions = await db.question.findMany({
      where: { gradeLevel: grade, isActive: true },
      orderBy: { createdAt: 'asc' },
    })

    // Format ke struktur yang dipakai frontend
    const formatted = questions.map((q, i) => ({
      id: i + 1,
      dbId: q.id,
      question: q.question,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      category: q.category,
      imageUrl: q.imageUrl || null,
    }))

    return NextResponse.json({ success: true, questions: formatted })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Gagal mengambil soal' }, { status: 500 })
  }
}
