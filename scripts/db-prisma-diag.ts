// Prisma-based diagnostic with explicit env override
// Run: npx tsx scripts/db-prisma-diag.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['error', 'warn'],
})

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  SAKOLA Database Diagnostic (Prisma)')
  console.log('═══════════════════════════════════════════════════\n')

  const url = process.env.DATABASE_URL || '(not set)'
  console.log(`DATABASE_URL starts with: ${url.substring(0, 30)}...`)
  console.log(`Is PostgreSQL: ${url.startsWith('postgresql')}\n`)

  // Test 1: Count students
  try {
    const studentCount = await prisma.student.count()
    console.log(`✓ Student table: ${studentCount} records`)
    if (studentCount > 0) {
      const s = await prisma.student.findFirst({ select: { namaLengkap: true, nisn: true, kelas: true } })
      console.log(`  Sample: ${s?.namaLengkap} — NISN: ${s?.nisn} — Kelas: ${s?.kelas}`)
    }
  } catch (err) {
    console.log(`❌ Student count failed: ${(err as Error).message.substring(0, 100)}`)
  }

  // Test 2: Count teachers
  try {
    const teacherCount = await prisma.teacher.count()
    console.log(`✓ Teacher table: ${teacherCount} records`)
    if (teacherCount > 0) {
      const t = await prisma.teacher.findFirst({ where: { username: 'admin' }, select: { name: true, role: true, subject: true } })
      console.log(`  Admin: ${t?.name || 'not found'} — role: ${t?.role || '-'} — subject: ${t?.subject || '-'}`)
    }
  } catch (err) {
    console.log(`❌ Teacher count failed: ${(err as Error).message.substring(0, 100)}`)
  }

  // Test 3: Count results
  try {
    const resultCount = await prisma.result.count()
    console.log(`✓ Result table: ${resultCount} records`)
  } catch (err) {
    console.log(`❌ Result count failed: ${(err as Error).message.substring(0, 100)}`)
  }

  // Test 4: Count questions
  try {
    const questionCount = await prisma.question.count()
    console.log(`✓ Question table: ${questionCount} records`)
  } catch (err) {
    console.log(`❌ Question count failed: ${(err as Error).message.substring(0, 100)}`)
  }

  // Test 5: Count assignments
  try {
    const assignmentCount = await prisma.assignment.count()
    console.log(`✓ Assignment table: ${assignmentCount} records`)
  } catch (err) {
    console.log(`❌ Assignment count failed: ${(err as Error).message.substring(0, 100)}`)
  }

  // Test 6: Active progress
  try {
    const activeCount = await prisma.progress.count({ where: { isCompleted: false } })
    console.log(`✓ Active Progress (incomplete): ${activeCount} records`)
    if (activeCount > 0) {
      const active = await prisma.progress.findMany({
        where: { isCompleted: false },
        include: { student: { select: { namaLengkap: true, kelas: true } } },
        orderBy: { updatedAt: 'desc' },
        take: 5,
      })
      active.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.student?.namaLengkap || '?'} (${p.student?.kelas || '?'}) — Stage: ${p.currentStage} — Updated: ${p.updatedAt.toISOString()}`)
      })
    }
  } catch (err) {
    console.log(`❌ Progress count failed: ${(err as Error).message.substring(0, 100)}`)
  }

  // Test 7: Check CapaianPembelajaran (new table)
  try {
    const cpCount = await prisma.capaianPembelajaran.count()
    console.log(`✓ CapaianPembelajaran table: ${cpCount} records`)
  } catch (err) {
    console.log(`❌ CapaianPembelajaran: ${(err as Error).message.substring(0, 100)}`)
  }

  // Test 8: Check TujuanPembelajaran
  try {
    const tpCount = await prisma.tujuanPembelajaran.count()
    console.log(`✓ TujuanPembelajaran table: ${tpCount} records`)
  } catch (err) {
    console.log(`❌ TujuanPembelajaran: ${(err as Error).message.substring(0, 100)}`)
  }

  // Test 9: Attendance
  try {
    const attCount = await prisma.attendance.count()
    console.log(`✓ Attendance table: ${attCount} records`)
  } catch (err) {
    console.log(`❌ Attendance: ${(err as Error).message.substring(0, 100)}`)
  }

  // Test 10: ResetRequest
  try {
    const rrCount = await prisma.resetRequest.count()
    console.log(`✓ ResetRequest table: ${rrCount} records`)
  } catch (err) {
    console.log(`❌ ResetRequest: ${(err as Error).message.substring(0, 100)}`)
  }

  console.log('\n═══════════════════════════════════════════════════')
  console.log('  Diagnostic complete.')
  console.log('═══════════════════════════════════════════════════')
}

main()
  .catch(err => console.error('FATAL:', err))
  .finally(() => prisma.$disconnect())
