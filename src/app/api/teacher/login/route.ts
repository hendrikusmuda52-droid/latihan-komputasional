import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'
import { createTeacherToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const teacher = await db.teacher.findUnique({ where: { username } })

    if (!teacher || teacher.password !== hash) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 })
    }

    const role = (teacher as Record<string, unknown>).role as string || 'teacher'
    const subject = (teacher as Record<string, unknown>).subject as string || 'Informatika'

    // Buat JWT token (stateless - tidak butuh memory)
    const token = createTeacherToken({
      teacherId: teacher.id,
      username: teacher.username,
      name: teacher.name,
      role,
      subject,
    })

    const res = NextResponse.json({
      success: true,
      teacher: { id: teacher.id, username: teacher.username, name: teacher.name, role, subject },
      token,
    })
    res.cookies.set('teacher_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    })
    return res
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Gagal login' }, { status: 500 })
  }
}
