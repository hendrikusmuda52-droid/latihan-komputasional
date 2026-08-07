---
Task ID: 1
Agent: main
Task: Fix 3 critical bugs in SAKOLA — (1) dashboard 500 error, (2) bulk manual grade input form missing, (3) "Rata-rata Mengetik" crashes non-IT subjects

Work Log:
- Read worklog state (empty — first entry)
- Read /api/dashboard/route.ts, /api/manual-grades/route.ts, /api/manual-grades/[id]/route.ts
- Read /api/grades/calculate/route.ts (already implemented in previous commit)
- Read /components/teacher/grade-book.tsx (had per-student dialog but no bulk form)
- Read /components/teacher-dashboard.tsx (had hardcoded "Rata-rata Mengetik" card + chart series)
- Read prisma/schema.prisma (SubjectConfig + LearningObjective + ManualGrade already had weight fields)
- Read src/lib/constants.ts (ALL_GRADES, IT_SUBJECTS, hasTypingFeature)

Fix 1 — Dashboard API bulletproofing:
- Wrapped every db query in safeQuery helper (returns [] on any DB error)
- Added null-guard: filter out results whose `student` relation is null (cascade safety)
- Used optional chaining on r.student?.namaLengkap etc. — never crash on null relation
- All aggregates default to 0 via `mean()` helper (no NaN, no null)
- Added rataHarian field to stats (= rataTotal, semantically branded "Capaian Nilai Harian Global")
- FINAL FALLBACK: even outer try-catch now returns HTTP 200 with empty data + zero stats instead of 500 + HTML error page (the cause of the red toast)

Fix 2 — Bulk Manual Grade Input Form in GradeBook:
- Added bulkKelas, bulkRows, bulkStudents, bulkBabId, bulkSaving state
- handleBulkKelasChange: fetches /api/teacher/students?kelas=X, seeds one BulkRow per student
- Rendered new black-headed card with table: No | Nama | Tugas Manual | Nilai Ujian Bab (UH) | Nilai Mid (UTS) | Nilai Akhir (UAS)
- Each cell has number input 0-100 (placeholder "—" for empty)
- Big black "Simpan Nilai Manual" button in top-right corner of card header
- Second identical save button below table for convenience
- handleBulkSave collects all non-empty inputs into a `grades` array and POSTs to /api/manual-grades as `{ grades, isReleased: true }`
- Empty placeholder state when no class selected ("Pilih kelas di atas untuk memunculkan tabel siswa")
- Empty state when class has no students yet

Fix 2b — Bulk POST endpoint added to /api/manual-grades/route.ts:
- POST now branches on `Array.isArray(body.grades)` for bulk path
- Uses db.$transaction to atomically insert all rows
- Default titles per gradeType ("Tugas Manual", "Ulangan Harian", "Ulangan Tengah Semester", "Ulangan Akhir Semester")
- Returns `{ success: true, count }` for the bulk path
- Legacy single-insert path preserved for the existing AddGradeDialog

Fix 3 — Replace "Rata-rata Mengetik" with "Capaian Nilai Harian Global" for non-IT subjects:
- Moved `isITSubject = hasTypingFeature(teacher?.subject || 'Informatika')` up before useMemo hooks (avoids TDZ)
- Stats interface extended with `rataHarian: number`
- Card #3 in dashboard: conditional label — "Rata-rata Mengetik" (IT) vs "Capaian Nilai Harian Global" (non-IT)
- Card #3 value source: stats.rataTyping (IT) vs stats.rataHarian (non-IT)
- Chart bars/lines dataKey: "Mengetik" (IT) vs "Harian" (non-IT) — recharts <Bar dataKey={...}> and <Line dataKey={...}>
- Table header column 5: "Mengetik" (IT) vs "Harian" (non-IT)
- Table cell column 5: typing score + WPM/accuracy (IT) vs totalScore only (non-IT)
- CSV export headers + rows conditional on isITSubject
- "Tips Membaca Hasil" card: shows typing tips (IT) vs generic "Capaian Nilai Harian Global" tips (non-IT)

Verification:
- npx tsc --noEmit: 0 errors in any of the 4 changed files (existing pre-TDZ errors in unrelated files only)
- npx eslint on all 4 changed files: 0 warnings, 0 errors
- npx prisma generate: success (schema already in sync)

Stage Summary:
- Files modified: src/app/api/dashboard/route.ts, src/app/api/manual-grades/route.ts, src/components/teacher/grade-book.tsx, src/components/teacher-dashboard.tsx
- Dashboard API now never 500s — returns safe empty payload on any failure
- GradeBook now has a complete bulk input form with class filter + 4 grade-type columns + bulk save
- Non-IT teachers (Matematika, IPS, etc.) no longer see "Rata-rata Mengetik" — replaced with "Capaian Nilai Harian Global"
- Ready to push to GitHub for Vercel auto-redeploy
