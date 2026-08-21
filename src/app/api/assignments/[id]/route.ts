import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth } from '@/lib/auth'

// Auth via stateless JWT - see @/lib/auth

// PUT: update assignment
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireTeacherAuth(req))) {
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
    if (body.exerciseType !== undefined) updateData.exerciseType = body.exerciseType
    if (body.questionCount !== undefined) updateData.questionCount = body.questionCount
    if (body.taskType !== undefined) updateData.taskType = body.taskType
    // ── FIX #2: duration field ──
    if (body.duration !== undefined) updateData.duration = body.duration
    // v2 fields
    if (body.cpId !== undefined) updateData.cpId = body.cpId || null
    if (body.tpId !== undefined) updateData.tpId = body.tpId || null
    if (body.taskCategory !== undefined) updateData.taskCategory = body.taskCategory
    if (body.taskTypeName !== undefined) updateData.taskTypeName = body.taskTypeName
    if (body.tahunAjaran !== undefined) updateData.tahunAjaran = body.tahunAjaran
    if (body.semester !== undefined) updateData.semester = body.semester

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
    if (!(await requireTeacherAuth(req))) {
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
