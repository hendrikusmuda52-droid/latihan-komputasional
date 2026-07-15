'use client'

import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gauge, Target, Type, Clock, ArrowRight, Brain } from 'lucide-react'

export function TypingFinishedStage() {
  const { typingResult, setStage } = useAppStore()

  if (!typingResult) return null

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}m ${s}s`
  }

  const scoreColor =
    typingResult.typingScore >= 80
      ? 'text-emerald-600'
      : typingResult.typingScore >= 60
      ? 'text-amber-600'
      : 'text-red-600'

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Type className="w-4 h-4" />
            Tahap 1 Selesai
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Hasil Latihan Mengetik
          </h1>
          <p className="text-slate-600">
            Berikut ringkasan performa mengetikmu. Lanjutkan ke tahap soal
            HOTS berpikir komputasional.
          </p>
        </div>

        <Card className="border-slate-200 shadow-lg mb-6">
          <CardHeader className="bg-slate-50 rounded-t-lg">
            <CardTitle>Statistik Mengetik</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <Type className="w-6 h-6 mx-auto text-emerald-600 mb-2" />
                <p className="text-2xl font-bold text-slate-900">
                  {typingResult.charCount.toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-slate-500">Karakter Diketik</p>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <Gauge className="w-6 h-6 mx-auto text-teal-600 mb-2" />
                <p className="text-2xl font-bold text-slate-900">
                  {typingResult.typingSpeedWPM}
                </p>
                <p className="text-xs text-slate-500">WPM (Kecepatan)</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <Target className="w-6 h-6 mx-auto text-amber-600 mb-2" />
                <p className="text-2xl font-bold text-slate-900">
                  {typingResult.typingAccuracy}%
                </p>
                <p className="text-xs text-slate-500">Akurasi</p>
              </div>
              <div className="text-center p-4 bg-slate-100 rounded-lg">
                <Clock className="w-6 h-6 mx-auto text-slate-600 mb-2" />
                <p className="text-2xl font-bold text-slate-900">
                  {formatDuration(typingResult.typingDuration)}
                </p>
                <p className="text-xs text-slate-500">Durasi</p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white text-center">
              <p className="text-sm opacity-90 mb-1">Nilai Latihan Mengetik</p>
              <p className={`text-6xl font-bold ${scoreColor}`}>
                {typingResult.typingScore}
              </p>
              <p className="text-sm opacity-90 mt-1">dari 100</p>
              <p className="text-xs opacity-75 mt-2">
                Karakter benar: {typingResult.correctChars} /{' '}
                {typingResult.charCount} • Peringatan copy-paste:{' '}
                {typingResult.copyWarnings}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-200 bg-teal-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-teal-600 flex items-center justify-center flex-shrink-0">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Tahap 2: Soal HOTS Berpikir Komputasional
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Kamu akan mengerjakan 30 soal pilihan ganda tentang berpikir
                  komputasional dengan waktu 25 menit. Persiapkan dirimu.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-700 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-teal-600" /> 25 menit
                  </span>
                  <span className="flex items-center gap-1">
                    <Brain className="w-4 h-4 text-teal-600" /> 30 soal
                  </span>
                </div>
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => setStage('quiz')}
                >
                  Mulai Tahap 2: Soal HOTS
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 mt-auto">
        <div className="container max-w-4xl mx-auto px-4 text-center text-xs">
          Latihan Mengetik & Berpikir Komputasional - SMP Kelas 9
        </div>
      </footer>
    </div>
  )
}
