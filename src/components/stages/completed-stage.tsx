'use client'

import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, LogOut, Clock, MessageSquare, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CompletedStage() {
  const { student, reset } = useAppStore()
  const router = useRouter()

  const handleBackToLogin = () => {
    // Reset state aplikasi
    reset()
    // Redirect ke halaman login siswa
    router.push('/')
  }

  const handleGoToDashboard = () => {
    reset()
    router.push('/?view=student-dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-lg shadow-xl border-emerald-200">
          <CardContent className="pt-8 pb-8 text-center">
            {/* Icon sukses */}
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Latihan Selesai! 🎉
            </h1>

            <p className="text-slate-600 mb-2">
              Terima kasih, <strong>{student?.namaLengkap}</strong>!
            </p>
            <p className="text-slate-600 mb-6">
              Jawaban Anda telah berhasil dikirim ke guru untuk dinilai.
            </p>

            {/* Info: nilai belum tersedia */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900 mb-1">
                    Nilai Belum Tersedia
                  </p>
                  <p className="text-xs text-amber-700">
                    Nilai Anda akan muncul di dashboard setelah guru selesai
                    menilai dan merilis hasil. Mohon tunggu konfirmasi dari guru.
                  </p>
                </div>
              </div>
            </div>

            {/* Info: apa yang dilakukan guru */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Apa Selanjutnya?
                  </p>
                  <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
                    <li>Guru akan memeriksa jawaban Anda</li>
                    <li>Setelah selesai, guru merilis nilai</li>
                    <li>Anda bisa lihat nilai di dashboard siswa</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 w-full"
                onClick={handleBackToLogin}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Kembali ke Halaman Login
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={handleGoToDashboard}
              >
                <Home className="w-5 h-5 mr-2" />
                Lihat Dashboard Saya
              </Button>
            </div>

            <p className="text-xs text-slate-400 mt-6">
              Latihan Mengetik & Berpikir Komputasional - SMP
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
