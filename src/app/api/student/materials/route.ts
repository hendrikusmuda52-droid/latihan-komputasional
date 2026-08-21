import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'
import { isKelasMatch } from '@/lib/kelas'

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
    // FIX Bug #2: pakai isKelasMatch agar pencocokan kelas case-insensitive
    // dan mengabaikan spasi. Sebelumnya memakai m.targetKelas.includes(session.kelas)
    // yang case-sensitive + substring match (bisa false-positive).
    const filtered = materials.filter(m => isKelasMatch(session.kelas, m.targetKelas))
    return NextResponse.json({ success: true, materials: filtered })
  } catch {
    return NextResponse.json({ error: 'Gagal' }, { status: 500 })
  }
}
