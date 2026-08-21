'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Upload, FileText, Sparkles, RefreshCw, CheckCircle2, Save, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { QUESTION_TYPES, LEVEL_KOGNITIF } from '@/lib/constants'

interface CP { id: string; kodeCP: string; deskripsi: string; gradeLevel: string }
interface TP { id: string; kodeTP: string; deskripsi: string; cpId: string }

const NONE = '__none__'

export function DocumentGeneratorDialog({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [cps, setCps] = useState<CP[]>([])
  const [tps, setTps] = useState<TP[]>([])
  const [selectedCP, setSelectedCP] = useState<string>(NONE)
  const [selectedTP, setSelectedTP] = useState<string>(NONE)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [generateType, setGenerateType] = useState<string>('both')
  const [questionCount, setQuestionCount] = useState(5)
  const [questionType, setQuestionType] = useState<string>('pilihan_ganda')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ materi?: { id: string; title: string }; soal?: { count: number }; message?: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch CPs
  useEffect(() => {
    fetch('/api/cp')
      .then(r => r.json())
      .then(data => {
        if (data.success) setCps(data.cps || [])
        else if (Array.isArray(data?.cps)) setCps(data.cps)
      })
      .catch(() => {})
  }, [])

  // Fetch TPs when CP changes
  useEffect(() => {
    if (!selectedCP || selectedCP === NONE) { setTps([]); return }
    fetch(`/api/tp?cpId=${selectedCP}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setTps(data.tps || [])
        else if (Array.isArray(data?.tps)) setTps(data.tps)
      })
      .catch(() => {})
  }, [selectedCP])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const filename = file.name.toLowerCase()
    if (!filename.endsWith('.pdf') && !filename.endsWith('.docx') && !filename.endsWith('.doc')) {
      toast.error('Format file tidak didukung. Gunakan PDF atau DOC/DOCX.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 10MB')
      return
    }
    setSelectedFile(file)
    setResult(null)
  }

  const handleGenerate = async () => {
    if (!selectedFile) { toast.error('Pilih file dokumen terlebih dahulu'); return }
    if (!selectedCP || selectedCP === NONE) { toast.error('Pilih CP terlebih dahulu'); return }
    if (!selectedTP || selectedTP === NONE) { toast.error('Pilih TP terlebih dahulu'); return }

    setLoading(true)
    setResult(null)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('cpId', selectedCP)
      formData.append('tpId', selectedTP)
      formData.append('generateType', generateType)
      formData.append('questionCount', String(questionCount))
      formData.append('questionType', questionType)

      const res = await fetch('/api/ai/generate-from-document', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal')

      setResult(data)
      toast.success(data.message || 'Dokumen berhasil diproses')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal memproses dokumen')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (result) onSaved()
    onClose()
  }

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Generate AI dari Berkas Dokumen
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Info banner */}
          <Card className="bg-purple-50/50 border-purple-200">
            <CardContent className="pt-4">
              <div className="flex items-start gap-2 text-sm text-purple-900">
                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">AI Document Generator</p>
                  <p className="text-xs text-purple-700 mt-1">
                    Unggah file PDF atau DOC/DOCX materi pembelajaran. AI akan mengekstrak teks,
                    lalu membuat rangkuman materi dan/atau paket soal berdasarkan CP/TP yang dipilih.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Unggah Dokumen (PDF / DOC / DOCX) *</Label>
            <div
              className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/30 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedFile ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">{selectedFile.name}</span>
                  <Badge variant="outline" className="text-xs">{(selectedFile.size / 1024).toFixed(0)} KB</Badge>
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-500">Klik untuk memilih file</p>
                  <p className="text-xs text-slate-400 mt-1">Maksimal 10MB • PDF, DOC, DOCX</p>
                </div>
              )}
            </div>
          </div>

          {/* CP / TP Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Pilih CP *</Label>
              <Select value={selectedCP} onValueChange={(v) => { setSelectedCP(v); setSelectedTP(NONE) }}>
                <SelectTrigger><SelectValue placeholder="Pilih CP..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE} disabled>Pilih CP...</SelectItem>
                  {cps.map(cp => (
                    <SelectItem key={cp.id} value={cp.id}>
                      {cp.kodeCP} — {cp.deskripsi.substring(0, 40)}{cp.deskripsi.length > 40 ? '...' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Pilih TP *</Label>
              <Select value={selectedTP} onValueChange={setSelectedTP} disabled={selectedCP === NONE}>
                <SelectTrigger><SelectValue placeholder="Pilih TP..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE} disabled>Pilih TP...</SelectItem>
                  {tps.map(tp => (
                    <SelectItem key={tp.id} value={tp.id}>
                      {tp.kodeTP} — {tp.deskripsi.substring(0, 40)}{tp.deskripsi.length > 40 ? '...' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate Type */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Hasil Generate</Label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setGenerateType('materi')}
                className={`p-3 rounded-lg border-2 text-xs font-medium transition-all ${
                  generateType === 'materi' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <FileText className="w-4 h-4 mx-auto mb-1" />
                Materi Saja
              </button>
              <button
                type="button"
                onClick={() => setGenerateType('soal')}
                className={`p-3 rounded-lg border-2 text-xs font-medium transition-all ${
                  generateType === 'soal' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Sparkles className="w-4 h-4 mx-auto mb-1" />
                Soal Saja
              </button>
              <button
                type="button"
                onClick={() => setGenerateType('both')}
                className={`p-3 rounded-lg border-2 text-xs font-medium transition-all ${
                  generateType === 'both' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 mx-auto mb-1" />
                Materi + Soal
              </button>
            </div>
          </div>

          {/* Question settings (if generating soal) */}
          {(generateType === 'soal' || generateType === 'both') && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Jenis Soal</Label>
                <Select value={questionType} onValueChange={setQuestionType}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {QUESTION_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Jumlah Soal</Label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value) || 5)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          )}

          {/* Generate button */}
          <Button
            onClick={handleGenerate}
            disabled={loading || !selectedFile || selectedCP === NONE || selectedTP === NONE}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {loading ? (
              <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />AI sedang memproses dokumen...</>
            ) : (
              <><Sparkles className="w-4 h-4 mr-2" />Generate dari Dokumen</>
            )}
          </Button>

          {/* Result */}
          {result && (
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">Generate Berhasil!</p>
                    <div className="mt-2 space-y-1 text-xs text-emerald-800">
                      {result.materi && <p>✓ Materi tersimpan di database</p>}
                      {result.soal && <p>✓ {result.soal.count} soal tersimpan di Bank Soal</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
