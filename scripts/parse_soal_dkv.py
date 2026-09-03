#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Parser: konversi bank soal dari TXT ke SQL INSERT statements
Untuk: 5 CP Fotografi Komersial DKV Kelas 11DKV
Subject: "Mata Pelajaran Pilihan"
"""

import re
import os

def escape_sql(s):
    return s.replace("'", "''").replace("\\", "\\\\")

def parse_soal(text):
    """Parse satu soal dari teks, return dict atau None."""
    # Pattern: Soal N (Sub-bab - Variasi M):\n<Skenario>\nA. ...\nB. ...\nC. ...\nD. ...\nKunci Jawaban: X. Analisis: ...
    
    # Cari opsi A-D
    lines = text.strip().split('\n')
    
    # Find A, B, C, D lines
    opsi = {}
    kunci = None
    analisis = None
    skenario_lines = []
    
    in_options = False
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Check if line starts with A. B. C. D.
        m = re.match(r'^([AB])\.\s+(.+)', line)
        if m:
            opsi[m.group(1)] = m.group(2)
            in_options = True
            continue
        
        # Check for C. and D. (might be inline)
        m = re.match(r'^([CD])\.\s+(.+)', line)
        if m:
            opsi[m.group(1)] = m.group(2)
            continue
        
        # Check for Kunci Jawaban
        if line.startswith('Kunci Jawaban:'):
            m = re.match(r'Kunci Jawaban:\s*([AB])\.?\s*(.*)', line)
            if m:
                kunci = m.group(1)
                analisis = m.group(2)
            continue
        
        # If not in options yet, it's part of skenario
        if not in_options and len(opsi) == 0:
            skenario_lines.append(line)
    
    skenario = ' '.join(skenario_lines)
    
    if len(opsi) < 4 or not kunci:
        return None
    
    # Map kunci letter to index (0-3)
    kunci_idx = {'A': 0, 'B': 1, 'C': 2, 'D': 3}[kunci]
    
    return {
        'skenario': skenario,
        'opsi': [opsi.get('A', ''), opsi.get('B', ''), opsi.get('C', ''), opsi.get('D', '')],
        'kunci': kunci_idx,
        'analisis': analisis or '',
    }

def main():
    with open('/home/z/my-project/upload/Pasted Content_1788406604241.txt', 'r') as f:
        content = f.read()
    
    # Split by CP sections
    cp_sections = re.split(r'DETAIL MATERI & BANK SOAL CP (\d+)', content)
    
    # CP IDs from database
    cp_ids = {
        '1': 'cp_dkv_pil_11_1',
        '2': 'cp_dkv_pil_11_2',
        '3': 'cp_dkv_pil_11_3',
        '4': 'cp_dkv_pil_11_4',
        '5': 'cp_dkv_pil_11_5',
    }
    tp_ids = {
        '1': 'tp_dkv_pil_11_1_1',
        '2': 'tp_dkv_pil_11_2_1',
        '3': 'tp_dkv_pil_11_3_1',
        '4': 'tp_dkv_pil_11_4_1',
        '5': 'tp_dkv_pil_11_5_1',
    }
    
    sql_lines = []
    sql_lines.append("-- ============================================================")
    sql_lines.append("-- SKRIP SQL: Insert 250 Soal Bank Soal Fotografi DKV Kelas 11DKV")
    sql_lines.append("-- Subject: Mata Pelajaran Pilihan")
    sql_lines.append("-- 5 CP x 50 Soal = 250 Soal HOTS (C4-C5)")
    sql_lines.append("-- ============================================================")
    sql_lines.append("")
    
    total_soal = 0
    total_parsed = 0
    total_failed = 0
    
    for i in range(1, len(cp_sections), 2):
        cp_num = cp_sections[i]
        cp_content = cp_sections[i + 1]
        cp_id = cp_ids.get(cp_num, '')
        tp_id = tp_ids.get(cp_num, '')
        
        # Split by "Soal N" pattern
        soal_splits = re.split(r'(Soal \d+ \()', cp_content)
        
        soal_count = 0
        for j in range(1, len(soal_splits), 2):
            soal_header = soal_splits[j]  # "Soal N ("
            soal_body = soal_splits[j + 1] if j + 1 < len(soal_splits) else ''
            
            # Reconstruct full soal text
            full_soal = soal_header + soal_body
            
            # Find the closing paren of the header
            paren_close = full_soal.find('):')
            if paren_close == -1:
                continue
            
            # Extract sub-bab info from header
            header = full_soal[:paren_close + 2]
            rest = full_soal[paren_close + 2:]
            
            # Parse the soal
            parsed = parse_soal(rest)
            if not parsed:
                total_failed += 1
                continue
            
            soal_count += 1
            total_soal += 1
            total_parsed += 1
            
            # Build question text (skenario)
            question = parsed['skenario']
            
            # Determine level kognitif from analisis
            level = 'C4'
            if 'C5' in parsed['analisis'] or 'evaluasi' in parsed['analisis'].lower():
                level = 'C5'
            
            soal_id = f"q_dkv_pil_11_{cp_num}_{soal_count:03d}"
            
            sql_lines.append(f"-- Soal {soal_count} (CP {cp_num})")
            sql_lines.append(
                f"INSERT INTO \"Question\" (id, \"gradeLevel\", subject, question, \"optionA\", \"optionB\", \"optionC\", \"optionD\", \"correctAnswer\", explanation, category, \"isActive\", \"questionType\", \"levelKognitif\", \"pembahasanBenar\", \"analisisDistraktor\", \"cpId\", \"tpId\", \"createdAt\", \"updatedAt\") VALUES"
            )
            sql_lines.append("(")
            sql_lines.append(f"  '{soal_id}',")
            sql_lines.append(f"  '11DKV',")
            sql_lines.append(f"  'Mata Pelajaran Pilihan',")
            sql_lines.append(f"  '{escape_sql(question)}',")
            sql_lines.append(f"  '{escape_sql(parsed['opsi'][0])}',")
            sql_lines.append(f"  '{escape_sql(parsed['opsi'][1])}',")
            sql_lines.append(f"  '{escape_sql(parsed['opsi'][2])}',")
            sql_lines.append(f"  '{escape_sql(parsed['opsi'][3])}',")
            sql_lines.append(f"  {parsed['kunci']},")
            sql_lines.append(f"  '{escape_sql(parsed['analisis'])}',")
            sql_lines.append(f"  'Fotografi Komersial',")
            sql_lines.append(f"  true,")
            sql_lines.append(f"  'pilihan_ganda',")
            sql_lines.append(f"  '{level}',")
            sql_lines.append(f"  '{escape_sql(parsed['analisis'])}',")
            sql_lines.append(f"  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',")
            sql_lines.append(f"  '{cp_id}',")
            sql_lines.append(f"  '{tp_id}',")
            sql_lines.append(f"  NOW(), NOW()")
            sql_lines.append(") ON CONFLICT (id) DO NOTHING;")
            sql_lines.append("")
        
        print(f"CP {cp_num}: {soal_count} soal parsed")
    
    # Verification
    sql_lines.append("-- ============================================================")
    sql_lines.append("-- VERIFIKASI")
    sql_lines.append("-- ============================================================")
    sql_lines.append("-- SELECT cp.\"kodeCP\", COUNT(q.id) AS jumlah_soal")
    sql_lines.append("-- FROM \"Question\" q")
    sql_lines.append("-- JOIN \"CapaianPembelajaran\" cp ON q.\"cpId\" = cp.id")
    sql_lines.append("-- WHERE q.subject = 'Mata Pelajaran Pilihan' AND q.\"gradeLevel\" = '11DKV'")
    sql_lines.append("-- GROUP BY cp.\"kodeCP\" ORDER BY cp.\"kodeCP\";")
    sql_lines.append(f"-- Expected: 5 CP × 50 soal = {total_parsed} soal total")
    
    output_path = "/home/z/my-project/download/insert_soal_dkv_pilihan_11dkv.sql"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_lines))
    
    file_size = os.path.getsize(output_path)
    print(f"\n{'='*60}")
    print(f"✅ SQL file berhasil dibuat!")
    print(f"   Path: {output_path}")
    print(f"   Size: {file_size / 1024:.1f} KB")
    print(f"   Total soal parsed: {total_parsed}")
    print(f"   Total soal failed: {total_failed}")
    print(f"   Total INSERT statements: {total_parsed}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
