'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppStore, type QuizResult } from '@/lib/store'
import { getQuestions as getQuestionsFallback, type GradeLevel, type Question } from '@/lib/data'
import { getGradeTier } from '@/lib/constants'
import { QuestionMarkdown } from '@/components/stages/question-markdown'
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
import { ForceStopOverlay } from '@/components/student/force-stop-overlay'

const DEFAULT_QUIZ_TIME_SECONDS = 25 * 60 // 25 menit (default)

export function QuizStage() {
  const { setStage, setQuizResult, student, typingResult, progress } = useAppStore()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentIdx, setCurrentIdx] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [now, setNow] = useState<number>(Date.now())
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [saving, setSaving] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null)
  const [savingProgress, setSavingProgress] = useState(false)
  const isMounted = useRef(true)

  // Pilih set soal sesuai kelas siswa (kelas 8 = dasar, kelas 9 = advanced)
  const [QUESTIONS, setQuestions] = useState<Question[]>([])

  // Resume: load progress quiz dari DB
  useEffect(() => {
    if (progress && progress.quizAnswers && Object.keys(progress.quizAnswers).length > 0) {
      setAnswers(progress.quizAnswers)
      toast.info(`Progress quiz dimuat: ${Object.keys(progress.quizAnswers).length} soal sudah dijawab`)
    }
    if (progress && progress.quizStartTime) {
      const savedStart = new Date(progress.quizStartTime).getTime()
      const adjustedStart = savedStart - (progress.quizDuration * 1000)
      setStartTime(adjustedStart)
    } else {
      setStartTime(Date.now())
    }
  }, [progress])

  useEffect(() => {
    const grade = (student?.kelas as GradeLevel) ?? '8A'
    // ── FIX Bug A: Pakai getGradeTier() bukan grade.charAt(0) ──
    // Sebelumnya: "11DKV".charAt(0) = '1' → API filter gradeLevel='1' → 0 hasil
    // → fallback ke soal SMP kelas 7 (SALAH subjek).
    // Sekarang: getGradeTier("11DKV") = '11DKV' → API filter gradeLevel='11DKV'
    // → benar mengembalikan soal SMK.
    const tier = getGradeTier(grade) as '7' | '8' | '9' | '11DKV' | '12DKV'
    // ── FIX #1: Pass cpId/tpId/limit for STRICT CP/TP isolation ──
    // These are stored in localStorage by student-dashboard when student
    // starts an assignment. If cpId is set, only questions matching that
    // CP will be returned — no global fallback.
    const cpId = typeof window !== 'undefined' ? localStorage.getItem('currentAssignmentCpId') : null
    const tpId = typeof window !== 'undefined' ? localStorage.getItem('currentAssignmentTpId') : null
    const questionCount = typeof window !== 'undefined' ? localStorage.getItem('currentAssignmentQuestionCount') : null
    const subject = typeof window !== 'undefined' ? localStorage.getItem('currentSubject') || 'Informatika' : 'Informatika'

    const params = new URLSearchParams({ grade: tier, subject })
    if (cpId && cpId !== 'null' && cpId !== '__none__') params.set('cpId', cpId)
    if (tpId && tpId !== 'null' && tpId !== '__none__') params.set('tpId', tpId)
    if (questionCount && parseInt(questionCount) > 0) params.set('limit', questionCount)

    fetch(`/api/content/questions?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.questions?.length > 0) {
          setQuestions(data.questions)
        } else {
          // Fallback ke data statis jika API gagal
          // CATATAN: getQuestionsFallback akan return [] untuk SMK (11DKV/12DKV)
          // agar tidak salah mengembalikan soal SMP.
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

  // ── FIX #2: Use custom duration from assignment if set ──
  // Read from localStorage (set by student-dashboard when starting assignment)
  // 0 = use default (25 min for quiz)
  const [quizDurationSec] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_QUIZ_TIME_SECONDS
    const stored = localStorage.getItem('currentAssignmentDuration')
    const minutes = stored ? parseInt(stored) : 0
    return minutes > 0 ? minutes * 60 : DEFAULT_QUIZ_TIME_SECONDS
  })

  const elapsedSec = startTime ? Math.floor((now - startTime) / 1000) : 0
  const remainingSec = Math.max(0, quizDurationSec - elapsedSec)
  const timeUp = remainingSec === 0

  const answeredCount = Object.keys(answers).length
  const progressPct = QUESTIONS.length > 0 ? (answeredCount / QUESTIONS.length) * 100 : 0

  // Auto-save jawaban quiz ke DB setiap kali jawaban berubah
  useEffect(() => {
    if (!student?.id || !startTime) return

    const saveQuizProgress = async () => {
      setSavingProgress(true)
      try {
        const res = await fetch('/api/student/progress', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: student.id,
            currentStage: 'quiz',
            quizAnswers: JSON.stringify(answers),
            quizStartTime: new Date(startTime).toISOString(),
            quizDuration: elapsedSec,
            isCompleted: false,
          }),
        })
        if (res.ok) setLastSavedAt(Date.now())
      } catch (err) {
        console.error('Auto-save quiz failed:', err)
      } finally {
        setSavingProgress(false)
      }
    }

    // Debounced save 1 detik setelah jawaban berubah
    const timer = setTimeout(saveQuizProgress, 1000)

    // Save saat tab ditutup
    const handleBeforeUnload = () => {
      const payload = JSON.stringify({
        studentId: student.id,
        currentStage: 'quiz',
        quizAnswers: JSON.stringify(answers),
        quizStartTime: new Date(startTime).toISOString(),
        quizDuration: elapsedSec,
        isCompleted: false,
      })
      const blob = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon('/api/student/progress', blob)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [answers, startTime, student?.id, elapsedSec])

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

    // ── FIX #1: Dynamic totalScore based on taskType ──
    // quiz_only → 100% quiz score (typing ignored)
    // typing_only → 100% typing score (handled in typing-stage, never reaches here)
    // typing_quiz → 50% typing + 50% quiz
    const typingScore = typingResult?.typingScore ?? 0
    const taskType = typeof window !== 'undefined'
      ? localStorage.getItem('currentAssignmentTaskType') || 'typing_quiz'
      : 'typing_quiz'

    let totalScore: number
    if (taskType === 'quiz_only') {
      // Pure quiz — typing score ignored entirely
      totalScore = result.quizScore
    } else if (taskType === 'typing_only') {
      // Should never reach quiz stage, but guard anyway
      totalScore = typingScore
    } else {
      // typing_quiz (default) — 50% typing + 50% quiz
      totalScore = QUESTIONS.length > 0
        ? Math.round(typingScore * 0.5 + result.quizScore * 0.5)
        : typingScore // fallback: 100% typing if no questions loaded
    }

    // Simpan hasil akhir ke tabel Result
    try {
      const assignmentId = typeof window !== 'undefined' ? localStorage.getItem('currentAssignmentId') : null
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
          assignmentId: assignmentId || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan')
      useAppStore.getState().setResultId(data.result.id)
      useAppStore.getState().setTotalScore(totalScore)

      // Tandai progress sebagai completed
      if (student?.id) {
        await fetch('/api/student/progress', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: student.id,
            currentStage: 'completed',
            quizAnswers: JSON.stringify(answers),
            quizStartTime: startTime ? new Date(startTime).toISOString() : '',
            quizDuration: result.quizDuration,
            isCompleted: true,
          }),
        })
      }
    } catch (err) {
      console.error(err)
      toast.error('Gagal menyimpan hasil ke database, namun hasil tetap ditampilkan.')
      useAppStore.getState().setTotalScore(totalScore)
    } finally {
      setSaving(false)
      setStage('completed')
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

  // ── FIX: Listen for force-stop-expired event to submit result before redirect ──
  // When the ForceStopOverlay countdown hits 0, it dispatches this event.
  // We call handleSubmit() to save the final quiz result to /api/result.
  useEffect(() => {
    const handleForceStopExpired = () => {
      try {
        if (!saving) {
          toast.warning('Waktu dihentikan guru! Jawaban otomatis dikirim.')
          handleSubmit()
        }
      } catch (err) {
        console.error('[quiz-stage] force-stop submit failed:', err)
      }
    }
    window.addEventListener('force-stop-expired', handleForceStopExpired)
    return () => window.removeEventListener('force-stop-expired', handleForceStopExpired)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentQ = QUESTIONS[currentIdx]

  // Subject aktif siswa (untuk ForceStop overlay); default Informatika
  const subject = typeof window !== 'undefined' ? localStorage.getItem('currentSubject') || 'Informatika' : 'Informatika'

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
          <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-2">
            {savingProgress ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : lastSavedAt ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Tersimpan</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3 h-3" />
                <span>Auto-save aktif</span>
              </>
            )}
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
          <Progress value={progressPct} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Soal — Layout baru lebih menarik dengan markdown */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-sky-50 pb-3 border-b border-slate-200">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold">
                    {currentIdx + 1}
                  </span>
                  <span className="text-slate-700">dari {QUESTIONS.length}</span>
                </CardTitle>
                <div className="flex items-center gap-1.5">
                  {currentQ.levelKognitif && (
                    <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200 text-xs">
                      {currentQ.levelKognitif}
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 text-xs">
                    {currentQ.category}
                  </Badge>
                  {currentQ.cpId && (
                    <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200 text-xs">
                      CP
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              {/* ── FIX: Render soal dengan markdown untuk tampilan menarik ── */}
              <div className="prose prose-slate max-w-none mb-5">
                <QuestionMarkdown content={currentQ.question} />
              </div>

              {currentQ.imageUrl && (
                <div className="mb-5 flex justify-center">
                  <img
                    src={currentQ.imageUrl}
                    alt="Gambar soal"
                    className="max-w-full max-h-72 rounded-lg border border-slate-200 shadow-sm"
                  />
                </div>
              )}

              {/* ── FIX: Opsi jawaban dengan layout lebih rapi ── */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Pilih jawaban:
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
                  className="space-y-2.5"
                >
                  {currentQ.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        answers[currentQ.id] === i
                          ? 'border-teal-500 bg-teal-50 shadow-sm'
                          : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
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
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold mr-2.5 ${
                          answers[currentQ.id] === i
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

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
          SAKOLA - SMP Santo Augustinus
        </div>
      </footer>
      <ForceStopOverlay subject={subject} />
    </div>
  )
}
