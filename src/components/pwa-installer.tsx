'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { Download, Smartphone, Monitor, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  // Lazy init - cek standalone saat first render
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    )
  })
  const [showManualGuide, setShowManualGuide] = useState(false)

  useEffect(() => {
    if (isInstalled) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Tampilkan popup install setelah 3 detik
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed')
        if (!dismissed) {
          setShowDialog(true)
        }
      }, 3000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => setIsInstalled(true))

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Browser tidak support auto-prompt → tampilkan manual guide
      setShowManualGuide(true)
      return
    }
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
    setShowDialog(false)
  }

  const handleDismiss = () => {
    setShowDialog(false)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (isInstalled) return null

  return (
    <>
      <Dialog open={showDialog} onOpenChange={(o) => !o && handleDismiss()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center mx-auto mb-2">
              <Download className="w-7 h-7 text-white" />
            </div>
            <DialogTitle className="text-center text-xl">
              Install Aplikasi
            </DialogTitle>
            <DialogDescription className="text-center">
              Install aplikasi di perangkat Anda untuk akses lebih cepat tanpa perlu link browser.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
              <Smartphone className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Akses Cepat</p>
                <p className="text-xs text-slate-600">Buka dari home screen/taskbar, tanpa buka browser</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Mode Fullscreen</p>
                <p className="text-xs text-slate-600">Tampilan penuh tanpa address bar browser</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
              <Download className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Data Tersimpan</p>
                <p className="text-xs text-slate-600">Progress & login tetap ada walau aplikasi ditutup</p>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleDismiss}>
              Nanti Saja
            </Button>
            <Button onClick={handleInstall} className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="w-4 h-4 mr-1" />
              Install Sekarang
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manual install guide untuk browser yang tidak support auto-prompt */}
      <Dialog open={showManualGuide} onOpenChange={setShowManualGuide}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Cara Install Manual</DialogTitle>
            <DialogDescription className="text-center">
              Browser Anda tidak mendukung install otomatis. Ikuti langkah berikut:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-1">📱 Di Android (Chrome):</p>
              <ol className="text-xs text-blue-800 list-decimal list-inside space-y-1">
                <li>Tap icon menu (⋮) pojok kanan atas</li>
                <li>Pilih "Add to Home screen" atau "Install app"</li>
                <li>Tap "Install"</li>
              </ol>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <p className="text-sm font-semibold text-emerald-900 mb-1">💻 Di PC/Laptop (Chrome/Edge):</p>
              <ol className="text-xs text-emerald-800 list-decimal list-inside space-y-1">
                <li>Klik icon install (⊕) di address bar sebelah kanan</li>
                <li>Atau klik menu (⋮) → "Install Latihan Komputasional"</li>
                <li>Klik "Install"</li>
              </ol>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm font-semibold text-purple-900 mb-1">🍎 Di iPhone/iPad (Safari):</p>
              <ol className="text-xs text-purple-800 list-decimal list-inside space-y-1">
                <li>Tap icon Share (□↑)</li>
                <li>Pilih "Add to Home Screen"</li>
                <li>Tap "Add"</li>
              </ol>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowManualGuide(false)} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Mengerti
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Floating install button (jika user dismiss tapi mau install lagi) */}
      {!showDialog && deferredPrompt && !isInstalled && (
        <button
          onClick={() => setShowDialog(true)}
          className="fixed bottom-4 right-4 z-40 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110"
          title="Install Aplikasi"
        >
          <Download className="w-5 h-5" />
        </button>
      )}
    </>
  )
}
