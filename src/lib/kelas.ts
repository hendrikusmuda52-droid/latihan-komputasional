// File: src/lib/kelas.ts
// Helper untuk normalisasi string kelas dan pencocokan kelas siswa vs target kelas.
//
// Konteks:
//   Bug historis: filter tugas di /api/student/assignments memakai
//   .includes() case-sensitive tanpa normalisasi spasi, sehingga
//   "11 DKV" (dengan spasi) tidak cocok dengan "11DKV" (tanpa spasi).
//   Beberapa jalur input siswa (self-register, manual create) juga tidak
//   menormalisasi kelas sebelum disimpan, sehingga data di DB bisa
//   beragam format untuk kelas yang sebenarnya sama.
//
//   Helper ini menyatukan logika normalisasi di satu tempat (DRY principle)
//   agar semua endpoint API memakai definisi yang sama.
//
//   Dipakai di:
//     - /api/student/assignments/route.ts  (filter tugas untuk siswa)
//     - /api/student/materials/route.ts    (filter materi untuk siswa)
//     - /api/teacher/students/route.ts     (POST: sanitasi kelas saat create)
//     - /api/teacher/students/[id]/route.ts (PUT: sanitasi kelas saat update)
//     - /api/student/route.ts              (POST: sanitasi kelas saat self-register)

/**
 * Normalisasi string kelas menjadi format konsisten:
 *   - uppercase semua
 *   - trim spasi di awal/akhir
 *   - hapus spasi di tengah (mis: "11 DKV" -> "11DKV")
 *
 * Format kanonikal yang diharapkan ada di src/lib/constants.ts pada
 * array ALL_GRADES: ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '11DKV', '12DKV']
 *
 * Contoh:
 *   normalizeKelas("11 DKV")     -> "11DKV"
 *   normalizeKelas("  11dkv  ")  -> "11DKV"
 *   normalizeKelas("11  DKV")    -> "11DKV"
 *   normalizeKelas("ALL")        -> "ALL"
 *   normalizeKelas("")           -> ""
 *   normalizeKelas(null)         -> ""
 *   normalizeKelas(undefined)    -> ""
 */
export function normalizeKelas(raw: string | null | undefined): string {
  if (!raw) return ''
  return raw.trim().toUpperCase().replace(/\s+/g, '')
}

/**
 * Cek apakah kelas siswa cocok dengan target kelas dari Assignment/Material.
 *
 * Aturan pencocokan:
 *   1. Jika target kosong atau "ALL" → cocok dengan semua kelas siswa.
 *   2. Jika target berisi daftar kelas yang dipisahkan koma
 *      (mis: "11DKV,12DKV"), siswa dianggap cocok jika kelasnya ada
 *      di daftar tersebut (setelah normalisasi).
 *   3. Pencocokan bersifat case-insensitive dan mengabaikan spasi
 *      di kedua sisi.
 *
 * @param studentKelas  Nilai kelas siswa dari session/DB.
 * @param targetKelas   String target kelas dari Assignment/Material.
 *                      Bisa: "ALL", "11DKV", "11DKV,12DKV", "7A,7B,7C", dll.
 * @returns true jika siswa boleh melihat tugas/materi, false jika tidak.
 *
 * Contoh:
 *   isKelasMatch("11DKV", "ALL")            -> true
 *   isKelasMatch("11 DKV", "11DKV")         -> true  (spasi di siswa diabaikan)
 *   isKelasMatch("11dkv", "11DKV")          -> true  (case-insensitive)
 *   isKelasMatch("12DKV", "11DKV,12DKV")    -> true  (multi-kelas)
 *   isKelasMatch("7A", "11DKV")             -> false
 *   isKelasMatch("", "11DKV")               -> false (siswa tanpa kelas)
 *   isKelasMatch("11DKV", null)             -> false (target kosong)
 */
export function isKelasMatch(
  studentKelas: string | null | undefined,
  targetKelas: string | null | undefined,
): boolean {
  if (!targetKelas) return false

  const target = normalizeKelas(targetKelas)
  // "ALL" atau string kosong setelah normalisasi = izinkan semua kelas
  if (target === 'ALL' || target === '') return true

  const student = normalizeKelas(studentKelas)
  if (!student) return false

  const kelasList = target.split(',').map(k => normalizeKelas(k)).filter(k => k.length > 0)
  return kelasList.includes(student)
}
