'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2, CheckCircle2, Circle, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

interface TypingText {
  id: string
  gradeLevel: string
  title: string
  content: string
  isStructured: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const GRADE_OPTIONS = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '11DKV', '12DKV']

export function TextManager() {
  const [texts, setTexts] = useState<TypingText[]>([])
  const [loading, setLoading] = useState(true)
  const [filterGrade, setFilterGrade] = useState<string>('ALL')
  const [editing, setEditing] = useState<TypingText | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchTexts = async () => {
    setLoading(true)
    try {
      const url = filterGrade === 'ALL' ? '/api/typing-texts' : `/api/typing-texts?grade=${filterGrade}`
      const res = await fetch(url)
      const data = await res.json()
      if (data.success) setTexts(data.texts)
    } catch {
      toast.error('Gagal memuat teks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTexts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterGrade])

  const handleSetActive = async (t: TypingText) => {
    try {
      const res = await fetch(`/api/typing-texts/${t.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: true }),
      })
      if (!res.ok) throw new Error('Gagal')
      toast.success(`Teks "${t.title}" diaktifkan untuk kelas ${t.gradeLevel}`)
      fetchTexts()
    } catch {
      toast.error('Gagal mengaktifkan teks')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/typing-texts/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal')
      toast.success('Teks dihapus')
      fetchTexts()
    } catch {
      toast.error('Gagal menghapus teks')
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base">Teks Bacaan Mengetik</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={filterGrade} onValueChange={setFilterGrade}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Semua Kelas</SelectItem>
                  {GRADE_OPTIONS.map((g) => (
                    <SelectItem key={g} value={g}>Kelas {g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={fetchTexts} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  setEditing(null)
                  setShowForm(true)
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Tambah Teks
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Hanya 1 teks aktif per kelas yang akan digunakan saat siswa latihan.
            Kelas 9 menggunakan format markdown (#, ##, ###).
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              Memuat...
            </div>
          ) : texts.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <p className="font-medium">Belum ada teks</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {texts.map((t) => (
                <div
                  key={t.id}
                  className={`p-3 border rounded-lg ${t.isActive ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className="text-xs bg-slate-100">
                          Kelas {t.gradeLevel}
                        </Badge>
                        {t.isStructured && (
                          <Badge variant="outline" className="text-xs bg-indigo-50 text-indigo-700">
                            Format Markdown
                          </Badge>
                        )}
                        {t.isActive ? (
                          <Badge variant="outline" className="text-xs bg-emerald-100 text-emerald-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Aktif
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs bg-slate-100 text-slate-500">
                            <Circle className="w-3 h-3 mr-1" /> Nonaktif
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-800 mb-1">{t.title}</p>
                      <p className="text-xs text-slate-500">
                        {t.content.length.toLocaleString('id-ID')} karakter • Update:{' '}
                        {new Date(t.updatedAt).toLocaleDateString('id-ID')}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 italic">
                        {t.content.substring(0, 150)}...
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {!t.isActive && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-emerald-700 hover:bg-emerald-50"
                          onClick={() => handleSetActive(t)}
                          title="Jadikan teks aktif"
                        >
                          Aktifkan
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setEditing(t)
                          setShowForm(true)
                        }}
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 text-slate-600" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Hapus">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus teks ini?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Teks "{t.title}" akan dihapus permanen.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(t.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Ya, Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
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

      {showForm && (
        <TextForm
          text={editing}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSaved={() => {
            setShowForm(false)
            setEditing(null)
            fetchTexts()
          }}
        />
      )}
    </div>
  )
}

function TextForm({
  text,
  onClose,
  onSaved,
}: {
  text: TypingText | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState({
    gradeLevel: text?.gradeLevel ?? '7A',
    title: text?.title ?? '',
    content: text?.content ?? '',
    isStructured: text?.isStructured ?? false,
    makeActive: true,
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast.error('Judul dan isi teks wajib diisi')
      return
    }
    if (form.content.length < 100) {
      toast.error('Teks terlalu pendek (minimal 100 karakter)')
      return
    }
    setSaving(true)
    try {
      if (text) {
        // Edit existing
        const res = await fetch(`/api/typing-texts/${text.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: form.title,
            content: form.content,
            isStructured: form.isStructured,
            isActive: text.isActive,
          }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal')
        }
        toast.success('Teks diperbarui')
      } else {
        // Create new
        const res = await fetch('/api/typing-texts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal')
        }
        toast.success('Teks ditambahkan')
      }
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menyimpan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{text ? 'Edit Teks Bacaan' : 'Tambah Teks Bacaan Baru'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Kelas</Label>
              <Select
                value={form.gradeLevel}
                onValueChange={(v) => setForm({ ...form, gradeLevel: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GRADE_OPTIONS.map((g) => (
                    <SelectItem key={g} value={g}>Kelas {g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Format</Label>
              <Select
                value={form.isStructured ? 'structured' : 'plain'}
                onValueChange={(v) => setForm({ ...form, isStructured: v === 'structured' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plain">Teks Biasa (kelas 8)</SelectItem>
                  <SelectItem value="structured">Markdown - Heading (kelas 9)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Judul Teks</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Contoh: Laporan Berpikir Komputasional"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">
              Isi Teks ({form.content.length.toLocaleString('id-ID')} karakter)
              {form.isStructured && (
                <span className="ml-2 text-indigo-600">
                  • Gunakan # untuk judul, ## sub-judul, ### sub-sub-judul
                </span>
              )}
            </Label>
            <Textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={16}
              className="font-mono text-sm"
              placeholder={form.isStructured
                ? '# Judul Utama\n\n## Sub Judul\n\nIsi paragraf...\n\n### Sub-Sub Judul\n\nIsi paragraf...'
                : 'Tulis teks bacaan di sini...'
              }
            />
          </div>

          {!text && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="makeActive"
                checked={form.makeActive}
                onChange={(e) => setForm({ ...form, makeActive: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="makeActive" className="text-sm cursor-pointer">
                Jadikan teks aktif untuk kelas ini (menonaktifkan teks lain)
              </Label>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
