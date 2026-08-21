'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2, RefreshCw, Target, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { GRADE_TIERS } from '@/lib/constants'
import { useResilientFetch } from '@/lib/use-resilient-fetch'

const MAX_TP_LENGTH = 100

interface CP {
  id: string; subject: string; gradeLevel: string; kodeCP: string; deskripsi: string; isActive: boolean; createdAt: string
  tps?: TP[]
}
interface TP {
  id: string; cpId: string; kodeTP: string; deskripsi: string; isActive: boolean; createdAt: string
}

export function CPTPManager() {
  // ── FIX: Subject filter for multi-mapel support ──
  const [filterSubject, setFilterSubject] = useState<string>('Informatika')

  // ── RESILIENT FETCH: auto-retry on 401/network error ──
  // URL now includes subject param so API returns CPs for the selected subject
  const { data: cpData, loading, error, refetch, retryCount } = useResilientFetch<{
    success: boolean
    cps: CP[]
  }>(`/api/cp?subject=${encodeURIComponent(filterSubject)}`, { deps: [filterSubject] })

  const cps = cpData?.cps ?? []

  // Stable refetch callback for use in event handlers (delete, save, etc.)
  const fetchData = useCallback(() => { refetch() }, [refetch])

  const [showCPForm, setShowCPForm] = useState(false)
  const [editingCP, setEditingCP] = useState<CP | null>(null)
  const [showTPForm, setShowTPForm] = useState(false)
  const [editingTP, setEditingTP] = useState<TP | null>(null)
  const [tpParentCP, setTpParentCP] = useState<CP | null>(null)
  const [expandedCPs, setExpandedCPs] = useState<Set<string>>(new Set())

  const toggleExpand = (cpId: string) => {
    setExpandedCPs(prev => {
      const next = new Set(prev)
      if (next.has(cpId)) next.delete(cpId)
      else next.add(cpId)
      return next
    })
  }

  const handleDeleteCP = async (id: string) => {
    try {
      const res = await fetch(`/api/cp/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal')
      toast.success('CP dihapus')
      fetchData()
    } catch { toast.error('Gagal menghapus CP') }
  }

  const handleDeleteTP = async (id: string) => {
    try {
      const res = await fetch(`/api/tp/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal')
      toast.success('TP dihapus')
      fetchData()
    } catch { toast.error('Gagal menghapus TP') }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="w-4 h-4 text-emerald-600" />
              CP & TP (Capaian & Tujuan Pembelajaran)
            </CardTitle>
            <div className="flex gap-2">
              {/* ── FIX: Subject filter dropdown ── */}
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-44 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Informatika">Informatika (SMP)</SelectItem>
                  <SelectItem value="Mata Pelajaran Kejuruan">Mata Pelajaran Kejuruan (SMK)</SelectItem>
                  <SelectItem value="Mata Pelajaran Pilihan">Mata Pelajaran Pilihan (SMK)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { setEditingCP(null); setShowCPForm(true) }}>
                <Plus className="w-4 h-4 mr-1" />Tambah CP
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Satu CP dapat memiliki banyak TP. Deskripsi TP maksimal {MAX_TP_LENGTH} karakter (aman untuk e-Rapor).
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {/* ── LOADING STATE: full spinner on first load ── */}
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              <p className="text-sm">Memuat data CP/TP...</p>
              {retryCount > 0 && (
                <p className="text-xs mt-1 text-amber-600">Mencoba ulang ({retryCount}/2)...</p>
              )}
            </div>
          ) : /* ── ERROR STATE: show retry button instead of empty state ── */
          error ? (
            <div className="py-16 text-center">
              <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
              <p className="font-medium text-red-600 mb-1">Gagal memuat data</p>
              <p className="text-xs text-slate-500 mb-3">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchData}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Coba Muat Ulang
              </Button>
            </div>
          ) : /* ── EMPTY STATE: genuinely no data in DB ── */
          cps.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Target className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="font-medium">Belum ada CP</p>
              <p className="text-xs mt-1">Klik "Tambah CP" untuk membuat Capaian Pembelajaran pertama</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {cps.map((cp) => {
                const isExpanded = expandedCPs.has(cp.id)
                const tpCount = cp.tps?.length || 0
                return (
                  <div key={cp.id} className={`border rounded-lg ${cp.isActive ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-60'}`}>
                    {/* CP Row */}
                    <div className="p-3 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <button onClick={() => toggleExpand(cp.id)} className="mt-0.5 p-1 rounded hover:bg-slate-100">
                          <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">Kelas {cp.gradeLevel}</Badge>
                            <Badge variant="outline" className="text-xs bg-violet-50 text-violet-700">{cp.subject || filterSubject}</Badge>
                            <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700">{cp.kodeCP || 'CP'}</Badge>
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">{tpCount} TP</Badge>
                            {!cp.isActive && <Badge className="bg-slate-200 text-slate-600 text-xs">Nonaktif</Badge>}
                          </div>
                          <p className="text-sm font-semibold text-slate-900">
                            {cp.deskripsi.length > 120 ? cp.deskripsi.substring(0, 120) + '...' : cp.deskripsi}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => { setTpParentCP(cp); setEditingTP(null); setShowTPForm(true) }}>
                          <Plus className="w-3 h-3 mr-1" />TP
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setEditingCP(cp); setShowCPForm(true) }}>
                          <Pencil className="w-4 h-4 text-slate-600" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Trash2 className="w-4 h-4 text-red-600" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>Hapus CP?</AlertDialogTitle>
                            <AlertDialogDescription>CP "{cp.kodeCP}" dan semua TP di dalamnya akan dihapus permanen.</AlertDialogDescription></AlertDialogHeader>
                            <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => handleDeleteCP(cp.id)} className="bg-red-600 hover:bg-red-700">Hapus</AlertDialogAction></AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    {/* TP List (expanded) */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/50">
                        {tpCount === 0 ? (
                          <p className="py-4 text-center text-xs text-slate-400">Belum ada TP. Klik tombol "TP" untuk menambah.</p>
                        ) : (
                          <div className="py-2 px-4 space-y-1">
                            {cp.tps?.map((tp) => (
                              <div key={tp.id} className="flex items-start justify-between gap-2 p-2 bg-white rounded border border-slate-100">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700">{tp.kodeTP || 'TP'}</Badge>
                                    <span className="text-xs text-slate-500">{tp.deskripsi.length}/{MAX_TP_LENGTH} karakter</span>
                                  </div>
                                  <p className="text-sm text-slate-700">{tp.deskripsi}</p>
                                </div>
                                <div className="flex gap-1 flex-shrink-0">
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => { setTpParentCP(cp); setEditingTP(tp); setShowTPForm(true) }}>
                                    <Pencil className="w-3 h-3 text-slate-600" />
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Trash2 className="w-3 h-3 text-red-600" /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader><AlertDialogTitle>Hapus TP?</AlertDialogTitle><AlertDialogDescription>TP akan dihapus permanen.</AlertDialogDescription></AlertDialogHeader>
                                      <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => handleDeleteTP(tp.id)} className="bg-red-600 hover:bg-red-700">Hapus</AlertDialogAction></AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {showCPForm && (
        <CPForm editing={editingCP} onClose={() => { setShowCPForm(false); setEditingCP(null) }} onSaved={() => { setShowCPForm(false); setEditingCP(null); fetchData() }} />
      )}
      {showTPForm && tpParentCP && (
        <TPForm editing={editingTP} parentCP={tpParentCP} onClose={() => { setShowTPForm(false); setEditingTP(null); setTpParentCP(null) }} onSaved={() => { setShowTPForm(false); setEditingTP(null); setTpParentCP(null); fetchData() }} />
      )}
    </div>
  )
}

function CPForm({ editing, onClose, onSaved }: { editing: CP | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    gradeLevel: editing?.gradeLevel ?? '7',
    kodeCP: editing?.kodeCP ?? 'CP.1',
    deskripsi: editing?.deskripsi ?? '',
    // ── FIX: subject field for multi-mapel support ──
    subject: (editing as any)?.subject ?? '',
  })
  const [saving, setSaving] = useState(false)

  // ── Dynamic subject options based on gradeLevel ──
  // SMP (7/8/9) → Informatika (+ other SMP subjects)
  // SMK (11DKV/12DKV) → Mapel Kejuruan + Mapel Pilihan
  const isSMK = form.gradeLevel === '11DKV' || form.gradeLevel === '12DKV'
  const subjectOptions = isSMK
    ? ['Mata Pelajaran Kejuruan', 'Mata Pelajaran Pilihan', 'DKV', 'Komputer Akuntansi', 'Multimedia', 'TKJ', 'RPL']
    : ['Informatika', 'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Mandarin', 'IPA', 'IPS', 'Seni Budaya', 'Agama', 'PLH', 'KKA', 'Kerohanian', 'PkN', 'Penjaskes']

  // Auto-set subject when gradeLevel changes
  const handleGradeChange = (v: string) => {
    const smk = v === '11DKV' || v === '12DKV'
    const newSubject = smk ? 'Mata Pelajaran Kejuruan' : 'Informatika'
    setForm({ ...form, gradeLevel: v, subject: newSubject })
  }

  const handleSave = async () => {
    if (!form.gradeLevel || !form.deskripsi) { toast.error('Kelas dan deskripsi wajib diisi'); return }
    if (!form.subject) { toast.error('Mata pelajaran wajib diisi'); return }
    setSaving(true)
    try {
      const payload = { ...form, subject: form.subject }
      if (editing) {
        const res = await fetch(`/api/cp/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || 'Gagal') }
        toast.success('CP diperbarui')
      } else {
        const res = await fetch('/api/cp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || 'Gagal') }
        toast.success('CP ditambahkan')
      }
      onSaved()
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Gagal') } finally { setSaving(false) }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{editing ? 'Edit CP' : 'Tambah Capaian Pembelajaran (CP)'}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          {/* ── FIX: Mata Pelajaran dropdown (dynamic by grade) ── */}
          <div className="space-y-1">
            <Label htmlFor="cp-subject" className="text-xs font-medium">Mata Pelajaran *</Label>
            <Select
              value={form.subject}
              onValueChange={(v) => setForm({ ...form, subject: v })}
            >
              <SelectTrigger id="cp-subject"><SelectValue placeholder="Pilih mapel" /></SelectTrigger>
              <SelectContent>
                {subjectOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isSMK && (
              <p className="text-xs text-emerald-600 mt-0.5">Mapel SMK — pilihan disesuaikan untuk kelas {form.gradeLevel}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="cp-grade" className="text-xs">Jenjang/Kelas *</Label>
              <Select value={form.gradeLevel} onValueChange={handleGradeChange}>
                <SelectTrigger id="cp-grade"><SelectValue /></SelectTrigger>
                <SelectContent>{GRADE_TIERS.map(g => <SelectItem key={g} value={g}>Kelas {g}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="cp-kode" className="text-xs">Kode CP *</Label>
              <Input id="cp-kode" name="cp-kode" value={form.kodeCP} onChange={(e) => setForm({ ...form, kodeCP: e.target.value })} placeholder="CP.1" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="cp-deskripsi" className="text-xs">Deskripsi CP *</Label>
            <Textarea id="cp-deskripsi" name="cp-deskripsi" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} rows={4} placeholder="Tulis deskripsi Capaian Pembelajaran..." />
          </div>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Batal</Button><Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function TPForm({ editing, parentCP, onClose, onSaved }: { editing: TP | null; parentCP: CP; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    kodeTP: editing?.kodeTP ?? `TP.${parentCP.kodeCP.replace('CP.', '')}.1`,
    deskripsi: editing?.deskripsi ?? '',
  })
  const [saving, setSaving] = useState(false)
  const charCount = form.deskripsi.length
  const isOverLimit = charCount > MAX_TP_LENGTH

  const handleSave = async () => {
    if (!form.deskripsi) { toast.error('Deskripsi TP wajib diisi'); return }
    if (isOverLimit) { toast.error(`Deskripsi TP melebihi ${MAX_TP_LENGTH} karakter (saat ini: ${charCount})`); return }
    setSaving(true)
    try {
      if (editing) {
        const res = await fetch(`/api/tp/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || 'Gagal') }
        toast.success('TP diperbarui')
      } else {
        const res = await fetch('/api/tp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cpId: parentCP.id, ...form }) })
        if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || 'Gagal') }
        toast.success('TP ditambahkan')
      }
      onSaved()
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Gagal') } finally { setSaving(false) }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit TP' : 'Tambah Tujuan Pembelajaran (TP)'}</DialogTitle>
          <p className="text-xs text-slate-500">Untuk CP: <Badge variant="outline" className="text-xs">{parentCP.kodeCP}</Badge> — {parentCP.deskripsi.substring(0, 60)}...</p>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Kode TP *</Label>
            <Input value={form.kodeTP} onChange={(e) => setForm({ ...form, kodeTP: e.target.value })} placeholder="TP.1.1" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs flex items-center justify-between">
              <span>Deskripsi TP * (maks. {MAX_TP_LENGTH} karakter)</span>
              <span className={`font-mono text-xs ${isOverLimit ? 'text-red-600 font-bold' : charCount > 80 ? 'text-amber-600' : 'text-slate-400'}`}>
                {charCount}/{MAX_TP_LENGTH}
              </span>
            </Label>
            <Textarea
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value.slice(0, MAX_TP_LENGTH) })}
              rows={3}
              placeholder="Tulis deskripsi TP (saran: singkat & padat untuk e-Rapor)..."
              className={isOverLimit ? 'border-red-500' : ''}
            />
            {isOverLimit ? (
              <p className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />Melebihi batas {MAX_TP_LENGTH} karakter!</p>
            ) : charCount > 80 ? (
              <p className="text-xs text-amber-600">Mendekati batas. Pastikan teks muat di e-Rapor.</p>
            ) : (
              <p className="text-xs text-slate-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Aman untuk e-Rapor</p>
            )}
          </div>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Batal</Button><Button onClick={handleSave} disabled={saving || isOverLimit} className="bg-emerald-600 hover:bg-emerald-700">{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
