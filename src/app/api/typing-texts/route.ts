import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, unknown>
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  return !!(token && g.__teacherSessions?.has(token))
}

// GET: list semua teks (untuk guru)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const grade = req.nextUrl.searchParams.get('grade')
    const where = grade ? { gradeLevel: grade } : {}

    const texts = await db.typingText.findMany({
      where,
      orderBy: [{ gradeLevel: 'asc' }, { updatedAt: 'desc' }],
    })
    return NextResponse.json({ success: true, texts })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 })
  }
}

// POST: tambah teks baru
export async function POST(req: NextRequest) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const body = await req.json()
    const { gradeLevel, title, content, isStructured, makeActive } = body

    if (!gradeLevel || !title || !content) {
      return NextResponse.json({ error: 'Grade, judul, dan isi wajib diisi' }, { status: 400 })
    }
    if (!['8A', '8B', '8C', '9A', '9B'].includes(gradeLevel)) {
      return NextResponse.json({ error: 'Grade tidak valid' }, { status: 400 })
    }

    // Jika makeActive, nonaktifkan semua teks lain untuk grade ini
    if (makeActive) {
      await db.typingText.updateMany({
        where: { gradeLevel },
        data: { isActive: false },
      })
    }

    const created = await db.typingText.create({
      data: {
        gradeLevel,
        title,
        content,
        isStructured: !!isStructured,
        isActive: !!makeActive,
      },
    })
    return NextResponse.json({ success: true, text: created })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Gagal menambah teks' }, { status: 500 })
  }
}
