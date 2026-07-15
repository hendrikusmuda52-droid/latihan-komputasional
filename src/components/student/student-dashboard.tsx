'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  GraduationCap, LogOut, Play, History, Clock, CheckCircle2,
  Trophy, Type, Brain, Target, FileText, Calendar, RefreshCw, ArrowLeft
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
}

interface DashboardData {
  student: StudentInfo
  assignments: Assignment[]
  results: ResultItem[]
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

  const handleStartAssignment = () => {
    // Set student di store & mulai latihan
    setStudent(student)
    setProgress(null)
    setStage('typing')
  }

  const handleResumeProgress = () => {
    setStudent(student)
    if (data?.activeProgressStage) {
      toast.info(`Melanjutkan dari ${data.activeProgressStage}`)
      setStage(data.activeProgressStage as 'typing' | 'quiz')
    } else {
      setStage('typing')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/student/auth', { method: 'DELETE' })
    onLogout()
    toast.success('Berhasil logout')
  }

  const getScoreColor = (s: number) =>
    s >= 80 ? 'text-emerald-600' : s >= 60 ? 'text-amber-600' : 'text-red-600'

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
              <div className="flex flex-col gap-2">
                {data?.hasActiveProgress ? (
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleResumeProgress}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Lanjutkan Latihan
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleStartAssignment}
                    disabled={data?.assignments.length === 0}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Mulai Latihan
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tugas Aktif */}
        <Card>
          <CardHeader className="bg-slate-50 pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-4 h-4 text-emerald-600" />
              Tugas Latihan Aktif
            </CardTitle>
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
                    className="border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{a.title}</h4>
                        {a.description && (
                          <p className="text-sm text-slate-600 mt-1">{a.description}</p>
                        )}
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">Aktif</Badge>
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

        {/* Statistik Cepat */}
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

        {/* Riwayat Latihan */}
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
                <p className="font-medium">Belum ada riwayat latihan</p>
                <p className="text-xs mt-1">Mulai latihan pertama Anda di atas</p>
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
                          {new Date(r.completedAt).toLocaleString('id-ID', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })}
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
