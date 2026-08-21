import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { requireTeacherAuth } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'

// Auth via stateless JWT - see @/lib/auth

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    // Bug #13 fix: rate limit AI generation (10 req/min per teacher)
    const rateLimited = checkRateLimit(req, 'generate-material')
    if (rateLimited) return rateLimited

    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 }) }

    const { topic, gradeLevel, category, format } = body as {
      topic?: string; gradeLevel?: string; category?: string; format?: string
    }

    if (!topic) {
      return NextResponse.json({ error: 'Topik materi wajib diisi' }, { status: 400 })
    }

    const formatInstructions = format === 'infographic'
      ? `Buat dalam FORMAT INFOGRAFIS yang menarik menggunakan markdown:
## 🎯 Tujuan Pembelajaran
- Bullet point singkat dan jelas

## 📊 Fakta Penting
| Aspek | Penjelasan |
|-------|-----------|
| ... | ... |

## 🔍 Konsep Kunci
### 1️⃣ Nama Konsep
Penjelasan singkat dalam 2-3 kalimat

### 2️⃣ Nama Konsep
Penjelasan singkat dalam 2-3 kalimat

## 📝 Langkah-langkah
1. **Langkah 1** → penjelasan singkat
2. **Langkah 2** → penjelasan singkat
3. **Langkah 3** → penjelasan singkat

## 💡 Tips & Trik
- Tips praktis untuk siswa

## ⚠️ Yang Perlu Diingat
- Hal-hal penting

## 🎮 Contoh di Kehidupan Sehari-hari
Contoh konkret yang relate dengan siswa SMP

## 📚 Ringkasan
Ringkasan singkat dalam 3 poin utama`
      : `Buat materi pembelajaran yang terstruktur dengan judul, pendahuluan, isi (beberapa sub-bab), contoh, dan ringkasan.`

    const prompt = `Kamu adalah guru di Indonesia. Buatlah materi pembelajaran tentang "${topic}" untuk siswa kelas ${gradeLevel || '7'}.

Kategori materi: ${category || 'Umum'}

${formatInstructions}

Persyaratan:
1. Bahasa Indonesia yang mudah dipahami siswa
2. Gunakan emoji untuk membuat materi lebih menarik
3. Sertakan contoh konkret dari kehidupan sehari-hari
4. Maksimal 800 kata
5. Jangan gunakan tag HTML atau SVG, gunakan markdown murni saja`

    // ── Try-catch around Gemini API call ──
    let content = ''
    try {
      const zai = await ZAI.create()
      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'assistant', content: 'Kamu adalah asisten yang membuat materi pembelajaran berkualitas dalam Bahasa Indonesia. Selalu balas dengan markdown murni, tanpa HTML atau SVG.' },
          { role: 'user', content: prompt },
        ],
        thinking: { type: 'disabled' },
      })

      content = completion.choices[0]?.message?.content || ''
    } catch (aiErr) {
      console.error('[ai/generate-material] Gemini API error:', aiErr)
      // ── FALLBACK: return a basic text materi so the UI doesn't crash ──
      content = `# ${topic}\n\n## Pendahuluan\nMateri ini membahas tentang ${topic} untuk siswa kelas ${gradeLevel || '7'}.\n\n## Poin Utama\n- Penting untuk memahami konsep dasar ${topic}\n- Praktik langsung akan membantu pemahaman\n- Hubungkan dengan kehidupan sehari-hari\n\n## Ringkasan\n${topic} adalah topik penting yang perlu dipelajari secara bertahap.\n\n---\n*(Materi fallback — AI sedang mengalami gangguan. Silakan coba generate ulang nanti.)*`
    }

    // ── Validate/sanitize content ──
    if (!content || content.trim().length < 50) {
      // Return fallback instead of error
      content = `# ${topic}\n\nMateri tentang ${topic} sedang dalam proses. Silakan coba generate ulang dalam beberapa saat.\n\n*(AI tidak menghasilkan konten yang cukup panjang. Ini adalah teks fallback.)*`
    }

    // Strip any SVG/HTML that AI might have returned despite instructions
    content = content.replace(/<svg[\s\S]*?<\/svg>/gi, '[Gambar Infografis — lihat di tampilan materi]')
    content = content.replace(/<html[\s\S]*?<\/html>/gi, '')
    content = content.replace(/<!DOCTYPE[^>]*>/gi, '')

    const title = topic.charAt(0).toUpperCase() + topic.slice(1)

    return NextResponse.json({
      success: true,
      title,
      content,
      format: format || 'standard',
    })
  } catch (error) {
    console.error('[ai/generate-material] FATAL error:', error)
    // ── Return 200 with fallback content instead of 500 ──
    return NextResponse.json({
      success: true,
      title: 'Materi (Fallback)',
      content: 'Materi tidak dapat di-generate saat ini. Silakan coba lagi nanti atau input materi secara manual.',
      format: 'standard',
      fallback: true,
    })
  }
}
