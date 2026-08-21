import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth } from '@/lib/auth'

const MAX_TP_LENGTH = 100

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const body = await req.json()

    // Validate 100-char limit on update
    if (body.deskripsi !== undefined && String(body.deskripsi).length > MAX_TP_LENGTH) {
      return NextResponse.json({
        error: `Deskripsi TP melebihi batas ${MAX_TP_LENGTH} karakter (saat ini: ${String(body.deskripsi).length})`,
      }, { status: 400 })
    }

    const updated = await db.tujuanPembelajaran.update({ where: { id }, data: body })
    return NextResponse.json({ success: true, tp: updated })
  } catch (error) {
    console.error('[tp] PUT error:', error)
    return NextResponse.json({ error: 'Gagal update TP' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    await db.tujuanPembelajaran.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[tp] DELETE error:', error)
    return NextResponse.json({ error: 'Gagal menghapus TP' }, { status: 500 })
  }
}
