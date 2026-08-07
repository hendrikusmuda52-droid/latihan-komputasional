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
  const { gradeLevel, chapter, cp, tp, bobotTugas, bobotUH } = await req.json()
  if (!gradeLevel || !chapter || !cp || !tp) return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })

  // Validasi bobot per bab
  const totalBab = (parseFloat(bobotTugas) || 40) + (parseFloat(bobotUH) || 60)
  if (Math.abs(totalBab - 100) > 0.01) {
    return NextResponse.json({ error: `Total bobot Tugas + UH per Bab harus 100%. Saat ini: ${totalBab}%` }, { status: 400 })
  }

  const obj = await db.learningObjective.create({
    data: {
      subject: teacher.subject, gradeLevel, chapter, cp, tp,
      bobotTugas: parseFloat(bobotTugas) || 40,
      bobotUH: parseFloat(bobotUH) || 60,
      teacherId: teacher.teacherId,
    },
  })
  return NextResponse.json({ success: true, objective: obj })
}
