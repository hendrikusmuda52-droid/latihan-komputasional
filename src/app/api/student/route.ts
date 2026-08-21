import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { normalizeKelas } from '@/lib/kelas'
import { getJenjang } from '@/lib/constants'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { namaLengkap, nisn, kelas: rawKelas, sekolah, jenisKelamin } = body

    if (!namaLengkap || !nisn || !rawKelas || !sekolah || !jenisKelamin) {
      return NextResponse.json(
        { error: 'Semua field identitas wajib diisi' },
        { status: 400 }
      )
    }

    // ── FIX Bug #2: Normalisasi kelas sebelum disimpan/update ke DB ──
    // Endpoint self-register sebelumnya menerima string kelas apa adanya
    // dari input siswa (bisa "11 DKV", "11dkv", " 11DKV ", dll). Akibatnya,
    // data kelas di DB tidak konsisten dan filter tugas gagal mencocokkan.
    //
    // normalizeKelas() menyatukan format menjadi "11DKV" (uppercase, no spaces).
    const kelas = normalizeKelas(rawKelas)
    if (!kelas) {
      return NextResponse.json(
        { error: 'Kelas tidak boleh kosong' },
        { status: 400 }
      )
    }
    const jenjang = getJenjang(kelas)

    // Cek apakah NISN sudah terdaftar - jika ya, ambil data yang ada
    let student = await db.student.findUnique({ where: { nisn } })

    if (!student) {
      student = await db.student.create({
        data: {
          namaLengkap,
          nisn,
          kelas,
          jenjang,           // FIX: turunkan jenjang dari kelas (SMP/SMK)
          sekolah,
          jenisKelamin,
        },
      })
    } else {
      // Update data jika sudah ada
      student = await db.student.update({
        where: { nisn },
        data: {
          namaLengkap,
          kelas,             // FIX: simpan kelas yang sudah dinormalisasi
          jenjang,           // FIX: sinkronkan jenjang dengan kelas baru
          sekolah,
          jenisKelamin,
        },
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
