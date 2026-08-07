import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET: ambil teks mengetik aktif untuk kelas + subject tertentu
// ?grade=8A&subject=Informatika
export async function GET(req: NextRequest) {
  try {
    const grade = req.nextUrl.searchParams.get('grade')
    const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'

    if (!grade) {
      return NextResponse.json({ error: 'Grade wajib diisi' }, { status: 400 })
    }

    const text = await db.typingText.findFirst({
      where: { gradeLevel: grade, isActive: true, subject },
      orderBy: { updatedAt: 'desc' },
    })

    if (!text) {
      return NextResponse.json({ error: 'Teks tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      text: {
        id: text.id,
        gradeLevel: text.gradeLevel,
        title: text.title,
        content: text.content,
        isStructured: text.isStructured,
      },
    })
  } catch (error) {
    console.error('Error fetching typing text:', error)
    return NextResponse.json({ error: 'Gagal mengambil teks' }, { status: 500 })
  }
}
