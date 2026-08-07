'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RefreshCw, Plus, ClipboardList, Send, Lock, Settings, AlertTriangle, TrendingUp, Save, PencilLine } from 'lucide-react'
import { toast } from 'sonner'
import { ALL_GRADES } from '@/lib/constants'

interface Student { id: string; namaLengkap: string; nisn: string; kelas: string; sekolah: string }
interface CalcResult {
  studentId: string; namaLengkap: string; nisn: string; kelas: string;
  NH: number; UTS: number; UAS: number; NA: number; kkm: number; status: string;
}
interface Config { kkm: number; bobotNH: number; bobotUTS: number; bobotUAS: number }
interface Bab { id: string; chapter: string; bobotTugas: number; bobotUH: number }

// Row state for bulk manual grade input form
interface BulkRow {
  studentId: string
  tugas: string   // Tugas Manual (offline)
  uh: string      // Nilai Ujian Bab (offline)
  uts: string     // Nilai Mid (offline)
  uas: string     // Nilai Akhir (offline)
}

export function GradeBook() {
  const [students, setStudents] = useState<Student[]>([])
  const [calcResults, setCalcResults] = useState<CalcResult[]>([])
  const [config, setConfig] = useState<Config>({ kkm: 75, bobotNH: 40, bobotUTS: 30, bobotUAS: 30 })
  const [babs, setBabs] = useState<Bab[]>([])
  const [loading, setLoading] = useState(true)
  const [filterKelas, setFilterKelas] = useState('ALL')
  const [showAddGrade, setShowAddGrade] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // #2 FIX: Bulk input form state
  const [bulkKelas, setBulkKelas] = useState<string>('')          // selected class for the bulk form
  const [bulkRows, setBulkRows] = useState<BulkRow[]>([])
  const [bulkBabId, setBulkBabId] = useState<string>('')           // optional: assign tugas/uh to a specific bab
  const [bulkSaving, setBulkSaving] = useState(false)
  const [bulkStudents, setBulkStudents] = useState<Student[]>([])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [studentsRes, calcRes] = await Promise.all([
        fetch(`/api/teacher/students?kelas=${filterKelas}`).then(r => r.json()),
        fetch(`/api/grades/calculate?kelas=${filterKelas !== 'ALL' ? filterKelas : ''}`).then(r => r.json()),
      ])
      if (studentsRes.success) setStudents(studentsRes.students)
      if (calcRes.success) {
        setCalcResults(calcRes.results)
        setConfig(calcRes.config)
        setBabs(calcRes.babs || [])
      }
    } catch { toast.error('Gagal memuat data') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [filterKelas])

  const classAvg = useMemo(() => {
    if (calcResults.length === 0) return 0
    return Math.round(calcResults.reduce((a, b) => a + b.NA, 0) / calcResults.length * 10) / 10
  }, [calcResults])

  const remidiCount = calcResults.filter(r => r.status === 'Remedi').length

  // #2 FIX: When a class is selected in the bulk form, fetch students for that class and seed empty rows.
  const handleBulkKelasChange = useCallback(async (kelas: string) => {
    setBulkKelas(kelas)
    if (!kelas || kelas === 'ALL') { setBulkRows([]); setBulkStudents([]); return }
    try {
      const res = await fetch(`/api/teacher/students?kelas=${kelas}`)
      const data = await res.json()
      if (data.success) {
        setBulkStudents(data.students)
        // Seed one row per student with empty inputs
        setBulkRows(data.students.map((s: Student) => ({
          studentId: s.id, tugas: '', uh: '', uts: '', uas: '',
        })))
      }
    } catch { toast.error('Gagal memuat siswa untuk kelas ini') }
  }, [])

  const updateBulkRow = (studentId: string, field: keyof Omit<BulkRow, 'studentId'>, value: string) => {
    setBulkRows(prev => prev.map(r => r.studentId === studentId ? { ...r, [field]: value } : r))
  }

  // #2 FIX: Collect all non-empty inputs and POST as a single bulk request.
  const handleBulkSave = async () => {
    const grades: Array<{ studentId: string; score: number; gradeType: string; babId?: string | null; title?: string }> = []
    for (const row of bulkRows) {
      const push = (val: string, gradeType: string, title: string) => {
        const n = parseFloat(val)
        if (val !== '' && !isNaN(n) && n >= 0 && n <= 100) {
          grades.push({ studentId: row.studentId, score: n, gradeType, babId: bulkBabId || null, title })
        }
      }
      push(row.tugas, 'tugas', 'Tugas Manual (Luring)')
      push(row.uh, 'uh', 'Ulangan Harian (Luring)')
      push(row.uts, 'uts', 'Ulangan Tengah Semester (Luring)')
      push(row.uas, 'uas', 'Ulangan Akhir Semester (Luring)')
    }

    if (grades.length === 0) { toast.warning('Tidak ada nilai yang diisi'); return }

    setBulkSaving(true)
    try {
      const res = await fetch('/api/manual-grades', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grades, isReleased: true }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan')
      toast.success(`${data.count || grades.length} nilai manual berhasil disimpan`)
      // Clear inputs after successful save
      setBulkRows(prev => prev.map(r => ({ ...r, tugas: '', uh: '', uts: '', uas: '' })))
      // Refresh calc table
      fetchData()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menyimpan nilai')
    } finally { setBulkSaving(false) }
  }

  const bulkFilledCount = useMemo(() => {
    return bulkRows.reduce((acc, r) => acc + ['tugas', 'uh', 'uts', 'uas'].filter(k => r[k as keyof BulkRow] !== '').length, 0)
  }, [bulkRows])

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">Total Siswa</div><p className="text-2xl font-bold text-slate-900">{calcResults.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">Rata-rata Kelas</div><p className="text-2xl font-bold text-emerald-600">{classAvg}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">KKM Mapel</div><p className="text-2xl font-bold text-amber-600">{config.kkm}</p></CardContent></Card>
        <Card className={remidiCount > 0 ? 'border-red-300 bg-red-50' : ''}>
          <CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">Remidi</div><p className={`text-2xl font-bold ${remidiCount > 0 ? 'text-red-600' : 'text-slate-900'}`}>{remidiCount}</p></CardContent></Card>
      </div>

      {/* Bobot Config Card */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="pt-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold">Bobot Nilai:</span>
            </div>
            <Badge className="bg-blue-100 text-blue-700">NH: {config.bobotNH}%</Badge>
            <Badge className="bg-purple-100 text-purple-700">UTS: {config.bobotUTS}%</Badge>
            <Badge className="bg-pink-100 text-pink-700">UAS: {config.bobotUAS}%</Badge>
            <Badge className="bg-amber-100 text-amber-700">KKM: {config.kkm}</Badge>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowConfig(true)}>
            <Settings className="w-4 h-4 mr-1" />Atur Bobot & KKM
          </Button>
        </CardContent>
      </Card>

      {/* #2 FIX: BULK MANUAL GRADE INPUT FORM */}
      <Card className="border-slate-900 shadow-md">
        <CardHeader className="bg-slate-900 text-white pb-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="flex items-center gap-2 text-base text-white">
              <PencilLine className="w-4 h-4 text-emerald-400" /> Input Nilai Manual (Luring)
            </CardTitle>
            {/* Big black save button in the top-right corner */}
            <Button
              size="sm"
              className="bg-black hover:bg-slate-800 text-white border border-white/20"
              onClick={handleBulkSave}
              disabled={bulkSaving || bulkRows.length === 0}
            >
              <Save className="w-4 h-4 mr-1" />
              {bulkSaving ? 'Menyimpan...' : 'Simpan Nilai Manual'}
            </Button>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Pilih kelas untuk memunculkan daftar siswa. Isi kolom nilai (0-100) sesuai jenis penilaian.
            Kosongkan kolom yang tidak diisi. Bobot nilai per-bab & NH/UTS/UAS dihitung otomatis.
          </p>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          {/* Filter row */}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Pilih Kelas *</Label>
              <Select value={bulkKelas} onValueChange={handleBulkKelasChange}>
                <SelectTrigger><SelectValue placeholder="— Pilih Kelas —" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL" disabled>Pilih kelas dulu</SelectItem>
                  {ALL_GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Bab (opsional — untuk Tugas & UH)</Label>
              <Select value={bulkBabId} onValueChange={setBulkBabId}>
                <SelectTrigger><SelectValue placeholder="— Tanpa Bab (umum) —" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">— Tanpa Bab (umum) —</SelectItem>
                  {babs.map(b => <SelectItem key={b.id} value={b.id}>{b.chapter}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk input table */}
          {!bulkKelas || bulkKelas === 'ALL' ? (
            <div className="py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
              <ClipboardList className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Pilih kelas di atas untuk memunculkan tabel siswa</p>
              <p className="text-xs mt-1">Tabel akan terisi otomatis dengan nama-nama siswa yang terdaftar di kelas tersebut</p>
            </div>
          ) : bulkStudents.length === 0 ? (
            <div className="py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
              <p className="text-sm font-medium">Belum ada siswa terdaftar di kelas {bulkKelas}</p>
              <p className="text-xs mt-1">Tambahkan siswa lewat menu "Data Siswa" terlebih dahulu</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Menampilkan <strong>{bulkStudents.length}</strong> siswa dari kelas <Badge variant="outline">{bulkKelas}</Badge></span>
                <span className="text-slate-500">{bulkFilledCount} nilai terisi</span>
              </div>
              <div className="overflow-x-auto max-h-[450px] overflow-y-auto border border-slate-200 rounded-lg">
                <Table>
                  <TableHeader className="sticky top-0 bg-slate-100 z-10">
                    <TableRow>
                      <TableHead className="w-10">No</TableHead>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead className="text-center w-32">Tugas Manual</TableHead>
                      <TableHead className="text-center w-32">Nilai Ujian Bab</TableHead>
                      <TableHead className="text-center w-28">Nilai Mid (UTS)</TableHead>
                      <TableHead className="text-center w-28">Nilai Akhir (UAS)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bulkStudents.map((s, i) => {
                      const row = bulkRows.find(r => r.studentId === s.id)
                      if (!row) return null
                      return (
                        <TableRow key={s.id}>
                          <TableCell className="text-slate-400 text-xs">{i + 1}</TableCell>
                          <TableCell>
                            <div className="font-medium text-slate-900">{s.namaLengkap}</div>
                            <div className="text-xs text-slate-500">NISN: {s.nisn}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Input type="number" min="0" max="100" placeholder="—" value={row.tugas}
                              onChange={e => updateBulkRow(s.id, 'tugas', e.target.value)}
                              className="w-20 mx-auto text-center" />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input type="number" min="0" max="100" placeholder="—" value={row.uh}
                              onChange={e => updateBulkRow(s.id, 'uh', e.target.value)}
                              className="w-20 mx-auto text-center" />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input type="number" min="0" max="100" placeholder="—" value={row.uts}
                              onChange={e => updateBulkRow(s.id, 'uts', e.target.value)}
                              className="w-20 mx-auto text-center" />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input type="number" min="0" max="100" placeholder="—" value={row.uas}
                              onChange={e => updateBulkRow(s.id, 'uas', e.target.value)}
                              className="w-20 mx-auto text-center" />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-black hover:bg-slate-800 text-white"
                  onClick={handleBulkSave}
                  disabled={bulkSaving || bulkRows.length === 0 || bulkFilledCount === 0}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {bulkSaving ? 'Menyimpan...' : `Simpan ${bulkFilledCount} Nilai Manual`}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Tabel Nilai Akhir */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList className="w-4 h-4 text-emerald-600" /> Daftar Nilai Akhir (NA)
            </CardTitle>
            <div className="flex gap-2">
              <Select value={filterKelas} onValueChange={setFilterKelas}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="ALL">Semua</SelectItem>{ALL_GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            NA = (NH × {config.bobotNH}%) + (UTS × {config.bobotUTS}%) + (UAS × {config.bobotUAS}%). NH = rata-rata nilai per bab.
            Tugas daring otomatis masuk. Klik "Input Nilai" untuk input luring (UH/UTS/UAS) per siswa.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-20 text-center text-slate-400"><RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />Memuat...</div>
          ) : (
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10">
                  <TableRow>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead className="text-center">NH</TableHead>
                    <TableHead className="text-center hidden md:table-cell">UTS</TableHead>
                    <TableHead className="text-center hidden md:table-cell">UAS</TableHead>
                    <TableHead className="text-center">NA</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calcResults.map((r) => (
                    <TableRow key={r.studentId} className={r.status === 'Remedi' ? 'bg-red-50' : ''}>
                      <TableCell><div className="font-medium">{r.namaLengkap}</div><div className="text-xs text-slate-500">{r.nisn}</div></TableCell>
                      <TableCell><Badge variant="outline">{r.kelas}</Badge></TableCell>
                      <TableCell className="text-center font-semibold text-blue-600">{r.NH || '-'}</TableCell>
                      <TableCell className="text-center hidden md:table-cell font-semibold text-purple-600">{r.UTS || '-'}</TableCell>
                      <TableCell className="text-center hidden md:table-cell font-semibold text-pink-600">{r.UAS || '-'}</TableCell>
                      <TableCell className="text-center"><span className={`text-lg font-bold ${r.NA >= r.kkm ? 'text-emerald-600' : 'text-red-600'}`}>{r.NA || '-'}</span></TableCell>
                      <TableCell className="text-center">
                        {r.NA > 0 && r.NA < r.kkm ? (
                          <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" />Remidi</Badge>
                        ) : r.NA > 0 ? (
                          <Badge className="bg-emerald-100 text-emerald-700"><TrendingUp className="w-3 h-3 mr-1" />Tuntas</Badge>
                        ) : (
                          <span className="text-slate-300 text-xs">Belum ada nilai</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" variant="outline" onClick={() => {
                          const s = students.find(s => s.id === r.studentId)
                          if (s) { setSelectedStudent(s); setShowAddGrade(true) }
                        }}><Plus className="w-3 h-3 mr-1" />Input Nilai</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {showConfig && <ConfigDialog config={config} babs={babs} onClose={() => setShowConfig(false)} onSaved={() => { setShowConfig(false); fetchData() }} />}
      {showAddGrade && selectedStudent && (
        <AddGradeDialog student={selectedStudent} babs={babs} onClose={() => { setShowAddGrade(false); setSelectedStudent(null) }} onSaved={() => { setShowAddGrade(false); setSelectedStudent(null); fetchData() }} />
      )}
    </div>
  )
}

function ConfigDialog({ config, babs, onClose, onSaved }: { config: Config; babs: Bab[]; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ kkm: String(config.kkm), bobotNH: String(config.bobotNH), bobotUTS: String(config.bobotUTS), bobotUAS: String(config.bobotUAS) })
  const [saving, setSaving] = useState(false)

  const total = (parseFloat(form.bobotNH) || 0) + (parseFloat(form.bobotUTS) || 0) + (parseFloat(form.bobotUAS) || 0)

  const handleSave = async () => {
    if (Math.abs(total - 100) > 0.01) { toast.error(`Total bobot harus 100%. Saat ini: ${total}%`); return }
    setSaving(true)
    try {
      const res = await fetch('/api/subject-config', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      toast.success('Bobot & KKM disimpan')
      onSaved()
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Gagal') } finally { setSaving(false) }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle className="flex items-center gap-2"><Settings className="w-4 h-4 text-amber-600" />Atur Bobot Nilai & KKM</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
            <p className="font-semibold mb-1">Rumus Nilai Akhir:</p>
            <p>NA = (NH × %NH) + (UTS × %UTS) + (UAS × %UAS)</p>
            <p className="mt-1">NH = Rata-rata Nilai per Bab</p>
            <p>Nilai Bab = (Tugas × %Tugas) + (UH × %UH)</p>
          </div>
          <div className="space-y-1"><Label className="text-xs">KKM Mapel</Label><Input type="number" min="0" max="100" value={form.kkm} onChange={(e) => setForm({ ...form, kkm: e.target.value })} /></div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1"><Label className="text-xs">% NH</Label><Input type="number" min="0" max="100" value={form.bobotNH} onChange={(e) => setForm({ ...form, bobotNH: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">% UTS</Label><Input type="number" min="0" max="100" value={form.bobotUTS} onChange={(e) => setForm({ ...form, bobotUTS: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">% UAS</Label><Input type="number" min="0" max="100" value={form.bobotUAS} onChange={(e) => setForm({ ...form, bobotUAS: e.target.value })} /></div>
          </div>
          <div className={`p-2 rounded-lg text-center text-sm font-bold ${Math.abs(total - 100) < 0.01 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            Total: {total}% {Math.abs(total - 100) < 0.01 ? '✓' : '(harus 100%)'}
          </div>
          {babs.length > 0 && (
            <div className="border-t pt-2">
              <Label className="text-xs font-semibold">Bobot per Bab (diatur di menu CP & TP):</Label>
              <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                {babs.map(b => (
                  <div key={b.id} className="flex justify-between text-xs bg-slate-50 px-2 py-1 rounded">
                    <span className="truncate">{b.chapter}</span>
                    <span className="text-slate-500">Tugas {b.bobotTugas}% • UH {b.bobotUH}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Batal</Button><Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AddGradeDialog({ student, babs, onClose, onSaved }: { student: Student; babs: Bab[]; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ title: '', score: '', gradeType: 'uh', babId: '', description: '' })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.title || form.score === '') { toast.error('Judul dan nilai wajib diisi'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/manual-grades', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: student.id, ...form, score: parseFloat(form.score), isReleased: true }),
      })
      if (!res.ok) throw new Error('Gagal')
      toast.success('Nilai ditambahkan')
      onSaved()
    } catch { toast.error('Gagal') } finally { setSaving(false) }
  }

  const gradeTypes = [
    { value: 'tugas', label: 'Tugas (per Bab)' },
    { value: 'uh', label: 'Ulangan Harian (per Bab)' },
    { value: 'uts', label: 'Ulangan Tengah Semester' },
    { value: 'uas', label: 'Ulangan Akhir Semester' },
  ]

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Input Nilai Manual</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="bg-slate-50 p-3 rounded-lg"><p className="text-sm font-medium">{student.namaLengkap}</p><p className="text-xs text-slate-500">{student.kelas} • NISN: {student.nisn}</p></div>
          <div className="space-y-1">
            <Label className="text-xs">Jenis Nilai</Label>
            <Select value={form.gradeType} onValueChange={(v) => setForm({ ...form, gradeType: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{gradeTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          {(form.gradeType === 'tugas' || form.gradeType === 'uh') && (
            <div className="space-y-1">
              <Label className="text-xs">Bab (CP/TP)</Label>
              <Select value={form.babId} onValueChange={(v) => setForm({ ...form, babId: v })}>
                <SelectTrigger><SelectValue placeholder="Pilih bab..." /></SelectTrigger>
                <SelectContent>{babs.map(b => <SelectItem key={b.id} value={b.id}>{b.chapter} (Tugas {b.bobotTugas}% / UH {b.bobotUH}%)</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-1"><Label className="text-xs">Judul Penilaian *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Contoh: Ulangan Harian Bab 1" /></div>
          <div className="space-y-1"><Label className="text-xs">Nilai (0-100) *</Label><Input type="number" min="0" max="100" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Batal</Button><Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
