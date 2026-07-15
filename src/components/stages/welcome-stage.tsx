'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Keyboard,
  Brain,
  Clock,
  AlertTriangle,
  BookOpen,
  School,
  RotateCcw,
  Play,
  CheckCircle2,
  History,
  RefreshCw,
  GraduationCap,
} from 'lucide-react'
import { toast } from 'sonner'

interface StudentData {
  id: string
  namaLengkap: string
  nisn: string
  kelas: string
  sekolah: string
  jenisKelamin: string
}

interface ProgressData {
  id: string
  currentStage: string
  typedText: string
  charCount: number
  correctChars: number
  typingStartTime: string
  typingDuration: number
  quizAnswers: string
  quizStartTime: string
  quizDuration: number
  lastSavedAt: string
}

interface HistoryItem {
  id: string
  typingScore: number
  quizScore: number
  totalScore: number
  completedAt: string
}

const STAGE_LABELS: Record<string, string> = {
  typing: 'Tahap 1: Mengetik',
  'typing-finished': 'Tahap 1 Selesai',
  quiz: 'Tahap 2: Soal HOTS',
  completed: 'Selesai',
}

export function WelcomeStage() {
  const { setStage, setStudent, setProgress, student } = useAppStore()
  const [form, setForm] = useState({
    namaLengkap: '',
    nisn: '',
    kelas: '8A',
    sekolah: '',
    jenisKelamin: '',
  })
  const [loading, setLoading] = useState(false)
  const [checkLoading, setCheckLoading] = useState(false)
  const [existingStudent, setExistingStudent] = useState<StudentData | null>(null)
  const [existingProgress, setExistingProgress] = useState<ProgressData | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])

  // Cek progress siswa saat NISN berubah (debounced)
  useEffect(() => {
    if (form.nisn.length < 4) {
      setExistingStudent(null)
      setExistingProgress(null)
      setHistory([])
      return
    }

    const timer = setTimeout(async () => {
      setCheckLoading(true)
      try {
        const res = await fetch(`/api/student/progress?nisn=${form.nisn}`)
        const data = await res.json()
        if (data.success && data.exists) {
          setExistingStudent(data.student)
          if (data.hasActiveProgress && data.progress) {
            setExistingProgress(data.progress)
          } else {
            setExistingProgress(null)
          }
          setHistory(data.history || [])
        } else {
          setExistingStudent(null)
          setExistingProgress(null)
          setHistory([])
        }
      } catch (err) {
        console.error('Failed to check progress:', err)
      } finally {
        setCheckLoading(false)
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [form.nisn])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !form.namaLengkap ||
      !form.nisn ||
      !form.kelas ||
      !form.sekolah ||
      !form.jenisKelamin
    ) {
      toast.error('Semua field identitas wajib diisi')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal mendaftar')
      setStudent({ ...form, id: data.student.id })
      toast.success('Identitas tersimpan. Selamat mengerjakan!')
      setStage('typing')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  const handleResume = () => {
    if (!existingStudent || !existingProgress) return

    setStudent(existingStudent)

    // Parse quiz answers dari JSON string
    let quizAnswers: Record<number, number> = {}
    try {
      quizAnswers = JSON.parse(existingProgress.quizAnswers || '{}')
    } catch (e) {
      console.error('Failed to parse quiz answers:', e)
    }

    setProgress({
      progressId: existingProgress.id,
      typedText: existingProgress.typedText,
      typingStartTime: existingProgress.typingStartTime || null,
      typingDuration: existingProgress.typingDuration,
      quizAnswers,
      quizStartTime: existingProgress.quizStartTime || null,
      quizDuration: existingProgress.quizDuration,
      resumeStage: existingProgress.currentStage as 'typing' | 'typing-finished' | 'quiz',
    })

    toast.success(`Melanjutkan dari ${STAGE_LABELS[existingProgress.currentStage]}`)
    setStage(existingProgress.currentStage as 'typing' | 'typing-finished' | 'quiz')
  }

  const handleStartFresh = async () => {
    if (!existingStudent) return

    // Hapus progress lama
    if (existingProgress) {
      try {
        await fetch('/api/student/progress', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId: existingStudent.id }),
        })
      } catch (e) {
        console.error('Failed to delete old progress:', e)
      }
    }

    setStudent(existingStudent)
    setProgress(null)
    setExistingProgress(null)
    toast.success('Memulai latihan baru')
    setStage('typing')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="bg-white/60 backdrop-blur border-b border-slate-200">
        <div className="container max-w-5xl mx-auto px-4 py-2 flex justify-end gap-4">
          <a
            href="/?view=student-login"
            className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            Login Siswa →
          </a>
          <a
            href="/?view=teacher"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <School className="w-4 h-4" />
            Dashboard Guru →
          </a>
        </div>
      </div>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Latihan Kompetensi Siswa SMP
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Mengetik & Berpikir Komputasional
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Asah kemampuan mengetik dan pemahaman berpikir komputasional dalam
            dua tahap: latihan mengetik dan soal HOTS.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <Keyboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Tahap 1: Mengetik</CardTitle>
                  <CardDescription>Latihan mengetik teks</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" /> Durasi: 40 menit
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Anti copy-paste (3 peringatan)
              </div>
              <div>Progress otomatis tersimpan ke database</div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 bg-teal-50/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-teal-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Tahap 2: Soal HOTS</CardTitle>
                  <CardDescription>Pilihan ganda berpikir komputasional</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" /> Durasi: 25 menit
              </div>
              <div>Jumlah soal: 30 soal</div>
              <div>Jawaban tersimpan otomatis ke database</div>
            </CardContent>
          </Card>
        </div>

        {/* Card: Resume Progress jika ada */}
        {existingStudent && existingProgress && (
          <Card className="border-blue-300 bg-blue-50/70 shadow-lg mb-6">
            <CardHeader className="bg-blue-100/50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl text-blue-900">
                <RefreshCw className="w-5 h-5" />
                Lanjutkan Latihan Sebelumnya
              </CardTitle>
              <CardDescription className="text-blue-800">
                Anda memiliki progress yang belum selesai. Klik "Lanjutkan" untuk melanjutkan dari tahap terakhir.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-slate-500 mb-1">Nama Siswa</p>
                  <p className="font-semibold text-slate-900">{existingStudent.namaLengkap}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-slate-500 mb-1">Tahap Saat Ini</p>
                  <p className="font-semibold text-blue-700">
                    {STAGE_LABELS[existingProgress.currentStage] || existingProgress.currentStage}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-slate-500 mb-1">Terakhir Disimpan</p>
                  <p className="font-semibold text-slate-900 text-sm">
                    {new Date(existingProgress.lastSavedAt).toLocaleString('id-ID', {
                      day: '2-digit', month: 'short',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {existingProgress.charCount > 0 && (
                <div className="bg-white rounded-lg p-3 border border-blue-200 mb-4">
                  <p className="text-xs text-slate-500 mb-1">Progress Mengetik</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${Math.min(100, (existingProgress.charCount / 3000) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {existingProgress.charCount.toLocaleString('id-ID')} karakter
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleResume}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Lanjutkan Latihan
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleStartFresh}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Mulai Ulang dari Awal
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Card: Riwayat Latihan jika ada */}
        {existingStudent && history.length > 0 && !existingProgress && (
          <Card className="border-emerald-200 bg-emerald-50/50 mb-6">
            <CardHeader className="bg-emerald-100/50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg text-emerald-900">
                <History className="w-5 h-5" />
                Riwayat Latihan Selesai ({history.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                {history.map((h, i) => (
                  <div key={h.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-emerald-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {new Date(h.completedAt).toLocaleString('id-ID', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </p>
                        <p className="text-xs text-slate-500">
                          Mengetik: {h.typingScore} • Quiz: {h.quizScore}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      Nilai: {h.totalScore}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form Identitas */}
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-50 rounded-t-lg">
            <CardTitle className="text-2xl">Identitas Siswa</CardTitle>
            <CardDescription>
              {existingStudent
                ? `Selamat datang kembali, ${existingStudent.namaLengkap}! Data Anda sudah tersimpan.`
                : 'Wajib diisi sebelum memulai latihan. Data akan tersimpan di database.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="namaLengkap">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="namaLengkap"
                    value={form.namaLengkap}
                    onChange={(e) =>
                      setForm({ ...form, namaLengkap: e.target.value })
                    }
                    placeholder="Contoh: Budi Santoso"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nisn" className="flex items-center gap-2">
                    NISN <span className="text-red-500">*</span>
                    {checkLoading && (
                      <RefreshCw className="w-3 h-3 animate-spin text-slate-400" />
                    )}
                    {existingStudent && !checkLoading && (
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Terdaftar
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id="nisn"
                    value={form.nisn}
                    onChange={(e) =>
                      setForm({ ...form, nisn: e.target.value })
                    }
                    placeholder="Contoh: 0123456789"
                    required
                  />
                  <p className="text-xs text-slate-500">
                    Masukkan NISN untuk cek apakah ada progress yang bisa dilanjutkan
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kelas">
                    Kelas <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={form.kelas}
                    onValueChange={(v) => setForm({ ...form, kelas: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8A">8A</SelectItem>
                      <SelectItem value="8B">8B</SelectItem>
                      <SelectItem value="8C">8C</SelectItem>
                      <SelectItem value="9A">9A</SelectItem>
                      <SelectItem value="9B">9B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sekolah">
                    Asal Sekolah <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sekolah"
                    value={form.sekolah}
                    onChange={(e) =>
                      setForm({ ...form, sekolah: e.target.value })
                    }
                    placeholder="Contoh: SMP Negeri 1 Jakarta"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="jenisKelamin">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={form.jenisKelamin}
                    onValueChange={(v) =>
                      setForm({ ...form, jenisKelamin: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-semibold mb-1">Penting:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Progress mengetik & jawaban soal tersimpan otomatis ke database</li>
                      <li>Jika aplikasi error atau keluar, masuk lagi dengan NISN yang sama untuk melanjutkan</li>
                      <li>Kerjakan dengan jujur tanpa bantuan orang lain atau alat lain</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={loading}
                >
                  {loading ? 'Menyimpan...' : 'Mulai Latihan Baru'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs">
          <Badge variant="outline" className="bg-white">
            Berpikir Komputasional
          </Badge>
          <Badge variant="outline" className="bg-white">
            Dekomposisi
          </Badge>
          <Badge variant="outline" className="bg-white">
            Pengenalan Pola
          </Badge>
          <Badge variant="outline" className="bg-white">
            Abstraksi
          </Badge>
          <Badge variant="outline" className="bg-white">
            Algoritma
          </Badge>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-6 mt-auto">
        <div className="container max-w-5xl mx-auto px-4 text-center text-sm">
          Aplikasi Latihan Mengetik & Berpikir Komputasional - SMP
        </div>
      </footer>
    </div>
  )
}
