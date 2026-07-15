'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  GraduationCap, LogOut, Play, History, Clock, CheckCircle2,
  Trophy, Type, Brain, Target, FileText, Calendar, RefreshCw,
  Lock, AlertCircle, Hourglass,
} from 'lucide-react'
import { toast } from 'sonner'
import { useAppStore } from '@/lib/store'

interface StudentInfo {
  id: string
  namaLengkap: string
  nisn: string
  kelas: string
  sekolah: string
  jenisKelamin: string
}

interface Assignment {
  id: string
  title: string
  description: string
  dueDate: string | null
  createdAt: string
}

interface ResultItem {
  id: string
  typingScore: number
  quizScore: number
  totalScore: number
  typingSpeedWPM: number
  typingAccuracy: number
  quizCorrect: number
  quizTotal: number
  completedAt: string
  releasedAt: string | null
}

interface DashboardData {
  student: StudentInfo
  assignments: Assignment[]
  results: ResultItem[]
  pendingResultsCount: number
  hasActiveProgress: boolean
  activeProgressStage: string | null
}

export function StudentDashboard({
  student,
  onLogout,
}: {
  student: StudentInfo
  onLogout: () => void
}) {
  const { setStudent, setStage, setProgress } = useAppStore()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/student/assignments')
      const d = await res.json()
      if (d.success) {
        setData(d)
      }
    } catch {
      toast.error('Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleStartAssignment = (assignment: Assignment) => {
    // Set student di store & mulai latihan dari tugas yang dipilih
    setStudent(student)
    setProgress(null)

    // Jika ada progress aktif, lanjutkan; jika tidak, mulai dari typing
    if (data?.hasActiveProgress && data.activeProgressStage) {
      toast.info(`Melanjutkan dari ${data.activeProgressStage}`)
      setStage(data.activeProgressStage as 'typing' | 'quiz')
    } else {
      toast.success(`Memulai tugas: ${assignment.title}`)
      setStage('typing')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/student/auth', { method: 'DELETE' })
    onLogout()
    toast.success('Berhasil logout')
  }

  const getScoreBadge = (s: number) =>
    s >= 80 ? 'bg-emerald-100 text-emerald-700'
    : s >= 60 ? 'bg-amber-100 text-amber-700'
    : 'bg-red-100 text-red-700'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <RefreshCw className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Dashboard Siswa</p>
              <p className="text-xs text-slate-500">
                {student.namaLengkap} • {student.kelas} • {student.sekolah}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/?view=teacher" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Dashboard Guru
              </Button>
            </a>
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Banner Welcome */}
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Selamat datang, {student.namaLengkap}! 👋
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  NISN: {student.nisn} • Kelas: {student.kelas}
                </p>
              </div>
              {data?.hasActiveProgress && (
                <Badge className="bg-blue-100 text-blue-700 text-sm py-1.5 px-3">
                  <Hourglass className="w-3 h-3 mr-1" />
                  Ada latihan yang belum selesai
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tugas Aktif - siswa klik untuk mulai */}
        <Card>
          <CardHeader className="bg-slate-50 pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-4 h-4 text-emerald-600" />
              Tugas Latihan Aktif
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              Klik tugas untuk mulai mengerjakan. Hasil akan dikirim ke guru untuk dinilai.
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            {!data?.assignments.length ? (
              <div className="py-8 text-center text-slate-400">
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="font-medium">Belum ada tugas aktif</p>
                <p className="text-xs mt-1">Tunggu guru menerbitkan tugas latihan</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.assignments.map((a) => (
                  <div
                    key={a.id}
                    className="border border-slate-200 rounded-lg p-4 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => handleStartAssignment(a)}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {a.title}
                        </h4>
                        {a.description && (
                          <p className="text-sm text-slate-600 mt-1">{a.description}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-emerald-100 text-emerald-700">Aktif</Badge>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 opacity-90 group-hover:opacity-100">
                          <Play className="w-3 h-3 mr-1" />
                          {data.hasActiveProgress ? 'Lanjutkan' : 'Mulai'}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Diterbitkan: {new Date(a.createdAt).toLocaleDateString('id-ID')}
                      </span>
                      {a.dueDate && (
                        <span className="flex items-center gap-1 text-amber-600">
                          <Clock className="w-3 h-3" />
                          Deadline: {new Date(a.dueDate).toLocaleDateString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notif: ada hasil yang belum dirilis */}
        {data?.pendingResultsCount > 0 && (
          <Card className="border-amber-300 bg-amber-50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    {data.pendingResultsCount} hasil latihan sedang menunggu review guru
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Hasil latihan Anda akan muncul di sini setelah guru merilis nilai.
                    Sabar ya, nilai sedang diproses guru. 📚
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistik Cepat - hanya dari hasil yang sudah dirilis */}
        {data && data.results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <History className="w-4 h-4" /> Total Latihan
                </div>
                <p className="text-3xl font-bold text-slate-900">{data.results.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <Trophy className="w-4 h-4" /> Nilai Tertinggi
                </div>
                <p className="text-3xl font-bold text-emerald-600">
                  {Math.max(...data.results.map((r) => r.totalScore))}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <Target className="w-4 h-4" /> Rata-rata
                </div>
                <p className="text-3xl font-bold text-teal-600">
                  {Math.round(data.results.reduce((a, b) => a + b.totalScore, 0) / data.results.length)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <Type className="w-4 h-4" /> WPM Terbaik
                </div>
                <p className="text-3xl font-bold text-indigo-600">
                  {Math.max(...data.results.map((r) => r.typingSpeedWPM))}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Riwayat Latihan - hanya yang sudah dirilis */}
        <Card>
          <CardHeader className="bg-slate-50 pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <History className="w-4 h-4 text-emerald-600" />
              Riwayat Latihan ({data?.results.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {!data?.results.length ? (
              <div className="py-8 text-center text-slate-400">
                <History className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="font-medium">Belum ada riwayat nilai yang dirilis</p>
                <p className="text-xs mt-1">
                  Kerjakan tugas di atas, lalu tunggu guru merilis hasilnya
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {data.results.map((r, i) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {r.releasedAt
                            ? new Date(r.releasedAt).toLocaleString('id-ID', {
                                day: '2-digit', month: 'short', year: 'numeric',
                                hour: '2-digit', minute: '2-digit',
                              })
                            : new Date(r.completedAt).toLocaleString('id-ID', {
                                day: '2-digit', month: 'short', year: 'numeric',
                                hour: '2-digit', minute: '2-digit',
                              })
                          }
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Type className="w-3 h-3" />
                            Mengetik: {r.typingScore}
                          </span>
                          <span className="flex items-center gap-1">
                            <Brain className="w-3 h-3" />
                            Quiz: {r.quizScore}
                          </span>
                          <span className="text-slate-400">
                            {r.typingSpeedWPM} WPM • {r.quizCorrect}/{r.quizTotal} benar
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getScoreBadge(r.totalScore)}>
                      <Trophy className="w-3 h-3 mr-1" />
                      {r.totalScore}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
        <div className="container max-w-5xl mx-auto px-4 text-center text-xs">
          Dashboard Siswa — Latihan Mengetik & Berpikir Komputasional
        </div>
      </footer>
    </div>
  )
}
