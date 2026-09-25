'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Megaphone, Trash2, RefreshCw, Send } from 'lucide-react'
import { toast } from 'sonner'
import { ALL_GRADES } from '@/lib/constants'

interface Announcement {
  id: string
  title: string
  content: string
  teacherName: string
  subject: string
  targetKelas: string
  createdAt: string
}

export function AnnouncementManager({ teacherName, teacherSubject }: { teacherName: string; teacherSubject: string }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    content: '',
    targetKelas: 'ALL',
  })

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/announcements')
      const data = await res.json()
      if (data.success) {
        setAnnouncements(data.announcements || [])
      }
    } catch {
      toast.error('Gagal memuat pengumuman')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAnnouncements() }, [fetchAnnouncements])

  const handleCreate = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Judul dan isi wajib diisi')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          content: form.content.trim(),
          targetKelas: form.targetKelas,
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Pengumuman berhasil dibuat! Siswa akan melihat notif popup.')
        setForm({ title: '', content: '', targetKelas: 'ALL' })
        fetchAnnouncements()
      } else {
        toast.error(data.error || 'Gagal membuat pengumuman')
      }
    } catch {
      toast.error('Gagal membuat pengumuman')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus pengumuman ini?')) return
    try {
      await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' })
      toast.success('Pengumuman dihapus')
      fetchAnnouncements()
    } catch {
      toast.error('Gagal menghapus')
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Megaphone className="w-4 h-4 text-violet-600" />
            Buat Pengumuman Baru
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs">Judul Pengumuman *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Contoh: Ujian Tengah Semester diundur"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Target Kelas</Label>
              <Select value={form.targetKelas} onValueChange={(v) => setForm({ ...form, targetKelas: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Semua Kelas</SelectItem>
                  {ALL_GRADES.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Isi Pengumuman *</Label>
            <Textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={4}
              placeholder="Tulis isi pengumuman di sini. Siswa akan melihat popup saat login."
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Pengumuman akan dikirim dari: <strong>{teacherName}</strong> ({teacherSubject})
            </p>
            <Button onClick={handleCreate} disabled={saving} className="bg-violet-600 hover:bg-violet-700">
              {saving ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : <Send className="w-4 h-4 mr-1" />}
              {saving ? 'Mengirim...' : 'Kirim Pengumuman'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base">Riwayat Pengumuman</CardTitle>
          <Button variant="outline" size="sm" onClick={fetchAnnouncements} disabled={loading}>
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          {loading ? (
            <div className="py-8 text-center text-slate-400"><RefreshCw className="w-6 h-6 mx-auto animate-spin mb-2" />Memuat...</div>
          ) : announcements.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <Megaphone className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Belum ada pengumuman</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {announcements.map((a) => (
                <div key={a.id} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className="text-xs bg-violet-50 text-violet-700">{a.subject}</Badge>
                        <Badge variant="outline" className="text-xs">{a.targetKelas === 'ALL' ? 'Semua Kelas' : a.targetKelas}</Badge>
                        <span className="text-xs text-slate-400">
                          {new Date(a.createdAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{a.content}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 h-8 w-8 p-0 flex-shrink-0" onClick={() => handleDelete(a.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
