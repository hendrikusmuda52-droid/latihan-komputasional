'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useResilientFetch — resilient data fetching hook with auto-retry on auth failure
//
// PROBLEM: Many teacher dashboard components fetch data via useEffect+fetch.
// When the teacher_token has a transient issue (Vercel serverless cold start,
// cookie not yet set, race condition), the API returns 401 and the component
// shows "Belum ada data" even though the data exists in DB. User must manually
// refresh the page to see data again.
//
// SOLUTION: This hook:
// 1. Returns { data, loading, error, refetch } — components show spinner
//    during loading instead of "Belum ada data"
// 2. On 401 (auth failure), automatically retries up to 2 times with 1s delay
// 3. On network error, also retries up to 2 times
// 4. After max retries, sets error so component can show "Gagal memuat" with
//    a retry button instead of "Belum ada data"
// 5. Preserves last successful data during refetch (no flicker to empty state)
//
// USAGE:
//   const { data, loading, error, refetch } = useResilientFetch<TypingText[]>(
//     '/api/typing-texts',
//     { deps: [filterGrade] }
//   )
// ─────────────────────────────────────────────────────────────────────────────

interface UseResilientFetchOptions {
  // Dependencies that trigger a refetch when changed (like useEffect deps)
  deps?: unknown[]
  // Max retry attempts on 401 or network error (default: 2)
  maxRetries?: number
  // Delay between retries in ms (default: 1000)
  retryDelay?: number
  // Skip the fetch entirely (useful for conditional fetching)
  enabled?: boolean
}

interface UseResilientFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  // Manually trigger a refetch
  refetch: () => void
  // True if currently retrying (for UI feedback)
  isRetrying: boolean
  retryCount: number
}

export function useResilientFetch<T = unknown>(
  url: string,
  options: UseResilientFetchOptions = {},
): UseResilientFetchResult<T> {
  const {
    deps = [],
    maxRetries = 2,
    retryDelay = 1000,
    enabled = true,
  } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(enabled)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  // Used to trigger manual refetches
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  // Track the last successful data so we don't flicker to empty during refetch
  const lastGoodDataRef = useRef<T | null>(null)
  // Track if this is the first load (so we show full spinner, not retry spinner)
  const isFirstLoadRef = useRef(true)
  // Abort controller for in-flight requests
  const abortRef = useRef<AbortController | null>(null)

  const refetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1)
  }, [])

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    // Cancel any in-flight request
    if (abortRef.current) {
      abortRef.current.abort()
    }
    const abortController = new AbortController()
    abortRef.current = abortController

    let cancelled = false
    let attempt = 0

    const fetchData = async () => {
      // Only show full loading spinner on first load; on refetch keep showing
      // last good data with a subtle "updating" indicator
      if (isFirstLoadRef.current) {
        setLoading(true)
      } else {
        setIsRetrying(true)
      }
      setError(null)

      try {
        const res = await fetch(url, {
          signal: abortController.signal,
          credentials: 'same-origin',  // include cookies
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (cancelled) return

        // Handle 401 — token might be expired or invalid
        if (res.status === 401) {
          if (attempt < maxRetries) {
            attempt++
            setRetryCount(attempt)
            setIsRetrying(true)
            // Wait and retry
            await new Promise(resolve => setTimeout(resolve, retryDelay))
            if (!cancelled && !abortController.signal.aborted) {
              return fetchData()
            }
            return
          }
          // Max retries exceeded
          throw new Error('Sesi login berakhir. Mohon refresh halaman atau login ulang.')
        }

        // Handle 5xx server errors — retry
        if (res.status >= 500) {
          if (attempt < maxRetries) {
            attempt++
            setRetryCount(attempt)
            setIsRetrying(true)
            await new Promise(resolve => setTimeout(resolve, retryDelay))
            if (!cancelled && !abortController.signal.aborted) {
              return fetchData()
            }
            return
          }
          throw new Error('Server bermasalah. Coba lagi sebentar.')
        }

        // Parse JSON — handle non-JSON responses gracefully
        let data: unknown
        try {
          data = await res.json()
        } catch (jsonErr) {
          console.error('[useResilientFetch] JSON parse error for', url, jsonErr)
          throw new Error('Respons server tidak valid (bukan JSON).')
        }

        if (cancelled) return

        // Success — save to state. Return the FULL response object as-is
        // so components can access data.students, data.texts, etc.
        // (Previous extraction logic was broken — it stripped the wrapper
        // object, causing data?.students to be undefined in components.)
        isFirstLoadRef.current = false
        setRetryCount(0)
        setIsRetrying(false)
        setError(null)

        lastGoodDataRef.current = data as T
        setData(data as T)
      } catch (err) {
        if (cancelled || abortController.signal.aborted) return

        // Network error or fetch threw — retry
        if (attempt < maxRetries) {
          attempt++
          setRetryCount(attempt)
          setIsRetrying(true)
          await new Promise(resolve => setTimeout(resolve, retryDelay))
          if (!cancelled && !abortController.signal.aborted) {
            return fetchData()
          }
          return
        }

        // Max retries exceeded — set error
        const errMsg = err instanceof Error ? err.message : 'Gagal memuat data'
        console.error('[useResilientFetch] Final error for', url, err)
        setError(errMsg)
      } finally {
        // Always reset loading + isRetrying when the fetch chain completes
        // (success or final error). Previous code conditionally skipped
        // setLoading(false) based on isFirstLoadRef, but that ref was already
        // set to false in the success path — causing infinite loading.
        if (!cancelled && !abortController.signal.aborted) {
          setLoading(false)
          setIsRetrying(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
      abortRef.current?.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, enabled, refetchTrigger, ...deps])

  return {
    data,
    loading,
    error,
    refetch,
    isRetrying,
    retryCount,
  }
}
