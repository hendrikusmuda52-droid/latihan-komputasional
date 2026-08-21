# SAKOLA Database Migrations

## Anti-Reset Protection

Folder ini berisi migration files Prisma yang mengunci struktur database secara permanen.
Setiap kali Vercel melakukan deploy, `prisma migrate deploy` akan menjalankan migration
files yang ada di sini, BUKAN `prisma db push` yang bisa merombak schema.

## Cara Kerja

1. **Saat deploy Vercel**: `vercel-build` script menjalankan `prisma generate && prisma migrate deploy && next build`.
   `prisma migrate deploy` akan menerapkan semua migration yang belum dijalankan di database.

2. **Saat development lokal**: Gunakan `npx prisma migrate dev --name <nama_migration>` untuk
   membuat migration baru setelah mengubah `schema.prisma`. Ini akan:
   - Membuat folder migration baru di `prisma/migrations/`
   - Menerapkan migration ke database lokal
   - Meng-generate Prisma Client baru

3. **JANGAN gunakan `prisma db push`** untuk perubahan schema di production. Hanya gunakan
   untuk prototyping cepat di development.

## Initial Migration

Migration `0_init` adalah baseline yang merepresentasikan schema database saat ini
(per Agustus 2026). Jika database sudah ada datanya, jalankan:

```bash
npx prisma migrate resolve --applied 0_init
```

Ini menandai migration `0_init` sebagai sudah diterapkan tanpa menjalankan SQL-nya lagi.

## Menambahkan Model/Field Baru

1. Edit `prisma/schema.prisma` (tambah model/field)
2. Jalankan: `npx prisma migrate dev --name nama_perubahan`
3. Commit folder `prisma/migrations/` yang baru ke git
4. Push ke GitHub → Vercel auto-deploy akan menjalankan `prisma migrate deploy`

## Reset Database (HATI-HATI!)

```bash
npx prisma migrate reset
```

Ini akan MENGHAPUS SEMUA DATA dan menerapkan ulang semua migration dari awal.
Hanya gunakan di development, JANGAN di production.
