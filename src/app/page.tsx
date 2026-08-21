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
import { VideoAnalysisStage } from '@/components/stages/video-analysis-stage'
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
  // ── FIX: Retry counter to prevent premature kick-to-login on transient DB failures ──
  // If /api/student/auth returns unauthenticated, retry up to 2 times before
  // giving up and redirecting to login. This handles Vercel serverless cold
  // starts and transient DB connection issues.
  const [authRetry, setAuthRetry] = useState(0)

  // Cek session siswa saat mount ATAU saat URL/stage berubah
  // Selalu re-check ketika masuk dashboard/latihan mode dan belum ada session
  useEffect(() => {
    if (!isStudentDashboard && !isLatihanMode) {
      setAuthChecked(true)
      return
    }
    // Jika sudah ada session, tidak perlu fetch lagi
    if (studentSession) {
      setAuthChecked(true)
      return
    }
    // Reset authChecked sebelum fetch
    setAuthChecked(false)
    let cancelled = false
    let willRetry = false
    fetch('/api/student/auth')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data.authenticated && data.student) {
          setStudentSession(data.student)
          setAuthRetry(0)
        } else {
          // ── Retry logic: only kick to login after 2 failed attempts ──
          if (authRetry < 2) {
            willRetry = true
            // Delay next retry by 800ms to avoid hammering the server
            setTimeout(() => {
              if (!cancelled) setAuthRetry(prev => prev + 1)
            }, 800)
          }
        }
      })
      .catch(() => {
        if (cancelled) return
        // Network error — also retry
        if (authRetry < 2) {
          willRetry = true
          setTimeout(() => {
            if (!cancelled) setAuthRetry(prev => prev + 1)
          }, 800)
        }
      })
      .finally(() => {
        // Only mark authChecked=true if we're NOT retrying.
        // If retrying, keep authChecked=false so the spinner stays visible
        // and the effect re-runs when authRetry increments.
        if (!cancelled && !willRetry) setAuthChecked(true)
      })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStudentDashboard, isLatihanMode, authRetry])

  // Scroll to top saat stage berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stage])

  // Stable callbacks (tidak recreate tiap render)
  // #1 FIX: Tidak hapus cookie teacher saat switch ke student view
  const handleStudentLogin = useCallback((s: StudentInfo) => {
    setStudentSession(s)
    setAuthRetry(0)
    router.push('/?view=student-dashboard')
  }, [router])

  const handleStudentLogout = useCallback(() => {
    setStudentSession(null)
    setAuthRetry(0)
    router.push('/')
    // TIDAK menghapus teacher_token cookie — admin/guru bisa kembali ke dashboard tanpa re-login
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
        {stage === 'video' && <VideoAnalysisStage />}
      </>
    )
  }

  // Mode student-dashboard
  if (isStudentDashboard) {
    if (!authChecked) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-10 h-10 animate-spin text-emerald-500" />
          {authRetry > 0 && (
            <span className="ml-3 text-sm text-slate-500">Memuat ulang ({authRetry}/2)...</span>
          )}
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
