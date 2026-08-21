'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  BarChart3,
  TrendingUp,
  Trophy,
  Target,
  Calendar,
  Brain,
  Type,
  HeartPulse,
  Shield,
  RefreshCw,
  Users,
  AlertCircle,
} from 'lucide-react'
import { ALL_GRADES } from '@/lib/constants'
import { useResilientFetch } from '@/lib/use-resilient-fetch'

interface Student {
  id: string
  namaLengkap: string
  nisn: string
  kelas: string
}

interface TimelinePoint {
  label: string
  typing: number
  quiz: number
  total: number
  date?: string
}

interface SikapRecord {
  tanggal: string
  kategori: string
  deskripsi: string
  tindakLanjut: string | null
}

interface CPProgress {
  id: string
  kodeCP: string
  deskripsi: string
  tpCount: number
}

interface Analytics {
  student?: { namaLengkap: string; nisn: string; kelas: string; sekolah: string }
  subject?: string
  metrics?: {
    avgTyping?: number
    bestTyping?: number
    avgQuiz?: number
    bestQuiz?: number
    avgWPM?: number
    avgAccuracy?: number
    avgHarian?: number
    stsValue?: number
    sasValue?: number
    attendancePercentage?: number
    hadirCount?: number
    totalAttendance?: number
    sikapStats?: {
      spiritual: number
      sosial: number
      profil: number
      total: number
    }
    totalExercises?: number
    totalManualGrades?: number
  }
  timeline?: TimelinePoint[]
  sikapRecords?: SikapRecord[]
  cpProgress?: CPProgress[]
}

const NONE = '__none__'
const SAFE_GRADES = (ALL_GRADES || []) as readonly string[]

const kategoriLabel = (k: string): string => {
  switch (k) {
    case 'Spiritual':
      return 'Spiritual'
    case 'Sosial':
      return 'Sosial'
    case 'ProfilPelajarPancasila':
      return 'Profil Pelajar Pancasila'
    default:
      return k
  }
}

const kategoriBadge = (k: string): string => {
  switch (k) {
    case 'Spiritual':
      return 'bg-purple-100 text-purple-700'
    case 'Sosial':
      return 'bg-blue-100 text-blue-700'
    case 'ProfilPelajarPancasila':
      return 'bg-emerald-100 text-emerald-700'
    default:
      return 'bg-slate-100 text-slate-700'
  }
}

export function AnalyticsManager() {
  const [kelas, setKelas] = useState<string>(NONE)
  const [selectedStudentId, setSelectedStudentId] = useState<string>(NONE)

  // ── RESILIENT FETCH: students list (enabled when kelas selected) ──
  const { data: studentsData, loading: loadingStudents } = useResilientFetch<{
    success: boolean
    students: Student[]
  }>(
    kelas !== NONE ? `/api/teacher/students?kelas=${encodeURIComponent(kelas)}` : '',
    { deps: [kelas], enabled: kelas !== NONE }
  )
  const students = studentsData?.students ?? []

  // ── RESILIENT FETCH: analytics for a specific student (enabled when studentId selected) ──
  const { data: analyticsData, loading, error, refetch, retryCount } = useResilientFetch<{
    success: boolean
    student?: { namaLengkap: string; nisn: string; kelas: string; sekolah: string }
    subject?: string
    metrics?: Analytics['metrics']
    timeline?: TimelinePoint[]
    sikapRecords?: SikapRecord[]
    cpProgress?: CPProgress[]
    error?: string
  }>(
    selectedStudentId !== NONE ? `/api/analytics/student?studentId=${encodeURIComponent(selectedStudentId)}` : '',
    { deps: [selectedStudentId], enabled: selectedStudentId !== NONE }
  )

  const analytics = analyticsData ?? null
  const handleRefresh = useCallback(() => { refetch() }, [refetch])

  // Reset student selection when kelas changes
  useEffect(() => {
    setSelectedStudentId(NONE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kelas])

  const m = analytics?.metrics || {}
  const timeline = analytics?.timeline || []
  const sikapRecords = analytics?.sikapRecords || []
  const cpProgress = analytics?.cpProgress || []
  const sikapStats = m.sikapStats || { spiritual: 0, sosial: 0, profil: 0, total: 0 }

  return (
    <div className="space-y-4">
      {/* ── Security notice banner ── */}
      <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3">
        <Shield className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 font-medium">
          Data analitik ini hanya untuk mapel yang Anda ampu. Guru mapel lain tidak
          dapat melihat data ini.
        </p>
      </div>

      {/* ── Filters ── */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            Analitik & Grafik Perkembangan Siswa
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Users className="w-3 h-3" /> Kelas
              </label>
              <Select
                value={kelas}
                onValueChange={(v) => {
                  setKelas(v)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>— Pilih Kelas —</SelectItem>
                  {SAFE_GRADES.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Target className="w-3 h-3" /> Pilih Siswa
              </label>
              <Select
                value={selectedStudentId}
                onValueChange={(v) => setSelectedStudentId(v)}
                disabled={kelas === NONE || loadingStudents}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih siswa..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>— Pilih Siswa —</SelectItem>
                  {students.length === 0 ? (
                    <SelectItem value={NONE} disabled>
                      Tidak ada siswa
                    </SelectItem>
                  ) : (
                    students.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.namaLengkap} ({s.nisn})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 flex items-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={selectedStudentId === NONE || loading}
                className="w-full"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`}
                />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Loading ── */}
      {loading && (
        <div className="py-20 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
          <p className="text-sm">Memuat analitik...</p>
          {retryCount > 0 && (
            <p className="text-xs mt-1 text-amber-600">Mencoba ulang ({retryCount}/2)...</p>
          )}
        </div>
      )}

      {/* ── Error state ── */}
      {!loading && error && (
        <Card className="border-red-200">
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
            <p className="font-medium text-red-600 mb-1">Gagal memuat analitik</p>
            <p className="text-xs text-slate-500 mb-3">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Coba Muat Ulang
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ── Empty state ── */}
      {!loading && !error && !analytics && (
        <Card>
          <CardContent className="py-12 text-center text-slate-400">
            <BarChart3 className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="font-medium">Belum ada data analitik</p>
            <p className="text-xs mt-1">
              Pilih kelas dan siswa untuk melihat perkembangan
            </p>
          </CardContent>
        </Card>
      )}

      {/* ── Analytics content ── */}
      {!loading && !error && analytics && (
        <>
          {/* Student header */}
          {analytics.student && (
            <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
              <CardContent className="pt-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {analytics.student.namaLengkap}
                    </p>
                    <p className="text-xs text-slate-600">
                      {analytics.student.nisn} • {analytics.student.kelas} •{' '}
                      {analytics.student.sekolah}
                    </p>
                  </div>
                  {analytics.subject && (
                    <Badge variant="secondary">{analytics.subject}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stat cards (4 grid with gradients) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow">
              <p className="text-xs font-medium opacity-90 flex items-center gap-1">
                <Type className="w-3 h-3" /> Rata-rata Mengetik
              </p>
              <p className="text-3xl font-bold mt-2">{m.avgTyping ?? 0}</p>
            </div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow">
              <p className="text-xs font-medium opacity-90 flex items-center gap-1">
                <Brain className="w-3 h-3" /> Rata-rata Quiz
              </p>
              <p className="text-3xl font-bold mt-2">{m.avgQuiz ?? 0}</p>
            </div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow">
              <p className="text-xs font-medium opacity-90 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Rata-rata Nilai Harian
              </p>
              <p className="text-3xl font-bold mt-2">{m.avgHarian ?? 0}</p>
            </div>
            <div className="rounded-xl p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow">
              <p className="text-xs font-medium opacity-90 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> % Kehadiran
              </p>
              <p className="text-3xl font-bold mt-2">{m.attendancePercentage ?? 0}%</p>
            </div>
          </div>

          {/* Timeline chart */}
          <Card>
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> Grafik Perkembangan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              {timeline.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  Belum ada data latihan
                </div>
              ) : (
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timeline}
                      margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11 }}
                        stroke="#64748b"
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 11 }}
                        stroke="#64748b"
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: '1px solid #e2e8f0',
                          fontSize: 12,
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Line
                        type="monotone"
                        dataKey="typing"
                        name="Mengetik"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="quiz"
                        name="Quiz"
                        stroke="#14b8a6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="total"
                        name="Total"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional metrics: Best + Asesmen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card>
              <CardHeader className="bg-slate-50 pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-600" /> Performa Terbaik
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-500">Best Mengetik</p>
                  <p className="text-xl font-bold text-emerald-700">
                    {m.bestTyping ?? 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Best Quiz</p>
                  <p className="text-xl font-bold text-teal-700">
                    {m.bestQuiz ?? 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Avg WPM</p>
                  <p className="text-xl font-bold text-slate-900">
                    {m.avgWPM ?? 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Avg Akurasi</p>
                  <p className="text-xl font-bold text-slate-900">
                    {m.avgAccuracy ?? 0}%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-slate-50 pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-sky-600" /> Nilai Asesmen
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-500">STS (MID)</p>
                  <p className="text-xl font-bold text-sky-700">
                    {m.stsValue ?? 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">SAS (UAS)</p>
                  <p className="text-xl font-bold text-sky-700">
                    {m.sasValue ?? 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Latihan</p>
                  <p className="text-xl font-bold text-slate-900">
                    {m.totalExercises ?? 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Hadir/Tot Kehadiran</p>
                  <p className="text-xl font-bold text-slate-900">
                    {m.hadirCount ?? 0}/{m.totalAttendance ?? 0}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sikap stats */}
          <Card>
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-600" /> Statistik Sikap
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
                  <p className="text-xs text-purple-700">Spiritual</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {sikapStats.spiritual}
                  </p>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <p className="text-xs text-blue-700">Sosial</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {sikapStats.sosial}
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-xs text-emerald-700">Profil Pelajar</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {sikapStats.profil}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-700">Total</p>
                  <p className="text-2xl font-bold text-slate-700">
                    {sikapStats.total}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CP Progress */}
          <Card>
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" /> Progress CP
                (Capaian Pembelajaran)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              {cpProgress.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  Belum ada CP terdefinisi
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {cpProgress.map((cp) => (
                    <div
                      key={cp.id}
                      className="flex items-start justify-between gap-2 rounded-lg border border-slate-200 p-2.5"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900">
                          {cp.kodeCP}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {cp.deskripsi}
                        </p>
                      </div>
                      <Badge variant="secondary">{cp.tpCount} TP</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent sikap records */}
          <Card>
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-600" /> Catatan Sikap
                Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              {sikapRecords.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  Belum ada catatan sikap
                </div>
              ) : (
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-slate-50 z-10">
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Tindak Lanjut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sikapRecords.map((s, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="text-xs text-slate-600 whitespace-nowrap">
                            {s.tanggal
                              ? new Date(s.tanggal).toLocaleDateString('id-ID', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : '-'}
                          </TableCell>
                          <TableCell>
                            <Badge className={kategoriBadge(s.kategori)}>
                              {kategoriLabel(s.kategori)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-slate-700 max-w-xs">
                            {s.deskripsi || '-'}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600 max-w-xs">
                            {s.tindakLanjut || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
