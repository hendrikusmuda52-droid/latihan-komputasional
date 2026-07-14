'use client'

import { useAppStore } from '@/lib/store'
import { QUESTIONS } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Trophy,
  Type,
  Brain,
  Gauge,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Download,
  Award,
} from 'lucide-react'

export function ResultsStage() {
  const { student, typingResult, quizResult, totalScore, reset } = useAppStore()

  if (!typingResult || !quizResult) return null

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}m ${s}s`
  }

  const getScoreColor = (score: number) =>
    score >= 80
      ? 'text-emerald-600'
      : score >= 60
      ? 'text-amber-600'
      : 'text-red-600'

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', label: 'Sangat Baik' }
    if (score >= 80) return { grade: 'B', label: 'Baik' }
    if (score >= 70) return { grade: 'C', label: 'Cukup' }
    if (score >= 60) return { grade: 'D', label: 'Kurang' }
    return { grade: 'E', label: 'Perlu Bimbingan' }
  }

  const typingGrade = getGrade(typingResult.typingScore)
  const quizGrade = getGrade(quizResult.quizScore)
  const totalGrade = getGrade(totalScore ?? 0)

  const handlePrint = () => {
    window.print()
  }

  const handleReset = () => {
    if (
      confirm(
        'Yakin ingin memulai latihan baru? Hasil sebelumnya sudah tersimpan di database.'
      )
    ) {
      reset()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Latihan Selesai
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Hasil Akhir Latihan
          </h1>
          <p className="text-slate-600">
            {student?.namaLengkap} • {student?.kelas} • {student?.sekolah}
          </p>
          <p className="text-xs text-slate-500 mt-1">NISN: {student?.nisn}</p>
        </div>

        {/* Total Score Banner */}
        <Card className="border-emerald-200 shadow-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white text-center">
            <Award className="w-12 h-12 mx-auto mb-3 opacity-90" />
            <p className="text-sm opacity-90 mb-1">Nilai Akhir Keseluruhan</p>
            <p className="text-7xl font-bold mb-2">
              {totalScore ?? 0}
            </p>
            <p className="text-lg opacity-90">
              Grade {totalGrade.grade} — {totalGrade.label}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm">
              <Trophy className="w-4 h-4" />
              Peringkat: {totalScore && totalScore >= 80 ? 'Excellent!' : totalScore && totalScore >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </div>
          </div>
        </Card>

        {/* Detail skor */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Skor Mengetik */}
          <Card className="border-emerald-200">
            <CardHeader className="bg-emerald-50 pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Type className="w-4 h-4 text-emerald-600" />
                Tahap 1: Mengetik
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-center mb-4">
                <p className={`text-5xl font-bold ${getScoreColor(typingResult.typingScore)}`}>
                  {typingResult.typingScore}
                </p>
                <p className="text-sm text-slate-500">
                  Grade {typingGrade.grade} — {typingGrade.label}
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Type className="w-4 h-4 text-emerald-600" /> Karakter
                  </span>
                  <span className="font-semibold">
                    {typingResult.charCount.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Gauge className="w-4 h-4 text-teal-600" /> Kecepatan
                  </span>
                  <span className="font-semibold">
                    {typingResult.typingSpeedWPM} WPM
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Target className="w-4 h-4 text-amber-600" /> Akurasi
                  </span>
                  <span className="font-semibold">
                    {typingResult.typingAccuracy}%
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-slate-600" /> Durasi
                  </span>
                  <span className="font-semibold">
                    {formatDuration(typingResult.typingDuration)}
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="flex items-center gap-2 text-slate-600">
                    <XCircle className="w-4 h-4 text-red-500" /> Peringatan
                  </span>
                  <span className="font-semibold">
                    {typingResult.copyWarnings}/3
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skor Quiz */}
          <Card className="border-teal-200">
            <CardHeader className="bg-teal-50 pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Brain className="w-4 h-4 text-teal-600" />
                Tahap 2: Soal HOTS
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-center mb-4">
                <p className={`text-5xl font-bold ${getScoreColor(quizResult.quizScore)}`}>
                  {quizResult.quizScore}
                </p>
                <p className="text-sm text-slate-500">
                  Grade {quizGrade.grade} — {quizGrade.label}
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Benar
                  </span>
                  <span className="font-semibold">
                    {quizResult.quizCorrect} / {quizResult.quizTotal}
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="flex items-center gap-2 text-slate-600">
                    <XCircle className="w-4 h-4 text-red-500" /> Salah
                  </span>
                  <span className="font-semibold">
                    {quizResult.quizTotal - quizResult.quizCorrect}
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-slate-600" /> Durasi
                  </span>
                  <span className="font-semibold">
                    {formatDuration(quizResult.quizDuration)}
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Target className="w-4 h-4 text-amber-600" /> Akurasi
                  </span>
                  <span className="font-semibold">
                    {Math.round(
                      (quizResult.quizCorrect / quizResult.quizTotal) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Brain className="w-4 h-4 text-teal-600" /> Total Soal
                  </span>
                  <span className="font-semibold">{quizResult.quizTotal}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pembahasan Jawaban */}
        <Card className="border-slate-200 mb-6">
          <CardHeader className="bg-slate-50 pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="w-4 h-4 text-teal-600" />
              Pembahasan Jawaban
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {QUESTIONS.map((q, idx) => {
                const userAnswer = quizResult.answers[q.id]
                const isCorrect = userAnswer === q.correctAnswer
                const isUnanswered = userAnswer === undefined
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : isUnanswered
                        ? 'border-slate-200 bg-slate-50/50'
                        : 'border-red-200 bg-red-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-slate-500">
                            Soal {idx + 1}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {q.category}
                          </Badge>
                          {isUnanswered && (
                            <Badge variant="outline" className="text-xs text-slate-500">
                              Tidak dijawab
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-800 mb-3">{q.question}</p>
                        <div className="space-y-1 text-xs">
                          {!isUnanswered && (
                            <div
                              className={`flex items-start gap-1 ${
                                isCorrect ? 'text-emerald-700' : 'text-red-700'
                              }`}
                            >
                              <span className="font-semibold">Jawabanmu:</span>
                              <span>
                                {String.fromCharCode(65 + userAnswer)}.{' '}
                                {q.options[userAnswer]}
                              </span>
                            </div>
                          )}
                          {!isCorrect && (
                            <div className="flex items-start gap-1 text-emerald-700">
                              <span className="font-semibold">
                                Jawaban benar:
                              </span>
                              <span>
                                {String.fromCharCode(65 + q.correctAnswer)}.{' '}
                                {q.options[q.correctAnswer]}
                              </span>
                            </div>
                          )}
                          <div className="flex items-start gap-1 text-slate-600 mt-2 pt-2 border-t border-slate-200">
                            <span className="font-semibold">Pembahasan:</span>
                            <span className="italic">{q.explanation}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Aksi */}
        <div className="flex flex-wrap justify-center gap-3 print:hidden">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrint}
          >
            <Download className="w-4 h-4 mr-2" /> Cetak / Simpan PDF
          </Button>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Mulai Latihan Baru
          </Button>
        </div>

        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center text-sm text-emerald-800 print:hidden">
          <CheckCircle2 className="w-5 h-5 inline mr-1" />
          Hasil latihanmu telah tersimpan di database. Kamu dapat memulai
          latihan baru kapan saja.
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 mt-auto print:hidden">
        <div className="container max-w-5xl mx-auto px-4 text-center text-xs">
          Latihan Mengetik & Berpikir Komputasional - SMP Kelas 9
        </div>
      </footer>
    </div>
  )
}
