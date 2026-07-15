'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore, type QuizResult } from '@/lib/store'
import { getQuestions as getQuestionsFallback, type GradeLevel, type Question } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
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
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { toast } from 'sonner'

const TOTAL_TIME_SECONDS = 25 * 60 // 25 menit

export function QuizStage() {
  const { setStage, setQuizResult, student, typingResult } = useAppStore()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentIdx, setCurrentIdx] = useState(0)
  const [startTime] = useState<number>(Date.now())
  const [now, setNow] = useState<number>(Date.now())
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [saving, setSaving] = useState(false)
  const isMounted = useRef(true)

  // Pilih set soal sesuai kelas siswa (kelas 8 = dasar, kelas 9 = advanced)
  const [QUESTIONS, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    const grade = (student?.kelas as GradeLevel) ?? '8A'
    const tier = grade.charAt(0) as '8' | '9'
    fetch(`/api/content/questions?grade=${tier}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.questions?.length > 0) {
          setQuestions(data.questions)
        } else {
          // Fallback ke data statis jika API gagal
          setQuestions(getQuestionsFallback(grade))
        }
      })
      .catch(() => {
        setQuestions(getQuestionsFallback(grade))
      })
  }, [student?.kelas])

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMounted.current) setNow(Date.now())
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const elapsedSec = Math.floor((now - startTime) / 1000)
  const remainingSec = Math.max(0, TOTAL_TIME_SECONDS - elapsedSec)
  const timeUp = remainingSec === 0

  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / QUESTIONS.length) * 100

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const computeResult = (): QuizResult => {
    let correct = 0
    for (const q of QUESTIONS) {
      if (answers[q.id] === q.correctAnswer) correct++
    }
    const score = Math.round((correct / QUESTIONS.length) * 100)
    return {
      answers,
      quizCorrect: correct,
      quizTotal: QUESTIONS.length,
      quizScore: score,
      quizDuration: elapsedSec,
    }
  }

  const handleSubmit = async () => {
    if (saving) return
    setSaving(true)
    const result = computeResult()
    setQuizResult(result)

    // Hitung total skor: 50% typing + 50% quiz
    const typingScore = typingResult?.typingScore ?? 0
    const totalScore = Math.round(typingScore * 0.5 + result.quizScore * 0.5)

    // Simpan ke database
    try {
      const res = await fetch('/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student?.id,
          typedText: typingResult?.typedText || '',
          charCount: typingResult?.charCount || 0,
          correctChars: typingResult?.correctChars || 0,
          typingSpeedWPM: typingResult?.typingSpeedWPM || 0,
          typingAccuracy: typingResult?.typingAccuracy || 0,
          typingDuration: typingResult?.typingDuration || 0,
          typingScore,
          quizAnswers: JSON.stringify(answers),
          quizCorrect: result.quizCorrect,
          quizTotal: result.quizTotal,
          quizScore: result.quizScore,
          quizDuration: result.quizDuration,
          totalScore,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan')
      // Simpan resultId ke store
      useAppStore.getState().setResultId(data.result.id)
      useAppStore.getState().setTotalScore(totalScore)
    } catch (err) {
      console.error(err)
      toast.error('Gagal menyimpan hasil ke database, namun hasil tetap ditampilkan.')
      useAppStore.getState().setTotalScore(totalScore)
    } finally {
      setSaving(false)
      setStage('results')
    }
  }

  // Auto-submit ketika waktu habis
  useEffect(() => {
    if (timeUp && !showSubmitDialog && !saving) {
      toast.warning('Waktu habis! Jawaban otomatis dikirim.')
      handleSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/immutability
  }, [timeUp])

  const currentQ = QUESTIONS[currentIdx]

  // Loading state saat soal belum ter-load dari DB
  if (QUESTIONS.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Tahap 2: Soal HOTS Berpikir Komputasional
              </p>
              <p className="text-xs text-slate-500">Memuat soal...</p>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-slate-400">
            <RefreshCw className="w-10 h-10 mx-auto animate-spin mb-3" />
            <p className="text-sm">Sedang menyiapkan soal untuk kelas {student?.kelas}...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header sticky dengan timer */}
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Tahap 2: Soal HOTS Berpikir Komputasional
              </p>
              <p className="text-xs text-slate-500">
                {student?.namaLengkap} • {answeredCount}/{QUESTIONS.length} terjawab
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg ${
              remainingSec < 60
                ? 'bg-red-100 text-red-700 animate-pulse'
                : 'bg-teal-100 text-teal-700'
            }`}
          >
            <Clock className="w-5 h-5" />
            {formatTime(remainingSec)}
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress pengerjaan</span>
            <span>
              {answeredCount}/{QUESTIONS.length} soal terjawab
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Soal */}
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  Soal {currentIdx + 1} dari {QUESTIONS.length}
                </CardTitle>
                <Badge variant="outline" className="bg-teal-50 text-teal-700">
                  {currentQ.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-900 leading-relaxed mb-6 text-base">
                {currentQ.question}
              </p>

              <RadioGroup
                value={
                  answers[currentQ.id] !== undefined
                    ? String(answers[currentQ.id])
                    : ''
                }
                onValueChange={(v) =>
                  setAnswers({
                    ...answers,
                    [currentQ.id]: Number(v),
                  })
                }
                className="space-y-3"
              >
                {currentQ.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      answers[currentQ.id] === i
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <RadioGroupItem
                      value={String(i)}
                      id={`q${currentQ.id}-opt${i}`}
                      className="mt-1"
                    />
                    <Label
                      htmlFor={`q${currentQ.id}-opt${i}`}
                      className="cursor-pointer flex-1 text-sm leading-relaxed text-slate-700"
                    >
                      <span className="font-semibold mr-2">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Tombol navigasi */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                  disabled={currentIdx === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Sebelumnya
                </Button>
                <div className="flex gap-2">
                  {currentIdx < QUESTIONS.length - 1 ? (
                    <Button
                      className="bg-teal-600 hover:bg-teal-700"
                      onClick={() =>
                        setCurrentIdx(
                          Math.min(QUESTIONS.length - 1, currentIdx + 1)
                        )
                      }
                    >
                      Berikutnya <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <AlertDialog
                      open={showSubmitDialog}
                      onOpenChange={setShowSubmitDialog}
                    >
                      <AlertDialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          <CheckCircle2 className="w-4 h-4 mr-1" /> Selesai
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Yakin ingin mengumpulkan jawaban?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {answeredCount < QUESTIONS.length ? (
                              <span className="text-amber-600 font-medium">
                                Kamu baru menjawab {answeredCount} dari{' '}
                                {QUESTIONS.length} soal.{' '}
                                {QUESTIONS.length - answeredCount} soal akan
                                dianggap salah.
                              </span>
                            ) : (
                              'Semua soal telah dijawab.'
                            )}
                            <br />
                            <br />
                            Setelah dikumpulkan, jawaban tidak dapat diubah
                            dan kamu akan melihat hasil akhir.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleSubmit}
                            disabled={saving}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            {saving ? 'Menyimpan...' : 'Ya, Kumpulkan'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigator soal */}
          <Card className="border-slate-200 h-fit sticky top-24">
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="text-sm">Navigasi Soal</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-6 gap-2">
                {QUESTIONS.map((q, i) => {
                  const isAnswered = answers[q.id] !== undefined
                  const isCurrent = i === currentIdx
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(i)}
                      className={`aspect-square rounded-md text-xs font-semibold transition-all ${
                        isCurrent
                          ? 'bg-teal-600 text-white ring-2 ring-teal-300 ring-offset-1'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-100" /> Sudah
                  dijawab ({answeredCount})
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-100" /> Belum
                  dijawab ({QUESTIONS.length - answeredCount})
                </div>
              </div>

              <AlertDialog
                open={showSubmitDialog}
                onOpenChange={setShowSubmitDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                    disabled={saving}
                  >
                    {saving ? 'Menyimpan...' : 'Kumpulkan Jawaban'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Yakin ingin mengumpulkan jawaban?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {answeredCount < QUESTIONS.length
                        ? `Kamu baru menjawab ${answeredCount} dari ${QUESTIONS.length} soal. Sisanya akan dianggap salah.`
                        : 'Semua soal telah dijawab.'}
                      <br />
                      <br />
                      Setelah dikumpulkan, jawaban tidak dapat diubah dan kamu
                      akan melihat hasil akhir.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSubmit}
                      disabled={saving}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {saving ? 'Menyimpan...' : 'Ya, Kumpulkan'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {answeredCount < QUESTIONS.length && (
                <div className="mt-3 flex items-start gap-2 p-2 bg-amber-50 rounded text-xs text-amber-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  Masih ada soal yang belum dijawab.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
        <div className="container max-w-5xl mx-auto px-4 text-center text-xs">
          Latihan Mengetik & Berpikir Komputasional - SMP Kelas 9
        </div>
      </footer>
    </div>
  )
}
