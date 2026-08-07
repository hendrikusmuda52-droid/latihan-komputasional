import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)!
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })
    const assignments = await db.assignment.findMany({ where: { subject: teacher.subject }, orderBy: { createdAt: "desc" } })
    return NextResponse.json({ success: true, assignments })
  } catch (error) {
    console.error('Error fetching assignments:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)!
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })
    const body = await req.json()
    const { title, description, targetKelas, dueDate, isActive, exerciseType, questionCount, taskType } = body
    if (!title) {
      return NextResponse.json({ error: 'Judul wajib diisi' }, { status: 400 })
    }
    const assignment = await db.assignment.create({
      data: {
        subject: teacher.subject,
        title, description: description || '', targetKelas: targetKelas || 'ALL',
        isActive: isActive !== false, dueDate: dueDate ? new Date(dueDate) : null,
        exerciseType: exerciseType || 'wajib', questionCount: questionCount || 0,
        taskType: taskType || 'typing_quiz',
      },
    })
    return NextResponse.json({ success: true, assignment })
  } catch (error) {
    console.error('Error creating assignment:', error)
    return NextResponse.json({ error: 'Gagal membuat tugas' }, { status: 500 })
  }
}
