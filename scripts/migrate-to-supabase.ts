#!/usr/bin/env node
/**
 * Script otomatisasi migrasi dari SQLite ke Supabase (PostgreSQL)
 *
 * Cara pakai:
 *   1. Pastikan sudah dapat DATABASE_URL & DIRECT_URL dari Supabase
 *   2. Jalankan: npx tsx scripts/migrate-to-supabase.ts
 *   3. Ikuti instruksi di layar
 *
 * Script ini akan:
 *   - Backup database SQLite lama (rename ke .backup)
 *   - Pastikan prisma/schema.prisma pakai postgresql + directUrl
 *   - Update file .env: DATABASE_URL & DIRECT_URL ke Supabase
 *   - Jalankan db:push untuk membuat tabel di Supabase
 *   - Seed akun guru default
 *   - Seed soal HOTS dan teks bacaan dari data.ts
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const readline = require('readline')

const PROJECT_ROOT = path.resolve(__dirname, '..')
const SCHEMA_PATH = path.join(PROJECT_ROOT, 'prisma/schema.prisma')
const ENV_PATH = path.join(PROJECT_ROOT, '.env')
const DB_PATH = path.join(PROJECT_ROOT, 'db/custom.db')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve))
}

function log(step, msg) {
  console.log(`\n[${step}] ${msg}`)
}

async function main() {
  console.log('='.repeat(60))
  console.log('  MIGRASI DATABASE SQLITE → SUPABASE (POSTGRESQL)')
  console.log('='.repeat(60))
  console.log('\nScript ini akan:')
  console.log('  1. Backup database SQLite lama')
  console.log('  2. Pastikan prisma/schema.prisma pakai postgresql + directUrl')
  console.log('  3. Update file .env: DATABASE_URL & DIRECT_URL → Supabase')
  console.log('  4. Push schema ke Supabase (buat tabel)')
  console.log('  5. Seed akun guru + soal + teks bacaan')
  console.log('\nPastikan Anda sudah:')
  console.log('  ✓ Daftar akun di https://supabase.com')
  console.log('  ✓ Buat project baru di Supabase')
  console.log('  ✓ Dapat connection string dari Supabase')
  console.log()

  // Step 1: Minta DATABASE_URL (port 6543, transaction pooler)
  console.log('─'.repeat(60))
  console.log('📋 Anda akan memasukkan 2 URL dari Supabase:')
  console.log('   1. DATABASE_URL (port 6543 - untuk runtime aplikasi)')
  console.log('   2. DIRECT_URL   (port 5432 - untuk migration)')
  console.log('─'.repeat(60))
  console.log('\n💡 Cara cepat dapatkan kedua URL ini:')
  console.log('   - Di dashboard Supabase → klik tombol "Connect" (pojok kanan atas)')
  console.log('   - Pilih tab "ORMs" → "Prisma"')
  console.log('   - Copy seluruh blok kode yang muncul (mengandung DATABASE_URL & DIRECT_URL)')
  console.log('   - Ganti [YOUR-PASSWORD] dengan password database Anda')
  console.log()

  const supabaseUrl = await question(
    '📋 Masukkan DATABASE_URL (port 6543, diakhiri ?pgbouncer=true):\n> '
  )
  if (!supabaseUrl || !supabaseUrl.startsWith('postgresql://')) {
    console.error('❌ URL tidak valid. Harus diawali "postgresql://"')
    process.exit(1)
  }

  const directUrl = await question(
    '📋 Masukkan DIRECT_URL (port 5432, tanpa ?pgbouncer):\n> '
  )
  if (!directUrl || !directUrl.startsWith('postgresql://')) {
    console.error('❌ URL tidak valid. Harus diawali "postgresql://"')
    process.exit(1)
  }

  // Cek apakah password sudah diganti
  if (supabaseUrl.includes('[YOUR-PASSWORD]') || directUrl.includes('[YOUR-PASSWORD]')) {
    console.error('\n❌ ERROR: [YOUR-PASSWORD] belum diganti!')
    console.error('   Ganti [YOUR-PASSWORD] dengan password database Supabase Anda')
    console.error('   (password yang Anda buat saat setup project)')
    process.exit(1)
  }

  // Konfirmasi
  const confirm = await question(
    `\n⚠️  Ini akan mengubah konfigurasi database. Lanjutkan? (ketik "ya" untuk konfirmasi): `
  )
  if (confirm.toLowerCase() !== 'ya') {
    console.log('Dibatalkan.')
    process.exit(0)
  }

  // Step 2: Backup SQLite lama
  log('1/6', 'Backup database SQLite lama...')
  if (fs.existsSync(DB_PATH)) {
    const backupPath = DB_PATH + '.backup-' + Date.now()
    fs.renameSync(DB_PATH, backupPath)
    console.log(`  ✓ SQLite dibackup ke: ${path.basename(backupPath)}`)
  } else {
    console.log('  ℹ️  Tidak ada SQLite lama, skip backup')
  }

  // Step 3: Pastikan prisma/schema.prisma pakai postgresql + directUrl
  log('2/6', 'Update prisma/schema.prisma (sqlite → postgresql + directUrl)...')
  let schema = fs.readFileSync(SCHEMA_PATH, 'utf8')

  // Ganti provider
  schema = schema.replace(/provider\s*=\s*"sqlite"/g, 'provider  = "postgresql"')

  // Pastikan ada directUrl
  if (!schema.includes('directUrl')) {
    schema = schema.replace(
      /url\s*=\s*env\("DATABASE_URL"\)\s*\n/,
      'url       = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n'
    )
  }
  fs.writeFileSync(SCHEMA_PATH, schema)
  console.log('  ✓ Provider diubah menjadi postgresql + directUrl ditambahkan')

  // Step 4: Update file .env
  log('3/6', 'Update file .env dengan DATABASE_URL & DIRECT_URL...')
  let env = fs.readFileSync(ENV_PATH, 'utf8')

  // Hapus DIRECT_URL lama jika ada
  env = env.replace(/^DIRECT_URL=.*$/gm, '')
  // Hapus DATABASE_URL lama
  env = env.replace(/^DATABASE_URL=.*$/gm, '')

  // Tambahkan kedua URL baru di akhir file
  env = env.trim() + '\n\n' +
    `# Database Supabase (PostgreSQL)\n` +
    `DATABASE_URL="${supabaseUrl}"\n` +
    `DIRECT_URL="${directUrl}"\n`

  fs.writeFileSync(ENV_PATH, env)
  console.log('  ✓ DATABASE_URL & DIRECT_URL di-update')

  // Step 5: Generate Prisma Client baru
  log('4/6', 'Generate Prisma Client untuk PostgreSQL...')
  execSync('bun run db:generate', { cwd: PROJECT_ROOT, stdio: 'inherit' })

  // Step 6: Push schema ke Supabase
  log('5/6', 'Push schema ke Supabase (buat tabel)...')
  execSync('bun run db:push', { cwd: PROJECT_ROOT, stdio: 'inherit' })

  // Step 7: Seed data
  log('6/6', 'Seed data (akun guru + soal + teks bacaan)...')
  execSync('npx tsx scripts/seed-teacher.ts', { cwd: PROJECT_ROOT, stdio: 'inherit' })
  execSync('npx tsx scripts/seed-content.ts', { cwd: PROJECT_ROOT, stdio: 'inherit' })

  console.log('\n' + '='.repeat(60))
  console.log('  ✅ MIGRASI BERHASIL!')
  console.log('='.repeat(60))
  console.log('\nDatabase Supabase sekarang berisi:')
  console.log('  • 1 akun guru (username: guru, password: guru123)')
  console.log('  • 60 soal HOTS (30 kelas 8 + 30 kelas 9)')
  console.log('  • 5 teks bacaan (8A, 8B, 8C, 9A, 9B)')
  console.log('\n💡 Langkah selanjutnya:')
  console.log('  • Restart server: bun run dev')
  console.log('  • Test login guru: https://preview-chat-1d7569eb-4c0f-4376-a085-ebf5d726530e.space-z.ai/?view=teacher')
  console.log('  • Cek tabel di Supabase: dashboard → Table Editor')

  rl.close()
}

main().catch((err) => {
  console.error('\n❌ Migrasi gagal:', err.message)
  console.error('\nUntuk rollback:')
  console.error('  1. Edit prisma/schema.prisma: provider = "sqlite", hapus directUrl')
  console.error('  2. Edit .env: DATABASE_URL="file:./db/custom.db"')
  console.error('  3. Restore db/custom.db dari file .backup-*')
  console.error('  4. Jalankan: bun run db:generate && bun run db:push')
  rl.close()
  process.exit(1)
})
