'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Image as ImageIcon, Download, RefreshCw, X } from 'lucide-react'
import { toast } from 'sonner'

interface TaskPhotoViewerProps {
  assignmentId: string
  studentId: string
  studentName: string
  assignmentTitle: string
}

export function TaskPhotoViewer({
  assignmentId,
  studentId,
  studentName,
  assignmentTitle,
}: TaskPhotoViewerProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<Array<{ id: string; name: string; url: string }>>([])

  const fetchPhotos = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/teacher/task-photos?assignmentId=${assignmentId}&studentId=${studentId}`
      )
      const data = await res.json()
      if (data.success) {
        setPhotos(data.photos || [])
      } else {
        toast.error('Gagal memuat foto')
        setPhotos([])
      }
    } catch {
      toast.error('Gagal memuat foto')
      setPhotos([])
    } finally {
      setLoading(false)
    }
  }

  const handleOpen = () => {
    setOpen(true)
    fetchPhotos()
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-violet-600 hover:bg-violet-50"
        onClick={handleOpen}
        title="Lihat foto catatan"
      >
        <ImageIcon className="w-3.5 h-3.5 mr-1" />
        <span className="text-xs">Foto</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <ImageIcon className="w-5 h-5 text-violet-600" />
              Foto Catatan: {studentName}
            </DialogTitle>
            <p className="text-xs text-slate-500">Tugas: {assignmentTitle}</p>
          </DialogHeader>

          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              <p className="text-sm">Memuat foto dari Google Drive...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Belum ada foto diupload</p>
              <p className="text-xs mt-1">Siswa belum mengupload foto catatan untuk tugas ini</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {photos.length} foto
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchPhotos}
                  disabled={loading}
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Refresh
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo, i) => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-40 object-cover rounded-lg border border-slate-200 cursor-pointer"
                      onClick={() => window.open(photo.url, '_blank')}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 rounded-b-lg">
                      {photo.name}
                    </div>
                    <a
                      href={photo.url}
                      download={photo.name}
                      className="absolute top-1 right-1 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-700" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
