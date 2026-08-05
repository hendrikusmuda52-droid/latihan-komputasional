'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Pen, Eraser, Square, Circle, Type, Undo, Trash2, Save, Download,
  Palette, MousePointer, ArrowRight,
} from 'lucide-react'
import { toast } from 'sonner'

type Tool = 'pen' | 'eraser' | 'rect' | 'circle' | 'text' | 'select'

export function DrawingCanvas({
  onSave,
  title: initialTitle,
}: {
  onSave: (imageData: string, title: string) => void
  title?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState('#10b981')
  const [lineWidth, setLineWidth] = useState(3)
  const [title, setTitle] = useState(initialTitle || 'Peta Konsep')
  const [isDrawing, setIsDrawing] = useState(false)
  const [history, setHistory] = useState<ImageData[]>([])
  const startPos = useRef({ x: 0, y: 0 })
  const savedImage = useRef<ImageData | null>(null)

  const saveState = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setHistory(prev => [...prev.slice(-20), imageData])
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    // Set background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const pos = getMousePos(e)
    startPos.current = pos
    setIsDrawing(true)

    if (tool === 'pen' || tool === 'eraser') {
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    } else if (tool === 'text') {
      const text = prompt('Masukkan teks:')
      if (text) {
        ctx.fillStyle = color
        ctx.font = `${lineWidth * 5}px Inter, sans-serif`
        ctx.fillText(text, pos.x, pos.y)
        saveState()
      }
      setIsDrawing(false)
    } else {
      // Save current state for shape preview
      savedImage.current = ctx.getImageData(0, 0, canvas.width, canvas.height)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const pos = getMousePos(e)

    if (tool === 'pen') {
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = lineWidth * 3
      ctx.lineCap = 'round'
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    } else if ((tool === 'rect' || tool === 'circle') && savedImage.current) {
      ctx.putImageData(savedImage.current, 0, 0)
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      if (tool === 'rect') {
        ctx.strokeRect(startPos.current.x, startPos.current.y, pos.x - startPos.current.x, pos.y - startPos.current.y)
      } else {
        const radius = Math.hypot(pos.x - startPos.current.x, pos.y - startPos.current.y)
        ctx.beginPath()
        ctx.arc(startPos.current.x, startPos.current.y, radius, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
  }

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveState()
    }
  }

  const handleUndo = () => {
    if (history.length < 2) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const prevState = history[history.length - 2]
    ctx.putImageData(prevState, 0, 0)
    setHistory(prev => prev.slice(0, -1))
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveState()
    toast.success('Kanvas dibersihkan')
  }

  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataURL = canvas.toDataURL('image/png')
    onSave(dataURL, title)
    toast.success('Gambar disimpan')
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `${title || 'peta-konsep'}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const tools: Array<{ id: Tool; icon: typeof Pen; label: string }> = [
    { id: 'pen', icon: Pen, label: 'Pena' },
    { id: 'eraser', icon: Eraser, label: 'Penghapus' },
    { id: 'rect', icon: Square, label: 'Kotak' },
    { id: 'circle', icon: Circle, label: 'Lingkaran' },
    { id: 'text', icon: Type, label: 'Teks' },
  ]

  const colors = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#000000', '#ffffff']

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Palette className="w-4 h-4 text-emerald-600" />
            Alat Menggambar — Peta Konsep / Desain
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {/* Tools */}
            <div className="flex gap-1">
              {tools.map(t => {
                const Icon = t.icon
                return (
                  <button
                    key={t.id}
                    onClick={() => setTool(t.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      tool === t.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    }`}
                    title={t.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                )
              })}
            </div>

            <div className="h-8 w-px bg-slate-300" />

            {/* Colors */}
            <div className="flex gap-1">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    color === c ? 'border-slate-800 scale-110' : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <div className="h-8 w-px bg-slate-300" />

            {/* Line Width */}
            <div className="flex items-center gap-2">
              <Label className="text-xs">Ketebalan:</Label>
              <input
                type="range"
                min="1"
                max="10"
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                className="w-20"
              />
              <span className="text-xs font-mono w-6">{lineWidth}</span>
            </div>

            <div className="h-8 w-px bg-slate-300" />

            {/* Actions */}
            <Button size="sm" variant="outline" onClick={handleUndo}>
              <Undo className="w-3 h-3 mr-1" />Undo
            </Button>
            <Button size="sm" variant="outline" onClick={handleClear} className="text-red-600">
              <Trash2 className="w-3 h-3 mr-1" />Bersihkan
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="w-3 h-3 mr-1" />Download
            </Button>
          </div>

          {/* Title */}
          <div className="flex items-center gap-2 max-w-md">
            <Label className="text-xs whitespace-nowrap">Judul Karya:</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Peta Konsep Berpikir Komputasional" />
          </div>
        </CardContent>
      </Card>

      {/* Canvas */}
      <div className="border-2 border-slate-300 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={900}
          height={600}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full cursor-crosshair touch-none"
          style={{ aspectRatio: '3/2' }}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700" size="lg">
          <Save className="w-4 h-4 mr-2" />
          Simpan Karya
        </Button>
      </div>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-3 pb-3">
          <p className="text-xs text-blue-800">
            💡 <strong>Tips:</strong> Gunakan alat <strong>Teks</strong> untuk menambahkan kata/node pada peta konsep,
            lalu hubungkan dengan alat <strong>Pena</strong>. Gunakan <strong>Kotak</strong> dan <strong>Lingkaran</strong>
            untuk membuat bentuk node yang rapi.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
