import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, unknown>
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  return !!(token && g.__teacherSessions?.has(token))
}

// PUT: toggle rilis/batalkan rilis untuk 1 result
// Body: { id: string, isReleased: boolean }
export async function PUT(req: NextRequest) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const { id, isReleased } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'ID result wajib diisi' }, { status: 400 })
    }

    const updated = await db.result.update({
      where: { id },
      data: {
        isReleased: !!isReleased,
        releasedAt: isReleased ? new Date() : null,
      },
    })

    return NextResponse.json({ success: true, result: updated })
  } catch (error) {
    console.error('Error releasing result:', error)
    return NextResponse.json({ error: 'Gagal update status rilis' }, { status: 500 })
  }
}
