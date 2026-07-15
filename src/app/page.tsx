'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { WelcomeStage } from '@/components/stages/welcome-stage'
import { TypingStage } from '@/components/stages/typing-stage'
import { TypingFinishedStage } from '@/components/stages/typing-finished-stage'
import { QuizStage } from '@/components/stages/quiz-stage'
import { ResultsStage } from '@/components/stages/results-stage'
import { TeacherDashboard } from '@/components/teacher-dashboard'
import { Toaster } from '@/components/ui/sonner'

function HomeContent() {
  const stage = useAppStore((s) => s.stage)
  const searchParams = useSearchParams()
  const isTeacherView = searchParams.get('view') === 'teacher'

  // Scroll to top saat stage berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stage])

  // Jika view=teacher, tampilkan dashboard guru
  if (isTeacherView) {
    return <TeacherDashboard />
  }

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
