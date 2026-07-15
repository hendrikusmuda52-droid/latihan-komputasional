import { db } from '../src/lib/db'
import {
  TYPING_TEXTS,
  QUESTIONS_BY_GRADE,
  isStructuredText,
} from '../src/lib/data'

async function main() {
  console.log('Seeding typing texts...')
  // Hapus dulu data lama
  await db.typingText.deleteMany({})
  for (const [grade, content] of Object.entries(TYPING_TEXTS)) {
    await db.typingText.create({
      data: {
        gradeLevel: grade,
        title: `Teks ${grade} - ${isStructuredText(grade as any) ? 'Laporan Terstruktur' : 'Berpikir Komputasional'}`,
        content,
        isStructured: isStructuredText(grade as any),
        isActive: true,
      },
    })
    console.log(`  + Teks ${grade}: ${content.length} chars`)
  }

  console.log('Seeding questions...')
  await db.question.deleteMany({})
  for (const [grade, questions] of Object.entries(QUESTIONS_BY_GRADE)) {
    for (const q of questions) {
      await db.question.create({
        data: {
          gradeLevel: grade,
          question: q.question,
          optionA: q.options[0],
          optionB: q.options[1],
          optionC: q.options[2],
          optionD: q.options[3],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          category: q.category,
          isActive: true,
        },
      })
    }
    console.log(`  + ${questions.length} soal untuk kelas ${grade}`)
  }

  console.log('Done!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
