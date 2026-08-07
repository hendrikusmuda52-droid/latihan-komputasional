import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { requireTeacherAuth } from '@/lib/auth'

// Auth via stateless JWT - see @/lib/auth

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const { topic, gradeLevel, category, format } = await req.json()

    if (!topic) {
      return NextResponse.json({ error: 'Topik materi wajib diisi' }, { status: 400 })
    }

    const zai = await ZAI.create()

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

    const prompt = `Kamu adalah guru informatika SMP di Indonesia. Buatlah materi pembelajaran tentang "${topic}" untuk siswa kelas ${gradeLevel}.

Kategori materi: ${category || 'Umum'}

${formatInstructions}

Persyaratan:
1. Bahasa Indonesia yang mudah dipahami siswa SMP
2. Gunakan emoji untuk membuat materi lebih menarik
3. Sertakan contoh konkret dari kehidupan sehari-hari
4. Maksimal 800 kata
5. Jangan gunakan tag HTML, gunakan markdown murni`

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: 'Kamu adalah asisten yang membuat materi pembelajaran berkualitas dalam Bahasa Indonesia dengan format infografis yang menarik.' },
        { role: 'user', content: prompt },
      ],
      thinking: { type: 'disabled' },
    })

    const content = completion.choices[0]?.message?.content || ''

    if (!content || content.trim().length < 50) {
      return NextResponse.json({ error: 'AI tidak menghasilkan materi. Coba lagi.' }, { status: 500 })
    }

    // Generate judul otomatis dari topik
    const title = topic.charAt(0).toUpperCase() + topic.slice(1)

    return NextResponse.json({
      success: true,
      title,
      content,
      format: format || 'standard',
    })
  } catch (error) {
    console.error('AI generate material error:', error)
    return NextResponse.json({ error: 'Gagal generate materi dengan AI' }, { status: 500 })
  }
}
