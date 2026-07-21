import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, unknown>
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  if (!token || !g.__teacherSessions?.has(token)) return false
  return true
}

// GET: list semua soal (untuk guru) - ?grade=8 atau ?grade=9 atau tanpa filter
export async function GET(req: NextRequest) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const grade = req.nextUrl.searchParams.get('grade')
    const where = grade ? { gradeLevel: grade } : {}

    const questions = await db.question.findMany({
      where,
      orderBy: [{ gradeLevel: 'asc' }, { createdAt: 'asc' }],
    })
    return NextResponse.json({ success: true, questions })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

// POST: tambah soal baru
export async function POST(req: NextRequest) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const body = await req.json()
    const { gradeLevel, question, optionA, optionB, optionC, optionD, correctAnswer, explanation, category } = body

    if (!gradeLevel || !question || !optionA || !optionB || !optionC || !optionD ||
        correctAnswer === undefined || !explanation || !category) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }
    if (!['7', '8', '9'].includes(gradeLevel)) {
      return NextResponse.json({ error: 'Grade harus 8 atau 9' }, { status: 400 })
    }
    if (correctAnswer < 0 || correctAnswer > 3) {
      return NextResponse.json({ error: 'Jawaban benar harus 0-3' }, { status: 400 })
    }

    const created = await db.question.create({
      data: { gradeLevel, question, optionA, optionB, optionC, optionD, correctAnswer, explanation, category, isActive: true },
    })
    return NextResponse.json({ success: true, question: created })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Gagal menambah soal' }, { status: 500 })
  }
}
