import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { namaLengkap, nisn, kelas, sekolah, jenisKelamin } = body

    if (!namaLengkap || !nisn || !kelas || !sekolah || !jenisKelamin) {
      return NextResponse.json(
        { error: 'Semua field identitas wajib diisi' },
        { status: 400 }
      )
    }

    // Cek apakah NISN sudah terdaftar - jika ya, ambil data yang ada
    let student = await db.student.findUnique({ where: { nisn } })

    if (!student) {
      student = await db.student.create({
        data: {
          namaLengkap,
          nisn,
          kelas,
          sekolah,
          jenisKelamin,
        },
      })
    } else {
      // Update data jika sudah ada
      student = await db.student.update({
        where: { nisn },
        data: { namaLengkap, kelas, sekolah, jenisKelamin },
      })
    }

    return NextResponse.json({ success: true, student })
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json(
      { error: 'Gagal menyimpan data siswa' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const students = await db.student.findMany({
      orderBy: { createdAt: 'desc' },
      include: { results: true },
    })
    return NextResponse.json({ success: true, students })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data siswa' },
      { status: 500 }
    )
  }
}
