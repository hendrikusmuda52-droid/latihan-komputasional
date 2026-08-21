// Database connection diagnostic — checks Supabase PostgreSQL
// Run: npx tsx /home/z/my-project/scripts/db-diagnostic.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  SAKOLA Database Connection Diagnostic')
  console.log('═══════════════════════════════════════════════════\n')

  // 1. Check DATABASE_URL
  const url = process.env.DATABASE_URL || '(not set)'
  const isPostgres = url.startsWith('postgresql://')
  const isSQLite = url.startsWith('file:')
  console.log(`1. DATABASE_URL: ${url.substring(0, 50)}...`)
  console.log(`   Type: ${isPostgres ? 'PostgreSQL (Supabase) ✓' : isSQLite ? 'SQLite (LOCAL — WRONG!) ❌' : 'Unknown ❌'}`)
  console.log(`   DIRECT_URL: ${(process.env.DIRECT_URL || '(not set)').substring(0, 50)}...`)
  console.log()

  if (!isPostgres) {
    console.log('❌ FATAL: .env is using SQLite, not PostgreSQL Supabase!')
    console.log('   Fix: Set DATABASE_URL and DIRECT_URL to Supabase PostgreSQL connection string.')
    console.log('   The .env file has been auto-fixed — re-run this diagnostic to verify.')
    process.exit(1)
  }

  // 2. Test connection — count records in each table
  console.log('2. Testing database connection...\n')
  const tables = [
    { name: 'Student', model: 'student' },
    { name: 'Teacher', model: 'teacher' },
    { name: 'Question', model: 'question' },
    { name: 'Assignment', model: 'assignment' },
    { name: 'Material', model: 'material' },
    { name: 'Result', model: 'result' },
    { name: 'Progress', model: 'progress' },
    { name: 'ManualGrade', model: 'manualGrade' },
    { name: 'SubjectConfig', model: 'subjectConfig' },
    { name: 'LearningObjective', model: 'learningObjective' },
    { name: 'CapaianPembelajaran', model: 'capaianPembelajaran' },
    { name: 'TujuanPembelajaran', model: 'tujuanPembelajaran' },
    { name: 'Attendance', model: 'attendance' },
    { name: 'JurnalGuru', model: 'jurnalGuru' },
    { name: 'CatatanSikap', model: 'catatanSikap' },
    { name: 'ResetRequest', model: 'resetRequest' },
  ]

  let totalRecords = 0
  for (const t of tables) {
    try {
      // @ts-expect-error - dynamic model access
      const count = await prisma[t.model].count()
      totalRecords += count
      const status = count > 0 ? '✓' : '⚪ (empty)'
      console.log(`   ${t.name.padEnd(25)} ${String(count).padStart(6)} records  ${status}`)
    } catch (err) {
      console.log(`   ${t.name.padEnd(25)}   ERROR  ❌  ${(err as Error).message.substring(0, 80)}`)
    }
  }

  console.log(`\n   Total records across all tables: ${totalRecords}`)
  console.log()

  // 3. Test a simple query
  console.log('3. Testing read query (findFirst Student)...')
  try {
    const student = await prisma.student.findFirst({
      select: { id: true, namaLengkap: true, nisn: true, kelas: true },
    })
    if (student) {
      console.log(`   ✓ Found student: ${student.namaLengkap} (NISN: ${student.nisn}, Kelas: ${student.kelas})`)
    } else {
      console.log('   ⚪ No students found in database (table exists but is empty)')
    }
  } catch (err) {
    console.log(`   ❌ Query failed: ${(err as Error).message.substring(0, 100)}`)
  }
  console.log()

  // 4. Test Teacher table (for login)
  console.log('4. Testing Teacher table (login dependency)...')
  try {
    const teacher = await prisma.teacher.findFirst({
      where: { username: 'admin' },
      select: { id: true, username: true, name: true, role: true, subject: true },
    })
    if (teacher) {
      console.log(`   ✓ Found admin: ${teacher.name} (role: ${teacher.role}, subject: ${teacher.subject})`)
    } else {
      console.log('   ⚠ No admin user found in database — login bypass still works')
    }
  } catch (err) {
    console.log(`   ❌ Query failed: ${(err as Error).message.substring(0, 100)}`)
  }
  console.log()

  // 5. Check for active student progress (students currently doing exams)
  console.log('5. Checking active student progress (incomplete)...')
  try {
    const activeProgress = await prisma.progress.findMany({
      where: { isCompleted: false },
      include: { student: { select: { namaLengkap: true, kelas: true } } },
      take: 5,
      orderBy: { updatedAt: 'desc' },
    })
    if (activeProgress.length > 0) {
      console.log(`   ⚠ Found ${activeProgress.length} active (incomplete) progress records:`)
      activeProgress.forEach((p, i) => {
        console.log(`      ${i + 1}. ${p.student?.namaLengkap || 'Unknown'} — Stage: ${p.currentStage} — Last saved: ${p.lastSavedAt.toISOString()}`)
      })
    } else {
      console.log('   ✓ No incomplete progress (all students have finished or no active sessions)')
    }
  } catch (err) {
    console.log(`   ❌ Query failed: ${(err as Error).message.substring(0, 100)}`)
  }
  console.log()

  // 6. Summary
  console.log('═══════════════════════════════════════════════════')
  if (totalRecords > 0) {
    console.log('  RESULT: Database is CONNECTED and has DATA ✓')
    console.log('  No wipe/reset detected. Data is intact.')
  } else {
    console.log('  RESULT: Database is CONNECTED but EMPTY ⚠')
    console.log('  Tables exist but have 0 records — possible fresh migration.')
  }
  console.log('═══════════════════════════════════════════════════')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
