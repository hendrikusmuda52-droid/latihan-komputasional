'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2, RefreshCw, ToggleLeft, ToggleRight, BookOpen, FileText } from 'lucide-react'
import { toast } from 'sonner'

interface Material {
  id: string; title: string; content: string; targetKelas: string;
  category: string; isActive: boolean; createdAt: string; updatedAt: string;
}

const GRADE_OPTIONS = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B']
const CATEGORIES = ['Berpikir Komputasional', 'Komputer & Internet', 'Etika Digital', 'Keamanan Digital', 'Mengetik', 'Umum']

export function MaterialsManager() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Material | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchMaterials = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/materials')
      const data = await res.json()
      if (data.success) setMaterials(data.materials)
    } catch { toast.error('Gagal memuat materi') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchMaterials() }, [])

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
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="w-4 h-4 text-emerald-600" /> Materi Belajar
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchMaterials} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { setEditing(null); setShowForm(true) }}>
                <Plus className="w-4 h-4 mr-1" /> Tambah Materi
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Materi belajar untuk siswa. Siswa bisa lihat materi aktif di dashboard mereka.</p>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-20 text-center text-slate-400"><RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />Memuat...</div>
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
    </div>
  )
}

function MaterialForm({ material, onClose, onSaved }: { material: Material | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    title: material?.title ?? '', content: material?.content ?? '',
    targetKelas: material?.targetKelas ?? 'ALL', category: material?.category ?? 'Umum', isActive: material?.isActive ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [selectedKelas, setSelectedKelas] = useState<string[]>(material?.targetKelas && material.targetKelas !== 'ALL' ? material.targetKelas.split(',').map(k => k.trim()) : [])

  const handleSave = async () => {
    if (!form.title || !form.content) { toast.error('Judul dan isi wajib diisi'); return }
    setSaving(true)
    try {
      const targetKelas = form.targetKelas === 'ALL' ? 'ALL' : selectedKelas.join(',')
      const body = { ...form, targetKelas }
      if (material) {
        const res = await fetch(`/api/materials/${material.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        if (!res.ok) throw new Error('Gagal')
        toast.success('Materi diperbarui')
      } else {
        const res = await fetch('/api/materials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
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
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Kategori</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Target Kelas</Label>
              <Select value={form.targetKelas === 'ALL' ? 'ALL' : 'CUSTOM'} onValueChange={(v) => setForm({ ...form, targetKelas: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="ALL">Semua Kelas</SelectItem><SelectItem value="CUSTOM">Pilih Kelas</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          {form.targetKelas === 'CUSTOM' && (
            <div className="flex flex-wrap gap-2">
              {GRADE_OPTIONS.map(k => (
                <button key={k} type="button" onClick={() => setSelectedKelas(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k])}
                  className={`px-3 py-1 rounded-md text-xs font-medium border ${selectedKelas.includes(k) ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-300'}`}>{k}</button>
              ))}
            </div>
          )}
          <div className="space-y-1">
            <Label className="text-xs">Judul Materi *</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Isi Materi * (mendukung markdown)</Label>
            <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} className="font-mono text-sm" placeholder="Tulis materi pembelajaran di sini..." />
          </div>
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
