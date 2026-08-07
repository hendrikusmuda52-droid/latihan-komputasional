'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  GraduationCap, LogOut, Play, History, Clock, CheckCircle2,
  Trophy, Type, Brain, Target, FileText, Calendar, RefreshCw,
  Lock, Hourglass, BookOpen, TrendingUp, Award, Zap, ChevronRight,
  ChevronLeft, Layers,
} from 'lucide-react'
import { toast } from 'sonner'
import { useAppStore } from '@/lib/store'
import { SMP_SUBJECTS, SMK_SUBJECTS, getSubjectsByJenjang, getJenjang } from '@/lib/constants'

interface StudentInfo { id: string; namaLengkap: string; nisn: string; kelas: string; sekolah: string; jenisKelamin: string }
interface Assignment { id: string; title: string; description: string; dueDate: string | null; createdAt: string; exerciseType: string; questionCount: number; taskType: string; canRetake: boolean; hasCompleted: boolean }
interface ResultItem { id: string; typingScore: number; quizScore: number; totalScore: number; typingSpeedWPM: number; typingAccuracy: number; quizCorrect: number; quizTotal: number; completedAt: string; releasedAt: string | null }
interface Material { id: string; title: string; content: string; category: string; createdAt: string }
interface DashboardData { student: StudentInfo; assignments: Assignment[]; results: ResultItem[]; pendingResultsCount: number; hasActiveProgress: boolean; activeProgressStage: string | null; hasCompletedAnyExercise: boolean }

export function StudentDashboard({ student, onLogout }: { student: StudentInfo; onLogout: () => void }) {
  const { setStudent, setStage, setProgress } = useAppStore()
  const router = useRouter()
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [data, setData] = useState<DashboardData | null>(null)
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'tugas' | 'materi' | 'nilai'>('tugas')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)

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
    if (selectedSubject) fetchData(selectedSubject)
  }, [selectedSubject])

  const handleStartAssignment = (a: Assignment) => {
    if (a.hasCompleted && a.exerciseType === 'wajib' && !a.canRetake) { toast.error('Tugas wajib sudah dikerjakan. Hubungi guru.'); return }
    setStudent(student); setProgress(null)
    if (data?.hasActiveProgress && data.activeProgressStage) { toast.info(`Melanjutkan dari ${data.activeProgressStage}`); setStage(data.activeProgressStage as 'typing' | 'quiz') }
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
            <p className="text-emerald-100 text-sm">NISN: {student.nisn} • {student.sekolah} • Jenjang: {jenjang}</p>
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
          ].map(tab => { const Icon = tab.icon; return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Icon className="w-4 h-4" />{tab.label}
            </button>
          )})}
        </div>

        {/* Tab: Tugas */}
        {activeTab === 'tugas' && (
          <div className="space-y-3">
            {data?.pendingResultsCount > 0 && (
              <Card className="border-amber-300 bg-amber-50"><CardContent className="pt-4 pb-4 flex items-start gap-3"><Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" /><div><p className="text-sm font-semibold text-amber-900">{data.pendingResultsCount} hasil menunggu review guru</p><p className="text-xs text-amber-700 mt-1">Nilai muncul setelah guru merilis.</p></div></CardContent></Card>
            )}
            {!data?.assignments.length ? (
              <Card className="border-0 shadow-md"><CardContent className="py-16 text-center"><div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-slate-400" /></div><p className="font-semibold text-slate-700">Belum ada tugas {selectedSubject}</p><p className="text-sm text-slate-400 mt-1">Tunggu guru {selectedSubject} menerbitkan tugas</p></CardContent></Card>
            ) : (
              data.assignments.map((a) => (
                <Card key={a.id} className={`border-0 shadow-md hover:shadow-xl transition-all cursor-pointer group overflow-hidden ${a.hasCompleted && a.exerciseType === 'wajib' && !a.canRetake ? 'opacity-60' : ''}`} onClick={() => handleStartAssignment(a)}>
                  <div className={`h-1 ${a.exerciseType === 'wajib' ? 'bg-red-500' : 'bg-blue-500'}`} />
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">{a.taskType === 'game' ? 'Game' : a.taskType === 'drawing' ? 'Menggambar' : a.taskType === 'quiz_only' ? 'Soal HOTS' : 'Mengetik + Soal'}</Badge>
                          <Badge className={`text-xs ${a.exerciseType === 'wajib' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{a.exerciseType === 'wajib' ? 'Wajib' : 'Persiapan'}</Badge>
                          {a.hasCompleted && a.exerciseType === 'wajib' && !a.canRetake && <Badge className="bg-slate-200 text-slate-600">Selesai</Badge>}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{a.title}</h3>
                        {a.description && <p className="text-sm text-slate-500 mt-1">{a.description}</p>}
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-3"><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(a.createdAt).toLocaleDateString('id-ID')}</span></div>
                      </div>
                      <div>
                        {a.hasCompleted && a.exerciseType === 'wajib' && !a.canRetake ? (
                          <Button size="sm" variant="outline" disabled className="opacity-50"><Lock className="w-3 h-3 mr-1" />Terkunci</Button>
                        ) : (
                          <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md"><Play className="w-3 h-3 mr-1" />{data?.hasActiveProgress ? 'Lanjutkan' : 'Mulai'}</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
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
                    <Badge className={`text-sm font-bold ${getScoreBadge(r.totalScore)}`}><Trophy className="w-3 h-3 mr-1" />{r.totalScore}</Badge>
                  </div>
                </CardContent></Card>
              ))
            )}
          </div>
        )}
      </main>

      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelectedMaterial(null)}>
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center"><BookOpen className="w-5 h-5 text-white" /></div><div><h2 className="text-lg font-bold text-white">{selectedMaterial.title}</h2><Badge variant="outline" className="text-xs bg-white/20 text-white border-white/30">{selectedMaterial.category}</Badge></div></div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedMaterial(null)} className="text-white hover:bg-white/20">✕</Button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]"><div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedMaterial.content}</div></div>
          </Card>
        </div>
      )}

      <footer className="bg-slate-900 text-slate-400 py-4 mt-8"><div className="container max-w-5xl mx-auto px-4 text-center text-xs">SAKOLA — SMP Santo Augustinus</div></footer>
    </div>
  )
}
