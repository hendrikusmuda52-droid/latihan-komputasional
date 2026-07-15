'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore, type TypingResult } from '@/lib/store'
import { getTypingText, type GradeLevel } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Clock,
  Type,
  Gauge,
  Target,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Keyboard,
} from 'lucide-react'
import { toast } from 'sonner'

const TOTAL_TIME_SECONDS = 40 * 60 // 40 menit

export function TypingStage() {
  const { setStage, setTypingResult, student } = useAppStore()
  const [typed, setTyped] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [now, setNow] = useState<number>(Date.now())
  const [copyWarnings, setCopyWarnings] = useState(0)
  const [blocked, setBlocked] = useState(false)
  const [showFinishDialog, setShowFinishDialog] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Pilih teks mengetik sesuai kelas siswa
  const TYPING_TEXT = useMemo(
    () => getTypingText((student?.kelas as GradeLevel) ?? '8A'),
    [student?.kelas]
  )
  const gradeTier = (student?.kelas ?? '8A').charAt(0) // '8' atau '9'

  // Timer
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(interval)
  }, [])

  // Auto-start timer on first keystroke
  useEffect(() => {
    if (typed.length > 0 && startTime === null) {
      setStartTime(Date.now())
    }
  }, [typed, startTime])

  // Anti-copy-paste: matikan semua shortcut & menu konteks
  useEffect(() => {
    if (copyWarnings >= 3) {
      setBlocked(true)
      return
    }

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      const newCount = copyWarnings + 1
      setCopyWarnings(newCount)
      if (newCount === 1) {
        toast.error('Peringatan 1/3: Copy-paste tidak diperbolehkan!')
      } else if (newCount === 2) {
        toast.error('Peringatan 2/3: Pelanggaran terakhir! Copy-paste akan memblokir latihan.')
      } else if (newCount >= 3) {
        toast.error('Peringatan 3/3: Latihan mengetik diblokir karena pelanggaran!')
        setBlocked(true)
      }
    }

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault()
      const newCount = copyWarnings + 1
      setCopyWarnings(newCount)
      if (newCount >= 3) {
        setBlocked(true)
      }
      toast.error(`Peringatan ${newCount}/3: Cut tidak diperbolehkan!`)
    }

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault()
      const newCount = copyWarnings + 1
      setCopyWarnings(newCount)
      if (newCount === 1) {
        toast.error('Peringatan 1/3: Paste tidak diperbolehkan! Ketik manual.')
      } else if (newCount === 2) {
        toast.error('Peringatan 2/3: Pelanggaran terakhir!')
      } else if (newCount >= 3) {
        toast.error('Peringatan 3/3: Latihan diblokir!')
        setBlocked(true)
      }
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      toast.warning('Klik kanan dinonaktifkan selama latihan mengetik.')
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, Cmd+C, Cmd+V, Cmd+X
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 'v', 'x', 'a'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault()
        const newCount = copyWarnings + 1
        setCopyWarnings(newCount)
        if (newCount >= 3) {
          setBlocked(true)
          toast.error('Peringatan 3/3: Latihan diblokir karena copy-paste!')
        } else {
          toast.error(`Peringatan ${newCount}/3: Copy-paste dinonaktifkan!`)
        }
      }
    }

    document.addEventListener('copy', handleCopy)
    document.addEventListener('cut', handleCut)
    document.addEventListener('paste', handlePaste)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('cut', handleCut)
      document.removeEventListener('paste', handlePaste)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [copyWarnings])

  // Hitung statistik
  const stats = useMemo(() => {
    const elapsedSec = startTime ? Math.max(1, Math.floor((now - startTime) / 1000)) : 0
    const charCount = typed.length
    // Hitung karakter benar (sesuai posisi di teks asli)
    let correctChars = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === TYPING_TEXT[i]) correctChars++
    }
    // WPM: (kata yang benar) / (menit). Asumsi 5 karakter = 1 kata (standar WPM)
    const wordsTyped = correctChars / 5
    const minutes = elapsedSec / 60
    const wpm = minutes > 0 ? Math.round((wordsTyped / minutes) * 10) / 10 : 0
    const accuracy =
      charCount > 0 ? Math.round((correctChars / charCount) * 1000) / 10 : 100
    const progress = Math.min(
      100,
      Math.round((charCount / TYPING_TEXT.length) * 100)
    )
    return { elapsedSec, charCount, correctChars, wpm, accuracy, progress }
  }, [typed, now, startTime])

  const remainingSec = Math.max(0, TOTAL_TIME_SECONDS - stats.elapsedSec)
  const timeUp = remainingSec === 0

  // Auto-submit ketika waktu habis
  useEffect(() => {
    if (timeUp && !showFinishDialog) {
      handleFinish()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/immutability
  }, [timeUp])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const computeScore = (): TypingResult => {
    const duration = stats.elapsedSec
    // Skor: 60% akurasi + 40% kecepatan (WPM, maks 60 WPM = skor maks)
    const accuracyScore = stats.accuracy // 0-100
    const speedScore = Math.min(100, (stats.wpm / 60) * 100)
    const score = Math.round(accuracyScore * 0.6 + speedScore * 0.4)

    return {
      typedText: typed,
      charCount: stats.charCount,
      correctChars: stats.correctChars,
      typingSpeedWPM: stats.wpm,
      typingAccuracy: stats.accuracy,
      typingDuration: duration,
      typingScore: Math.max(0, Math.min(100, score)),
      copyWarnings,
    }
  }

  const handleFinish = () => {
    const result = computeScore()
    setTypingResult(result)
    setStage('typing-finished')
  }

  // Render text dengan highlight posisi yang sedang diketik
  const renderHighlightedText = () => {
    const chars = TYPING_TEXT.split('')
    return chars.map((ch, i) => {
      let cls = 'text-slate-400'
      if (i < typed.length) {
        cls = typed[i] === ch ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-100'
      } else if (i === typed.length) {
        cls = 'bg-yellow-200 text-slate-800 animate-pulse'
      }
      return (
        <span key={i} className={cls}>
          {ch}
        </span>
      )
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header sticky dengan info siswa & timer */}
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Type className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Tahap 1: Latihan Mengetik
              </p>
              <p className="text-xs text-slate-500">
                {student?.namaLengkap} • {student?.kelas} • {student?.sekolah}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg ${
                remainingSec < 300
                  ? 'bg-red-100 text-red-700 animate-pulse'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              <Clock className="w-5 h-5" />
              {formatTime(remainingSec)}
            </div>
          </div>
        </div>
      </header>

      {/* Banner peringatan */}
      {copyWarnings > 0 && (
        <div
          className={`${
            copyWarnings >= 3 ? 'bg-red-600' : 'bg-amber-500'
          } text-white px-4 py-2 text-center text-sm font-medium`}
        >
          <AlertTriangle className="inline w-4 h-4 mr-1" />
          Peringatan copy-paste: {copyWarnings}/3
          {copyWarnings >= 3 && ' — Latihan diblokir! Mohon refresh halaman dan mulai ulang.'}
        </div>
      )}

      <main className="flex-1 container max-w-7xl mx-auto px-4 py-6">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Type className="w-4 h-4" /> Karakter Diketik
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {stats.charCount.toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-slate-400">
                dari {TYPING_TEXT.length.toLocaleString('id-ID')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Gauge className="w-4 h-4" /> Kecepatan
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                {stats.wpm} <span className="text-sm font-normal text-slate-500">WPM</span>
              </p>
              <p className="text-xs text-slate-400">kata per menit</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Target className="w-4 h-4" /> Akurasi
              </div>
              <p className="text-2xl font-bold text-teal-600">
                {stats.accuracy}%
              </p>
              <p className="text-xs text-slate-400">
                {stats.correctChars} benar / {stats.charCount} total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Clock className="w-4 h-4" /> Waktu Berjalan
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {formatTime(stats.elapsedSec)}
              </p>
              <p className="text-xs text-slate-400">dari 40 menit</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress pengetikan teks</span>
            <span>{stats.progress}%</span>
          </div>
          <Progress value={stats.progress} className="h-2" />
        </div>

        {/* Layout dua kolom: teks sumber & area mengetik */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Kolom kiri: teks sumber */}
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="w-4 h-4 text-emerald-600" />
                Teks Sumber — Ketik teks di bawah ini
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                Topik:{' '}
                {gradeTier === '8'
                  ? 'Berpikir Komputasional di Kehidupan Sehari-hari'
                  : 'Berpikir Komputasional & Isu Teknologi Modern (AI, IoT)'}{' '}
                — Kelas {student?.kelas}
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <div
                className="prose prose-sm max-w-none text-slate-700 leading-relaxed font-serif"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '15px',
                  lineHeight: '1.9',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  userSelect: 'none',
                }}
              >
                {renderHighlightedText()}
              </div>
            </CardContent>
          </Card>

          {/* Kolom kanan: area ketik */}
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Keyboard className="w-4 h-4 text-emerald-600" />
                Area Mengetik
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                Ketik di sini. Timer dimulai otomatis saat mengetik huruf
                pertama.
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                ref={textareaRef}
                value={typed}
                onChange={(e) => {
                  if (blocked) return
                  setTyped(e.target.value)
                }}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                disabled={blocked}
                placeholder={
                  blocked
                    ? 'Latihan diblokir karena pelanggaran copy-paste. Silakan refresh halaman.'
                    : 'Mulai mengetik di sini...'
                }
                className="w-full min-h-[60vh] font-mono text-sm leading-relaxed resize-none focus:ring-2 focus:ring-emerald-500"
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                  fontSize: '15px',
                  lineHeight: '1.9',
                }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Copy, cut, paste, dan klik kanan dinonaktifkan.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tombol aksi */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-slate-600">
            <Badge
              variant={blocked ? 'destructive' : 'outline'}
              className="mr-2"
            >
              {blocked ? 'Diblokir' : 'Aktif'}
            </Badge>
            <Badge variant="outline">Peringatan: {copyWarnings}/3</Badge>
          </div>
          <AlertDialog
            open={showFinishDialog}
            onOpenChange={setShowFinishDialog}
          >
            <AlertDialogTrigger asChild>
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={blocked || typed.length === 0}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Selesai & Lanjut ke Soal
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Yakin ingin menyelesaikan tahap mengetik?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Setelah dilanjutkan, kamu tidak bisa kembali ke tahap
                  mengetik. Kamu akan langsung masuk ke tahap soal pilihan
                  ganda.
                  <br />
                  <br />
                  Statistik terakhir:
                  <br />• Karakter: {stats.charCount}
                  <br />• Kecepatan: {stats.wpm} WPM
                  <br />• Akurasi: {stats.accuracy}%
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleFinish}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Ya, Lanjutkan
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
        <div className="container max-w-7xl mx-auto px-4 text-center text-xs">
          Latihan Mengetik & Berpikir Komputasional - SMP Kelas 9
        </div>
      </footer>
    </div>
  )
}
