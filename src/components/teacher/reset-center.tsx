'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  RotateCcw,
  Users,
  RefreshCw,
  Check,
  X,
  AlertTriangle,
  Trash2,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { ALL_GRADES } from '@/lib/constants'
import { useResilientFetch } from '@/lib/use-resilient-fetch'

interface ResetRequest {
  id: string
  subject: string
  reason: string
  kelas: string
  status: string
  createdAt: string
  student?: { namaLengkap: string; nisn: string; kelas: string } | null
}

interface BulkAssignment {
  id: string
  title: string
  taskType: string
  exerciseType: string
  createdAt: string
}

const NONE = '__none__'
const SAFE_GRADES = (ALL_GRADES || []) as readonly string[]

export function ResetCenter() {
  const [activeTab, setActiveTab] = useState<'individual' | 'bulk'>('individual')

  // ── RESILIENT FETCH: pending reset requests (main data) ──
  const { data: requestsData, loading, error, refetch, retryCount } = useResilientFetch<{
    success: boolean
    requests: ResetRequest[]
    error?: string
  }>('/api/reset-requests', { deps: [] })

  const requests = requestsData?.requests ?? []
  const fetchRequests = useCallback(() => { refetch() }, [refetch])

  // ── RESILIENT FETCH: assignments for bulk reset (lazy-loaded) ──
  const { data: assignmentsData, refetch: refetchAssignments } = useResilientFetch<{
    success: boolean
    assignments: BulkAssignment[]
  }>('/api/teacher/reset-bulk', { deps: [], enabled: false })

  const assignments = assignmentsData?.assignments ?? []
  const fetchAssignments = useCallback(() => { refetchAssignments() }, [refetchAssignments])

  const [bulkKelas, setBulkKelas] = useState<string>(NONE)
  const [bulkAssignmentId, setBulkAssignmentId] = useState<string>(NONE)
  const [resetting, setResetting] = useState(false)

  // Lazy-load assignments when bulk tab is opened (only once)
  useEffect(() => {
    if (activeTab === 'bulk' && assignments.length === 0) {
      fetchAssignments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  // ── Approve a reset request ──
  const handleApprove = async (id: string) => {
    const data = await fetch(`/api/reset-requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'approve' }),
    })
      .then((r) => r.json())
      .catch(() => ({ success: false }))
    if (data?.success) {
      toast.success(data.message || 'Reset disetujui. Siswa dapat mengerjakan ulang.')
      fetchRequests()
    } else {
      toast.error(data?.error || 'Gagal menyetujui pengajuan')
    }
  }

  // ── Reject a reset request ──
  const handleReject = async (id: string) => {
    const data = await fetch(`/api/reset-requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reject' }),
    })
      .then((r) => r.json())
      .catch(() => ({ success: false }))
    if (data?.success) {
      toast.success(data.message || 'Pengajuan reset ditolak')
      fetchRequests()
    } else {
      toast.error(data?.error || 'Gagal menolak pengajuan')
    }
  }

  // ── Bulk reset for entire class + assignment ──
  const handleBulkReset = async () => {
    if (bulkKelas === NONE || bulkAssignmentId === NONE) {
      toast.error('Pilih kelas dan tugas terlebih dahulu')
      return
    }
    setResetting(true)
    const data = await fetch('/api/teacher/reset-bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kelas: bulkKelas, assignmentId: bulkAssignmentId }),
    })
      .then((r) => r.json())
      .catch(() => ({ success: false }))
    setResetting(false)
    if (data?.success) {
      const deletedCount = data.deletedCount ?? 0
      const studentCount = data.studentCount ?? 0
      toast.success(
        data.message ||
          `Reset massal berhasil. ${deletedCount} hasil dihapus untuk ${studentCount} siswa di kelas ${bulkKelas}.`
      )
      // Reset selection
      setBulkKelas(NONE)
      setBulkAssignmentId(NONE)
    } else {
      toast.error(data?.error || 'Gagal melakukan reset massal')
    }
  }

  const selectedAssignment = assignments.find((a) => a.id === bulkAssignmentId)
  const canReset = bulkKelas !== NONE && bulkAssignmentId !== NONE

  return (
    <div className="space-y-4">
      {/* ── Tab Switcher ── */}
      <div className="flex gap-1 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('individual')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'individual'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Reset Perorangan
          {requests.length > 0 && (
            <Badge
              variant="secondary"
              className={`ml-1 ${
                activeTab === 'individual'
                  ? 'bg-white/20 text-white'
                  : 'bg-white text-slate-700'
              }`}
            >
              {requests.length}
            </Badge>
          )}
        </button>
        <button
          onClick={() => setActiveTab('bulk')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'bulk'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          Reset Massal
        </button>
      </div>

      {/* ── Individual Tab ── */}
      {activeTab === 'individual' && (
        <Card>
          <CardHeader className="bg-slate-50 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Pengajuan Reset dari Siswa
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchRequests}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            {/* ── LOADING STATE ── */}
            {loading ? (
              <div className="py-20 text-center text-slate-400">
                <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
                <p className="text-sm">Memuat pengajuan...</p>
                {retryCount > 0 && (
                  <p className="text-xs mt-1 text-amber-600">Mencoba ulang ({retryCount}/2)...</p>
                )}
              </div>
            ) : /* ── ERROR STATE ── */
            error ? (
              <div className="py-16 text-center">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
                <p className="font-medium text-red-600 mb-1">Gagal memuat data</p>
                <p className="text-xs text-slate-500 mb-3">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchRequests}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Coba Muat Ulang
                </Button>
              </div>
            ) : /* ── EMPTY STATE ── */
            requests.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Check className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                <p className="font-medium">Tidak ada pengajuan reset pending</p>
                <p className="text-xs mt-1">Semua permintaan sudah diproses</p>
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-slate-50 z-10">
                    <TableRow>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead>NISN</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Alasan</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium text-slate-900">
                          {r.student?.namaLengkap || '-'}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {r.student?.nisn || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {r.student?.kelas || r.kelas || '-'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{r.subject}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs text-xs text-slate-600">
                          {r.reason || (
                            <span className="italic text-slate-400">Tidak ada alasan</span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                          {r.createdAt
                            ? new Date(r.createdAt).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })
                            : '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-1">
                            <Button
                              size="sm"
                              className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
                              onClick={() => handleApprove(r.id)}
                            >
                              <Check className="w-3.5 h-3.5 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => handleReject(r.id)}
                            >
                              <X className="w-3.5 h-3.5 mr-1" />
                              Reject
                            </Button>
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
      )}

      {/* ── Bulk Tab ── */}
      {activeTab === 'bulk' && (
        <Card className="border-red-200">
          <CardHeader className="bg-red-50 pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              Reset Massal per Kelas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Users className="w-3 h-3" /> Kelas
                </label>
                <Select value={bulkKelas} onValueChange={(v) => setBulkKelas(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE}>— Pilih Kelas —</SelectItem>
                    {SAFE_GRADES.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Tugas
                </label>
                <Select
                  value={bulkAssignmentId}
                  onValueChange={(v) => setBulkAssignmentId(v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tugas..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE}>— Pilih Tugas —</SelectItem>
                    {assignments.length === 0 ? (
                      <SelectItem value={NONE} disabled>
                        Tidak ada tugas
                      </SelectItem>
                    ) : (
                      assignments.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.title}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Warning info text */}
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                Reset akan menghapus <strong>SEMUA</strong> hasil pengerjaan untuk tugas ini di kelas terpilih. Siswa dapat mengerjakan ulang.
              </p>
            </div>

            {/* Selected assignment preview */}
            {selectedAssignment && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-700 mb-1">
                  Tugas terpilih:
                </p>
                <p className="text-sm text-slate-900">{selectedAssignment.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tipe:{' '}
                  {selectedAssignment.taskType || selectedAssignment.exerciseType || '-'}
                </p>
              </div>
            )}

            {/* Big red reset button with confirmation dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-base"
                  disabled={!canReset || resetting}
                >
                  {resetting ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Mereset...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Reset Semua Siswa
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Konfirmasi Reset Massal
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Anda akan menghapus <strong>SEMUA</strong> hasil pengerjaan untuk tugas{' '}
                    <strong>{selectedAssignment?.title}</strong> di kelas{' '}
                    <strong>{bulkKelas}</strong>. Tindakan ini tidak dapat dibatalkan. Siswa
                    dapat mengerjakan ulang tugas dari awal.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleBulkReset}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Ya, Reset Semua
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {!canReset && (
              <p className="text-xs text-center text-slate-500">
                Pilih kelas dan tugas terlebih dahulu untuk mengaktifkan tombol reset.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
