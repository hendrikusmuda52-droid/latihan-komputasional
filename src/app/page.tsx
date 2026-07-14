'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { WelcomeStage } from '@/components/stages/welcome-stage'
import { TypingStage } from '@/components/stages/typing-stage'
import { TypingFinishedStage } from '@/components/stages/typing-finished-stage'
import { QuizStage } from '@/components/stages/quiz-stage'
import { ResultsStage } from '@/components/stages/results-stage'
import { Toaster } from '@/components/ui/sonner'

export default function Home() {
  const stage = useAppStore((s) => s.stage)

  // Scroll to top saat stage berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stage])

  return (
    <>
      <Toaster richColors position="top-center" />
      {stage === 'welcome' && <WelcomeStage />}
      {stage === 'typing' && <TypingStage />}
      {stage === 'typing-finished' && <TypingFinishedStage />}
      {stage === 'quiz' && <QuizStage />}
      {stage === 'results' && <ResultsStage />}
    </>
  )
}
