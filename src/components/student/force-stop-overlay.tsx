'use client'

import { useEffect, useRef, useState } from 'react'

export function ForceStopOverlay({ subject }: { subject: string }) {
  const [forceStop, setForceStop] = useState<{ active: boolean; remainingSeconds: number } | null>(null)
  const [displaySeconds, setDisplaySeconds] = useState(0)
  // Guard to ensure the auto-redirect only fires once even if the interval
  // callback is invoked multiple times before being cleared.
  const redirectedRef = useRef(false)

  useEffect(() => {
    let mounted = true
    const poll = async () => {
      try {
        const res = await fetch(`/api/force-stop?subject=${encodeURIComponent(subject)}`)
        const data = await res.json()
        if (!mounted) return
        if (data.active) {
          setForceStop({ active: true, remainingSeconds: data.remainingSeconds })
          // Server is the source of truth for the remaining time; sync the
          // local countdown to its value on every poll. This runs inside an
          // async callback, so it does not trigger the set-state-in-effect rule.
          setDisplaySeconds(data.remainingSeconds)
          redirectedRef.current = false
        } else {
          setForceStop(null)
          setDisplaySeconds(0)
          redirectedRef.current = false
        }
      } catch {}
    }
    poll() // initial check
    const interval = setInterval(poll, 3000)
    return () => { mounted = false; clearInterval(interval) }
  }, [subject])

  // Countdown timer effect: tick down 1 every second while active.
  // setState is only called inside the interval callback (not synchronously
  // in the effect body), so this is safe per React 19's rules.
  useEffect(() => {
    if (!forceStop?.active) return
    const timer = setInterval(() => {
      setDisplaySeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          // ── FIX: Submit result BEFORE redirect, then go to dashboard ──
          // 1. Dispatch 'force-stop-expired' event so typing-stage/quiz-stage
          //    can submit the final result to /api/result (not just progress)
          // 2. Wait 2.5s for the fetch to complete
          // 3. Redirect to student dashboard (preserves student_token cookie)
          if (!redirectedRef.current) {
            redirectedRef.current = true
            // Notify exercise stages to submit their results immediately
            window.dispatchEvent(new CustomEvent('force-stop-expired'))
            // Also try sendBeacon as a backup (fires even during navigation)
            try {
              const beaconBlob = new Blob(
                [JSON.stringify({ reason: 'force-stop-expired', ts: Date.now() })],
                { type: 'application/json' }
              )
              navigator.sendBeacon('/api/student/progress/force-submit', beaconBlob)
            } catch {}
            // Redirect after 2.5s (gives result fetch time to complete)
            setTimeout(() => {
              window.location.href = '/?view=student-dashboard'
            }, 2500)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [forceStop])

  if (!forceStop?.active) return null

  // Color: HSL hue from 50 (yellow) to 0 (red) as seconds go from 60 to 0
  const hue = Math.round((displaySeconds / 60) * 50)
  const timerColor = `hsl(${hue}, 90%, 55%)`
  const isExpired = displaySeconds <= 0

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center ${
        isExpired ? 'bg-red-900/95 pointer-events-auto' : 'bg-black/80 pointer-events-none'
      }`}
    >
      <div className="text-center">
        {!isExpired ? (
          <>
            <p className="text-white text-xl mb-4 font-semibold">WAKTU BERAKHIR DALAM:</p>
            <p
              className="text-8xl font-bold font-mono tabular-nums"
              style={{ color: timerColor, textShadow: '0 0 30px rgba(0,0,0,0.5)' }}
            >
              {String(Math.floor(displaySeconds / 60)).padStart(2, '0')}:
              {String(displaySeconds % 60).padStart(2, '0')}
            </p>
            <p className="text-white/80 text-sm mt-4">Selesaikan jawaban Anda sebelum waktu habis!</p>
          </>
        ) : (
          <>
            <p className="text-red-400 text-4xl font-bold mb-4">WAKTU HABIS</p>
            <p className="text-white text-lg">Jawaban otomatis tersubmit ke guru</p>
          </>
        )}
      </div>
    </div>
  )
}
