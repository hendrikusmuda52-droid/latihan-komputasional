import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, requireAdminAuth } from '@/lib/auth'

// GET: list semua soal (untuk guru)
export async function GET(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
  }
  const grade = req.nextUrl.searchParams.get('grade')
  const where = grade ? { gradeLevel: grade } : {}

  const questions = await db.question.findMany({
    where,
    orderBy: [{ gradeLevel: 'asc' }, { createdAt: 'asc' }],
  })
  return NextResponse.json({ success: true, questions })
}

// POST: tambah soal baru
export async function POST(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
  }
  const body = await req.json()
  const { gradeLevel, question, optionA, optionB, optionC, optionD, correctAnswer, explanation, category, imageUrl } = body

  if (!gradeLevel || !question || !optionA || !optionB || !optionC || !optionD ||
      correctAnswer === undefined || !explanation || !category) {
    return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
  }
  if (!['7', '8', '9'].includes(gradeLevel)) {
    return NextResponse.json({ error: 'Grade harus 7, 8 atau 9' }, { status: 400 })
  }
  if (correctAnswer < 0 || correctAnswer > 3) {
    return NextResponse.json({ error: 'Jawaban benar harus 0-3' }, { status: 400 })
  }

  const created = await db.question.create({
    data: { gradeLevel, question, optionA, optionB, optionC, optionD, correctAnswer, explanation, category, isActive: true, imageUrl: imageUrl || null },
  })
  return NextResponse.json({ success: true, question: created })
}

// Re-export admin auth for manage route
export { requireAdminAuth }
