// Simple direct diagnostic — no Prisma, raw pg connection
// Run: DATABASE_URL="postgresql://..." npx tsx scripts/db-raw-diag.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  SAKOLA Raw PostgreSQL Diagnostic')
  console.log('═══════════════════════════════════════════════════\n')

  const client = await pool.connect()
  console.log('✓ Connected to PostgreSQL Supabase\n')

  // List all tables
  const tables = await client.query(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' ORDER BY table_name
  `)
  console.log(`Tables in database (${tables.rows.length}):`)
  tables.rows.forEach((r: { table_name: string }) => console.log(`  - ${r.table_name}`))
  console.log()

  // Count records in each table
  const tableNames = tables.rows.map((r: { table_name: string }) => r.table_name)
  let totalRecords = 0
  for (const t of tableNames) {
    try {
      const res = await client.query(`SELECT COUNT(*)::int as count FROM "${t}"`)
      const count = res.rows[0].count
      totalRecords += count
      console.log(`  ${t.padEnd(30)} ${String(count).padStart(6)} records  ${count > 0 ? '✓' : '⚪'}`)
    } catch (err) {
      console.log(`  ${t.padEnd(30)}   ERROR  ❌`)
    }
  }

  console.log(`\n  Total records: ${totalRecords}\n`)

  // Check active student progress
  const progress = await client.query(`
    SELECT p."currentStage", p."lastSavedAt", s."namaLengkap", s."kelas"
    FROM "Progress" p JOIN "Student" s ON p."studentId" = s."id"
    WHERE p."isCompleted" = false
    ORDER BY p."updatedAt" DESC LIMIT 10
  `)
  if (progress.rows.length > 0) {
    console.log(`⚠ ACTIVE STUDENT PROGRESS (${progress.rows.length} students working):`)
    progress.rows.forEach((r: { currentStage: string; lastSavedAt: Date; namaLengkap: string; kelas: string }, i: number) => {
      console.log(`  ${i + 1}. ${r.namaLengkap} (${r.kelas}) — Stage: ${r.currentStage} — Last: ${new Date(r.lastSavedAt).toISOString()}`)
    })
  } else {
    console.log('✓ No active student progress')
  }

  // Check admin user
  const admin = await client.query(`SELECT username, name, role, subject FROM "Teacher" WHERE username = 'admin' LIMIT 1`)
  if (admin.rows.length > 0) {
    console.log(`\n✓ Admin user exists: ${admin.rows[0].name} (role: ${admin.rows[0].role})`)
  } else {
    console.log('\n⚠ No admin user in database')
  }

  console.log('\n═══════════════════════════════════════════════════')
  if (totalRecords > 0) {
    console.log('  RESULT: Database CONNECTED ✓, DATA INTACT ✓')
  } else {
    console.log('  RESULT: Database CONNECTED ✓, but EMPTY ⚠')
  }
  console.log('═══════════════════════════════════════════════════')

  client.release()
  await pool.end()
}

main().catch(err => {
  console.error('❌ FATAL:', err.message)
  process.exit(1)
})
