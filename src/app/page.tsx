'use client'

import { useEffect, Suspense, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { TypingStage } from '@/components/stages/typing-stage'
import { TypingFinishedStage } from '@/components/stages/typing-finished-stage'
import { QuizStage } from '@/components/stages/quiz-stage'
import { CompletedStage } from '@/components/stages/completed-stage'
import { ResultsStage } from '@/components/stages/results-stage'
import { GameStage } from '@/components/stages/game-stage'
import { DrawingStage } from '@/components/stages/drawing-stage'
import { TeacherDashboard } from '@/components/teacher-dashboard'
import { StudentLogin } from '@/components/student/student-login'
import { StudentDashboard } from '@/components/student/student-dashboard'
import { Toaster } from '@/components/ui/sonner'

interface StudentInfo {
  id: string
  namaLengkap: string
  nisn: string
  kelas: string
  sekolah: string
  jenisKelamin: string
}

function HomeContent() {
  const stage = useAppStore((s) => s.stage)
  const searchParams = useSearchParams()
  const router = useRouter()
  const view = searchParams.get('view')
  const isTeacherView = view === 'teacher'
  const isStudentDashboard = view === 'student-dashboard'

  // Tentukan mode berdasarkan URL & stage sekali saja (stabil)
  // Pakai stage hanya untuk menentukan apakah sedang latihan, tapi tidak masuk dependency
  const isLatihanMode = !isTeacherView && !isStudentDashboard && stage !== 'welcome'

  // State untuk student session
  const [studentSession, setStudentSession] = useState<StudentInfo | null>(null)
  const [authChecked, setAuthChecked] = useState(false)

  // Cek session siswa saat mount ATAU saat masuk latihan mode (stage berubah)
  useEffect(() => {
    // Hanya cek auth jika butuh session (student-dashboard atau latihan mode)
    if (!isStudentDashboard && !isLatihanMode) {
      setAuthChecked(true)
      return
    }
    // Jika sudah ada session, tidak perlu fetch lagi
    if (studentSession) {
      setAuthChecked(true)
      return
    }
    let cancelled = false
    fetch('/api/student/auth')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data.authenticated && data.student) {
          setStudentSession(data.student)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setAuthChecked(true)
      })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStudentDashboard, isLatihanMode])

  // Scroll to top saat stage berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stage])

  // Stable callbacks (tidak recreate tiap render)
  const handleStudentLogin = useCallback((s: StudentInfo) => {
    setStudentSession(s)
    router.push('/?view=student-dashboard')
  }, [router])

  const handleStudentLogout = useCallback(() => {
    setStudentSession(null)
    router.push('/')
  }, [router])

  // Routing berdasarkan query param
  if (isTeacherView) return <TeacherDashboard />

  // Mode latihan (typing/quiz/results) - butuh session siswa
  if (isLatihanMode) {
    if (!authChecked) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-10 h-10 animate-spin text-emerald-500" />
        </div>
      )
    }
    if (!studentSession) {
      // Tidak ada session - kembali ke login (pakai router, bukan location.href)
      router.push('/')
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-10 h-10 animate-spin text-emerald-500" />
        </div>
      )
    }
    return (
      <>
        {stage === 'typing' && <TypingStage />}
        {stage === 'typing-finished' && <TypingFinishedStage />}
        {stage === 'quiz' && <QuizStage />}
        {stage === 'completed' && <CompletedStage />}
        {stage === 'results' && <ResultsStage />}
        {stage === 'game' && <GameStage />}
        {stage === 'drawing' && <DrawingStage />}
      </>
    )
  }

  // Mode student-dashboard
  if (isStudentDashboard) {
    if (!authChecked) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-10 h-10 animate-spin text-emerald-500" />
        </div>
      )
    }
    if (!studentSession) {
      router.push('/')
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-10 h-10 animate-spin text-emerald-500" />
        </div>
      )
    }
    return (
      <StudentDashboard
        student={studentSession}
        onLogout={handleStudentLogout}
      />
    )
  }

  // DEFAULT: halaman login siswa
  return <StudentLogin onLogin={handleStudentLogin} />
}

export default function Home() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Suspense fallback={null}>
        <HomeContent />
      </Suspense>
    </>
  )
}
