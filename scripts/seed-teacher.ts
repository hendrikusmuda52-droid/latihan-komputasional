import { db } from '../src/lib/db'
import crypto from 'crypto'

async function main() {
  const username = 'guru'
  const password = 'guru123'
  const hash = crypto.createHash('sha256').update(password).digest('hex')

  // Hapus dulu jika ada
  await db.teacher.deleteMany({ where: { username } })

  const teacher = await db.teacher.create({
    data: {
      username,
      password: hash,
      name: 'Guru Informatika',
    },
  })

  console.log('Teacher created:', teacher.username, '(password:', password + ')')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
