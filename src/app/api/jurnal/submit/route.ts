import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// POST /api/jurnal/submit
// Body: {
//   teacherId: string,
//   hari: string,         // "Senin"
//   jamPelajaran: string,  // "07.40-08.20" (string, bukan int)
//   kelas: string,         // "7A"
//   mapel: string,         // "Informatika"
//   materiPokok: string,
//   hambatan: string,
//   attendance: Array<{ studentId: string, status: string }>,  // [{ studentId: "xxx", status: "H" }]
//   tanggal: string,       // ISO date (YYYY-MM-DD)
// }
//
// Logic:
// 1. Upsert JurnalGuru (unique: teacherId + tanggal + jamPelajaran)
// 2. For each attendance record: upsert Attendance (unique: studentId + tanggal + subject + kelas)
// 3. All in a transaction
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const body = await req.json()
    const {
      teacherId,
      hari,
      jamPelajaran,
      kelas,
      mapel,
      materiPokok,
      hambatan,
      attendance = [],
      tanggal,
    } = body

    // Validation
    if (!teacherId || !hari || !jamPelajaran || !kelas || !mapel) {
      return NextResponse.json({ error: 'Field wajib: teacherId, hari, jamPelajaran, kelas, mapel' }, { status: 400 })
    }
    if (!materiPokok || !materiPokok.trim()) {
      return NextResponse.json({ error: 'Materi pokok wajib diisi' }, { status: 400 })
    }

    // Parse tanggal (default: today)
    const tanggalDate = tanggal ? new Date(tanggal + 'T00:00:00') : new Date()
    const tanggalOnly = new Date(tanggalDate.toISOString().split('T')[0] + 'T00:00:00')

    // Convert jamPelajaran string to int for JurnalGuru (existing schema uses Int)
    // Parse "07.40-08.20" → jam ke-1, "08.20-09.00" → jam ke-2, etc.
    // Simple mapping: first slot = 1, second = 2, etc.
    const jpInt = body.jamPelajaranInt || 1 // allow override from frontend

    // ── Transaction: upsert jurnal + upsert attendance ──
    const result = await db.$transaction(async (tx) => {
      // 1. Upsert JurnalGuru
      const jurnal = await tx.jurnalGuru.upsert({
        where: {
          teacherId_tanggal_jamPelajaran: {
            teacherId,
            tanggal: tanggalOnly,
            jamPelajaran: jpInt,
          },
        },
        update: {
          hari,
          kelas,
          mapel,
          materiPokok: materiPokok.trim(),
          hambatan: hambatan?.trim() || '',
          subject: mapel,
        },
        create: {
          teacherId,
          subject: mapel,
          tanggal: tanggalOnly,
          hari,
          jamPelajaran: jpInt,
          kelas,
          mapel,
          materiPokok: materiPokok.trim(),
          hambatan: hambatan?.trim() || '',
        },
      })

      // 2. Upsert attendance for each student
      const attendanceResults = []
      for (const att of attendance) {
        if (!att.studentId || !att.status) continue

        // Cek apakah sudah ada attendance record untuk student + tanggal + kelas
        const existing = await tx.attendance.findFirst({
          where: {
            studentId: att.studentId,
            tanggal: tanggalOnly,
            kelas,
          },
        })

        if (existing) {
          // Update existing
          await tx.attendance.update({
            where: { id: existing.id },
            data: {
              status: att.status,
              subject: mapel,
            },
          })
        } else {
          // Create new
          await tx.attendance.create({
            data: {
              studentId: att.studentId,
              subject: mapel,
              kelas,
              tanggal: tanggalOnly,
              status: att.status,
              keterangan: '',
            },
          })
        }
        attendanceResults.push({ studentId: att.studentId, status: att.status })
      }

      return { jurnal, attendanceCount: attendanceResults.length }
    })

    return NextResponse.json({
      success: true,
      jurnalId: result.jurnal.id,
      attendanceCount: result.attendanceCount,
    })
  } catch (error) {
    console.error('[jurnal/submit] POST error:', error)
    return NextResponse.json({ error: 'Gagal menyimpan jurnal' }, { status: 500 })
  }
}
