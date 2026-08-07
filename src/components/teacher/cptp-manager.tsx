'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2, RefreshCw, Target, BookOpen, ToggleLeft, ToggleRight, Settings } from 'lucide-react'
import { toast } from 'sonner'
import { GRADE_TIERS } from '@/lib/constants'

interface Objective {
  id: string; subject: string; gradeLevel: string; chapter: string; cp: string; tp: string; isActive: boolean; createdAt: string;
}

export function CPTPManager() {
  const [objectives, setObjectives] = useState<Objective[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Objective | null>(null)
  const [kkm, setKkm] = useState(75)
  const [showKKM, setShowKKM] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [objRes, kkmRes] = await Promise.all([
        fetch('/api/learning-objectives').then(r => r.json()),
        fetch('/api/subject-config').then(r => r.json()),
      ])
      if (objRes.success) setObjectives(objRes.objectives)
      if (kkmRes.success) setKkm(kkmRes.config.kkm)
    } catch { toast.error('Gagal memuat data') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id: string) => {
    try { await fetch(`/api/learning-objectives/${id}`, { method: 'DELETE' }); toast.success('CP & TP dihapus'); fetchData() }
    catch { toast.error('Gagal') }
  }

  const handleToggle = async (o: Objective) => {
    try { await fetch(`/api/learning-objectives/${o.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !o.isActive }) }); fetchData() }
    catch { toast.error('Gagal') }
  }

  const handleSaveKKM = async () => {
    try { await fetch('/api/subject-config', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kkm }) }); toast.success(`KKM diset ke ${kkm}`); setShowKKM(false) }
    catch { toast.error('Gagal') }
  }

  return (
    <div className="space-y-4">
      {/* KKM Card */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center"><Settings className="w-5 h-5 text-white" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-900">KKM Mapel: {kkm}</p>
              <p className="text-xs text-slate-500">Siswa di bawah KKM = status Remedi</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowKKM(true)}>Ubah KKM</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base"><Target className="w-4 h-4 text-emerald-600" /> CP & TP (Capaian & Tujuan Pembelajaran)</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { setEditing(null); setShowForm(true) }}><Plus className="w-4 h-4 mr-1" />Tambah CP & TP</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? <div className="py-20 text-center text-slate-400"><RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />Memuat...</div> :
           objectives.length === 0 ? <div className="py-12 text-center text-slate-400"><Target className="w-10 h-10 mx-auto mb-2 opacity-50" /><p className="font-medium">Belum ada CP & TP</p></div> :
           <div className="space-y-2 max-h-[500px] overflow-y-auto">
             {objectives.map((o) => (
               <div key={o.id} className={`p-3 border rounded-lg ${o.isActive ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-60'}`}>
                 <div className="flex items-start justify-between gap-3">
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2 mb-1 flex-wrap">
                       <Badge variant="outline" className="text-xs">Kelas {o.gradeLevel}</Badge>
                       <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700">{o.chapter}</Badge>
                       {!o.isActive && <Badge className="bg-slate-200 text-slate-600 text-xs">Nonaktif</Badge>}
                     </div>
                     <p className="text-sm font-semibold text-slate-900 mb-1">CP: {o.cp.substring(0, 100)}{o.cp.length > 100 ? '...' : ''}</p>
                     <p className="text-xs text-slate-500">TP: {o.tp.split('\n').map(t => t.trim()).filter(Boolean).length} poin</p>
                   </div>
                   <div className="flex gap-1">
                     <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleToggle(o)}>{o.isActive ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}</Button>
                     <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setEditing(o); setShowForm(true) }}><Pencil className="w-4 h-4 text-slate-600" /></Button>
                     <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Trash2 className="w-4 h-4 text-red-600" /></Button></AlertDialogTrigger>
                       <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Hapus CP & TP?</AlertDialogTitle><AlertDialogDescription>Data akan dihapus permanen.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(o.id)} className="bg-red-600 hover:bg-red-700">Hapus</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                     </AlertDialog>
                   </div>
                 </div>
               </div>
             ))}
           </div>}
        </CardContent>
      </Card>

      {showForm && <CPTPForm editing={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSaved={() => { setShowForm(false); setEditing(null); fetchData() }} />}
      {showKKM && (
        <Dialog open onOpenChange={setShowKKM}>
          <DialogContent className="max-w-xs">
            <DialogHeader><DialogTitle>Set KKM Mapel</DialogTitle></DialogHeader>
            <div className="space-y-2"><Label className="text-xs">Nilai KKM (0-100)</Label><Input type="number" min="0" max="100" value={kkm} onChange={(e) => setKkm(parseFloat(e.target.value) || 75)} /></div>
            <DialogFooter><Button variant="outline" onClick={() => setShowKKM(false)}>Batal</Button><Button onClick={handleSaveKKM} className="bg-emerald-600 hover:bg-emerald-700">Simpan</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function CPTPForm({ editing, onClose, onSaved }: { editing: Objective | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ gradeLevel: editing?.gradeLevel ?? '7', chapter: editing?.chapter ?? '', cp: editing?.cp ?? '', tp: editing?.tp ?? '' })
  const [saving, setSaving] = useState(false)
  const handleSave = async () => {
    if (!form.chapter || !form.cp || !form.tp) { toast.error('Semua field wajib diisi'); return }
    setSaving(true)
    try {
      if (editing) {
        const res = await fetch(`/api/learning-objectives/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (!res.ok) throw new Error('Gagal'); toast.success('CP & TP diperbarui')
      } else {
        const res = await fetch('/api/learning-objectives', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (!res.ok) throw new Error('Gagal'); toast.success('CP & TP ditambahkan')
      }
      onSaved()
    } catch { toast.error('Gagal menyimpan') } finally { setSaving(false) }
  }
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{editing ? 'Edit CP & TP' : 'Tambah CP & TP'}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label className="text-xs">Jenjang/Kelas</Label><Select value={form.gradeLevel} onValueChange={(v) => setForm({ ...form, gradeLevel: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{GRADE_TIERS.map(g => <SelectItem key={g} value={g}>Kelas {g}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1"><Label className="text-xs">Bab/Pokok Bahasan *</Label><Input value={form.chapter} onChange={(e) => setForm({ ...form, chapter: e.target.value })} placeholder="Contoh: Bab 1 - Pengenalan" /></div>
          </div>
          <div className="space-y-1"><Label className="text-xs">Capaian Pembelajaran (CP) *</Label><Textarea value={form.cp} onChange={(e) => setForm({ ...form, cp: e.target.value })} rows={3} placeholder="Tulis CP untuk bab ini..." /></div>
          <div className="space-y-1"><Label className="text-xs">Tujuan Pembelajaran (TP) * — Satu poin per baris</Label><Textarea value={form.tp} onChange={(e) => setForm({ ...form, tp: e.target.value })} rows={5} placeholder={'TP 1: ...\nTP 2: ...\nTP 3: ...'} /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Batal</Button><Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
