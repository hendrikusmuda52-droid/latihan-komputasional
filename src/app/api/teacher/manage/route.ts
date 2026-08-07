import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'
import { requireAdminAuth, getTeacherFromToken } from '@/lib/auth'

// Valid roles
const VALID_ROLES = ['admin', 'guru', 'bendahara']

// GET: list semua user (admin only)
export async function GET(req: NextRequest) {
  if (!(await requireAdminAuth(req))) {
    return NextResponse.json({ error: 'Akses ditolak - khusus admin' }, { status: 403 })
  }

  const teachers = await db.teacher.findMany({
    orderBy: [{ role: 'asc' }, { createdAt: 'asc' }],
    select: {
      id: true, username: true, name: true, role: true,
      subject: true, isActive: true, createdAt: true,
    },
  })

  // Format untuk frontend
  const formatted = teachers.map(t => ({
    id: t.id,
    username: t.username,
    name: t.name,
    role: t.role || 'guru',
    subject: t.subject || '',
    isActive: t.isActive,
    createdAt: t.createdAt,
  }))

  return NextResponse.json({ success: true, teachers: formatted })
}

// POST: tambah user baru (admin only)
export async function POST(req: NextRequest) {
  if (!(await requireAdminAuth(req))) {
    return NextResponse.json({ error: 'Akses ditolak - khusus admin' }, { status: 403 })
  }

  const body = await req.json()
  const { username, password, name, role, subject, kelasDiampu } = body

  // Validasi
  if (!username || !password || !name) {
    return NextResponse.json({ error: 'Username, password, dan nama wajib diisi' }, { status: 400 })
  }

  if (password.length < 4) {
    return NextResponse.json({ error: 'Password minimal 4 karakter' }, { status: 400 })
  }

  const finalRole = role || 'guru'
  if (!VALID_ROLES.includes(finalRole)) {
    return NextResponse.json({ error: 'Role tidak valid. Pilih: admin, guru, atau bendahara' }, { status: 400 })
  }

  // Cek duplikat username
  const existing = await db.teacher.findUnique({ where: { username } })
  if (existing) {
    return NextResponse.json({ error: 'Username sudah dipakai' }, { status: 400 })
  }

  // Hash password
  const hash = crypto.createHash('sha256').update(password).digest('hex')

  // Tentukan subject berdasarkan role
  let finalSubject = subject || ''
  if (finalRole === 'bendahara') {
    finalSubject = 'Bendahara Sekolah'
  } else if (finalRole === 'admin' && !finalSubject) {
    finalSubject = 'Informatika'
  } else if (finalRole === 'guru' && !finalSubject) {
    finalSubject = 'Informatika'
  }

  // Create user
  const teacher = await db.teacher.create({
    data: {
      username,
      password: hash,
      name,
      role: finalRole,
      subject: finalSubject,
      isActive: true,
    },
    select: {
      id: true, username: true, name: true, role: true, subject: true, isActive: true,
    },
  })

  return NextResponse.json({
    success: true,
    teacher: teacher,
    message: `User "${name}" berhasil ditambahkan sebagai ${finalRole === 'admin' ? 'Admin' : finalRole === 'bendahara' ? 'Bendahara Sekolah' : 'Guru ' + finalSubject}`,
  })
}

// PUT: update user (admin only) - toggle active, update role, reset password
export async function PUT(req: NextRequest) {
  if (!(await requireAdminAuth(req))) {
    return NextResponse.json({ error: 'Akses ditolak - khusus admin' }, { status: 403 })
  }

  const body = await req.json()
  const { id, role, subject, isActive, password } = body

  if (!id) {
    return NextResponse.json({ error: 'ID user wajib diisi' }, { status: 400 })
  }

  const updateData: Record<string, unknown> = {}

  if (role !== undefined) {
    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: 'Role tidak valid' }, { status: 400 })
    }
    updateData.role = role
  }

  if (subject !== undefined) updateData.subject = subject
  if (isActive !== undefined) updateData.isActive = isActive

  if (password) {
    if (password.length < 4) {
      return NextResponse.json({ error: 'Password minimal 4 karakter' }, { status: 400 })
    }
    updateData.password = crypto.createHash('sha256').update(password).digest('hex')
  }

  const updated = await db.teacher.update({
    where: { id },
    data: updateData,
    select: { id: true, username: true, name: true, role: true, subject: true, isActive: true },
  })

  return NextResponse.json({ success: true, teacher: updated })
}

// DELETE: hapus user (admin only)
export async function DELETE(req: NextRequest) {
  if (!(await requireAdminAuth(req))) {
    return NextResponse.json({ error: 'Akses ditolak - khusus admin' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID user wajib diisi' }, { status: 400 })
  }

  // Cek apakah user yang dihapus adalah admin terakhir
  const adminCount = await db.teacher.count({ where: { role: 'admin', isActive: true } })
  const targetTeacher = await db.teacher.findUnique({ where: { id } })

  if (targetTeacher?.role === 'admin' && adminCount <= 1) {
    return NextResponse.json({ error: 'Tidak bisa menghapus admin terakhir!' }, { status: 400 })
  }

  await db.teacher.delete({ where: { id } })
  return NextResponse.json({ success: true, message: 'User berhasil dihapus' })
}
