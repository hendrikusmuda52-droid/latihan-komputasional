import { NextRequest, NextResponse } from 'next/server'
import { requireTeacherAuth } from '@/lib/auth'
import { db } from '@/lib/db'
import { listTaskPhotos } from '@/lib/google-drive'

// GET /api/teacher/task-photos?assignmentId=X&studentId=Y
// Guru lihat foto catatan siswa dari Google Drive

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const assignmentId = req.nextUrl.searchParams.get('assignmentId')
    const studentId = req.nextUrl.searchParams.get('studentId')

    if (!assignmentId || !studentId) {
      return NextResponse.json({ error: 'assignmentId dan studentId wajib diisi' }, { status: 400 })
    }

    // Ambil info tugas + siswa
    const [assignment, student] = await Promise.all([
      db.assignment.findUnique({
        where: { id: assignmentId },
        select: { id: true, title: true },
      }),
      db.student.findUnique({
        where: { id: studentId },
        select: { id: true, namaLengkap: true, kelas: true },
      }),
    ])

    if (!assignment || !student) {
      return NextResponse.json({ error: 'Tugas atau siswa tidak ditemukan' }, { status: 404 })
    }

    // List foto dari Google Drive
    const result = await listTaskPhotos({
      studentName: student.namaLengkap,
      taskTitle: assignment.title,
    })

    return NextResponse.json({
      success: true,
      student: { id: student.id, namaLengkap: student.namaLengkap, kelas: student.kelas },
      assignment: { id: assignment.id, title: assignment.title },
      photos: result.photos || [],
    })
  } catch (error) {
    console.error('[task-photos] error:', error)
    return NextResponse.json({ success: true, photos: [] })
  }
}
