'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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
import { Calendar, Users, Save, RefreshCw, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react'
import { ALL_GRADES } from '@/lib/constants'
import { useResilientFetch } from '@/lib/use-resilient-fetch'

interface Student {
  id: string
  namaLengkap: string
  nisn: string
  kelas: string
}

type Status = 'H' | 'S' | 'I' | 'A'

interface AttendanceRecord {
  studentId: string
  status: Status
  keterangan: string
}

interface StatRow {
  studentId: string
  namaLengkap: string
  nisn: string
  H: number
  S: number
  I: number
  A: number
  total: number
  percentage: number
}

const SAFE_GRADES = (ALL_GRADES || []) as readonly string[]
const NONE = '__none__'

const STATUS_OPTIONS: { value: Status; label: string; color: string }[] = [
  { value: 'H', label: 'H', color: 'text-emerald-600' },
  { value: 'S', label: 'S', color: 'text-amber-600' },
  { value: 'I', label: 'I', color: 'text-blue-600' },
  { value: 'A', label: 'A', color: 'text-red-600' },
]

function todayStr(): string {
  const d = new Date()
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tz).toISOString().split('T')[0]
}

export function AttendanceManager() {
  const [kelas, setKelas] = useState<string>(NONE)
  const [tanggal, setTanggal] = useState<string>(todayStr())
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceRecord>>({})
  const [saving, setSaving] = useState(false)

  // ── RESILIENT FETCH: students for kelas (enabled when kelas selected) ──
  const studentsUrl = kelas !== NONE ? `/api/teacher/students?kelas=${encodeURIComponent(kelas)}` : ''
  const { data: studentsData, loading: loadingStudents, error: studentsError, refetch: refetchStudents, retryCount: retryStudents } = useResilientFetch<{
    success: boolean
    students: Student[]
  }>(studentsUrl, { deps: [kelas], enabled: kelas !== NONE })

  const students = studentsData?.students ?? []

  // ── RESILIENT FETCH: existing attendance for kelas+tanggal ──
  const attendanceUrl = kelas !== NONE && tanggal
    ? `/api/attendance?kelas=${encodeURIComponent(kelas)}&tanggal=${encodeURIComponent(tanggal)}`
    : ''
  const { data: attendanceData, loading: loadingAttendance } = useResilientFetch<{
    success: boolean
    records: Array<{ studentId: string; status: string; keterangan: string }>
  }>(attendanceUrl, { deps: [kelas, tanggal], enabled: kelas !== NONE && !!tanggal })

  // ── RESILIENT FETCH: statistics for kelas ──
  const statsUrl = kelas !== NONE ? `/api/attendance?kelas=${encodeURIComponent(kelas)}` : ''
  const { data: statsData, loading: loadingStats, error: statsError, refetch: refetchStats, retryCount: retryStats } = useResilientFetch<{
    success: boolean
    stats: StatRow[]
  }>(statsUrl, { deps: [kelas], enabled: kelas !== NONE })

  const stats = statsData?.stats ?? []

  // ── Build attendanceMap from students + existing attendance records ──
  useEffect(() => {
    if (students.length === 0) {
      setAttendanceMap({})
      return
    }
    const map: Record<string, AttendanceRecord> = {}
    // Default all students to 'H'
    students.forEach((s) => {
      map[s.id] = { studentId: s.id, status: 'H', keterangan: '' }
    })
    // Overlay existing records
    if (attendanceData?.records && Array.isArray(attendanceData.records)) {
      attendanceData.records.forEach((rec) => {
        if (rec.studentId) {
          map[rec.studentId] = {
            studentId: rec.studentId,
            status: (rec.status as Status) || 'H',
            keterangan: rec.keterangan || '',
          }
        }
      })
      if (attendanceData.records.length > 0) {
        toast.success(`Memuat ${attendanceData.records.length} catatan absensi tersimpan`)
      }
    }
    setAttendanceMap(map)
  }, [students, attendanceData])

  // Auto-load stats when kelas changes (students + attendance auto-loaded by hook)
  // Stats refetch is handled by deps: [kelas] in useResilientFetch above

  const handleLoadStudents = useCallback(() => {
    if (!kelas || kelas === NONE) {
      toast.error('Pilih kelas terlebih dahulu')
      return
    }
    refetchStudents()
  }, [kelas, refetchStudents])

  const setStatus = (studentId: string, status: Status) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || { studentId, status: 'H' as Status, keterangan: '' }),
        status,
      },
    }))
  }

  const setKeterangan = (studentId: string, keterangan: string) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || { studentId, status: 'H' as Status, keterangan: '' }),
        keterangan,
      },
    }))
  }

  const handleSave = async () => {
    if (students.length === 0) {
      toast.error('Belum ada siswa yang dimuat')
      return
    }
    setSaving(true)
    const records = students.map((s) => ({
      studentId: s.id,
      status: attendanceMap[s.id]?.status || ('H' as Status),
      keterangan: attendanceMap[s.id]?.keterangan || '',
    }))
    const data = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tanggal,
        kelas,
        tahunAjaran: '2026/2027',
        semester: 'ganjil',
        records,
      }),
    })
      .then((r) => r.json())
      .catch(() => ({ success: false }))
    setSaving(false)
    if (data?.success) {
      toast.success(`Absensi tersimpan untuk ${records.length} siswa`)
      refetchStats()
    } else {
      toast.error(data?.error || 'Gagal menyimpan absensi')
    }
  }

  const pctBadge = (p: number) =>
    p >= 80 ? 'bg-emerald-100 text-emerald-700' : p >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'

  return (
    <div className="space-y-4">
      {/* ── Filter Card ── */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4" /> Daftar Hadir Siswa (Absensi)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm">
                <Users className="w-3.5 h-3.5" /> Kelas
              </Label>
              <Select value={kelas} onValueChange={setKelas}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  {SAFE_GRADES.map((g) => (
                    <SelectItem key={g} value={g}>
                      Kelas {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
            <div className="flex items-end">
              <Button
                className="w-full"
                onClick={handleLoadStudents}
                disabled={loadingStudents || !kelas || kelas === NONE}
              >
                {loadingStudents ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-1" />
                ) : (
                  <Users className="w-4 h-4 mr-1" />
                )}
                Muat Siswa
                {retryStudents > 0 && (
                  <span className="text-xs ml-1 text-amber-200">({retryStudents}/2)</span>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Attendance Table ── */}
      {students.length > 0 && (
        <Card>
          <CardHeader className="bg-slate-50 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="text-base">
                Absensi Kelas {kelas} — {tanggal}
              </CardTitle>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-1" />
                ) : (
                  <Save className="w-4 h-4 mr-1" />
                )}
                Simpan Absensi
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="max-h-96 overflow-y-auto border rounded-md">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10">
                  <TableRow>
                    <TableHead className="w-12 text-center">No</TableHead>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead className="w-32">NISN</TableHead>
                    <TableHead className="w-64 text-center">Status</TableHead>
                    <TableHead className="w-56">Keterangan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((s, idx) => {
                    const rec =
                      attendanceMap[s.id] || {
                        studentId: s.id,
                        status: 'H' as Status,
                        keterangan: '',
                      }
                    return (
                      <TableRow key={s.id}>
                        <TableCell className="text-center text-xs text-slate-500">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-medium text-sm">
                          {s.namaLengkap}
                        </TableCell>
                        <TableCell className="text-xs text-slate-600">
                          {s.nisn || '-'}
                        </TableCell>
                        <TableCell>
                          <RadioGroup
                            value={rec.status}
                            onValueChange={(v) => setStatus(s.id, v as Status)}
                            className="flex flex-row gap-3 items-center justify-center"
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <label
                                key={opt.value}
                                htmlFor={`status-${s.id}-${opt.value}`}
                                className="flex items-center gap-1 cursor-pointer select-none"
                              >
                                <RadioGroupItem
                                  value={opt.value}
                                  id={`status-${s.id}-${opt.value}`}
                                  className="w-4 h-4"
                                />
                                <span className={`text-xs font-bold ${opt.color}`}>
                                  {opt.label}
                                </span>
                              </label>
                            ))}
                          </RadioGroup>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={rec.keterangan}
                            onChange={(e) => setKeterangan(s.id, e.target.value)}
                            placeholder="Opsional"
                            className="h-8 text-xs"
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              H = Hadir, S = Sakit, I = Izin, A = Alpa
            </p>
            {loadingAttendance && (
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Memuat catatan absensi tersimpan...
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Statistics Card ── */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Statistik Kehadiran
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchStats()}
              disabled={!kelas || kelas === NONE || loadingStats}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingStats ? 'animate-spin' : ''}`} />
              {retryStats > 0 && <span className="ml-1 text-xs text-amber-600">({retryStats}/2)</span>}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {/* ── Stats loading/error/empty states ── */}
          {loadingStats ? (
            <p className="text-sm text-slate-500 text-center py-6">
              Memuat statistik...
              {retryStats > 0 && <span className="ml-2 text-amber-600">({retryStats}/2)</span>}
            </p>
          ) : statsError ? (
            <div className="py-6 text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-400" />
              <p className="text-sm text-red-600 mb-2">Gagal memuat statistik</p>
              <Button variant="outline" size="sm" onClick={() => refetchStats()} className="border-red-300 text-red-600 hover:bg-red-50">
                <RefreshCw className="w-3 h-3 mr-1" />Coba Muat Ulang
              </Button>
            </div>
          ) : stats.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">
              {kelas === NONE
                ? 'Pilih kelas untuk melihat statistik kehadiran'
                : 'Belum ada data statistik untuk kelas ini'}
            </p>
          ) : (
            <div className="max-h-96 overflow-y-auto border rounded-md">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10">
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead className="text-center text-emerald-600">H</TableHead>
                    <TableHead className="text-center text-amber-600">S</TableHead>
                    <TableHead className="text-center text-blue-600">I</TableHead>
                    <TableHead className="text-center text-red-600">A</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">% Hadir</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.map((st) => {
                    const pct = st.percentage || 0
                    return (
                      <TableRow key={st.studentId}>
                        <TableCell className="font-medium text-sm">
                          {st.namaLengkap || '-'}
                        </TableCell>
                        <TableCell className="text-center text-sm">{st.H || 0}</TableCell>
                        <TableCell className="text-center text-sm">{st.S || 0}</TableCell>
                        <TableCell className="text-center text-sm">{st.I || 0}</TableCell>
                        <TableCell className="text-center text-sm">{st.A || 0}</TableCell>
                        <TableCell className="text-center text-sm font-semibold">
                          {st.total || 0}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={pctBadge(pct)}>{pct.toFixed(1)}%</Badge>
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

export default AttendanceManager
