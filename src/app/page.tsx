'use client'

import { useEffect, Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { WelcomeStage } from '@/components/stages/welcome-stage'
import { TypingStage } from '@/components/stages/typing-stage'
import { TypingFinishedStage } from '@/components/stages/typing-finished-stage'
import { QuizStage } from '@/components/stages/quiz-stage'
import { ResultsStage } from '@/components/stages/results-stage'
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

function RedirectToStudentLogin() {
  useEffect(() => {
    window.location.href = '/?view=student-login'
  }, [])
  return null
}

function HomeContent() {
  const stage = useAppStore((s) => s.stage)
  const searchParams = useSearchParams()
  const view = searchParams.get('view')
  const isTeacherView = view === 'teacher'
  const isStudentLogin = view === 'student-login'
  const isStudentDashboard = view === 'student-dashboard'

  // State untuk student session
  const [studentSession, setStudentSession] = useState<StudentInfo | null>(null)
  const [authChecked, setAuthChecked] = useState(!isStudentDashboard)

  // Cek session siswa saat mount (untuk student-dashboard)
  useEffect(() => {
    if (!isStudentDashboard) return
    let cancelled = false
    fetch('/api/student/auth')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data.authenticated && data.student) {
          setStudentSession(data.student)
        }
      })
      .finally(() => {
        if (!cancelled) setAuthChecked(true)
      })
    return () => { cancelled = true }
  }, [isStudentDashboard])

  // Scroll to top saat stage berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stage])

  // Routing berdasarkan query param
  if (isTeacherView) return <TeacherDashboard />

  if (isStudentLogin) {
    return (
      <StudentLogin
        onLogin={(s) => {
          setStudentSession(s)
          window.location.href = '/?view=student-dashboard'
        }}
      />
    )
  }

  if (isStudentDashboard) {
    if (!authChecked) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-10 h-10 animate-spin text-emerald-500" />
        </div>
      )
    }
    if (!studentSession) {
      // Belum login → redirect ke login via useEffect
      return <RedirectToStudentLogin />
    }
    return (
      <StudentDashboard
        student={studentSession}
        onLogout={() => {
          setStudentSession(null)
          window.location.href = '/?view=student-login'
        }}
      />
    )
  }

  // Default: alur siswa (welcome → typing → quiz → results)
  return (
    <>
      {stage === 'welcome' && <WelcomeStage />}
      {stage === 'typing' && <TypingStage />}
      {stage === 'typing-finished' && <TypingFinishedStage />}
      {stage === 'quiz' && <QuizStage />}
      {stage === 'results' && <ResultsStage />}
    </>
  )
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
