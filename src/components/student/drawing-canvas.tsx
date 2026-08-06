'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Pen, Eraser, Square, Circle, Type, Undo, Trash2, Save, Download,
  Palette, MousePointer2,
} from 'lucide-react'
import { toast } from 'sonner'

type Tool = 'pen' | 'eraser' | 'rect' | 'circle' | 'text' | 'select'

interface Shape {
  type: 'pen' | 'rect' | 'circle' | 'text'
  color: string
  lineWidth: number
  points?: { x: number; y: number }[]
  x?: number
  y?: number
  w?: number
  h?: number
  r?: number
  text?: string
}

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
  const [shapes, setShapes] = useState<Shape[]>([])
  const [selectedShape, setSelectedShape] = useState<number | null>(null)
  const [shiftHeld, setShiftHeld] = useState(false)
  const startPos = useRef({ x: 0, y: 0 })
  const currentPath = useRef<{ x: number; y: number }[]>([])
  const dragOffset = useRef({ x: 0, y: 0 })
  const historyRef = useRef<Shape[][]>([])

  useEffect(() => {
    redraw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shapes, selectedShape])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setShiftHeld(true)
      if (e.key === 'Delete' && selectedShape !== null) {
        historyRef.current.push([...shapes])
        setShapes(shapes.filter((_, i) => i !== selectedShape))
        setSelectedShape(null)
      }
      if (e.key === 'Escape') setSelectedShape(null)
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setShiftHeld(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [shapes, selectedShape])

  const redraw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < shapes.length; i++) {
      drawShape(ctx, shapes[i])
      if (i === selectedShape) drawSelectionBox(ctx, shapes[i])
    }
  }

  const drawShape = (ctx: CanvasRenderingContext2D, s: Shape) => {
    ctx.strokeStyle = s.color
    ctx.fillStyle = s.color
    ctx.lineWidth = s.lineWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (s.type === 'pen' && s.points && s.points.length > 0) {
      ctx.beginPath()
      ctx.moveTo(s.points[0].x, s.points[0].y)
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x, s.points[i].y)
      }
      ctx.stroke()
    } else if (s.type === 'rect') {
      ctx.strokeRect(s.x!, s.y!, s.w!, s.h!)
    } else if (s.type === 'circle') {
      ctx.beginPath()
      ctx.arc(s.x!, s.y!, s.r!, 0, Math.PI * 2)
      ctx.stroke()
    } else if (s.type === 'text') {
      ctx.font = `${s.lineWidth * 5}px Inter, sans-serif`
      ctx.fillText(s.text!, s.x!, s.y!)
    }
  }

  const drawSelectionBox = (ctx: CanvasRenderingContext2D, s: Shape) => {
    let bx, by, bw, bh
    if (s.type === 'pen' && s.points && s.points.length > 0) {
      const xs = s.points.map(p => p.x)
      const ys = s.points.map(p => p.y)
      bx = Math.min(...xs) - 5
      by = Math.min(...ys) - 5
      bw = Math.max(...xs) - bx + 10
      bh = Math.max(...ys) - by + 10
    } else if (s.type === 'rect') {
      bx = Math.min(s.x!, s.x! + s.w!) - 5
      by = Math.min(s.y!, s.y! + s.h!) - 5
      bw = Math.abs(s.w!) + 10
      bh = Math.abs(s.h!) + 10
    } else if (s.type === 'circle') {
      bx = s.x! - s.r! - 5
      by = s.y! - s.r! - 5
      bw = s.r! * 2 + 10
      bh = s.r! * 2 + 10
    } else if (s.type === 'text') {
      bx = s.x! - 5
      by = s.y! - s.lineWidth * 5 - 5
      bw = ctx.measureText(s.text!).width + 10
      bh = s.lineWidth * 5 + 10
    } else return

    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 1.5
    ctx.setLineDash([5, 3])
    ctx.strokeRect(bx, by, bw, bh)
    ctx.setLineDash([])
    // Corner handles
    ctx.fillStyle = '#3b82f6'
    ctx.fillRect(bx - 3, by - 3, 6, 6)
    ctx.fillRect(bx + bw - 3, by - 3, 6, 6)
    ctx.fillRect(bx - 3, by + bh - 3, 6, 6)
    ctx.fillRect(bx + bw - 3, by + bh - 3, 6, 6)
  }

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    }
  }

  const hitTest = (pos: { x: number; y: number }): number => {
    for (let i = shapes.length - 1; i >= 0; i--) {
      const s = shapes[i]
      if (s.type === 'pen' && s.points) {
        for (const p of s.points) {
          if (Math.abs(p.x - pos.x) < 10 && Math.abs(p.y - pos.y) < 10) return i
        }
      } else if (s.type === 'rect') {
        const minX = Math.min(s.x!, s.x! + s.w!)
        const maxX = Math.max(s.x!, s.x! + s.w!)
        const minY = Math.min(s.y!, s.y! + s.h!)
        const maxY = Math.max(s.y!, s.y! + s.h!)
        if (pos.x >= minX && pos.x <= maxX && pos.y >= minY && pos.y <= maxY) return i
      } else if (s.type === 'circle') {
        if (Math.hypot(pos.x - s.x!, pos.y - s.y!) <= s.r!) return i
      } else if (s.type === 'text') {
        const ctx = canvasRef.current?.getContext('2d')
        if (ctx) {
          ctx.font = `${s.lineWidth * 5}px Inter, sans-serif`
          const w = ctx.measureText(s.text!).width
          if (pos.x >= s.x! && pos.x <= s.x! + w && pos.y >= s.y! - s.lineWidth * 5 && pos.y <= s.y!) return i
        }
      }
    }
    return -1
  }

  const moveShape = (idx: number, dx: number, dy: number) => {
    const s = shapes[idx]
    if (s.type === 'pen' && s.points) {
      s.points = s.points.map(p => ({ x: p.x + dx, y: p.y + dy }))
    } else if (s.type === 'rect' || s.type === 'circle' || s.type === 'text') {
      s.x! += dx
      s.y! += dy
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e)
    startPos.current = pos

    if (tool === 'select') {
      const idx = hitTest(pos)
      if (idx >= 0) {
        setSelectedShape(idx)
        setIsDrawing(true)
        dragOffset.current = pos
      } else {
        setSelectedShape(null)
      }
      return
    }

    setIsDrawing(true)
    setSelectedShape(null)

    if (tool === 'pen' || tool === 'eraser') {
      currentPath.current = [pos]
    } else if (tool === 'text') {
      const text = prompt('Masukkan teks:')
      if (text) {
        historyRef.current.push([...shapes])
        setShapes([...shapes, { type: 'text', color, lineWidth, x: pos.x, y: pos.y, text }])
      }
      setIsDrawing(false)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const pos = getMousePos(e)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (tool === 'select' && selectedShape !== null) {
      const dx = pos.x - dragOffset.current.x
      const dy = pos.y - dragOffset.current.y
      moveShape(selectedShape, dx, dy)
      dragOffset.current = pos
      redraw()
      return
    }

    if (tool === 'pen') {
      currentPath.current.push(pos)
      // Draw preview
      redraw()
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(currentPath.current[0].x, currentPath.current[0].y)
      for (let i = 1; i < currentPath.current.length; i++) {
        ctx.lineTo(currentPath.current[i].x, currentPath.current[i].y)
      }
      ctx.stroke()
    } else if (tool === 'eraser') {
      currentPath.current.push(pos)
      redraw()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = lineWidth * 3
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(currentPath.current[0].x, currentPath.current[0].y)
      for (let i = 1; i < currentPath.current.length; i++) {
        ctx.lineTo(currentPath.current[i].x, currentPath.current[i].y)
      }
      ctx.stroke()
    } else if (tool === 'rect' || tool === 'circle') {
      redraw()
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      if (tool === 'rect') {
        let w = pos.x - startPos.current.x
        let h = pos.y - startPos.current.y
        // Shift = square
        if (shiftHeld) {
          const size = Math.max(Math.abs(w), Math.abs(h))
          w = Math.sign(w || 1) * size
          h = Math.sign(h || 1) * size
        }
        ctx.strokeRect(startPos.current.x, startPos.current.y, w, h)
      } else {
        let r = Math.hypot(pos.x - startPos.current.x, pos.y - startPos.current.y)
        // Shift = perfect circle (already is, but make it snap to 15-degree increments)
        if (shiftHeld) {
          r = Math.round(r / 10) * 10
        }
        ctx.beginPath()
        ctx.arc(startPos.current.x, startPos.current.y, r, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
  }

  const handleMouseUp = () => {
    if (!isDrawing) return
    setIsDrawing(false)

    if (tool === 'select') return

    historyRef.current.push([...shapes])

    if ((tool === 'pen' || tool === 'eraser') && currentPath.current.length > 1) {
      setShapes([...shapes, {
        type: 'pen',
        color: tool === 'eraser' ? '#ffffff' : color,
        lineWidth: tool === 'eraser' ? lineWidth * 3 : lineWidth,
        points: [...currentPath.current],
      }])
      currentPath.current = []
    } else if (tool === 'rect') {
      const canvas = canvasRef.current
      if (!canvas) return
      // Get last drawn rect from preview
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      // Re-read from startPos
      const lastPos = startPos.current
      // We need the last mouse position - use a ref
      // Actually, the shape was drawn in mousemove. Let's store it.
      // Simple approach: use the shapes we already have
    }
  }

  // Better approach for rect/circle: store on mouseup
  const handleMouseUpWithShape = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const pos = getMousePos(e)
    setIsDrawing(false)

    if (tool === 'select') return

    historyRef.current.push([...shapes])

    if ((tool === 'pen' || tool === 'eraser') && currentPath.current.length > 1) {
      setShapes([...shapes, {
        type: 'pen',
        color: tool === 'eraser' ? '#ffffff' : color,
        lineWidth: tool === 'eraser' ? lineWidth * 3 : lineWidth,
        points: [...currentPath.current],
      }])
      currentPath.current = []
    } else if (tool === 'rect') {
      let w = pos.x - startPos.current.x
      let h = pos.y - startPos.current.y
      if (shiftHeld) {
        const size = Math.max(Math.abs(w), Math.abs(h))
        w = Math.sign(w || 1) * size
        h = Math.sign(h || 1) * size
      }
      if (Math.abs(w) > 2 && Math.abs(h) > 2) {
        setShapes([...shapes, { type: 'rect', color, lineWidth, x: startPos.current.x, y: startPos.current.y, w, h }])
      }
    } else if (tool === 'circle') {
      let r = Math.hypot(pos.x - startPos.current.x, pos.y - startPos.current.y)
      if (shiftHeld) {
        r = Math.round(r / 10) * 10
      }
      if (r > 2) {
        setShapes([...shapes, { type: 'circle', color, lineWidth, x: startPos.current.x, y: startPos.current.y, r }])
      }
    }
    redraw()
  }

  const handleUndo = () => {
    if (historyRef.current.length === 0) return
    const prev = historyRef.current.pop()
    setShapes(prev || [])
    setSelectedShape(null)
  }

  const handleClear = () => {
    historyRef.current.push([...shapes])
    setShapes([])
    setSelectedShape(null)
    toast.success('Kanvas dibersihkan')
  }

  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    setSelectedShape(null)
    setTimeout(() => {
      const dataURL = canvas.toDataURL('image/png')
      onSave(dataURL, title)
      toast.success('Gambar disimpan')
    }, 100)
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    setSelectedShape(null)
    setTimeout(() => {
      const link = document.createElement('a')
      link.download = `${title || 'peta-konsep'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }, 100)
  }

  const tools: Array<{ id: Tool; icon: typeof Pen; label: string }> = [
    { id: 'select', icon: MousePointer2, label: 'Pilih/Geser' },
    { id: 'pen', icon: Pen, label: 'Pena' },
    { id: 'eraser', icon: Eraser, label: 'Penghapus' },
    { id: 'rect', icon: Square, label: 'Kotak' },
    { id: 'circle', icon: Circle, label: 'Lingkaran' },
    { id: 'text', icon: Type, label: 'Teks' },
  ]

  const colors = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#000000', '#ffffff']

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Palette className="w-4 h-4 text-emerald-600" />
            Alat Menggambar — Peta Konsep / Desain
            {shiftHeld && (
              <Badge className="bg-blue-100 text-blue-700 text-xs ml-2">SHIFT aktif — simetris</Badge>
            )}
            {selectedShape !== null && (
              <Badge className="bg-blue-100 text-blue-700 text-xs ml-2">
                Objek dipilih — Delete untuk hapus, drag untuk geser
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="flex gap-1">
              {tools.map(t => {
                const Icon = t.icon
                return (
                  <button
                    key={t.id}
                    onClick={() => { setTool(t.id); setSelectedShape(null) }}
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

          <div className="flex items-center gap-2 max-w-md">
            <Label className="text-xs whitespace-nowrap">Judul Karya:</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Peta Konsep Berpikir Komputasional" />
          </div>
        </CardContent>
      </Card>

      <div className="border-2 border-slate-300 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={900}
          height={600}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpWithShape}
          onMouseLeave={() => { if (isDrawing) handleMouseUpWithShape({ clientX: 0, clientY: 0 } as React.MouseEvent<HTMLCanvasElement>) }}
          className={`w-full touch-none ${tool === 'select' ? 'cursor-pointer' : 'cursor-crosshair'}`}
          style={{ aspectRatio: '3/2' }}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700" size="lg">
          <Save className="w-4 h-4 mr-2" />
          Simpan Karya
        </Button>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-3 pb-3">
          <p className="text-xs text-blue-800">
            💡 <strong>Tips:</strong> Gunakan <strong>Pilih/Geser</strong> untuk memilih dan menggeser objek yang sudah digambar.
            Tekan <strong>Shift</strong> saat membuat kotak/lingkaran untuk bentuk simetris.
            Tekan <strong>Delete</strong> untuk menghapus objek yang dipilih, <strong>Esc</strong> untuk batal pilih.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/components/ui/badge'
