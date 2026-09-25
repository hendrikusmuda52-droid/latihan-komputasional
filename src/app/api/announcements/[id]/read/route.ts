import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'

// POST /api/announcements/[id]/read — siswa tandai pengumuman sudah dibaca
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireStudentAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const session = getStudentFromToken(req)
    if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const { id } = await params

    // Upsert: kalau sudah ada read record, skip; kalau belum, create
    await db.announcementRead.upsert({
      where: {
        announcementId_studentId: {
          announcementId: id,
          studentId: session.studentId,
        },
      },
      update: {}, // sudah ada, tidak perlu update
      create: {
        announcementId: id,
        studentId: session.studentId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[announcements/read] POST error:', error)
    return NextResponse.json({ error: 'Gagal menandai pengumuman' }, { status: 500 })
  }
}
