import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // ── FIX: Disable sharp untuk hindari build stuck di Vercel ──
  // Vercel punya built-in image optimization, tidak perlu sharp lokal
  images: {
    unoptimized: true,
  },
  /* config options here */
  // ── Bug #6 fix: re-enable TypeScript build errors ──
  // Was previously `true` to keep Vercel builds passing while known type
  // errors existed in the codebase. Now that all P0 type errors are fixed
  // (Bug #1-#4), set back to `false` so future type regressions fail the
  // build instead of silently shipping to production.
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
};

export default nextConfig;
