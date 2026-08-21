'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Video, Clock, CheckCircle2, Save, RefreshCw, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { ForceStopOverlay } from '@/components/student/force-stop-overlay'

const TOTAL_TIME_SECONDS = 30 * 60 // 30 menit

// Konversi URL YouTube (watch?v= / youtu.be) menjadi URL embed
const getYouTubeEmbed = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? 'https://www.youtube.com/embed/' + match[1] : url
}

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function VideoAnalysisStage() {
  const { student, setStage } = useAppStore()
  const router = useRouter()

  const [reflectionText, setReflectionText] = useState('')
  const [elapsedSec, setElapsedSec] = useState(0)
  const [saving, setSaving] = useState(false)

  const isMounted = useRef(true)

  // Ambil konfigurasi tugas dari localStorage
  const videoUrl = typeof window !== 'undefined' ? localStorage.getItem('currentVideoUrl') || '' : ''
  const assignmentTitle =
    typeof window !== 'undefined'
      ? localStorage.getItem('currentAssignmentTitle') || 'Refleksi Video'
      : 'Refleksi Video'
  const subject =
    typeof window !== 'undefined'
      ? localStorage.getItem('currentSubject') || 'Informatika'
      : 'Informatika'

  const embedUrl = videoUrl ? getYouTubeEmbed(videoUrl) : ''
  const remainingSec = Math.max(0, TOTAL_TIME_SECONDS - elapsedSec)
  const timeUp = remainingSec === 0
  const charCount = reflectionText.length

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  // Timer interval — naikkan elapsedSec tiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMounted.current) {
        setElapsedSec((prev) => prev + 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSave = async () => {
    if (saving) return

    if (!reflectionText.trim()) {
      toast.error('Refleksi/rangkuman belum diisi. Tulis dahulu selesai menonton video.')
      return
    }

    setSaving(true)
    try {
      const assignmentId = typeof window !== 'undefined'
        ? localStorage.getItem('currentAssignmentId')
        : null

      const res = await fetch('/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student?.id,
          typedText: reflectionText,
          charCount: reflectionText.length,
          correctChars: reflectionText.length,
          typingSpeedWPM: 0,
          typingAccuracy: 100,
          typingDuration: elapsedSec,
          typingScore: 0,
          quizAnswers: JSON.stringify({
            type: 'video_reflection',
            text: reflectionText,
            videoUrl,
          }),
          quizCorrect: 0,
          quizTotal: 0,
          quizScore: 0,
          totalScore: 0,
          assignmentId,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan refleksi')

      toast.success('Refleksi berhasil disimpan dan dikirim ke guru.')
      setStage('completed')
      router.push('/')
    } catch (err) {
      console.error(err)
      toast.error('Gagal menyimpan refleksi. Silakan coba lagi.')
    } finally {
      setSaving(false)
    }
  }

  // Auto-submit ketika waktu habis
  useEffect(() => {
    if (timeUp && !saving && reflectionText.trim()) {
      toast.warning('Waktu habis! Jawaban otomatis dikirim.')
      handleSave()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/immutability
  }, [timeUp])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header sticky dengan timer */}
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Refleksi / Rangkuman Video
              </p>
              <p className="text-xs text-slate-500">
                {student?.namaLengkap} • {student?.kelas} • {student?.sekolah}
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg ${
              remainingSec < 60
                ? 'bg-red-100 text-red-700 animate-pulse'
                : 'bg-rose-100 text-rose-700'
            }`}
            aria-live="polite"
          >
            <Clock className="w-5 h-5" />
            {formatTime(remainingSec)}
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        {/* Judul tugas */}
        <Card className="border-rose-200 bg-rose-50/60 mb-6">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Video className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-rose-900">{assignmentTitle}</p>
                <p className="text-xs text-rose-700/80 mt-1">
                  Tonton video dengan saksama, lalu tulis rangkuman atau refleksi Anda pada kolom yang tersedia.
                  Refleksi dikumpulkan ke guru setelah Anda menekan tombol <strong>Simpan &amp; Selesai</strong>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video player */}
        <section className="mb-8">
          {embedUrl ? (
            <div className="w-full max-w-3xl mx-auto">
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-200 shadow-md bg-black">
                <iframe
                  src={embedUrl}
                  title={assignmentTitle}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="text-center text-xs text-slate-500 mt-2 break-all">
                Sumber: {videoUrl}
              </p>
            </div>
          ) : (
            <div className="w-full max-w-3xl mx-auto">
              <div className="aspect-video w-full rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                <AlertCircle className="w-10 h-10 mb-2" />
                <p className="text-sm font-medium">Video belum tersedia</p>
                <p className="text-xs">URL video tidak ditemukan pada tugas ini.</p>
              </div>
            </div>
          )}
        </section>

        {/* Textarea refleksi */}
        <section>
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 pb-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <RefreshCw className="w-4 h-4 text-slate-500" />
                  Tulis Rangkuman / Refleksi
                </CardTitle>
                <Badge
                  variant="outline"
                  className={
                    charCount > 0
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                  }
                >
                  {charCount} karakter
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="reflection" className="text-sm text-slate-700">
                  Tulis rangkuman, refleksi, atau jawaban analisis Anda di sini...
                </Label>
                <Textarea
                  id="reflection"
                  rows={10}
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Setelah menonton video, tuliskan rangkuman poin-poin penting, refleksi pribadi, atau jawaban atas pertanyaan analisis yang diberikan guru..."
                  className="resize-y text-sm leading-relaxed"
                  disabled={saving}
                />
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>
                    {charCount === 0
                      ? 'Belum ada teks ditulis.'
                      : `${charCount} karakter • ~${Math.max(0, Math.round(charCount / 5))} kata`}
                  </span>
                  <span className="font-mono">Waktu berjalan: {formatTime(elapsedSec)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 mt-6 pt-4 border-t">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
                  onClick={handleSave}
                  disabled={saving || !reflectionText.trim()}
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan &amp; Selesai
                    </>
                  )}
                </Button>
              </div>

              {!reflectionText.trim() && (
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Isi refleksi terlebih dahulu sebelum menyimpan.
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
        <div className="container max-w-5xl mx-auto px-4 text-center text-xs">
          SAKOLA - SMP Santo Augustinus
        </div>
      </footer>

      <ForceStopOverlay subject={subject} />
    </div>
  )
}
