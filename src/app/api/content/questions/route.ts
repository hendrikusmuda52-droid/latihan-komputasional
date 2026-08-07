import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET: ambil soal aktif untuk jenjang + subject tertentu
// ?grade=8&subject=Informatika
export async function GET(req: NextRequest) {
  try {
    const grade = req.nextUrl.searchParams.get('grade')
    const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'

    if (!grade) {
      return NextResponse.json({ error: 'Grade wajib diisi' }, { status: 400 })
    }

    const questions = await db.question.findMany({
      where: { gradeLevel: grade, isActive: true, subject },
      orderBy: { createdAt: 'asc' },
    })

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
