'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import {
  Gamepad2, CheckCircle2, XCircle, Clock, Trophy, RefreshCw, Zap,
} from 'lucide-react'
import { toast } from 'sonner'

interface GameQuestion {
  id: number
  question: string
  answer: boolean // true/false
  explanation: string
}

const GAME_QUESTIONS: GameQuestion[] = [
  { id: 1, question: 'Komputer adalah alat elektronik untuk mengolah data menjadi informasi.', answer: true, explanation: 'Benar, komputer menerima data, memproses, lalu menghasilkan informasi.' },
  { id: 2, question: 'Keyboard adalah perangkat lunak komputer.', answer: false, explanation: 'Salah, keyboard adalah perangkat keras (hardware) yang bisa disentuh.' },
  { id: 3, question: 'Internet menghubungkan jutaan komputer di seluruh dunia.', answer: true, explanation: 'Benar, internet adalah jaringan global.' },
  { id: 4, question: 'Hoaks adalah informasi yang benar dan terpercaya.', answer: false, explanation: 'Salah, hoaks adalah informasi palsu atau menyesatkan.' },
  { id: 5, question: 'Password yang baik harus dibagikan ke teman.', answer: false, explanation: 'Salah, password tidak boleh dibagikan ke siapapun.' },
  { id: 6, question: 'Algoritma adalah urutan langkah yang jelas untuk menyelesaikan masalah.', answer: true, explanation: 'Benar, algoritma adalah urutan langkah berurutan dan terbatas.' },
  { id: 7, question: 'Dekomposisi adalah menggabungkan masalah kecil menjadi masalah besar.', answer: false, explanation: 'Salah, dekomposisi adalah memecah masalah besar menjadi bagian kecil.' },
  { id: 8, question: 'Monitor berfungsi untuk menampilkan gambar dan tulisan.', answer: true, explanation: 'Benar, monitor adalah perangkat output visual.' },
  { id: 9, question: 'Plagiarisme adalah menyalin karya orang lain tanpa menyebut sumber.', answer: true, explanation: 'Benar, plagiarisme melanggar hak cipta dan etika.' },
  { id: 10, question: 'Terlalu lama bermain ponsel baik untuk kesehatan mata.', answer: false, explanation: 'Salah, terlalu lama di depan layar membuat mata lelah.' },
]

export function GameStage() {
  const { student, setStage, setTypingResult, setQuizResult, setProgress } = useAppStore()
  const router = useRouter()
  const [questions] = useState(() => [...GAME_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 8))
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  const handleAnswer = (answer: boolean) => {
    const current = questions[currentIdx]
    const isCorrect = answer === current.answer

    if (isCorrect) {
      const newStreak = streak + 1
      const points = 10 + (newStreak > 2 ? newStreak * 2 : 0) // Bonus streak
      setScore(score + points)
      setStreak(newStreak)
      setMaxStreak(Math.max(maxStreak, newStreak))
    } else {
      setStreak(0)
    }

    setLastAnswer(answer)
    setShowResult(true)

    setTimeout(() => {
      if (currentIdx + 1 >= questions.length) {
        setGameFinished(true)
      } else {
        setCurrentIdx(currentIdx + 1)
        setShowResult(false)
        setLastAnswer(null)
        setTimeLeft(10)
      }
    }, 2000)
  }

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameFinished || showResult) return
    if (timeLeft <= 0) {
      handleAnswer(false)
      return
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, gameStarted, gameFinished, showResult])

  const handleStart = () => {
    setGameStarted(true)
    setTimeLeft(10)
  }

  const handleFinish = () => {
    setStage('welcome')
    setTypingResult(null as never)
    setQuizResult(null as never)
    setProgress(null)
    router.push('/?view=student-dashboard')
  }

  const currentQ = questions[currentIdx]

  // Start screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-emerald-50 px-4">
        <Card className="max-w-lg w-full shadow-xl">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Game: Benar atau Salah? 🎮
            </h1>
            <p className="text-slate-600 mb-6">
              Jawab 8 pertanyaan dengan cepat! Dapatkan bonus poin untuk streak jawaban benar berturut-turut.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-purple-50 p-3 rounded-lg">
                <Clock className="w-6 h-6 mx-auto text-purple-600 mb-1" />
                <p className="text-xs text-slate-600">10 detik per soal</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg">
                <Zap className="w-6 h-6 mx-auto text-emerald-600 mb-1" />
                <p className="text-xs text-slate-600">Bonus streak</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <Trophy className="w-6 h-6 mx-auto text-amber-600 mb-1" />
                <p className="text-xs text-slate-600">Total 8 soal</p>
              </div>
            </div>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full" onClick={handleStart}>
              <Gamepad2 className="w-5 h-5 mr-2" />
              Mulai Bermain!
            </Button>
            <p className="text-xs text-slate-400 mt-4">
              Selamat bermain, {student?.namaLengkap}!
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Finish screen
  if (gameFinished) {
    const grade = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D'
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-emerald-50 px-4">
        <Card className="max-w-lg w-full shadow-xl">
          <CardContent className="pt-8 pb-8 text-center">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              score >= 80 ? 'bg-emerald-100' : score >= 60 ? 'bg-amber-100' : 'bg-red-100'
            }`}>
              <Trophy className={`w-14 h-14 ${score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'}`} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Game Selesai! 🎉
            </h1>
            <p className="text-slate-600 mb-4">
              Terima kasih sudah bermain, {student?.namaLengkap}!
            </p>
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-slate-500 mb-1">Skor Akhir</p>
              <p className="text-5xl font-bold text-purple-600">{score}</p>
              <Badge className="mt-2 bg-purple-100 text-purple-700 text-sm">Grade {grade}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500">Streak Tertinggi</p>
                <p className="text-2xl font-bold text-emerald-600">{maxStreak}x 🔥</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500">Total Soal</p>
                <p className="text-2xl font-bold text-blue-600">{questions.length}</p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
              <p className="text-xs text-amber-800">
                Hasil game telah dikirim ke guru. Nilai akan muncul di dashboard setelah dirilis.
              </p>
            </div>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 w-full" onClick={handleFinish}>
              Kembali ke Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Game screen
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm py-3">
        <div className="container max-w-3xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-slate-900">Benar atau Salah?</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-emerald-100 text-emerald-700">
              <Trophy className="w-3 h-3 mr-1" />{score}
            </Badge>
            {streak > 1 && (
              <Badge className="bg-orange-100 text-orange-700 animate-pulse">
                <Zap className="w-3 h-3 mr-1" />{streak}x Streak!
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Soal {currentIdx + 1} dari {questions.length}</span>
              <span className={timeLeft <= 3 ? 'text-red-600 font-bold animate-pulse' : ''}>
                ⏱️ {timeLeft}s
              </span>
            </div>
            <Progress value={(currentIdx / questions.length) * 100} className="h-2" />
            {timeLeft <= 10 && (
              <Progress value={(timeLeft / 10) * 100} className="h-1 mt-1" />
            )}
          </div>

          {/* Question Card */}
          <Card className={`shadow-xl transition-all ${showResult ? 'scale-105' : ''}`}>
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-6">
                <Badge className="bg-purple-100 text-purple-700 mb-3">
                  Pertanyaan {currentIdx + 1}
                </Badge>
                <p className="text-2xl font-bold text-slate-900 leading-relaxed">
                  {currentQ.question}
                </p>
              </div>

              {showResult ? (
                <div className={`text-center p-6 rounded-xl ${
                  lastAnswer === currentQ.answer
                    ? 'bg-emerald-50 border-2 border-emerald-300'
                    : 'bg-red-50 border-2 border-red-300'
                }`}>
                  {lastAnswer === currentQ.answer ? (
                    <>
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                      <p className="text-xl font-bold text-emerald-700">Benar! +{10 + (streak > 2 ? streak * 2 : 0)} poin</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-12 h-12 text-red-600 mx-auto mb-2" />
                      <p className="text-xl font-bold text-red-700">
                        {timeLeft <= 0 ? 'Waktu Habis!' : 'Salah!'}
                      </p>
                    </>
                  )}
                  <p className="text-sm text-slate-600 mt-2">{currentQ.explanation}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="p-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                    BENAR
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="p-6 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <XCircle className="w-8 h-8 mx-auto mb-2" />
                    SALAH
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
