'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import {
  Calendar, Clock, BookOpen, Save, RefreshCw, CheckCircle2, AlertCircle,
  Users, FileText, Download, Printer, Lock, ChevronRight, Megaphone,
  UserCog, GraduationCap, Shield,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  SCHEDULE, SUBJECTS, NON_ACADEMIC_SLOTS, TEACHERS,
  getTodayName, isCurrentTimeSlot,
  getTeacherSchedule, getClassSchedule, getAllTeacherSlots,
} from '@/lib/schedule-data'

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
const STATUS_OPTIONS = [
  { value: 'H', label: 'Hadir', color: 'text-emerald-600' },
  { value: 'S', label: 'Sakit', color: 'text-amber-600' },
  { value: 'I', label: 'Izin', color: 'text-blue-600' },
  { value: 'A', label: 'Alfa', color: 'text-red-600' },
]

// ── Dev simulation roles ──
const DEV_ROLES = [
  { value: 'teacher_HM', label: 'Guru HM — Hendrikus (Informatika & Koding)', type: 'teacher', code: 'HM', name: 'Hendrikus Frederik Lewo Muda' },
  { value: 'teacher_MR', label: 'Guru MR — Mardiana (Inggris & Keterampilan)', type: 'teacher', code: 'MR', name: 'Mardiana' },
  { value: 'teacher_AA', label: 'Guru AA — Andreas (B.Indonesia & PLH)', type: 'teacher', code: 'AA', name: 'Andreas Anastasius' },
  { value: 'student_7A', label: 'Siswa Kelas 7A', type: 'student', kelas: '7A', name: 'Siswa Demo 7A' },
  { value: 'student_8C', label: 'Siswa Kelas 8C', type: 'student', kelas: '8C', name: 'Siswa Demo 8C' },
  { value: 'student_9B', label: 'Siswa Kelas 9B', type: 'student', kelas: '9B', name: 'Siswa Demo 9B' },
  { value: 'admin', label: 'Admin — Hendrikus (Rekap Total)', type: 'admin' },
]

// ── Wrapper component with dev switcher ──
export function ScheduleJurnalWithSwitcher(props: ScheduleJurnalProps) {
  const [devRole, setDevRole] = useState<string>('')
  const [simMode, setSimMode] = useState<'teacher' | 'student' | 'admin'>(props.mode)
  const [simTeacherCode, setSimTeacherCode] = useState(props.teacherCode || '')
  const [simTeacherName, setSimTeacherName] = useState(props.teacherName || '')
  const [simStudentKelas, setSimStudentKelas] = useState(props.studentKelas || '')
  const [simStudentName, setSimStudentName] = useState(props.studentName || '')

  const handleDevRoleChange = (value: string) => {
    setDevRole(value)
    const role = DEV_ROLES.find(r => r.value === value)
    if (!role) return
    if (role.type === 'teacher') {
      setSimMode('teacher')
      setSimTeacherCode(role.code || '')
      setSimTeacherName(role.name || '')
    } else if (role.type === 'student') {
      setSimMode('student')
      setSimStudentKelas(role.kelas || '')
      setSimStudentName(role.name || '')
    } else {
      setSimMode('admin')
    }
  }

  return (
    <div className="space-y-3">
      {/* Dev Simulation Switcher — sticky top bar */}
      <div className="sticky top-0 z-30 bg-amber-50 border-2 border-amber-200 rounded-lg p-2 flex items-center gap-2 shadow-sm">
        <Badge className="bg-amber-500 text-white text-xs flex items-center gap-1 flex-shrink-0">
          <UserCog className="w-3 h-3" /> DEV SIM
        </Badge>
        <Select value={devRole} onValueChange={handleDevRoleChange}>
          <SelectTrigger className="h-8 text-xs flex-1 max-w-md bg-white">
            <SelectValue placeholder="Pilih role simulasi (dev mode)..." />
          </SelectTrigger>
          <SelectContent>
            {DEV_ROLES.map(r => (
              <SelectItem key={r.value} value={r.value}>
                <span className="flex items-center gap-2">
                  {r.type === 'teacher' && <Shield className="w-3 h-3 text-violet-500" />}
                  {r.type === 'student' && <GraduationCap className="w-3 h-3 text-blue-500" />}
                  {r.type === 'admin' && <Shield className="w-3 h-3 text-amber-500" />}
                  {r.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {devRole && (
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => { setDevRole(''); setSimMode(props.mode) }}>
            Reset ke production
          </Button>
        )}
      </div>

      {/* Render component with simulated or production props */}
      <ScheduleJurnal
        mode={simMode}
        teacherCode={simTeacherCode || props.teacherCode}
        teacherName={simTeacherName || props.teacherName}
        studentKelas={simStudentKelas || props.studentKelas}
        studentName={simStudentName || props.studentName}
      />
    </div>
  )
}

// ── Tipe untuk jurnal yang tersimpan ──
interface JurnalEntry {
  id: string
  teacherCode: string
  teacherName: string
  day: string
  time: string
  kelas: string
  mapelCode: string
  mapelName: string
  materiPokok: string
  hambatan: string
  attendance: Record<string, string> // studentName → status
  createdAt: string
}

// ── Siswa tiruan untuk demo (di production: query dari DB) ──
function getDummyStudents(kelas: string, count = 10): string[] {
  return Array.from({ length: count }, (_, i) => `Siswa ${kelas} #${i + 1}`)
}

interface ScheduleJurnalProps {
  mode: 'teacher' | 'student' | 'admin'
  // Teacher mode: teacherCode = username guru (mis: 'HM')
  teacherCode?: string
  teacherName?: string
  // Student mode: kelas siswa (mis: '7A')
  studentKelas?: string
  studentName?: string
}

export function ScheduleJurnal({ mode, teacherCode, teacherName, studentKelas, studentName }: ScheduleJurnalProps) {
  const today = getTodayName()
  const [activeDay, setActiveDay] = useState(DAYS.includes(today) ? today : 'Senin')
  const [jurnalEntries, setJurnalEntries] = useState<JurnalEntry[]>([])
  const [selectedSlot, setSelectedSlot] = useState<{
    time: string
    kelas: string
    mapelCode: string
    mapelName: string
    guruCode: string
  } | null>(null)
  const [jurnalForm, setJurnalForm] = useState({ materiPokok: '', hambatan: '' })
  const [attendance, setAttendance] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)

  // ── Load jurnal dari API (atau localStorage untuk demo) ──
  const loadJurnal = useCallback(async () => {
    setLoading(true)
    try {
      // Coba load dari localStorage (simulasi — di production: fetch dari API)
      const saved = typeof window !== 'undefined' ? localStorage.getItem('sakola_jurnal') : null
      if (saved) {
        setJurnalEntries(JSON.parse(saved))
      }
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { loadJurnal() }, [loadJurnal])

  // ── Save jurnal ke localStorage ──
  const saveJurnalToStorage = (entries: JurnalEntry[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sakola_jurnal', JSON.stringify(entries))
    }
  }

  // ── Cek apakah jurnal sudah diisi untuk slot tertentu ──
  const isJurnalFilled = (day: string, time: string, kelas: string, guruCode: string) => {
    return jurnalEntries.some(j =>
      j.day === day && j.time === time && j.kelas === kelas && j.teacherCode === guruCode
    )
  }

  // ── Get jurnal entry untuk slot tertentu ──
  const getJurnalEntry = (day: string, time: string, kelas: string, guruCode: string) => {
    return jurnalEntries.find(j =>
      j.day === day && j.time === time && j.kelas === kelas && j.teacherCode === guruCode
    )
  }

  // ── Handle klik slot jadwal (untuk guru) ──
  const handleSlotClick = (slot: {
    time: string; kelas: string; mapelCode: string; mapelName: string; guruCode: string
  }) => {
    if (NON_ACADEMIC_SLOTS.includes(slot.mapelCode)) return // slot terkunci
    setSelectedSlot(slot)
    // Load existing jurnal if any
    const existing = getJurnalEntry(activeDay, slot.time, slot.kelas, slot.guruCode)
    if (existing) {
      setJurnalForm({ materiPokok: existing.materiPokok, hambatan: existing.hambatan })
      setAttendance(existing.attendance)
    } else {
      setJurnalForm({ materiPokok: '', hambatan: '' })
      // Init attendance: semua hadir
      const students = getDummyStudents(slot.kelas)
      const initAtt: Record<string, string> = {}
      students.forEach(s => { initAtt[s] = 'H' })
      setAttendance(initAtt)
    }
  }

  // ── Simpan jurnal ──
  const handleSaveJurnal = () => {
    if (!selectedSlot || !teacherCode) return
    if (!jurnalForm.materiPokok.trim()) {
      toast.error('Materi pokok wajib diisi')
      return
    }
    setSaving(true)
    try {
      const existing = getJurnalEntry(activeDay, selectedSlot.time, selectedSlot.kelas, teacherCode)
      let updated: JurnalEntry[]
      if (existing) {
        // Update existing
        updated = jurnalEntries.map(j =>
          j.id === existing.id
            ? { ...j, materiPokok: jurnalForm.materiPokok, hambatan: jurnalForm.hambatan, attendance }
            : j
        )
      } else {
        // Create new
        const newEntry: JurnalEntry = {
          id: `jurnal_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          teacherCode,
          teacherName: teacherName || teacherCode,
          day: activeDay,
          time: selectedSlot.time,
          kelas: selectedSlot.kelas,
          mapelCode: selectedSlot.mapelCode,
          mapelName: selectedSlot.mapelName,
          materiPokok: jurnalForm.materiPokok.trim(),
          hambatan: jurnalForm.hambatan.trim(),
          attendance,
          createdAt: new Date().toISOString(),
        }
        updated = [...jurnalEntries, newEntry]
      }
      setJurnalEntries(updated)
      saveJurnalToStorage(updated)
      toast.success('Jurnal & absensi berhasil disimpan!')
      setSelectedSlot(null)
    } catch {
      toast.error('Gagal menyimpan jurnal')
    } finally {
      setSaving(false)
    }
  }

  // ── Export Excel (simulasi) ──
  const handleExportExcel = () => {
    toast.success('Export Excel: ' + jurnalEntries.length + ' jurnal berhasil diunduh (simulasi)')
  }

  // ── Print PDF (simulasi) ──
  const handlePrintPDF = () => {
    window.print()
  }

  // ══════════════════════════════════════════════════════════════════
  // RENDER: TEACHER VIEW
  // ══════════════════════════════════════════════════════════════════
  if (mode === 'teacher' && teacherCode) {
    const teacherSlots = getTeacherSchedule(teacherCode, activeDay)
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-violet-600" />
              Jadwal Mengajar — {teacherName || teacherCode}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hari ini: <strong>{today}</strong> · Kode Guru: <strong>{teacherCode}</strong>
            </p>
          </div>
        </div>

        {/* Tab Hari */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                activeDay === day
                  ? day === today ? 'bg-violet-600 text-white shadow-md ring-2 ring-violet-300'
                  : 'bg-slate-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {day}
              {day === today && <span className="ml-1 text-xs">●</span>}
            </button>
          ))}
        </div>

        {/* Timeline Jadwal */}
        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              Jadwal {activeDay} — {teacherSlots.filter(s => !s.isNonAcademic).length} jam mengajar
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {loading ? (
              <div className="py-8 text-center text-slate-400"><RefreshCw className="w-6 h-6 mx-auto animate-spin" /></div>
            ) : teacherSlots.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Tidak ada jadwal mengajar di hari {activeDay}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {teacherSlots.map((slot, idx) => {
                  const filled = isJurnalFilled(activeDay, slot.time, slot.kelas, slot.guruCode)
                  const isCurrent = isCurrentTimeSlot(slot.time)
                  const isLocked = slot.isNonAcademic
                  return (
                    <div
                      key={idx}
                      onClick={() => !isLocked && handleSlotClick(slot)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        isLocked
                          ? 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'
                          : isCurrent
                          ? 'border-violet-400 bg-violet-50 cursor-pointer hover:shadow-md'
                          : filled
                          ? 'border-emerald-200 bg-emerald-50/50 cursor-pointer hover:shadow-md'
                          : 'border-slate-200 bg-white cursor-pointer hover:border-violet-300 hover:bg-violet-50/30'
                      }`}
                    >
                      {/* Waktu */}
                      <div className="flex-shrink-0 w-24 text-center">
                        <p className="text-xs font-mono font-bold text-slate-700">{slot.time.split('-')[0]}</p>
                        <p className="text-[10px] text-slate-400">{slot.time.split('-')[1]}</p>
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={`text-xs ${isLocked ? 'bg-slate-100' : 'bg-violet-50 text-violet-700'}`}>
                            {slot.mapelName}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                            {slot.kelas}
                          </Badge>
                          {isCurrent && (
                            <Badge className="text-xs bg-violet-600 text-white animate-pulse">Sedang Berlangsung</Badge>
                          )}
                          {isLocked && (
                            <Lock className="w-3 h-3 text-slate-400" />
                          )}
                        </div>
                        {!isLocked && filled && (
                          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Jurnal sudah diisi
                          </p>
                        )}
                        {!isLocked && !filled && (
                          <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Belum diisi jurnal
                          </p>
                        )}
                      </div>
                      {/* Arrow */}
                      {!isLocked && <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal Form Jurnal */}
        <Dialog open={!!selectedSlot} onOpenChange={(open) => { if (!open) setSelectedSlot(null) }}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-600" />
                Jurnal Mengajar
              </DialogTitle>
              <DialogDescription>
                {selectedSlot && (
                  <span className="text-sm text-slate-600">
                    Kelas <strong>{selectedSlot.kelas}</strong> · Mapel <strong>{selectedSlot.mapelName}</strong> · Jam <strong>{selectedSlot.time}</strong> · Hari <strong>{activeDay}</strong>
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            {selectedSlot && (
              <div className="space-y-4">
                {/* Materi Pokok */}
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Materi Pokok *</Label>
                  <Input
                    value={jurnalForm.materiPokok}
                    onChange={(e) => setJurnalForm({ ...jurnalForm, materiPokok: e.target.value })}
                    placeholder="Contoh: Bab 2 — Komposisi Estetika Fotografi"
                  />
                </div>
                {/* Hambatan */}
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Hambatan / Catatan Kelas</Label>
                  <Textarea
                    value={jurnalForm.hambatan}
                    onChange={(e) => setJurnalForm({ ...jurnalForm, hambatan: e.target.value })}
                    rows={2}
                    placeholder="Catatan kendala, siswa bermasalah, dll (opsional)"
                  />
                </div>
                {/* Absensi */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold flex items-center gap-1">
                    <Users className="w-3 h-3" /> Absensi Siswa Kelas {selectedSlot.kelas}
                  </Label>
                  <div className="border border-slate-200 rounded-lg overflow-hidden max-h-[300px] overflow-y-auto">
                    {getDummyStudents(selectedSlot.kelas).map((student, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-2 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                        <span className="text-sm text-slate-700">{student}</span>
                        <div className="flex gap-1">
                          {STATUS_OPTIONS.map(opt => (
                            <button
                              key={opt.value}
                              onClick={() => setAttendance(prev => ({ ...prev, [student]: opt.value }))}
                              className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                                (attendance[student] || 'H') === opt.value
                                  ? opt.value === 'H' ? 'bg-emerald-500 text-white'
                                  : opt.value === 'S' ? 'bg-amber-500 text-white'
                                  : opt.value === 'I' ? 'bg-blue-500 text-white'
                                  : 'bg-red-500 text-white'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {opt.value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Ringkasan absensi */}
                  <div className="flex gap-3 text-xs text-slate-500">
                    <span>Hadir: {Object.values(attendance).filter(s => s === 'H').length}</span>
                    <span>Sakit: {Object.values(attendance).filter(s => s === 'S').length}</span>
                    <span>Izin: {Object.values(attendance).filter(s => s === 'I').length}</span>
                    <span className="text-red-600">Alfa: {Object.values(attendance).filter(s => s === 'A').length}</span>
                  </div>
                </div>
                {/* Tombol */}
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button variant="outline" onClick={() => setSelectedSlot(null)}>Batal</Button>
                  <Button onClick={handleSaveJurnal} disabled={saving} className="bg-violet-600 hover:bg-violet-700">
                    {saving ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                    {saving ? 'Menyimpan...' : 'Simpan Jurnal & Absensi'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════════
  // RENDER: STUDENT VIEW
  // ══════════════════════════════════════════════════════════════════
  if (mode === 'student' && studentKelas) {
    const classSlots = getClassSchedule(studentKelas, activeDay)
    // Cek apakah siswa ditandai Alfa hari ini
    const todayJurnal = jurnalEntries.filter(j => j.day === today)
    let isAlfaToday = false
    for (const j of todayJurnal) {
      if (j.kelas === studentKelas && j.attendance[studentName || `Siswa ${studentKelas} #1`] === 'A') {
        isAlfaToday = true
        break
      }
    }

    return (
      <div className="space-y-4">
        {/* Alert Alfa */}
        {isAlfaToday && (
          <div className="p-3 bg-red-50 border-2 border-red-300 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-red-700">⚠️ Anda ditandai ALFA hari ini!</p>
              <p className="text-xs text-red-600">Hubungi guru bidang studi terkait untuk konfirmasi.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Jadwal Kelas {studentKelas}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Hari ini: <strong>{today}</strong> · Siswa: <strong>{studentName || '—'}</strong>
          </p>
        </div>

        {/* Tab Hari */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                activeDay === day
                  ? day === today ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300'
                  : 'bg-slate-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {day}
              {day === today && <span className="ml-1 text-xs">●</span>}
            </button>
          ))}
        </div>

        {/* Timeline Jadwal Siswa */}
        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              Jadwal {activeDay} — Kelas {studentKelas}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {classSlots.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Tidak ada jadwal di hari {activeDay}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {classSlots.map((slot, idx) => {
                  const isLocked = slot.isNonAcademic
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                        isLocked
                          ? 'border-slate-100 bg-slate-50 opacity-60'
                          : slot.isCurrent
                          ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      {/* Waktu */}
                      <div className="flex-shrink-0 w-24 text-center">
                        <p className="text-xs font-mono font-bold text-slate-700">{slot.time.split('-')[0]}</p>
                        <p className="text-[10px] text-slate-400">{slot.time.split('-')[1]}</p>
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-slate-800">{slot.mapelName}</span>
                          {!isLocked && slot.guruCode !== '-' && (
                            <Badge variant="outline" className="text-xs bg-slate-50">
                              Guru: {slot.guruCode}
                            </Badge>
                          )}
                          {slot.isCurrent && (
                            <Badge className="text-xs bg-blue-600 text-white animate-pulse">Sedang Berlangsung</Badge>
                          )}
                          {isLocked && <Lock className="w-3 h-3 text-slate-400" />}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════════
  // RENDER: ADMIN VIEW (Rekap)
  // ══════════════════════════════════════════════════════════════════
  if (mode === 'admin') {
    const allSlots = getAllTeacherSlots(activeDay)
    // Filter: hanya slot akademik (bukan istirahat/upacara)
    const academicSlots = allSlots.filter(s => !s.isNonAcademic)

    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              Rekap Jurnal Harian — Semua Guru
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hari: <strong>{activeDay}</strong> · Total {academicSlots.length} slot mengajar · {jurnalEntries.filter(j => j.day === activeDay).length} jurnal terisi
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <Download className="w-4 h-4 mr-1" /> Export Excel
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrintPDF}>
              <Printer className="w-4 h-4 mr-1" /> Print PDF
            </Button>
          </div>
        </div>

        {/* Tab Hari */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                activeDay === day
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Tabel Rekap */}
        <Card className="border-slate-200">
          <CardContent className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-xs text-slate-500">
                    <th className="text-left py-2 px-2">Jam</th>
                    <th className="text-left py-2 px-2">Kelas</th>
                    <th className="text-left py-2 px-2">Mapel</th>
                    <th className="text-left py-2 px-2">Guru</th>
                    <th className="text-left py-2 px-2">Materi</th>
                    <th className="text-center py-2 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {academicSlots.map((slot, idx) => {
                    const filled = isJurnalFilled(activeDay, slot.time, slot.kelas, slot.guruCode)
                    const entry = getJurnalEntry(activeDay, slot.time, slot.kelas, slot.guruCode)
                    return (
                      <tr
                        key={idx}
                        className={`border-b border-slate-100 ${!filled ? 'bg-red-50' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                      >
                        <td className="py-2 px-2 text-xs font-mono">{slot.time}</td>
                        <td className="py-2 px-2 font-medium">{slot.kelas}</td>
                        <td className="py-2 px-2">{slot.mapelName}</td>
                        <td className="py-2 px-2">{slot.guruCode}</td>
                        <td className="py-2 px-2 text-xs text-slate-500 max-w-[200px] truncate">
                          {entry?.materiPokok || '—'}
                        </td>
                        <td className="py-2 px-2 text-center">
                          {filled ? (
                            <Badge className="text-xs bg-emerald-100 text-emerald-700">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Terisi
                            </Badge>
                          ) : (
                            <Badge className="text-xs bg-red-100 text-red-700">
                              <AlertCircle className="w-3 h-3 mr-1" /> Kosong
                            </Badge>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
