import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import * as XLSX from 'xlsx'

// POST /api/grades/import
// Import nilai dari file Excel
// Form data: file (Excel), type ('per_cp' | 'sts_sas'), tahunAjaran, semester

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const type = (formData.get('type') as string) || 'per_cp'
    const tahunAjaran = (formData.get('tahunAjaran') as string) || '2026/2027'
    const semester = (formData.get('semester') as string) || 'ganjil'

    if (!file) {
      return NextResponse.json({ error: 'File Excel wajib diupload' }, { status: 400 })
    }

    // Parse Excel
    const buffer = await file.arrayBuffer()
    const wb = XLSX.read(buffer, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws)

    if (rows.length === 0) {
      return NextResponse.json({ error: 'File Excel kosong atau tidak ada data' }, { status: 400 })
    }

    // ── Validasi header ──
    const firstRow = rows[0]
    if (type === 'per_cp') {
      if (!('Username' in firstRow) || !('Nilai' in firstRow)) {
        return NextResponse.json({
          error: 'Format tidak valid. Pastikan ada kolom: Username, Nama Tugas, Jenis Nilai, Nilai. Download template dulu untuk format yang benar.'
        }, { status: 400 })
      }
    } else if (type === 'sts_sas') {
      if (!('Username' in firstRow) || !('Nilai STS' in firstRow)) {
        return NextResponse.json({
          error: 'Format tidak valid. Pastikan ada kolom: Username, Nilai STS, Nilai SAS. Download template dulu.'
        }, { status: 400 })
      }
    }

    // Fetch all students untuk lookup by nisn (username)
    const allStudents = await db.student.findMany({
      where: { isActive: true },
      select: { id: true, nisn: true, namaLengkap: true },
    })
    const studentMap = new Map(allStudents.map(s => [s.nisn, s]))

    let imported = 0
    let skipped = 0
    const errors: string[] = []

    if (type === 'per_cp') {
      // ── Import nilai per CP (tugas_harian / ulangan_harian) ──
      const grades: Array<{
        studentId: string
        score: number
        gradeType: string
        gradeCategory: string
        cpId: string | null
        tpId: string | null
        tahunAjaran: string
        semester: string
        title: string
      }> = []

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const username = String(row['Username'] || '').trim()
        const scoreStr = String(row['Nilai'] || '').trim()
        const cpId = String(row['ID CP'] || '').trim()
        const namaTugas = String(row['Nama Tugas'] || '').trim()
        const jenisNilai = String(row['Jenis Nilai'] || 'tugas_harian').trim()

        if (!username || !scoreStr) {
          skipped++
          continue
        }

        const student = studentMap.get(username)
        if (!student) {
          errors.push(`Baris ${i + 2}: Username "${username}" tidak ditemukan`)
          skipped++
          continue
        }

        const score = parseFloat(scoreStr)
        if (isNaN(score) || score < 0 || score > 100) {
          errors.push(`Baris ${i + 2}: Nilai "${scoreStr}" tidak valid (harus 0-100)`)
          skipped++
          continue
        }

        if (!cpId) {
          errors.push(`Baris ${i + 2}: ID CP kosong`)
          skipped++
          continue
        }

        const gradeCategory = jenisNilai === 'ulangan_harian' ? 'ulangan_harian' : 'tugas_harian'
        const gradeType = gradeCategory === 'tugas_harian' ? 'tugas' : 'uh'
        const title = namaTugas || (gradeCategory === 'tugas_harian' ? 'Tugas Harian' : 'Ulangan Harian')

        grades.push({
          studentId: student.id,
          score,
          gradeType,
          gradeCategory,
          cpId,
          tpId: null,
          tahunAjaran,
          semester,
          title,
        })
      }

      if (grades.length === 0) {
        return NextResponse.json({
          error: 'Tidak ada nilai valid untuk diimport',
          skipped,
          errors: errors.slice(0, 10),
        }, { status: 400 })
      }

      // Bulk insert
      try {
        const result = await db.$transaction(
          grades.map(g => db.manualGrade.create({
            data: {
              studentId: g.studentId,
              title: g.title,
              score: g.score,
              description: '',
              subject: teacherSubject,
              gradeType: g.gradeType,
              gradeCategory: g.gradeCategory,
              cpId: g.cpId,
              tpId: g.tpId,
              tahunAjaran: g.tahunAjaran,
              semester: g.semester,
              isOverride: false,
              isReleased: true,
              teacherId: teacher.teacherId,
            },
          }))
        )
        imported = result.length
      } catch (dbErr) {
        console.error('[grades/import] bulk insert error:', dbErr)
        return NextResponse.json({
          error: 'Gagal menyimpan ke database',
          details: dbErr instanceof Error ? dbErr.message : 'Unknown',
        }, { status: 500 })
      }

    } else if (type === 'sts_sas') {
      // ── Import nilai STS + SAS ──
      const grades: Array<{
        studentId: string
        score: number
        gradeCategory: string
        gradeType: string
        title: string
      }> = []

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const username = String(row['Username'] || '').trim()
        const stsStr = String(row['Nilai STS'] || '').trim()
        const sasStr = String(row['Nilai SAS'] || '').trim()

        if (!username || (!stsStr && !sasStr)) {
          skipped++
          continue
        }

        const student = studentMap.get(username)
        if (!student) {
          errors.push(`Baris ${i + 2}: Username "${username}" tidak ditemukan`)
          skipped++
          continue
        }

        // STS
        if (stsStr) {
          const stsScore = parseFloat(stsStr)
          if (!isNaN(stsScore) && stsScore >= 0 && stsScore <= 100) {
            grades.push({
              studentId: student.id,
              score: stsScore,
              gradeCategory: 'sts',
              gradeType: 'sts',
              title: 'STS (Asesmen Tengah Semester)',
            })
          } else {
            errors.push(`Baris ${i + 2}: Nilai STS "${stsStr}" tidak valid`)
          }
        }

        // SAS
        if (sasStr) {
          const sasScore = parseFloat(sasStr)
          if (!isNaN(sasScore) && sasScore >= 0 && sasScore <= 100) {
            grades.push({
              studentId: student.id,
              score: sasScore,
              gradeCategory: 'sas',
              gradeType: 'sas',
              title: 'SAS (Asesmen Akhir Semester)',
            })
          } else {
            errors.push(`Baris ${i + 2}: Nilai SAS "${sasStr}" tidak valid`)
          }
        }
      }

      if (grades.length === 0) {
        return NextResponse.json({
          error: 'Tidak ada nilai STS/SAS valid untuk diimport',
          skipped,
          errors: errors.slice(0, 10),
        }, { status: 400 })
      }

      try {
        const result = await db.$transaction(
          grades.map(g => db.manualGrade.create({
            data: {
              studentId: g.studentId,
              title: g.title,
              score: g.score,
              description: '',
              subject: teacherSubject,
              gradeType: g.gradeType,
              gradeCategory: g.gradeCategory,
              cpId: null,
              tpId: null,
              tahunAjaran,
              semester,
              isOverride: false,
              isReleased: true,
              teacherId: teacher.teacherId,
            },
          }))
        )
        imported = result.length
      } catch (dbErr) {
        console.error('[grades/import] STS/SAS insert error:', dbErr)
        return NextResponse.json({
          error: 'Gagal menyimpan STS/SAS ke database',
          details: dbErr instanceof Error ? dbErr.message : 'Unknown',
        }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      errors: errors.slice(0, 20),
      message: `${imported} nilai berhasil diimport, ${skipped} dilewati`,
    })
  } catch (error) {
    console.error('[grades/import] FATAL error:', error)
    return NextResponse.json(
      { error: 'Gagal import: ' + (error instanceof Error ? error.message : 'Unknown') },
      { status: 500 }
    )
  }
}
