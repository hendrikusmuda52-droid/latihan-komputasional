import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// GET: ambil KKM untuk subject guru yang login
export async function GET(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teacher = getTeacherFromToken(req)!
  let config = await db.subjectConfig.findUnique({ where: { subject: teacher.subject } })
  if (!config) {
    config = await db.subjectConfig.create({ data: { subject: teacher.subject, kkm: 75 } })
  }
  return NextResponse.json({ success: true, config })
}

// PUT: update KKM
export async function PUT(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teacher = getTeacherFromToken(req)!
  const { kkm } = await req.json()
  if (kkm === undefined || kkm < 0 || kkm > 100) return NextResponse.json({ error: 'KKM harus 0-100' }, { status: 400 })
  const config = await db.subjectConfig.upsert({
    where: { subject: teacher.subject },
    update: { kkm: parseFloat(kkm) },
    create: { subject: teacher.subject, kkm: parseFloat(kkm) },
  })
  return NextResponse.json({ success: true, config })
}
