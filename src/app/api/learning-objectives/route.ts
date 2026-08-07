import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teacher = getTeacherFromToken(req)!
  const objectives = await db.learningObjective.findMany({
    where: { subject: teacher.subject, isActive: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ success: true, objectives })
}

export async function POST(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teacher = getTeacherFromToken(req)!
  const { gradeLevel, chapter, cp, tp } = await req.json()
  if (!gradeLevel || !chapter || !cp || !tp) return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
  const obj = await db.learningObjective.create({ data: { subject: teacher.subject, gradeLevel, chapter, cp, tp, teacherId: teacher.teacherId } })
  return NextResponse.json({ success: true, objective: obj })
}
