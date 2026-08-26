#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script untuk jalankan SQL langsung ke database Supabase via psycopg2.
Alternatif kalau SQL Editor menolak file terlalu besar.

CARA PAKAI:
1. Install psycopg2-binary:  pip install psycopg2-binary
2. Set DATABASE_URL environment variable, atau edit langsung di bawah
3. Jalankan:  python3 run_sql_direct.py

DATABASE_URL didapat dari:
- Supabase Dashboard → Settings → Database → Connection string
- Pilih "Transaction" mode (port 6543) untuk runtime query
"""

import os
import sys
import glob

# ─── KONFIGURASI ───────────────────────────────────────────────
# Edit ini atau set environment variable DATABASE_URL
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://postgres.PROJECT:PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"
)
# ───────────────────────────────────────────────────────────────

SQL_PARTS_DIR = "/home/z/my-project/download/sql_parts"


def main():
    # Cek psycopg2
    try:
        import psycopg2
    except ImportError:
        print("❌ psycopg2 belum terinstall.")
        print("   Install dengan: pip install psycopg2-binary")
        sys.exit(1)

    # Cek DATABASE_URL
    if "PROJECT" in DATABASE_URL or "PASSWORD" in DATABASE_URL:
        print("❌ DATABASE_URL belum diset!")
        print()
        print("Cara set:")
        print("  1. Edit file ini, ganti DATABASE_URL di atas")
        print("  2. Atau set environment variable:")
        print("     export DATABASE_URL='postgresql://postgres.PROJECT:PASS@host:6543/postgres'")
        print()
        print("Dapat URL dari:")
        print("  Supabase Dashboard → Settings → Database → Connection string")
        print("  Pilih tab 'Transaction' (port 6543)")
        sys.exit(1)

    # Cari semua file SQL di sql_parts/
    sql_files = sorted(glob.glob(os.path.join(SQL_PARTS_DIR, "*.sql")))
    if not sql_files:
        print(f"❌ Tidak ada file SQL di {SQL_PARTS_DIR}")
        print("   Jalankan dulu: python3 scripts/split_sql_parts.py")
        sys.exit(1)

    print(f"📁 Ditemukan {len(sql_files)} file SQL di {SQL_PARTS_DIR}")
    print(f"🔗 Database URL: {DATABASE_URL[:50]}...")
    print()
    print("⚠️  PENTING: Backup database dulu sebelum menjalankan script ini!")
    print("   Supabase → Database → Backups → Create a backup")
    print()
    response = input("Lanjutkan? (ketik 'ya' untuk lanjut): ")
    if response.lower() != 'ya':
        print("❌ Dibatalkan.")
        sys.exit(0)

    # Connect ke database
    print("\n🔌 Menghubungkan ke database...")
    try:
        conn = psycopg2.connect(DATABASE_URL)
        conn.autocommit = False
        cursor = conn.cursor()
        print("✅ Berhasil connect!")
    except Exception as e:
        print(f"❌ Gagal connect: {e}")
        sys.exit(1)

    # Jalankan setiap file
    total_statements = 0
    success_files = 0
    failed_files = []

    for sql_file in sql_files:
        filename = os.path.basename(sql_file)
        print(f"\n📄 Memproses: {filename}")

        with open(sql_file, "r", encoding="utf-8") as f:
            sql_content = f.read()

        # Hitung jumlah statement (kasar)
        statement_count = sql_content.count(";")
        print(f"   {statement_count} statements, {len(sql_content)/1024:.1f} KB")

        try:
            # Execute entire file
            cursor.execute(sql_content)
            conn.commit()
            print(f"   ✅ Berhasil!")
            total_statements += statement_count
            success_files += 1
        except Exception as e:
            conn.rollback()
            print(f"   ❌ GAGAL: {e}")
            failed_files.append((filename, str(e)))

    # Tutup connection
    cursor.close()
    conn.close()

    # Summary
    print("\n" + "=" * 60)
    print("📊 RINGKASAN")
    print("=" * 60)
    print(f"✅ File berhasil: {success_files}/{len(sql_files)}")
    print(f"❌ File gagal: {len(failed_files)}")
    print(f"📝 Total statement dijalankan: ~{total_statements}")

    if failed_files:
        print("\n❌ File yang gagal:")
        for filename, error in failed_files:
            print(f"   - {filename}: {error[:100]}...")

    print("\n🎉 Selesai! Jalankan 99_verifikasi.sql di SQL Editor untuk cek hasil.")


if __name__ == "__main__":
    main()
