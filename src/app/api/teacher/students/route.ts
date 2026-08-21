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
// Previous behavior: only requireTeacherAuth() was used (which technically
// allows guru), but there was no kelas-based filtering. Guru could see ALL
// students from ALL kelas, which violates the "Subject Isolation via JWT"
// principle extended to kelas-level.
//
// NEW behavior:
// - Admin (role=admin): can see/manage ALL students (no kelas filter)
// - Guru (role=guru): can only see/manage students in their kelasDiampu
//   (comma-separated list from JWT, e.g. "7,8,9" or "11DKV,12DKV")
// - The kelasDiampu field stores tier prefixes ("7", "8", "9", "11DKV", "12DKV"),
//   and we match against student.kelas using startsWith() for tier-based filtering.
// ──────────────────────────────────────────────────────────────────

// Helper: parse kelasDiampu from JWT into an array of tier prefixes.
// Example: "7,8,9" → ['7', '8', '9']
// Example: "11DKV,12DKV" → ['11DKV', '12DKV']
function parseKelasDiampu(kelasDiampu: string | undefined): string[] {
  if (!kelasDiampu) return []
  return kelasDiampu
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0)
}

// Helper: check if a student's kelas is in the guru's kelasDiampu list.
// Uses tier-prefix matching: kelasDiampu "7" matches student.kelas "7A", "7B", "7C".
// kelasDiampu "11DKV" matches student.kelas "11DKV" exactly.
function isKelasAllowed(studentKelas: string, allowedTiers: string[]): boolean {
  if (!allowedTiers || allowedTiers.length === 0) return false
  return allowedTiers.some(tier => studentKelas.startsWith(tier))
}

// Helper: build Prisma where clause for kelas filtering based on role.
// Admin: no kelas filter (sees all). Guru: filter by kelasDiampu tiers.
function buildKelasFilter(role: string, kelasDiampu: string, queryKelas?: string) {
  const isAdmin = role === 'admin'
  const allowedTiers = parseKelasDiampu(kelasDiampu)

  // If a specific kelas is requested via query param
  if (queryKelas && queryKelas !== 'ALL') {
    // For guru: verify the requested kelas is in their kelasDiampu
    if (!isAdmin && !isKelasAllowed(queryKelas, allowedTiers)) {
      return { forbidden: true, where: {} }
    }
    return { forbidden: false, where: { kelas: queryKelas } }
  }

  // No specific kelas requested
  if (isAdmin) {
    // Admin sees all students
    return { forbidden: false, where: {} }
  }

  // Guru: filter by kelasDiampu tiers using OR + startsWith
  // Example: { OR: [{ kelas: { startsWith: '7' } }, { kelas: { startsWith: '8' } }] }
  if (allowedTiers.length === 0) {
    // Guru has no kelasDiampu set — return empty (no access)
    return { forbidden: false, where: { id: '__no_access__' } }  // impossible ID → returns []
  }

  return {
    forbidden: false,
    where: {
      OR: allowedTiers.map(tier => ({ kelas: { startsWith: tier } }))
    }
  }
}

// Helper: safely run a DB query, return [] on any error.
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[students] safeQuery error:', err)
    return []
  }
}

// GET: list semua siswa (filtered by kelasDiampu for guru, all for admin)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const queryKelas = req.nextUrl.searchParams.get('kelas') || undefined
    const { forbidden, where } = buildKelasFilter(teacher.role, teacher.kelasDiampu, queryKelas)

    if (forbidden) {
      return NextResponse.json(
        { error: 'Anda tidak memiliki akses ke kelas ini' },
        { status: 403 }
      )
    }

    const students = await safeQuery(() =>
      db.student.findMany({
        where,
        orderBy: [{ kelas: 'asc' }, { namaLengkap: 'asc' }],
        include: {
          _count: {
            select: { results: true },
          },
        },
      }),
    )

    const formatted = (students || []).map((s) => ({
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
    return NextResponse.json({ success: true, students: [] })
  }
}

// POST: tambah siswa baru (guru can add, but kelas must be in their kelasDiampu)
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[students] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    const { namaLengkap, nisn, password, kelas, sekolah, jenisKelamin, isActive } = body as {
      namaLengkap?: string
      nisn?: string
      password?: string
      kelas?: string
      sekolah?: string
      jenisKelamin?: string
      isActive?: boolean
    }

    if (!namaLengkap || !nisn || !kelas || !sekolah || !jenisKelamin) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }

    // ── FIX Bug #2: Normalisasi kelas sebelum disimpan ke DB ──
    // Sebelumnya, nilai kelas dari request body disimpan apa adanya.
    // Jika frontend mengirim "11 DKV" (dengan spasi), DB akan menyimpan
    // string tersebut apa adanya, yang nantinya tidak cocok saat
    // dilakukan filter assignment dengan targetKelas="11DKV".
    //
    // normalizeKelas() mengubah: "11 DKV" → "11DKV", " 11dkv " → "11DKV", dll.
    const normalizedKelas = normalizeKelas(kelas)
    if (!normalizedKelas) {
      return NextResponse.json({ error: 'Kelas tidak boleh kosong' }, { status: 400 })
    }
    const normalizedJenjang = getJenjang(normalizedKelas)

    // ── Kelas-based access control for guru ──
    // Admin can add students to ANY kelas. Guru can only add students to
    // kelas that are in their kelasDiampu list.
    // CATATAN: pakai normalizedKelas untuk pemeriksaan akses agar konsisten
    // dengan format yang akan disimpan.
    if (teacher.role !== 'admin') {
      const allowedTiers = parseKelasDiampu(teacher.kelasDiampu)
      if (!isKelasAllowed(normalizedKelas, allowedTiers)) {
        return NextResponse.json(
          { error: `Anda tidak memiliki akses untuk menambah siswa ke kelas ${normalizedKelas}. Kelas yang Anda ampu: ${allowedTiers.join(', ') || '(tidak ada)'}` },
          { status: 403 }
        )
      }
    }

    // Cek duplikat NISN
    const existing = await db.student.findUnique({ where: { nisn } })
    if (existing) {
      return NextResponse.json({ error: 'NISN sudah terdaftar' }, { status: 400 })
    }

    const hash = password ? crypto.createHash('sha256').update(password).digest('hex') : ''

    try {
      const student = await db.student.create({
        data: {
          namaLengkap,
          nisn,
          password: hash,
          kelas: normalizedKelas,        // FIX: simpan kelas yang sudah dinormalisasi
          jenjang: normalizedJenjang,    // FIX: turunkan jenjang dari kelas (SMP/SMK)
          sekolah,
          jenisKelamin,
          isActive: isActive !== false,
        },
      })
      return NextResponse.json({ success: true, student })
    } catch (dbErr) {
      console.error('[students] POST DB insert error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal memproses ke database. Pastikan kolom data sesuai.' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json({ error: 'Gagal menambah siswa' }, { status: 500 })
  }
}
