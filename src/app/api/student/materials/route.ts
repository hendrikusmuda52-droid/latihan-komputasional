import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    if (!(await requireStudentAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const session = getStudentFromToken(req)!
    if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'

    const materials = await db.material.findMany({
      where: { isActive: true, subject },
      orderBy: { createdAt: 'desc' },
    })
    const filtered = materials.filter(m => m.targetKelas === 'ALL' || m.targetKelas.includes(session.kelas))
    return NextResponse.json({ success: true, materials: filtered })
  } catch {
    return NextResponse.json({ error: 'Gagal' }, { status: 500 })
  }
}
