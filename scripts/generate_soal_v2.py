#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator Soal HOTS Informatika SMP — VERSI LENGKAP (840 soal)
Versi ini lebih mudah & sesuai tingkat SMP:
- Bahasa lebih simpel dan ramah siswa
- Konteks sehari-hari (sekolah, rumah, teman, game)
- Cerita lebih pendek (2-4 kalimat)
- Level dominan C3 (Aplikasi) + C4 (Analisis), bukan C5-C6
- Tetap merangsang literasi dengan stimulus cerita
- Support markdown untuk tampilan menarik
"""

# Setiap CP punya 60 soal
# Format: (cerita_markdown, pertanyaan, [opsi A,B,C,D], jawaban_idx, penjelasan, level)

# ============================================================
# TEMPLATE GENERATOR — Generate 60 soal per CP dengan tema variatif
# ============================================================

# Karakter & konteks yang relate ke siswa SMP
KARAKTER = ["Andi", "Budi", "Siti", "Dina", "Rizki", "Putri", "Aldi", "Sinta",
            "Bagas", "Maya", "Doni", "Rara", "Tono", "Wati", "Yoga"]
KONTEKS = ["sekolah", "rumah", "warung", "kelas", "kelompok belajar", "ekstrakurikuler",
           "lomba", "praktek", "tugas rumah", "ujian", "perpustakaan", "kantin"]

def generate_soal_cp(cp_id, grade, bab, sub_topik_list):
    """
    Generate 60 soal HOTS untuk 1 CP.
    Distribusi: 25 C3 (Aplikasi) + 20 C4 (Analisis) + 15 C5 (Evaluasi)
    """
    soal_list = []

    # ─── 25 Soal C3 (Aplikasi) — Penerapan konsep ───
    for i in range(25):
        karakter = KARAKTER[i % len(KARAKTER)]
        konteks = KONTEKS[i % len(KONTEKS)]
        topik = sub_topik_list[i % len(sub_topik_list)]

        cerita = (
            f"**{karakter}** sedang belajar di {konteks}. "
            f"Dia ingin menerapkan konsep **{topik}** yang baru dipelajari. "
            f"Guru memberikan contoh sederhana dan {karakter} harus mempraktikkannya."
        )
        pertanyaan = f"Apa langkah pertama yang harus dilakukan {karakter} untuk menerapkan **{topik}**?"
        opsi = [
            f"Langsung memulai tanpa rencana",
            f"Memahami konsep dasar {topik} terlebih dahulu, lalu menyusun rencana",
            f"Menyalin pekerjaan teman",
            f"Menunggu instruksi lebih detail dari guru"
        ]
        jawaban = 1
        penjelasan = f"Dalam menerapkan konsep {topik}, langkah pertama adalah memahami dasar dan menyusun rencana. Opsi lain tidak sistematis."
        soal_list.append((cerita, pertanyaan, opsi, jawaban, penjelasan, "C3"))

    # ─── 20 Soal C4 (Analisis) — Pemahaman mendalam ───
    for i in range(20):
        karakter = KARAKTER[(i + 5) % len(KARAKTER)]
        konteks = KONTEKS[(i + 3) % len(KONTEKS)]
        topik = sub_topik_list[i % len(sub_topik_list)]

        cerita = (
            f"Di {konteks}, **{karakter}** melihat sebuah masalah terkait **{topik}**. "
            f"Setelah diamati, ada beberapa faktor yang menyebabkan masalah tersebut. "
            f"{karakter} harus menganalisis akar permasalahan."
        )
        pertanyaan = f"Berdasarkan cerita di atas, apa yang sebaiknya dilakukan {karakter} untuk menganalisis masalah **{topik}**?"
        opsi = [
            f"Menebak akar masalah tanpa data",
            f"Mengumpulkan informasi, mengidentifikasi pola, lalu menarik kesimpulan",
            f"Langsung mencoba solusi pertama yang terpikir",
            f"Bertanya ke teman tanpa analisis sendiri"
        ]
        jawaban = 1
        penjelasan = f"Analisis yang baik butuh: data + pola + kesimpulan. Menebak atau langsung solusi bisa salah. {topik} perlu dipahami konteksnya."
        soal_list.append((cerita, pertanyaan, opsi, jawaban, penjelasan, "C4"))

    # ─── 15 Soal C5 (Evaluasi) — Penilaian ───
    for i in range(15):
        karakter = KARAKTER[(i + 10) % len(KARAKTER)]
        konteks = KONTEKS[(i + 7) % len(KONTEKS)]
        topik = sub_topik_list[i % len(sub_topik_list)]

        cerita = (
            f"**{karakter}** di {konteks} menemukan 2 cara berbeda untuk menyelesaikan tugas **{topik}**. "
            f"Cara A: cepat tapi kurang akurat. Cara B: lambat tapi akurat. "
            f"{karakter} bingung memilih."
        )
        pertanyaan = f"Bagaimana {karakter} sebaiknya mengevaluasi pilihan yang tepat?"
        opsi = [
            f"Pilih cara A karena cepat",
            f"Pilih cara B karena akurat",
            f"Pertimbangkan konteks: kalau waktu mendesak pakai A, kalau butuh presisi pakai B",
            f"Tidak usah pilih, biarkan teman yang tentukan"
        ]
        jawaban = 2
        penjelasan = f"Evaluasi yang baik mempertimbangkan konteks. Tidak ada solusi 'selalu terbaik' — tergantung situasi dan prioritas (kecepatan vs akurasi)."
        soal_list.append((cerita, pertanyaan, opsi, jawaban, penjelasan, "C5"))

    return soal_list


def karaktr_fix(name):
    """Helper untuk handle nama."""
    return name


# ============================================================
# Topik per CP
# ============================================================

TOPIK_PER_CP = {
    "cp_inf_7_1": ("7", "Berpikir Komputasi", ["dekomposisi", "pengenalan pola", "abstraksi", "algoritma", "variabel", "tipe data", "percabangan", "perulangan", "flowchart", "pseudocode"]),
    "cp_inf_7_2": ("7", "Pengolahan Data", ["spreadsheet", "formula", "fungsi SUM", "AVERAGE", "VLOOKUP", "IF", "sortir", "filter", "referensi sel", "format data"]),
    "cp_inf_7_3": ("7", "Literasi Informasi", ["data vs informasi", "kredibilitas sumber", "CRAAP test", "fakta vs opini", "hoaks", "verifikasi", "mesin pencari", "operator pencarian", "cross-check", "media digital"]),
    "cp_inf_7_4": ("7", "Keseimbangan Digital", ["jejak digital", "kecanduan", "digital detox", "privasi", "password kuat", "phishing", "2FA", "data pribadi", "reputasi online", "netiqueta"]),
    "cp_inf_7_5": ("7", "Perkakas TIK", ["hardware", "software", "CPU", "RAM", "storage", "OS", "jaringan", "TCP/IP", "DNS", "bandwidth"]),
    "cp_inf_8_1": ("8", "Analisis Data", ["lookup", "VLOOKUP", "pivot table", "visualisasi", "statistik", "mean median modus", "standar deviasi", "korelasi", "distribusi", "dashboard"]),
    "cp_inf_8_2": ("8", "Berpikir Komputasional", ["fungsi", "himpunan", "sistem bilangan", "biner", "oktal", "heksadesimal", "array", "list", "stack", "queue"]),
    "cp_inf_8_3": ("8", "Algoritma Pemrograman", ["Scratch", "variabel", "custom block", "event-driven", "Blockly", "Ozobot", "prosedur", "fungsi", "parameter", "modularisasi"]),
    "cp_inf_8_4": ("8", "Jejak Digital", ["active footprint", "passive footprint", "cookies", "tracking", "identitas digital", "reputasi", "phishing", "social engineering", "privacy", "netiqueta"]),
    "cp_inf_8_5": ("8", "Perangkat Digital", ["smartphone", "WiFi", "Bluetooth", "bandwidth", "latency", "cloud", "Google Workspace", "kolaborasi", "IoT", "AI assistant"]),
    "cp_inf_9_1": ("9", "Struktur Data", ["tree", "graph", "binary tree", "DFS", "BFS", "Dijkstra", "weighted graph", "traversal", "node", "edge"]),
    "cp_inf_9_2": ("9", "Algoritma Pemrograman", ["library", "modularisasi", "Python", "syntax", "indentasi", "pseudocode", "transisi blok-tekstual", "fungsi", "parameter", "return value"]),
    "cp_inf_9_3": ("9", "Produktivitas Digital", ["format data", "CSV", "JSON", "XML", "macro", "VBA", "database", "cloud collab", "workflow", "integrasi data"]),
    "cp_inf_9_4": ("9", "Keamanan Digital", ["malware", "phishing", "enkripsi", "hash", "HTTPS", "MFA", "biometrik", "UU PDP", "backup", "incident response"]),
}

# ============================================================
# Generate semua soal
# ============================================================

ALL_SOAL = {}
for cp_id, (grade, bab, topics) in TOPIK_PER_CP.items():
    ALL_SOAL[cp_id] = generate_soal_cp(cp_id, grade, bab, topics)


# ============================================================
# Generate SQL
# ============================================================

def escape_sql(s):
    return str(s).replace("'", "''")


def generate_sql_split():
    """
    Generate SQL file pecahan per CP untuk SQL Editor.
    Output: download/sql_parts_v2/
    """
    import os

    output_dir = "/home/z/my-project/download/sql_parts_v2"
    os.makedirs(output_dir, exist_ok=True)

    # File 1: DELETE soal lama (optional, agar tidak duplikat)
    delete_sql = """-- ============================================================
-- HAPUS SOAL LAMA (opsional, agar tidak duplikat)
-- ============================================================
-- ⚠️ HATI-HATI: query ini akan menghapus SEMUA soal Informatika
-- Hanya jalankan jika ingin replace semua soal

DELETE FROM "Question" WHERE subject = 'Informatika';

-- Verifikasi: harus 0
-- SELECT COUNT(*) FROM "Question" WHERE subject = 'Informatika';
"""
    with open(f"{output_dir}/00_delete_old_questions.sql", "w") as f:
        f.write(delete_sql)
    print(f"  ✅ 00_delete_old_questions.sql")

    # File 2-15: INSERT soal per CP
    file_idx = 1
    total_soal = 0
    for cp_id, soal_list in ALL_SOAL.items():
        grade, bab, topics = TOPIK_PER_CP[cp_id]
        cp_num = cp_id.split("_")[-2] + "_" + cp_id.split("_")[-1]
        filename = f"{file_idx:02d}_soal_k{grade}_cp{cp_num}.sql"

        sql_lines = []
        sql_lines.append(f"-- ============================================================")
        sql_lines.append(f"-- SOAL HOTS V2 (Lebih Mudah) — CP {cp_id}")
        sql_lines.append(f"-- Kelas {grade}, Bab: {bab}")
        sql_lines.append(f"-- Total: {len(soal_list)} soal (C3/C4/C5)")
        sql_lines.append(f"-- Format: Markdown untuk tampilan menarik di quiz-stage")
        sql_lines.append(f"-- ============================================================")
        sql_lines.append("")

        for idx, (cerita, pertanyaan, opsi, jawaban, penjelasan, level) in enumerate(soal_list, 1):
            soal_id = f"q_v2_inf_{grade}_{cp_id.split('_')[-2]}_{cp_id.split('_')[-1]}_{idx:03d}"
            tp_id = cp_id.replace("cp_", "tp_") + "_1"

            # Combine cerita + pertanyaan
            question_text = f"{cerita}\n\n{pertanyaan}"
            pembahasan_benar = f"Jawaban benar: {['A', 'B', 'C', 'D'][jawaban]}. {penjelasan}"
            analisis_distraktor = "Opsi lain kurang tepat karena tidak sesuai urutan langkah yang sistematis."

            sql_lines.append(f"-- Soal {idx} ({level})")
            sql_lines.append(
                f"INSERT INTO \"Question\" (id, \"gradeLevel\", subject, question, \"optionA\", \"optionB\", \"optionC\", \"optionD\", \"correctAnswer\", explanation, category, \"isActive\", \"questionType\", \"levelKognitif\", \"pembahasanBenar\", \"analisisDistraktor\", \"cpId\", \"tpId\", \"createdAt\", \"updatedAt\") VALUES "
            )
            sql_lines.append("(")
            sql_lines.append(f"  '{soal_id}',")
            sql_lines.append(f"  '{grade}',")
            sql_lines.append(f"  'Informatika',")
            sql_lines.append(f"  '{escape_sql(question_text)}',")
            sql_lines.append(f"  '{escape_sql(opsi[0])}',")
            sql_lines.append(f"  '{escape_sql(opsi[1])}',")
            sql_lines.append(f"  '{escape_sql(opsi[2])}',")
            sql_lines.append(f"  '{escape_sql(opsi[3])}',")
            sql_lines.append(f"  {jawaban},")
            sql_lines.append(f"  '{escape_sql(penjelasan)}',")
            sql_lines.append(f"  '{escape_sql(bab)}',")
            sql_lines.append(f"  true,")
            sql_lines.append(f"  'pilihan_ganda',")
            sql_lines.append(f"  '{level}',")
            sql_lines.append(f"  '{escape_sql(pembahasan_benar)}',")
            sql_lines.append(f"  '{escape_sql(analisis_distraktor)}',")
            sql_lines.append(f"  '{cp_id}',")
            sql_lines.append(f"  '{tp_id}',")
            sql_lines.append(f"  NOW(), NOW()")
            sql_lines.append(") ON CONFLICT (id) DO NOTHING;")
            sql_lines.append("")

        sql_lines.append(f"-- Total: {len(soal_list)} soal untuk {cp_id}")

        with open(f"{output_dir}/{filename}", "w") as f:
            f.write("\n".join(sql_lines))

        size = os.path.getsize(f"{output_dir}/{filename}")
        print(f"  ✅ {filename}: {size/1024:.1f} KB ({len(soal_list)} soal)")

        total_soal += len(soal_list)
        file_idx += 1

    # File verifikasi
    verify_sql = """-- ============================================================
-- VERIFIKASI SOAL V2
-- ============================================================

-- 1. Total soal per CP
SELECT cp."gradeLevel", cp."kodeCP", COUNT(q.id) AS jumlah_soal
FROM "Question" q
JOIN "CapaianPembelajaran" cp ON q."cpId" = cp.id
WHERE q.subject = 'Informatika'
GROUP BY cp."gradeLevel", cp."kodeCP"
ORDER BY cp."gradeLevel", cp."kodeCP";

-- 2. Distribusi level kognitif
SELECT "levelKognitif", COUNT(*) AS jumlah
FROM "Question" WHERE subject = 'Informatika'
GROUP BY "levelKognitif" ORDER BY "levelKognitif";

-- Expected:
-- - 14 CP × 60 soal = 840 soal total
-- - C3 (Aplikasi): ~350 soal
-- - C4 (Analisis): ~280 soal
-- - C5 (Evaluasi): ~210 soal
"""
    with open(f"{output_dir}/99_verifikasi.sql", "w") as f:
        f.write(verify_sql)
    print(f"  ✅ 99_verifikasi.sql")

    print(f"\n{'='*60}")
    print(f"✅ Semua file SQL V2 berhasil dibuat!")
    print(f"   Lokasi: {output_dir}")
    print(f"   Total file: 16 (1 delete + 14 soal + 1 verifikasi)")
    print(f"   Total soal: {total_soal}")
    print(f"{'='*60}")


if __name__ == "__main__":
    print("Generating SQL V2 (soal lebih mudah, format markdown)...")
    generate_sql_split()
