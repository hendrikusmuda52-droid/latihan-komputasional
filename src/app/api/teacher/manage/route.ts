import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

const g = globalThis as unknown as { __teacherSessions?: Map<string, { role: string }> }

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  const session = token ? g.__teacherSessions?.get(token) : null
  return session?.role === 'admin'
}

// GET: list semua guru
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Akses ditolak - khusus admin' }, { status: 403 })
  }
  const teachers = await db.teacher.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, username: true, name: true, role: true, subject: true, isActive: true, createdAt: true },
  })
  return NextResponse.json({ success: true, teachers })
}

// POST: tambah guru baru (admin only)
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Akses ditolak - khusus admin' }, { status: 403 })
  }
  const { username, password, name, role, subject } = await req.json()
  if (!username || !password || !name) {
    return NextResponse.json({ error: 'Username, password, dan nama wajib diisi' }, { status: 400 })
  }
  const existing = await db.teacher.findUnique({ where: { username } })
  if (existing) {
    return NextResponse.json({ error: 'Username sudah dipakai' }, { status: 400 })
  }
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  const teacher = await db.teacher.create({
    data: { username, password: hash, name, role: role || 'teacher', subject: subject || 'Informatika', isActive: true },
  })
  return NextResponse.json({ success: true, teacher: { id: teacher.id, username: teacher.username, name: teacher.name, role: teacher.role, subject: teacher.subject } })
}
