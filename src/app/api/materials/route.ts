import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// HOTFIX #3: Helper — safely run a DB query, return [] on any error.
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[materials] safeQuery error:', err)
    return []
  }
}

// Auth via stateless JWT - see @/lib/auth
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // HOTFIX #3: previously `teacher` was never declared — ReferenceError → 500.
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const kelas = req.nextUrl.searchParams.get('kelas')
    const where = kelas && kelas !== 'ALL'
      ? { targetKelas: { contains: kelas }, subject: teacherSubject }
      : { subject: teacherSubject }

    const materials = await safeQuery(() =>
      db.material.findMany({ where, orderBy: { createdAt: 'desc' } }),
    )
    return NextResponse.json({ success: true, materials: materials || [] })
  } catch (fatalErr) {
    // HOTFIX #3: Final fallback — return HTTP 200 with empty array instead of 500 + HTML.
    console.error('[materials] GET FATAL error (returning safe empty array):', fatalErr)
    return NextResponse.json({ success: true, materials: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[materials] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    const { title, content, targetKelas, category, isActive, tpId } = body as {
      title?: string
      content?: string
      targetKelas?: string
      category?: string
      isActive?: boolean
      tpId?: string | null
    }

    if (!title || !content) {
      return NextResponse.json({ error: 'Judul dan isi wajib diisi' }, { status: 400 })
    }

    // HOTFIX #4: Wrap the DB insert in its own try-catch so a schema/DB failure
    // returns a friendly 400 instead of crashing the whole API with 500.
    // tpId is optional — if empty/null/undefined, pass null so the foreign key
    // constraint doesn't block the insert when no CP/TP has been created yet.
    try {
      const material = await db.material.create({
        data: {
          title,
          content,
          subject: teacher.subject || 'Informatika',
          targetKelas: targetKelas || 'ALL',
          category: category || 'Umum',
          isActive: isActive !== false,
          tpId: tpId || null,
          teacherId: teacher.teacherId,
        },
      })
      return NextResponse.json({ success: true, material })
    } catch (dbErr) {
      console.error('[materials] POST DB insert error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal memproses ke database. Pastikan kolom data sesuai.' },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error('[materials] POST FATAL error:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal memproses ke database. Pastikan kolom data sesuai.' },
      { status: 400 },
    )
  }
}
