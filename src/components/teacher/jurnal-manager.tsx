'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'
import { Calendar, BookOpen, Save, CheckCircle2, Info, RefreshCw, AlertCircle, Download } from 'lucide-react'
import { ALL_GRADES } from '@/lib/constants'
import { useResilientFetch } from '@/lib/use-resilient-fetch'

interface CP {
  id: string
  kodeCP: string
  deskripsi: string
}

interface TP {
  id: string
  kodeTP: string
  deskripsi: string
  cpId: string
}

interface JurnalRow {
  jamPelajaran: number
  exists: boolean
  id?: string
  kelas?: string
  mapel?: string
  cpId?: string | null
  tpId?: string | null
  materiPokok?: string
  hambatan?: string
}

interface RowForm {
  kelas: string
  mapel: string
  cpId: string
  tpId: string
  materiPokok: string
  hambatan: string
  exists: boolean
}

const SAFE_GRADES = (ALL_GRADES || []) as readonly string[]
const NONE = '__none__'
const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

function todayStr(): string {
  const d = new Date()
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tz).toISOString().split('T')[0]
}

// Fallback JP slot count per hari (when API doesn't provide jpSlots)
function fallbackSlots(h: string): number {
  if (h === 'Senin') return 9
  if (h === 'Selasa' || h === 'Rabu' || h === 'Kamis') return 8
  if (h === 'Jumat') return 5
  return 0
}

export function JurnalGuruManager() {
  const [tanggal, setTanggal] = useState<string>(todayStr())
  const [hari, setHari] = useState<string>(DAYS[new Date().getDay()])

  // ── RESILIENT FETCH: CPs (loaded once on mount) ──
  const { data: cpData } = useResilientFetch<{
    success: boolean
    cps: CP[]
  }>('/api/cp', { deps: [] })
  const cps = cpData?.cps ?? []

  // ── RESILIENT FETCH: jurnal template (loaded when tanggal changes) ──
  const { data: tmplData, loading, error, refetch, retryCount } = useResilientFetch<{
    success: boolean
    template: JurnalRow[]
    jpSlots: number
  }>(`/api/jurnal?tanggal=${encodeURIComponent(tanggal)}`, { deps: [tanggal] })

  const template = tmplData?.template ?? []
  const apiSlots = Number(tmplData?.jpSlots || 0)
  const jpSlots = apiSlots > 0 ? apiSlots : fallbackSlots(hari)

  const [tpsMap, setTpsMap] = useState<Record<string, TP[]>>({})
  const [rowForms, setRowForms] = useState<Record<number, RowForm>>({})
  const [savingJp, setSavingJp] = useState<Record<number, boolean>>({})

  // ── Fetch TPs for a given CP (cached in tpsMap) — kept manual ──
  const fetchTPs = useCallback(async (cpId: string) => {
    if (!cpId || cpId === NONE || tpsMap[cpId]) return
    const data = await fetch(`/api/tp?cpId=${encodeURIComponent(cpId)}`)
      .then((r) => r.json())
      .catch(() => ({ success: false }))
    let list: TP[] = []
    if (data?.success && Array.isArray(data.tps)) list = data.tps
    else if (Array.isArray(data?.tps)) list = data.tps
    else if (Array.isArray(data)) list = data
    setTpsMap((prev) => ({ ...prev, [cpId]: list }))
  }, [tpsMap])

  const fetchTemplate = useCallback(() => { refetch() }, [refetch])

  // ── Export Jurnal to Excel ──
  const handleExport = () => {
    // window.open triggers download directly from the API endpoint
    // The API handles subject isolation via JWT cookie automatically
    window.open('/api/jurnal/export', '_blank')
    toast.success('Mengekspor jurnal ke Excel...')
  }

  // ── Build rowForms when template data arrives/changes ──
  useEffect(() => {
    // Always compute hari locally from tanggal
    const localHari = DAYS[new Date(tanggal).getDay()]
    setHari(localHari)

    const slots = apiSlots > 0 ? apiSlots : fallbackSlots(localHari)
    const forms: Record<number, RowForm> = {}
    for (let i = 1; i <= slots; i++) {
      const existing = template.find((r) => r.jamPelajaran === i)
      forms[i] = {
        kelas: existing?.kelas || NONE,
        mapel: existing?.mapel || '',
        cpId: existing?.cpId || NONE,
        tpId: existing?.tpId || NONE,
        materiPokok: existing?.materiPokok || '',
        hambatan: existing?.hambatan || '',
        exists: !!existing?.exists,
      }
      // Pre-fetch TPs for any CP that already has data
      if (existing?.cpId && existing.cpId !== NONE) {
        fetchTPs(existing.cpId)
      }
    }
    setRowForms(forms)
  }, [template, apiSlots, tanggal, fetchTPs])

  const updateForm = (jp: number, patch: Partial<RowForm>) => {
    setRowForms((prev) => ({
      ...prev,
      [jp]: { ...(prev[jp] || { kelas: NONE, mapel: '', cpId: NONE, tpId: NONE, materiPokok: '', hambatan: '', exists: false }), ...patch },
    }))
  }

  const handleCpChange = (jp: number, cpId: string) => {
    // Reset TP when CP changes
    updateForm(jp, { cpId, tpId: NONE })
    if (cpId && cpId !== NONE) fetchTPs(cpId)
  }

  const handleSaveJp = async (jp: number) => {
    const f = rowForms[jp]
    if (!f) return
    if (!f.mapel.trim()) {
      toast.error(`JP ${jp}: Mapel wajib diisi`)
      return
    }
    setSavingJp((prev) => ({ ...prev, [jp]: true }))
    const body = {
      tanggal,
      jamPelajaran: jp,
      kelas: f.kelas === NONE ? null : f.kelas,
      mapel: f.mapel,
      cpId: f.cpId === NONE ? null : f.cpId,
      tpId: f.tpId === NONE ? null : f.tpId,
      materiPokok: f.materiPokok,
      hambatan: f.hambatan,
      tahunAjaran: '2026/2027',
      semester: 'ganjil',
    }
    const data = await fetch('/api/jurnal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .catch(() => ({ success: false }))
    setSavingJp((prev) => ({ ...prev, [jp]: false }))
    if (data?.success) {
      toast.success(`JP ${jp} tersimpan`)
      updateForm(jp, { exists: true })
    } else {
      toast.error(data?.error || `Gagal menyimpan JP ${jp}`)
    }
  }

  return (
    <div className="space-y-4">
      {/* ── Top Card: Tanggal + Info Banner ── */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Jurnal Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm">
                <Calendar className="w-3.5 h-3.5" /> Tanggal
              </Label>
              <Input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Hari</Label>
              <div className="h-9 flex items-center px-3 rounded-md border bg-slate-50 text-sm font-medium">
                {hari}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Jumlah JP</Label>
              <div className="h-9 flex items-center px-3 rounded-md border bg-slate-50 text-sm font-medium">
                {jpSlots} Jam Pelajaran
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-md bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              Hari <b>{hari}</b>: <b>{jpSlots}</b> Jam Pelajaran
            </span>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              title="Export semua jurnal ke Excel (.xlsx)"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">Export Excel</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchTemplate()}
              disabled={loading}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''} mr-1`} />
              Muat Ulang
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Jurnal Slot Table ── */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="text-base">
            Slot Jurnal — {hari}, {tanggal}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {/* ── LOADING STATE ── */}
          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              <p className="text-sm">Memuat jurnal...</p>
              {retryCount > 0 && (
                <p className="text-xs mt-1 text-amber-600">Mencoba ulang ({retryCount}/2)...</p>
              )}
            </div>
          ) : /* ── ERROR STATE ── */
          error ? (
            <div className="py-12 text-center">
              <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
              <p className="font-medium text-red-600 mb-1">Gagal memuat jurnal</p>
              <p className="text-xs text-slate-500 mb-3">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchTemplate}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Coba Muat Ulang
              </Button>
            </div>
          ) : /* ── EMPTY STATE ── */
          jpSlots === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">
              Tidak ada slot JP untuk hari ini
            </p>
          ) : (
            <div className="max-h-[28rem] overflow-y-auto border rounded-md">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10">
                  <TableRow>
                    <TableHead className="w-12 text-center">JP</TableHead>
                    <TableHead className="w-28">Kelas</TableHead>
                    <TableHead className="w-32">Mapel</TableHead>
                    <TableHead className="w-40">CP</TableHead>
                    <TableHead className="w-40">TP</TableHead>
                    <TableHead>Materi Pokok</TableHead>
                    <TableHead className="w-40">Hambatan</TableHead>
                    <TableHead className="w-24 text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: jpSlots }, (_, i) => i + 1).map((jp) => {
                    const f =
                      rowForms[jp] || {
                        kelas: NONE,
                        mapel: '',
                        cpId: NONE,
                        tpId: NONE,
                        materiPokok: '',
                        hambatan: '',
                        exists: false,
                      }
                    const tps =
                      f.cpId && f.cpId !== NONE ? tpsMap[f.cpId] || [] : []
                    return (
                      <TableRow key={jp}>
                        <TableCell className="text-center font-semibold text-sm">
                          {jp}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={f.kelas}
                            onValueChange={(v) => updateForm(jp, { kelas: v })}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="-" />
                            </SelectTrigger>
                            <SelectContent>
                              {SAFE_GRADES.map((g) => (
                                <SelectItem key={g} value={g}>
                                  {g}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={f.mapel}
                            onChange={(e) => updateForm(jp, { mapel: e.target.value })}
                            className="h-8 text-xs"
                            placeholder="Mapel"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={f.cpId}
                            onValueChange={(v) => handleCpChange(jp, v)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Pilih CP" />
                            </SelectTrigger>
                            <SelectContent>
                              {cps.length === 0 ? (
                                <SelectItem value={NONE} disabled>
                                  Belum ada CP
                                </SelectItem>
                              ) : (
                                cps.map((c) => (
                                  <SelectItem key={c.id} value={c.id}>
                                    {c.kodeCP || c.id.slice(0, 6)}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={f.tpId}
                            onValueChange={(v) => updateForm(jp, { tpId: v })}
                            disabled={!f.cpId || f.cpId === NONE}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Pilih TP" />
                            </SelectTrigger>
                            <SelectContent>
                              {tps.length === 0 ? (
                                <SelectItem value={NONE} disabled>
                                  Belum ada TP
                                </SelectItem>
                              ) : (
                                tps.map((tp) => (
                                  <SelectItem key={tp.id} value={tp.id}>
                                    {tp.kodeTP || tp.id.slice(0, 6)}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={f.materiPokok}
                            onChange={(e) =>
                              updateForm(jp, { materiPokok: e.target.value })
                            }
                            className="h-8 text-xs"
                            placeholder="Materi Pokok"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={f.hambatan}
                            onChange={(e) =>
                              updateForm(jp, { hambatan: e.target.value })
                            }
                            className="h-8 text-xs"
                            placeholder="Hambatan"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {f.exists && (
                              <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-0.5" />
                                Tersimpan
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleSaveJp(jp)}
                              disabled={savingJp[jp]}
                              title={`Simpan JP ${jp}`}
                            >
                              {savingJp[jp] ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Save className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default JurnalGuruManager
