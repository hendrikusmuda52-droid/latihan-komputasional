import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const g = globalThis as unknown as { __teacherSessions?: Map<string, unknown> }
async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  return !!(token && g.__teacherSessions?.has(token))
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const kelas = req.nextUrl.searchParams.get('kelas')
  const where = kelas && kelas !== 'ALL' ? { targetKelas: { contains: kelas } } : {}
  const materials = await db.material.findMany({ where, orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ success: true, materials })
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, content, targetKelas, category, isActive } = await req.json()
  if (!title || !content) return NextResponse.json({ error: 'Judul dan isi wajib diisi' }, { status: 400 })
  const material = await db.material.create({
    data: { title, content, targetKelas: targetKelas || 'ALL', category: category || 'Umum', isActive: isActive !== false }
  })
  return NextResponse.json({ success: true, material })
}
