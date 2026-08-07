import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'
import { getTeacherFromToken, verifyToken } from '@/lib/auth'

export async function PUT(req: NextRequest) {
  try {
    const teacher = getTeacherFromToken(req)
    if (!teacher) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const body = await req.json()
    const { currentPassword, newUsername, newPassword, newName } = body

    const dbTeacher = await db.teacher.findUnique({ where: { id: teacher.teacherId } })
    if (!dbTeacher) {
      return NextResponse.json({ error: 'Akun tidak ditemukan' }, { status: 404 })
    }

    const currentHash = crypto.createHash('sha256').update(currentPassword || '').digest('hex')
    if (dbTeacher.password !== currentHash) {
      return NextResponse.json({ error: 'Password saat ini salah' }, { status: 400 })
    }

    const updateData: Record<string, string> = {}
    if (newUsername) updateData.username = newUsername
    if (newName) updateData.name = newName
    if (newPassword) {
      updateData.password = crypto.createHash('sha256').update(newPassword).digest('hex')
    }

    const updated = await db.teacher.update({
      where: { id: dbTeacher.id },
      data: updateData,
      select: { id: true, username: true, name: true },
    })

    return NextResponse.json({ success: true, teacher: updated })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Gagal update profil' }, { status: 500 })
  }
}
