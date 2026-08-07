import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'
import { requireTeacherAuth } from '@/lib/auth'

// Auth via stateless JWT - see @/lib/auth

// GET: list semua siswa
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const kelas = req.nextUrl.searchParams.get('kelas')
    const where = kelas && kelas !== 'ALL' ? { kelas } : {}

    const students = await db.student.findMany({
      where,
      orderBy: [{ kelas: 'asc' }, { namaLengkap: 'asc' }],
      include: {
        _count: {
          select: { results: true },
        },
      },
    })

    const formatted = students.map((s) => ({
      id: s.id,
      namaLengkap: s.namaLengkap,
      nisn: s.nisn,
      kelas: s.kelas,
      sekolah: s.sekolah,
      jenisKelamin: s.jenisKelamin,
      hasPassword: !!s.password,
      isActive: s.isActive,
      resultCount: s._count.results,
      createdAt: s.createdAt,
    }))

    return NextResponse.json({ success: true, students: formatted })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json({ error: 'Gagal mengambil data siswa' }, { status: 500 })
  }
}

// POST: tambah siswa baru
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const body = await req.json()
    const { namaLengkap, nisn, password, kelas, sekolah, jenisKelamin, isActive } = body

    if (!namaLengkap || !nisn || !kelas || !sekolah || !jenisKelamin) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }

    // Cek duplikat NISN
    const existing = await db.student.findUnique({ where: { nisn } })
    if (existing) {
      return NextResponse.json({ error: 'NISN sudah terdaftar' }, { status: 400 })
    }

    const hash = password ? crypto.createHash('sha256').update(password).digest('hex') : ''

    const student = await db.student.create({
      data: {
        namaLengkap,
        nisn,
        password: hash,
        kelas,
        sekolah,
        jenisKelamin,
        isActive: isActive !== false,
      },
    })

    return NextResponse.json({ success: true, student })
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json({ error: 'Gagal menambah siswa' }, { status: 500 })
  }
}
