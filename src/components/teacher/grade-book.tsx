'use client'

import { useEffect, useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RefreshCw, Plus, ClipboardList, Send, Lock, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

interface Student {
  id: string; namaLengkap: string; nisn: string; kelas: string; sekolah: string;
}
interface GradeRow {
  id: string; studentId: string; student: { namaLengkap: string; nisn: string; kelas: string; sekolah: string }
  title: string; score: number; description: string; isReleased: boolean; createdAt: string;
}

const GRADE_OPTIONS = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B']

export function GradeBook() {
  const [students, setStudents] = useState<Student[]>([])
  const [grades, setGrades] = useState<GradeRow[]>([])
  const [autoResults, setAutoResults] = useState<Record<string, { totalScore: number; isReleased: boolean }>>({})
  const [loading, setLoading] = useState(true)
  const [filterKelas, setFilterKelas] = useState('ALL')
  const [showAddGrade, setShowAddGrade] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [studentsRes, gradesRes, resultsRes] = await Promise.all([
        fetch(`/api/teacher/students?kelas=${filterKelas}`).then(r => r.json()),
        fetch(`/api/manual-grades?kelas=${filterKelas}`).then(r => r.json()),
        fetch('/api/dashboard').then(r => r.json()),
      ])
      if (studentsRes.success) setStudents(studentsRes.students)
      if (gradesRes.success) setGrades(gradesRes.grades)
      // Map auto results by studentId
      const resultMap: Record<string, { totalScore: number; isReleased: boolean }> = {}
      if (resultsRes.success) {
        for (const r of resultsRes.data) {
          if (!resultMap[r.studentId] || new Date(r.completedAt) > new Date(resultMap[r.studentId].completedAt || 0)) {
            resultMap[r.studentId] = { totalScore: r.totalScore, isReleased: r.isReleased, completedAt: r.completedAt }
          }
        }
      }
      setAutoResults(resultMap)
    } catch { toast.error('Gagal memuat data') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [filterKelas])

  const handleReleaseGrade = async (id: string, isReleased: boolean) => {
    try {
      await fetch(`/api/manual-grades/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isReleased: !isReleased }) })
      toast.success(isReleased ? 'Rilis dibatalkan' : 'Nilai dirilis ke siswa')
      fetchData()
    } catch { toast.error('Gagal') }
  }

  const classAvg = useMemo(() => {
    if (students.length === 0) return 0
    const scores = students.map(s => {
      const auto = autoResults[s.id]
      const manual = grades.filter(g => g.studentId === s.id && g.isReleased)
      const autoScore = auto?.isReleased ? auto.totalScore : null
      const manualScores = manual.map(g => g.score)
      const allScores = [...(autoScore !== null ? [autoScore] : []), ...manualScores]
      return allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : null
    }).filter(s => s !== null) as number[]
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  }, [students, grades, autoResults])

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">Total Siswa</div><p className="text-2xl font-bold text-slate-900">{students.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">Rata-rata Kelas</div><p className="text-2xl font-bold text-emerald-600">{classAvg}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">Nilai Manual Input</div><p className="text-2xl font-bold text-blue-600">{grades.length}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList className="w-4 h-4 text-emerald-600" /> Daftar Nilai Siswa
            </CardTitle>
            <div className="flex gap-2">
              <Select value={filterKelas} onValueChange={setFilterKelas}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="ALL">Semua</SelectItem>{GRADE_OPTIONS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Nilai otomatis dari latihan + nilai manual dari guru. Klik nama siswa untuk input nilai manual.</p>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-20 text-center text-slate-400"><RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />Memuat...</div>
          ) : (
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10">
                  <TableRow>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead className="text-center">Nilai Latihan (Otomatis)</TableHead>
                    <TableHead className="text-center">Nilai Manual</TableHead>
                    <TableHead className="text-center">Rata-rata</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((s) => {
                    const auto = autoResults[s.id]
                    const manual = grades.filter(g => g.studentId === s.id)
                    const manualReleased = manual.filter(g => g.isReleased)
                    const autoScore = auto?.isReleased ? auto.totalScore : null
                    const manualScores = manualReleased.map(g => g.score)
                    const allScores = [...(autoScore !== null ? [autoScore] : []), ...manualScores]
                    const avg = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : null
                    return (
                      <TableRow key={s.id}>
                        <TableCell><div className="font-medium text-slate-900">{s.namaLengkap}</div><div className="text-xs text-slate-500">{s.nisn}</div></TableCell>
                        <TableCell><Badge variant="outline">{s.kelas}</Badge></TableCell>
                        <TableCell className="text-center">
                          {autoScore !== null ? <span className="font-bold text-emerald-600">{autoScore}</span> : auto ? <Badge className="bg-amber-100 text-amber-700"><Lock className="w-3 h-3 mr-1" />Belum Dirilis</Badge> : <span className="text-slate-300">-</span>}
                        </TableCell>
                        <TableCell className="text-center">
                          {manualScores.length > 0 ? <span className="font-bold text-blue-600">{Math.round(manualScores.reduce((a, b) => a + b, 0) / manualScores.length)}</span> : <span className="text-slate-300">-</span>}
                        </TableCell>
                        <TableCell className="text-center"><span className="font-bold text-slate-900">{avg ?? '-'}</span></TableCell>
                        <TableCell className="text-center">
                          <Button size="sm" variant="outline" onClick={() => { setSelectedStudent(s); setShowAddGrade(true) }}>
                            <Plus className="w-3 h-3 mr-1" />Input Nilai
                          </Button>
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

      {/* Daftar nilai manual */}
      {grades.length > 0 && (
        <Card>
          <CardHeader className="bg-slate-50 pb-3"><CardTitle className="text-base">Nilai Manual yang Diinput</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {grades.map((g) => (
                <div key={g.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{g.student.namaLengkap} ({g.student.kelas})</p>
                    <p className="text-xs text-slate-500">{g.title} — Nilai: <strong>{g.score}</strong></p>
                  </div>
                  <div className="flex items-center gap-2">
                    {g.isReleased ? <Badge className="bg-emerald-100 text-emerald-700">Dirilis</Badge> : <Badge className="bg-amber-100 text-amber-700">Belum</Badge>}
                    <Button size="sm" variant="ghost" onClick={() => handleReleaseGrade(g.id, g.isReleased)}>
                      {g.isReleased ? <><Lock className="w-3 h-3 mr-1" />Batal</> : <><Send className="w-3 h-3 mr-1" />Rilis</>}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {showAddGrade && selectedStudent && (
        <AddGradeDialog student={selectedStudent} onClose={() => { setShowAddGrade(false); setSelectedStudent(null) }} onSaved={() => { setShowAddGrade(false); setSelectedStudent(null); fetchData() }} />
      )}
    </div>
  )
}

function AddGradeDialog({ student, onClose, onSaved }: { student: Student; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ title: '', score: '', description: '', isReleased: false })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.title || form.score === '') { toast.error('Judul dan nilai wajib diisi'); return }
    const score = parseFloat(form.score)
    if (isNaN(score) || score < 0 || score > 100) { toast.error('Nilai harus 0-100'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/manual-grades', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentId: student.id, ...form, score }) })
      if (!res.ok) throw new Error('Gagal')
      toast.success('Nilai berhasil ditambahkan')
      onSaved()
    } catch { toast.error('Gagal menyimpan') } finally { setSaving(false) }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Input Nilai Manual</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="bg-slate-50 p-3 rounded-lg"><p className="text-sm font-medium">{student.namaLengkap}</p><p className="text-xs text-slate-500">{student.kelas} • NISN: {student.nisn}</p></div>
          <div className="space-y-1"><Label className="text-xs">Nama Penilaian *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Contoh: Ulangan Harian 1" /></div>
          <div className="space-y-1"><Label className="text-xs">Nilai (0-100) *</Label><Input type="number" min="0" max="100" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} /></div>
          <div className="space-y-1"><Label className="text-xs">Keterangan</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="gradeRelease" checked={form.isReleased} onChange={(e) => setForm({ ...form, isReleased: e.target.checked })} className="w-4 h-4" /><Label htmlFor="gradeRelease" className="text-sm cursor-pointer">Rilis ke siswa (siswa bisa lihat)</Label></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Batal</Button><Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
