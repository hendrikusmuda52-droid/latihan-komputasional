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
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  // answers: Record<questionId, number> untuk PG, Record<questionId, string> untuk essay.
  // Mixed assignment (PG + essay dalam tugas yang sama) memerlukan typed union.
  const [answers, setAnswersState] = useState<Record<number, number | string>>({})
  const setAnswers = (next: Record<number, number | string>) => setAnswersState(next)
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

  // ── PERSISTENCE: localStorage keys untuk simpan jawaban + waktu mulai ──
  // Supaya saat refresh / switch tab / tutup browser, waktu dan jawaban tetap tersimpan
  // Key per-assignment supaya tidak konflik antar tugas
  const [STORAGE_KEY_ANSWERS] = useState(() => {
    if (typeof window === 'undefined') return 'quiz_answers_temp'
    const aid = localStorage.getItem('currentAssignmentId') || 'temp'
    return `quiz_answers_${aid}`
  })
  const [STORAGE_KEY_STARTTIME] = useState(() => {
    if (typeof window === 'undefined') return 'quiz_startTime_temp'
    const aid = localStorage.getItem('currentAssignmentId') || 'temp'
    return `quiz_startTime_${aid}`
  })

  // Resume: load progress quiz dari localStorage (primary) + DB (backup)
  useEffect(() => {
    // 1. Coba restore startTime dari localStorage (instant, tidak perlu tunggu DB)
    const storedStart = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_STARTTIME) : null
    if (storedStart) {
      const startMs = parseInt(storedStart, 10)
      if (!isNaN(startMs) && startMs > 0) {
        setStartTime(startMs)
      }
    }

    // 2. Coba restore jawaban dari localStorage (instant)
    const storedAnswers = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_ANSWERS) : null
    if (storedAnswers) {
      try {
        const parsed = JSON.parse(storedAnswers)
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          setAnswers(parsed)
          toast.info(`Progress quiz dimuat: ${Object.keys(parsed).length} soal sudah dijawab`)
        }
      } catch {}
    }

    // 3. Fallback: kalau localStorage kosong, coba dari DB progress
    if (progress && progress.quizStartTime && !storedStart) {
      const savedStart = new Date(progress.quizStartTime).getTime()
      const adjustedStart = savedStart - (progress.quizDuration * 1000)
      setStartTime(adjustedStart)
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_STARTTIME, String(adjustedStart))
      }
    }

    if (progress && progress.quizAnswers && Object.keys(progress.quizAnswers).length > 0 && !storedAnswers) {
      setAnswers(progress.quizAnswers)
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(progress.quizAnswers))
      }
      toast.info(`Progress quiz dimuat dari server: ${Object.keys(progress.quizAnswers).length} soal sudah dijawab`)
    }

    // 4. Kalau tidak ada di mana-mana, init baru
    if (!storedStart && !progress?.quizStartTime) {
      const now = Date.now()
      setStartTime(now)
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_STARTTIME, String(now))
      }
    }
  }, [progress, STORAGE_KEY_ANSWERS, STORAGE_KEY_STARTTIME])

  // Auto-save jawaban ke localStorage setiap jawaban berubah (instant, tanpa network)
  useEffect(() => {
    if (Object.keys(answers).length === 0) return
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers))
  }, [answers, STORAGE_KEY_ANSWERS])

  // Auto-save startTime ke localStorage (saat mulai, supaya waktu tidak reset saat refresh)
  useEffect(() => {
    if (!startTime || typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY_STARTTIME, String(startTime))
  }, [startTime, STORAGE_KEY_STARTTIME])

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

  // ── ANTI COPY-PASTE + ANTI SCREENSHOT ──
  // Disable: right-click, text selection, copy/cut/paste, screenshot shortcuts (PrintScreen, Ctrl+P, Ctrl+S)
  // Reason: keamanan ujian — siswa tidak bisa copy soal atau paste jawaban dari luar
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      toast.warning('Right-click dinonaktifkan saat ujian', { duration: 1500 })
    }
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      toast.warning('Copy dinonaktifkan saat ujian', { duration: 1500 })
    }
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault()
      toast.warning('Cut dinonaktifkan saat ujian', { duration: 1500 })
    }
    const handlePaste = (e: ClipboardEvent) => {
      // Hanya block paste di input/textarea (jawaban), tidak di seluruh halaman
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        e.preventDefault()
        toast.warning('Paste dinonaktifkan. Jawaban harus diketik manual.', { duration: 2000 })
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block screenshot shortcuts
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        toast.warning('Screenshot dinonaktifkan saat ujian', { duration: 1500 })
        // Clear clipboard sebagai fallback (PrintScreen masih bisa capture, tapi clipboard dikosongkan)
        try {
          navigator.clipboard.writeText('')
        } catch {}
        return false
      }
      // Ctrl+P (print), Ctrl+S (save page), Ctrl+Shift+S, Ctrl+Shift+I (devtools)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's' || e.key === 'P' || e.key === 'S')) {
        e.preventDefault()
        toast.warning('Print/Save dinonaktifkan saat ujian', { duration: 1500 })
        return false
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.key === 's' || e.key === 'S')) {
        e.preventDefault()
        toast.warning('DevTools dinonaktifkan saat ujian', { duration: 1500 })
        return false
      }
      // Ctrl+U (view source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault()
        return false
      }
    }
    // Disable text selection via CSS + JS
    const handleSelectStart = (e: Event) => {
      // Allow selection di input/textarea (untuk typing)
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return // allow
      }
      e.preventDefault()
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('cut', handleCut)
    document.addEventListener('paste', handlePaste)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelectStart)
    // Block drag (image drag bisa reveal soal)
    document.addEventListener('dragstart', (e) => e.preventDefault())

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // User switch tab — mungkin screenshot di app lain
        toast.warning('Jangan tinggalkan halaman ujian!', { duration: 2000 })
      }
    })

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('cut', handleCut)
      document.removeEventListener('paste', handlePaste)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelectStart)
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

  // answeredCount: hitung soal yang sudah dijawab.
  // ── pilihan_ganda: answered bila answers[id] adalah number ──
  // ── pilihan_ganda_kompleks: answered bila answers[id] adalah JSON string array non-empty ──
  // ── isian_singkat: answered bila answers[id] adalah string non-empty ──
  // ── mencocokkan: answered bila answers[id] adalah JSON object dengan semua key terisi ──
  // ── essai: answered bila answers[id] adalah string non-empty ──
  const answeredCount = QUESTIONS.filter((q) => {
    const v = answers[q.id]
    if (v === undefined || v === null) return false
    const qType = q.questionType || 'pilihan_ganda'
    if (qType === 'pilihan_ganda') return typeof v === 'number'
    if (qType === 'pilihan_ganda_kompleks') {
      // v bisa JSON string "[0,2]" atau number[]
      try {
        const arr = typeof v === 'string' ? JSON.parse(v) : (Array.isArray(v) ? v : [])
        return Array.isArray(arr) && arr.length > 0
      } catch { return false }
    }
    if (qType === 'isian_singkat') return typeof v === 'string' && v.trim().length > 0
    if (qType === 'mencocokkan') {
      // v adalah JSON object {key: value}
      try {
        const obj = typeof v === 'string' ? JSON.parse(v) : (typeof v === 'object' ? v : {})
        return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0
      } catch { return false }
    }
    if (qType === 'essai') return typeof v === 'string' && v.trim().length > 0
    return false
  }).length
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
    // ── Scoring dengan bobot berbeda per tipe soal ──
    // Default weights (urutan: PG, PG Kompleks, Isian):
    //   - PG: 50% total (1.43 poin per soal untuk 35 soal)
    //   - PG Kompleks: 30% total (3 poin per soal untuk 10 soal)
    //   - Isian: 20% total (2 poin per soal untuk 10 soal)
    //   - Essai/Mencocokkan: tidak di-auto-grade (dinilai manual)
    //
    // Isian Singkat scoring:
    //   - BEST (paling benar, last in shortAnswer): 100% poin (2 poin)
    //   - RIGHT (benar parsial): 50% poin (1 poin)
    //   - Salah/kosong: 0 poin
    //
    // Jika ada essai di tugas, totalScore akan di-recalculate saat guru input nilai essai
    // (lihat API /api/result/[id]/essay-grade — rumus 60% PG + 40% essai)
    // Untuk tugas tanpa essai (mis: Tugas Bab 2 11DKV), totalScore = quizScore langsung
    const pgQuestions = QUESTIONS.filter((q) => !q.questionType || q.questionType === 'pilihan_ganda')
    const pgkQuestions = QUESTIONS.filter((q) => q.questionType === 'pilihan_ganda_kompleks')
    const isianQuestions = QUESTIONS.filter((q) => q.questionType === 'isian_singkat')

    // ── Hitung correct per tipe ──
    let pgCorrect = 0
    for (const q of pgQuestions) {
      const a = answers[q.id]
      if (typeof a === 'number' && a === q.correctAnswer) pgCorrect++
    }

    let pgkCorrect = 0
    for (const q of pgkQuestions) {
      try {
        const correctArr: number[] = JSON.parse(q.correctAnswers || '[]')
        let studentArr: number[] = []
        const a = answers[q.id]
        if (typeof a === 'string') studentArr = JSON.parse(a || '[]')
        else if (Array.isArray(a)) studentArr = a as unknown as number[]
        const sameSet = correctArr.length === studentArr.length &&
          correctArr.every((v) => studentArr.includes(v))
        if (sameSet) pgkCorrect++
      } catch {}
    }

    // ── Isian: hitung poin dengan BEST=2, RIGHT=1, salah/kosong=0 ──
    let isianPoints = 0
    let isianCorrectBest = 0  // count BEST answer
    let isianCorrectPartial = 0  // count partial-correct
    for (const q of isianQuestions) {
      const accepted = (q.shortAnswer || '').split('|').map(s => s.trim().toLowerCase()).filter(Boolean)
      if (accepted.length === 0) continue
      const best = accepted[accepted.length - 1]  // last = BEST
      const rightPartial = accepted.slice(0, -1)  // all except last
      const a = answers[q.id]
      const student = typeof a === 'string' ? a.trim().toLowerCase() : ''
      if (!student) continue  // kosong = 0 poin
      if (student === best) {
        isianPoints += 2  // BEST = full poin
        isianCorrectBest++
      } else if (rightPartial.includes(student)) {
        isianPoints += 1  // partial = 50% poin
        isianCorrectPartial++
      }
      // else: salah = 0 poin
    }

    // ── Hitung total skor dengan bobot ──
    // Default: PG 50%, PG Kompleks 30%, Isian 20%
    // Jika salah satu tipe tidak ada (count=0), redistribute bobot proporsional
    let totalScore = 0
    const hasPG = pgQuestions.length > 0
    const hasPGK = pgkQuestions.length > 0
    const hasIsian = isianQuestions.length > 0
    const totalGradeableTypes = (hasPG ? 1 : 0) + (hasPGK ? 1 : 0) + (hasIsian ? 1 : 0)

    if (totalGradeableTypes > 0) {
      // ── Hitung skor per tipe (0-100) ──
      const pgScore = hasPG ? (pgCorrect / pgQuestions.length) * 100 : 0
      const pgkScore = hasPGK ? (pgkCorrect / pgkQuestions.length) * 100 : 0
      // Isian: skor = (isianPoints / maxPossiblePoints) × 100
      // maxPossiblePoints = isianQuestions.length × 2 (karena BEST=2 poin)
      const isianMaxPoints = isianQuestions.length * 2
      const isianScore = hasIsian ? (isianPoints / isianMaxPoints) * 100 : 0

      // ── Apply bobot ──
      // Jika semua 3 tipe ada: PG 50% + PGK 30% + Isian 20%
      // Jika hanya 2 tipe: redistribute (mis: PG+PGK = 62.5%+37.5% proporsional dari 50:30)
      // Jika hanya 1 tipe: 100% dari tipe itu
      if (hasPG && hasPGK && hasIsian) {
        totalScore = pgScore * 0.5 + pgkScore * 0.3 + isianScore * 0.2
      } else if (hasPG && hasPGK) {
        // PG:PGK = 50:30 = 62.5%:37.5%
        totalScore = pgScore * 0.625 + pgkScore * 0.375
      } else if (hasPG && hasIsian) {
        // PG:Isian = 50:20 = 71.4%:28.6%
        totalScore = pgScore * (50/70) + isianScore * (20/70)
      } else if (hasPGK && hasIsian) {
        // PGK:Isian = 30:20 = 60%:40%
        totalScore = pgkScore * 0.6 + isianScore * 0.4
      } else if (hasPG) {
        totalScore = pgScore
      } else if (hasPGK) {
        totalScore = pgkScore
      } else if (hasIsian) {
        totalScore = isianScore
      }
    }
    totalScore = Math.round(totalScore)

    // Total benar (untuk display) = PG benar + PGK benar + isian (BEST atau partial dihitung 1)
    const totalCorrect = pgCorrect + pgkCorrect + isianCorrectBest + isianCorrectPartial
    const totalGradeable = pgQuestions.length + pgkQuestions.length + isianQuestions.length

    return {
      answers,
      quizCorrect: totalCorrect,
      quizTotal: totalGradeable,
      quizScore: totalScore,
      quizDuration: elapsedSec,
    }
  }

  const handleSubmit = async () => {
    if (saving) return

    // ── VALIDATION: cek isian singkat — jika ada jawaban di luar accepted, tolak submit ──
    // Siswa boleh kosongkan isian, tapi jika diisi harus sesuai accepted answers
    const invalidIsianQuestions = QUESTIONS.filter((q) => {
      if (q.questionType !== 'isian_singkat') return false
      const accepted = (q.shortAnswer || '').split('|').map(s => s.trim().toLowerCase()).filter(Boolean)
      if (accepted.length === 0) return false
      const a = answers[q.id]
      const student = typeof a === 'string' ? a.trim().toLowerCase() : ''
      if (student === '') return false  // kosong = OK
      return !accepted.includes(student)  // invalid jika tidak match
    })

    if (invalidIsianQuestions.length > 0) {
      // Tolak submit — ada isian dengan jawaban tidak valid
      toast.error(
        `Ada ${invalidIsianQuestions.length} soal isian dengan jawaban di luar opsi yang disediakan. ` +
        `Mohon perbaiki atau kosongkan jawaban isian tersebut sebelum submit.`,
        { duration: 5000 }
      )
      // Navigate ke soal isian pertama yang invalid
      const firstInvalidIdx = QUESTIONS.findIndex((q) => q.id === invalidIsianQuestions[0].id)
      if (firstInvalidIdx >= 0) {
        setCurrentIdx(firstInvalidIdx)
      }
      return
    }

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
      // ── CLEAR localStorage: hapus jawaban + startTime supaya next ujian mulai fresh ──
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY_ANSWERS)
        localStorage.removeItem(STORAGE_KEY_STARTTIME)
      }
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

  // ── NEW: Shuffled values untuk mencocokkan (dipindah ke top-level supaya pakai useMemo legal) ──
  // Parse matchPairs untuk currentQ kalau tipenya mencocokkan
  const currentMatchPairs: Array<{ key: string; value: string }> = useMemo(() => {
    if (!currentQ || currentQ.questionType !== 'mencocockan') return []
    try {
      return JSON.parse(currentQ.matchPairs || '[]')
    } catch {
      return []
    }
  }, [currentQ?.id, currentQ?.matchPairs, currentQ?.questionType])

  // Shuffle deterministic per question (seeded by questionId)
  const shuffledMatchValues = useMemo(() => {
    if (currentMatchPairs.length === 0) return []
    const vals = currentMatchPairs.map((p) => p.value)
    // ── FIX: currentQ.id bisa number (dari API reassign) atau string — konversi ke string dulu
    const seedRaw = currentQ?.id ?? 'default'
    const seed = typeof seedRaw === 'number' ? String(seedRaw) : seedRaw
    for (let i = vals.length - 1; i > 0; i--) {
      const j = (seed.charCodeAt(0) + i) % (i + 1)
      ;[vals[i], vals[j]] = [vals[j], vals[i]]
    }
    return vals
  }, [currentMatchPairs, currentQ?.id])

  // ── NEW: Untuk isian singkat — combine 3 accepted + 4 wrong, shuffle for display ──
  // Dipindah ke top-level supaya pakai useMemo legal (rules of hooks)
  const isianDisplayOptions = useMemo(() => {
    if (!currentQ || currentQ.questionType !== 'isian_singkat') return []
    const accepted = (currentQ.shortAnswer || '')
      .split('|')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean)
    const wrong = [
      currentQ.options[0] || '',
      currentQ.options[1] || '',
      currentQ.options[2] || '',
      currentQ.options[3] || '',
    ].filter(Boolean)
    const all = [
      ...accepted.map((a, i) => ({
        text: a,
        type: i === accepted.length - 1 ? 'best' as const : 'right' as const,
      })),
      ...wrong.map(w => ({ text: w, type: 'wrong' as const })),
    ]
    // Shuffle deterministic by question id
    const seedRaw = currentQ.id ?? 'default'
    const seed = typeof seedRaw === 'number' ? String(seedRaw) : seedRaw
    for (let i = all.length - 1; i > 0; i--) {
      const j = (seed.charCodeAt(0) + i) % (i + 1)
      ;[all[i], all[j]] = [all[j], all[i]]
    }
    return all
  }, [currentQ?.id, currentQ?.questionType, currentQ?.shortAnswer, currentQ?.options])

  // Subject aktif siswa (untuk ForceStop overlay); default Informatika
  const subject = typeof window !== 'undefined' ? localStorage.getItem('currentSubject') || 'Informatika' : 'Informatika'

  // Loading state saat soal belum ter-load dari DB
  if (QUESTIONS.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
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
    <div className="min-h-screen flex flex-col bg-slate-50" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
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
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* ── BADGE TIPE SOAL (utama, paling kiri) — user request: label jelas ── */}
                  {(() => {
                    const qt = currentQ.questionType || 'pilihan_ganda'
                    const config: Record<string, { label: string; className: string }> = {
                      pilihan_ganda: { label: '📌 Pilihan Ganda', className: 'bg-teal-100 text-teal-800 border-teal-300' },
                      pilihan_ganda_kompleks: { label: '☑️ PG Kompleks (pilih beberapa)', className: 'bg-sky-100 text-sky-800 border-sky-300' },
                      isian_singkat: { label: '✏️ Isian Singkat', className: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
                      mencocokkan: { label: '🔄 Mencocokkan', className: 'bg-purple-100 text-purple-800 border-purple-300' },
                      essai: { label: '📝 Essai', className: 'bg-amber-100 text-amber-800 border-amber-300' },
                    }
                    const c = config[qt] || config.pilihan_ganda
                    return (
                      <Badge variant="outline" className={`text-xs font-semibold ${c.className}`}>
                        {c.label}
                      </Badge>
                    )
                  })()}
                  {currentQ.levelKognitif && (
                    <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200 text-xs">
                      {currentQ.levelKognitif}
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 text-xs">
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

              {/* ── Render input berdasarkan tipe soal ── */}
              {/* 5 tipe: pilihan_ganda, pilihan_ganda_kompleks, mencocokkan, isian_singkat, essai */}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 1. PILIHAN GANDA (default) — RadioGroup single choice */}
              {/* ──────────────────────────────────────────────────────── */}
              {(!currentQ.questionType || currentQ.questionType === 'pilihan_ganda') && (
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Pilih satu jawaban:
                  </p>
                  <RadioGroup
                    value={
                      answers[currentQ.id] !== undefined && typeof answers[currentQ.id] === 'number'
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
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 2. PILIHAN GANDA KOMPLEKS — Checkbox multi-choice */}
              {/* ──────────────────────────────────────────────────────── */}
              {currentQ.questionType === 'pilihan_ganda_kompleks' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide">
                      Pilih semua jawaban yang benar (boleh lebih dari satu)
                    </p>
                    <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200 text-xs">
                      PG Kompleks
                    </Badge>
                  </div>
                  {(() => {
                    // Student answer untuk PG Kompleks disimpan sebagai JSON string "[0,2]"
                    const currentArr: number[] = (() => {
                      const v = answers[currentQ.id]
                      if (!v) return []
                      try {
                        if (typeof v === 'string') return JSON.parse(v)
                        if (Array.isArray(v)) return v
                      } catch {}
                      return []
                    })()
                    const toggle = (idx: number) => {
                      const newArr = currentArr.includes(idx)
                        ? currentArr.filter((x) => x !== idx)
                        : [...currentArr, idx]
                      setAnswers({
                        ...answers,
                        [currentQ.id]: JSON.stringify(newArr),
                      })
                    }
                    return (
                      <div className="space-y-2.5">
                        {currentQ.options.map((opt, i) => {
                          const checked = currentArr.includes(i)
                          return (
                            <label
                              key={i}
                              className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                checked
                                  ? 'border-sky-500 bg-sky-50 shadow-sm'
                                  : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50'
                              }`}
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={() => toggle(i)}
                                className="mt-1"
                              />
                              <span className="cursor-pointer flex-1 text-sm leading-relaxed text-slate-700">
                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold mr-2.5 ${
                                  checked ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {String.fromCharCode(65 + i)}
                                </span>
                                {opt}
                              </span>
                            </label>
                          )
                        })}
                        <p className="text-xs text-slate-500 mt-2">
                          ✓ Terpilih: <strong>{currentArr.length}</strong> jawaban
                        </p>
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 3. ISIAN SINGKAT — Input text + opsi clickable chips */}
              {/* ──────────────────────────────────────────────────────── */}
              {currentQ.questionType === 'isian_singkat' && (() => {
                // Parse shortAnswer: "right1|right2|best" (3 accepted, last = BEST)
                const acceptedAnswers = (currentQ.shortAnswer || '')
                  .split('|')
                  .map(s => s.trim().toLowerCase())
                  .filter(Boolean)
                const bestAnswer = acceptedAnswers.length > 0 ? acceptedAnswers[acceptedAnswers.length - 1] : ''
                const rightPartial = acceptedAnswers.length > 1 ? acceptedAnswers.slice(0, -1) : []

                // allDisplayOptions sudah di-compute di top-level (isianDisplayOptions)
                const allDisplayOptions = isianDisplayOptions

                const currentValue = typeof answers[currentQ.id] === 'string' ? (answers[currentQ.id] as string) : ''
                const lowerValue = currentValue.trim().toLowerCase()
                const isBest = lowerValue === bestAnswer
                const isPartial = rightPartial.includes(lowerValue)
                const isAccepted = isBest || isPartial
                const isEmpty = lowerValue === ''

                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                        Ketik jawaban berdasarkan opsi di bawah (WAJIB mengetik)
                      </p>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                        Isian Singkat
                      </Badge>
                    </div>

                    {/* Input text — siswa WAJIB mengetik manual (tidak bisa klik opsi) */}
                    <Input
                      type="text"
                      value={currentValue}
                      onChange={(e) => {
                        const val = e.target.value
                        setAnswers({
                          ...answers,
                          [currentQ.id]: val,
                        })
                      }}
                      onPaste={(e) => {
                        e.preventDefault()
                        toast.warning('Paste dinonaktifkan. Jawaban harus diketik manual.', { duration: 2000 })
                      }}
                      onCopy={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      placeholder="KETIK jawaban di sini berdasarkan opsi di bawah..."
                      className={`text-base font-medium ${
                        isEmpty ? '' : isBest ? 'border-emerald-500 bg-emerald-50' : isPartial ? 'border-amber-400 bg-amber-50' : isAccepted ? 'border-emerald-400 bg-emerald-50' : 'border-red-400 bg-red-50'
                      }`}
                      autoComplete="off"
                      spellCheck={false}
                      autoFocus
                    />

                    {/* Opsi jawaban — DISPLAY ONLY (tidak bisa diklik, siswa wajib ketik) */}
                    <div className="space-y-2">
                      <p className="text-xs text-slate-600 font-medium">
                        📋 Opsi jawaban (lihat, lalu KETIK jawaban yang menurut Anda benar di atas):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {allDisplayOptions.map((opt, idx) => {
                          const isSelected = lowerValue === opt.text.toLowerCase()
                          return (
                            <span
                              key={idx}
                              className={`px-3 py-1.5 rounded-lg border-2 text-sm font-medium cursor-not-allowed select-none ${
                                isSelected
                                  ? 'border-emerald-500 bg-emerald-100 text-emerald-800 shadow-sm'
                                  : 'border-slate-200 bg-slate-50 text-slate-600'
                              }`}
                              title="Opsi (tidak bisa diklik — ketik manual di atas)"
                              onCopy={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                            >
                              {opt.text}
                              {isSelected && <span className="ml-1">✓</span>}
                            </span>
                          )
                        })}
                      </div>
                      <p className="text-xs text-slate-500 italic">
                        💡 Ada <strong>{allDisplayOptions.length} opsi</strong>: 3 jawaban yang diterima (2 benar + 1 paling benar) + 4 jawaban salah. <strong>Anda wajib MENGETIK jawaban di input atas — opsi tidak bisa diklik.</strong>
                      </p>
                    </div>

                    {/* Validation feedback real-time */}
                    {isEmpty ? (
                      <p className="text-xs text-slate-500">
                        💡 Jawaban boleh dikosongkan (tidak diisi). Jika diisi, harus diketik dari opsi yang disediakan.
                      </p>
                    ) : isBest ? (
                      <p className="text-xs text-emerald-700 font-medium">
                        ✓ Jawaban paling tepat! (skor penuh 100%)
                      </p>
                    ) : isPartial ? (
                      <p className="text-xs text-amber-700 font-medium">
                        ★ Jawaban benar (skor parsial 50%)
                      </p>
                    ) : isAccepted ? (
                      <p className="text-xs text-emerald-700 font-medium">
                        ✓ Jawaban diterima
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 font-medium">
                        ⚠️ Jawaban tidak ada di opsi. Ketik salah satu opsi yang tersedia di atas.
                      </p>
                    )}

                    {/* Info penilaian */}
                    <div className="p-2 bg-slate-50 rounded text-xs text-slate-600">
                      <p className="font-medium">Info penilaian:</p>
                      <ul className="ml-4 list-disc space-y-0.5">
                        <li>Jawaban <strong>paling benar</strong>: skor 100% (2 poin)</li>
                        <li>Jawaban <strong>benar</strong>: skor 50% (1 poin)</li>
                        <li>Jawaban <strong>salah</strong>: 0 poin</li>
                        <li>Jawaban boleh <strong>kosong</strong> (0 poin)</li>
                      </ul>
                    </div>

                    <p className="text-xs text-red-600 italic">
                      🔒 Anti copy-paste aktif. Jawaban WAJIB diketik manual.
                    </p>
                  </div>
                )
              })()}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 4. MENCOCOKKAN / JODOHKAN — dropdown per item */}
              {/* ──────────────────────────────────────────────────────── */}
              {currentQ.questionType === 'mencocockan' && (() => {
                // pairs & shuffledValues sudah di-compute di top-level (currentMatchPairs & shuffledMatchValues)
                const pairs = currentMatchPairs
                const shuffledValues = shuffledMatchValues

                // Get current student answers as object
                const currentMatches: Record<string, string> = (() => {
                  const v = answers[currentQ.id]
                  if (!v) return {}
                  try {
                    if (typeof v === 'string') return JSON.parse(v)
                    if (typeof v === 'object') return v as Record<string, string>
                  } catch {}
                  return {}
                })()

                const setMatch = (key: string, value: string) => {
                  setAnswers({
                    ...answers,
                    [currentQ.id]: JSON.stringify({ ...currentMatches, [key]: value }),
                  })
                }

                if (pairs.length === 0) {
                  return (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-700 text-xs">
                      ⚠️ Soal mencocokkan belum dikonfigurasi (matchPairs kosong). Hubungi guru.
                    </div>
                  )
                }

                return (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                        Cocokkan item di kiri dengan jawaban di kanan
                      </p>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                        Mencocokkan
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {pairs.map((pair, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 rounded-xl border-2 border-slate-200 bg-slate-50"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="text-xs text-slate-500 mr-2">{idx + 1}.</span>
                            <span className="text-sm font-medium text-slate-800">{pair.key}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs hidden sm:inline">→</span>
                            <Select
                              value={currentMatches[pair.key] || ''}
                              onValueChange={(v) => setMatch(pair.key, v)}
                            >
                              <SelectTrigger className="w-full sm:w-48 h-9">
                                <SelectValue placeholder="Pilih jawaban..." />
                              </SelectTrigger>
                              <SelectContent>
                                {shuffledValues.map((val) => (
                                  <SelectItem key={val} value={val}>{val}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      💡 Pilih jawaban yang paling cocok untuk setiap item. Soal ini akan dinilai manual oleh guru.
                    </p>
                  </div>
                )
              })()}

              {/* ──────────────────────────────────────────────────────── */}
              {/* 5. ESSAI — Textarea (panjang, dinilai manual) */}
              {/* ──────────────────────────────────────────────────────── */}
              {currentQ.questionType === 'essai' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                      Soal Essai — WAJIB mengetik (dinilai guru)
                    </p>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                      Essai
                    </Badge>
                  </div>
                  <Textarea
                    value={(typeof answers[currentQ.id] === 'string' ? answers[currentQ.id] as string : '')}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        [currentQ.id]: e.target.value,
                      })
                    }
                    onPaste={(e) => {
                      e.preventDefault()
                      toast.warning('Paste dinonaktifkan. Jawaban essai harus diketik manual.', { duration: 2000 })
                    }}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    placeholder="KETIK jawaban essai Anda di sini. Jelaskan dengan lengkap dan jelas."
                    className="min-h-[200px] text-sm leading-relaxed resize-y"
                    autoFocus
                  />
                  <p className="text-xs text-slate-500">
                    Jawaban essai akan disimpan dan dinilai oleh guru secara manual.
                    Skor otomatis saat ini hanya dihitung dari soal yang bisa di-auto-grade.
                  </p>
                  <p className="text-xs text-red-600 italic">
                    🔒 Anti copy-paste aktif. Jawaban WAJIB diketik manual.
                  </p>
                </div>
              )}

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
                  // ── Tentukan status jawaban berdasar tipe soal ──
                  const v = answers[q.id]
                  const qType = q.questionType || 'pilihan_ganda'
                  let isAnswered = false
                  if (qType === 'pilihan_ganda') {
                    isAnswered = typeof v === 'number'
                  } else if (qType === 'pilihan_ganda_kompleks') {
                    try {
                      const arr = typeof v === 'string' ? JSON.parse(v) : (Array.isArray(v) ? v : [])
                      isAnswered = Array.isArray(arr) && arr.length > 0
                    } catch { isAnswered = false }
                  } else if (qType === 'isian_singkat') {
                    isAnswered = typeof v === 'string' && v.trim().length > 0
                  } else if (qType === 'mencocokkan') {
                    try {
                      const obj = typeof v === 'string' ? JSON.parse(v) : (typeof v === 'object' ? v : {})
                      isAnswered = typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0
                    } catch { isAnswered = false }
                  } else if (qType === 'essai') {
                    isAnswered = typeof v === 'string' && v.trim().length > 0
                  }
                  const isCurrent = i === currentIdx
                  // Warna navigator per tipe soal
                  const typeColor = qType === 'essai' ? 'amber'
                    : qType === 'pilihan_ganda_kompleks' ? 'sky'
                    : qType === 'isian_singkat' ? 'emerald'
                    : qType === 'mencocokkan' ? 'purple'
                    : 'teal'  // pilihan_ganda
                  const typeIcon = qType === 'essai' ? '✎'
                    : qType === 'pilihan_ganda_kompleks' ? '☑'
                    : qType === 'isian_singkat' ? '✎'
                    : qType === 'mencocokkan' ? '⇄'
                    : ''  // pilihan_ganda (no icon)
                  const colorMap: Record<string, { answered: string; unanswered: string }> = {
                    amber: { answered: 'bg-amber-100 text-amber-700 hover:bg-amber-200', unanswered: 'bg-amber-50 text-amber-500 hover:bg-amber-100 border border-amber-200' },
                    sky: { answered: 'bg-sky-100 text-sky-700 hover:bg-sky-200', unanswered: 'bg-sky-50 text-sky-500 hover:bg-sky-100 border border-sky-200' },
                    emerald: { answered: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200', unanswered: 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100 border border-emerald-200' },
                    purple: { answered: 'bg-purple-100 text-purple-700 hover:bg-purple-200', unanswered: 'bg-purple-50 text-purple-500 hover:bg-purple-100 border border-purple-200' },
                    teal: { answered: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200', unanswered: 'bg-slate-100 text-slate-500 hover:bg-slate-200' },
                  }
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(i)}
                      className={`aspect-square rounded-md text-xs font-semibold transition-all ${
                        isCurrent
                          ? 'bg-teal-600 text-white ring-2 ring-teal-300 ring-offset-1'
                          : isAnswered
                          ? colorMap[typeColor].answered
                          : colorMap[typeColor].unanswered
                      }`}
                      title={`Soal ${i + 1} (${qType === 'pilihan_ganda' ? 'PG' : qType === 'pilihan_ganda_kompleks' ? 'PG Kompleks' : qType === 'isian_singkat' ? 'Isian' : qType === 'mencocokkan' ? 'Mencocokkan' : 'Essai'})`}
                    >
                      {i + 1}{typeIcon}
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
                <div className="border-t border-slate-200 my-2" />
                <p className="font-semibold text-slate-700">Tipe soal:</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-teal-50 border border-teal-200" /> PG (pilihan ganda)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-sky-100" /> PG Kompleks (☑ checkbox)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-100" /> Isian Singkat (✎)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-purple-100" /> Mencocokkan (⇄)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-100" /> Essai (✎)
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
