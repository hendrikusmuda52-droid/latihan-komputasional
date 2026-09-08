'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface UploadTaskPhotoProps {
  assignmentId: string
  assignmentTitle: string
  studentName: string
  kelas: string
  onUploaded?: () => void
}

export function UploadTaskPhoto({
  assignmentId,
  assignmentTitle,
  studentName,
  kelas,
  onUploaded,
}: UploadTaskPhotoProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    // Validasi: hanya gambar, max 5MB
    const valid: File[] = []
    const newPreviews: string[] = []
    for (const f of selected) {
      if (!f.type.startsWith('image/')) {
        toast.error(`"${f.name}" bukan file gambar`)
        continue
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`"${f.name}" melebihi 5MB`)
        continue
      }
      valid.push(f)
      newPreviews.push(URL.createObjectURL(f))
    }
    // Max 10 foto total
    const combined = [...files, ...valid].slice(0, 10)
    const combinedPreviews = [...previews, ...newPreviews].slice(0, 10)
    if (combined.length > 10) {
      toast.warning('Maksimal 10 foto per tugas')
    }
    setFiles(combined)
    setPreviews(combinedPreviews)
    setUploaded(false)
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
    URL.revokeObjectURL(previews[index])
    setPreviews(previews.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Pilih minimal 1 foto')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('assignmentId', assignmentId)
      for (const f of files) {
        formData.append('files', f)
      }

      const res = await fetch('/api/student/upload-task-photo', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal upload')
      }

      toast.success(data.message || `${data.uploaded} foto berhasil diupload`)
      setUploaded(true)
      setFiles([])
      previews.forEach(p => URL.revokeObjectURL(p))
      setPreviews([])
      if (fileInputRef.current) fileInputRef.current.value = ''
      onUploaded?.()
    } catch (err) {
      console.error('[UploadTaskPhoto] error:', err)
      toast.error(err instanceof Error ? err.message : 'Gagal upload foto')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="border-2 border-violet-200">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Upload className="w-5 h-5 text-violet-600" />
          Upload Foto Catatan Tugas
        </CardTitle>
        <CardDescription className="text-sm">
          Foto catatan tugas "{assignmentTitle}" akan otomatis tersimpan ke Google Drive
          dengan nama: <b>{studentName}_{kelas}_{assignmentTitle.replace(/\s+/g, '_')}.jpg</b>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {uploaded ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-emerald-700">Foto berhasil diupload!</p>
            <p className="text-xs text-slate-500 mt-1">Guru akan meninjau dan memberikan nilai.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => setUploaded(false)}
            >
              Upload Lagi
            </Button>
          </div>
        ) : (
          <>
            {/* Drop zone */}
            <div
              className="border-2 border-dashed border-violet-300 rounded-lg p-6 text-center cursor-pointer hover:bg-violet-50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <ImageIcon className="w-10 h-10 text-violet-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">Klik untuk pilih foto</p>
              <p className="text-xs text-slate-400 mt-1">
                Format: JPG, PNG • Maks 5MB per foto • Maks 10 foto
              </p>
            </div>

            {/* Preview foto */}
            {previews.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs font-medium">
                    {files.length} foto dipilih
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    {files.length}/10
                  </Badge>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {previews.map((preview, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={preview}
                        alt={files[i]?.name || `Foto ${i + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-slate-200"
                      />
                      <button
                        onClick={() => removeFile(i)}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Hapus"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {files[i]?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info naming convention */}
            {files.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
                <p className="font-semibold mb-1">📝 Nama file otomatis:</p>
                <p>
                  Foto akan disimpan dengan nama: <br />
                  <code className="bg-white px-1 py-0.5 rounded">
                    {studentName}_{kelas}_{assignmentTitle.replace(/\s+/g, '_')}.jpg
                  </code>
                  {files.length > 1 && (
                    <>
                      ,<br />
                      <code className="bg-white px-1 py-0.5 rounded">
                        {studentName}_{kelas}_{assignmentTitle.replace(/\s+/g, '_')}_2.jpg
                      </code>
                      , dst.
                    </>
                  )}
                </p>
                <p className="mt-1">
                  Folder: <code className="bg-white px-1 py-0.5 rounded">
                    Google Drive → {studentName} → {assignmentTitle}
                  </code>
                </p>
              </div>
            )}

            {/* Tombol Upload */}
            {files.length > 0 && (
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFiles([])
                    previews.forEach(p => URL.revokeObjectURL(p))
                    setPreviews([])
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                >
                  Batal
                </Button>
                <Button
                  size="sm"
                  className="bg-violet-600 hover:bg-violet-700"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                      Mengupload...
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5 mr-1" />
                      Upload {files.length} Foto
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
