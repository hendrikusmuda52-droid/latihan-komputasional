'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  GraduationCap, LogOut, Play, History, Clock, CheckCircle2,
  Trophy, Type, Brain, Target, FileText, Calendar, RefreshCw,
  Lock, Hourglass, BookOpen, TrendingUp, Award, Zap, ChevronRight,
  ChevronLeft, Layers, Maximize2, X, Image as ImageIcon, Video, Presentation,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { useAppStore } from '@/lib/store'
import { SMP_SUBJECTS, SMK_SUBJECTS, getSubjectsByJenjang, getJenjang } from '@/lib/constants'
import { SelfAssessment } from '@/components/student/self-assessment'
import { MaterialMarkdownRenderer } from '@/components/student/material-markdown-renderer'

interface StudentInfo { id: string; namaLengkap: string; nisn: string; kelas: string; sekolah: string; jenisKelamin: string }
interface Assignment { id: string; title: string; description: string; dueDate: string | null; createdAt: string; exerciseType: string; questionCount: number; taskType: string; canRetake: boolean; hasCompleted: boolean; duration?: number; cpId?: string | null; tpId?: string | null; isExpired?: boolean }
interface ResultItem { id: string; typingScore: number; quizScore: number; totalScore: number; typingSpeedWPM: number; typingAccuracy: number; quizCorrect: number; quizTotal: number; completedAt: string; releasedAt: string | null; assignmentId?: string | null }
interface Material { id: string; title: string; content: string; category: string; createdAt: string; mediaType?: string; mediaUrl?: string | null; imageUrl?: string | null }
interface DashboardData { student: StudentInfo; assignments: Assignment[]; results: ResultItem[]; pendingResultsCount: number; hasActiveProgress: boolean; activeProgressStage: string | null; hasCompletedAnyExercise: boolean }

export function StudentDashboard({ student, onLogout }: { student: StudentInfo; onLogout: () => void }) {
  const { setStudent, setStage, setProgress } = useAppStore()
  const router = useRouter()
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [data, setData] = useState<DashboardData | null>(null)
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'tugas' | 'materi' | 'nilai' | 'capaian'>('tugas')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [reviewResultId, setReviewResultId] = useState<string | null>(null)

  const jenjang = getJenjang(student.kelas)
  const subjects = getSubjectsByJenjang(jenjang)

  const fetchData = async (subject: string) => {
    setLoading(true)
    try {
      const [assignRes, matRes] = await Promise.all([
        fetch(`/api/student/assignments?subject=${encodeURIComponent(subject)}`).then(r => r.json()),
        fetch(`/api/student/materials?subject=${encodeURIComponent(subject)}`).then(r => r.json()),
      ])
      if (assignRes.success) setData(assignRes)
      if (matRes.success) setMaterials(matRes.materials || [])
    } catch { toast.error('Gagal memuat data') }
    finally { setLoading(false) }
  }

  useEffect(() => {
    // Auto-select first subject (Informatika if available)
    const defaultSubject = subjects.includes('Informatika' as never) ? 'Informatika' : subjects[0] as string
    setSelectedSubject(defaultSubject)
  }, [])

  useEffect(() => {
    if (selectedSubject) {
      fetchData(selectedSubject)
      // Store subject in localStorage for ForceStopOverlay to read
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentSubject', selectedSubject)
      }
    }
  }, [selectedSubject])

  const handleStartAssignment = (a: Assignment) => {
    // ── BUG A FIX: Check per-assignment completion, not global subject completion ──
    if (a.hasCompleted && a.exerciseType === 'wajib' && !a.canRetake) {
      toast.error('Tugas wajib ini sudah dikerjakan. Hubungi guru untuk reset.')
      return
    }
    setStudent(student); setProgress(null)
    // Store the assignment ID in localStorage for auto-save sync
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentAssignmentId', a.id)
      localStorage.setItem('currentAssignmentTitle', a.title)
      localStorage.setItem('currentAssignmentTaskType', a.taskType)
      // ── FIX #1: Store CP/TP/questionCount for strict quiz isolation ──
      localStorage.setItem('currentAssignmentCpId', a.cpId || '')
      localStorage.setItem('currentAssignmentTpId', a.tpId || '')
      localStorage.setItem('currentAssignmentQuestionCount', String(a.questionCount || 0))
      // ── FIX #2: Store duration for quiz timer ──
      localStorage.setItem('currentAssignmentDuration', String(a.duration || 0))
    }
    // v3: handle new media task types
    if (a.taskType === 'refleksi_video') { toast.success(`Memulai refleksi video: ${a.title}`); setStage('video' as 'typing') }
    else if (a.taskType === 'analisis_gambar') { toast.success(`Memulai analisis gambar: ${a.title}`); setStage('quiz') }
    else if (a.taskType === 'quiz_only') { toast.success(`Memulai: ${a.title}`); setStage('quiz') }
    else if (a.taskType === 'game') { toast.success(`Memulai game: ${a.title}`); setStage('game') }
    else if (a.taskType === 'drawing') { toast.success(`Memulai menggambar: ${a.title}`); setStage('drawing') }
    else { toast.success(`Memulai: ${a.title}`); setStage('typing') }
    router.push('/')
  }

  const handleLogout = async () => { await fetch('/api/student/auth', { method: 'DELETE' }); onLogout(); toast.success('Berhasil logout') }
  const getScoreBadge = (s: number) => s >= 80 ? 'bg-emerald-100 text-emerald-700' : s >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'

  if (loading && !data) return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50"><RefreshCw className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" /><p className="text-slate-500">Memuat dashboard...</p></div>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
      <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 shadow-lg">
        <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center"><GraduationCap className="w-6 h-6 text-white" /></div>
            <div><h1 className="text-lg font-bold text-white">SAKOLA</h1><p className="text-xs text-emerald-100">{student.namaLengkap} • {student.kelas} • {jenjang}</p></div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/?view=teacher" target="_blank"><Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">Guru</Button></a>
            <Button variant="outline" size="sm" onClick={() => selectedSubject && fetchData(selectedSubject)} disabled={loading} className="bg-white/10 border-white/20 text-white hover:bg-white/20"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="bg-red-500/20 border-red-300/30 text-white hover:bg-red-500/30"><LogOut className="w-4 h-4 mr-1" />Logout</Button>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">Selamat datang, {student.namaLengkap}! 👋</h2>
            <p className="text-emerald-100 text-sm">Username: {student.nisn} • {student.sekolah} • Jenjang: {jenjang}</p>
            {data?.hasActiveProgress && <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-sm"><Hourglass className="w-4 h-4" />Ada latihan yang belum selesai</div>}
          </div>
        </div>

        {/* Subject Selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900">Pilih Mata Pelajaran</h3>
            <span className="text-xs text-slate-400">({subjects.length} mapel tersedia untuk {jenjang})</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
            {subjects.map((subj) => (
              <button
                key={subj}
                onClick={() => { setSelectedSubject(subj as string); setActiveTab('tugas') }}
                className={`p-3 rounded-xl text-xs font-semibold transition-all border-2 ${
                  selectedSubject === subj
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-md scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {/* Selected subject badge */}
        {selectedSubject && (
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-100 text-emerald-700 text-sm"><BookOpen className="w-3 h-3 mr-1" />{selectedSubject}</Badge>
            <span className="text-xs text-slate-400">Klik mapel lain di atas untuk berganti</span>
          </div>
        )}

        {/* Stats */}
        {data && data.results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: History, label: 'Total Latihan', value: data.results.length, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
              { icon: Trophy, label: 'Nilai Tertinggi', value: Math.max(...data.results.map(r => r.totalScore)), color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50' },
              { icon: TrendingUp, label: 'Rata-rata', value: Math.round(data.results.reduce((a, b) => a + b.totalScore, 0) / data.results.length), color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50' },
              { icon: Zap, label: 'WPM Terbaik', value: Math.max(...data.results.map(r => r.typingSpeedWPM)), color: 'from-purple-500 to-pink-600', bg: 'bg-purple-50' },
            ].map((s, i) => { const Icon = s.icon; return (
              <Card key={i} className={`${s.bg} border-0 shadow-md`}>
                <CardContent className="p-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><Icon className="w-5 h-5 text-white" /></div>
                  <p className="text-2xl font-bold text-slate-900">{s.value}</p><p className="text-xs text-slate-500">{s.label}</p>
                </CardContent>
              </Card>
            )})}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-slate-200">
          {[
            { id: 'tugas' as const, label: 'Tugas Latihan', icon: FileText },
            { id: 'materi' as const, label: 'Materi Belajar', icon: BookOpen },
            { id: 'nilai' as const, label: 'Nilai Saya', icon: Award },
            { id: 'capaian' as const, label: 'Capaian & Rapor', icon: Target },
          ].map(tab => { const Icon = tab.icon; return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Icon className="w-4 h-4" />{tab.label}
            </button>
          )})}
        </div>

        {/* Tab: Tugas */}
        {activeTab === 'tugas' && (
          <div className="space-y-3">
            {(data?.pendingResultsCount ?? 0) > 0 && data && (
              <Card className="border-amber-300 bg-amber-50"><CardContent className="pt-4 pb-4 flex items-start gap-3"><Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" /><div><p className="text-sm font-semibold text-amber-900">{data.pendingResultsCount} hasil menunggu review guru</p><p className="text-xs text-amber-700 mt-1">Nilai muncul setelah guru merilis.</p></div></CardContent></Card>
            )}
            {!data?.assignments.length ? (
              <Card className="border-0 shadow-md"><CardContent className="py-16 text-center"><div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-slate-400" /></div><p className="font-semibold text-slate-700">Belum ada tugas {selectedSubject}</p><p className="text-sm text-slate-400 mt-1">Tunggu guru {selectedSubject} menerbitkan tugas</p></CardContent></Card>
            ) : (
              data.assignments.map((a) => {
                // ── FIX 4: Per-assignment lock logic ──
                // hasCompleted = student has a Result for THIS specific assignment
                // canRetake = persiapan (always) OR !hasCompleted (assignment not yet done / was reset)
                const isLocked = a.hasCompleted && a.exerciseType === 'wajib' && !a.canRetake
                return (
                <Card key={a.id} className={`border-0 shadow-md hover:shadow-xl transition-all cursor-pointer group overflow-hidden ${isLocked ? 'opacity-60' : ''}`} onClick={() => handleStartAssignment(a)}>
                  <div className={`h-1 ${a.exerciseType === 'wajib' ? 'bg-red-500' : 'bg-blue-500'}`} />
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">{a.taskType === 'game' ? 'Game' : a.taskType === 'drawing' ? 'Menggambar' : a.taskType === 'quiz_only' ? 'Soal HOTS' : a.taskType === 'refleksi_video' ? 'Video' : 'Mengetik + Soal'}</Badge>
                          <Badge className={`text-xs ${a.exerciseType === 'wajib' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{a.exerciseType === 'wajib' ? 'Wajib' : 'Persiapan'}</Badge>
                          {isLocked && <Badge className="bg-slate-200 text-slate-600">Selesai</Badge>}
                          {!isLocked && a.hasCompleted && <Badge className="bg-emerald-100 text-emerald-700">Remedial</Badge>}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{a.title}</h3>
                        {a.description && <p className="text-sm text-slate-500 mt-1">{a.description}</p>}
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-3"><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(a.createdAt).toLocaleDateString('id-ID')}</span></div>
                      </div>
                      <div>
                        {isLocked ? (
                          <Button size="sm" variant="outline" disabled className="opacity-50"><Lock className="w-3 h-3 mr-1" />Terkunci</Button>
                        ) : a.hasCompleted ? (
                          // Assignment was completed before but has been reset by guru → "Mulai Remedial"
                          <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-md"><Play className="w-3 h-3 mr-1" />Mulai Remedial</Button>
                        ) : (
                          <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md"><Play className="w-3 h-3 mr-1" />{data?.hasActiveProgress ? 'Lanjutkan' : 'Mulai'}</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                )
              })
            )}
          </div>
        )}

        {/* Tab: Materi */}
        {activeTab === 'materi' && (
          <div className="space-y-3">
            {materials.length === 0 ? (
              <Card className="border-0 shadow-md"><CardContent className="py-16 text-center"><div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4"><BookOpen className="w-8 h-8 text-purple-400" /></div><p className="font-semibold text-slate-700">Belum ada materi {selectedSubject}</p></CardContent></Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-3">
                {materials.map((m) => (
                  <Card key={m.id} className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer group" onClick={() => setSelectedMaterial(m)}>
                    <CardContent className="pt-5 pb-5">
                      <div className="flex items-center gap-2 mb-3"><div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><BookOpen className="w-5 h-5 text-white" /></div><Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">{m.category}</Badge></div>
                      <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-2">{m.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-3">{m.content.replace(/[#*]/g, '').substring(0, 150)}...</p>
                      <div className="flex items-center justify-between mt-3"><span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(m.createdAt).toLocaleDateString('id-ID')}</span><ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" /></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Nilai */}
        {activeTab === 'nilai' && (
          <div className="space-y-3">
            {!data?.results.length ? (
              <Card className="border-0 shadow-md"><CardContent className="py-16 text-center"><div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4"><Award className="w-8 h-8 text-amber-400" /></div><p className="font-semibold text-slate-700">Belum ada nilai {selectedSubject} dirilis</p></CardContent></Card>
            ) : (
              data.results.map((r, i) => (
                <Card key={r.id} className="border-0 shadow-md"><CardContent className="pt-5 pb-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${r.totalScore >= 80 ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : r.totalScore >= 60 ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-red-500 to-pink-600'}`}>{i + 1}</div>
                      <div>
                        <p className="font-semibold text-slate-900">{r.releasedAt ? new Date(r.releasedAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5"><span className="flex items-center gap-1"><Type className="w-3 h-3" />Mengetik: {r.typingScore}</span><span className="flex items-center gap-1"><Brain className="w-3 h-3" />Quiz: {r.quizScore}</span></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* ── FIX #2: Review Jawaban button (only if released + has quiz) ── */}
                      {r.quizTotal > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-blue-300 text-blue-600 hover:bg-blue-50"
                          onClick={() => setReviewResultId(r.id)}
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Review Jawaban
                        </Button>
                      )}
                      <Badge className={`text-sm font-bold ${getScoreBadge(r.totalScore)}`}><Trophy className="w-3 h-3 mr-1" />{r.totalScore}</Badge>
                    </div>
                  </div>
                </CardContent></Card>
              ))
            )}
          </div>
        )}

        {/* Tab: Capaian & Rapor Mandiri */}
        {activeTab === 'capaian' && (
          <SelfAssessment subject={selectedSubject || 'Informatika'} />
        )}
      </main>

      {selectedMaterial && (
        <MaterialModal material={selectedMaterial} onClose={() => setSelectedMaterial(null)} />
      )}

      {/* ── FIX #2: Review Jawaban Modal ── */}
      {reviewResultId && (
        <ReviewModal resultId={reviewResultId} onClose={() => setReviewResultId(null)} />
      )}

      <footer className="bg-slate-900 text-slate-400 py-4 mt-8"><div className="container max-w-5xl mx-auto px-4 text-center text-xs">SAKOLA — SMP Santo Augustinus</div></footer>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
// REVIEW MODAL — Quiz answer review with correct/incorrect highlighting
// Shows: question, options (A-D), student answer (red/green), correct
// answer, explanation, imageUrl if available.
// Security: only accessible if result.isReleased === true (enforced by API)
// ══════════════════════════════════════════════════════════════════

function ReviewModal({ resultId, onClose }: { resultId: string; onClose: () => void }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reviewData, setReviewData] = useState<{
    result: {
      totalScore: number
      typingScore: number
      quizScore: number
      quizCorrect: number
      quizTotal: number
    }
    questions: Array<{
      index: number
      question: string
      options: string[]
      correctAnswer: number
      studentAnswer: number | null
      isCorrect: boolean
      explanation: string
      imageUrl: string | null
    }>
  } | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`/api/student/review?resultId=${encodeURIComponent(resultId)}`)
      .then((r) => {
        if (r.status === 403) {
          throw new Error('Nilai belum dirilis oleh guru. Jawaban dan pembahasan tidak dapat dilihat.')
        }
        return r.json()
      })
      .then((data) => {
        if (!data.success) throw new Error(data.error || 'Gagal memuat review')
        setReviewData(data)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Gagal memuat review')
      })
      .finally(() => setLoading(false))
  }, [resultId])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Review Jawaban</h2>
              {reviewData && (
                <p className="text-xs text-white/70 mt-0.5">
                  Skor: {reviewData.result.totalScore} • Benar: {reviewData.result.quizCorrect}/{reviewData.result.quizTotal}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              <p className="text-sm">Memuat review jawaban...</p>
            </div>
          ) : error ? (
            <div className="py-16 text-center">
              <AlertCircle className="w-10 h-10 mx-auto mb-3 text-amber-400" />
              <p className="font-medium text-amber-700 mb-1">{error}</p>
              <p className="text-xs text-slate-500 mt-2">Hubungi guru Anda jika ada pertanyaan.</p>
            </div>
          ) : !reviewData || reviewData.questions.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="font-medium">Tidak ada data soal untuk ditampilkan</p>
              <p className="text-xs mt-1">Soal mungkin tidak terkait CP/TP tertentu pada tugas ini.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviewData.questions.map((q) => (
                <div
                  key={q.index}
                  className={`rounded-lg border-2 p-4 ${
                    q.isCorrect
                      ? 'border-emerald-200 bg-emerald-50/50'
                      : 'border-red-200 bg-red-50/50'
                  }`}
                >
                  {/* Question header */}
                  <div className="flex items-start gap-2 mb-3">
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      q.isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                    }`}>
                      {q.isCorrect ? '✓' : '✗'}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 flex-1">
                      {q.index}. {q.question}
                    </p>
                  </div>

                  {/* Question image */}
                  {q.imageUrl && (
                    <div className="mb-3 flex justify-center">
                      <img
                        src={q.imageUrl}
                        alt={`Gambar soal ${q.index}`}
                        className="max-w-full max-h-48 rounded-lg border border-slate-200"
                      />
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-1.5 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isStudentAnswer = q.studentAnswer === optIdx
                      const isCorrectAnswer = q.correctAnswer === optIdx
                      const letter = String.fromCharCode(65 + optIdx)

                      let bgClass = 'bg-white border-slate-200 text-slate-700'
                      if (isCorrectAnswer) {
                        bgClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-medium'
                      } else if (isStudentAnswer && !isCorrectAnswer) {
                        bgClass = 'bg-red-100 border-red-400 text-red-900 font-medium'
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md border ${bgClass}`}
                        >
                          <span className="font-bold text-sm w-5">{letter}.</span>
                          <span className="text-sm flex-1">{opt}</span>
                          {isCorrectAnswer && (
                            <span className="text-xs text-emerald-600 font-medium">✓ Kunci</span>
                          )}
                          {isStudentAnswer && !isCorrectAnswer && (
                            <span className="text-xs text-red-600 font-medium">Jawaban Anda</span>
                          )}
                          {isStudentAnswer && isCorrectAnswer && (
                            <span className="text-xs text-emerald-600 font-medium">Jawaban Anda ✓</span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Explanation */}
                  {q.explanation && (
                    <div className="mt-2 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-3">
                      <p className="text-xs font-semibold text-blue-700 mb-1">📖 Pembahasan:</p>
                      <p className="text-sm text-blue-900 leading-relaxed">{q.explanation}</p>
                    </div>
                  )}

                  {/* No answer indicator */}
                  {q.studentAnswer === null && (
                    <p className="text-xs text-amber-600 italic mt-2">
                      ⚠ Tidak dijawab
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-slate-50 flex-shrink-0 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>Tutup</Button>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
// MATERIAL MODAL — Modern Pop-up with backdrop-blur, media support
// Supports: teks, gambar, teks_gambar, powerpoint (Google Slides), video (YouTube)
// ══════════════════════════════════════════════════════════════════

function MaterialModal({ material, onClose }: { material: Material; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const mediaType = material.mediaType || 'teks'

  // Convert Google Slides URL to embed URL
  const getGoogleSlidesEmbed = (url: string) => {
    // Match patterns like https://docs.google.com/presentation/d/FILE_ID/edit
    const match = url.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/)
    if (match) {
      return `https://docs.google.com/presentation/d/${match[1]}/embed?start=false&loop=false&delayms=3000`
    }
    return url
  }

  // Convert YouTube URL to embed URL
  const getYouTubeEmbed = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? 'https://www.youtube.com/embed/' + match[1] : url
  }

  // Fullscreen API
  const handleFullscreen = () => {
    const elem = mediaContainerRef.current
    if (!elem) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      elem.requestFullscreen?.()
    }
  }
  const mediaContainerRef = useRef<HTMLDivElement>(null)

  // Icon based on media type
  const mediaIcon = () => {
    switch (mediaType) {
      case 'video': return <Video className="w-5 h-5 text-white" />
      case 'powerpoint': return <Presentation className="w-5 h-5 text-white" />
      case 'gambar':
      case 'teks_gambar': return <ImageIcon className="w-5 h-5 text-white" />
      default: return <BookOpen className="w-5 h-5 text-white" />
    }
  }

  // Gradient based on media type
  const headerGradient = () => {
    switch (mediaType) {
      case 'video': return 'from-rose-600 to-red-600'
      case 'powerpoint': return 'from-orange-600 to-amber-600'
      case 'gambar':
      case 'teks_gambar': return 'from-purple-600 to-indigo-600'
      default: return 'from-purple-600 to-pink-600'
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${headerGradient()} p-5 flex items-center justify-between flex-shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              {mediaIcon()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{material.title}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge className="text-xs bg-white/20 text-white border-white/30">{material.category}</Badge>
                <span className="text-xs text-white/70 capitalize">{mediaType}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Fullscreen button — always visible in header next to close */}
            <button
              onClick={handleFullscreen}
              className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
              aria-label="Mode Fullscreen"
              title="Mode Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content area — renders based on mediaType */}
        <div className="flex-1 overflow-y-auto" ref={mediaContainerRef}>
          {/* Text content — rendered as interactive Markdown (Bug #3 fix) */}
          {(mediaType === 'teks' || mediaType === 'teks_gambar') && material.content && (
            <div className="p-6">
              <MaterialMarkdownRenderer content={material.content} />
            </div>
          )}

          {/* Image */}
          {(mediaType === 'gambar' || mediaType === 'teks_gambar') && material.imageUrl && (
            <div className="p-4 flex items-center justify-center">
              <img
                src={material.imageUrl}
                alt={material.title}
                className="max-w-full max-h-[60vh] rounded-lg shadow-md"
              />
            </div>
          )}

          {/* PowerPoint / Google Slides */}
          {mediaType === 'powerpoint' && material.mediaUrl && (
            <div className="relative">
              <iframe
                src={getGoogleSlidesEmbed(material.mediaUrl)}
                className="w-full"
                style={{ height: '60vh', border: 'none' }}
                allow="fullscreen"
                title={material.title}
              />
            </div>
          )}

          {/* Video (YouTube) */}
          {mediaType === 'video' && material.mediaUrl && (
            <div className="p-4">
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={getYouTubeEmbed(material.mediaUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={material.title}
                />
              </div>
            </div>
          )}

          {/* Fallback: plain text if no mediaType match */}
          {mediaType === 'teks' && !material.content && (
            <div className="p-12 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p>Materi tidak memiliki konten.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t bg-slate-50 flex-shrink-0">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(material.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  )
}
