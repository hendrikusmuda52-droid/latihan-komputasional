'use client'

import { useAppStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { DrawingCanvas } from '@/components/student/drawing-canvas'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Palette } from 'lucide-react'
import { toast } from 'sonner'

export function DrawingStage() {
  const { student, setStage, setTypingResult, setQuizResult, setProgress } = useAppStore()
  const router = useRouter()

  const handleSave = async (imageData: string, title: string) => {
    // Simpan gambar ke database sebagai result dengan tipe "drawing"
    try {
      const res = await fetch('/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student?.id,
          typedText: title,
          charCount: 0,
          correctChars: 0,
          typingSpeedWPM: 0,
          typingAccuracy: 0,
          typingDuration: 0,
          typingScore: 0,
          quizAnswers: JSON.stringify({ type: 'drawing', imageData: imageData.substring(0, 100000) }),
          quizCorrect: 0,
          quizTotal: 0,
          quizScore: 0,
          totalScore: 0,
        }),
      })
      if (res.ok) {
        toast.success('Karya berhasil disimpan dan dikirim ke guru')
      }
    } catch {
      toast.error('Gagal menyimpan, tapi karya sudah didownload')
    }
  }

  const handleFinish = () => {
    setStage('welcome')
    setTypingResult(null as never)
    setQuizResult(null as never)
    setProgress(null)
    router.push('/?view=student-dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Tugas Menggambar / Peta Konsep</p>
              <p className="text-xs text-slate-500">{student?.namaLengkap} • {student?.kelas}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleFinish}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Selesai
          </Button>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        <Card className="bg-purple-50/50 border-purple-200 mb-4">
          <CardContent className="pt-4">
            <p className="text-sm text-purple-900">
              🎨 <strong>Instruksi:</strong> Buatlah peta konsep atau desain sesuai tugas dari guru.
              Gunakan alat menggambar di bawah. Karya akan dikirim ke guru untuk dinilai setelah disimpan.
            </p>
          </CardContent>
        </Card>

        <DrawingCanvas onSave={handleSave} />
      </main>
    </div>
  )
}
