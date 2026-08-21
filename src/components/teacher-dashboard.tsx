'use client'

import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
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
  Users,
  FileCheck,
  TrendingUp,
  CheckCircle2,
  Download,
  Search,
  ArrowLeft,
  Trophy,
  Brain,
  Type,
  RefreshCw,
  Trash2,
  LogOut,
  BarChart3,
  BookOpen,
  FileText,
  UserCog,
  Send,
  Lock,
  ClipboardList,
  Shield,
  Target,
  CalendarCheck,
  BookOpenCheck,
  HeartPulse,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Clock,
  AlertCircle,
  Zap,
  Calendar,
  Activity,
  Plus,
  RotateCcw,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { toast } from 'sonner'
import { TeacherLogin } from './teacher-login'
import { QuestionBank } from './teacher/question-bank'
import { TextManager } from './teacher/text-manager'
import { TeacherProfile } from './teacher/teacher-profile'
import { StudentsManager } from './teacher/students-manager'
import { AssignmentsManager } from './teacher/assignments-manager'
import { MaterialsManager } from './teacher/materials-manager'
import { GradeBook } from './teacher/grade-book'
import { AdminManager } from './teacher/admin-manager'
import { CPTPManager } from './teacher/cptp-manager'
import { AttendanceManager } from './teacher/attendance-manager'
import { JurnalGuruManager } from './teacher/jurnal-manager'
import { CatatanSikapManager } from './teacher/sikap-manager'
import { ResetCenter } from './teacher/reset-center'
import { AnalyticsManager } from './teacher/analytics-manager'
import { hasTypingFeature } from '@/lib/constants'

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
  isReleased: boolean
  releasedAt: string | null
}

interface Stats {
  totalSiswa: number
  totalLatihan: number
  rataTyping: number
  rataQuiz: number
  rataTotal: number
  rataHarian: number // #3 FIX: alias for rataTotal — used as "Capaian Nilai Harian Global" for non-IT subjects
  perKelas: {
    kelas: string
    jumlahSiswa: number
    jumlahLatihan: number
    rataTotal: number
    rataTyping: number
    rataQuiz: number
  }[]
}

interface Teacher {
  id: string
  username: string
  name: string
  role?: string
  subject?: string
}

const COLORS = ['#10b981', '#14b8a6', '#f59e0b', '#ef4444', '#6366f1']

export function TeacherDashboard() {
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [authChecked, setAuthChecked] = useState(false)
  const [results, setResults] = useState<ResultRow[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterKelas, setFilterKelas] = useState<string>('ALL')
  const [filterSekolah, setFilterSekolah] = useState<string>('ALL')
  // MOBILE SIDEBAR: controls slide-over menu on screens < md (768px).
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // DESKTOP SIDEBAR COLLAPSE: allow hiding sidebar on desktop to maximize table space
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  // GLOBAL DASHBOARD data
  const [globalData, setGlobalData] = useState<{
    quickActions?: { pendingGradesCount: number; jurnalToday: { filled: number; expected: number; hari: string; isComplete: boolean } }
    summaryStats?: { avgNH: number; attendancePercentage: number; totalCPs: number; totalTPs: number; sikapCount: number; hadirCount: number; sakitCount: number; izinCount: number; alpaCount: number; totalAttendance: number }
    activityLog?: Array<{ id: string; tanggal: string; namaSiswa: string; nisn: string; kelas: string; kategori: string; deskripsi: string; tindakLanjut: string }>
    meta?: { subject: string; tahunAjaran: string; semester: string; hari: string; expectedJPSlots: number }
  }>({})

  // #3 FIX: compute isITSubject up here so the useMemo hooks below can read it without TDZ errors.
  // Default to true (= Informatika) when teacher is not loaded yet; recomputed when teacher arrives.
  const isITSubject = hasTypingFeature(teacher?.subject || 'Informatika')

  // Cek session guru saat mount
  useEffect(() => {
    fetch('/api/teacher/session')
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated && data.teacher) {
          setTeacher(data.teacher)
        }
      })
      .finally(() => setAuthChecked(true))
  }, [])

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

  // Fetch global dashboard data (quick actions, summary stats, activity log)
  const fetchGlobalData = async () => {
    try {
      const res = await fetch('/api/dashboard/global')
      const data = await res.json()
      if (data.success) setGlobalData(data)
    } catch (err) {
      console.error('Failed to fetch global dashboard:', err)
    }
  }

  useEffect(() => {
    if (teacher) {
      fetchData()
      fetchGlobalData()
    }
  }, [teacher])

  const handleLogout = async () => {
    await fetch('/api/teacher/logout', { method: 'POST' })
    setTeacher(null)
    toast.success('Berhasil logout')
  }

  const handleDelete = async (id: string, nama: string) => {
    try {
      const res = await fetch(`/api/result/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Gagal menghapus')
      }
      toast.success(`Data ${nama} berhasil dihapus`)
      fetchData()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menghapus')
    }
  }

  const handleToggleRelease = async (id: string, isReleased: boolean, nama: string) => {
    try {
      const res = await fetch('/api/result/release', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isReleased }),
      })
      if (!res.ok) throw new Error('Gagal')
      toast.success(
        isReleased
          ? `Nilai ${nama} dirilis ke siswa`
          : `Rilis nilai ${nama} dibatalkan`
      )
      fetchData()
    } catch {
      toast.error('Gagal mengubah status rilis')
    }
  }

  const handleBulkRelease = async () => {
    const unreleased = filtered.filter((r) => !r.isReleased)
    if (unreleased.length === 0) {
      toast.info('Tidak ada nilai yang belum dirilis')
      return
    }
    try {
      const results = await Promise.all(
        unreleased.map((r) =>
          fetch('/api/result/release', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: r.id, isReleased: true }),
          })
        )
      )
      const success = results.filter((r) => r.ok).length
      toast.success(`${success} nilai berhasil dirilis ke siswa`)
      fetchData()
    } catch {
      toast.error('Gagal merilis nilai massal')
    }
  }

  const sekolahOptions = useMemo(() => {
    const set = new Set<string>()
    results.forEach((r) => set.add(r.sekolah))
    return Array.from(set).sort()
  }, [results])

  const filtered = useMemo(() => {
    return results.filter((r) => {
      const matchSearch =
        !search ||
        r.namaLengkap.toLowerCase().includes(search.toLowerCase()) ||
        r.nisn.toLowerCase().includes(search.toLowerCase())
      const matchKelas = filterKelas === 'ALL' || r.kelas === filterKelas
      const matchSekolah = filterSekolah === 'ALL' || r.sekolah === filterSekolah
      return matchSearch && matchKelas && matchSekolah
    })
  }, [results, search, filterKelas, filterSekolah])

  // Data untuk grafik: rata-rata per kelas
  // #3 FIX: For non-IT subjects (where typing is not applicable), the "Mengetik" series
  // is replaced with "Harian" (= rataTotal) so the chart still renders meaningfully.
  const chartKelasData = useMemo(() => {
    if (!stats) return []
    return stats.perKelas.map((k) => ({
      kelas: k.kelas,
      [isITSubject ? 'Mengetik' : 'Harian']: isITSubject ? k.rataTyping : k.rataTotal,
      Quiz: k.rataQuiz,
      Total: k.rataTotal,
    }))
  }, [stats, isITSubject])

  // Data untuk grafik: distribusi nilai
  const chartDistribusi = useMemo(() => {
    const buckets = [
      { name: 'A (≥80)', value: 0, color: '#10b981' },
      { name: 'B (70-79)', value: 0, color: '#14b8a6' },
      { name: 'C (60-69)', value: 0, color: '#f59e0b' },
      { name: 'D (50-59)', value: 0, color: '#f97316' },
      { name: 'E (<50)', value: 0, color: '#ef4444' },
    ]
    filtered.forEach((r) => {
      if (r.totalScore >= 80) buckets[0].value++
      else if (r.totalScore >= 70) buckets[1].value++
      else if (r.totalScore >= 60) buckets[2].value++
      else if (r.totalScore >= 50) buckets[3].value++
      else buckets[4].value++
    })
    return buckets
  }, [filtered])

  // Data untuk grafik: timeline (8 latihan terakhir berdasarkan waktu)
  // #3 FIX: For non-IT subjects, "Mengetik" series is replaced with "Harian" (= totalScore).
  const chartTimeline = useMemo(() => {
    return [...filtered]
      .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())
      .slice(-10)
      .map((r, i) => ({
        label: `#${i + 1} ${r.namaLengkap.split(' ')[0]}`,
        [isITSubject ? 'Mengetik' : 'Harian']: isITSubject ? r.typingScore : r.totalScore,
        Quiz: r.quizScore,
        Total: r.totalScore,
      }))
  }, [filtered, isITSubject])

  const handleExportCSV = () => {
    if (filtered.length === 0) {
      toast.warning('Tidak ada data untuk diexport')
      return
    }
    const headers = isITSubject
      ? [
          'No', 'Nama Lengkap', 'NISN', 'Kelas', 'Sekolah', 'Jenis Kelamin',
          'Karakter Diketik', 'Karakter Benar', 'Kecepatan (WPM)', 'Akurasi (%)',
          'Durasi Mengetik (detik)', 'Nilai Mengetik', 'Benar (Quiz)', 'Total Soal',
          'Nilai Quiz', 'Nilai Akhir', 'Waktu Selesai',
        ]
      : [
          'No', 'Nama Lengkap', 'NISN', 'Kelas', 'Sekolah', 'Jenis Kelamin',
          'Benar (Quiz)', 'Total Soal', 'Nilai Quiz', 'Nilai Akhir', 'Waktu Selesai',
        ]
    const rows = filtered.map((r, i) =>
      isITSubject
        ? [
            i + 1, `"${r.namaLengkap}"`, r.nisn, r.kelas, `"${r.sekolah}"`, r.jenisKelamin,
            r.charCount, r.correctChars, r.typingSpeedWPM, r.typingAccuracy,
            r.typingDuration, r.typingScore, r.quizCorrect, r.quizTotal, r.quizScore,
            r.totalScore, new Date(r.completedAt).toLocaleString('id-ID'),
          ]
        : [
            i + 1, `"${r.namaLengkap}"`, r.nisn, r.kelas, `"${r.sekolah}"`, r.jenisKelamin,
            r.quizCorrect, r.quizTotal, r.quizScore, r.totalScore,
            new Date(r.completedAt).toLocaleString('id-ID'),
          ],
    )
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `hasil-latihan-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success(`Berhasil export ${filtered.length} data ke CSV`)
  }

  const getScoreColor = (score: number) =>
    score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'

  const getScoreBadge = (score: number) =>
    score >= 80
      ? 'bg-emerald-100 text-emerald-700'
      : score >= 60
      ? 'bg-amber-100 text-amber-700'
      : 'bg-red-100 text-red-700'

  // Tampilkan login jika belum auth
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <RefreshCw className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    )
  }
  if (!teacher) {
    return <TeacherLogin onLogin={setTeacher} />
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'results', label: 'Hasil Latihan', icon: FileCheck },
    { id: 'grades', label: 'Daftar Nilai', icon: ClipboardList },
    { id: 'students', label: 'Data Siswa', icon: Users },
    { id: 'assignments', label: 'Tugas', icon: FileText },
    { id: 'materials', label: 'Materi Belajar', icon: BookOpen },
    { id: 'questions', label: 'Bank Soal', icon: BookOpen },
    { id: 'cptp', label: 'CP & TP', icon: Target },
    ...(isITSubject ? [{ id: 'texts', label: 'Teks Bacaan', icon: FileText }] : []),
    { id: 'attendance', label: 'Daftar Hadir', icon: CalendarCheck },
    { id: 'jurnal', label: 'Jurnal Mengajar', icon: BookOpenCheck },
    { id: 'sikap', label: 'Catatan Sikap', icon: HeartPulse },
    { id: 'reset', label: 'Reset & Remedial', icon: RotateCcw },
    { id: 'analytics', label: 'Analitik Siswa', icon: BarChart3 },
    ...(teacher.role === 'admin' ? [{ id: 'admin', label: 'Manajemen Pengguna', icon: Shield }] : []),
    { id: 'profile', label: 'Profil Akun', icon: UserCog },
  ]

  // MOBILE SIDEBAR: switch menu + auto-close sidebar so the page content is
  // immediately visible after a tap (mobile UX). On desktop this is a no-op
  // because the sidebar is always open there.
  const handleMenuClick = (id: string) => {
    setActiveMenu(id)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* MOBILE OVERLAY: tap-to-close backdrop, only visible on < md when sidebar is open. */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — desktop: fixed, can be collapsed via sidebarCollapsed state.
          Mobile: slide-over, hidden by default (-translate-x-full), slides in when sidebarOpen. */}
      <aside
        className={`w-64 bg-slate-900 text-white flex flex-col fixed h-screen z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCollapsed ? 'md:-translate-x-full' : 'md:translate-x-0'}`}
      >
        {/* Logo + close buttons */}
        <div className="p-5 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* ── Dynamic logo: SMP vs SMK based on teacher subject ── */}
            {/* DKV is the SMK subject — if teacher teaches DKV, show SMK logo */}
            <Image
              src={
                teacher?.subject === 'DKV' ||
                teacher?.subject === 'Komputer Akuntansi' ||
                teacher?.subject === 'Multimedia' ||
                teacher?.subject === 'TKJ' ||
                teacher?.subject === 'RPL'
                  ? '/logo-smk.png'
                  : '/logo-smp.png'
              }
              alt={teacher?.subject === 'DKV' ? 'Logo SMK Santo Petrus' : 'Logo SMP Santo Augustinus'}
              width={40}
              height={40}
              className="rounded-lg flex-shrink-0"
            />
            <div>
              <p className="text-sm font-bold">SAKOLA</p>
              <p className="text-xs text-slate-400">
                {teacher?.subject === 'DKV' ||
                teacher?.subject === 'Komputer Akuntansi' ||
                teacher?.subject === 'Multimedia' ||
                teacher?.subject === 'TKJ' ||
                teacher?.subject === 'RPL'
                  ? 'SMK Santo Petrus'
                  : 'SMP Santo Augustinus'}
              </p>
            </div>
          </div>
          {/* MOBILE: X close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
          {/* DESKTOP: Collapse toggle button */}
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Sembunyikan sidebar"
            title="Sembunyikan sidebar"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeMenu === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* User info + actions */}
        <div className="p-3 border-t border-slate-700 space-y-2">
          <div className="px-3 py-2 bg-slate-800 rounded-lg">
            <p className="text-xs text-slate-400">Login sebagai:</p>
            <p className="text-sm font-semibold truncate">{teacher.name}</p>
            <p className="text-xs text-slate-500">@{teacher.username}</p>
            {teacher.role === 'admin' && <p className="text-xs text-red-400 mt-1">🔴 Admin</p>}
            {teacher.subject && <p className="text-xs text-emerald-400 mt-0.5">📚 {teacher.subject}</p>}
          </div>
          <a href="/" className="block">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
              <ArrowLeft className="w-3 h-3" /> Halaman Siswa
            </button>
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-900/30 transition-colors">
            <LogOut className="w-3 h-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content — ml-64 on desktop (when sidebar expanded), ml-0 when collapsed or mobile. */}
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-0' : 'ml-0 md:ml-64'} flex flex-col min-h-screen transition-all duration-300`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
          <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              {/* MOBILE: Hamburger button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 -ml-1 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0"
                aria-label="Buka menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              {/* DESKTOP: Show sidebar button (when collapsed) */}
              {sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(false)}
                  className="hidden md:flex p-2 -ml-1 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0"
                  aria-label="Tampilkan sidebar"
                  title="Tampilkan sidebar"
                >
                  <PanelLeftOpen className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-base md:text-lg font-bold text-slate-900 truncate">
                {menuItems.find(m => m.id === activeMenu)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Force Stop button — always visible on dashboard & results */}
              {(activeMenu === 'dashboard' || activeMenu === 'results') && (
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={async () => {
                    if (!confirm('Hentikan SEMUA ujian/tugas yang sedang berjalan? Siswa akan mendapat countdown 1 menit untuk menyelesaikan jawaban mereka.')) return
                    try {
                      const res = await fetch('/api/force-stop', { method: 'POST' })
                      const data = await res.json()
                      if (data.success) {
                        toast.success(`Force-stop diaktifkan! Siswa memiliki ${data.countdownSeconds} detik untuk menyelesaikan.`)
                      } else {
                        toast.error(data.error || 'Gagal mengaktifkan force-stop')
                      }
                    } catch {
                      toast.error('Gagal mengaktifkan force-stop')
                    }
                  }}
                >
                  <AlertCircle className="w-4 h-4 mr-1" />Hentikan Semua Ujian
                </Button>
              )}
              {activeMenu === 'results' && (
                <>
                  <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
                    <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />Refresh
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleBulkRelease}>
                    <Send className="w-4 h-4 mr-1" />Rilis Semua
                  </Button>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleExportCSV}>
                    <Download className="w-4 h-4 mr-1" />Export CSV
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content area — smaller horizontal padding on mobile. */}
        <main className="flex-1 px-4 md:px-6 py-4 md:py-6">
          {activeMenu === 'dashboard' && (
            <GlobalDashboard
              data={globalData}
              teacher={teacher}
              onNavigate={handleMenuClick}
              onRefresh={fetchGlobalData}
            />
          )}
          {activeMenu === 'results' && (
        <>
        {/* Statistik Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Users className="w-4 h-4" /> Total Siswa
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats?.totalSiswa ?? 0}</p>
              <p className="text-xs text-slate-400">siswa terdaftar</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <FileCheck className="w-4 h-4" /> Total Latihan
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats?.totalLatihan ?? 0}</p>
              <p className="text-xs text-slate-400">latihan diselesaikan</p>
            </CardContent>
          </Card>
          {/* #3 FIX: For IT subjects show "Rata-rata Mengetik"; for non-IT subjects (Matematika, IPS, etc.)
              show "Capaian Nilai Harian Global" instead so the card never references a typing metric
              that doesn't exist for that teacher. */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                {isITSubject ? <Type className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                {isITSubject ? 'Rata-rata Mengetik' : 'Capaian Nilai Harian Global'}
              </div>
              <p className="text-3xl font-bold text-emerald-600">
                {isITSubject ? (stats?.rataTyping ?? 0) : (stats?.rataHarian ?? 0)}
              </p>
              <p className="text-xs text-slate-400">dari 100</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Brain className="w-4 h-4" /> Rata-rata Quiz
              </div>
              <p className="text-3xl font-bold text-teal-600">{stats?.rataQuiz ?? 0}</p>
              <p className="text-xs text-slate-400">dari 100</p>
            </CardContent>
          </Card>
        </div>

        {/* Grafik perkembangan */}
        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                Rata-rata Nilai per Kelas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {chartKelasData.length === 0 ? (
                <p className="text-center text-slate-400 py-10 text-sm">Belum ada data</p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={chartKelasData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="kelas" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    {/* #3 FIX: dataKey is dynamic — "Mengetik" for IT subjects, "Harian" for non-IT */}
                    <Bar dataKey={isITSubject ? 'Mengetik' : 'Harian'} fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Quiz" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Total" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="w-4 h-4 text-amber-500" />
                Distribusi Nilai Akhir
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {chartDistribusi.every((d) => d.value === 0) ? (
                <p className="text-center text-slate-400 py-10 text-sm">Belum ada data</p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={chartDistribusi}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      labelLine={false}
                    >
                      {chartDistribusi.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200 mb-6">
          <CardHeader className="bg-slate-50 pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Tren Nilai 10 Latihan Terbaru (filtered)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {chartTimeline.length === 0 ? (
              <p className="text-center text-slate-400 py-10 text-sm">Belum ada data</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {/* #3 FIX: dataKey is dynamic — "Mengetik" for IT subjects, "Harian" for non-IT */}
                  <Line type="monotone" dataKey={isITSubject ? 'Mengetik' : 'Harian'} stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="Quiz" stroke="#14b8a6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Total" stroke="#6366f1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
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
                    <SelectItem value="7A">7A</SelectItem>
                    <SelectItem value="7B">7B</SelectItem>
                    <SelectItem value="7C">7C</SelectItem>
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
                <Select value={filterSekolah} onValueChange={setFilterSekolah}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua sekolah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Semua sekolah</SelectItem>
                    {sekolahOptions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
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
                <p className="text-xs mt-1">Data akan muncul setelah siswa menyelesaikan latihan</p>
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
                      <TableHead className="text-center">{isITSubject ? 'Mengetik' : 'Harian'}</TableHead>
                      <TableHead className="text-center">Quiz</TableHead>
                      <TableHead className="text-center">Nilai Akhir</TableHead>
                      <TableHead className="text-center">Status Rilis</TableHead>
                      <TableHead>Waktu Selesai</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((r, i) => (
                      <TableRow key={r.id} className="hover:bg-slate-50">
                        <TableCell className="text-slate-400 text-xs">{i + 1}</TableCell>
                        <TableCell>
                          <div className="font-medium text-slate-900">{r.namaLengkap}</div>
                          <div className="text-xs text-slate-500">NISN: {r.nisn}</div>
                          <div className="text-xs text-slate-400">{r.jenisKelamin}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-50">{r.kelas}</Badge>
                        </TableCell>
                        <TableCell className="text-xs text-slate-600 max-w-[200px] truncate">{r.sekolah}</TableCell>
                        <TableCell className="text-center">
                          {/* #3 FIX: For IT subjects show typing score; for non-IT show totalScore as "Harian". */}
                          {isITSubject ? (
                            <>
                              <div className={`font-bold ${getScoreColor(r.typingScore)}`}>{r.typingScore}</div>
                              <div className="text-xs text-slate-400">
                                {r.typingSpeedWPM} WPM • {r.typingAccuracy}%
                              </div>
                            </>
                          ) : (
                            <div className={`font-bold ${getScoreColor(r.totalScore)}`}>{r.totalScore}</div>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className={`font-bold ${getScoreColor(r.quizScore)}`}>{r.quizScore}</div>
                          <div className="text-xs text-slate-400">
                            {r.quizCorrect}/{r.quizTotal} benar
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`inline-flex items-center justify-center min-w-[3rem] px-2 py-1 rounded-full text-sm font-bold ${getScoreBadge(r.totalScore)}`}>
                            {r.totalScore}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          {r.isReleased ? (
                            <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Dirilis
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 text-xs">
                              <Lock className="w-3 h-3 mr-1" />
                              Belum Dirilis
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          {new Date(r.completedAt).toLocaleString('id-ID', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-8 px-2 ${r.isReleased ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                              onClick={() => handleToggleRelease(r.id, !r.isReleased, r.namaLengkap)}
                              title={r.isReleased ? 'Batalkan Rilis' : 'Rilis Nilai ke Siswa'}
                            >
                              {r.isReleased ? (
                                <>
                                  <Lock className="w-3 h-3 mr-1" />
                                  <span className="text-xs">Batal</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-3 h-3 mr-1" />
                                  <span className="text-xs">Rilis</span>
                                </>
                              )}
                            </Button>
                            <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                                title={`Hapus data ${r.namaLengkap}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus data latihan?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Data latihan <strong>{r.namaLengkap}</strong> ({r.kelas},{' '}
                                  {new Date(r.completedAt).toLocaleString('id-ID')}) akan
                                  dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(r.id, r.namaLengkap)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Ya, Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          </div>
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
                {/* #3 FIX: For non-IT subjects, replace typing-related tips with generic ones. */}
                {isITSubject ? (
                  <>
                    <li><strong>Nilai Mengetik</strong>: akurasi + kecepatan + rasio penyelesaian</li>
                    <li><strong>Nilai Quiz</strong>: jumlah benar / 30 soal × 100</li>
                    <li><strong>Nilai Akhir</strong>: 50% mengetik + 50% quiz</li>
                    <li>WPM ideal siswa SMP: 30-50. Akurasi ideal: ≥95%</li>
                  </>
                ) : (
                  <>
                    <li><strong>Capaian Nilai Harian Global</strong>: rata-rata semua nilai latihan</li>
                    <li><strong>Nilai Quiz</strong>: jumlah benar / total soal × 100</li>
                    <li><strong>Nilai Akhir</strong>: gabungan nilai harian daring + luring</li>
                  </>
                )}
                <li>Grade A (≥80), B (70-79), C (60-69), D (50-59), E (&lt;50)</li>
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
                <li>Klik <strong>Export CSV</strong> untuk mengunduh semua data hasil</li>
                <li>File CSV bisa dibuka di Excel/Google Sheets</li>
                <li>Gunakan filter kelas/sekolah sebelum export untuk subset spesifik</li>
                <li>Tombol <Trash2 className="w-3 h-3 inline text-red-600" /> untuk menghapus data tertentu</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        </>
      )}

      {activeMenu === 'grades' && <GradeBook />}
      {activeMenu === 'students' && <StudentsManager />}
      {activeMenu === 'assignments' && <AssignmentsManager />}
      {activeMenu === 'materials' && <MaterialsManager />}
      {activeMenu === 'questions' && <QuestionBank />}
      {activeMenu === 'cptp' && <CPTPManager />}
      {activeMenu === 'texts' && <TextManager />}
      {activeMenu === 'attendance' && <AttendanceManager />}
      {activeMenu === 'jurnal' && <JurnalGuruManager />}
      {activeMenu === 'sikap' && <CatatanSikapManager />}
      {activeMenu === 'reset' && <ResetCenter />}
      {activeMenu === 'analytics' && <AnalyticsManager />}
      {activeMenu === 'admin' && teacher.role === 'admin' && <AdminManager />}
      {activeMenu === 'profile' && (
        <TeacherProfile teacher={teacher} onUpdated={setTeacher} />
      )}
        </main>

        <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
          <div className="px-6 text-center text-xs">
            SAKOLA — SMP Santo Augustinus
          </div>
        </footer>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
// GLOBAL DASHBOARD COMPONENT
// Integrated post-login landing page with:
// 1. Quick Actions (shortcut jurnal + pending grades notification)
// 2. Summary Stats (avg NH, attendance %, TP progress, sikap count)
// 3. Activity Log Timeline (recent catatan sikap records)
// ══════════════════════════════════════════════════════════════════

function GlobalDashboard({
  data,
  teacher,
  onNavigate,
  onRefresh,
}: {
  data: {
    quickActions?: { pendingGradesCount: number; jurnalToday: { filled: number; expected: number; hari: string; isComplete: boolean } }
    summaryStats?: { avgNH: number; attendancePercentage: number; totalCPs: number; totalTPs: number; sikapCount: number; hadirCount: number; sakitCount: number; izinCount: number; alpaCount: number; totalAttendance: number }
    activityLog?: Array<{ id: string; tanggal: string; namaSiswa: string; nisn: string; kelas: string; kategori: string; deskripsi: string; tindakLanjut: string }>
    meta?: { subject: string; tahunAjaran: string; semester: string; hari: string; expectedJPSlots: number }
  }
  teacher: { name: string; username: string; subject?: string; role?: string }
  onNavigate: (id: string) => void
  onRefresh: () => void
}) {
  const qa = data.quickActions
  const ss = data.summaryStats
  const log = data.activityLog || []
  const meta = data.meta

  const kategoriBadge = (k: string) => {
    switch (k) {
      case 'Spiritual': return 'bg-purple-100 text-purple-700'
      case 'Sosial': return 'bg-blue-100 text-blue-700'
      case 'ProfilPelajarPancasila': return 'bg-emerald-100 text-emerald-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  const kategoriLabel = (k: string) => {
    if (k === 'ProfilPelajarPancasila') return 'Profil Pelajar Pancasila'
    return k
  }

  return (
    <div className="space-y-6">
      {/* ── Welcome Header ── */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Selamat datang, {teacher.name}! 👋</h2>
            <p className="text-emerald-100 text-sm">
              Mapel: {teacher.subject || 'Informatika'} • {meta?.tahunAjaran || '2026/2027'} • Semester {meta?.semester || 'Ganjil'}
            </p>
            {meta?.hari && meta.hari !== '-' && (
              <p className="text-emerald-100 text-xs mt-1">Hari ini: {meta.hari} • {meta.expectedJPSlots} JP</p>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={onRefresh} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </Button>
        </div>
      </div>

      {/* ── 1. QUICK ACTIONS ── */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" /> Aksi Cepat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Jurnal Hari Ini */}
          <Card className={`border-2 ${qa?.jurnalToday?.isComplete ? 'border-emerald-300 bg-emerald-50/50' : 'border-amber-300 bg-amber-50/50'}`}>
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${qa?.jurnalToday?.isComplete ? 'bg-emerald-600' : 'bg-amber-500'}`}>
                  {qa?.jurnalToday?.isComplete ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Clock className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Jurnal Mengajar Hari Ini</p>
                  <p className="text-xs text-slate-500">
                    {qa?.jurnalToday?.filled || 0} / {qa?.jurnalToday?.expected || 0} JP terisi
                    {qa?.jurnalToday?.expected === 0 ? ' (Libur)' : ''}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => onNavigate('jurnal')}>
                {qa?.jurnalToday?.isComplete ? 'Lihat' : 'Isi Jurnal'}
              </Button>
            </CardContent>
          </Card>

          {/* Nilai Tertahan */}
          <Card className={`border-2 ${(qa?.pendingGradesCount || 0) > 0 ? 'border-red-300 bg-red-50/50' : 'border-emerald-300 bg-emerald-50/50'}`}>
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${(qa?.pendingGradesCount || 0) > 0 ? 'bg-red-500' : 'bg-emerald-600'}`}>
                  {(qa?.pendingGradesCount || 0) > 0 ? <AlertCircle className="w-5 h-5 text-white" /> : <CheckCircle2 className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Nilai Belum Dirilis</p>
                  <p className="text-xs text-slate-500">
                    {(qa?.pendingGradesCount || 0) === 0 ? 'Semua nilai sudah dirilis ✓' : `${qa?.pendingGradesCount} nilai menunggu rilis`}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => onNavigate('results')}>
                {(qa?.pendingGradesCount || 0) > 0 ? 'Rilis Sekarang' : 'Lihat Hasil'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── 2. SUMMARY STATS ── */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-500" /> Ringkasan Statistik
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Avg NH */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-blue-600 text-xs mb-1">
                <TrendingUp className="w-4 h-4" /> Rata-rata NH
              </div>
              <p className="text-3xl font-bold text-slate-900">{ss?.avgNH ?? 0}</p>
              <p className="text-xs text-slate-400">dari 100</p>
            </CardContent>
          </Card>

          {/* Attendance % */}
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-emerald-600 text-xs mb-1">
                <CalendarCheck className="w-4 h-4" /> Kehadiran
              </div>
              <p className="text-3xl font-bold text-slate-900">{ss?.attendancePercentage ?? 100}%</p>
              <p className="text-xs text-slate-400">
                H:{ss?.hadirCount ?? 0} S:{ss?.sakitCount ?? 0} I:{ss?.izinCount ?? 0} A:{ss?.alpaCount ?? 0}
              </p>
            </CardContent>
          </Card>

          {/* TP Progress */}
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-indigo-600 text-xs mb-1">
                <Target className="w-4 h-4" /> Progres TP
              </div>
              <p className="text-3xl font-bold text-slate-900">{ss?.totalTPs ?? 0}</p>
              <p className="text-xs text-slate-400">dari {ss?.totalCPs ?? 0} CP aktif</p>
            </CardContent>
          </Card>

          {/* Sikap Count */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-purple-600 text-xs mb-1">
                <HeartPulse className="w-4 h-4" /> Catatan Sikap
              </div>
              <p className="text-3xl font-bold text-slate-900">{ss?.sikapCount ?? 0}</p>
              <p className="text-xs text-slate-400">catatan aktif</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── 3. ACTIVITY LOG TIMELINE ── */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-slate-500" /> Linimasa Aktivitas (Catatan Sikap Terbaru)
        </h3>
        <Card>
          <CardContent className="pt-0">
            {log.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Activity className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="font-medium">Belum ada catatan sikap</p>
                <p className="text-xs mt-1">Catatan observasi siswa akan muncul di sini</p>
                <Button size="sm" variant="outline" className="mt-3" onClick={() => onNavigate('sikap')}>
                  <Plus className="w-3 h-3 mr-1" /> Tambah Catatan
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-slate-50 z-10">
                    <TableRow>
                      <TableHead className="w-28">Tanggal</TableHead>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead className="w-20">Kelas</TableHead>
                      <TableHead className="w-36">Kategori</TableHead>
                      <TableHead>Deskripsi Kejadian</TableHead>
                      <TableHead className="w-40">Tindak Lanjut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {log.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-xs text-slate-500 whitespace-nowrap">{item.tanggal}</TableCell>
                        <TableCell>
                          <div className="font-medium text-sm text-slate-900">{item.namaSiswa}</div>
                          <div className="text-xs text-slate-400">NISN: {item.nisn}</div>
                        </TableCell>
                        <TableCell><Badge variant="outline">{item.kelas}</Badge></TableCell>
                        <TableCell><Badge className={kategoriBadge(item.kategori)}>{kategoriLabel(item.kategori)}</Badge></TableCell>
                        <TableCell className="text-sm text-slate-600 max-w-xs">
                          <p className="line-clamp-2">{item.deskripsi}</p>
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">{item.tindakLanjut || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
