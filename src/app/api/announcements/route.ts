import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken, requireStudentAuth, getStudentFromToken } from '@/lib/auth'

// GET: siswa ambil pengumuman belum dibaca untuk kelas/subject mereka
// GET /api/announcements?studentId=xxx&kelas=7A&subject=Informatika
// ATAU guru ambil semua pengumuman: GET /api/announcements?teacher=true
export async function GET(req: NextRequest) {
  try {
    const isTeacher = await requireTeacherAuth(req)
    const isStudent = await requireStudentAuth(req)

    if (isTeacher) {
      // Guru: ambil semua pengumuman yang ia buat
      const teacher = getTeacherFromToken(req)
      if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })
      const announcements = await db.announcement.findMany({
        where: { teacherId: teacher.teacherId },
        orderBy: { createdAt: 'desc' },
        take: 50,
      })
      return NextResponse.json({ success: true, announcements })
    }

    if (isStudent) {
      // Siswa: ambil pengumuman belum dibaca untuk kelas + subject mereka
      const session = getStudentFromToken(req)
      if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

      const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'
      const kelas = session.kelas

      // Ambil pengumuman aktif yang target-nya cocok dengan kelas siswa
      const allActive = await db.announcement.findMany({
        where: {
          isActive: true,
          subject,
        },
        orderBy: { createdAt: 'desc' },
        include: {
          reads: {
            where: { studentId: session.studentId },
            select: { id: true, readAt: true },
          },
        },
      })

      // Filter: targetKelas cocok (ALL atau mengandung kelas siswa)
      const matching = allActive.filter(a => {
        if (a.targetKelas === 'ALL') return true
        return a.targetKelas.includes(kelas)
      })

      // Pisahkan: belum dibaca vs sudah dibaca
      const unread = matching.filter(a => a.reads.length === 0).map(a => ({
        id: a.id, title: a.title, content: a.content,
        teacherName: a.teacherName, subject: a.subject,
        targetKelas: a.targetKelas, createdAt: a.createdAt,
      }))
      const read = matching.filter(a => a.reads.length > 0).map(a => ({
        id: a.id, title: a.title, content: a.content,
        teacherName: a.teacherName, subject: a.subject,
        targetKelas: a.targetKelas, createdAt: a.createdAt,
        readAt: a.reads[0].readAt,
      }))

      return NextResponse.json({ success: true, unread, read, totalUnread: unread.length })
    }

    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
  } catch (error) {
    console.error('[announcements] GET error:', error)
    return NextResponse.json({ error: 'Gagal mengambil pengumuman' }, { status: 500 })
  }
}

// POST: guru buat pengumuman baru
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const body = await req.json()
    const { title, content, targetKelas, targetJenjang } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Judul dan isi wajib diisi' }, { status: 400 })
    }

    const announcement = await db.announcement.create({
      data: {
        teacherId: teacher.teacherId,
        teacherName: teacher.name || teacher.username,
        subject: teacher.subject || 'Informatika',
        title: title.trim(),
        content: content.trim(),
        targetKelas: targetKelas || 'ALL',
        targetJenjang: targetJenjang || 'ALL',
        isActive: true,
      },
    })

    return NextResponse.json({ success: true, announcement })
  } catch (error) {
    console.error('[announcements] POST error:', error)
    return NextResponse.json({ error: 'Gagal membuat pengumuman' }, { status: 500 })
  }
}

// DELETE: guru hapus pengumuman
export async function DELETE(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const id = req.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 })

    await db.announcement.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[announcements] DELETE error:', error)
    return NextResponse.json({ error: 'Gagal menghapus pengumuman' }, { status: 500 })
  }
}
