import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// GET: ambil KKM + bobot untuk subject guru
export async function GET(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teacher = getTeacherFromToken(req)!
  let config = await db.subjectConfig.findUnique({ where: { subject: teacher.subject } })
  if (!config) {
    config = await db.subjectConfig.create({ data: { subject: teacher.subject, kkm: 75, bobotNH: 40, bobotUTS: 30, bobotUAS: 30 } })
  }
  return NextResponse.json({ success: true, config })
}

// PUT: update KKM + bobot
export async function PUT(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teacher = getTeacherFromToken(req)!
  const { kkm, bobotNH, bobotUTS, bobotUAS } = await req.json()

  // Validasi: total bobot wajib 100%
  const total = (parseFloat(bobotNH) || 0) + (parseFloat(bobotUTS) || 0) + (parseFloat(bobotUAS) || 0)
  if (Math.abs(total - 100) > 0.01) {
    return NextResponse.json({ error: `Total bobot harus 100%. Saat ini: ${total}%` }, { status: 400 })
  }

  const config = await db.subjectConfig.upsert({
    where: { subject: teacher.subject },
    update: {
      kkm: parseFloat(kkm) || 75,
      bobotNH: parseFloat(bobotNH) || 40,
      bobotUTS: parseFloat(bobotUTS) || 30,
      bobotUAS: parseFloat(bobotUAS) || 30,
    },
    create: {
      subject: teacher.subject,
      kkm: parseFloat(kkm) || 75,
      bobotNH: parseFloat(bobotNH) || 40,
      bobotUTS: parseFloat(bobotUTS) || 30,
      bobotUAS: parseFloat(bobotUAS) || 30,
    },
  })
  return NextResponse.json({ success: true, config })
}
