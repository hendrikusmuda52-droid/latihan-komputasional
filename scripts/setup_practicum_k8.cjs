// Setup script untuk Ujian Praktek Kelas 8 — Pengolahan Data Spreadsheet
//
// Cara pakai:
//   1. Pastikan DATABASE_URL & DIRECT_URL di .env menunjuk ke Supabase produksi
//      (atau database lokal yang valid)
//   2. Jalankan: node scripts/setup_practicum_k8.cjs
//
// Script ini akan:
//   - Upsert assignment "Ujian Praktek Kelas 8 — Pengolahan Data Spreadsheet"
//   - Verifikasi tabel PracticumSubmission ada (jika belum, beri panduan)
//
// AMAN di-run ulang (idempotent — pakai upsert)

const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function checkPracticumTableExists() {
  try {
    // Try to query the table — if it doesn't exist, this will throw
    await db.$queryRaw`SELECT 1 FROM "PracticumSubmission" LIMIT 1`
    return true
  } catch {
    return false
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(' SETUP UJIAN PRAKTEK KELAS 8 — SPREADSHEET')
  console.log('═══════════════════════════════════════════════════════════════\n')

  // ─── Step 1: Cek tabel PracticumSubmission ───
  console.log('Step 1: Memeriksa tabel PracticumSubmission...')
  const tableExists = await checkPracticumTableExists()
  if (tableExists) {
    console.log('✓ Tabel PracticumSubmission sudah ada di database\n')
  } else {
    console.log('✗ Tabel PracticumSubmission BELUM ada!')
    console.log('')
    console.log('   SILAKAN JALANKAN SQL INI di Supabase SQL Editor:')
    console.log('   ───────────────────────────────────────────────')
    console.log('   file: download/migration_practicum_table.sql')
    console.log('')
    console.log('   Atau jalankan via terminal:')
    console.log('   npx prisma db push')
    console.log('')
    console.log('   Setelah tabel dibuat, jalankan script ini lagi.')
    process.exit(1)
  }

  // ─── Step 2: Upsert assignment ───
  console.log('Step 2: Upsert assignment "Ujian Praktek Kelas 8"...')
  try {
    const assignment = await db.assignment.upsert({
      where: { id: 'asg_ujian_praktek_k8' },
      update: {
        title: 'Ujian Praktek Kelas 8 — Pengolahan Data Spreadsheet',
        description:
          'Ujian praktek pengolahan data menggunakan spreadsheet dengan 7 formula: SUM, AVERAGE, IF, VLOOKUP, HLOOKUP, COUNTIF, RANK. Siswa mengolah data penjualan 6 sales Toko Elektronik Nusantara Jaya. Penilaian otomatis berdasarkan formula yang tepat.',
        subject: 'Informatika',
        targetKelas: '8A,8B,8C',
        targetJenjang: 'SMP',
        isActive: true,
        exerciseType: 'wajib',
        questionCount: 7,
        taskType: 'practicum_spreadsheet',
        taskCategory: 'luring',
        taskTypeName: 'Ujian Praktek Spreadsheet',
        tahunAjaran: '2026/2027',
        semester: 'ganjil',
        duration: 60,
        isPunishment: false,
        updatedAt: new Date(),
      },
      create: {
        id: 'asg_ujian_praktek_k8',
        title: 'Ujian Praktek Kelas 8 — Pengolahan Data Spreadsheet',
        description:
          'Ujian praktek pengolahan data menggunakan spreadsheet dengan 7 formula: SUM, AVERAGE, IF, VLOOKUP, HLOOKUP, COUNTIF, RANK. Siswa mengolah data penjualan 6 sales Toko Elektronik Nusantara Jaya. Penilaian otomatis berdasarkan formula yang tepat.',
        subject: 'Informatika',
        targetKelas: '8A,8B,8C',
        targetJenjang: 'SMP',
        isActive: true,
        exerciseType: 'wajib',
        questionCount: 7,
        taskType: 'practicum_spreadsheet',
        taskCategory: 'luring',
        taskTypeName: 'Ujian Praktek Spreadsheet',
        tahunAjaran: '2026/2027',
        semester: 'ganjil',
        duration: 60,
        isPunishment: false,
      },
    })
    console.log('✓ Assignment di-upsert:', assignment.id)
    console.log('  title    :', assignment.title)
    console.log('  taskType :', assignment.taskType)
    console.log('  kelas    :', assignment.targetKelas)
    console.log('  durasi   :', assignment.duration, 'menit')
    console.log('  active   :', assignment.isActive)
  } catch (e) {
    console.error('✗ Gagal upsert assignment:', e.message)
    process.exit(1)
  }

  // ─── Step 3: Verify ───
  console.log('\nStep 3: Verifikasi...')
  const all = await db.assignment.findMany({
    where: { taskType: 'practicum_spreadsheet' },
    select: {
      id: true,
      title: true,
      taskType: true,
      targetKelas: true,
      duration: true,
      isActive: true,
    },
  })
  console.log('\n✓ Assignments dengan taskType=practicum_spreadsheet:')
  if (all.length === 0) {
    console.log('  (tidak ada — cek apakah upsert berhasil)')
  } else {
    all.forEach((a) => {
      console.log(
        `  - ${a.id}: ${a.title} | kelas=${a.targetKelas} | durasi=${a.duration}min | active=${a.isActive}`
      )
    })
  }

  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log(' SETUP SELESAI!')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('\nLangkah selanjutnya:')
  console.log('1. Tunggu Vercel auto-deploy (1-2 menit)')
  console.log('2. Buka aplikasi: https://sakola-staugustinelearningsystem.vercel.app')
  console.log('3. Login sebagai siswa kelas 8A/8B/8C')
  console.log('4. Pilih mapel Informatika → cari "Ujian Praktek Spreadsheet"')
  console.log('5. Klik "Mulai" → masuk halaman spreadsheet')
}

main()
  .catch((e) => {
    console.error('\n✗ Setup gagal:', e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())

