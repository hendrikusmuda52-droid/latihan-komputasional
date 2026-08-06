'use client'

import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Type, Clock, ArrowRight, Brain, CheckCircle2, Lock } from 'lucide-react'

export function TypingFinishedStage() {
  const { setStage } = useAppStore()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Type className="w-4 h-4" />
            Tahap 1 Selesai
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Bagus! Tahap Mengetik Selesai
          </h1>
          <p className="text-slate-600">
            Kamu telah menyelesaikan tahap mengetik. Sekarang lanjutkan ke
            tahap soal HOTS berpikir komputasional.
          </p>
        </div>

        {/* Info: nilai dirahasiakan */}
        <Card className="border-amber-200 bg-amber-50/50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-1">
                  Nilai Mengetik Dirahasiakan
                </p>
                <p className="text-xs text-amber-700">
                  Performa mengetikmu telah dicatat dan akan dinilai oleh guru.
                  Nilai akan tersedia di dashboard setelah guru merilis hasil
                  akhir latihan.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card: Lanjut ke Tahap 2 */}
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
                  komputasional dengan waktu 25 menit. Baca pertanyaan dengan
                  teliti sebelum menjawab.
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
          SAKOLA - SMP Santo Augustinus
        </div>
      </footer>
    </div>
  )
}
