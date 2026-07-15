import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, unknown>
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  return !!(token && g.__teacherSessions?.has(token))
}

// PUT: update assignment
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
    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.targetKelas !== undefined) updateData.targetKelas = body.targetKelas
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    if (body.dueDate !== undefined) {
      updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null
    }

    const updated = await db.assignment.update({
      where: { id },
      data: updateData,
    })
    return NextResponse.json({ success: true, assignment: updated })
  } catch (error) {
    console.error('Error updating assignment:', error)
    return NextResponse.json({ error: 'Gagal update tugas' }, { status: 500 })
  }
}

// DELETE: hapus assignment
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const { id } = await params
    await db.assignment.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting assignment:', error)
    return NextResponse.json({ error: 'Gagal menghapus tugas' }, { status: 500 })
  }
}
