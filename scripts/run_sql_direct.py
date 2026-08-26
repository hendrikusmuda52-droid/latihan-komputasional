#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script untuk jalankan SQL langsung ke database Supabase via psycopg2.
Auto-load DATABASE_URL dari file .env (kalau ada), atau dari environment variable.

CARA PAKAI:
1. Install dependencies:
   pip install python-dotenv psycopg2-binary

2. Buat file .env di folder yang sama dengan script ini, isi:
   DATABASE_URL=postgresql://postgres.wkvtjcvsttxypouzdwys:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres

   Ganti [YOUR-PASSWORD] dengan password database Anda.

3. Jalankan:
   python3 run_sql_direct.py

DATABASE_URL didapat dari:
- Supabase Dashboard → Connect → Direct → Transaction pooler → Python
- Pastikan port 6543 (bukan 5432)
"""

import os
import sys
import glob

# ─── LOAD .ENV FILE ────────────────────────────────────────────
# Coba load python-dotenv kalau ada (lebih aman untuk password)
try:
    from dotenv import load_dotenv
    load_dotenv()
    DOTENV_AVAILABLE = True
except ImportError:
    DOTENV_AVAILABLE = False

# ─── KONFIGURASI ───────────────────────────────────────────────
# DATABASE_URL akan otomatis terbaca dari .env atau environment variable
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    ""  # Kosong — harus diisi via .env atau env var
)
# ───────────────────────────────────────────────────────────────

# ─── PATH FOLDER SQL ──────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR) if os.path.basename(SCRIPT_DIR) == "scripts" else SCRIPT_DIR
SQL_PARTS_DIR = os.path.join(PROJECT_ROOT, "download", "sql_parts_v2")

# Fallback: kalau folder tidak ada, tanya user
if not os.path.isdir(SQL_PARTS_DIR):
    # Coba cari di direktori yang sama dengan script
    alt_path = os.path.join(SCRIPT_DIR, "sql_parts_v2")
    if os.path.isdir(alt_path):
        SQL_PARTS_DIR = alt_path
    else:
        print(f"⚠️  Folder SQL tidak ditemukan di: {SQL_PARTS_DIR}")
        print(f"   atau: {alt_path}")
        print(f"\n   Masukkan path folder SQL Anda (atau tekan Enter untuk keluar):")
        user_path = input("   Path folder sql_parts_v2: ").strip()
        if user_path:
            SQL_PARTS_DIR = user_path
        if not os.path.isdir(SQL_PARTS_DIR):
            print(f"❌ Folder tidak ditemukan: {SQL_PARTS_DIR}")
            print(f"\n   Pastikan Anda sudah download folder sql_parts_v2 dari z.ai workspace")
            print(f"   dan letakkan di struktur folder yang sama dengan script ini.")
            sys.exit(1)


def print_help_and_exit():
    """Tampilkan panduan setup DATABASE_URL dan exit."""
    print("=" * 60)
    print("❌ DATABASE_URL belum diset!")
    print("=" * 60)
    print()
    print("CARA SETUP (pilih salah satu):")
    print()
    print("📝 OPSI A — Pakai file .env (RECOMMENDED, paling mudah):")
    print()
    print("   1. Install dependencies:")
    print("      pip install python-dotenv psycopg2-binary")
    print()
    print("   2. Buat file bernama '.env' di folder yang sama dengan script ini")
    print("      Isi dengan (ganti [YOUR-PASSWORD] dengan password Anda):")
    print()
    print("      DATABASE_URL=postgresql://postgres.wkvtjcvsttxypouzdwys:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres")
    print()
    print("   3. Jalankan script lagi:")
    print("      python3 run_sql_direct.py")
    print()
    print("🏷️  OPSI B — Pakai environment variable:")
    print()
    print("   Linux/Mac:")
    print('      export DATABASE_URL="postgresql://postgres.wkvtjcvsttxypouzdwys:PASSWORD_ANDA@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"')
    print()
    print("   Windows PowerShell:")
    print('      $env:DATABASE_URL="postgresql://postgres.wkvtjcvsttxypouzdwys:PASSWORD_ANDA@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"')
    print()
    print("   Lalu jalankan script:")
    print("      python3 run_sql_direct.py")
    print()
    print("📍 Dapat URL dari:")
    print("   Supabase Dashboard → Connect → Direct → Transaction pooler → Python")
    print("   Pastikan port 6543 (Transaction pooler), BUKAN 5432 (Direct connection)")
    print()
    print("💡 Kalau lupa password database:")
    print("   Supabase → Settings → Database → Reset database password")
    print()
    sys.exit(1)


def main():
    # Cek psycopg2 — auto-install kalau belum ada
    try:
        import psycopg2
    except ImportError:
        print("⚠️  psycopg2 belum terinstall. Mencoba auto-install...")
        import subprocess
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "psycopg2-binary"])
            import psycopg2
            print("✅ psycopg2 berhasil di-install!")
        except Exception as e:
            print(f"❌ Gagal auto-install: {e}")
            print("   Install manual dengan: pip install psycopg2-binary")
            sys.exit(1)

    # Cek DATABASE_URL
    if not DATABASE_URL:
        print_help_and_exit()

    # Validasi URL format
    if not DATABASE_URL.startswith("postgresql://"):
        print(f"❌ DATABASE_URL format salah: {DATABASE_URL[:50]}...")
        print("   Harus dimulai dengan 'postgresql://'")
        sys.exit(1)

    # Cek apakah masih ada placeholder [YOUR-PASSWORD]
    if "[YOUR-PASSWORD]" in DATABASE_URL:
        print("❌ DATABASE_URL masih berisi placeholder [YOUR-PASSWORD]!")
        print("   Edit file .env dan ganti [YOUR-PASSWORD] dengan password database asli Anda.")
        print()
        print("   Kalau lupa password:")
        print("   Supabase → Settings → Database → Reset database password")
        sys.exit(1)

    # Cek port (harus 6543 untuk Transaction pooler)
    if ":5432" in DATABASE_URL and ":6543" not in DATABASE_URL:
        print("⚠️  PERINGATAN: URL menggunakan port 5432 (Direct connection)!")
        print("   Ini bisa menyebabkan error 'EMAXCONNSESSION max clients reached'.")
        print("   Sebaiknya gunakan port 6543 (Transaction pooler) untuk bulk insert.")
        print()
        response = input("Lanjut dengan port 5432? (ketik 'ya' untuk lanjut): ")
        if response.lower() != 'ya':
            print("❌ Dibatalkan. Silakan update DATABASE_URL dengan port 6543.")
            sys.exit(0)

    # Cari semua file SQL di sql_parts_v2/
    sql_files = sorted(glob.glob(os.path.join(SQL_PARTS_DIR, "*.sql")))
    if not sql_files:
        print(f"❌ Tidak ada file SQL di {SQL_PARTS_DIR}")
        sys.exit(1)

    # Tampilkan info sebelum mulai
    print("=" * 60)
    print("🚀 SCRIPT EKSEKUSI SQL KE SUPABASE")
    print("=" * 60)
    print(f"📁 Folder SQL: {SQL_PARTS_DIR}")
    print(f"📄 Jumlah file SQL: {len(sql_files)}")
    # Mask password di URL untuk display
    masked_url = DATABASE_URL
    if "@" in masked_url:
        # Sembunyikan password: postgresql://user:PASSWORD@host -> postgresql://user:***@host
        parts = masked_url.split("@", 1)
        prefix = parts[0]
        if ":" in prefix:
            # Hapus password
            proto_user = prefix.rsplit(":", 1)[0]
            masked_url = proto_user + ":***@" + parts[1]
    print(f"🔗 Database URL: {masked_url}")
    print()
    print("⚠️  PENTING: Backup database dulu sebelum menjalankan script ini!")
    print("   Supabase → Database → Backups → Create a backup")
    print()
    print("📋 Yang akan dilakukan script ini:")
    print("   1. Connect ke database Supabase Anda")
    print("   2. Jalankan 16 file SQL berurutan:")
    print("      - 00_delete_old_questions.sql (hapus soal lama)")
    print("      - 01 sampai 14 (insert 840 soal baru)")
    print("      - 99_verifikasi.sql (cek hasil)")
    print("   3. Tampilkan ringkasan akhir")
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
        print("✅ Berhasil connect ke database!")
    except Exception as e:
        print(f"❌ Gagal connect: {e}")
        print()
        print("Kemungkinan penyebab:")
        print("   - Password salah → cek [YOUR-PASSWORD] di file .env")
        print("   - Network issue → cek koneksi internet")
        print("   - URL salah → pastikan format: postgresql://postgres.PROJECT:PASSWORD@host:6543/postgres")
        sys.exit(1)

    # Jalankan setiap file SQL
    total_statements = 0
    success_files = 0
    failed_files = []

    for sql_file in sql_files:
        filename = os.path.basename(sql_file)
        print(f"\n📄 Memproses: {filename}")

        with open(sql_file, "r", encoding="utf-8") as f:
            sql_content = f.read()

        # Hitung jumlah statement (kasar — hitung titik koma)
        statement_count = sql_content.count(";")
        file_size_kb = len(sql_content) / 1024
        print(f"   📊 {statement_count} statements, {file_size_kb:.1f} KB")

        try:
            # Execute entire file content
            cursor.execute(sql_content)
            conn.commit()
            print(f"   ✅ Berhasil!")
            total_statements += statement_count
            success_files += 1
        except Exception as e:
            conn.rollback()
            error_msg = str(e)
            print(f"   ❌ GAGAL: {error_msg}")
            # Kalau error duplicate key, itu OK (ON CONFLICT DO NOTHING)
            if "duplicate key" in error_msg.lower() or "already exists" in error_msg.lower():
                print(f"   ℹ️  (Duplicate — akan di-skip, lanjut...)")
                success_files += 1
            else:
                failed_files.append((filename, error_msg))

    # Tutup connection
    cursor.close()
    conn.close()

    # Summary
    print("\n" + "=" * 60)
    print("📊 RINGKASAN AKHIR")
    print("=" * 60)
    print(f"✅ File berhasil: {success_files}/{len(sql_files)}")
    print(f"❌ File gagal: {len(failed_files)}")
    print(f"📝 Total statement dijalankan: ~{total_statements}")

    if failed_files:
        print("\n❌ File yang gagal:")
        for filename, error in failed_files:
            print(f"   - {filename}")
            print(f"     Error: {error[:200]}...")

    if success_files == len(sql_files):
        print("\n🎉 SEMUA FILE BERHASIL!")
        print("\nLangkah verifikasi:")
        print("   1. Buka Supabase → SQL Editor")
        print("   2. Jalankan query:")
        print('      SELECT cp."gradeLevel", cp."kodeCP", COUNT(q.id) AS jumlah_soal')
        print('      FROM "Question" q')
        print('      JOIN "CapaianPembelajaran" cp ON q."cpId" = cp.id')
        print('      WHERE q.subject = \'Informatika\'')
        print('      GROUP BY cp."gradeLevel", cp."kodeCP"')
        print('      ORDER BY cp."gradeLevel", cp."kodeCP";')
        print("   3. Expected: 14 baris, masing-masing 60 soal (total 840)")
    else:
        print("\n⚠️  Ada file yang gagal. Kirim error ke Z.ai untuk debugging.")


if __name__ == "__main__":
    main()
