import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import { sanitizeMarkdownContent } from '@/lib/markdown-sanitizer'

// Auth via stateless JWT - see @/lib/auth

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teacher = getTeacherFromToken(req)
  if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

  const { id } = await params
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body bukan JSON valid' }, { status: 400 })
  }

  // ── Build update data, sanitizing content if present ──
  const updateData: Record<string, unknown> = {}
  const allowedFields = [
    'title', 'content', 'targetKelas', 'category', 'isActive',
    'cpId', 'tpId', 'mediaType', 'mediaUrl', 'imageUrl',
  ]

  for (const field of allowedFields) {
    if (field in body) {
      let value = body[field]
      // Sanitize content (Bug #2 fix)
      if (field === 'content' && typeof value === 'string') {
        value = sanitizeMarkdownContent(value)
      }
      // Convert empty strings to null for optional FK fields
      if ((field === 'cpId' || field === 'tpId') && (value === '' || value === undefined)) {
        value = null
      }
      updateData[field] = value
    }
  }

  try {
    const updated = await db.material.update({
      where: { id },
      data: updateData,
    })
    return NextResponse.json({ success: true, material: updated })
  } catch (dbErr) {
    console.error('[materials] PUT DB error:', dbErr)
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui materi.' },
      { status: 400 },
    )
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await db.material.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
