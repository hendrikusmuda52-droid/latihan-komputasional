import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const body = await req.json()
    const updated = await db.catatanSikap.update({ where: { id }, data: body })
    return NextResponse.json({ success: true, record: updated })
  } catch (error) {
    console.error('[sikap] PUT error:', error)
    return NextResponse.json({ error: 'Gagal update catatan sikap' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    await db.catatanSikap.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[sikap] DELETE error:', error)
    return NextResponse.json({ error: 'Gagal menghapus catatan sikap' }, { status: 500 })
  }
}
