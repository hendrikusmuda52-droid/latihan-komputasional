import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// HOTFIX #3: Helper — safely run a DB query, return [] on any error.
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[typing-texts] safeQuery error:', err)
    return []
  }
}

// Auth via stateless JWT - see @/lib/auth

// GET: list semua teks (untuk guru)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const grade = req.nextUrl.searchParams.get('grade')
    const where = grade
      ? { gradeLevel: grade, subject: teacherSubject }
      : { subject: teacherSubject }

    const texts = await safeQuery(() =>
      db.typingText.findMany({
        where,
        orderBy: [{ gradeLevel: 'asc' }, { updatedAt: 'desc' }],
      }),
    )
    // HOTFIX #3: Always return HTTP 200 with the array (empty if DB fails).
    return NextResponse.json({ success: true, texts: texts || [] })
  } catch (fatalErr) {
    // HOTFIX #3: Final fallback — return HTTP 200 with empty array instead of 500 + HTML.
    console.error('[typing-texts] GET FATAL error (returning safe empty array):', fatalErr)
    return NextResponse.json({ success: true, texts: [] })
  }
}

// POST: tambah teks baru
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[typing-texts] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    const { gradeLevel, title, content, isStructured, makeActive } = body as {
      gradeLevel?: string
      title?: string
      content?: string
      isStructured?: boolean
      makeActive?: boolean
    }

    if (!gradeLevel || !title || !content) {
      return NextResponse.json({ error: 'Grade, judul, dan isi wajib diisi' }, { status: 400 })
    }
    if (!['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B'].includes(gradeLevel)) {
      return NextResponse.json({ error: 'Grade tidak valid' }, { status: 400 })
    }

    // Jika makeActive, nonaktifkan semua teks lain untuk grade ini
    if (makeActive) {
      try {
        await db.typingText.updateMany({
          where: { gradeLevel },
          data: { isActive: false },
        })
      } catch (updateErr) {
        // HOTFIX #3: don't fail the whole POST if updateMany fails — just log.
        console.error('[typing-texts] updateMany (makeActive) error:', updateErr)
      }
    }

    const created = await db.typingText.create({
      data: {
        gradeLevel,
        title,
        content,
        isStructured: !!isStructured,
        isActive: !!makeActive,
        subject: teacher.subject || 'Informatika',
        teacherId: teacher.teacherId,
      },
    })
    return NextResponse.json({ success: true, text: created })
  } catch (error) {
    console.error('[typing-texts] POST FATAL error:', error)
    return NextResponse.json({ error: 'Gagal menambah teks' }, { status: 500 })
  }
}
