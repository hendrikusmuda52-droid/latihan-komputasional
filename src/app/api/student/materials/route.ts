import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'

// Student auth via stateless JWT

export async function GET(req: NextRequest) {
  if (!(await requireStudentAuth(req))) { return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 }) }
  const session = getStudentFromToken(req)!
  const materials = await db.material.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  })
  // Filter berdasarkan kelas siswa
  const filtered = materials.filter(m => m.targetKelas === 'ALL' || m.targetKelas.includes(session.kelas))
  return NextResponse.json({ success: true, materials: filtered })
}
