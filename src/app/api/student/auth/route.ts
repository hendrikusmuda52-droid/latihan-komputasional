import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'
import { createStudentToken, getStudentFromToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { nisn, password } = await req.json()
    if (!nisn || !password) {
      return NextResponse.json({ error: 'NISN dan password wajib diisi' }, { status: 400 })
    }

    const student = await db.student.findUnique({ where: { nisn } })
    if (!student) {
      return NextResponse.json({ error: 'NISN tidak terdaftar' }, { status: 401 })
    }
    if (!student.password) {
      return NextResponse.json({ error: 'Password belum diset oleh guru. Hubungi guru.' }, { status: 403 })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    if (student.password !== hash) {
      return NextResponse.json({ error: 'Password salah' }, { status: 401 })
    }

    // Buat JWT token (stateless)
    const token = createStudentToken({
      studentId: student.id,
      nisn: student.nisn,
      namaLengkap: student.namaLengkap,
      kelas: student.kelas,
    })

    const res = NextResponse.json({
      success: true,
      student: {
        id: student.id,
        namaLengkap: student.namaLengkap,
        nisn: student.nisn,
        kelas: student.kelas,
        sekolah: student.sekolah,
        jenisKelamin: student.jenisKelamin,
      },
    })
    res.cookies.set('student_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return res
  } catch (error) {
    console.error('Student login error:', error)
    return NextResponse.json({ error: 'Gagal login' }, { status: 500 })
  }
}

// GET: cek session siswa (stateless)
export async function GET(req: NextRequest) {
  try {
    const student = getStudentFromToken(req)
    if (!student) {
      return NextResponse.json({ authenticated: false })
    }
    // Fetch fresh data from DB
    const dbStudent = await db.student.findUnique({
      where: { id: student.studentId },
      select: {
        id: true, namaLengkap: true, nisn: true, kelas: true,
        sekolah: true, jenisKelamin: true, isActive: true,
      },
    })
    if (!dbStudent) {
      return NextResponse.json({ authenticated: false })
    }
    return NextResponse.json({ authenticated: true, student: dbStudent })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}

// DELETE: logout siswa
export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('student_token')
  return res
}
