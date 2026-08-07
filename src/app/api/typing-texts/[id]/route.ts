import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth } from '@/lib/auth'

// Auth via stateless JWT - see @/lib/auth

// PUT: update teks (atau toggle isActive)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const { id } = await params
    const body = await req.json()

    const updateData: Record<string, unknown> = {}
    if (body.gradeLevel !== undefined) updateData.gradeLevel = body.gradeLevel
    if (body.title !== undefined) updateData.title = body.title
    if (body.content !== undefined) updateData.content = body.content
    if (body.isStructured !== undefined) updateData.isStructured = body.isStructured
    if (body.isActive !== undefined) updateData.isActive = body.isActive

    // Jika mengaktifkan teks ini, nonaktifkan teks lain untuk grade yang sama
    if (body.isActive === true) {
      const current = await db.typingText.findUnique({ where: { id } })
      if (current) {
        await db.typingText.updateMany({
          where: { gradeLevel: current.gradeLevel, id: { not: id } },
          data: { isActive: false },
        })
      }
    }

    const updated = await db.typingText.update({
      where: { id },
      data: updateData,
    })
    return NextResponse.json({ success: true, text: updated })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Gagal update teks' }, { status: 500 })
  }
}

// DELETE: hapus teks
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const { id } = await params
    await db.typingText.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Gagal menghapus teks' }, { status: 500 })
  }
}
