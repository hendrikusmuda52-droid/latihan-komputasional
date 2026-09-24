'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { getQuestions as getQuestionsFallback, type GradeLevel, type Question } from '@/lib/data'
import { getGradeTier } from '@/lib/constants'
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
  RefreshCw,
} from 'lucide-react'

export function ResultsStage() {
  const { student, typingResult, quizResult, totalScore, reset } = useAppStore()

  // Ambil set soal sesuai kelas siswa untuk pembahasan
  const [QUESTIONS, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    const grade = (student?.kelas as GradeLevel) ?? '8A'
    // ── FIX Bug A: Pakai getGradeTier() bukan grade.charAt(0) ──
    // Sebelumnya: "11DKV".charAt(0) = '1' → API filter gradeLevel='1' → 0 hasil
    // → fallback ke soal SMP kelas 7 (SALAH subjek).
    // Sekarang: getGradeTier("11DKV") = '11DKV' → API filter gradeLevel='11DKV'
    // → benar mengembalikan soal SMK untuk pembahasan.
    const tier = getGradeTier(grade)
    // ── FIX Bug A: Pass subject + cpId/tpId untuk konsistensi dengan quiz-stage ──
    // Sebelumnya, fetch HANYA kirim grade — backend default subject ke "Informatika"
    // meski siswa mungkin mengerjakan tugas "Mata Pelajaran Kejuruan".
    const subject = typeof window !== 'undefined'
      ? localStorage.getItem('currentSubject') || 'Informatika'
      : 'Informatika'
    const cpId = typeof window !== 'undefined' ? localStorage.getItem('currentAssignmentCpId') : null
    const tpId = typeof window !== 'undefined' ? localStorage.getItem('currentAssignmentTpId') : null
    const params = new URLSearchParams({ grade: tier, subject })
    if (cpId && cpId !== 'null' && cpId !== '__none__') params.set('cpId', cpId)
    if (tpId && tpId !== 'null' && tpId !== '__none__') params.set('tpId', tpId)
    fetch(`/api/content/questions?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.questions?.length > 0) {
          setQuestions(data.questions)
        } else {
          // CATATAN: getQuestionsFallback akan return [] untuk SMK (11DKV/12DKV)
          setQuestions(getQuestionsFallback(grade))
        }
      })
      .catch(() => {
        setQuestions(getQuestionsFallback(grade))
      })
  }, [student?.kelas])

  if (!typingResult || !quizResult) return null

  // Loading state saat soal belum ter-load
  if (QUESTIONS.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center text-slate-400">
          <RefreshCw className="w-10 h-10 mx-auto animate-spin mb-3" />
          <p className="text-sm">Memuat data soal untuk pembahasan...</p>
        </div>
      </div>
    )
  }

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
                // ── Identifikasi tipe soal ──
                const qType = q.questionType || 'pilihan_ganda'
                const isEssay = qType === 'essai'
                const isPGKompleks = qType === 'pilihan_ganda_kompleks'
                const isIsian = qType === 'isian_singkat'
                const isMencocokkan = qType === 'mencocokkan'

                // ── Validasi jawaban untuk masing-masing tipe ──
                let isCorrect = false
                let isPartial = false  // untuk isian: benar parsial
                let isUnanswered = false

                if (isEssay || isMencocokkan) {
                  // Tidak di-auto-grade — tampilkan sebagai info
                  isUnanswered = userAnswer === undefined || (typeof userAnswer === 'string' && userAnswer.trim() === '')
                } else if (isPGKompleks) {
                  // PG Kompleks: bandingkan array
                  try {
                    const correctArr: number[] = JSON.parse(q.correctAnswers || '[]')
                    let studentArr: number[] = []
                    if (typeof userAnswer === 'string') studentArr = JSON.parse(userAnswer || '[]')
                    else if (Array.isArray(userAnswer)) studentArr = userAnswer as unknown as number[]
                    isUnanswered = studentArr.length === 0
                    isCorrect = correctArr.length === studentArr.length && correctArr.every(v => studentArr.includes(v))
                  } catch {
                    isUnanswered = true
                  }
                } else if (isIsian) {
                  // Isian: BEST (full poin) vs RIGHT (partial) vs salah/kosong
                  const accepted = (q.shortAnswer || '').split('|').map(s => s.trim().toLowerCase()).filter(Boolean)
                  const best = accepted.length > 0 ? accepted[accepted.length - 1] : ''
                  const rightPartial = accepted.length > 1 ? accepted.slice(0, -1) : []
                  const student = typeof userAnswer === 'string' ? userAnswer.trim().toLowerCase() : ''
                  isUnanswered = student === ''
                  if (!isUnanswered) {
                    if (student === best) isCorrect = true
                    else if (rightPartial.includes(student)) isPartial = true
                  }
                } else {
                  // PG biasa
                  isCorrect = !isEssay && userAnswer === q.correctAnswer
                  isUnanswered = userAnswer === undefined
                }

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border ${
                      isEssay || isMencocokkan
                        ? 'border-amber-200 bg-amber-50/50'
                        : isCorrect
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : isPartial
                        ? 'border-amber-300 bg-amber-50/50'
                        : isUnanswered
                        ? 'border-slate-200 bg-slate-50/50'
                        : 'border-red-200 bg-red-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {isEssay || isMencocokkan ? (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 text-xs">
                          {isEssay ? 'Essai' : 'Mencocokkan'}
                        </Badge>
                      ) : isPGKompleks ? (
                        <Badge variant="outline" className="bg-sky-100 text-sky-800 border-sky-300 text-xs">
                          PG Kompleks
                        </Badge>
                      ) : isIsian ? (
                        <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300 text-xs">
                          Isian
                        </Badge>
                      ) : isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : isPartial ? (
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">★</div>
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
                          {isUnanswered && !isEssay && !isMencocokkan && (
                            <Badge variant="outline" className="text-xs text-slate-500">
                              Tidak dijawab
                            </Badge>
                          )}
                          {isPartial && (
                            <Badge variant="outline" className="text-xs bg-amber-100 text-amber-700">
                              Benar parsial (50%)
                            </Badge>
                          )}
                          {isCorrect && !isEssay && !isMencocokkan && (
                            <Badge variant="outline" className="text-xs bg-emerald-100 text-emerald-700">
                              ✓ Benar
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-800 mb-3">{q.question}</p>
                        {q.imageUrl && (
                          <div className="mb-3">
                            <img src={q.imageUrl} alt="Gambar soal" className="max-w-full max-h-48 rounded-lg border border-slate-200" />
                          </div>
                        )}
                        {isEssay || isMencocokkan ? (
                          // ── Render jawaban essai/mencocokkan sebagai teks ──
                          <div className="space-y-2 text-xs">
                            {!isUnanswered ? (
                              <div className="p-3 bg-amber-50 rounded border border-amber-200">
                                <span className="font-semibold text-amber-800 block mb-1">
                                  Jawabanmu:
                                </span>
                                <span className="text-slate-800 whitespace-pre-wrap">
                                  {typeof userAnswer === 'string' ? userAnswer : ''}
                                </span>
                              </div>
                            ) : (
                              <div className="p-2 bg-slate-50 rounded text-slate-500">
                                {isEssay ? 'Essai' : 'Mencocokkan'} tidak dijawab.
                              </div>
                            )}
                            {isEssay && q.essayAnswer && (
                              <div className="p-3 bg-sky-50 rounded border border-sky-200">
                                <span className="font-semibold text-sky-800 block mb-1">
                                  Jawaban contoh / rubric:
                                </span>
                                <span className="text-slate-700 whitespace-pre-wrap">
                                  {q.essayAnswer}
                                </span>
                              </div>
                            )}
                            <div className="text-amber-700 italic">
                              Soal {isEssay ? 'essai' : 'mencocokkan'} akan dinilai oleh guru secara manual.
                            </div>
                          </div>
                        ) : isPGKompleks ? (
                          // ── PG Kompleks: tampilkan opsi yang dipilih + opsi benar ──
                          <div className="space-y-1 text-xs">
                            {(() => {
                              const correctArr: number[] = (() => {
                                try { return JSON.parse(q.correctAnswers || '[]') } catch { return [] }
                              })()
                              let studentArr: number[] = []
                              if (typeof userAnswer === 'string') {
                                try { studentArr = JSON.parse(userAnswer || '[]') } catch {}
                              } else if (Array.isArray(userAnswer)) {
                                studentArr = userAnswer as unknown as number[]
                              }
                              return (
                                <>
                                  {!isUnanswered && studentArr.length > 0 && (
                                    <div className={`p-2 rounded ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                      <span className="font-semibold">Jawabanmu: </span>
                                      <span>{studentArr.map(i => String.fromCharCode(65 + i)).join(', ')}</span>
                                      <span className="ml-2">({studentArr.length} dipilih)</span>
                                    </div>
                                  )}
                                  <div className="p-2 rounded bg-emerald-50 text-emerald-700">
                                    <span className="font-semibold">Jawaban benar: </span>
                                    <span>{correctArr.map(i => String.fromCharCode(65 + i)).join(', ')}</span>
                                    <span className="ml-2">({correctArr.length} jawaban)</span>
                                  </div>
                                  {/* Tampilkan semua opsi dengan highlight */}
                                  <div className="mt-2 space-y-1">
                                    {q.options.map((opt, i) => {
                                      const isStudentChoice = studentArr.includes(i)
                                      const isCorrectChoice = correctArr.includes(i)
                                      return (
                                        <div key={i} className={`flex items-start gap-2 p-2 rounded ${
                                          isCorrectChoice ? 'bg-emerald-100' : isStudentChoice ? 'bg-red-100' : 'bg-white'
                                        }`}>
                                          <span className="font-bold">{String.fromCharCode(65 + i)}.</span>
                                          <span className="flex-1">{opt}</span>
                                          {isCorrectChoice && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                                          {isStudentChoice && !isCorrectChoice && <XCircle className="w-3 h-3 text-red-600" />}
                                        </div>
                                      )
                                    })}
                                  </div>
                                </>
                              )
                            })()}
                          </div>
                        ) : isIsian ? (
                          // ── Isian Singkat: tampilkan jawaban + accepted answers ──
                          <div className="space-y-2 text-xs">
                            {!isUnanswered ? (
                              <div className={`p-2 rounded ${
                                isCorrect ? 'bg-emerald-50 text-emerald-700' : isPartial ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                              }`}>
                                <span className="font-semibold">Jawabanmu: </span>
                                <span className="font-mono">{typeof userAnswer === 'string' ? userAnswer : ''}</span>
                                {isCorrect && <span className="ml-2">✓ (paling tepat, 100% poin)</span>}
                                {isPartial && <span className="ml-2">★ (benar parsial, 50% poin)</span>}
                              </div>
                            ) : (
                              <div className="p-2 bg-slate-50 rounded text-slate-500">
                                Isian tidak dijawab (0 poin)
                              </div>
                            )}
                            {/* Tampilkan jawaban yang diterima (accepted answers) */}
                            <div className="p-2 bg-sky-50 rounded border border-sky-200">
                              <span className="font-semibold text-sky-800 block mb-1">Jawaban yang diterima:</span>
                              <div className="flex flex-wrap gap-1">
                                {(() => {
                                  const accepted = (q.shortAnswer || '').split('|').filter(Boolean)
                                  const best = accepted[accepted.length - 1]
                                  const partial = accepted.slice(0, -1)
                                  return (
                                    <>
                                      {partial.map((a, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                                          {a} (benar, 50%)
                                        </span>
                                      ))}
                                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">
                                        {best} (paling benar, 100%)
                                      </span>
                                    </>
                                  )
                                })()}
                              </div>
                            </div>
                          </div>
                        ) : (
                          // ── PG biasa ──
                          <div className="space-y-1 text-xs">
                            {!isUnanswered && typeof userAnswer === 'number' && (
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
                          </div>
                        )}
                          {/* Pembahasan: tampil untuk PG dan Essai */}
                          <div className="flex items-start gap-1 text-slate-600 mt-2 pt-2 border-t border-slate-200">
                            <span className="font-semibold">Pembahasan:</span>
                            <span className="italic">{q.explanation}</span>
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
          SAKOLA - SMP Santo Augustinus
        </div>
      </footer>
    </div>
  )
}
