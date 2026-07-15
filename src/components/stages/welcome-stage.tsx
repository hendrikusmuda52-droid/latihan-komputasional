'use client'

import { useState } from 'react'
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
import { Keyboard, Brain, Clock, AlertTriangle, BookOpen, School } from 'lucide-react'
import { toast } from 'sonner'

export function WelcomeStage() {
  const { setStage, setStudent } = useAppStore()
  const [form, setForm] = useState({
    namaLengkap: '',
    nisn: '',
    kelas: '8A',
    sekolah: '',
    jenisKelamin: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Top bar with link to teacher dashboard */}
      <div className="bg-white/60 backdrop-blur border-b border-slate-200">
        <div className="container max-w-5xl mx-auto px-4 py-2 flex justify-end">
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
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Latihan Kompetensi Siswa SMP
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Mengetik & Berpikir Komputasional
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Asah kemampuan mengetik dan pemahaman berpikir komputasional
            dalam dua tahap: latihan mengetik dan soal HOTS.
          </p>
        </div>

        {/* Cards overview */}
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
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Anti
                copy-paste (3 peringatan)
              </div>
              <div>Menampilkan jumlah karakter & kecepatan (WPM)</div>
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
              <div>Materi: dekomposisi, pola, abstraksi, algoritma</div>
            </CardContent>
          </Card>
        </div>

        {/* Identity Form */}
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-50 rounded-t-lg">
            <CardTitle className="text-2xl">Identitas Siswa</CardTitle>
            <CardDescription>
              Wajib diisi sebelum memulai latihan. Data akan tersimpan di
              database untuk pencatatan nilai.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="nisn">
                    NISN <span className="text-red-500">*</span>
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
                      <li>
                        Pastikan identitas yang diisi sudah benar - data
                        tersimpan permanen.
                      </li>
                      <li>
                        Persiapkan diri sebelum memulai. Setelah mulai, timer
                        tidak bisa dijeda.
                      </li>
                      <li>
                        Kerjakan dengan jujur tanpa bantuan orang lain atau
                        alat lain.
                      </li>
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
                  {loading ? 'Menyimpan...' : 'Mulai Latihan'}
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
          Aplikasi Latihan Mengetik & Berpikir Komputasional - SMP Kelas 9
        </div>
      </footer>
    </div>
  )
}
