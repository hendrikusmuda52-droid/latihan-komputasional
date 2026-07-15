import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST: login siswa dengan NISN (cek apakah sudah ada progress aktif)
export async function POST(req: NextRequest) {
  try {
    const { nisn } = await req.json()

    if (!nisn) {
      return NextResponse.json({ error: 'NISN wajib diisi' }, { status: 400 })
    }

    const student = await db.student.findUnique({
      where: { nisn },
      include: {
        progresses: {
          where: { isCompleted: false },
          orderBy: { updatedAt: 'desc' },
          take: 1,
        },
      },
    })

    if (!student) {
      return NextResponse.json({
        success: true,
        exists: false,
        message: 'NISN belum terdaftar, silakan daftar dulu',
      })
    }

    const hasActiveProgress = student.progresses.length > 0

    return NextResponse.json({
      success: true,
      exists: true,
      student: {
        id: student.id,
        namaLengkap: student.namaLengkap,
        nisn: student.nisn,
        kelas: student.kelas,
        sekolah: student.sekolah,
        jenisKelamin: student.jenisKelamin,
      },
      hasActiveProgress,
      progressId: hasActiveProgress ? student.progresses[0].id : null,
      currentStage: hasActiveProgress ? student.progresses[0].currentStage : null,
    })
  } catch (error) {
    console.error('Error login siswa:', error)
    return NextResponse.json({ error: 'Gagal login' }, { status: 500 })
  }
}
