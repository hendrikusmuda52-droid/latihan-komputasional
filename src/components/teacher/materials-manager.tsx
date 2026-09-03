'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2, RefreshCw, ToggleLeft, ToggleRight, BookOpen, FileText, Sparkles, AlertCircle, Wand2, Layers, Target } from 'lucide-react'
import { toast } from 'sonner'
import { AIMaterialDialog } from './ai-material-dialog'
import { useResilientFetch } from '@/lib/use-resilient-fetch'
import { sanitizeMarkdownContent } from '@/lib/markdown-sanitizer'

interface Material {
  id: string; title: string; content: string; targetKelas: string;
  category: string; isActive: boolean; createdAt: string; updatedAt: string;
  cpId?: string | null; tpId?: string | null;
  subject?: string | null;
}

interface CP {
  id: string; kodeCP: string; deskripsi: string; gradeLevel: string;
}
interface TP {
  id: string; kodeTP: string; deskripsi: string; cpId: string;
}

// ── FIX: Added SMK grades 11DKV + 12DKV, removed CATEGORIES constant ──
const GRADE_OPTIONS = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '11DKV', '12DKV']
const NONE = '__none__'

export function MaterialsManager() {
  const [editing, setEditing] = useState<Material | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showAIGenerate, setShowAIGenerate] = useState(false)
  // ── FIX: Filter subject untuk multi-mapel ──
  const [filterSubject, setFilterSubject] = useState<string>('ALL')

  // ── RESILIENT FETCH: auto-retry on 401/network error ──
  const { data: materialsData, loading, error, refetch, retryCount } = useResilientFetch<{
    success: boolean
    materials: Material[]
  }>(`/api/materials${filterSubject !== 'ALL' ? `?subject=${encodeURIComponent(filterSubject)}` : ''}`, { deps: [filterSubject] })

  const materials = materialsData?.materials ?? []
  const fetchMaterials = useCallback(() => { refetch() }, [refetch])

  const handleToggle = async (m: Material) => {
    try {
      await fetch(`/api/materials/${m.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !m.isActive }) })
      toast.success(`Materi ${!m.isActive ? 'diaktifkan' : 'dinonaktifkan'}`)
      fetchMaterials()
    } catch { toast.error('Gagal') }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/materials/${id}`, { method: 'DELETE' })
      toast.success('Materi dihapus')
      fetchMaterials()
    } catch { toast.error('Gagal') }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="w-4 h-4 text-emerald-600" /> Materi Belajar
            </CardTitle>
            <div className="flex gap-2 items-center flex-wrap">
              {/* ── FIX: Filter subject dropdown untuk multi-mapel ── */}
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-48 h-9">
                  <SelectValue placeholder="Semua Mapel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Semua Mapel</SelectItem>
                  <SelectItem value="Informatika">Informatika</SelectItem>
                  <SelectItem value="Mata Pelajaran Kejuruan">Mata Pelajaran Kejuruan</SelectItem>
                  <SelectItem value="Mata Pelajaran Pilihan">Mata Pelajaran Pilihan</SelectItem>
                  <SelectItem value="DKV">DKV</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={fetchMaterials} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowAIGenerate(true)}>
                <Sparkles className="w-4 h-4 mr-1" /> AI Generate
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { setEditing(null); setShowForm(true) }}>
                <Plus className="w-4 h-4 mr-1" /> Tambah Materi
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Materi belajar untuk siswa. Siswa bisa lihat materi aktif di dashboard mereka.
            {filterSubject !== 'ALL' && ` Filter: ${filterSubject}`}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              <p className="text-sm">Memuat data materi...</p>
              {retryCount > 0 && (
                <p className="text-xs mt-1 text-amber-600">Mencoba ulang ({retryCount}/2)...</p>
              )}
            </div>
          ) : error ? (
            <div className="py-16 text-center">
              <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
              <p className="font-medium text-red-600 mb-1">Gagal memuat data</p>
              <p className="text-xs text-slate-500 mb-3">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchMaterials}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Coba Muat Ulang
              </Button>
            </div>
          ) : materials.length === 0 ? (
            <div className="py-20 text-center text-slate-400"><BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" /><p className="font-medium">Belum ada materi</p></div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {materials.map((m) => (
                <div key={m.id} className={`p-3 border rounded-lg ${m.isActive ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-70'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700">{m.category}</Badge>
                        <Badge variant="outline" className="text-xs">{m.targetKelas === 'ALL' ? 'Semua Kelas' : m.targetKelas}</Badge>
                        {!m.isActive && <Badge variant="outline" className="text-xs bg-slate-100 text-slate-500">Nonaktif</Badge>}
                      </div>
                      <p className="font-semibold text-slate-900">{m.title}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{m.content.substring(0, 150)}...</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleToggle(m)}>
                        {m.isActive ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setEditing(m); setShowForm(true) }}>
                        <Pencil className="w-4 h-4 text-slate-600" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Trash2 className="w-4 h-4 text-red-600" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>Hapus materi ini?</AlertDialogTitle><AlertDialogDescription>Materi "{m.title}" akan dihapus permanen.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(m.id)} className="bg-red-600 hover:bg-red-700">Ya, Hapus</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {showForm && <MaterialForm material={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSaved={() => { setShowForm(false); setEditing(null); fetchMaterials() }} />}
      {showAIGenerate && <AIMaterialDialog onClose={() => setShowAIGenerate(false)} onSaved={() => { setShowAIGenerate(false); fetchMaterials() }} />}
    </div>
  )
}

function MaterialForm({ material, onClose, onSaved }: { material: Material | null; onClose: () => void; onSaved: () => void }) {
  // ── FIX: category removed, subject added for multi-mapel support ──
  const [form, setForm] = useState({
    title: material?.title ?? '',
    content: material?.content ?? '',
    targetKelas: material?.targetKelas ?? 'ALL',
    isActive: material?.isActive ?? true,
    cpId: material?.cpId ?? '',
    tpId: material?.tpId ?? '',
    subject: material?.subject ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [selectedKelas, setSelectedKelas] = useState<string[]>(
    material?.targetKelas && material.targetKelas !== 'ALL'
      ? material.targetKelas.split(',').map(k => k.trim())
      : [],
  )

  // ── Dynamic subject options based on selectedKelas ──
  // If any SMK class (11DKV/12DKV) is selected → SMK subjects
  // Otherwise → SMP subjects (Informatika default)
  const hasSMK = selectedKelas.some(k => k === '11DKV' || k === '12DKV')
  const isSMK = form.targetKelas === 'ALL' ? false : hasSMK
  const subjectOptions = isSMK
    ? ['Mata Pelajaran Kejuruan', 'Mata Pelajaran Pilihan', 'DKV', 'Komputer Akuntansi', 'Multimedia', 'TKJ', 'RPL']
    : ['Informatika', 'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Mandarin', 'IPA', 'IPS', 'Seni Budaya', 'Agama', 'PLH', 'KKA', 'Kerohanian', 'PkN', 'Penjaskes']

  // Auto-set subject when kelas selection changes (SMP ↔ SMK switch)
  useEffect(() => {
    if (form.targetKelas !== 'CUSTOM') return // only for CUSTOM mode
    const smk = selectedKelas.some(k => k === '11DKV' || k === '12DKV')
    const smp = selectedKelas.some(k => k !== '11DKV' && k !== '12DKV')
    // If switching to SMK-only selection, auto-set to Mapel Kejuruan
    if (smk && !smp && form.subject && !['Mata Pelajaran Kejuruan', 'Mata Pelajaran Pilihan', 'DKV', 'Komputer Akuntansi', 'Multimedia', 'TKJ', 'RPL'].includes(form.subject)) {
      setForm(f => ({ ...f, subject: 'Mata Pelajaran Kejuruan', cpId: '', tpId: '' }))
    }
    // If switching to SMP-only selection, auto-set to Informatika
    if (smp && !smk && form.subject && !['Informatika', 'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Mandarin', 'IPA', 'IPS', 'Seni Budaya', 'Agama', 'PLH', 'KKA', 'Kerohanian', 'PkN', 'Penjaskes'].includes(form.subject)) {
      setForm(f => ({ ...f, subject: 'Informatika', cpId: '', tpId: '' }))
    }
  }, [selectedKelas])

  // ── CP list: fetch filtered by subject + grade ──
  // FIX: Send subject as URL param to API (not just client-side filter).
  // The API /api/cp?subject=X&grade=Y now supports subject param, so it
  // returns CPs for the selected subject even if it differs from JWT subject.
  const [cpList, setCpList] = useState<CP[]>([])
  const [loadingCp, setLoadingCp] = useState(false)
  const effectiveSubject = form.subject || 'Informatika'
  const effectiveGrade = selectedKelas.length === 1
    ? (selectedKelas[0].startsWith('11') ? '11DKV' : selectedKelas[0].startsWith('12') ? '12DKV' : selectedKelas[0].charAt(0))
    : ''
  useEffect(() => {
    // Don't fetch if subject or grade not yet selected
    if (!effectiveSubject || !effectiveGrade) {
      setCpList([])
      return
    }
    setLoadingCp(true)
    setCpList([])
    const params = new URLSearchParams()
    params.set('subject', effectiveSubject)
    params.set('grade', effectiveGrade)
    fetch(`/api/cp?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.cps)) {
          setCpList(data.cps)
        } else {
          setCpList([])
        }
      })
      .catch(() => setCpList([]))
      .finally(() => setLoadingCp(false))
  }, [effectiveSubject, effectiveGrade])

  // ── TP list (loaded when CP changes) ──
  const [tpList, setTpList] = useState<TP[]>([])
  const [loadingTp, setLoadingTp] = useState(false)
  useEffect(() => {
    if (!form.cpId || form.cpId === NONE) {
      setTpList([])
      return
    }
    setLoadingTp(true)
    fetch(`/api/tp?cpId=${encodeURIComponent(form.cpId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.tps)) setTpList(data.tps)
        else setTpList([])
      })
      .catch(() => setTpList([]))
      .finally(() => setLoadingTp(false))
  }, [form.cpId])

  // ── Auto-Format Paragraf button (Bug #2 fix) ──
  const handleAutoFormat = () => {
    const sanitized = sanitizeMarkdownContent(form.content)
    setForm({ ...form, content: sanitized })
    toast.success('Teks diformat: paragraf & baris baru dirapikan')
  }

  const handleSave = async () => {
    if (!form.title || !form.content) { toast.error('Judul dan isi wajib diisi'); return }
    if (!form.subject) { toast.error('Mata pelajaran wajib diisi'); return }
    setSaving(true)
    try {
      const targetKelas = form.targetKelas === 'ALL' ? 'ALL' : selectedKelas.join(',')
      // ── FIX: subject added to payload ──
      const body = {
        title: form.title,
        content: form.content,
        targetKelas,
        isActive: form.isActive,
        subject: form.subject,
        cpId: form.cpId && form.cpId !== NONE ? form.cpId : null,
        tpId: form.cpId && form.cpId !== NONE && form.tpId && form.tpId !== NONE ? form.tpId : null,
      }
      if (material) {
        const res = await fetch(`/api/materials/${material.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Gagal')
        toast.success('Materi diperbarui')
      } else {
        const res = await fetch('/api/materials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Gagal')
        toast.success('Materi ditambahkan')
      }
      onSaved()
    } catch { toast.error('Gagal menyimpan') } finally { setSaving(false) }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{material ? 'Edit Materi' : 'Tambah Materi Belajar'}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          {/* ── Target Kelas (full-width) ── */}
          <div className="space-y-1">
            <Label htmlFor="mat-target" className="text-xs">Target Kelas</Label>
            <Select value={form.targetKelas === 'ALL' ? 'ALL' : 'CUSTOM'} onValueChange={(v) => setForm({ ...form, targetKelas: v, subject: '', cpId: '', tpId: '' })}>
              <SelectTrigger id="mat-target"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Kelas</SelectItem>
                <SelectItem value="CUSTOM">Pilih Kelas Tertentu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {form.targetKelas === 'CUSTOM' && (
            <div className="flex flex-wrap gap-2">
              {GRADE_OPTIONS.map(k => (
                <button key={k} type="button" onClick={() => {
                  setSelectedKelas(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k])
                  setForm(f => ({ ...f, cpId: '', tpId: '' })) // reset CP/TP on kelas change
                }}
                  className={`px-3 py-1 rounded-md text-xs font-medium border ${selectedKelas.includes(k) ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-300'}`}>{k}</button>
              ))}
            </div>
          )}

          {/* ── FIX: Mata Pelajaran dropdown (dynamic by kelas) ── */}
          {form.targetKelas === 'CUSTOM' && selectedKelas.length > 0 && (
            <div className="space-y-1">
              <Label htmlFor="mat-subject" className="text-xs font-medium">Mata Pelajaran *</Label>
              <Select
                value={form.subject}
                onValueChange={(v) => setForm({ ...form, subject: v, cpId: '', tpId: '' })}
              >
                <SelectTrigger id="mat-subject"><SelectValue placeholder="Pilih mapel" /></SelectTrigger>
                <SelectContent>
                  {subjectOptions.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isSMK && (
                <p className="text-xs text-emerald-600 mt-0.5">Mapel SMK — pilihan disesuaikan untuk kelas SMK</p>
              )}
            </div>
          )}
          {form.targetKelas === 'CUSTOM' && selectedKelas.length === 0 && (
            <p className="text-xs text-amber-600">⚠ Pilih minimal 1 kelas untuk mengaktifkan dropdown Mata Pelajaran</p>
          )}

          {/* ── Bug #1 fix: CP/TP cascading dropdowns ── */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-emerald-50/50 rounded-lg border border-emerald-200">
            <div className="space-y-1">
              <Label htmlFor="mat-cp" className="text-xs flex items-center gap-1">
                <Layers className="w-3 h-3" />
                Capaian Pembelajaran (CP)
              </Label>
              <Select
                value={form.cpId || NONE}
                onValueChange={(v) => setForm({ ...form, cpId: v === NONE ? '' : v, tpId: '' })}
              >
                <SelectTrigger id="mat-cp"><SelectValue placeholder={loadingCp ? 'Memuat CP...' : 'Pilih CP'} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>— Tanpa CP —</SelectItem>
                  {loadingCp ? (
                    <SelectItem value="__loading" disabled>Memuat...</SelectItem>
                  ) : cpList.length === 0 ? (
                    <SelectItem value="__empty" disabled>Belum ada CP untuk mapel ini</SelectItem>
                  ) : (
                    cpList.map((cp) => (
                      <SelectItem key={cp.id} value={cp.id}>
                        <span className="flex flex-col">
                          <span className="font-semibold text-xs">[{cp.kodeCP}] Kelas {cp.gradeLevel}</span>
                          <span className="text-xs text-slate-500 line-clamp-1">{cp.deskripsi}</span>
                        </span>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="mat-tp" className="text-xs flex items-center gap-1">
                <Target className="w-3 h-3" />
                Tujuan Pembelajaran (TP)
              </Label>
              <Select
                value={form.tpId || NONE}
                onValueChange={(v) => setForm({ ...form, tpId: v === NONE ? '' : v })}
                disabled={!form.cpId || form.cpId === NONE || loadingTp}
              >
                <SelectTrigger id="mat-tp">
                  <SelectValue placeholder={
                    !form.cpId || form.cpId === NONE
                      ? 'Pilih CP dulu'
                      : loadingTp
                        ? 'Memuat TP...'
                        : 'Pilih TP'
                  } />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>— Tanpa TP —</SelectItem>
                  {loadingTp ? (
                    <SelectItem value="__loading" disabled>Memuat...</SelectItem>
                  ) : tpList.length === 0 ? (
                    <SelectItem value="__empty" disabled>Belum ada TP untuk CP ini</SelectItem>
                  ) : (
                    tpList.map((tp) => (
                      <SelectItem key={tp.id} value={tp.id}>
                        <span className="flex flex-col">
                          <span className="font-semibold text-xs">[{tp.kodeTP}]</span>
                          <span className="text-xs text-slate-500 line-clamp-1">{tp.deskripsi}</span>
                        </span>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Judul ── */}
          <div className="space-y-1">
            <Label htmlFor="mat-title" className="text-xs">Judul Materi *</Label>
            <Input
              id="mat-title"
              name="mat-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* ── Isi Materi + Auto-Format button ── */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="mat-content" className="text-xs">Isi Materi * (mendukung markdown)</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAutoFormat}
                className="h-7 text-xs border-purple-300 text-purple-600 hover:bg-purple-50"
                title="Rapikan paragraf dan baris baru"
              >
                <Wand2 className="w-3 h-3 mr-1" />
                Auto-Format Paragraf
              </Button>
            </div>
            <Textarea
              id="mat-content"
              name="mat-content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              className="font-mono text-sm"
              placeholder="Tulis materi pembelajaran di sini. Gunakan # untuk judul, ## untuk sub-judul. Baris baru otomatis dirapikan saat disimpan."
            />
            <p className="text-xs text-slate-400">
              Tip: Salin teks dari mana saja lalu klik <b>Auto-Format</b> untuk merapikan paragraf. Saat disimpan, sistem juga akan membersihkan format otomatis.
            </p>
          </div>

          {/* ── Active checkbox ── */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="matActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" />
            <Label htmlFor="matActive" className="text-sm cursor-pointer">Materi aktif (siswa bisa lihat)</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">{saving ? 'Menyimpan...' : 'Simpan'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
