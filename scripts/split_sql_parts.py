#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pecah SQL besar (1.5 MB) menjadi file-file kecil per CP.
Output: download/sql_parts/ — 15 file (1 materi + 14 soal per CP)
"""

import os
import sys

sys.path.insert(0, '/home/z/my-project/scripts')
from generate_sql_materi_dan_soal import ALL_MATERI, ALL_SOAL, TOPIK_PER_CP, escape_sql

OUTPUT_DIR = "/home/z/my-project/download/sql_parts"
os.makedirs(OUTPUT_DIR, exist_ok=True)


def write_sql_file(filename, header_comment, sql_lines):
    """Tulis file SQL ke disk."""
    filepath = os.path.join(OUTPUT_DIR, filename)
    content = f"-- {header_comment}\n-- Auto-generated, jalankan di Supabase SQL Editor\n\n" + "\n".join(sql_lines)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    size = os.path.getsize(filepath)
    print(f"  ✅ {filename}: {size/1024:.1f} KB")
    return filepath


# ============================================================
# File 1: UPDATE Materi (14 statements)
# ============================================================
print("Generating file 1/15: 00_update_materi.sql")
materi_lines = []
materi_lines.append("-- ============================================================")
materi_lines.append("-- UPDATE MATERI DETAIL (14 Bab)")
materi_lines.append("-- ============================================================")
materi_lines.append("")

for m in ALL_MATERI:
    materi_lines.append(f"-- ── {m['title']} ──")
    materi_lines.append(f"UPDATE \"Material\" SET")
    materi_lines.append(f"  title = '{escape_sql(m['title'])}',")
    materi_lines.append(f"  content = '{escape_sql(m['content'])}',")
    materi_lines.append(f"  category = '{escape_sql(m['category'])}',")
    materi_lines.append(f"  \"cpId\" = '{m['cpId']}',")
    materi_lines.append(f"  \"tpId\" = '{m['tpId']}',")
    materi_lines.append(f"  \"targetKelas\" = '{m['targetKelas']}',")
    materi_lines.append(f"  \"targetJenjang\" = 'SMP',")
    materi_lines.append(f"  \"updatedAt\" = NOW()")
    materi_lines.append(f"WHERE id = '{m['id']}';")
    materi_lines.append("")

write_sql_file(
    "00_update_materi.sql",
    "UPDATE MATERI DETAIL — Jalankan pertama kali",
    materi_lines
)

# ============================================================
# File 2-15: INSERT Soal per CP (60 soal per file)
# ============================================================
file_idx = 1
for cp_id, soal_list in ALL_SOAL.items():
    grade, bab, topics = TOPIK_PER_CP[cp_id]
    cp_num = cp_id.split("_")[-2] + "_" + cp_id.split("_")[-1]
    filename = f"{file_idx:02d}_soal_k{grade}_cp{cp_num}.sql"
    print(f"Generating file {file_idx + 1}/15: {filename}")
    
    soal_lines = []
    soal_lines.append(f"-- ============================================================")
    soal_lines.append(f"-- SOAL HOTS — CP {cp_id} (Kelas {grade}, {bab})")
    soal_lines.append(f"-- Total: {len(soal_list)} soal (C4/C5/C6)")
    soal_lines.append(f"-- ============================================================")
    soal_lines.append("")
    
    valid_count = 0
    for idx, soal_data in enumerate(soal_list, 1):
        if len(soal_data) != 6:
            continue
        cerita, pertanyaan, opsi, jawaban, penjelasan, level = soal_data
        if len(opsi) != 4 or jawaban not in [0, 1, 2, 3]:
            continue
        
        valid_count += 1
        soal_id = f"q_inf_{grade}_{cp_id.split('_')[-2]}_{cp_id.split('_')[-1]}_{idx:03d}"
        tp_id = cp_id.replace("cp_", "tp_") + "_1"
        
        question_text = f"{cerita}\n\n{pertanyaan}"
        pembahasan_benar = f"Jawaban benar: {['A', 'B', 'C', 'D'][jawaban]}. {penjelasan}"
        analisis_distraktor = "Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan."
        
        soal_lines.append(f"-- Soal {idx} ({level})")
        soal_lines.append(
            f"INSERT INTO \"Question\" (id, \"gradeLevel\", subject, question, \"optionA\", \"optionB\", \"optionC\", \"optionD\", \"correctAnswer\", explanation, category, \"isActive\", \"questionType\", \"levelKognitif\", \"pembahasanBenar\", \"analisisDistraktor\", \"cpId\", \"tpId\", \"createdAt\", \"updatedAt\") VALUES "
        )
        soal_lines.append("(")
        soal_lines.append(f"  '{soal_id}',")
        soal_lines.append(f"  '{grade}',")
        soal_lines.append(f"  'Informatika',")
        soal_lines.append(f"  '{escape_sql(question_text)}',")
        soal_lines.append(f"  '{escape_sql(opsi[0])}',")
        soal_lines.append(f"  '{escape_sql(opsi[1])}',")
        soal_lines.append(f"  '{escape_sql(opsi[2])}',")
        soal_lines.append(f"  '{escape_sql(opsi[3])}',")
        soal_lines.append(f"  {jawaban},")
        soal_lines.append(f"  '{escape_sql(penjelasan)}',")
        soal_lines.append(f"  '{escape_sql(bab)}',")
        soal_lines.append(f"  true,")
        soal_lines.append(f"  'pilihan_ganda',")
        soal_lines.append(f"  '{level}',")
        soal_lines.append(f"  '{escape_sql(pembahasan_benar)}',")
        soal_lines.append(f"  '{escape_sql(analisis_distraktor)}',")
        soal_lines.append(f"  '{cp_id}',")
        soal_lines.append(f"  '{tp_id}',")
        soal_lines.append(f"  NOW(), NOW()")
        soal_lines.append(") ON CONFLICT (id) DO NOTHING;")
        soal_lines.append("")
    
    soal_lines.append(f"-- Total: {valid_count} soal untuk {cp_id}")
    
    write_sql_file(
        filename,
        f"SOAL HOTS CP {cp_id} — Kelas {grade} {bab} — {valid_count} soal",
        soal_lines
    )
    file_idx += 1

# ============================================================
# Buat juga 1 file verifikasi
# ============================================================
print("\nGenerating verification file...")
verify_lines = [
    "-- ============================================================",
    "-- VERIFIKASI: Cek hasil insert materi + soal",
    "-- ============================================================",
    "",
    "-- 1. Cek materi sudah ter-update (konten panjang)",
    "SELECT id, title, LENGTH(content) AS konten_length, \"cpId\", \"tpId\"",
    "FROM \"Material\" WHERE subject = 'Informatika'",
    "ORDER BY \"targetKelas\", title;",
    "",
    "-- 2. Cek jumlah soal per CP",
    "SELECT cp.\"gradeLevel\", cp.\"kodeCP\", COUNT(q.id) AS jumlah_soal",
    "FROM \"Question\" q",
    "JOIN \"CapaianPembelajaran\" cp ON q.\"cpId\" = cp.id",
    "WHERE q.subject = 'Informatika'",
    "GROUP BY cp.\"gradeLevel\", cp.\"kodeCP\"",
    "ORDER BY cp.\"gradeLevel\", cp.\"kodeCP\";",
    "",
    "-- 3. Cek distribusi level kognitif",
    "SELECT \"levelKognitif\", COUNT(*) AS jumlah",
    "FROM \"Question\" WHERE subject = 'Informatika'",
    "GROUP BY \"levelKognitif\" ORDER BY \"levelKognitif\";",
    "",
    "-- Expected:",
    "-- - 14 materi dengan konten_length > 1000 (konten detail)",
    "-- - 14 CP dengan masing-masing ~60 soal (total ~838)",
    "-- - C4, C5, C6 masing-masing ~280 soal",
]
write_sql_file("99_verifikasi.sql", "VERIFIKASI — Jalankan setelah semua file", verify_lines)

print("\n" + "=" * 60)
print("✅ Semua file SQL berhasil dipecah!")
print(f"   Lokasi: {OUTPUT_DIR}")
print(f"   Total file: 16 (1 materi + 14 soal + 1 verifikasi)")
print("=" * 60)
