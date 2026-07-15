'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore, type TypingResult } from '@/lib/store'
import {
  getTypingText,
  isStructuredText,
  countHeadings,
  getSourceHeadings,
  type GradeLevel,
} from '@/lib/data'
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
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react'
import { toast } from 'sonner'

const TOTAL_TIME_SECONDS = 40 * 60 // 40 menit
const LINE_HEIGHT = 28 // px, harus sama antara source & textarea
const FONT_SIZE = 15

export function TypingStage() {
  const { setStage, setTypingResult, student } = useAppStore()
  const [typed, setTyped] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [now, setNow] = useState<number>(Date.now())
  const [copyWarnings, setCopyWarnings] = useState(0)
  const [blocked, setBlocked] = useState(false)
  const [showFinishDialog, setShowFinishDialog] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const sourceScrollRef = useRef<HTMLDivElement>(null)
  const textareaScrollRef = useRef<HTMLDivElement>(null)

  // Pilih teks mengetik sesuai kelas
  const TYPING_TEXT = useMemo(
    () => getTypingText((student?.kelas as GradeLevel) ?? '8A'),
    [student?.kelas]
  )
  const gradeTier = (student?.kelas ?? '8A').charAt(0)
  const isStructured = isStructuredText((student?.kelas as GradeLevel) ?? '8A')
  const sourceHeadings = useMemo(
    () => getSourceHeadings((student?.kelas as GradeLevel) ?? '8A'),
    [student?.kelas]
  )

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

  // Anti copy-paste
  useEffect(() => {
    if (copyWarnings >= 3) {
      setBlocked(true)
      return
    }

    const handleClipboard = (e: ClipboardEvent, action: string) => {
      e.preventDefault()
      const newCount = copyWarnings + 1
      setCopyWarnings(newCount)
      if (newCount >= 3) {
        toast.error(`Peringatan 3/3: Latihan diblokir karena ${action}!`)
        setBlocked(true)
      } else {
        toast.error(`Peringatan ${newCount}/3: ${action} tidak diperbolehkan!`)
      }
    }

    const handleCopy = (e: ClipboardEvent) => handleClipboard(e, 'copy')
    const handleCut = (e: ClipboardEvent) => handleClipboard(e, 'cut')
    const handlePaste = (e: ClipboardEvent) => handleClipboard(e, 'paste')

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      toast.warning('Klik kanan dinonaktifkan selama latihan mengetik.')
    }

    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Sinkron scroll: ketika user scroll di textarea, source ikut scroll
  const handleTextareaScroll = () => {
    if (textareaScrollRef.current && sourceScrollRef.current) {
      sourceScrollRef.current.scrollTop = textareaScrollRef.current.scrollTop
    }
  }

  // Hitung statistik
  const stats = useMemo(() => {
    const elapsedSec = startTime ? Math.max(1, Math.floor((now - startTime) / 1000)) : 0
    const charCount = typed.length
    let correctChars = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === TYPING_TEXT[i]) correctChars++
    }
    const wordsTyped = correctChars / 5
    const minutes = elapsedSec / 60
    const wpm = minutes > 0 ? Math.round((wordsTyped / minutes) * 10) / 10 : 0
    const accuracy = charCount > 0 ? Math.round((correctChars / charCount) * 1000) / 10 : 100
    const completionRatio = Math.min(1, charCount / TYPING_TEXT.length)
    const progress = Math.round(completionRatio * 100)

    // Hitung heading untuk kelas 9
    const userHeadings = isStructured ? countHeadings(typed) : { h1: 0, h2: 0, h3: 0 }
    const headingsMatch = isStructured
      ? userHeadings.h1 === sourceHeadings.h1 &&
        userHeadings.h2 === sourceHeadings.h2 &&
        userHeadings.h3 === sourceHeadings.h3
      : true

    return {
      elapsedSec,
      charCount,
      correctChars,
      wpm,
      accuracy,
      completionRatio,
      progress,
      userHeadings,
      headingsMatch,
    }
  }, [typed, now, startTime, TYPING_TEXT, isStructured, sourceHeadings])

  const remainingSec = Math.max(0, TOTAL_TIME_SECONDS - stats.elapsedSec)
  const timeUp = remainingSec === 0

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
    // Rumus baru:
    // - 30% akurasi (correctChars / charCount)
    // - 25% kecepatan (WPM, max 60 = 100)
    // - 30% rasio penyelesaian (charCount / totalChars)
    // - 15% struktur heading (untuk kelas 9; untuk kelas 8 selalu 100)
    const accuracyScore = stats.accuracy
    const speedScore = Math.min(100, (stats.wpm / 60) * 100)
    const completionScore = stats.completionRatio * 100
    const structureScore = isStructured
      ? (stats.userHeadings.h1 / Math.max(1, sourceHeadings.h1)) * 25 +
        (stats.userHeadings.h2 / Math.max(1, sourceHeadings.h2)) * 35 +
        (stats.userHeadings.h3 / Math.max(1, sourceHeadings.h3)) * 40
      : 100
    const score = Math.round(
      accuracyScore * 0.3 +
        speedScore * 0.25 +
        completionScore * 0.3 +
        structureScore * 0.15
    )

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

  // Render source text: kelas 9 dengan formatting markdown
  const renderSourceText = () => {
    if (!isStructured) {
      // Plain text dengan highlight karakter
      const chars = TYPING_TEXT.split('')
      return chars.map((ch, i) => {
        let cls = 'text-slate-500'
        if (i < typed.length) {
          cls = typed[i] === ch ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-100'
        } else if (i === typed.length) {
          cls = 'bg-yellow-200 text-slate-800'
        }
        return (
          <span key={i} className={cls}>
            {ch}
          </span>
        )
      })
    }
    // Structured: render dengan styling heading, highlight per blok
    const lines = TYPING_TEXT.split('\n')
    let charIdx = 0
    return lines.map((line, lineIdx) => {
      const lineWithNewline = line + (lineIdx < lines.length - 1 ? '\n' : '')
      const lineChars = lineWithNewline.split('')
      const rendered = lineChars.map((ch, i) => {
        const globalIdx = charIdx + i
        let cls = 'text-slate-600'
        if (globalIdx < typed.length) {
          cls = typed[globalIdx] === ch ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-100'
        } else if (globalIdx === typed.length) {
          cls = 'bg-yellow-200 text-slate-800'
        }
        return (
          <span key={i} className={cls}>
            {ch}
          </span>
        )
      })
      charIdx += lineWithNewline.length

      // Styling per baris berdasarkan prefix markdown
      let lineClass = 'leading-relaxed'
      let style: React.CSSProperties = {}
      if (line.startsWith('# ')) {
        lineClass = 'font-bold text-slate-900'
        style = { fontSize: '20px', margin: '8px 0 4px' }
      } else if (line.startsWith('## ')) {
        lineClass = 'font-bold text-slate-800'
        style = { fontSize: '17px', margin: '6px 0 3px' }
      } else if (line.startsWith('### ')) {
        lineClass = 'font-semibold text-slate-700'
        style = { fontSize: '15px', margin: '4px 0 2px' }
      } else if (line.trim() === '') {
        lineClass = 'leading-relaxed'
        style = { height: '8px' }
      }
      return (
        <div key={lineIdx} className={lineClass} style={style}>
          {rendered}
        </div>
      )
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Type className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Tahap 1: {isStructured ? 'Mengetik & Mengedit Dokumen' : 'Latihan Mengetik'}
              </p>
              <p className="text-xs text-slate-500">
                {student?.namaLengkap} • {student?.kelas} • {student?.sekolah}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg ${
                remainingSec < 300 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              <Clock className="w-5 h-5" />
              {formatTime(remainingSec)}
            </div>
          </div>
        </div>
      </header>

      {copyWarnings > 0 && (
        <div className={`${copyWarnings >= 3 ? 'bg-red-600' : 'bg-amber-500'} text-white px-4 py-2 text-center text-sm font-medium`}>
          <AlertTriangle className="inline w-4 h-4 mr-1" />
          Peringatan copy-paste: {copyWarnings}/3
          {copyWarnings >= 3 && ' — Latihan diblokir! Mohon refresh halaman dan mulai ulang.'}
        </div>
      )}

      {/* Banner mode editing untuk kelas 9 */}
      {isStructured && (
        <div className="bg-indigo-50 border-b border-indigo-200 px-4 py-2 text-xs text-indigo-800">
          <strong>📋 Mode Edit Dokumen:</strong> Ketik dokumen laporan dengan format yang sesuai.
          Gunakan <code className="bg-indigo-100 px-1 rounded">#</code> untuk judul utama,{' '}
          <code className="bg-indigo-100 px-1 rounded">##</code> untuk sub-judul, dan{' '}
          <code className="bg-indigo-100 px-1 rounded">###</code> untuk sub-sub-judul. Cocokkan struktur dengan teks sumber.
        </div>
      )}

      <main className="flex-1 container max-w-7xl mx-auto px-4 py-6">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Type className="w-4 h-4" /> Karakter
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {stats.charCount.toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-slate-400">dari {TYPING_TEXT.length.toLocaleString('id-ID')}</p>
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
              <p className="text-2xl font-bold text-teal-600">{stats.accuracy}%</p>
              <p className="text-xs text-slate-400">{stats.correctChars}/{stats.charCount} benar</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <CheckCircle2 className="w-4 h-4" /> Penyelesaian
              </div>
              <p className="text-2xl font-bold text-indigo-600">{stats.progress}%</p>
              <p className="text-xs text-slate-400">rasio teks</p>
            </CardContent>
          </Card>
          {isStructured ? (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <Heading2 className="w-4 h-4" /> Struktur
                </div>
                <p className={`text-2xl font-bold ${stats.headingsMatch ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {stats.userHeadings.h1}/{sourceHeadings.h1} · {stats.userHeadings.h2}/{sourceHeadings.h2} · {stats.userHeadings.h3}/{sourceHeadings.h3}
                </p>
                <p className="text-xs text-slate-400">
                  H1/H2/H3 (user vs sumber)
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <Clock className="w-4 h-4" /> Durasi
                </div>
                <p className="text-2xl font-bold text-slate-900">{formatTime(stats.elapsedSec)}</p>
                <p className="text-xs text-slate-400">dari 40 menit</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress pengetikan teks</span>
            <span>{stats.progress}%</span>
          </div>
          <Progress value={stats.progress} className="h-2" />
        </div>

        {/* Layout dua kolom dengan scroll sinkron */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Kolom kiri: teks sumber */}
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="w-4 h-4 text-emerald-600" />
                Teks Sumber — Ketik/Edit teks di bawah ini
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                Topik: {gradeTier === '8'
                  ? 'Berpikir Komputasional di Kehidupan Sehari-hari'
                  : 'Laporan Berpikir Komputasional & Isu Teknologi Modern'} — Kelas {student?.kelas}
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <div
                ref={sourceScrollRef}
                onScroll={(e) => {
                  // Jika source di-scroll manual, sinkron ke textarea
                  if (textareaScrollRef.current) {
                    textareaScrollRef.current.scrollTop = e.currentTarget.scrollTop
                  }
                }}
                style={{
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  fontSize: `${FONT_SIZE}px`,
                  lineHeight: `${LINE_HEIGHT}px`,
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  userSelect: 'none',
                  paddingRight: '8px',
                }}
                className="prose-sm text-slate-700"
              >
                {renderSourceText()}
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
                {isStructured
                  ? 'Ketik dokumen lengkap dengan tanda #, ##, ### sesuai struktur sumber'
                  : 'Ketik di sini. Timer dimulai otomatis saat mengetik huruf pertama'}
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <div ref={textareaScrollRef} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <Textarea
                  ref={textareaRef}
                  value={typed}
                  onChange={(e) => {
                    if (blocked) return
                    setTyped(e.target.value)
                  }}
                  onScroll={handleTextareaScroll}
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  disabled={blocked}
                  placeholder={blocked
                    ? 'Latihan diblokir karena pelanggaran copy-paste. Silakan refresh halaman.'
                    : isStructured
                    ? 'Mulai mengetik dokumen laporan di sini...\n\nGunakan #, ##, ### untuk heading'
                    : 'Mulai mengetik di sini...'
                  }
                  className="w-full min-h-[60vh] font-mono resize-none focus:ring-2 focus:ring-emerald-500 border-slate-200"
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                    fontSize: `${FONT_SIZE}px`,
                    lineHeight: `${LINE_HEIGHT}px`,
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              </div>
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
            <Badge variant={blocked ? 'destructive' : 'outline'} className="mr-2">
              {blocked ? 'Diblokir' : 'Aktif'}
            </Badge>
            <Badge variant="outline">Peringatan: {copyWarnings}/3</Badge>
          </div>
          <AlertDialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
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
                <AlertDialogTitle>Yakin ingin menyelesaikan tahap mengetik?</AlertDialogTitle>
                <AlertDialogDescription>
                  Setelah dilanjutkan, kamu tidak bisa kembali ke tahap mengetik.
                  <br /><br />
                  Statistik terakhir:<br />
                  • Karakter: {stats.charCount} / {TYPING_TEXT.length}<br />
                  • Penyelesaian: {stats.progress}%<br />
                  • Kecepatan: {stats.wpm} WPM<br />
                  • Akurasi: {stats.accuracy}%
                  {isStructured && (
                    <>
                      <br />• Heading: {stats.userHeadings.h1}/{sourceHeadings.h1} H1,{' '}
                      {stats.userHeadings.h2}/{sourceHeadings.h2} H2,{' '}
                      {stats.userHeadings.h3}/{sourceHeadings.h3} H3
                    </>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleFinish} className="bg-emerald-600 hover:bg-emerald-700">
                  Ya, Lanjutkan
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
        <div className="container max-w-7xl mx-auto px-4 text-center text-xs">
          Latihan Mengetik & Berpikir Komputasional - SMP Kelas {gradeTier}
        </div>
      </footer>
    </div>
  )
}
