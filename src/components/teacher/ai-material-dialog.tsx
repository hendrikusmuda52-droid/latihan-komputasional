'use client'

import { useState } from 'react'
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
import { Sparkles, RefreshCw, Save, Image as ImageIcon, FileText, Wand2, Download } from 'lucide-react'
import { toast } from 'sonner'

export function AIMaterialDialog({
  onClose,
  onSaved,
}: {
  onClose: () => void
  onSaved: () => void
}) {
  const [topic, setTopic] = useState('')
  const [gradeLevel, setGradeLevel] = useState('7')
  const [category, setCategory] = useState('Umum')
  const [format, setFormat] = useState<'standard' | 'infographic'>('infographic')
  const [loading, setLoading] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  const [saving, setSaving] = useState(false)
  const [generatedTitle, setGeneratedTitle] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [infographicUrl, setInfographicUrl] = useState('')

  const CATEGORIES = ['Berpikir Komputasional', 'Komputer & Internet', 'Etika Digital', 'Keamanan Digital', 'Kesehatan Digital', 'Mengetik', 'Umum']

  const handleGenerate = async () => {
    if (!topic || topic.length < 3) {
      toast.error('Topik minimal 3 karakter')
      return
    }

    setLoading(true)
    setGeneratedContent('')
    setInfographicUrl('')

    try {
      const res = await fetch('/api/ai/generate-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, gradeLevel, category, format }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal')
      setGeneratedTitle(data.title)
      setGeneratedContent(data.content)
      toast.success('Materi berhasil dibuat oleh AI!')

      // If infographic mode, also generate image
      if (format === 'infographic') {
        setLoadingImage(true)
        try {
          const imgRes = await fetch('/api/ai/generate-infographic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, gradeLevel }),
          })
          const imgData = await imgRes.json()
          if (imgData.success) {
            setInfographicUrl(imgData.imageUrl)
            toast.success('Infografis juga berhasil dibuat!')
          }
        } catch {
          toast.warning('Infografis gambar gagal dibuat, tapi materi teks tetap tersedia.')
        } finally {
          setLoadingImage(false)
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal generate materi')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!generatedContent) return
    setSaving(true)
    try {
      // Combine content with infographic image if available
      let finalContent = generatedContent
      if (infographicUrl) {
        finalContent += `\n\n## 📊 Infografis\n\n![Infografis ${generatedTitle}](${infographicUrl})\n\n*Klik gambar untuk memperbesar.*`
      }

      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: generatedTitle,
          content: finalContent,
          targetKelas: 'ALL',
          category,
          isActive: true,
        }),
      })
      if (!res.ok) throw new Error('Gagal')
      toast.success('Materi disimpan ke database')
      onSaved()
    } catch {
      toast.error('Gagal menyimpan materi')
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadInfographic = () => {
    if (!infographicUrl) return
    const link = document.createElement('a')
    link.href = infographicUrl
    link.download = `infografis-${generatedTitle || topic}.png`
    link.click()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Generate Materi dengan AI
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Input topik */}
          <Card className="bg-purple-50/50 border-purple-200">
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Topik Materi *</Label>
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Contoh: Algoritma pengurutan, Sejarah internet, Dampak media sosial..."
                  />
                </div>
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
                    <Label className="text-xs">Kategori</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Format Materi</Label>
                    <Select value={format} onValueChange={(v) => setFormat(v as 'standard' | 'infographic')}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infographic">📊 Infografis (Teks + Gambar)</SelectItem>
                        <SelectItem value="standard">📝 Materi Teks Saja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tombol Generate */}
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {loading ? (
              <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />AI sedang membuat materi...</>
            ) : (
              <><Wand2 className="w-4 h-4 mr-2" />Generate Materi {format === 'infographic' ? 'Infografis' : ''} dengan AI</>
            )}
          </Button>

          {/* Loading infografis */}
          {loadingImage && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-3 pb-3 flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                <p className="text-sm text-blue-800">AI sedang membuat gambar infografis... (mungkin perlu 10-20 detik)</p>
              </CardContent>
            </Card>
          )}

          {/* Hasil Generate */}
          {generatedContent && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  ✅ Materi dihasilkan AI
                </p>
                <div className="flex gap-2">
                  {infographicUrl && (
                    <Button size="sm" variant="outline" onClick={handleDownloadInfographic}>
                      <Download className="w-3 h-3 mr-1" />Download Infografis
                    </Button>
                  )}
                  <Button size="sm" onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                    {saving ? <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> : <Save className="w-3 h-3 mr-1" />}
                    Simpan Materi
                  </Button>
                </div>
              </div>

              {/* Preview Infografis Image */}
              {infographicUrl && (
                <Card className="border-purple-200 overflow-hidden">
                  <div className="bg-purple-50 px-4 py-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-900">Infografis AI</span>
                  </div>
                  <img
                    src={infographicUrl}
                    alt={`Infografis ${generatedTitle}`}
                    className="w-full"
                  />
                </Card>
              )}

              {/* Preview Materi Teks */}
              <Card className="border-purple-200">
                <div className="bg-slate-50 px-4 py-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-900">Preview Materi (Markdown)</span>
                </div>
                <CardContent className="pt-4">
                  <div className="bg-white rounded-lg p-4 max-h-[400px] overflow-y-auto">
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                      {generatedContent}
                    </pre>
                  </div>
                </CardContent>
              </Card>
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
