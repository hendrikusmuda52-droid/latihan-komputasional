import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// POST /api/teacher/students/reset-password
// Reset password semua siswa sekaligus (atau per kelas)
// Body: { password?: string, kelas?: string }
// Jika password kosong, generate default = "Sakola123!"

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const body = await req.json()
    const newPassword = body.password || 'Sakola123!'
    const kelasFilter = body.kelas // opsional: filter per kelas

    // Validasi password
    if (newPassword.length < 4) {
      return NextResponse.json({ error: 'Password minimal 4 karakter' }, { status: 400 })
    }

    // Build where clause
    const where: Record<string, unknown> = { isActive: true }
    if (kelasFilter && kelasFilter !== 'ALL' && kelasFilter !== '__none__') {
      where.kelas = kelasFilter
    }

    // Reset password semua siswa (plain text)
    const result = await db.student.updateMany({
      where,
      data: {
        password: newPassword,
        mustChangePassword: true,  // flag: siswa harus ubah password saat login
      },
    })

    return NextResponse.json({
      success: true,
      count: result.count,
      message: `Password ${result.count} siswa berhasil direset ke "${newPassword}". Siswa akan diminta mengubah password saat login.`,
    })
  } catch (error) {
    console.error('[students/reset-password] error:', error)
    return NextResponse.json(
      { error: 'Gagal reset password: ' + (error instanceof Error ? error.message : 'Unknown') },
      { status: 500 }
    )
  }
}
