'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAppStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Trophy,
  Clock,
  Type,
  Brain,
  RefreshCw,
  Inbox,
  GraduationCap,
  ExternalLink,
  AlertTriangle,
  FileText,
  Video,
  Image as ImageIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { getGradeTier } from '@/lib/constants'

const KKM = 75

// ── Types ────────────────────────────────────────────────────────────────────
interface ManualGrade {
  id: string
  title: string
  score: number
  description?: string
  createdAt: string
}

interface AutoGrade {
  id: string
  title: string
  score: number
  typingScore: number
  quizScore: number
  typingSpeedWPM: number
  typingAccuracy: number
  quizCorrect: number
  quizTotal: number
  releasedAt: string | null
  quizAnswers?: string // JSON string: Record<number, number>
}

interface GradesResponse {
  success: boolean
  manualGrades?: ManualGrade[]
  autoGrades?: AutoGrade[]
  error?: string
}

interface Question {
  id: number
  dbId?: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
  imageUrl?: string | null
  // Extended fields (may or may not be returned by API)
  levelKognitif?: string
  pembahasanBenar?: string
  analisisDistraktor?: string
}

interface Material {
  id: string
  title: string
  content: string
  category?: string
  mediaType?: string
  mediaUrl?: string | null
  imageUrl?: string | null
  targetKelas?: string
  createdAt: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────
// ── FIX Bug A: Pakai getGradeTier() dari constants ──
// Sebelumnya: regex /^(\d+)/ pada "11DKV" hanya ambil digit "11" (BUKAN "11DKV"),
// sehingga API filter gradeLevel='11' → 0 hasil → soal tidak muncul di review.
// Sekarang: getGradeTier("11DKV") = '11DKV' → API filter gradeLevel='11DKV'
// → benar mengembalikan soal SMK.
const gradeTierFromKelas = (kelas: string): string => {
  return getGradeTier(kelas || '7A')
}

const formatDate = (iso: string | null | undefined): string => {
  if (!iso) return '-'
  try {
    return new Date(iso).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return '-'
  }
}

const levelKognitifColor = (level: string): string => {
  const l = (level || '').toUpperCase()
  if (l === 'C1' || l === 'C2') return 'bg-blue-100 text-blue-700 border-blue-200'
  if (l === 'C3' || l === 'C4') return 'bg-amber-100 text-amber-700 border-amber-200'
  if (l === 'C5' || l === 'C6') return 'bg-purple-100 text-purple-700 border-purple-200'
  return 'bg-slate-100 text-slate-700 border-slate-200'
}

const parseQuizAnswers = (raw?: string): Record<number, number> => {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.type === 'video_reflection') {
      // Refleksi video — bukan kuis pilihan ganda
      return {}
    }
    const out: Record<number, number> = {}
    for (const [k, v] of Object.entries(parsed as Record<string, number>)) {
      out[Number(k)] = Number(v)
    }
    return out
  } catch {
    return {}
  }
}

const isVideoReflection = (raw?: string): boolean => {
  if (!raw) return false
  try {
    const parsed = JSON.parse(raw)
    return parsed?.type === 'video_reflection'
  } catch {
    return false
  }
}

const scoreColor = (score: number): string => {
  if (score >= KKM) return 'text-emerald-600'
  if (score >= 60) return 'text-amber-600'
  return 'text-red-600'
}

// ── Komponen utama ───────────────────────────────────────────────────────────
export function ReviewPage() {
  const router = useRouter()
  const { student } = useAppStore()

  const [grades, setGrades] = useState<GradesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedResultId, setExpandedResultId] = useState<string | null>(null)
  const [materials, setMaterials] = useState<Material[]>([])
  const [materialsLoading, setMaterialsLoading] = useState(false)
  const [questionsByGrade, setQuestionsByGrade] = useState<Record<string, Question[]>>({})

  // Fetch grades
  const fetchGrades = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/student/grades')
      const data: GradesResponse = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal memuat nilai')
      setGrades(data)
    } catch (err) {
      console.error(err)
      toast.error('Gagal memuat nilai yang dirilis.')
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch materials (untuk remedial)
  const fetchMaterials = useCallback(async (subject = 'Informatika') => {
    setMaterialsLoading(true)
    try {
      const res = await fetch(`/api/student/materials?subject=${encodeURIComponent(subject)}`)
      const data = await res.json()
      if (data.success) setMaterials(data.materials || [])
    } catch (err) {
      console.error(err)
    } finally {
      setMaterialsLoading(false)
    }
  }, [])

  // Fetch questions untuk grade tier siswa (cache per grade)
  const fetchQuestions = useCallback(
    async (gradeTier: string, subject = 'Informatika') => {
      if (questionsByGrade[gradeTier]) return questionsByGrade[gradeTier]
      try {
        const res = await fetch(
          `/api/content/questions?grade=${gradeTier}&subject=${encodeURIComponent(subject)}`
        )
        const data = await res.json()
        if (data.success && Array.isArray(data.questions)) {
          setQuestionsByGrade((prev) => ({ ...prev, [gradeTier]: data.questions }))
          return data.questions as Question[]
        }
      } catch (err) {
        console.error(err)
      }
      return []
    },
    [questionsByGrade]
  )

  useEffect(() => {
    fetchGrades()
  }, [fetchGrades])

  // Saat user me-expand result, pre-fetch questions + materials
  useEffect(() => {
    if (!expandedResultId || !student?.kelas) return
    const gradeTier = gradeTierFromKelas(student.kelas)
    fetchQuestions(gradeTier)
    fetchMaterials('Informatika')
  }, [expandedResultId, student?.kelas, fetchQuestions, fetchMaterials])

  const handleToggleExpand = (id: string) => {
    setExpandedResultId((prev) => (prev === id ? null : id))
  }

  const autoGrades = grades?.autoGrades ?? []
  const manualGrades = grades?.manualGrades ?? []
  const hasAnyResult = autoGrades.length > 0 || manualGrades.length > 0

  // ── Loading state ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Review Hasil Kerja</p>
              <p className="text-xs text-slate-500">{student?.namaLengkap} • {student?.kelas}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-slate-400">
            <RefreshCw className="w-10 h-10 mx-auto animate-spin mb-3" />
            <p className="text-sm">Memuat nilai yang sudah dirilis...</p>
          </div>
        </main>
        <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
          <div className="container max-w-5xl mx-auto px-4 text-center text-xs">
            SAKOLA - SMP Santo Augustinus
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Review Hasil Kerja</p>
              <p className="text-xs text-slate-500">
                {student?.namaLengkap} • {student?.kelas} • {student?.sekolah}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push('/')}>
            Kembali
          </Button>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        {/* Info banner */}
        <Card className="border-indigo-200 bg-indigo-50/60 mb-6">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Trophy className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-indigo-900">
                <p className="font-semibold">Nilai yang Sudah Dirilis</p>
                <p className="text-xs text-indigo-700/80 mt-1">
                  Berikut adalah hasil latihan yang sudah dirilis oleh guru. Klik kartu untuk melihat
                  pembahasan tiap soal dan rekomendasi remedial jika skor di bawah KKM ({KKM}).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty state */}
        {!hasAnyResult && (
          <Card className="border-slate-200">
            <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Inbox className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-base font-semibold text-slate-700 mb-1">
                Belum ada nilai yang dirilis.
              </p>
              <p className="text-sm text-slate-500 max-w-md">
                Nilai akan muncul setelah guru merilis hasil.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Daftar auto grades */}
        {autoGrades.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-600" />
              Latihan Mengetik &amp; HOTS ({autoGrades.length})
            </h2>
            <div className="space-y-3">
              {autoGrades.map((g) => {
                const isExpanded = expandedResultId === g.id
                const belowKKM = g.score < KKM
                return (
                  <Card
                    key={g.id}
                    className={`border-slate-200 transition-shadow ${
                      isExpanded ? 'shadow-md' : 'hover:shadow-sm'
                    }`}
                  >
                    {/* Header kartu (klik untuk expand) */}
                    <button
                      type="button"
                      onClick={() => handleToggleExpand(g.id)}
                      className="w-full text-left"
                      aria-expanded={isExpanded}
                    >
                      <CardHeader className="bg-slate-50 pb-3">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-3 min-w-0">
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                            )}
                            <div className="min-w-0">
                              <CardTitle className="text-base truncate">{g.title}</CardTitle>
                              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Dirilis: {formatDate(g.releasedAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {belowKKM && (
                              <Badge
                                variant="outline"
                                className="bg-red-50 text-red-700 border-red-200"
                              >
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Di bawah KKM
                              </Badge>
                            )}
                            <div className="flex items-baseline gap-1">
                              <span className={`text-2xl font-bold ${scoreColor(g.score)}`}>
                                {g.score}
                              </span>
                              <span className="text-xs text-slate-400">/100</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </button>

                    {/* Breakdown selalu tampil */}
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-2.5 rounded-md bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-1 text-slate-500 mb-1">
                            <Type className="w-3 h-3" />
                            <span>Skor Mengetik</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">{g.typingScore}</p>
                          <p className="text-[10px] text-slate-400">
                            {g.typingSpeedWPM} WPM • {g.typingAccuracy}% akurasi
                          </p>
                        </div>
                        <div className="p-2.5 rounded-md bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-1 text-slate-500 mb-1">
                            <Brain className="w-3 h-3" />
                            <span>Skor Kuis</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">{g.quizScore}</p>
                          <p className="text-[10px] text-slate-400">
                            {g.quizCorrect}/{g.quizTotal} benar
                          </p>
                        </div>
                        <div className="p-2.5 rounded-md bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-1 text-slate-500 mb-1">
                            <Trophy className="w-3 h-3" />
                            <span>Total</span>
                          </div>
                          <p className={`text-sm font-semibold ${scoreColor(g.score)}`}>
                            {g.score}
                          </p>
                          <p className="text-[10px] text-slate-400">/100</p>
                        </div>
                        <div className="p-2.5 rounded-md bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-1 text-slate-500 mb-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Status</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">
                            {belowKKM ? 'Remedial' : 'Lulus'}
                          </p>
                          <p className="text-[10px] text-slate-400">KKM {KKM}</p>
                        </div>
                      </div>
                    </CardContent>

                    {/* Expanded review */}
                    {isExpanded && (
                      <CardContent className="pt-0">
                        <Separator className="my-4" />
                        <ResultReview
                          grade={g}
                          student={student}
                          questions={student?.kelas ? questionsByGrade[gradeTierFromKelas(student.kelas)] ?? [] : []}
                          materials={materials}
                          materialsLoading={materialsLoading}
                        />
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          </section>
        )}

        {/* Daftar manual grades */}
        {manualGrades.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Nilai Manual ({manualGrades.length})
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {manualGrades.map((g) => {
                const belowKKM = g.score < KKM
                return (
                  <Card key={g.id} className="border-slate-200">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{g.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {formatDate(g.createdAt)}
                          </p>
                          {g.description && (
                            <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                              {g.description}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className={`text-2xl font-bold ${scoreColor(g.score)}`}>
                            {g.score}
                          </span>
                          {belowKKM ? (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-[10px]">
                              Remedial
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                              Lulus
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
        <div className="container max-w-5xl mx-auto px-4 text-center text-xs">
          SAKOLA - SMP Santo Augustinus
        </div>
      </footer>
    </div>
  )
}

// ── Sub-komponen: review per result ──────────────────────────────────────────
function ResultReview({
  grade,
  student,
  questions,
  materials,
  materialsLoading,
}: {
  grade: AutoGrade
  student: { kelas?: string } | null
  questions: Question[]
  materials: Material[]
  materialsLoading: boolean
}) {
  const answers = parseQuizAnswers(grade.quizAnswers)
  const isReflection = isVideoReflection(grade.quizAnswers)
  const answeredKeys = Object.keys(answers)
  const belowKKM = grade.score < KKM

  // ── Kasus 1: ini refleksi video ──
  if (isReflection) {
    let reflectionText = ''
    let videoUrl = ''
    try {
      const parsed = JSON.parse(grade.quizAnswers || '{}')
      reflectionText = parsed.text || ''
      videoUrl = parsed.videoUrl || ''
    } catch {}

    return (
      <div className="space-y-4">
        <div>
          <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 mb-2">
            <Video className="w-3 h-3 mr-1" />
            Tugas Refleksi Video
          </Badge>
          <p className="text-xs text-slate-500 mb-2">
            Tugas ini berupa refleksi/rangkuman video, bukan kuis pilihan ganda.
          </p>
          {videoUrl && (
            <p className="text-xs text-slate-600 mb-2 break-all">
              <span className="font-medium">Sumber video:</span>{' '}
              <a
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline inline-flex items-center gap-1"
              >
                {videoUrl} <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          )}
        </div>
        <div className="p-3 rounded-md border border-slate-200 bg-slate-50">
          <p className="text-xs font-semibold text-slate-600 mb-1">Refleksi Siswa:</p>
          <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
            {reflectionText || '(Refleksi kosong)'}
          </p>
        </div>
        {belowKKM && (
          <RemedialSection materials={materials} materialsLoading={materialsLoading} />
        )}
      </div>
    )
  }

  // ── Kasus 2: kuis pilihan ganda, soal tersedia ──
  const hasQuestions = questions.length > 0 && answeredKeys.length > 0

  if (hasQuestions) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">Pembahasan Soal</p>
          <Badge variant="outline" className="bg-slate-100 text-slate-600">
            {answeredKeys.length} jawaban • {questions.length} soal di bank
          </Badge>
        </div>

        <div className="space-y-3">
          {answeredKeys.map((k) => {
            const qIdx = Number(k)
            const q = questions.find((qq) => qq.id === qIdx) || questions[qIdx - 1]
            if (!q) {
              return (
                <div
                  key={k}
                  className="p-3 rounded-md border border-amber-200 bg-amber-50 text-xs text-amber-700"
                >
                  Soal #{qIdx} tidak lagi tersedia di bank soal. Jawaban tersimpan: opsi{' '}
                  {String.fromCharCode(65 + answers[qIdx])}
                </div>
              )
            }
            const studentAnswer = answers[qIdx]
            const isCorrect = studentAnswer === q.correctAnswer
            return (
              <QuestionReview
                key={k}
                index={qIdx}
                question={q}
                studentAnswer={studentAnswer}
                isCorrect={isCorrect}
              />
            )
          })}
        </div>

        {belowKKM && (
          <RemedialSection materials={materials} materialsLoading={materialsLoading} />
        )}
      </div>
    )
  }

  // ── Kasus 3: fallback — soal tidak tersedia / tidak ada jawaban ──
  return (
    <div className="space-y-4">
      <div className="p-3 rounded-md border border-blue-200 bg-blue-50 text-xs text-blue-700">
        <p className="font-semibold mb-1">Catatan Review</p>
        <p>
          Review rincian per soal membutuhkan soal yang masih aktif di bank soal. Berikut ringkasan
          jawaban tersimpan:
        </p>
      </div>
      {answeredKeys.length > 0 ? (
        <div className="rounded-md border border-slate-200 overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left">No. Soal</th>
                <th className="px-3 py-2 text-left">Jawaban Dipilih</th>
              </tr>
            </thead>
            <tbody>
              {answeredKeys.map((k) => (
                <tr key={k} className="border-t border-slate-100">
                  <td className="px-3 py-2 text-slate-700">#{k}</td>
                  <td className="px-3 py-2 text-slate-700">
                    Opsi {String.fromCharCode(65 + answers[Number(k)])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xs text-slate-500">
          Tidak ada jawaban kuis tersimpan pada hasil ini (mungkin tugas mengetik saja).
        </p>
      )}

      {belowKKM && (
        <RemedialSection materials={materials} materialsLoading={materialsLoading} />
      )}
    </div>
  )
}

// ── Sub-komponen: review per soal ────────────────────────────────────────────
function QuestionReview({
  index,
  question,
  studentAnswer,
  isCorrect,
}: {
  index: number
  question: Question
  studentAnswer: number
  isCorrect: boolean
}) {
  const level = question.levelKognitif
  const pembahasan = question.pembahasanBenar
  const distraktor = question.analisisDistraktor

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      {/* Header soal */}
      <div
        className={`px-4 py-3 flex items-start gap-3 ${
          isCorrect ? 'bg-emerald-50' : 'bg-red-50'
        }`}
      >
        {isCorrect ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-semibold text-slate-700">Soal #{index}</span>
            {level && (
              <Badge variant="outline" className={`text-[10px] ${levelKognitifColor(level)}`}>
                {level}
              </Badge>
            )}
            {question.category && (
              <Badge variant="outline" className="text-[10px] bg-slate-100 text-slate-600">
                {question.category}
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">{question.question}</p>
        </div>
      </div>

      {/* Opsi jawaban */}
      <div className="px-4 py-3 space-y-1.5">
        {question.options.map((opt, i) => {
          const isStudent = i === studentAnswer
          const isCorrectOpt = i === question.correctAnswer
          return (
            <div
              key={i}
              className={`flex items-start gap-2 px-3 py-2 rounded-md text-sm border ${
                isCorrectOpt
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : isStudent
                  ? 'border-red-300 bg-red-50 text-red-900'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <span className="font-semibold text-xs w-5 flex-shrink-0">
                {String.fromCharCode(65 + i)}.
              </span>
              <span className="flex-1">{opt}</span>
              {isCorrectOpt && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              )}
              {isStudent && !isCorrectOpt && (
                <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      {/* Ringkasan jawaban siswa */}
      <div className="px-4 pb-3 -mt-1">
        <p className="text-xs text-slate-600">
          Jawaban Anda:{' '}
          <span className={isCorrect ? 'text-emerald-700 font-semibold' : 'text-red-700 font-semibold'}>
            {studentAnswer !== undefined && question.options[studentAnswer]
              ? `${String.fromCharCode(65 + studentAnswer)}. ${question.options[studentAnswer]}`
              : '(tidak dijawab)'}
          </span>
          {!isCorrect && (
            <>
              {' '}• Jawaban benar:{' '}
              <span className="text-emerald-700 font-semibold">
                {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
              </span>
            </>
          )}
        </p>
      </div>

      {/* Callout: pembahasan benar (biru) */}
      {pembahasan && (
        <div className="mx-4 mb-3 p-3 rounded-md border border-blue-200 bg-blue-50">
          <p className="text-xs font-semibold text-blue-800 mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Pembahasan Jawaban Benar
          </p>
          <p className="text-xs text-blue-900 leading-relaxed">{pembahasan}</p>
        </div>
      )}

      {/* Callout: analisis distraktor (amber) */}
      {distraktor && (
        <div className="mx-4 mb-3 p-3 rounded-md border border-amber-200 bg-amber-50">
          <p className="text-xs font-semibold text-amber-800 mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            Analisis Distraktor (Mengapa Opsi Lain Salah)
          </p>
          <p className="text-xs text-amber-900 leading-relaxed whitespace-pre-wrap">{distraktor}</p>
        </div>
      )}

      {/* Penjelasan umum jika tidak ada pembahasanBenar */}
      {!pembahasan && question.explanation && (
        <div className="mx-4 mb-3 p-3 rounded-md border border-slate-200 bg-slate-50">
          <p className="text-xs font-semibold text-slate-700 mb-1">Penjelasan</p>
          <p className="text-xs text-slate-700 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}

// ── Sub-komponen: remedial section ───────────────────────────────────────────
function RemedialSection({
  materials,
  materialsLoading,
}: {
  materials: Material[]
  materialsLoading: boolean
}) {
  const materialIcon = (m: Material) => {
    const t = (m.mediaType || '').toLowerCase()
    if (t === 'video') return <Video className="w-4 h-4 text-rose-500" />
    if (t === 'gambar' || t === 'teks_gambar') return <ImageIcon className="w-4 h-4 text-purple-500" />
    if (t === 'powerpoint') return <FileText className="w-4 h-4 text-orange-500" />
    return <BookOpen className="w-4 h-4 text-indigo-500" />
  }

  const openMaterial = (m: Material) => {
    if (m.mediaUrl) {
      window.open(m.mediaUrl, '_blank', 'noopener,noreferrer')
    } else {
      toast.info(`Materi: ${m.title}`)
    }
  }

  return (
    <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-md bg-amber-200 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4 h-4 text-amber-800" />
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-900">Rekomendasi Remedial</p>
          <p className="text-xs text-amber-800 mt-0.5">
            Skor Anda di bawah KKM. Pelajari materi berikut untuk memperbaiki pemahaman:
          </p>
        </div>
      </div>

      {materialsLoading ? (
        <div className="flex items-center gap-2 text-xs text-amber-700">
          <RefreshCw className="w-3 h-3 animate-spin" />
          Memuat materi...
        </div>
      ) : materials.length === 0 ? (
        <p className="text-xs text-amber-700 italic">
          Belum ada materi remedial tersedia untuk mapel ini. Silakan hubungi guru.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-2">
          {materials.slice(0, 6).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => openMaterial(m)}
              className="flex items-start gap-2 p-3 rounded-md border border-amber-200 bg-white hover:bg-amber-50 transition-colors text-left group"
            >
              <span className="flex-shrink-0 mt-0.5">{materialIcon(m)}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-800 line-clamp-2 group-hover:text-amber-900">
                  {m.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  {m.category && (
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {m.category}
                    </span>
                  )}
                  {m.mediaUrl && (
                    <span className="text-[10px] text-amber-700 flex items-center gap-0.5">
                      <ExternalLink className="w-2.5 h-2.5" />
                      Buka
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
