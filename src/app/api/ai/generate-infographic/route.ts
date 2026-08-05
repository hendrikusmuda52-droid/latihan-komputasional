import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const g = globalThis as unknown as { __teacherSessions?: Map<string, unknown> }
async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  return !!(token && g.__teacherSessions?.has(token))
}

export async function POST(req: NextRequest) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const { topic, gradeLevel } = await req.json()

    if (!topic) {
      return NextResponse.json({ error: 'Topik wajib diisi' }, { status: 400 })
    }

    const zai = await ZAI.create()

    // Craft prompt for educational infographic
    const prompt = `Educational infographic about "${topic}" for Indonesian middle school students (grade ${gradeLevel}). 
    Clean, modern, colorful design with icons and illustrations. 
    Include key concepts, simple diagrams, and visual hierarchy. 
    Use bright colors (green, blue, orange). 
    Text in Indonesian language. 
    Flat design style, suitable for educational material. 
    High quality, professional infographic poster.`

    const response = await zai.images.generations.create({
      prompt: prompt,
      size: '1344x768', // Landscape format for infographic
    })

    const imageBase64 = response.data[0]?.base64

    if (!imageBase64) {
      return NextResponse.json({ error: 'Gagal generate infografis' }, { status: 500 })
    }

    // Return as data URL for easy display
    const dataUrl = `data:image/png;base64,${imageBase64}`

    return NextResponse.json({
      success: true,
      imageUrl: dataUrl,
    })
  } catch (error) {
    console.error('AI generate infographic error:', error)
    return NextResponse.json({ error: 'Gagal generate infografis' }, { status: 500 })
  }
}
