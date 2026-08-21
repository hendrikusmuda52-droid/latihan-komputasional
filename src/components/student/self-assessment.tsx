'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2,
  XCircle,
  Award,
  TrendingUp,
  Send,
  Clock,
} from 'lucide-react'
import { toast } from 'sonner'

const KKM = 75

interface AutoGrade {
  id: string
  title: string
  score: number
  typingScore?: number
  quizScore?: number
  typingSpeedWPM?: number
  typingAccuracy?: number
  quizCorrect?: number
  quizTotal?: number
  releasedAt?: string
  assignmentId?: string | null  // ── FIX: proper assignmentId for remedial mapping
  subject?: string
}

interface ManualGrade {
  id: string
  title: string
  score: number
  description?: string
  createdAt?: string
}

interface GradesResponse {
  success?: boolean
  manualGrades?: ManualGrade[]
  autoGrades?: AutoGrade[]
  error?: string
}

interface GradeEntry {
  id: string
  rawId: string
  title: string
  score: number
  kind: 'auto' | 'manual'
  description?: string
  date?: string
  assignmentId?: string | null  // ── FIX: carries the real assignment ID for remedial
}

export function SelfAssessment({ subject }: { subject: string }) {
  const [grades, setGrades] = useState<GradeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [submittedRequests, setSubmittedRequests] = useState<Set<string>>(
    new Set()
  )

  // ── Fetch released grades (manual + auto) ──
  const fetchGrades = async () => {
    setLoading(true)
    const data: GradesResponse = await fetch('/api/student/grades')
      .then((r) => r.json())
      .catch(() => ({ success: false }))

    const autoList: GradeEntry[] = (data?.autoGrades || []).map((g) => ({
      id: `auto-${g.id}`,
      rawId: g.id,
      title: g.title || 'Latihan Daring',
      score: Number(g.score) || 0,
      kind: 'auto' as const,
      date: g.releasedAt,
      // ── FIX: carry the real assignmentId (not the Result.id) ──
      assignmentId: g.assignmentId || null,
    }))

    const manualList: GradeEntry[] = (data?.manualGrades || []).map((g) => ({
      id: `manual-${g.id}`,
      rawId: g.id,
      title: g.title || 'Nilai Manual',
      score: Number(g.score) || 0,
      kind: 'manual' as const,
      description: g.description,
      date: g.createdAt,
      assignmentId: null,  // manual grades don't have assignmentId
    }))

    setGrades([...autoList, ...manualList])
    setLoading(false)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGrades()
  }, [])

  // ── Submit remedial request ──
  // ── FIX: Send the REAL assignmentId (not Result.id or global title string) ──
  const handleAjukanRemedial = async (grade: GradeEntry) => {
    // Validate: must have assignmentId for auto grades
    if (grade.kind === 'auto' && !grade.assignmentId) {
      toast.error('Tugas ini tidak memiliki ID assignment yang valid. Hubungi guru untuk reset manual.')
      return
    }

    const body: Record<string, unknown> = {
      subject,
      reason: `Siswa mengajukan remedial untuk: "${grade.title}" (skor: ${grade.score})`,
    }

    // ── FIX: Send the actual assignmentId (the tugas_id), NOT grade.rawId (which is Result.id) ──
    if (grade.assignmentId) {
      body.assignmentId = grade.assignmentId
    }

    const data = await fetch('/api/reset-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .catch(() => ({ success: false }))

    if (data?.success) {
      toast.success(`Pengajuan remedial untuk "${grade.title}" terkirim ke guru. Mohon tunggu persetujuan.`)
      setSubmittedRequests((prev) => {
        const next = new Set(prev)
        next.add(grade.id)
        return next
      })
    } else {
      toast.error(data?.error || 'Gagal mengirim pengajuan remedial')
    }
  }

  // ── Summary computations ──
  const total = grades.length
  const tuntas = grades.filter((g) => g.score >= KKM).length
  const belumTuntas = total - tuntas
  const avgScore =
    total > 0
      ? Math.round((grades.reduce((sum, g) => sum + g.score, 0) / total) * 10) / 10
      : 0

  return (
    <div className="space-y-4">
      {/* ── Header + Summary ── */}
      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="text-base flex items-center gap-2 flex-wrap">
            <Award className="w-4 h-4 text-emerald-600" />
            Capaian & Rapor Mandiri
            <Badge variant="secondary" className="ml-1">{subject}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Total Tugas
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{total}</p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-xs text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Tuntas
              </p>
              <p className="text-2xl font-bold text-emerald-700 mt-1">{tuntas}</p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-xs text-red-700 flex items-center gap-1">
                <XCircle className="w-3 h-3" /> Belum Tuntas
              </p>
              <p className="text-2xl font-bold text-red-700 mt-1">{belumTuntas}</p>
            </div>
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-3">
              <p className="text-xs text-teal-700 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Rata-rata Nilai
              </p>
              <p className="text-2xl font-bold text-teal-700 mt-1">{avgScore}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Detailed grade list ── */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="text-base">Detail Nilai yang Dirilis</CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-slate-300 border-t-emerald-600 rounded-full animate-spin mx-auto mb-2" />
              Memuat nilai...
            </div>
          ) : grades.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Award className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="font-medium">Belum ada nilai yang dirilis</p>
              <p className="text-xs mt-1">
                Nilai dari guru akan muncul di sini setelah dirilis
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {grades.map((g) => {
                const isTuntas = g.score >= KKM
                const submitted = submittedRequests.has(g.id)
                return (
                  <div
                    key={g.id}
                    className={`rounded-lg border p-4 ${
                      isTuntas
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-red-200 bg-red-50/50'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-slate-900 text-sm">
                            {g.title}
                          </p>
                          <Badge variant="outline" className="text-[10px]">
                            {g.kind === 'auto' ? 'Latihan Daring' : 'Nilai Manual'}
                          </Badge>
                        </div>
                        {g.description && (
                          <p className="text-xs text-slate-500 mt-1">
                            {g.description}
                          </p>
                        )}
                        {g.date && (
                          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(g.date).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-2xl font-bold ${
                              isTuntas ? 'text-emerald-700' : 'text-red-700'
                            }`}
                          >
                            {g.score}
                          </span>
                          <Badge
                            className={
                              isTuntas
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                                : 'bg-red-100 text-red-700 hover:bg-red-100'
                            }
                          >
                            {isTuntas ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 mr-0.5" />
                                TUNTAS
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 mr-0.5" />
                                BELUM TUNTAS
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Remedial button (only for BELUM TUNTAS) */}
                    {!isTuntas && (
                      <div className="mt-3">
                        <Button
                          size="sm"
                          variant={submitted ? 'secondary' : 'outline'}
                          disabled={submitted}
                          onClick={() => handleAjukanRemedial(g)}
                          className={
                            submitted
                              ? 'w-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200'
                              : 'w-full border-amber-300 text-amber-700 hover:bg-amber-50'
                          }
                        >
                          {submitted ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                              Pengajuan Terkirim ✓
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 mr-1" />
                              Ajukan Remedial
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
