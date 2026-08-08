// Diagnostic script: verify table columns exist on Supabase
// Run with: npx tsx /home/z/my-project/scripts/check-schema.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const tables = ['LearningObjective', 'Material', 'Assignment', 'SubjectConfig', 'ManualGrade', 'Question', 'TypingText']
  for (const model of tables) {
    try {
      // @ts-expect-error - dynamic model access
      const count = await prisma[model].count()
      console.log(`✓ ${model}: ${count} rows`)
    } catch (err) {
      console.error(`✗ ${model}:`, err instanceof Error ? err.message : err)
    }
  }

  // Test a sample insert into LearningObjective (then delete)
  try {
    const obj = await prisma.learningObjective.create({
      data: {
        subject: 'Informatika',
        gradeLevel: '7',
        chapter: 'TEST_DIAGNOSTIC',
        cp: 'test',
        tp: 'test',
        bobotTugas: 40,
        bobotUH: 60,
        teacherId: 'diag',
      },
    })
    console.log('✓ LearningObjective INSERT works, id:', obj.id)
    await prisma.learningObjective.delete({ where: { id: obj.id } })
    console.log('✓ LearningObjective DELETE works')
  } catch (err) {
    console.error('✗ LearningObjective INSERT FAILED:', err instanceof Error ? err.message : err)
  }

  // Test a sample insert into Material (without tpId)
  try {
    const mat = await prisma.material.create({
      data: {
        title: 'TEST_DIAGNOSTIC',
        content: 'test',
        subject: 'Informatika',
      },
    })
    console.log('✓ Material INSERT (no tpId) works, id:', mat.id)
    await prisma.material.delete({ where: { id: mat.id } })
  } catch (err) {
    console.error('✗ Material INSERT FAILED:', err instanceof Error ? err.message : err)
  }

  // Test a sample insert into Assignment
  try {
    const asn = await prisma.assignment.create({
      data: {
        title: 'TEST_DIAGNOSTIC',
        subject: 'Informatika',
      },
    })
    console.log('✓ Assignment INSERT works, id:', asn.id)
    await prisma.assignment.delete({ where: { id: asn.id } })
  } catch (err) {
    console.error('✗ Assignment INSERT FAILED:', err instanceof Error ? err.message : err)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
