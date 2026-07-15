'use client'

import { useEffect, useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Users,
  FileCheck,
  TrendingUp,
  Download,
  Search,
  ArrowLeft,
  Trophy,
  Brain,
  Type,
  RefreshCw,
  School,
} from 'lucide-react'
import { toast } from 'sonner'

interface ResultRow {
  id: string
  studentId: string
  namaLengkap: string
  nisn: string
  kelas: string
  sekolah: string
  jenisKelamin: string
  charCount: number
  correctChars: number
  typingSpeedWPM: number
  typingAccuracy: number
  typingDuration: number
  typingScore: number
  quizCorrect: number
  quizTotal: number
  quizScore: number
  totalScore: number
  completedAt: string
}

interface Stats {
  totalSiswa: number
  totalLatihan: number
  rataTyping: number
  rataQuiz: number
  rataTotal: number
  perKelas: {
    kelas: string
    jumlahSiswa: number
    jumlahLatihan: number
    rataTotal: number
  }[]
}

export function TeacherDashboard() {
  const [results, setResults] = useState<ResultRow[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterKelas, setFilterKelas] = useState<string>('ALL')
  const [filterSekolah, setFilterSekolah] = useState<string>('ALL')

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/dashboard')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal memuat data')
      setResults(data.data)
      setStats(data.stats)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Daftar sekolah unik untuk filter
  const sekolahOptions = useMemo(() => {
    const set = new Set<string>()
    results.forEach((r) => set.add(r.sekolah))
    return Array.from(set).sort()
  }, [results])

  // Filter hasil
  const filtered = useMemo(() => {
    return results.filter((r) => {
      const matchSearch =
        !search ||
        r.namaLengkap.toLowerCase().includes(search.toLowerCase()) ||
        r.nisn.toLowerCase().includes(search.toLowerCase())
      const matchKelas = filterKelas === 'ALL' || r.kelas === filterKelas
      const matchSekolah =
        filterSekolah === 'ALL' || r.sekolah === filterSekolah
      return matchSearch && matchKelas && matchSekolah
    })
  }, [results, search, filterKelas, filterSekolah])

  // Export ke CSV
  const handleExportCSV = () => {
    if (filtered.length === 0) {
      toast.warning('Tidak ada data untuk diexport')
      return
    }
    const headers = [
      'No',
      'Nama Lengkap',
      'NISN',
      'Kelas',
      'Sekolah',
      'Jenis Kelamin',
      'Karakter Diketik',
      'Karakter Benar',
      'Kecepatan (WPM)',
      'Akurasi (%)',
      'Durasi Mengetik (detik)',
      'Nilai Mengetik',
      'Benar (Quiz)',
      'Total Soal',
      'Nilai Quiz',
      'Nilai Akhir',
      'Waktu Selesai',
    ]
    const rows = filtered.map((r, i) => [
      i + 1,
      `"${r.namaLengkap}"`,
      r.nisn,
      r.kelas,
      `"${r.sekolah}"`,
      r.jenisKelamin,
      r.charCount,
      r.correctChars,
      r.typingSpeedWPM,
      r.typingAccuracy,
      r.typingDuration,
      r.typingScore,
      r.quizCorrect,
      r.quizTotal,
      r.quizScore,
      r.totalScore,
      new Date(r.completedAt).toLocaleString('id-ID'),
    ])
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    // BOM agar Excel membaca UTF-8 dengan benar
    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `hasil-latihan-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success(`Berhasil export ${filtered.length} data ke CSV`)
  }

  const getScoreColor = (score: number) =>
    score >= 80
      ? 'text-emerald-600'
      : score >= 60
      ? 'text-amber-600'
      : 'text-red-600'

  const getScoreBadge = (score: number) =>
    score >= 80
      ? 'bg-emerald-100 text-emerald-700'
      : score >= 60
      ? 'bg-amber-100 text-amber-700'
      : 'bg-red-100 text-red-700'

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}m ${s}s`
  }

  const handleBack = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
              <School className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Dashboard Guru
              </p>
              <p className="text-xs text-slate-500">
                Hasil Latihan Mengetik & Berpikir Komputasional
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`}
              />
              Refresh
            </Button>
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleExportCSV}
            >
              <Download className="w-4 h-4 mr-1" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Halaman Siswa
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl mx-auto px-4 py-6">
        {/* Statistik Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Users className="w-4 h-4" /> Total Siswa
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {stats?.totalSiswa ?? 0}
              </p>
              <p className="text-xs text-slate-400">siswa terdaftar</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <FileCheck className="w-4 h-4" /> Total Latihan
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {stats?.totalLatihan ?? 0}
              </p>
              <p className="text-xs text-slate-400">latihan diselesaikan</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Type className="w-4 h-4" /> Rata-rata Mengetik
              </div>
              <p className="text-3xl font-bold text-emerald-600">
                {stats?.rataTyping ?? 0}
              </p>
              <p className="text-xs text-slate-400">dari 100</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Brain className="w-4 h-4" /> Rata-rata Quiz
              </div>
              <p className="text-3xl font-bold text-teal-600">
                {stats?.rataQuiz ?? 0}
              </p>
              <p className="text-xs text-slate-400">dari 100</p>
            </CardContent>
          </Card>
        </div>

        {/* Statistik per kelas */}
        <Card className="border-slate-200 mb-6">
          <CardHeader className="bg-slate-50 pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="w-4 h-4 text-amber-500" />
              Ringkasan per Kelas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {stats?.perKelas.map((k) => (
                <div
                  key={k.kelas}
                  className="p-3 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg text-center"
                >
                  <p className="text-xs text-slate-500 mb-1">Kelas {k.kelas}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {k.rataTotal}
                  </p>
                  <p className="text-xs text-slate-400 mb-1">rata-rata total</p>
                  <div className="flex justify-center gap-2 text-xs text-slate-600">
                    <span>{k.jumlahSiswa} siswa</span>
                    <span>•</span>
                    <span>{k.jumlahLatihan} latihan</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filter & Search */}
        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-xs">
                  <Search className="w-3 h-3 inline mr-1" />
                  Cari siswa (nama/NISN)
                </Label>
                <Input
                  id="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ketik nama atau NISN..."
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Filter Kelas</Label>
                <Select value={filterKelas} onValueChange={setFilterKelas}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua kelas</SelectItem>
                    <SelectItem value="8A">8A</SelectItem>
                    <SelectItem value="8B">8B</SelectItem>
                    <SelectItem value="8C">8C</SelectItem>
                    <SelectItem value="9A">9A</SelectItem>
                    <SelectItem value="9B">9B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Filter Sekolah</Label>
                <Select
                  value={filterSekolah}
                  onValueChange={setFilterSekolah}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Semua sekolah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua sekolah</SelectItem>
                    {sekolahOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              Menampilkan <strong>{filtered.length}</strong> dari{' '}
              <strong>{results.length}</strong> hasil latihan
            </div>
          </CardContent>
        </Card>

        {/* Tabel Hasil */}
        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 pb-3">
            <CardTitle className="text-base">Detail Hasil Siswa</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? (
              <div className="py-20 text-center text-slate-400">
                <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
                Memuat data...
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <FileCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">Belum ada data latihan</p>
                <p className="text-xs mt-1">
                  Data akan muncul setelah siswa menyelesaikan latihan
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-slate-50 z-10">
                    <TableRow>
                      <TableHead className="w-12">No</TableHead>
                      <TableHead>Identitas Siswa</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Sekolah</TableHead>
                      <TableHead className="text-center">
                        Mengetik
                      </TableHead>
                      <TableHead className="text-center">Quiz</TableHead>
                      <TableHead className="text-center">Nilai Akhir</TableHead>
                      <TableHead>Waktu Selesai</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((r, i) => (
                      <TableRow key={r.id} className="hover:bg-slate-50">
                        <TableCell className="text-slate-400 text-xs">
                          {i + 1}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-slate-900">
                            {r.namaLengkap}
                          </div>
                          <div className="text-xs text-slate-500">
                            NISN: {r.nisn}
                          </div>
                          <div className="text-xs text-slate-400">
                            {r.jenisKelamin}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-50">
                            {r.kelas}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-slate-600 max-w-[200px] truncate">
                          {r.sekolah}
                        </TableCell>
                        <TableCell className="text-center">
                          <div
                            className={`font-bold ${getScoreColor(
                              r.typingScore
                            )}`}
                          >
                            {r.typingScore}
                          </div>
                          <div className="text-xs text-slate-400">
                            {r.typingSpeedWPM} WPM • {r.typingAccuracy}%
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div
                            className={`font-bold ${getScoreColor(
                              r.quizScore
                            )}`}
                          >
                            {r.quizScore}
                          </div>
                          <div className="text-xs text-slate-400">
                            {r.quizCorrect}/{r.quizTotal} benar
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span
                            className={`inline-flex items-center justify-center min-w-[3rem] px-2 py-1 rounded-full text-sm font-bold ${getScoreBadge(
                              r.totalScore
                            )}`}
                          >
                            {r.totalScore}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          {new Date(r.completedAt).toLocaleString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info bantuan */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Tips Membaca Hasil
              </h3>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>
                  <strong>Nilai Mengetik</strong>: 60% akurasi + 40% kecepatan
                  (WPM)
                </li>
                <li>
                  <strong>Nilai Quiz</strong>: jumlah benar / 30 soal × 100
                </li>
                <li>
                  <strong>Nilai Akhir</strong>: 50% mengetik + 50% quiz
                </li>
                <li>Grade A (≥80), B (≥70), C (≥60), D (≥50), E (&lt;50)</li>
                <li>
                  WPM ideal siswa SMP: 30-50. Akurasi ideal: ≥95%
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-teal-200 bg-teal-50/50">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-600" />
                Export & Backup
              </h3>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>
                  Klik tombol <strong>Export CSV</strong> untuk mengunduh semua
                  data hasil
                </li>
                <li>
                  File CSV dapat dibuka di Excel atau Google Sheets untuk
                  analisis lebih lanjut
                </li>
                <li>
                  Data tersimpan otomatis di database setiap kali siswa
                  menyelesaikan latihan
                </li>
                <li>
                  Gunakan filter kelas/sekolah sebelum export untuk mendapatkan
                  subset spesifik
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
        <div className="container max-w-7xl mx-auto px-4 text-center text-xs">
          Dashboard Guru — Latihan Mengetik & Berpikir Komputasional SMP
        </div>
      </footer>
    </div>
  )
}
