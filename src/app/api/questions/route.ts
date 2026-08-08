import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, requireAdminAuth } from '@/lib/auth'

// HOTFIX #3: Helper — safely run a DB query, return [] on any error.
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[questions] safeQuery error:', err)
    return []
  }
}

// GET: list semua soal (untuk guru)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    // HOTFIX #3: previously `teacher` was never declared — ReferenceError → 500.
    const { getTeacherFromToken } = await import('@/lib/auth')
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const grade = req.nextUrl.searchParams.get('grade')
    const where = grade
      ? { gradeLevel: grade, subject: teacherSubject }
      : { subject: teacherSubject }

    const questions = await safeQuery(() =>
      db.question.findMany({
        where,
        orderBy: [{ gradeLevel: 'asc' }, { createdAt: 'asc' }],
      }),
    )
    return NextResponse.json({ success: true, questions: questions || [] })
  } catch (fatalErr) {
    // HOTFIX #3: Final fallback — return HTTP 200 with empty array instead of 500 + HTML.
    console.error('[questions] GET FATAL error (returning safe empty array):', fatalErr)
    return NextResponse.json({ success: true, questions: [] })
  }
}

// POST: tambah soal baru
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const { getTeacherFromToken } = await import('@/lib/auth')
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[questions] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    const {
      gradeLevel, question, optionA, optionB, optionC, optionD,
      correctAnswer, explanation, category, imageUrl,
    } = body as {
      gradeLevel?: string
      question?: string
      optionA?: string
      optionB?: string
      optionC?: string
      optionD?: string
      correctAnswer?: number
      explanation?: string
      category?: string
      imageUrl?: string
    }

    if (!gradeLevel || !question || !optionA || !optionB || !optionC || !optionD ||
        correctAnswer === undefined || !explanation || !category) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }
    // HOTFIX #3: accept 7/8/9 + 11DKV/12DKV for SMK subjects.
    if (!['7', '8', '9', '11DKV', '12DKV'].includes(gradeLevel)) {
      return NextResponse.json({ error: 'Grade harus 7, 8, 9, 11DKV, atau 12DKV' }, { status: 400 })
    }
    if (Number(correctAnswer) < 0 || Number(correctAnswer) > 3) {
      return NextResponse.json({ error: 'Jawaban benar harus 0-3' }, { status: 400 })
    }

    const finalSubject = (body.subject as string) || teacher.subject || 'Informatika'
    const created = await db.question.create({
      data: {
        gradeLevel,
        subject: finalSubject,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer: Number(correctAnswer),
        explanation,
        category,
        isActive: true,
        imageUrl: imageUrl || null,
        teacherId: teacher.teacherId,
      },
    })
    return NextResponse.json({ success: true, question: created })
  } catch (error) {
    console.error('[questions] POST FATAL error:', error)
    return NextResponse.json({ error: 'Gagal membuat soal' }, { status: 500 })
  }
}

// Re-export admin auth for manage route
export { requireAdminAuth }
