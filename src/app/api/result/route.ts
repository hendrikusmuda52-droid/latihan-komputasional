import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      studentId,
      typedText,
      charCount,
      correctChars,
      typingSpeedWPM,
      typingAccuracy,
      typingDuration,
      typingScore,
      quizAnswers,
      quizCorrect,
      quizTotal,
      quizScore,
      quizDuration,
      totalScore,
      subject,
      assignmentId,  // v2: link result to specific assignment
      // FIX Bug #1: opsional fallback cpId/tpId/tahunAjaran/semester dari body.
      // Dipakai HANYA jika assignmentId NULL atau Assignment tidak punya cpId/tpId.
      cpId: bodyCpId,
      tpId: bodyTpId,
      tahunAjaran: bodyTahunAjaran,
      semester: bodySemester,
    } = body

    if (!studentId) {
      return NextResponse.json(
        { error: 'studentId wajib diisi' },
        { status: 400 }
      )
    }

    // ── FIX Bug #1: Lookup Assignment untuk inherit cpId/tpId/tahunAjaran/semester ──
    // Sebelumnya, endpoint ini hanya menyimpan assignmentId tanpa mengambil
    // cpId/tpId dari Assignment. Akibatnya, record Result selalu punya
    // cpId=NULL, tpId=NULL, tahunAjaran='2026/2027' (default), semester='ganjil'
    // (default) — sehingga nilai tidak pernah muncul di export per CP.
    //
    // Sekarang: jika assignmentId diberikan, lakukan lookup ke tabel Assignment
    // untuk mengambil cpId, tpId, tahunAjaran, dan semester. Jika assignmentId
    // tidak ada (legacy atau auto-zero result), gunakan nilai dari body atau
    // default schema.
    let assignmentData: {
      cpId: string | null
      tpId: string | null
      tahunAjaran: string
      semester: string
    } | null = null

    if (assignmentId) {
      try {
        assignmentData = await db.assignment.findUnique({
          where: { id: assignmentId },
          select: {
            cpId: true,
            tpId: true,
            tahunAjaran: true,
            semester: true,
          },
        })
      } catch (lookupErr) {
        // Jika lookup gagal (mis: assignmentId tidak valid), lanjutkan dengan
        // fallback ke body/default. Jangan gagalkan penyimpanan result.
        console.error('[result] Assignment lookup error for assignmentId', assignmentId, lookupErr)
      }
    }

    const result = await db.result.create({
      data: {
        studentId,
        typedText: typedText || '',
        charCount: charCount || 0,
        correctChars: correctChars || 0,
        typingSpeedWPM: typingSpeedWPM || 0,
        typingAccuracy: typingAccuracy || 0,
        typingDuration: typingDuration || 0,
        typingScore: typingScore || 0,
        quizAnswers: quizAnswers || '[]',
        quizCorrect: quizCorrect || 0,
        quizTotal: quizTotal || 0,
        quizScore: quizScore || 0,
        totalScore: totalScore || 0,
        subject: subject || 'Informatika',
        assignmentId: assignmentId || null,
        // FIX Bug #1: inherit cpId/tpId/tahunAjaran/semester dari Assignment.
        // Fallback berurutan: Assignment → body → default schema.
        cpId: assignmentData?.cpId ?? bodyCpId ?? null,
        tpId: assignmentData?.tpId ?? bodyTpId ?? null,
        tahunAjaran: assignmentData?.tahunAjaran ?? bodyTahunAjaran ?? '2026/2027',
        semester: assignmentData?.semester ?? bodySemester ?? 'ganjil',
      },
    })

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Error saving result:', error)
    return NextResponse.json(
      { error: 'Gagal menyimpan hasil latihan' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const results = await db.result.findMany({
      include: { student: true },
      orderBy: { completedAt: 'desc' },
    })
    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Error fetching results:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil hasil latihan' },
      { status: 500 }
    )
  }
}
