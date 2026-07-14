import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AppStage = 'welcome' | 'typing' | 'typing-finished' | 'quiz' | 'results'

export interface StudentInfo {
  id?: string
  namaLengkap: string
  nisn: string
  kelas: string
  sekolah: string
  jenisKelamin: string
}

export interface TypingResult {
  typedText: string
  charCount: number
  correctChars: number
  typingSpeedWPM: number
  typingAccuracy: number
  typingDuration: number // detik
  typingScore: number // 0-100
  copyWarnings: number
}

export interface QuizResult {
  answers: Record<number, number>
  quizCorrect: number
  quizTotal: number
  quizScore: number // 0-100
  quizDuration: number // detik
}

interface AppState {
  stage: AppStage
  student: StudentInfo | null
  typingResult: TypingResult | null
  quizResult: QuizResult | null
  totalScore: number | null
  resultId: string | null

  setStage: (stage: AppStage) => void
  setStudent: (student: StudentInfo) => void
  setTypingResult: (r: TypingResult) => void
  setQuizResult: (r: QuizResult) => void
  setTotalScore: (s: number) => void
  setResultId: (id: string) => void
  reset: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      stage: 'welcome',
      student: null,
      typingResult: null,
      quizResult: null,
      totalScore: null,
      resultId: null,

      setStage: (stage) => set({ stage }),
      setStudent: (student) => set({ student }),
      setTypingResult: (typingResult) => set({ typingResult }),
      setQuizResult: (quizResult) => set({ quizResult }),
      setTotalScore: (totalScore) => set({ totalScore }),
      setResultId: (resultId) => set({ resultId }),
      reset: () =>
        set({
          stage: 'welcome',
          student: null,
          typingResult: null,
          quizResult: null,
          totalScore: null,
          resultId: null,
        }),
    }),
    {
      name: 'computhink-app-store',
    }
  )
)
