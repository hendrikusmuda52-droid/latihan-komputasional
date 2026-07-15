import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, { teacherId: string; username: string; name: string }>
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  if (!token || !g.__teacherSessions?.has(token)) return null
  return { token, session: g.__teacherSessions.get(token)! }
}

// PUT: ubah username dan/atau password
export async function PUT(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    if (!auth) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const body = await req.json()
    const { currentPassword, newUsername, newPassword, newName } = body

    // Verifikasi password saat ini
    const teacher = await db.teacher.findUnique({
      where: { id: auth.session.teacherId },
    })
    if (!teacher) {
      return NextResponse.json({ error: 'Akun tidak ditemukan' }, { status: 404 })
    }

    const currentHash = crypto.createHash('sha256').update(currentPassword || '').digest('hex')
    if (teacher.password !== currentHash) {
      return NextResponse.json({ error: 'Password saat ini salah' }, { status: 400 })
    }

    // Cek username unik jika berubah
    if (newUsername && newUsername !== teacher.username) {
      const existing = await db.teacher.findUnique({ where: { username: newUsername } })
      if (existing) {
        return NextResponse.json({ error: 'Username sudah digunakan' }, { status: 400 })
      }
    }

    // Update field
    const updateData: Record<string, string> = {}
    if (newUsername) updateData.username = newUsername
    if (newName) updateData.name = newName
    if (newPassword) {
      updateData.password = crypto.createHash('sha256').update(newPassword).digest('hex')
    }

    const updated = await db.teacher.update({
      where: { id: teacher.id },
      data: updateData,
      select: { id: true, username: true, name: true },
    })

    // Update session
    g.__teacherSessions!.set(auth.token, {
      teacherId: updated.id,
      username: updated.username,
      name: updated.name,
    })

    return NextResponse.json({ success: true, teacher: updated })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Gagal update profil' }, { status: 500 })
  }
}
