import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import { normalizeKelas } from '@/lib/kelas'
import { getJenjang } from '@/lib/constants'

// Auth via stateless JWT - see @/lib/auth

// ──────────────────────────────────────────────────────────────────
// FIX #3 (Masalah 3): ALLOW GURU CRUD + KELAS-BASED ISOLATION
// ──────────────────────────────────────────────────────────────────
// Guru can PUT/DELETE students, but ONLY for students whose kelas is in
// the guru's kelasDiampu list. Admin can modify any student.
// ──────────────────────────────────────────────────────────────────

// Helper: parse kelasDiampu from JWT into an array of tier prefixes.
function parseKelasDiampu(kelasDiampu: string | undefined): string[] {
  if (!kelasDiampu) return []
  return kelasDiampu
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0)
}

// Helper: check if a student's kelas is in the guru's kelasDiampu list.
function isKelasAllowed(studentKelas: string, allowedTiers: string[]): boolean {
  if (!allowedTiers || allowedTiers.length === 0) return false
  return allowedTiers.some(tier => studentKelas.startsWith(tier))
}

// Helper: verify that the guru has access to the student being modified.
// Returns { allowed: boolean, error?: string }
async function checkStudentAccess(
  studentId: string,
  teacher: { role: string; kelasDiampu: string }
): Promise<{ allowed: boolean; error?: string; student?: { id: string; kelas: string } }> {
  // Admin can access any student
  if (teacher.role === 'admin') {
    const student = await db.student.findUnique({
      where: { id: studentId },
      select: { id: true, kelas: true },
    })
    if (!student) return { allowed: false, error: 'Siswa tidak ditemukan' }
    return { allowed: true, student }
  }

  // Guru: check kelasDiampu
  const allowedTiers = parseKelasDiampu(teacher.kelasDiampu)
  const student = await db.student.findUnique({
    where: { id: studentId },
    select: { id: true, kelas: true },
  })

  if (!student) return { allowed: false, error: 'Siswa tidak ditemukan' }

  if (!isKelasAllowed(student.kelas, allowedTiers)) {
    return {
      allowed: false,
      error: `Anda tidak memiliki akses ke siswa di kelas ${student.kelas}. Kelas yang Anda ampu: ${allowedTiers.join(', ') || '(tidak ada)'}`,
    }
  }

  return { allowed: true, student }
}

// PUT: update siswa (guru can update, but only for students in their kelasDiampu)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const { id } = await params

    // ── Access control: verify guru has access to this student ──
    const accessCheck = await checkStudentAccess(id, teacher)
    if (!accessCheck.allowed) {
      return NextResponse.json({ error: accessCheck.error }, { status: 403 })
    }

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[students] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    // ── If kelas is being changed, verify guru has access to the NEW kelas too ──
    // FIX Bug #2: normalisasi kelas dari body sebelum pemeriksaan akses
    // dan sebelum disimpan ke DB, agar format konsisten ("11DKV" bukan "11 DKV").
    let normalizedKelas: string | undefined
    if (body.kelas !== undefined) {
      normalizedKelas = normalizeKelas(body.kelas as string)
      if (!normalizedKelas) {
        return NextResponse.json({ error: 'Kelas tidak boleh kosong' }, { status: 400 })
      }
      if (teacher.role !== 'admin') {
        const allowedTiers = parseKelasDiampu(teacher.kelasDiampu)
        if (!isKelasAllowed(normalizedKelas, allowedTiers)) {
          return NextResponse.json(
            { error: `Anda tidak dapat memindahkan siswa ke kelas ${normalizedKelas} karena Anda tidak mengampu kelas tersebut.` },
            { status: 403 }
          )
        }
      }
    }

    const updateData: Record<string, unknown> = {}
    if (body.namaLengkap !== undefined) updateData.namaLengkap = body.namaLengkap
    // FIX: simpan kelas yang sudah dinormalisasi (bukan body.kelas apa adanya)
    if (normalizedKelas !== undefined) {
      updateData.kelas = normalizedKelas
      // FIX: turunkan jenjang dari kelas yang baru (SMP/SMK)
      updateData.jenjang = getJenjang(normalizedKelas)
    }
    if (body.sekolah !== undefined) updateData.sekolah = body.sekolah
    if (body.jenisKelamin !== undefined) updateData.jenisKelamin = body.jenisKelamin
    if (body.isActive !== undefined) updateData.isActive = body.isActive

    // Update password hanya jika dikirim (non-empty)
    if (body.password) {
      updateData.password = crypto.createHash('sha256').update(String(body.password)).digest('hex')
    }

    // Cek NISN unik jika berubah
    if (body.nisn !== undefined) {
      const existing = await db.student.findUnique({ where: { nisn: body.nisn as string } })
      if (existing && existing.id !== id) {
        return NextResponse.json({ error: 'NISN sudah dipakai siswa lain' }, { status: 400 })
      }
      updateData.nisn = body.nisn
    }

    try {
      const updated = await db.student.update({
        where: { id },
        data: updateData,
      })
      return NextResponse.json({ success: true, student: updated })
    } catch (dbErr) {
      console.error('[students] PUT DB update error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal memproses ke database. Pastikan kolom data sesuai.' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error updating student:', error)
    return NextResponse.json({ error: 'Gagal update siswa' }, { status: 500 })
  }
}

// DELETE: hapus siswa (guru can delete, but only for students in their kelasDiampu)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const { id } = await params

    // ── Access control: verify guru has access to this student ──
    const accessCheck = await checkStudentAccess(id, teacher)
    if (!accessCheck.allowed) {
      return NextResponse.json({ error: accessCheck.error }, { status: 403 })
    }

    try {
      await db.student.delete({ where: { id } })
      return NextResponse.json({ success: true })
    } catch (dbErr) {
      console.error('[students] DELETE DB error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal menghapus siswa dari database' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error deleting student:', error)
    return NextResponse.json({ error: 'Gagal menghapus siswa' }, { status: 500 })
  }
}
