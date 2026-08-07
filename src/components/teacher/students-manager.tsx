'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Pencil, Trash2, RefreshCw, KeyRound, ToggleLeft, ToggleRight, CheckCircle2, XCircle, Download, Upload, School, FileSpreadsheet, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { ALL_GRADES } from '@/lib/constants'

interface StudentRow {
  id: string; namaLengkap: string; nisn: string; kelas: string; sekolah: string;
  jenisKelamin: string; hasPassword: boolean; isActive: boolean; resultCount: number; createdAt: string;
}

const GRADE_OPTIONS = ALL_GRADES as readonly string[]

export function StudentsManager() {
  const [students, setStudents] = useState<StudentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<string>('ALL')
  const [editing, setEditing] = useState<StudentRow | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showImport, setShowImport] = useState(false)

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/teacher/students`)
      const data = await res.json()
      if (data.success) setStudents(data.students)
    } catch { toast.error('Gagal memuat data siswa') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchStudents() }, [])

  const handleToggleActive = async (s: StudentRow) => {
    try {
      await fetch(`/api/teacher/students/${s.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !s.isActive }) })
      toast.success(`Siswa ${!s.isActive ? 'diaktifkan' : 'dinonaktifkan'}`)
      fetchStudents()
    } catch { toast.error('Gagal') }
  }

  const handleDelete = async (id: string) => {
    try { await fetch(`/api/teacher/students/${id}`, { method: 'DELETE' }); toast.success('Siswa dihapus'); fetchStudents() }
    catch { toast.error('Gagal') }
  }

  const handleDownloadTemplate = () => {
    const link = document.createElement('a'); link.href = '/api/teacher/students/template'; link.download = 'template-import-siswa.xlsx'; link.click(); toast.success('Template diunduh')
  }

  // Filter by tab + search
  const filtered = students.filter((s) => {
    const matchTab = activeTab === 'ALL' || s.kelas === activeTab
    const matchSearch = !search || s.namaLengkap.toLowerCase().includes(search.toLowerCase()) || s.nisn.includes(search)
    return matchTab && matchSearch
  })

  // Group by kelas for tab counts
  const tabCounts: Record<string, number> = {}
  students.forEach(s => { tabCounts[s.kelas] = (tabCounts[s.kelas] || 0) + 1 })

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base">Data Siswa ({students.length} total)</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Input placeholder="Cari nama/NISN..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-40 md:w-48" />
              <Button variant="outline" size="sm" onClick={fetchStudents} disabled={loading}><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></Button>
              <Button variant="outline" size="sm" onClick={handleDownloadTemplate} title="Download template"><Download className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Template</span></Button>
              <Button variant="outline" size="sm" onClick={() => setShowImport(true)}><Upload className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Import</span></Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { setEditing(null); setShowForm(true) }}><Plus className="w-4 h-4 mr-1" />Tambah</Button>
            </div>
          </div>
        </CardHeader>

        {/* #4: Tab per kelas */}
        <CardContent className="pt-3">
          <div className="flex gap-1 flex-wrap mb-3 border-b border-slate-200 pb-2">
            <button onClick={() => setActiveTab('ALL')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'ALL' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              Semua ({students.length})
            </button>
            {GRADE_OPTIONS.map((g) => {
              const count = tabCounts[g] || 0
              if (count === 0 && activeTab !== g) return null
              return (
                <button key={g} onClick={() => setActiveTab(g)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === g ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {g} ({count})
                </button>
              )
            })}
          </div>

          {/* Tabel */}
          {loading ? (
            <div className="py-20 text-center text-slate-400"><RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />Memuat...</div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400"><p className="font-medium">Tidak ada siswa {activeTab !== 'ALL' ? `di kelas ${activeTab}` : ''}</p></div>
          ) : (
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10">
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>NISN</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead className="text-center hidden md:table-cell">Password</TableHead>
                    <TableHead className="text-center hidden md:table-cell">Latihan</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow key={s.id} className={s.isActive ? '' : 'opacity-50'}>
                      <TableCell><div className="font-medium text-slate-900">{s.namaLengkap}</div><div className="text-xs text-slate-500 md:hidden">{s.sekolah}</div></TableCell>
                      <TableCell className="font-mono text-xs">{s.nisn}</TableCell>
                      <TableCell><Badge variant="outline">{s.kelas}</Badge></TableCell>
                      <TableCell className="text-center hidden md:table-cell">{s.hasPassword ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <XCircle className="w-4 h-4 text-amber-500 mx-auto" />}</TableCell>
                      <TableCell className="text-center hidden md:table-cell text-sm">{s.resultCount}</TableCell>
                      <TableCell className="text-center"><Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleToggleActive(s)}>{s.isActive ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}</Button></TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setEditing(s); setShowForm(true) }}><Pencil className="w-4 h-4 text-slate-600" /></Button>
                          <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Trash2 className="w-4 h-4 text-red-600" /></Button></AlertDialogTrigger>
                            <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Hapus siswa?</AlertDialogTitle><AlertDialogDescription>{s.namaLengkap} akan dihapus permanen.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(s.id)} className="bg-red-600 hover:bg-red-700">Hapus</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && <StudentForm student={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSaved={() => { setShowForm(false); setEditing(null); fetchStudents() }} />}
      {showImport && (
        <Dialog open onOpenChange={() => setShowImport(false)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle className="flex items-center gap-2"><FileSpreadsheet className="w-5 h-5 text-emerald-600" />Import Data Siswa dari Excel/CSV</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">Langkah 1: Download Template</p>
                <p className="text-xs text-blue-700 mb-3">Unduh template Excel, isi data siswa sesuai format di sheet "Siswa".</p>
                <Button size="sm" variant="outline" className="bg-white" onClick={handleDownloadTemplate}><Download className="w-4 h-4 mr-1" />Download Template</Button>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-2">Langkah 2: Upload File</p>
                <input type="file" accept=".xlsx,.xls,.csv" onChange={(e) => { const f = e.target.files?.[0]; if (f) { /* simple upload */ const fd = new FormData(); fd.append('file', f); fetch('/api/teacher/students/import?mode=save', { method: 'POST', body: fd }).then(r => r.json()).then(d => { if (d.success) { toast.success(d.message); setShowImport(false); fetchStudents() } else { toast.error(d.error || 'Gagal') } }) } }} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function StudentForm({ student, onClose, onSaved }: { student: StudentRow | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ namaLengkap: student?.namaLengkap ?? '', nisn: student?.nisn ?? '', password: '', kelas: student?.kelas ?? '7A', sekolah: student?.sekolah ?? '', jenisKelamin: student?.jenisKelamin ?? 'Laki-laki', isActive: student?.isActive ?? true })
  const [saving, setSaving] = useState(false)
  const handleSave = async () => {
    if (!form.namaLengkap || !form.nisn || !form.kelas || !form.sekolah) { toast.error('Semua field wajib diisi'); return }
    setSaving(true)
    try {
      if (student) {
        const body: Record<string, unknown> = { namaLengkap: form.namaLengkap, nisn: form.nisn, kelas: form.kelas, sekolah: form.sekolah, jenisKelamin: form.jenisKelamin, isActive: form.isActive }
        if (form.password) body.password = form.password
        const res = await fetch(`/api/teacher/students/${student.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        if (!res.ok) throw new Error('Gagal'); toast.success('Siswa diperbarui')
      } else {
        const res = await fetch('/api/teacher/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (!res.ok) throw new Error('Gagal'); toast.success('Siswa ditambahkan')
      }
      onSaved()
    } catch { toast.error('Gagal menyimpan') } finally { setSaving(false) }
  }
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{student ? 'Edit Siswa' : 'Tambah Siswa Baru'}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1"><Label className="text-xs">Nama Lengkap *</Label><Input value={form.namaLengkap} onChange={(e) => setForm({ ...form, namaLengkap: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label className="text-xs">NISN *</Label><Input value={form.nisn} onChange={(e) => setForm({ ...form, nisn: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">Kelas *</Label><Select value={form.kelas} onValueChange={(v) => setForm({ ...form, kelas: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{GRADE_OPTIONS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select></div>
          </div>
          <div className="space-y-1"><Label className="text-xs">Asal Sekolah *</Label><Input value={form.sekolah} onChange={(e) => setForm({ ...form, sekolah: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label className="text-xs">Jenis Kelamin</Label><Select value={form.jenisKelamin} onValueChange={(v) => setForm({ ...form, jenisKelamin: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Laki-laki">Laki-laki</SelectItem><SelectItem value="Perempuan">Perempuan</SelectItem></SelectContent></Select></div>
            <div className="space-y-1"><Label className="text-xs">{student ? 'Password (kosongkan jika tetap)' : 'Password *'}</Label><Input type="text" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={student ? '••••• (tidak berubah)' : 'Set password'} /></div>
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" id="stuActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" /><Label htmlFor="stuActive" className="text-sm cursor-pointer">Akun aktif</Label></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Batal</Button><Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
