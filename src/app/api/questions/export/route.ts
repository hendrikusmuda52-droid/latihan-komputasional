import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import * as XLSX from 'xlsx'

// GET /api/questions/export
// Export all questions for this teacher's subject to Excel (.xlsx)
// Subject isolation: only questions matching teacher.subject are exported

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[questions/export] safeQuery error:', err); return [] }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const gradeFilter = req.nextUrl.searchParams.get('grade')

    const where: Record<string, unknown> = { subject: teacherSubject }
    if (gradeFilter && gradeFilter !== 'ALL') {
      where.gradeLevel = gradeFilter
    }

    const questions = await safeQuery(() =>
      db.question.findMany({
        where,
        orderBy: [{ gradeLevel: 'asc' }, { createdAt: 'asc' }],
      })
    )

    // Fetch CP/TP codes for display (batch join like in /api/questions GET)
    const cpIds = [...new Set((questions || []).map(q => q.cpId).filter((id): id is string => !!id && id !== ''))]
    const tpIds = [...new Set((questions || []).map(q => q.tpId).filter((id): id is string => !!id && id !== ''))]

    const [cps, tps] = await Promise.all([
      cpIds.length > 0
        ? safeQuery(() => db.capaianPembelajaran.findMany({ where: { id: { in: cpIds } } }))
        : Promise.resolve([]),
      tpIds.length > 0
        ? safeQuery(() => db.tujuanPembelajaran.findMany({ where: { id: { in: tpIds } } }))
        : Promise.resolve([]),
    ])

    const cpMap = new Map(cps.map(cp => [cp.id, cp]))
    const tpMap = new Map(tps.map(tp => [tp.id, tp]))

    // Transform to Excel-friendly format
    const excelData = (questions || []).map((q) => {
      const cp = q.cpId ? cpMap.get(q.cpId) : null
      const tp = q.tpId ? tpMap.get(q.tpId) : null
      return {
        Kelas: q.gradeLevel,
        CP: cp?.kodeCP || '-',
        TP: tp?.kodeTP || '-',
        Pertanyaan: q.question,
        'Opsi A': q.optionA,
        'Opsi B': q.optionB,
        'Opsi C': q.optionC,
        'Opsi D': q.optionD,
        'Kunci Jawaban': String.fromCharCode(65 + q.correctAnswer),
        Pembahasan: q.explanation,
        Status: q.isActive ? 'Aktif' : 'Nonaktif',
      }
    })

    const ws = XLSX.utils.json_to_sheet(excelData)
    ws['!cols'] = [
      { wch: 8 },   // Kelas
      { wch: 10 },  // CP
      { wch: 10 },  // TP
      { wch: 50 },  // Pertanyaan
      { wch: 30 },  // Opsi A
      { wch: 30 },  // Opsi B
      { wch: 30 },  // Opsi C
      { wch: 30 },  // Opsi D
      { wch: 8 },   // Kunci Jawaban
      { wch: 40 },  // Pembahasan
      { wch: 10 },  // Status
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Bank Soal')

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="bank-soal-${teacherSubject}.xlsx"`,
      },
    })
  } catch (error) {
    console.error('[questions/export] FATAL error:', error)
    return NextResponse.json(
      { error: 'Gagal export: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 },
    )
  }
}
