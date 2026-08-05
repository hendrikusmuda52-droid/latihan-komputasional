import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const g = globalThis as unknown as { __studentSessions?: Map<string, { kelas: string }> }

export async function GET(req: NextRequest) {
  const token = req.cookies.get('student_token')?.value
  if (!token || !g.__studentSessions?.has(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const session = g.__studentSessions.get(token)!
  const materials = await db.material.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  })
  // Filter berdasarkan kelas siswa
  const filtered = materials.filter(m => m.targetKelas === 'ALL' || m.targetKelas.includes(session.kelas))
  return NextResponse.json({ success: true, materials: filtered })
}
