'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Sparkles, RefreshCw, CheckCircle2, Save, Wand2, Target } from 'lucide-react'
import { toast } from 'sonner'

interface GeneratedQuestion {
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: number
  explanation: string
  category: string
}

export function AIGenerateDialog({
  defaultGrade,
  onClose,
  onSaved,
}: {
  defaultGrade: string
  onClose: () => void
  onSaved: () => void
}) {
  const [materials, setMaterials] = useState<Array<{ id: string; title: string; content: string }>>([])
  const [selectedMaterial, setSelectedMaterial] = useState<string>('')
  const [customContent, setCustomContent] = useState('')
  const [gradeLevel, setGradeLevel] = useState(defaultGrade)
  const [questionCount, setQuestionCount] = useState(5)
  const [category, setCategory] = useState('Konsep Dasar')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [generated, setGenerated] = useState<GeneratedQuestion[]>([])

  // ── CP/TP state (REQUIRED for AI generation) ──
  const [cps, setCps] = useState<Array<{ id: string; kodeCP: string; deskripsi: string; gradeLevel: string }>>([])
  const [tps, setTps] = useState<Array<{ id: string; kodeTP: string; deskripsi: string; cpId: string }>>([])
  const [selectedCP, setSelectedCP] = useState<string>('')
  const [selectedTP, setSelectedTP] = useState<string>('')

  // Fetch CPs on mount
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
    if (!selectedCP) { setTps([]); setSelectedTP(''); return }
    fetch(`/api/tp?cpId=${selectedCP}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setTps(data.tps || [])
        else if (Array.isArray(data?.tps)) setTps(data.tps)
        setSelectedTP('')
      })
      .catch(() => { setTps([]); setSelectedTP('') })
  }, [selectedCP])

  useEffect(() => {
    fetch('/api/materials')
      .then(r => r.json())
      .then(data => {
        if (data.success) setMaterials(data.materials)
      })
      .catch(() => {})
  }, [])

  const handleGenerate = async () => {
    // ── VALIDATION: CP and TP are REQUIRED ──
    if (!selectedCP) {
      toast.error('Pilih Capaian Pembelajaran (CP) terlebih dahulu')
      return
    }
    if (!selectedTP) {
      toast.error('Pilih Tujuan Pembelajaran (TP) terlebih dahulu')
      return
    }

    const content = selectedMaterial
      ? materials.find(m => m.id === selectedMaterial)?.content || ''
      : customContent

    if (!content || content.length < 50) {
      toast.error('Pilih materi atau ketik minimal 50 karakter')
      return
    }

    setLoading(true)
    setGenerated([])
    try {
      const res = await fetch('/api/ai/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialContent: content,
          gradeLevel,
          questionCount,
          category,
          cpId: selectedCP,
          tpId: selectedTP,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal')
      setGenerated(data.questions)
      toast.success(`${data.count} soal berhasil dibuat oleh AI`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal generate soal')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async () => {
    if (generated.length === 0) return
    setSaving(true)
    try {
      let saved = 0
      for (const q of generated) {
        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gradeLevel,
            ...q,
            isActive: true,
          }),
        })
        if (res.ok) saved++
      }
      toast.success(`${saved} soal AI disimpan ke bank soal`)
      onSaved()
    } catch {
      toast.error('Gagal menyimpan soal')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Generate Soal dengan AI
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* ── CP/TP Selection (REQUIRED — at the very top) ── */}
          <Card className="bg-emerald-50/50 border-emerald-200">
            <CardContent className="pt-4">
              <p className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-1">
                <Target className="w-4 h-4 text-emerald-600" />
                Context Anchor (WAJIB)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Pilih Capaian Pembelajaran (CP) *</Label>
                  <Select value={selectedCP} onValueChange={setSelectedCP}>
                    <SelectTrigger><SelectValue placeholder="Pilih CP..." /></SelectTrigger>
                    <SelectContent>
                      {cps.length === 0 ? (
                        <SelectItem value="__none__" disabled>Belum ada CP — buat di menu CP & TP</SelectItem>
                      ) : (
                        cps.map(cp => (
                          <SelectItem key={cp.id} value={cp.id}>
                            {cp.kodeCP} — {cp.deskripsi.substring(0, 40)}{cp.deskripsi.length > 40 ? '...' : ''}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Pilih Tujuan Pembelajaran (TP) *</Label>
                  <Select value={selectedTP} onValueChange={setSelectedTP} disabled={!selectedCP}>
                    <SelectTrigger><SelectValue placeholder={selectedCP ? "Pilih TP..." : "Pilih CP dulu"} /></SelectTrigger>
                    <SelectContent>
                      {tps.length === 0 ? (
                        <SelectItem value="__none__" disabled>{selectedCP ? "Belum ada TP untuk CP ini" : "Pilih CP dulu"}</SelectItem>
                      ) : (
                        tps.map(tp => (
                          <SelectItem key={tp.id} value={tp.id}>
                            {tp.kodeTP} — {tp.deskripsi.substring(0, 40)}{tp.deskripsi.length > 40 ? '...' : ''}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pilih sumber materi */}
          <Card className="bg-purple-50/50 border-purple-200">
            <CardContent className="pt-4">
              <p className="text-sm font-semibold text-slate-900 mb-3">Sumber Materi</p>
              {materials.length > 0 && (
                <div className="space-y-2 mb-3">
                  <Label className="text-xs">Pilih dari Materi Belajar</Label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger><SelectValue placeholder="Pilih materi (opsional)" /></SelectTrigger>
                    <SelectContent>
                      {materials.map(m => (
                        <SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-1">
                <Label className="text-xs">Atau Ketik/Paste Materi Manual</Label>
                <Textarea
                  value={customContent}
                  onChange={(e) => { setCustomContent(e.target.value); setSelectedMaterial('') }}
                  rows={5}
                  placeholder="Ketik atau paste materi pelajaran di sini. AI akan membuat soal berdasarkan materi ini..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Konfigurasi */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Jenjang Kelas</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Kelas 7</SelectItem>
                  <SelectItem value="8">Kelas 8</SelectItem>
                  <SelectItem value="9">Kelas 9</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Jumlah Soal</Label>
              <Input type="number" min="1" max="20" value={questionCount} onChange={(e) => setQuestionCount(parseInt(e.target.value) || 5)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Kategori</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Konsep Dasar">Konsep Dasar</SelectItem>
                  <SelectItem value="Dekomposisi">Dekomposisi</SelectItem>
                  <SelectItem value="Pengenalan Pola">Pengenalan Pola</SelectItem>
                  <SelectItem value="Abstraksi">Abstraksi</SelectItem>
                  <SelectItem value="Algoritma">Algoritma</SelectItem>
                  <SelectItem value="Internet">Internet</SelectItem>
                  <SelectItem value="Etika Digital">Etika Digital</SelectItem>
                  <SelectItem value="Keamanan Digital">Keamanan Digital</SelectItem>
                  <SelectItem value="Kesehatan Digital">Kesehatan Digital</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tombol Generate */}
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {loading ? (
              <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />AI sedang membuat soal...</>
            ) : (
              <><Wand2 className="w-4 h-4 mr-2" />Generate {questionCount} Soal dengan AI</>
            )}
          </Button>

          {/* Hasil Generate */}
          {generated.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">
                  ✅ {generated.length} Soal dihasilkan AI
                </p>
                <Button size="sm" onClick={handleSaveAll} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                  {saving ? <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> : <Save className="w-3 h-3 mr-1" />}
                  Simpan Semua ke Bank Soal
                </Button>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {generated.map((q, i) => (
                  <Card key={i} className="border-purple-200">
                    <CardContent className="pt-3 pb-3">
                      <div className="flex items-start gap-2 mb-1">
                        <Badge className="bg-purple-100 text-purple-700 text-xs">Soal {i + 1}</Badge>
                        <Badge variant="outline" className="text-xs">{q.category}</Badge>
                      </div>
                      <p className="text-sm text-slate-800 mb-2">{q.question}</p>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {['A', 'B', 'C', 'D'].map((letter, idx) => {
                          const option = [q.optionA, q.optionB, q.optionC, q.optionD][idx]
                          const isCorrect = q.correctAnswer === idx
                          return (
                            <div key={letter} className={`p-1.5 rounded ${isCorrect ? 'bg-emerald-50 border border-emerald-300' : 'bg-slate-50'}`}>
                              <span className="font-semibold">{letter}.</span> {option}
                              {isCorrect && <CheckCircle2 className="w-3 h-3 inline ml-1 text-emerald-600" />}
                            </div>
                          )
                        })}
                      </div>
                      <p className="text-xs text-slate-500 mt-2 italic">📝 {q.explanation}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
