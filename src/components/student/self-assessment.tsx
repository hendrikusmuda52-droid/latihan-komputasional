'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2, XCircle, Award, TrendingUp, TrendingDown,
  Send, Clock, Target, BookOpen,
} from 'lucide-react'
import { toast } from 'sonner'

// ── Types untuk response API baru ──
interface TPSummary {
  tpId: string
  kodeTP: string
  deskripsi: string
  grades: Array<{
    id: string
    title: string
    score: number
    kind: 'auto' | 'manual'
    gradeCategory: string
    date: string
  }>
  avgTugas: number
  avgUH: number
  nhTP: number
  jumlahTugas: number
  jumlahUH: number
}

interface CPSummary {
  cpId: string
  kodeCP: string
  deskripsi: string
  gradeLevel: string
  tps: TPSummary[]
  nhCP: number
  status: 'Tuntas' | 'Remidi'
  jumlahTugas: number
  jumlahUH: number
}

interface GradesResponse {
  success?: boolean
  config?: { kkm: number; bobotNH: number; bobotSTS: number; bobotSAS: number }
  cpSummary?: CPSummary[]
  summary?: {
    NH: number; STS: number; SAS: number; NA: number; status: string
  }
  cpTertinggi?: { kodeCP: string; deskripsi: string; nhCP: number } | null
  cpTerendah?: { kodeCP: string; deskripsi: string; nhCP: number } | null
  error?: string
}

export function SelfAssessment({ subject }: { subject: string }) {
  const [data, setData] = useState<GradesResponse>({})
  const [loading, setLoading] = useState(true)
  const [submittedRequests, setSubmittedRequests] = useState<Set<string>>(new Set())

  const fetchGrades = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/student/grades?subject=${encodeURIComponent(subject)}`)
      const json = await res.json()
      setData(json)
    } catch {
      toast.error('Gagal memuat data nilai')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGrades()
  }, [subject])

  const handleRequestRemedial = async (cpId: string, kodeCP: string) => {
    if (submittedRequests.has(cpId)) {
      toast.info('Pengajuan remedial sudah dikirim untuk CP ini')
      return
    }

    try {
      const res = await fetch('/api/reset-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cpId,
          reason: `Mengajukan remedial untuk ${kodeCP} karena nilai di bawah KKM`,
        }),
      })

      if (res.ok) {
        toast.success(`Pengajuan remedial untuk ${kodeCP} terkirim`)
        setSubmittedRequests((prev) => new Set(prev).add(cpId))
      } else {
        const err = await res.json().catch(() => ({}))
        toast.error(err.error || 'Gagal mengajukan remedial')
      }
    } catch {
      toast.error('Gagal mengirim pengajuan')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Memuat data nilai...</p>
        </div>
      </div>
    )
  }

  const config = data.config
  const kkm = config?.kkm || 75
  const summary = data.summary
  const cpSummary = data.cpSummary || []
  const validCPs = cpSummary.filter(cp => cp.jumlahTugas > 0 || cp.jumlahUH > 0)

  if (validCPs.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500 mb-1">Belum ada nilai yang dirilis</p>
          <p className="text-xs text-slate-400">
            Nilai dari tugas dan ulangan akan muncul di sini setelah guru merilisnya
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* ── Ringkasan Nilai Akhir ── */}
      {summary && (
        <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-sky-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="w-5 h-5 text-teal-600" />
              Ringkasan Nilai Akhir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">NH</p>
                <p className="text-2xl font-bold text-slate-700">{summary.NH}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">STS</p>
                <p className="text-2xl font-bold text-slate-700">{summary.STS}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">SAS</p>
                <p className="text-2xl font-bold text-slate-700">{summary.SAS}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">NA</p>
                <p className="text-3xl font-bold text-teal-600">{summary.NA}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <Badge
                  className={summary.status === 'Tuntas'
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    : 'bg-red-100 text-red-700 border-red-200'
                  }
                >
                  {summary.status === 'Tuntas' ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <XCircle className="w-3 h-3 mr-1" />
                  )}
                  {summary.status}
                </Badge>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-teal-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">KKM: <b className="text-slate-700">{kkm}</b></span>
              <span className="text-slate-500">
                Bobot: NH {config?.bobotNH || 40}% • STS {config?.bobotSTS || 30}% • SAS {config?.bobotSAS || 30}%
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── CP Tertinggi & Terendah ── */}
      {(data.cpTertinggi || data.cpTerendah) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.cpTertinggi && (
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-emerald-600 font-medium">CP Tertinggi</p>
                  <p className="text-sm font-semibold text-slate-700 truncate">
                    {data.cpTertinggi.kodeCP}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {data.cpTertinggi.deskripsi}
                  </p>
                </div>
                <p className="text-2xl font-bold text-emerald-600">
                  {data.cpTertinggi.nhCP}
                </p>
              </CardContent>
            </Card>
          )}
          {data.cpTerendah && (
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-amber-600 font-medium">CP Perlu Ditingkatkan</p>
                  <p className="text-sm font-semibold text-slate-700 truncate">
                    {data.cpTerendah.kodeCP}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {data.cpTerendah.deskripsi}
                  </p>
                </div>
                <p className="text-2xl font-bold text-amber-600">
                  {data.cpTerendah.nhCP}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Detail Nilai per CP ── */}
      <div className="space-y-3">
        {cpSummary.map((cp) => {
          const hasData = cp.jumlahTugas > 0 || cp.jumlahUH > 0
          if (!hasData) return null

          return (
            <Card key={cp.cpId} className={cp.status === 'Remidi' ? 'border-amber-200' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {cp.kodeCP}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Kelas {cp.gradeLevel}
                      </Badge>
                      {cp.status === 'Tuntas' ? (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Tuntas
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                          <XCircle className="w-3 h-3 mr-1" />
                          Remidi
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{cp.deskripsi}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-slate-500">NH</p>
                    <p className={`text-2xl font-bold ${cp.status === 'Tuntas' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {cp.nhCP}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* TP breakdown */}
                <div className="space-y-2 mt-2">
                  {cp.tps.filter(tp => tp.jumlahTugas > 0 || tp.jumlahUH > 0).map((tp) => (
                    <div key={tp.tpId} className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs font-medium text-slate-600">
                          {tp.kodeTP} — {tp.deskripsi}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          {tp.jumlahTugas > 0 && (
                            <span className="text-slate-500">
                              Tugas: <b className="text-slate-700">{tp.avgTugas}</b>
                              <span className="text-slate-400"> ({tp.jumlahTugas})</span>
                            </span>
                          )}
                          {tp.jumlahUH > 0 && (
                            <span className="text-slate-500">
                              UH: <b className="text-slate-700">{tp.avgUH}</b>
                              <span className="text-slate-400"> ({tp.jumlahUH})</span>
                            </span>
                          )}
                        </div>
                      </div>
                      {/* List individual grades */}
                      {tp.grades.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {tp.grades.map((g) => (
                            <Badge
                              key={g.id}
                              variant="outline"
                              className={`text-xs ${
                                g.kind === 'auto'
                                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                                  : 'bg-violet-50 text-violet-700 border-violet-200'
                              }`}
                            >
                              {g.kind === 'auto' ? '🖥️' : '📝'} {g.title}: {g.score}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Remedial button */}
                {cp.status === 'Remidi' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                    onClick={() => handleRequestRemedial(cp.cpId, cp.kodeCP)}
                    disabled={submittedRequests.has(cp.cpId)}
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    {submittedRequests.has(cp.cpId)
                      ? 'Pengajuan remedial terkirim'
                      : `Ajukan Remedial untuk ${cp.kodeCP}`}
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
