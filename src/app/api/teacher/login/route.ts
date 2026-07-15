import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

// Simpan session di globalThis agar konsisten antar route
const g = globalThis as unknown as {
  __teacherSessions?: Map<string, { teacherId: string; username: string; name: string }>
}
if (!g.__teacherSessions) g.__teacherSessions = new Map()
export const teacherSessions = g.__teacherSessions

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      )
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const teacher = await db.teacher.findUnique({ where: { username } })

    if (!teacher || teacher.password !== hash) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      )
    }

    const token = crypto.randomBytes(32).toString('hex')
    teacherSessions.set(token, {
      teacherId: teacher.id,
      username: teacher.username,
      name: teacher.name,
    })

    const res = NextResponse.json({
      success: true,
      teacher: { id: teacher.id, username: teacher.username, name: teacher.name },
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
