import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, unknown>
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  return !!(token && g.__teacherSessions?.has(token))
}

// PUT: update soal (atau toggle isActive)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const { id } = await params
    const body = await req.json()

    const updateData: Record<string, unknown> = {}
    if (body.gradeLevel !== undefined) updateData.gradeLevel = body.gradeLevel
    if (body.question !== undefined) updateData.question = body.question
    if (body.optionA !== undefined) updateData.optionA = body.optionA
    if (body.optionB !== undefined) updateData.optionB = body.optionB
    if (body.optionC !== undefined) updateData.optionC = body.optionC
    if (body.optionD !== undefined) updateData.optionD = body.optionD
    if (body.correctAnswer !== undefined) updateData.correctAnswer = body.correctAnswer
    if (body.explanation !== undefined) updateData.explanation = body.explanation
    if (body.category !== undefined) updateData.category = body.category
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl || null

    const updated = await db.question.update({
      where: { id },
      data: updateData,
    })
    return NextResponse.json({ success: true, question: updated })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Gagal update soal' }, { status: 500 })
  }
}

// DELETE: hapus soal
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const { id } = await params
    await db.question.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Gagal menghapus soal' }, { status: 500 })
  }
}
