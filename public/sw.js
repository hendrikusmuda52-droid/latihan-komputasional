// Service Worker untuk PWA SAKOLA — Latihan Komputasional
//
// Bug #14 fix: Added version-bumping + auto-update strategy.
// - VERSION constant must be bumped on every deploy (done automatically
//   by Vercel since sw.js is re-served with new content hash)
// - Cache names include VERSION so old caches are cleaned up on activate
// - skipWaiting + clients.claim ensure new SW takes control immediately
// - Listens for SKIP_WAITING message from client (for "Update now" button)

const VERSION = 'v3-2026-08-12-icons';
const CACHE_NAME = `komputasi-${VERSION}`;
const STATIC_CACHE = `komputasi-static-${VERSION}`;
const RUNTIME_CACHE = `komputasi-runtime-${VERSION}`;

// Resources yang di-cache saat install (updated to new school logo icons)
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.ico',
  '/logo-smp.png',
  '/logo-smk.png',
];

// Install: pre-cache static assets + skip waiting (new SW activates immediately)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.log('Pre-cache failed (some assets):', err);
      });
    })
  );
  // Bug #14 fix: skipWaiting so new SW activates immediately (don't wait for all tabs to close)
  self.skipWaiting();
});

// Activate: cleanup old caches from previous versions + claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          // Delete any cache that doesn't match current VERSION
          .filter((name) => !name.endsWith(VERSION))
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Bug #14 fix: claim all clients immediately so new SW controls all tabs
  self.clients.claim();
});

// Message listener: allow client to trigger skipWaiting (for "Update now" button)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch: strategy berdasarkan tipe request
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (Supabase, Gemini API, dll)
  if (url.origin !== self.location.origin) return;

  // Skip API requests (selalu network-first untuk data fresh)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({ error: 'Offline - tidak bisa akses API' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Untuk navigasi (HTML pages): network-first, fallback ke cache
  // Bug #14 fix: this ensures users get fresh HTML on reload, not stale cached version
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, cloned));
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match('/');
          });
        })
    );
    return;
  }

  // Untuk static assets: cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const cloned = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, cloned));
        return response;
      });
    })
  );
});
