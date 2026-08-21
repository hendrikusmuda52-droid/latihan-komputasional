import { PrismaClient } from '@prisma/client'

// ──────────────────────────────────────────────────────────────────
// Prisma Client Configuration for Vercel Serverless + Supabase
// ──────────────────────────────────────────────────────────────────
// FIX: Mencegah error "EMAXCONNSESSION max clients reached" yang terjadi
// saat banyak concurrent request di Vercel serverless functions.
//
// Strategi:
// 1. Singleton pattern via globalThis — hanya 1 instance per serverless
//    function container (hindari bikin PrismaClient baru di setiap request)
// 2. Disable `log: ['query']` di production — logging setiap query
//    membebani I/O dan memperburuk connection pool issue
// 3. Pastikan DATABASE_URL pakai port 6543 (PgBouncer transaction mode)
//    dengan ?pgbouncer=true&connection_limit=1 (lihat .env.example)
// ──────────────────────────────────────────────────────────────────

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only log queries in development (for debugging). In production,
// query logging adds I/O overhead that worsens connection pool exhaustion.
const isDev = process.env.NODE_ENV !== 'production'

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isDev ? ['query', 'error', 'warn'] : ['error', 'warn'],
  })

// Cache the client on globalThis to survive hot reloads in dev
// and to share a single connection across invocations in the same
// serverless function container.
if (isDev) globalForPrisma.prisma = db