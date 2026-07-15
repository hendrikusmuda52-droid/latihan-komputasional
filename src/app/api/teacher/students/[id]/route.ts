import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, unknown>
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  return !!(token && g.__teacherSessions?.has(token))
}

// PUT: update siswa
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const { id } = await params
    const body = await req.json()

    const updateData: Record<string, unknown> = {}
    if (body.namaLengkap !== undefined) updateData.namaLengkap = body.namaLengkap
    if (body.kelas !== undefined) updateData.kelas = body.kelas
    if (body.sekolah !== undefined) updateData.sekolah = body.sekolah
    if (body.jenisKelamin !== undefined) updateData.jenisKelamin = body.jenisKelamin
    if (body.isActive !== undefined) updateData.isActive = body.isActive

    // Update password hanya jika dikirim (non-empty)
    if (body.password) {
      updateData.password = crypto.createHash('sha256').update(body.password).digest('hex')
    }

    // Cek NISN unik jika berubah
    if (body.nisn !== undefined) {
      const existing = await db.student.findUnique({ where: { nisn: body.nisn } })
      if (existing && existing.id !== id) {
        return NextResponse.json({ error: 'NISN sudah dipakai siswa lain' }, { status: 400 })
      }
      updateData.nisn = body.nisn
    }

    const updated = await db.student.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, student: updated })
  } catch (error) {
    console.error('Error updating student:', error)
    return NextResponse.json({ error: 'Gagal update siswa' }, { status: 500 })
  }
}

// DELETE: hapus siswa
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const { id } = await params
    await db.student.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting student:', error)
    return NextResponse.json({ error: 'Gagal menghapus siswa' }, { status: 500 })
  }
}
