// generate_maintenance_report_docx.js
// Generate Word version of Laporan Maintenance hendrikusmuda52-droid
// Output: /home/z/my-project/download/Laporan_Maintenance_hendrikusmuda52-droid.docx

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  PageBreak, Header, Footer, PageNumber, NumberFormat,
  AlignmentType, HeadingLevel, WidthType, BorderStyle, ShadingType,
  PageOrientation, LevelFormat, TabStopType, TabStopPosition,
} = require("docx");
const fs = require("fs");

// ============================================================
// PALETTE (cascade — match PDF version)
// ============================================================
const COLOR = {
  PRIMARY:    "1E2021",
  MUTED:      "767D80",
  ACCENT:     "236B8E",
  ACCENT2:    "B97058",
  HEADER:     "4A636F",
  COVER:      "44555D",
  BORDER:     "C0CED5",
  STRIPE:     "EFF1F2",
  CARD:       "EBEEF0",
  SUCCESS:    "4A9462",
  WARNING:    "9E7E3E",
  ERROR:      "884B45",
  INFO:       "42668B",
  CODE_BG:    "1E2530",
  CODE_TEXT:  "E6E6E6",
  WHITE:      "FFFFFF",
};

// ============================================================
// FONT PROFILE
// ============================================================
const FONT_HEAD = { ascii: "Calibri", eastAsia: "Calibri" };
const FONT_BODY = { ascii: "Times New Roman", eastAsia: "Times New Roman" };
const FONT_MONO = { ascii: "Consolas", eastAsia: "Consolas" };

// ============================================================
// HELPERS
// ============================================================

function p(text, opts = {}) {
  const {
    bold = false, italic = false, size = 22, color = COLOR.PRIMARY,
    font = FONT_BODY, alignment = AlignmentType.JUSTIFIED,
    spacing = { before: 0, after: 120, line: 312 },
    indent = null,
  } = opts;
  return new Paragraph({
    alignment,
    spacing,
    ...(indent ? { indent } : {}),
    children: [new TextRun({ text, bold, italics: italic, size, color, font })],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180, line: 312 },
    children: [new TextRun({ text, bold: true, size: 32, color: COLOR.PRIMARY, font: FONT_HEAD })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120, line: 312 },
    children: [new TextRun({ text, bold: true, size: 26, color: COLOR.ACCENT, font: FONT_HEAD })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80, line: 312 },
    children: [new TextRun({ text, bold: true, size: 24, color: COLOR.HEADER, font: FONT_HEAD })],
  });
}

// Paragraph with multiple runs (for inline bold/italic/code)
function pRich(runs, opts = {}) {
  const {
    alignment = AlignmentType.JUSTIFIED,
    spacing = { before: 0, after: 120, line: 312 },
    indent = null,
  } = opts;
  return new Paragraph({
    alignment,
    spacing,
    ...(indent ? { indent } : {}),
    children: runs,
  });
}

function run(text, opts = {}) {
  const {
    bold = false, italic = false, size = 22, color = COLOR.PRIMARY,
    font = FONT_BODY,
  } = opts;
  return new TextRun({ text, bold, italics: italic, size, color, font });
}

function code(text, opts = {}) {
  return new TextRun({
    text,
    font: FONT_MONO,
    size: 20,
    color: opts.color || COLOR.PRIMARY,
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    spacing: { before: 0, after: 60, line: 312 },
    indent: { left: 360 + level * 360, hanging: 240 },
    children: [
      new TextRun({ text: "\u2022 ", size: 22, font: FONT_BODY, color: COLOR.PRIMARY }),
      new TextRun({ text, size: 22, font: FONT_BODY, color: COLOR.PRIMARY }),
    ],
  });
}

function numbered(text, n) {
  return new Paragraph({
    spacing: { before: 0, after: 60, line: 312 },
    indent: { left: 480, hanging: 360 },
    children: [
      new TextRun({ text: `${n}. `, bold: true, size: 22, font: FONT_BODY, color: COLOR.PRIMARY }),
      new TextRun({ text, size: 22, font: FONT_BODY, color: COLOR.PRIMARY }),
    ],
  });
}

// Code block: each line is a paragraph with shading
function codeBlock(codeText, label = null) {
  const lines = codeText.split("\n");
  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

  const blocks = [];

  // Optional label
  if (label) {
    blocks.push(new Paragraph({
      spacing: { before: 120, after: 0, line: 240 },
      shading: { type: ShadingType.CLEAR, fill: COLOR.CODE_BG },
      children: [
        new TextRun({ text: " " + label, bold: true, size: 16, color: "7C9BB5", font: FONT_MONO }),
      ],
    }));
  }

  // First line top padding
  if (!label) {
    blocks.push(new Paragraph({
      spacing: { before: 120, after: 0, line: 60 },
      shading: { type: ShadingType.CLEAR, fill: COLOR.CODE_BG },
      children: [new TextRun({ text: " ", size: 8, font: FONT_MONO, color: COLOR.CODE_BG })],
    }));
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Preserve leading spaces
    const indent = line.length - line.replace(/^\s+/, "").length;
    const indentStr = "\u00A0".repeat(indent);
    const content = line.replace(/^\s+/, "");

    blocks.push(new Paragraph({
      spacing: { before: 0, after: 0, line: 240 },
      shading: { type: ShadingType.CLEAR, fill: COLOR.CODE_BG },
      indent: { left: 200, right: 200 },
      children: [
        new TextRun({
          text: indentStr + content,
          size: 18,
          color: COLOR.CODE_TEXT,
          font: FONT_MONO,
        }),
      ],
    }));
  }

  // Trailing small padding line
  blocks.push(new Paragraph({
    spacing: { before: 0, after: 120, line: 60 },
    shading: { type: ShadingType.CLEAR, fill: COLOR.CODE_BG },
    children: [new TextRun({ text: " ", size: 8, font: FONT_MONO, color: COLOR.CODE_BG })],
  }));

  return blocks;
}

// Callout box (single-cell table with colored background)
function callout(title, body, kind = "info") {
  const bgMap = {
    info: COLOR.INFO,
    success: COLOR.SUCCESS,
    warning: COLOR.WARNING,
    danger: COLOR.ERROR,
  };
  const bg = bgMap[kind] || COLOR.INFO;

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.SINGLE, size: 24, color: bg },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: bg },
            margins: { top: 160, bottom: 160, left: 240, right: 240 },
            width: { size: 100, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                spacing: { before: 0, after: 60, line: 280 },
                children: [new TextRun({ text: title, bold: true, size: 22, color: COLOR.WHITE, font: FONT_HEAD })],
              }),
              new Paragraph({
                spacing: { before: 0, after: 0, line: 280 },
                children: [new TextRun({ text: body, size: 20, color: COLOR.WHITE, font: FONT_BODY })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// Generic data table with header + body rows
function dataTable(headers, rows, colWidthsPercent = null, monoCols = []) {
  const numCols = headers.length;
  const widths = colWidthsPercent || Array(numCols).fill(Math.floor(100 / numCols));

  const headerRow = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: headers.map((text, i) =>
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: COLOR.HEADER },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        width: { size: widths[i], type: WidthType.PERCENTAGE },
        children: [new Paragraph({
          spacing: { before: 0, after: 0, line: 280 },
          children: [new TextRun({ text, bold: true, size: 20, color: COLOR.WHITE, font: FONT_HEAD })],
        })],
      })
    ),
  });

  const bodyRows = rows.map((row, rowIdx) =>
    new TableRow({
      cantSplit: true,
      children: row.map((cellText, colIdx) =>
        new TableCell({
          shading: rowIdx % 2 === 1 ? { type: ShadingType.CLEAR, fill: COLOR.STRIPE } : undefined,
          margins: { top: 100, bottom: 100, left: 140, right: 140 },
          width: { size: widths[colIdx], type: WidthType.PERCENTAGE },
          children: [new Paragraph({
            spacing: { before: 0, after: 0, line: 280 },
            children: [new TextRun({
              text: String(cellText),
              size: 20,
              color: COLOR.PRIMARY,
              font: monoCols.includes(colIdx) ? FONT_MONO : FONT_BODY,
            })],
          })],
        })
      ),
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: COLOR.HEADER },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR.HEADER },
      left: { style: BorderStyle.SINGLE, size: 2, color: COLOR.BORDER },
      right: { style: BorderStyle.SINGLE, size: 2, color: COLOR.BORDER },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: COLOR.BORDER },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: COLOR.BORDER },
    },
    rows: [headerRow, ...bodyRows],
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function spacer(size = 120) {
  return new Paragraph({
    spacing: { before: 0, after: size, line: 240 },
    children: [new TextRun({ text: "" })],
  });
}

// ============================================================
// COVER PAGE
// ============================================================
function buildCover() {
  // Use a single-cell table with dark background as cover container
  const coverContent = [
    // Top spacer
    spacer(2400),

    // Eyebrow
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 120, line: 280 },
      children: [new TextRun({
        text: "DOKUMEN INTERNAL \u2014 PEMELIHARAAN APLIKASI",
        size: 18, color: "A4C3D2", font: FONT_HEAD,
      })],
    }),

    // Title line 1
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 0, line: 480 },
      children: [new TextRun({
        text: "Laporan Maintenance",
        bold: true, size: 64, color: COLOR.WHITE, font: FONT_HEAD,
      })],
    }),

    // Title line 2
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 240, line: 480 },
      children: [new TextRun({
        text: "Aplikasi",
        bold: true, size: 64, color: COLOR.WHITE, font: FONT_HEAD,
      })],
    }),

    // Subtitle (project name)
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 360, line: 360 },
      children: [new TextRun({
        text: "hendrikusmuda52-droid",
        bold: true, size: 36, color: "FFD9B3", font: FONT_HEAD,
      })],
    }),
  ];

  // Build cover table (dark background, no borders)
  const coverTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        cantSplit: true,
        children: [new TableCell({
          shading: { type: ShadingType.CLEAR, fill: COLOR.COVER },
          margins: { top: 800, bottom: 800, left: 600, right: 600 },
          width: { size: 100, type: WidthType.PERCENTAGE },
          children: coverContent,
        })],
      }),
    ],
  });

  // Below cover: description block + metadata footer
  const description = [
    spacer(360),

    p("Analisis dan Perbaikan Dua Bug Kritis:", {
      bold: true, size: 24, color: COLOR.PRIMARY, font: FONT_HEAD,
      alignment: AlignmentType.LEFT, spacing: { before: 0, after: 180, line: 320 },
    }),

    pRich([
      run("Bug #1 \u2014 Sinkronisasi Nilai Tugas ke CP & TP", { bold: true, size: 22, color: COLOR.ACCENT, font: FONT_HEAD }),
    ], { alignment: AlignmentType.LEFT, spacing: { before: 0, after: 80, line: 300 } }),

    pRich([
      run("Bug #2 \u2014 Tugas SMK (11 DKV & 12 DKV) Tidak Muncul di Dashboard Siswa", { bold: true, size: 22, color: COLOR.ACCENT, font: FONT_HEAD }),
    ], { alignment: AlignmentType.LEFT, spacing: { before: 0, after: 240, line: 300 } }),

    p("Panduan ramah pemula untuk Analisis Akar Masalah, Solusi Database Supabase, Solusi Logika Kode (JavaScript / Supabase-JS), serta Langkah Testing.", {
      italic: true, size: 20, color: COLOR.MUTED, font: FONT_BODY,
      alignment: AlignmentType.LEFT, spacing: { before: 0, after: 480, line: 300 },
    }),
  ];

  // Metadata footer table
  const metaTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: COLOR.BORDER },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            margins: { top: 120, bottom: 120, left: 0, right: 120 },
            width: { size: 33, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({ spacing: { before: 0, after: 40, line: 260 },
                children: [new TextRun({ text: "Disusun oleh", size: 16, color: COLOR.MUTED, font: FONT_HEAD })] }),
              new Paragraph({ spacing: { before: 0, after: 0, line: 260 },
                children: [new TextRun({ text: "Senior Full-Stack Developer", bold: true, size: 20, color: COLOR.PRIMARY, font: FONT_HEAD })] }),
            ],
          }),
          new TableCell({
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            width: { size: 33, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({ spacing: { before: 0, after: 40, line: 260 },
                children: [new TextRun({ text: "Tanggal", size: 16, color: COLOR.MUTED, font: FONT_HEAD })] }),
              new Paragraph({ spacing: { before: 0, after: 0, line: 260 },
                children: [new TextRun({ text: "20 Agustus 2026", bold: true, size: 20, color: COLOR.PRIMARY, font: FONT_HEAD })] }),
            ],
          }),
          new TableCell({
            margins: { top: 120, bottom: 120, left: 120, right: 0 },
            width: { size: 34, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({ spacing: { before: 0, after: 40, line: 260 },
                children: [new TextRun({ text: "Versi Dokumen", size: 16, color: COLOR.MUTED, font: FONT_HEAD })] }),
              new Paragraph({ spacing: { before: 0, after: 0, line: 260 },
                children: [new TextRun({ text: "v1.0", bold: true, size: 20, color: COLOR.PRIMARY, font: FONT_HEAD })] }),
            ],
          }),
        ],
      }),
    ],
  });

  return [coverTable, ...description, metaTable];
}

// ============================================================
// BODY SECTIONS
// ============================================================
function buildRingkasan() {
  const s = [];
  s.push(h1("Ringkasan Eksekutif"));
  s.push(p("Dokumen ini menganalisis dua bug kritis yang ditemukan pada aplikasi web program digitalisasi sekolah hendrikusmuda52-droid, sebuah proyek yang dibangun di atas stack Next.js, di-hosting di Vercel, dan menggunakan Supabase (PostgreSQL) sebagai database bersama Prisma ORM sebagai lapisan akses data. Aplikasi ini dipakai untuk mengajar siswa tingkat SMP dan SMK, dengan fokus khusus pada dua kelas SMK yaitu 11 DKV dan 12 DKV. Kedua bug yang dibahas berdampak langsung pada pengalaman guru saat memberikan penilaian, serta pada pengalaman siswa SMK saat mencoba mengakses tugas yang sudah diberikan kepada mereka."));
  s.push(p("Bug pertama adalah ketidaksinkronan antara nilai tugas siswa dengan Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP) yang seharusnya terikat pada tugas tersebut. Akibatnya, ketika guru mengekspor nilai per CP untuk lapor-eRapor, hasilnya selalu kosong. Bug kedua adalah tugas yang dibuat guru untuk kelas 11 DKV atau 12 DKV tidak muncul di dashboard siswa yang bersangkutan, meskipun di sisi guru tugas tersebut tercatat sudah aktif. Siswa SMK jadi seolah-olah tidak memiliki tugas sama sekali."));
  s.push(p("Setelah dilakukan investigasi mendalam terhadap kode sumber dan skema database, ditemukan bahwa kedua bug ini bukanlah masalah kompleks pada logika bisnis, melainkan kesalahan pada lapisan transfer data antara frontend dan backend. Bug pertama disebabkan oleh handler API yang menerima field cpId/tpId dari frontend tetapi tidak menyimpannya ke database. Bug kedua disebabkan oleh perbandingan string kelas yang case-sensitive tanpa normalisasi, sehingga \u201c11 DKV\u201d (dengan spasi) tidak cocok dengan \u201c11DKV\u201d (tanpa spasi)."));
  s.push(p("Laporan ini menyediakan tiga lapis solusi: (1) perbaikan skema database Supabase via SQL untuk menormalkan data lama dan menambah index, (2) perbaikan kode JavaScript/TypeScript pada lima file API route yang bermasalah dengan contoh kode before/after, dan (3) panduan testing manual serta checklist pencegahan agar bug serupa tidak terulang. Semua solusi disusun dengan bahasa yang ramah pemula dan dapat diikuti tanpa perlu pengalaman coding sebelumnya."));

  s.push(h3("Ringkasan Dua Bug dalam Sekejap"));
  s.push(spacer(80));
  s.push(dataTable(
    ["Aspek", "Bug #1: Nilai ke CP/TP", "Bug #2: Tugas SMK Tidak Muncul"],
    [
      ["Lokasi utama", "API /api/manual-grades dan /api/result", "API /api/student/assignments"],
      ["Akar masalah", "Field cpId/tpId di-drop saat insert ke DB", "Filter string kelas case-sensitive tanpa normalisasi"],
      ["Dampak pengguna", "Export nilai per CP selalu kosong", "Siswa 11 DKV / 12 DKV tidak melihat tugas"],
      ["Tingkat kerumitan", "Sedang (5 file perlu di-patch)", "Rendah (1 file utama + 1 helper)"],
      ["Estimasi waktu fix", "30\u201345 menit", "20\u201330 menit"],
      ["Risiko regresi", "Rendah (field baru, tidak overwrite data lama)", "Sangat rendah (hanya menambah normalisasi)"],
    ],
    [22, 39, 39]
  ));
  s.push(spacer(160));
  return s;
}

function buildKonteks() {
  const s = [];
  s.push(h1("Konteks Aplikasi"));
  s.push(h2("3.1 Stack Teknologi yang Digunakan"));
  s.push(p("Aplikasi hendrikusmuda52-droid dibangun dengan stack modern yang umum dipakai untuk membangun aplikasi web full-stack dengan kecepatan tinggi. Pemahaman tentang stack ini penting karena setiap komponen memiliki peran berbeda dalam alur data, dan bug yang akan dianalisis berakar pada interaksi antara komponen-komponen tersebut. Berikut adalah daftar komponen utama dan perannya:"));
  s.push(spacer(80));
  s.push(dataTable(
    ["Komponen", "Teknologi", "Peran dalam Aplikasi"],
    [
      ["Frontend", "Next.js (React)", "Halaman dashboard guru & siswa, form input nilai & tugas"],
      ["Hosting Frontend", "Vercel", "Men-deploy aplikasi Next.js secara otomatis dari Git"],
      ["Database", "Supabase (PostgreSQL)", "Menyimpan semua data: siswa, guru, tugas, nilai, CP, TP"],
      ["ORM", "Prisma", "Lapisan akses data yang menerjemahkan kode JS menjadi query SQL"],
      ["Auth", "JWT + Cookie", "Login guru & siswa, session disimpan di cookie HTTP-only"],
      ["Bahasa", "TypeScript", "Superset JavaScript dengan tipe data statis untuk mencegah bug"],
    ],
    [18, 24, 58]
  ));
  s.push(spacer(160));

  s.push(h2("3.2 Struktur Tabel Utama di Database"));
  s.push(pRich([
    run("Berikut adalah enam tabel utama yang relevan dengan kedua bug. Memahami relasi antar tabel adalah kunci untuk memahami mengapa bug bisa terjadi. Tabel-tabel ini didefinisikan di file "),
    code("prisma/schema.prisma"),
    run(" dan diterjemahkan oleh Prisma menjadi skema PostgreSQL di Supabase."),
  ]));
  s.push(spacer(80));
  s.push(dataTable(
    ["Tabel", "Peran", "Field Relevan untuk Bug"],
    [
      ["Student", "Data siswa SMP & SMK", "id, namaLengkap, nisn, kelas, jenjang, sekolah"],
      ["Assignment", "Tugas/materi dari guru", "id, title, targetKelas, targetJenjang, cpId, tpId, tahunAjaran, semester"],
      ["CapaianPembelajaran", "CP (parent)", "id, kodeCP, deskripsi, gradeLevel"],
      ["TujuanPembelajaran", "TP (child of CP)", "id, cpId, kodeTP, deskripsi"],
      ["ManualGrade", "Nilai manual dari guru", "id, studentId, score, cpId, tpId, gradeCategory"],
      ["Result", "Nilai otomatis dari quiz/typing", "id, studentId, assignmentId, totalScore, cpId, tpId"],
    ],
    [22, 24, 54]
  ));
  s.push(spacer(160));

  s.push(h2("3.3 Relasi Ideal antar Tabel"));
  s.push(pRich([
    run("Hubungan ideal yang seharusnya terjadi adalah: setiap "),
    run("Assignment", { bold: true }),
    run(" terhubung ke satu "),
    run("CP", { bold: true }),
    run(" dan satu "),
    run("TP", { bold: true }),
    run(" (bisa kosong jika guru belum memilih). Ketika siswa mengerjakan tugas, sistem membuat record "),
    run("Result", { bold: true }),
    run(" yang seharusnya juga membawa cpId/tpId yang sama dengan Assignment. Untuk nilai manual yang diinput guru melalui grade-book, record "),
    run("ManualGrade", { bold: true }),
    run(" juga seharusnya membawa cpId/tpId yang dipilih guru di form. Dengan struktur ini, ketika guru mengekspor nilai per CP, sistem cukup memfilter "),
    code("WHERE cpId = ?"),
    run(" pada tabel Result dan ManualGrade."),
  ]));
  s.push(pRich([
    run("Untuk kelas SMK, konstanta yang dipakai di seluruh aplikasi adalah "),
    code("11DKV"),
    run(" dan "),
    code("12DKV"),
    run(" (tanpa spasi, huruf kapital semua). Konstanta ini didefinisikan di file "),
    code("src/lib/constants.ts"),
    run(" pada array "),
    code("ALL_GRADES"),
    run(". Namun, beberapa jalur input (terutama self-registration siswa dan API langsung) tidak melakukan sanitasi, sehingga bisa menyimpan nilai seperti \u201c11 DKV\u201d (dengan spasi), \u201c11dkv\u201d (huruf kecil), atau \u201c 11DKV \u201d (dengan spasi di awal/akhir). Inilah akar masalah Bug #2."),
  ]));
  return s;
}

function buildBug1() {
  const s = [];
  s.push(h1("Analisis Akar Masalah \u2014 Bug #1: Sinkronisasi Nilai ke CP/TP"));

  s.push(h2("4.1 Gejala yang Diamati"));
  s.push(p("Guru membuat tugas dengan memilih CP dan TP tertentu. Siswa mengerjakan tugas, sistem otomatis menyimpan nilai ke tabel Result. Selain itu, guru juga bisa menginput nilai manual melalui grade-book, yang disimpan ke tabel ManualGrade. Namun ketika guru membuka menu Export Nilai per CP (untuk lapor-eRapor), hasilnya selalu kosong. Padahal di database, record nilai tersebut ada \u2014 hanya saja kolom cpId dan tpId-nya NULL."));

  s.push(h2("4.2 Alur Data yang Diharapkan vs Aktual"));
  s.push(pRich([
    run("Mari kita telusuri alur data dari frontend hingga backend. Pada frontend, komponen "),
    code("grade-book.tsx"),
    run(" sudah mengirim field cpId/tpId dengan benar. Berikut adalah kode frontend yang sudah benar (untuk konfirmasi bahwa masalahnya bukan di frontend):"),
  ]));

  const feCode = `// File: src/components/teacher/grade-book.tsx (baris 204-245)
// Frontend SUDAH mengirim cpId, tpId, tahunAjaran, semester dengan benar

const grades: Array<{
  studentId: string; score: number; gradeType: string; gradeCategory: string;
  cpId: string | null; tpId: string | null;
  tahunAjaran: string; semester: string;
}> = []

const effectiveCpId = bulkBabId && bulkBabId !== '__none__' ? bulkBabId : null

for (const row of (bulkRows || [])) {
  grades.push({
    studentId: row.studentId,
    score: n,
    gradeType,
    gradeCategory,
    cpId: effectiveCpId,   // <-- nilai CP yang dipilih guru
    tpId: null,
    tahunAjaran,
    semester,
  })
}

// Kirim ke API
const res = await fetch('/api/manual-grades', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ grades, isReleased: true, tahunAjaran, semester }),
})`;
  s.push(...codeBlock(feCode, "TypeScript \u00b7 grade-book.tsx"));

  s.push(p("Sampai di sini, data sudah benar. Frontend mengirim cpId, tpId, tahunAjaran, semester, dan gradeCategory. Masalah muncul di sisi backend. Mari kita lihat handler API yang menerima request ini:"));

  const beCode = `// File: src/app/api/manual-grades/route.ts (baris 79-135)
// BUG: Backend DROP field cpId, tpId, tahunAjaran, semester, gradeCategory

const grades = body.grades as Array<{
  studentId?: string
  score?: number | string
  gradeType?: string
  babId?: string | null
  title?: string
}>   // <-- TIDAK ada cpId, tpId, tahunAjaran, semester, gradeCategory di sini!

const valid = grades.map(g => ({
  studentId: g?.studentId || '',
  score: safeScore(g?.score),
  gradeType: g?.gradeType || 'tugas',
  babId: g?.babId || null,
  title: g?.title || '',
})).filter(g => g.studentId)

const created = await db.$transaction(
  valid.map(g => db.manualGrade.create({
    data: {
      studentId: g.studentId,
      title: g.title || defaultTitle(g.gradeType),
      score: g.score,
      description: '',
      subject: teacherSubject,
      gradeType: g.gradeType,
      babId: g.babId,
      isReleased: isReleased as boolean,
      teacherId: teacher.teacherId,
      // <-- TIDAK ada cpId, tpId, tahunAjaran, semester, gradeCategory
    },
  })),
)`;
  s.push(...codeBlock(beCode, "TypeScript \u00b7 /api/manual-grades/route.ts"));

  s.push(pRich([
    run("Inilah akar masalahnya. Frontend sudah mengirim data lengkap, tetapi backend "),
    run("hanya membaca sebagian field", { bold: true }),
    run(" dan mengabaikan cpId, tpId, tahunAjaran, semester, serta gradeCategory. Akibatnya, record ManualGrade yang tersimpan ke database selalu memiliki cpId = NULL dan tpId = NULL. Skema database memang menyediakan kolom ini, tetapi kode tidak mengisinya."),
  ]));

  s.push(h2("4.3 Bug yang Sama pada Auto-Result (Quiz/Typing)"));
  s.push(pRich([
    run("Bug serupa juga terjadi pada endpoint "),
    code("/api/result/route.ts"),
    run(" yang menerima nilai otomatis dari quiz, typing, drawing, dan game. Frontend hanya mengirim "),
    code("assignmentId"),
    run(" tanpa cpId/tpId, dengan harapan backend akan lookup ke tabel Assignment untuk mengambil cpId/tpId tersebut. Sayangnya, backend tidak melakukan lookup ini sama sekali."),
  ]));

  const resultCode = `// File: src/app/api/result/route.ts (baris 7-51)
// BUG: Tidak lookup Assignment untuk inherit cpId/tpId

const {
  studentId, typedText, charCount, correctChars,
  typingSpeedWPM, typingAccuracy, typingDuration, typingScore,
  quizAnswers, quizCorrect, quizTotal, quizScore, quizDuration,
  totalScore, subject, assignmentId,
} = body
// <-- TIDAK ada cpId, tpId, tahunAjaran, semester di-destructure

const result = await db.result.create({
  data: {
    studentId, typedText: typedText || '', charCount, correctChars,
    typingSpeedWPM, typingAccuracy, typingDuration, typingScore,
    quizAnswers, quizCorrect, quizTotal, quizScore, quizDuration,
    totalScore,
    subject: subject || 'Informatika',
    assignmentId: assignmentId || null,
    // <-- TIDAK ada cpId, tpId, tahunAjaran, semester
    // Record tersimpan dengan cpId=NULL, tpId=NULL,
    // tahunAjaran='2026/2027' (default), semester='ganjil' (default)
  },
})`;
  s.push(...codeBlock(resultCode, "TypeScript \u00b7 /api/result/route.ts"));

  s.push(h2("4.4 Dampak Berantai pada Export"));
  s.push(pRich([
    run("Karena cpId/tpId selalu NULL di tabel Result dan ManualGrade, ketika guru membuka menu Export Nilai per CP, kode berikut tidak pernah menemukan data yang cocok:"),
  ]));

  const exportCode = `// File: src/app/api/grades/export/route.ts (baris 64-103)
// Filter ini SELALU mengembalikan array kosong karena cpId = NULL

if (format === 'per_cp' && cpId) {
  data = (students || []).map(s => {
    const studentGrades = (allGrades || []).filter(
      g => g.studentId === s.id && g.cpId === cpId   // <-- g.cpId selalu NULL
    )
    const studentAuto = (autoResults || []).filter(
      r => r.studentId === s.id && r.cpId === cpId   // <-- r.cpId selalu NULL
    )
    // ...
  })
}`;
  s.push(...codeBlock(exportCode, "TypeScript \u00b7 /api/grades/export/route.ts"));

  s.push(spacer(120));
  s.push(callout(
    "Kesimpulan Bug #1",
    "Bukan skema database yang salah \u2014 kolom cpId/tpId sudah ada. Bukan frontend yang salah \u2014 data sudah dikirim. Yang salah adalah handler API tidak membaca field yang dikirim frontend dan tidak menyimpannya ke database. Fix-nya bersifat additive (menambahkan field yang hilang), bukan destructive, jadi tidak akan menghapus data lama.",
    "info"
  ));
  s.push(spacer(120));
  return s;
}

function buildBug2() {
  const s = [];
  s.push(h1("Analisis Akar Masalah \u2014 Bug #2: Tugas SMK Tidak Muncul"));

  s.push(h2("5.1 Gejala yang Diamati"));
  s.push(p("Guru membuat tugas melalui menu Assignment Manager, memilih target kelas \u201c11 DKV\u201d dari dropdown. Tugas tersimpan ke database dengan status isActive = true. Namun ketika siswa kelas 11 DKV login ke dashboard mereka, tugas tersebut tidak muncul sama sekali. Hanya tugas untuk kelas \u201cALL\u201d yang muncul. Siswa SMP (kelas 7A, 8B, dll) tidak mengalami masalah ini \u2014 hanya siswa SMK yang terdampak."));

  s.push(h2("5.2 Lokasi Bug: Filter Assignment di Student API"));
  s.push(pRich([
    run("Endpoint "),
    code("/api/student/assignments/route.ts"),
    run(" bertugas mengambil semua assignment aktif untuk subject tertentu, lalu memfilter berdasarkan kelas siswa. Inilah kode yang bermasalah:"),
  ]));

  const filterCode = `// File: src/app/api/student/assignments/route.ts (baris 16-26)
// BUG: Filter string case-sensitive tanpa normalisasi spasi

const allActive = await db.assignment.findMany({
  where: { isActive: true, subject },
  orderBy: { createdAt: 'desc' },
})

const studentKelas = session.kelas   // misal: "11 DKV" (dengan spasi)
const assignments = allActive.filter((a) => {
  if (a.targetKelas === 'ALL') return true
  // Split "11DKV,12DKV" menjadi ["11DKV", "12DKV"]
  const kelasList = a.targetKelas.split(',').map((k) => k.trim())
  // ["11DKV"].includes("11 DKV")  <-- FALSE! Karena "11DKV" !== "11 DKV"
  return kelasList.includes(studentKelas)
})`;
  s.push(...codeBlock(filterCode, "TypeScript \u00b7 /api/student/assignments/route.ts"));

  s.push(h2("5.3 Mengapa Siswa SMK Lebih Sering Terdampak?"));
  s.push(pRich([
    run("Pertanyaan yang wajar: mengapa bug ini hanya muncul untuk SMK, padahal kelas SMP juga memakai string seperti \u201c7A\u201d, \u201c8B\u201d? Jawabannya adalah pada "),
    run("jalur input data siswa", { bold: true }),
    run(". Aplikasi memiliki tiga jalur untuk membuat record siswa, dan hanya satu yang melakukan sanitasi:"),
  ]));
  s.push(spacer(80));
  s.push(dataTable(
    ["Jalur Input", "File API", "Sanitasi kelas?", "Sumber String"],
    [
      ["Bulk Import (Excel)", "/api/teacher/students/import/route.ts", "YA \u2014 fungsi sanitizeKelas()", "File Excel yang diupload guru"],
      ["Manual Create (Form)", "/api/teacher/students/route.ts", "TIDAK \u2014 disimpan apa adanya", "Form Select dengan pilihan fixed"],
      ["Update Siswa", "/api/teacher/students/[id]/route.ts", "TIDAK \u2014 disimpan apa adanya", "Form Select dengan pilihan fixed"],
      ["Self-Register Siswa", "/api/student/route.ts", "TIDAK \u2014 kelas bebas input", "Input text siswa (bisa apa saja)"],
    ],
    [22, 32, 22, 24]
  ));
  s.push(spacer(160));

  s.push(pRich([
    run("Untuk siswa SMP, form Select selalu menghasilkan nilai yang sudah benar (\u201c7A\u201d, \u201c8B\u201d, dll) karena pilihan fixed. Tapi untuk siswa SMK, seringkali data siswa dimasukkan via self-register atau import manual dengan format yang tidak konsisten. Berikut adalah fungsi sanitasi yang HANYA ada di file import:"),
  ]));

  const sanitizeCode = `// File: src/app/api/teacher/students/import/route.ts (baris 24-26)
// Fungsi ini HANYA dipakai di import, belum dipakai di tempat lain

function sanitizeKelas(raw: string): string {
  return raw.trim().toUpperCase().replace(/\\s+/g, '')
  // "11 DKV"   -> "11DKV"   (hapus spasi)
  // " 11dkv "  -> "11DKV"   (trim + uppercase)
  // "11  DKV"  -> "11DKV"   (hapus multi spasi)
}`;
  s.push(...codeBlock(sanitizeCode, "TypeScript \u00b7 import/route.ts"));

  s.push(h2("5.4 Ilustrasi String Mismatch"));
  s.push(pRich([
    run("Untuk membuat masalah ini lebih konkret, berikut adalah tabel yang menunjukkan bagaimana berbagai variasi input string \u201ckelas\u201d tidak akan cocok saat dilakukan perbandingan "),
    code(".includes()"),
    run(" tanpa normalisasi. Inilah mengapa beberapa siswa SMK bisa melihat tugas (jika kebetulan formatnya pas), sementara siswa lain tidak."),
  ]));
  s.push(spacer(80));
  s.push(dataTable(
    ["Nilai di DB Siswa", "Nilai di Assignment", "Hasil .includes()", "Siswa Lihat Tugas?"],
    [
      ['"11DKV"',  '"11DKV"',  "true",  "YA"],
      ['"11 DKV"', '"11DKV"',  "false", "TIDAK"],
      ['"11dkv"',  '"11DKV"',  "false", "TIDAK"],
      ['" 11DKV "', '"11DKV"', "false", "TIDAK"],
      ['"11  DKV"', '"11DKV"', "false", "TIDAK"],
      ['"11DKV"',  '"ALL"',    "true",  "YA (lewat cabang ALL)"],
    ],
    [25, 25, 25, 25],
    [0, 1]
  ));
  s.push(spacer(160));

  s.push(h2("5.5 Bug Tambahan: Field targetJenjang yang Tak Pernah Dipakai"));
  s.push(pRich([
    run("Hasil investigasi tambahan: skema Prisma memiliki field "),
    code("targetJenjang"),
    run(" di tabel Assignment dan Material (default \u201cALL\u201d). Field ini seharusnya bisa dipakai sebagai filter kedua setelah kelas \u2014 misalnya \u201cALL kelas SMK\u201d atau \u201cALL kelas SMP\u201d. Namun, setelah pencarian di seluruh folder "),
    code("src/"),
    run(", field ini tidak pernah di-set atau di-query di mana pun. Ini bukan penyebab langsung Bug #2, tetapi merupakan \u201cdead code\u201d yang menyesatkan developer masa depan. Rekomendasi: biarkan saja (karena filter berdasarkan kelas sudah cukup), tapi tambahkan komentar di skema bahwa field ini reserved untuk future use."),
  ]));

  s.push(spacer(120));
  s.push(callout(
    "Kesimpulan Bug #2",
    "Akar masalahnya adalah ketidakkonsistenan format string kelas antara data siswa dan data assignment. Konstanta resmi di src/lib/constants.ts adalah \u201c11DKV\u201d (tanpa spasi), tapi beberapa jalur input tidak memakai konstanta tersebut. Fix-nya ada di dua tempat: (1) lakukan normalisasi di kedua sisi saat perbandingan, (2) sanitasi semua jalur input siswa agar selalu konsisten.",
    "warning"
  ));
  s.push(spacer(120));
  return s;
}

function buildSolusiDB() {
  const s = [];
  s.push(h1("Solusi Database Supabase"));

  s.push(h2("6.1 Mengapa Perlu Memperbaiki Database?"));
  s.push(p("Sebelum mengubah kode, ada baiknya kita membersihkan data lama di Supabase terlebih dahulu. Tujuannya adalah: (1) menormalkan string kelas yang sudah ada di tabel Student agar semua menggunakan format \u201c11DKV\u201d (tanpa spasi), (2) backfill cpId/tpId untuk record Result lama yang sebenarnya punya Assignment tapi cpId-nya NULL, dan (3) menambah index untuk mempercepat query export nilai per CP. Langkah ini bersifat opsional tetapi sangat dianjurkan agar laporan export masa lalu juga bisa muncul setelah fix kode diterapkan."));

  s.push(h2("6.2 Cara Mengakses Supabase SQL Editor"));
  s.push(numbered("Buka https://supabase.com dan login dengan akun proyek hendrikusmuda52-droid.", 1));
  s.push(numbered("Pilih project yang benar dari dropdown di pojok kiri atas dashboard.", 2));
  s.push(numbered("Di sidebar kiri, klik menu SQL Editor (ikon database dengan tanda panah).", 3));
  s.push(numbered("Klik tombol New query di pojok kanan atas.", 4));
  s.push(numbered("Salin salah satu blok SQL di bawah ini, paste ke editor, lalu klik Run (tombol hijau play).", 5));
  s.push(numbered("Tunggu sampai muncul pesan \u201cSuccess. No rows returned\u201d \u2014 itu artinya query berhasil dijalankan.", 6));

  s.push(h2("6.3 SQL #1: Normalisasi String Kelas di Tabel Student"));
  s.push(p("Query ini akan mengubah semua variasi penulisan kelas menjadi format konsisten: huruf kapital semua, tanpa spasi di awal/akhir, dan tanpa spasi di tengah. Aman dijalankan berulang kali (idempotent)."));
  const sql1 = `-- SQL #1: Normalisasi kolom kelas pada tabel Student
-- Format target: "11DKV", "12DKV", "7A", "8B", dll (uppercase, no spaces)
-- Aman dijalankan berulang kali (idempotent).

UPDATE "Student"
SET kelas = UPPER(TRIM(REGEXP_REPLACE(kelas, '\\s+', '', 'g')))
WHERE kelas IS NOT NULL
  AND kelas != UPPER(TRIM(REGEXP_REPLACE(kelas, '\\s+', '', 'g')));

-- Verifikasi hasil (jalankan terpisah untuk melihat ringkasan):
SELECT kelas, COUNT(*) AS jumlah_siswa
FROM "Student"
GROUP BY kelas
ORDER BY kelas;`;
  s.push(...codeBlock(sql1, "SQL \u00b7 Supabase SQL Editor"));

  s.push(h2("6.4 SQL #2: Backfill cpId/tpId pada Tabel Result dari Assignment"));
  s.push(p("Query ini akan mengisi cpId dan tpId pada record Result yang masih NULL, dengan cara mengambil nilai dari tabel Assignment yang terhubung via assignmentId. Hanya record yang memiliki assignmentId dan assignment-nya memiliki cpId yang akan di-update. Data yang tidak punya assignment (legacy) akan tetap NULL."));
  const sql2 = `-- SQL #2: Backfill cpId, tpId, tahunAjaran, semester pada tabel Result
-- dari Assignment yang terhubung via assignmentId.
-- Hanya update record yang cpId-nya masih NULL.

UPDATE "Result" r
SET
  "cpId"        = a."cpId",
  "tpId"        = a."tpId",
  "tahunAjaran" = COALESCE(r."tahunAjaran", a."tahunAjaran"),
  "semester"    = COALESCE(r."semester", a."semester")
FROM "Assignment" a
WHERE r."assignmentId" = a.id
  AND r."cpId" IS NULL
  AND a."cpId" IS NOT NULL;

-- Verifikasi: hitung berapa record yang masih punya cpId NULL
SELECT
  COUNT(*) FILTER (WHERE "cpId" IS NULL) AS cp_null,
  COUNT(*) FILTER (WHERE "cpId" IS NOT NULL) AS cp_filled,
  COUNT(*) AS total
FROM "Result";`;
  s.push(...codeBlock(sql2, "SQL \u00b7 Supabase SQL Editor"));

  s.push(h2("6.5 SQL #3: Verifikasi Foreign Key antar Tabel"));
  s.push(pRich([
    run("Skema Prisma sebenarnya sudah membuat foreign key antara TujuanPembelajaran.cpId \u2192 CapaianPembelajaran.id secara otomatis. Namun, field cpId/tpId di tabel Result, ManualGrade, dan Assignment "),
    run("tidak memiliki foreign key constraint", { bold: true }),
    run(" karena didefinisikan sebagai String biasa, bukan relation Prisma. Ini bukan bug \u2014 ini adalah pilihan desain agar field boleh NULL. Verifikasi struktur berikut untuk memastikan tidak ada constraint yang rusak:"),
  ]));
  const sql3 = `-- SQL #3: Cek semua foreign key constraint yang ada di database
-- Jalankan untuk verifikasi bahwa relasi utama masih utuh.

SELECT
  tc.table_name      AS child_table,
  kcu.column_name    AS child_column,
  ccu.table_name     AS parent_table,
  ccu.column_name    AS parent_column,
  tc.constraint_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;`;
  s.push(...codeBlock(sql3, "SQL \u00b7 Supabase SQL Editor"));

  s.push(h2("6.6 SQL #4: Tambah Index untuk Mempercepat Query Export"));
  s.push(pRich([
    run("Setelah backfill selesai, query export nilai per CP akan sering memfilter "),
    code("WHERE cpId = ?"),
    run(" pada tabel Result dan ManualGrade. Tanpa index, query ini akan melakukan sequential scan yang lambat ketika data sudah mencapai ribuan record. Tambahkan index berikut (jika belum ada):"),
  ]));
  const sql4 = `-- SQL #4: Tambah index pada kolom cpId & tpId di Result & ManualGrade
-- Cek dulu apakah index sudah ada, lalu buat jika belum.

CREATE INDEX IF NOT EXISTS idx_result_cpid
  ON "Result" ("cpId") WHERE "cpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_result_tpid
  ON "Result" ("tpId") WHERE "tpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_manualgrade_cpid
  ON "ManualGrade" ("cpId") WHERE "cpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_manualgrade_tpid
  ON "ManualGrade" ("tpId") WHERE "tpId" IS NOT NULL;

-- Index gabungan untuk filter export (cpId + tahunAjaran + semester)
CREATE INDEX IF NOT EXISTS idx_result_cp_tahun_semester
  ON "Result" ("cpId", "tahunAjaran", "semester")
  WHERE "cpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_manualgrade_cp_tahun_semester
  ON "ManualGrade" ("cpId", "tahunAjaran", "semester")
  WHERE "cpId" IS NOT NULL;`;
  s.push(...codeBlock(sql4, "SQL \u00b7 Supabase SQL Editor"));

  s.push(spacer(120));
  s.push(callout(
    "Catatan Penting sebelum Menjalankan SQL",
    "Selalu backup database sebelum menjalankan UPDATE massal. Di Supabase, buka menu Database \u2192 Backups lalu klik Create a backup. Jika terjadi kesalahan, Anda bisa restore ke titik sebelum perubahan. Untuk proyek free tier Supabase, backup manual via pg_dump juga bisa dilakukan dari terminal lokal.",
    "warning"
  ));
  s.push(spacer(120));
  return s;
}

function buildSolusiKode() {
  const s = [];
  s.push(h1("Solusi Logika Kode"));
  s.push(p("Bagian ini berisi lima patch kode yang perlu diterapkan. Setiap patch disertai dengan penjelasan, kode before (sebelum) dan after (sesudah), serta lokasi file yang tepat. Untuk pemula: buka file di editor (VS Code), cari baris yang ditunjukkan, lalu ganti blok kode tersebut. Setelah selesai, simpan file dan deploy ulang ke Vercel."));

  s.push(h2("7.1 Patch #1: Perbaiki /api/manual-grades/route.ts (Single Path)"));
  s.push(p("Pada path single-grade (POST biasa, bukan bulk), kita perlu menambahkan field cpId, tpId, tahunAjaran, semester, gradeCategory, dan isOverride ke destructuring body dan ke data yang dikirim ke Prisma."));

  const p1Before = `// BEFORE \u2014 /api/manual-grades/route.ts (sekitar baris 137-171)
const { studentId, title, score, description, gradeType, babId } = body as {
  studentId?: string
  title?: string
  score?: number | string
  description?: string
  gradeType?: string
  babId?: string | null
}

const grade = await db.manualGrade.create({
  data: {
    studentId, title, score: safeScoreValue,
    description: description || '',
    subject: teacherSubject,
    gradeType: gradeType || 'tugas',
    babId: babId || null,
    isReleased: Boolean(body.isReleased) || false,
    teacherId: teacher.teacherId,
  },
})`;
  s.push(...codeBlock(p1Before, "TypeScript \u00b7 BEFORE"));

  const p1After = `// AFTER \u2014 /api/manual-grades/route.ts (single path)
const {
  studentId, title, score, description, gradeType, babId,
  // TAMBAHAN: field v2 yang sebelumnya di-drop
  cpId, tpId, tahunAjaran, semester, gradeCategory, isOverride,
} = body as {
  studentId?: string
  title?: string
  score?: number | string
  description?: string
  gradeType?: string
  babId?: string | null
  cpId?: string | null
  tpId?: string | null
  tahunAjaran?: string
  semester?: string
  gradeCategory?: string
  isOverride?: boolean
}

const grade = await db.manualGrade.create({
  data: {
    studentId, title, score: safeScoreValue,
    description: description || '',
    subject: teacherSubject,
    gradeType: gradeType || 'tugas',
    babId: babId || null,
    isReleased: Boolean(body.isReleased) || false,
    teacherId: teacher.teacherId,
    // TAMBAHAN: simpan field v2 ke database
    cpId: cpId || null,
    tpId: tpId || null,
    tahunAjaran: tahunAjaran || '2026/2027',
    semester: semester || 'ganjil',
    gradeCategory: gradeCategory || 'tugas_harian',
    isOverride: Boolean(isOverride) || false,
  },
})`;
  s.push(...codeBlock(p1After, "TypeScript \u00b7 AFTER"));

  s.push(h2("7.2 Patch #2: Perbaiki /api/manual-grades/route.ts (Bulk Path)"));
  s.push(p("Pada bulk path (path yang menerima array grades), kita perlu melakukan hal serupa: membaca field v2 dari setiap item di array, lalu meneruskannya ke db.manualGrade.create()."));

  const p2Before = `// BEFORE \u2014 /api/manual-grades/route.ts bulk path (sekitar baris 79-135)
const grades = body.grades as Array<{
  studentId?: string
  score?: number | string
  gradeType?: string
  babId?: string | null
  title?: string
}>

const valid = grades.map(g => ({
  studentId: g?.studentId || '',
  score: safeScore(g?.score),
  gradeType: g?.gradeType || 'tugas',
  babId: g?.babId || null,
  title: g?.title || '',
})).filter(g => g.studentId)

const created = await db.$transaction(
  valid.map(g => db.manualGrade.create({
    data: {
      studentId: g.studentId,
      title: g.title || defaultTitle(g.gradeType),
      score: g.score,
      description: '',
      subject: teacherSubject,
      gradeType: g.gradeType,
      babId: g.babId,
      isReleased: isReleased as boolean,
      teacherId: teacher.teacherId,
    },
  })),
)`;
  s.push(...codeBlock(p2Before, "TypeScript \u00b7 BEFORE"));

  const p2After = `// AFTER \u2014 /api/manual-grades/route.ts bulk path
const grades = body.grades as Array<{
  studentId?: string
  score?: number | string
  gradeType?: string
  babId?: string | null
  title?: string
  // TAMBAHAN: field v2
  cpId?: string | null
  tpId?: string | null
  tahunAjaran?: string
  semester?: string
  gradeCategory?: string
  isOverride?: boolean
}>

const valid = grades.map(g => ({
  studentId: g?.studentId || '',
  score: safeScore(g?.score),
  gradeType: g?.gradeType || 'tugas',
  babId: g?.babId || null,
  title: g?.title || '',
  // TAMBAHAN: simpan field v2
  cpId: g?.cpId || null,
  tpId: g?.tpId || null,
  tahunAjaran: g?.tahunAjaran || '2026/2027',
  semester: g?.semester || 'ganjil',
  gradeCategory: g?.gradeCategory || 'tugas_harian',
  isOverride: Boolean(g?.isOverride) || false,
})).filter(g => g.studentId)

const created = await db.$transaction(
  valid.map(g => db.manualGrade.create({
    data: {
      studentId: g.studentId,
      title: g.title || defaultTitle(g.gradeType),
      score: g.score,
      description: '',
      subject: teacherSubject,
      gradeType: g.gradeType,
      babId: g.babId,
      isReleased: isReleased as boolean,
      teacherId: teacher.teacherId,
      // TAMBAHAN: simpan field v2
      cpId: g.cpId,
      tpId: g.tpId,
      tahunAjaran: g.tahunAjaran,
      semester: g.semester,
      gradeCategory: g.gradeCategory,
      isOverride: g.isOverride,
    },
  })),
)`;
  s.push(...codeBlock(p2After, "TypeScript \u00b7 AFTER"));

  s.push(h2("7.3 Patch #3: /api/result/route.ts \u2014 Inherit cpId/tpId dari Assignment"));
  s.push(p("Pada endpoint ini, frontend hanya mengirim assignmentId. Backend harus melakukan lookup ke tabel Assignment untuk mendapatkan cpId, tpId, tahunAjaran, dan semester yang terkait, lalu menyimpannya ke record Result. Jika assignmentId tidak ada (legacy), gunakan nilai default dari body atau schema."));

  const p3After = `// AFTER \u2014 /api/result/route.ts (sekitar baris 7-51)
const {
  studentId, typedText, charCount, correctChars,
  typingSpeedWPM, typingAccuracy, typingDuration, typingScore,
  quizAnswers, quizCorrect, quizTotal, quizScore, quizDuration,
  totalScore, subject, assignmentId,
  // TAMBAHAN: opsional, untuk fallback jika assignmentId NULL
  cpId: bodyCpId, tpId: bodyTpId,
  tahunAjaran: bodyTahun, semester: bodySemester,
} = body

// TAMBAHAN: lookup Assignment untuk inherit cpId/tpId
let assignmentData: {
  cpId: string | null
  tpId: string | null
  tahunAjaran: string
  semester: string
} | null = null

if (assignmentId) {
  assignmentData = await db.assignment.findUnique({
    where: { id: assignmentId },
    select: {
      cpId: true,
      tpId: true,
      tahunAjaran: true,
      semester: true,
    },
  })
}

const result = await db.result.create({
  data: {
    studentId, typedText: typedText || '', charCount, correctChars,
    typingSpeedWPM, typingAccuracy, typingDuration, typingScore,
    quizAnswers, quizCorrect, quizTotal, quizScore, quizDuration,
    totalScore,
    subject: subject || 'Informatika',
    assignmentId: assignmentId || null,
    // TAMBAHAN: gunakan cpId/tpId dari Assignment, fallback ke body
    cpId: assignmentData?.cpId ?? bodyCpId ?? null,
    tpId: assignmentData?.tpId ?? bodyTpId ?? null,
    tahunAjaran: assignmentData?.tahunAjaran ?? bodyTahun ?? '2026/2027',
    semester: assignmentData?.semester ?? bodySemester ?? 'ganjil',
  },
})`;
  s.push(...codeBlock(p3After, "TypeScript \u00b7 AFTER \u00b7 /api/result/route.ts"));

  s.push(h2("7.4 Patch #4: Buat Helper normalizeKelas di src/lib/kelas.ts"));
  s.push(pRich([
    run("Buat file baru "),
    code("src/lib/kelas.ts"),
    run(" yang berisi helper untuk normalisasi string kelas. Helper ini akan dipakai di banyak tempat agar logika normalisasi terpusat di satu file saja (DRY principle \u2014 Don't Repeat Yourself)."),
  ]));

  const p4Code = `// File: src/lib/kelas.ts (FILE BARU)
// Helper untuk normalisasi string kelas.
// Dipakai di: student/assignments, student/materials,
// teacher/students (create, update), student self-register.

/**
 * Normalisasi string kelas menjadi format konsisten:
 * - uppercase semua
 * - trim spasi di awal/akhir
 * - hapus spasi di tengah (mis: "11 DKV" -> "11DKV")
 *
 * Contoh:
 *   normalizeKelas("11 DKV")    -> "11DKV"
 *   normalizeKelas("  11dkv  ") -> "11DKV"
 *   normalizeKelas("11  DKV")   -> "11DKV"
 *   normalizeKelas("ALL")       -> "ALL"
 *   normalizeKelas("")          -> ""
 */
export function normalizeKelas(raw: string | null | undefined): string {
  if (!raw) return ''
  return raw.trim().toUpperCase().replace(/\\s+/g, '')
}

/**
 * Cek apakah siswa dengan kelas tertentu ada di daftar targetKelas.
 * Dipakai di /api/student/assignments dan /api/student/materials.
 *
 * @param studentKelas  Nilai kelas siswa (akan dinormalisasi dulu)
 * @param targetKelas   String target kelas dari Assignment/Material.
 *                      Bisa "ALL", "11DKV", "11DKV,12DKV", dll.
 */
export function isKelasMatch(
  studentKelas: string | null | undefined,
  targetKelas: string | null | undefined,
): boolean {
  if (!targetKelas) return false
  const target = normalizeKelas(targetKelas)
  if (target === 'ALL' || target === '') return true
  const student = normalizeKelas(studentKelas)
  if (!student) return false
  const kelasList = target.split(',').map(k => normalizeKelas(k))
  return kelasList.includes(student)
}`;
  s.push(...codeBlock(p4Code, "TypeScript \u00b7 src/lib/kelas.ts (NEW)"));

  s.push(h2("7.5 Patch #5: Pakai Helper di /api/student/assignments/route.ts"));
  s.push(p("Setelah helper dibuat, ganti logika filter di endpoint student/assignments dengan pemanggilan helper tersebut. Ini menghapus bug string mismatch sekaligus membuat kode lebih bersih."));

  const p5Before = `// BEFORE \u2014 /api/student/assignments/route.ts (baris 16-26)
const allActive = await db.assignment.findMany({
  where: { isActive: true, subject },
  orderBy: { createdAt: 'desc' },
})

const studentKelas = session.kelas
const assignments = allActive.filter((a) => {
  if (a.targetKelas === 'ALL') return true
  const kelasList = a.targetKelas.split(',').map((k) => k.trim())
  return kelasList.includes(studentKelas)   // BUG: case-sensitive
})`;
  s.push(...codeBlock(p5Before, "TypeScript \u00b7 BEFORE"));

  const p5After = `// AFTER \u2014 /api/student/assignments/route.ts
import { isKelasMatch } from '@/lib/kelas'

const allActive = await db.assignment.findMany({
  where: { isActive: true, subject },
  orderBy: { createdAt: 'desc' },
})

const studentKelas = session.kelas
const assignments = allActive.filter((a) =>
  isKelasMatch(studentKelas, a.targetKelas)
)`;
  s.push(...codeBlock(p5After, "TypeScript \u00b7 AFTER"));

  s.push(h2("7.6 Patch #6: Sanitasi Write Paths di Student API"));
  s.push(pRich([
    run("Untuk mencegah data kelas kotor masuk lagi di masa depan, terapkan sanitasi pada tiga write paths: (a) "),
    code("/api/teacher/students/route.ts"),
    run(" POST, (b) "),
    code("/api/teacher/students/[id]/route.ts"),
    run(" PUT, dan (c) "),
    code("/api/student/route.ts"),
    run(" POST (self-register)."),
  ]));

  const p6Code = `// Patch yang sama diterapkan di 3 file berbeda:

// File 1: src/app/api/teacher/students/route.ts (POST handler)
// File 2: src/app/api/teacher/students/[id]/route.ts (PUT handler)
// File 3: src/app/api/student/route.ts (POST self-register)

import { normalizeKelas } from '@/lib/kelas'

// Di bagian destructuring body, setelah \`const { ... } = body\`:
const rawKelas = (body as { kelas?: string }).kelas || ''
const kelas = normalizeKelas(rawKelas)

// Validasi (opsional tapi dianjurkan):
import { ALL_GRADES } from '@/lib/constants'
if (!ALL_GRADES.includes(kelas as any)) {
  return NextResponse.json(
    { error: \`Kelas tidak valid: "\${rawKelas}". \` +
              \`Yang valid: \${ALL_GRADES.join(', ')}\` },
    { status: 400 }
  )
}

// Lalu pakai \`kelas\` (yang sudah dinormalisasi) saat:
//   db.student.create({ data: { ..., kelas, ... } })
//   db.student.update({ data: { ..., kelas, ... } })

// Catatan: pastikan \`kelas\` juga disimpan ke field \`jenjang\`:
import { getJenjang } from '@/lib/constants'
const jenjang = getJenjang(kelas)   // "SMK" untuk "11DKV", "SMP" untuk "7A"
// Lalu: db.student.create({ data: { ..., kelas, jenjang, ... } })`;
  s.push(...codeBlock(p6Code, "TypeScript \u00b7 3 files"));

  s.push(spacer(120));
  s.push(callout(
    "Urutan Penerapan Patch",
    "Untuk meminimalkan risiko deploy setengah jalan, terapkan patch dengan urutan berikut: (1) Buat helper src/lib/kelas.ts terlebih dahulu karena patch lain bergantung padanya. (2) Patch tiga write paths student (agar data baru yang masuk sudah bersih). (3) Jalankan SQL #1 untuk membersihkan data lama. (4) Patch /api/student/assignments untuk filter. (5) Patch /api/manual-grades dan /api/result untuk CP/TP. (6) Jalankan SQL #2 untuk backfill.",
    "success"
  ));
  s.push(spacer(120));
  return s;
}

function buildTesting() {
  const s = [];
  s.push(h1("Panduan Testing & Verifikasi"));
  s.push(p("Setelah semua patch diterapkan dan deploy ke Vercel, lakukan testing manual berikut untuk memastikan kedua bug sudah teratasi. Testing dilakukan dari sudut pandang guru (di dashboard guru) dan siswa (di dashboard siswa). Catat hasilnya di kolom \u201cStatus\u201d untuk dokumentasi internal."));

  s.push(h2("8.1 Test Scenario untuk Bug #1 (Sinkronisasi CP/TP)"));
  s.push(spacer(80));
  s.push(dataTable(
    ["#", "Langkah Testing", "Expected Result", "Status"],
    [
      ["T1", "Login sebagai guru, buka Grade Book, pilih satu siswa, klik \u201cTambah Nilai\u201d.", "Form muncul dengan dropdown CP dan TP terisi.", "[ ] Pass / [ ] Fail"],
      ["T2", "Pilih CP tertentu (mis: CP.1) dan TP tertentu (mis: TP.1.1), input nilai 85, simpan.", "Nilai tersimpan, tidak ada error.", "[ ] Pass / [ ] Fail"],
      ["T3", "Buka Supabase Table Editor \u2192 ManualGrade, cari record baru.", "Kolom cpId dan tpId TERISI (tidak NULL).", "[ ] Pass / [ ] Fail"],
      ["T4", "Buka menu Export Nilai, pilih format \u201cper CP\u201d, pilih CP.1, export.", "File Excel ter-download, berisi nilai yang baru diinput.", "[ ] Pass / [ ] Fail"],
      ["T5", "Login sebagai siswa, kerjakan tugas quiz yang punya CP/TP.", "Setelah selesai, cek tabel Result di Supabase \u2014 cpId TERISI.", "[ ] Pass / [ ] Fail"],
      ["T6", "Buka menu Export Nilai, pilih format \u201call CP\u201d.", "Semua CP yang punya nilai muncul, bukan hanya CP.1.", "[ ] Pass / [ ] Fail"],
    ],
    [6, 38, 36, 20]
  ));
  s.push(spacer(160));

  s.push(h2("8.2 Test Scenario untuk Bug #2 (Tugas SMK)"));
  s.push(spacer(80));
  s.push(dataTable(
    ["#", "Langkah Testing", "Expected Result", "Status"],
    [
      ["T7", "Login sebagai guru, buka Assignment Manager, klik \u201cBuat Tugas\u201d.", "Form muncul dengan dropdown kelas.", "[ ] Pass / [ ] Fail"],
      ["T8", "Pilih target kelas \u201c11 DKV\u201d, buat tugas baru, simpan.", "Tugas tersimpan dengan targetKelas = \u201c11DKV\u201d.", "[ ] Pass / [ ] Fail"],
      ["T9", "Buka Supabase Table Editor \u2192 Student, cari siswa kelas 11 DKV. Periksa field kelas.", "Semua siswa SMK punya format kelas konsisten.", "[ ] Pass / [ ] Fail"],
      ["T10", "Login sebagai siswa kelas 11 DKV, buka dashboard.", "Tugas yang baru dibuat muncul di daftar tugas aktif.", "[ ] Pass / [ ] Fail"],
      ["T11", "Ulangi T8-T10 untuk kelas \u201c12 DKV\u201d.", "Tugas untuk 12 DKV juga muncul di dashboard siswa 12 DKV.", "[ ] Pass / [ ] Fail"],
      ["T12", "Buat tugas dengan target kelas \u201c11DKV,12DKV\u201d (multi-kelas).", "Tugas muncul di dashboard siswa 11 DKV dan 12 DKV.", "[ ] Pass / [ ] Fail"],
      ["T13", "Edit salah satu siswa di Students Manager, ubah kelas dari \u201c11 DKV\u201d ke \u201c11DKV\u201d.", "Perubahan tersimpan, format tetap konsisten.", "[ ] Pass / [ ] Fail"],
      ["T14", "Tes self-register siswa baru dengan input \u201c11 dkv\u201d (spasi + huruf kecil).", "Sistem menolak ATAU menormalisasi menjadi \u201c11DKV\u201d.", "[ ] Pass / [ ] Fail"],
    ],
    [6, 38, 36, 20]
  ));
  s.push(spacer(160));

  s.push(h2("8.3 Smoke Test Setelah Deploy"));
  s.push(p("Selain testing per-bug, lakukan smoke test singkat untuk memastikan tidak ada fitur lain yang rusak akibat patch. Berikut adalah checklist cepat yang bisa dijalankan dalam 10 menit:"));
  s.push(bullet("Login sebagai guru dan siswa SMP (kelas 7A) \u2014 pastikan tidak ada error 500."));
  s.push(bullet("Buat tugas untuk kelas SMP (mis: 7A) \u2014 pastikan siswa 7A bisa melihat tugas."));
  s.push(bullet("Buka menu Attendance, Jurnal Guru, Catatan Sikap \u2014 pastikan semua bisa load data."));
  s.push(bullet("Buka menu Analytics \u2014 pastikan chart nilai bisa render."));
  s.push(bullet("Cek Vercel logs (di dashboard Vercel \u2192 tab Logs) \u2014 pastikan tidak ada error baru."));
  return s;
}

function buildPencegahan() {
  const s = [];
  s.push(h1("Pencegahan Kedepan"));
  s.push(p("Memperbaiki bug hanyalah langkah pertama. Agar bug serupa tidak terulang di masa depan, ada beberapa praktik yang disarankan untuk diterapkan pada proyek hendrikusmuda52-droid. Praktik ini diurutkan dari yang paling mudah diterapkan hingga yang paling investasi waktunya besar."));

  s.push(h2("9.1 Validasi Input dengan Zod (Mudah, Dampak Besar)"));
  s.push(pRich([
    run("Salah satu pelajaran dari Bug #1 dan #2 adalah bahwa handler API percaya sepenuhnya pada data yang dikirim frontend. Jika frontend salah format, backend ikut salah. Solusinya adalah menambahkan validasi schema di setiap handler API menggunakan library "),
    run("Zod", { bold: true }),
    run(". Zod akan otomatis menolak request yang tidak sesuai schema, sekaligus memberi TypeScript type inference sehingga autocomplete di editor lebih akurat."),
  ]));

  const zodCode = `// Contoh: validasi body /api/manual-grades dengan Zod
// File: src/app/api/manual-grades/route.ts

import { z } from 'zod'

const manualGradeSchema = z.object({
  studentId: z.string().min(1),
  title: z.string().min(1),
  score: z.number().min(0).max(100),
  gradeType: z.enum(['tugas', 'uh', 'uts', 'uas']),
  gradeCategory: z.enum([
    'tugas_harian', 'ulangan_harian', 'sts', 'sas'
  ]).default('tugas_harian'),
  cpId: z.string().nullable().optional(),
  tpId: z.string().nullable().optional(),
  tahunAjaran: z.string().default('2026/2027'),
  semester: z.enum(['ganjil', 'genap']).default('ganjil'),
  isOverride: z.boolean().default(false),
  isReleased: z.boolean().default(false),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parseResult = manualGradeSchema.safeParse(body)

  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parseResult.error.flatten() },
      { status: 400 }
    )
  }

  const data = parseResult.data  // <-- type-safe, semua field ada
  // ...lanjut ke db.manualGrade.create({ data: { ...data } })
}`;
  s.push(...codeBlock(zodCode, "TypeScript \u00b7 Zod schema example"));

  s.push(h2("9.2 Unit Test untuk Helper normalizeKelas"));
  s.push(pRich([
    run("Karena "),
    code("normalizeKelas"),
    run(" adalah fungsi murni yang dipakai di banyak tempat, menulis unit test untuknya adalah investasi murah dengan dampak besar. Berikut adalah contoh test pakai Vitest yang bisa langsung ditambahkan ke proyek:"),
  ]));

  const testCode = `// File: src/lib/kelas.test.ts
import { describe, it, expect } from 'vitest'
import { normalizeKelas, isKelasMatch } from './kelas'

describe('normalizeKelas', () => {
  it('mengubah "11 DKV" menjadi "11DKV"', () => {
    expect(normalizeKelas('11 DKV')).toBe('11DKV')
  })

  it('mengubah "  11dkv  " menjadi "11DKV"', () => {
    expect(normalizeKelas('  11dkv  ')).toBe('11DKV')
  })

  it('mengubah "11  DKV" (multi spasi) menjadi "11DKV"', () => {
    expect(normalizeKelas('11  DKV')).toBe('11DKV')
  })

  it('menjaga "ALL" tetap "ALL"', () => {
    expect(normalizeKelas('ALL')).toBe('ALL')
  })

  it('mengembalikan empty string untuk null/undefined', () => {
    expect(normalizeKelas(null)).toBe('')
    expect(normalizeKelas(undefined)).toBe('')
    expect(normalizeKelas('')).toBe('')
  })
})

describe('isKelasMatch', () => {
  it('match exact', () => {
    expect(isKelasMatch('11DKV', '11DKV')).toBe(true)
  })

  it('match dengan spasi di student', () => {
    expect(isKelasMatch('11 DKV', '11DKV')).toBe(true)
  })

  it('match dengan case berbeda', () => {
    expect(isKelasMatch('11dkv', '11DKV')).toBe(true)
  })

  it('match multi-kelas', () => {
    expect(isKelasMatch('12DKV', '11DKV,12DKV')).toBe(true)
  })

  it('match ALL', () => {
    expect(isKelasMatch('11DKV', 'ALL')).toBe(true)
    expect(isKelasMatch('7A', 'ALL')).toBe(true)
  })

  it('tidak match kelas berbeda', () => {
    expect(isKelasMatch('7A', '11DKV')).toBe(false)
    expect(isKelasMatch('11DKV', '12DKV')).toBe(false)
  })
})`;
  s.push(...codeBlock(testCode, "TypeScript \u00b7 Vitest unit test"));

  s.push(h2("9.3 Code Review Checklist"));
  s.push(p("Setiap kali ada Pull Request baru ke proyek, pastikan reviewer mengecek poin-poin berikut. Checklist ini bisa di-copy ke template PR description di GitHub:"));
  s.push(bullet("API handler: Apakah semua field dari frontend di-destructure dan disimpan ke DB? Jangan ada field yang \u201cditerima tapi diabaikan\u201d."));
  s.push(bullet("String filter: Apakah perbandingan string sudah dinormalisasi (uppercase, trim, hapus spasi)?"));
  s.push(bullet("Foreign key: Apakah field cpId/tpId/assignmentId yang baru ditambah sudah disimpan di handler create?"));
  s.push(bullet("Validasi: Apakah input dari user sudah divalidasi (boleh pakai Zod atau validasi manual)?"));
  s.push(bullet("Tes: Apakah ada unit test untuk helper baru? Apakah smoke test masih pass?"));
  s.push(bullet("Skema: Apakah ada field di schema.prisma yang ditambah tapi tidak pernah dipakai? Hapus atau tambah komentar."));

  s.push(h2("9.4 Jadwal Maintenance Berkala"));
  s.push(p("Selain testing per-deploy, disarankan melakukan maintenance berkala untuk menjaga kesehatan database. Berikut adalah jadwal yang disarankan untuk proyek sekolah dengan skala seperti hendrikusmuda52-droid:"));
  s.push(spacer(80));
  s.push(dataTable(
    ["Frekuensi", "Aktivitas", "Output"],
    [
      ["Setiap deploy", "Jalankan smoke test 10 menit", "Sign-off checklist"],
      ["Mingguan", "Cek Vercel logs untuk error 500 baru", "Daftar error + tiket perbaikan"],
      ["Bulanan", "Backup database Supabase (manual atau scheduled)", "File backup .sql di storage"],
      ["Per semester", "Jalankan SQL normalisasi & cek data orphan", "Laporan data health"],
      ["Tahunan", "Review schema Prisma, hapus field dead code", "Schema migration"],
    ],
    [18, 45, 37]
  ));
  return s;
}

function buildLampiran() {
  const s = [];
  s.push(h1("Lampiran"));

  s.push(h2("A. Daftar File yang Dimodifikasi"));
  s.push(p("Berikut adalah daftar lengkap file yang perlu diubah atau dibuat untuk menerapkan solusi pada laporan ini. Gunakan daftar ini sebagai checklist saat implementasi."));
  s.push(spacer(80));
  s.push(dataTable(
    ["#", "File Path", "Aksi", "Untuk Bug"],
    [
      ["1", "src/lib/kelas.ts", "BUAT (file baru)", "Bug #2"],
      ["2", "src/app/api/student/assignments/route.ts", "EDIT (ganti filter)", "Bug #2"],
      ["3", "src/app/api/student/materials/route.ts", "EDIT (ganti filter)", "Bug #2"],
      ["4", "src/app/api/teacher/students/route.ts", "EDIT (POST: sanitasi kelas)", "Bug #2"],
      ["5", "src/app/api/teacher/students/[id]/route.ts", "EDIT (PUT: sanitasi kelas)", "Bug #2"],
      ["6", "src/app/api/student/route.ts", "EDIT (POST: sanitasi kelas)", "Bug #2"],
      ["7", "src/app/api/manual-grades/route.ts", "EDIT (single + bulk path)", "Bug #1"],
      ["8", "src/app/api/result/route.ts", "EDIT (lookup Assignment)", "Bug #1"],
      ["9", "src/lib/kelas.test.ts", "BUAT (unit test)", "Bug #2 (pencegahan)"],
      ["10", "Supabase SQL Editor", "JALANKAN SQL #1\u2013#4", "Bug #1 + #2"],
    ],
    [6, 45, 28, 21],
    [1]
  ));
  s.push(spacer(160));

  s.push(h2("B. Skrip SQL Lengkap (Satu Blok)"));
  s.push(p("Berikut adalah semua skrip SQL dari Bab 6 yang sudah digabungkan menjadi satu blok. Anda bisa copy sekali jalan untuk efisiensi. Namun disarankan menjalankan satu per satu agar bisa verifikasi hasil tiap langkah."));

  const sqlFull = `-- ============================================================
-- SKRIP SQL LENGKAP MAINTENANCE HENDRIKUSMUDA52-DROID
-- Jalankan di Supabase SQL Editor, satu per satu blok.
-- ============================================================

-- 1. Normalisasi kelas di tabel Student
UPDATE "Student"
SET kelas = UPPER(TRIM(REGEXP_REPLACE(kelas, '\\s+', '', 'g')))
WHERE kelas IS NOT NULL
  AND kelas != UPPER(TRIM(REGEXP_REPLACE(kelas, '\\s+', '', 'g')));

-- 2. Backfill cpId/tpId di tabel Result dari Assignment
UPDATE "Result" r
SET
  "cpId"        = a."cpId",
  "tpId"        = a."tpId",
  "tahunAjaran" = COALESCE(r."tahunAjaran", a."tahunAjaran"),
  "semester"    = COALESCE(r."semester", a."semester")
FROM "Assignment" a
WHERE r."assignmentId" = a.id
  AND r."cpId" IS NULL
  AND a."cpId" IS NOT NULL;

-- 3. Tambah index untuk query export
CREATE INDEX IF NOT EXISTS idx_result_cpid
  ON "Result" ("cpId") WHERE "cpId" IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_result_tpid
  ON "Result" ("tpId") WHERE "tpId" IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_manualgrade_cpid
  ON "ManualGrade" ("cpId") WHERE "cpId" IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_manualgrade_tpid
  ON "ManualGrade" ("tpId") WHERE "tpId" IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_result_cp_tahun_semester
  ON "Result" ("cpId", "tahunAjaran", "semester")
  WHERE "cpId" IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_manualgrade_cp_tahun_semester
  ON "ManualGrade" ("cpId", "tahunAjaran", "semester")
  WHERE "cpId" IS NOT NULL;

-- 4. Verifikasi
SELECT 'Student.kelas values' AS info, kelas, COUNT(*)
FROM "Student" GROUP BY kelas ORDER BY kelas;

SELECT 'Result.cpId status' AS info,
  COUNT(*) FILTER (WHERE "cpId" IS NULL) AS null_count,
  COUNT(*) FILTER (WHERE "cpId" IS NOT NULL) AS filled_count
FROM "Result";`;
  s.push(...codeBlock(sqlFull, "SQL \u00b7 Complete maintenance script"));

  s.push(h2("C. Checklist Implementasi Step-by-Step"));
  s.push(p("Checklist berikut dirancang agar bisa diikuti berurutan. Centang setiap langkah yang selesai. Jika ada langkah yang gagal, hentikan dan debug dulu sebelum lanjut ke langkah berikutnya."));
  s.push(numbered("Backup database Supabase via Database \u2192 Backups \u2192 Create a backup.", 1));
  s.push(numbered("Buat branch Git baru: git checkout -b fix/cp-tp-and-smk-assignments.", 2));
  s.push(numbered("Buat file src/lib/kelas.ts dengan kode dari Patch #4.", 3));
  s.push(numbered("Patch /api/student/assignments/route.ts dengan kode dari Patch #5.", 4));
  s.push(numbered("Patch /api/student/materials/route.ts dengan pola yang sama.", 5));
  s.push(numbered("Patch 3 file write-paths student dengan kode dari Patch #6.", 6));
  s.push(numbered("Patch /api/manual-grades/route.ts (single + bulk) dengan Patch #1 dan #2.", 7));
  s.push(numbered("Patch /api/result/route.ts dengan Patch #3.", 8));
  s.push(numbered("Commit & push: git add . && git commit -m \"fix: CP/TP sync + SMK assignment filter\" && git push.", 9));
  s.push(numbered("Tunggu Vercel deploy selesai (cek di dashboard Vercel).", 10));
  s.push(numbered("Jalankan SQL #1 di Supabase untuk normalisasi kelas. Verifikasi dengan SELECT.", 11));
  s.push(numbered("Jalankan SQL #2 untuk backfill cpId/tpId Result. Verifikasi dengan SELECT.", 12));
  s.push(numbered("Jalankan SQL #3 untuk cek foreign key constraints.", 13));
  s.push(numbered("Jalankan SQL #4 untuk tambah index.", 14));
  s.push(numbered("Lakukan Testing T1\u2013T14 dari Bab 8. Catat hasilnya.", 15));
  s.push(numbered("Lakukan Smoke Test dari Bab 8.3.", 16));
  s.push(numbered("Merge branch ke main setelah semua test pass.", 17));
  s.push(numbered("Update dokumentasi: tambahkan tanggal fix ke changelog proyek.", 18));

  s.push(h2("D. Glosarium Istilah Teknis"));
  s.push(p("Untuk memudahkan pemula, berikut adalah penjelasan singkat istilah teknis yang dipakai di laporan ini:"));
  s.push(spacer(80));
  s.push(dataTable(
    ["Istilah", "Penjelasan Singkat"],
    [
      ["API (Application Programming Interface)", "Cara aplikasi frontend \u201cbicara\u201d dengan backend, biasanya via HTTP request ke URL tertentu."],
      ["Backend", "Bagian aplikasi yang berjalan di server, mengakses database, dan mengembalikan data ke frontend."],
      ["CP (Capaian Pembelajaran)", "Tujuan pembelajaran tingkat tinggi yang dicapai siswa setelah menyelesaikan satu fase."],
      ["TP (Tujuan Pembelajaran)", "Sub-tujuan lebih spesifik di bawah CP. Satu CP bisa punya banyak TP."],
      ["Foreign Key (FK)", "Field di tabel yang merujuk ke primary key tabel lain, untuk membuat relasi."],
      ["ORM (Object-Relational Mapper)", "Library yang menerjemahkan kode JS menjadi query SQL. Prisma adalah ORM yang dipakai di proyek ini."],
      ["Prisma Schema", "File schema.prisma yang mendefinisikan struktur tabel database."],
      ["Normalization (Normalisasi)", "Proses membersihkan string agar konsisten: trim spasi, uppercase, dll."],
      ["Sanitization (Sanitasi)", "Proses membersihkan input user sebelum disimpan ke database."],
      ["Idempotent", "Operasi yang aman dijalankan berulang kali tanpa efek samping."],
      ["Backfill", "Mengisi field yang sudah ada (biasanya baru ditambah) dengan data dari field/sumber lain."],
      ["Sequential Scan", "Cara database membaca seluruh baris tabel satu per satu. Lambat untuk tabel besar."],
      ["Index", "Struktur data yang mempercepat pencarian baris berdasarkan kolom tertentu."],
      ["Zod", "Library TypeScript untuk validasi schema data."],
      ["Vitest", "Library testing untuk JavaScript/TypeScript, mirip Jest tapi lebih cepat."],
    ],
    [30, 70]
  ));
  return s;
}

// ============================================================
// ASSEMBLE DOCUMENT
// ============================================================
async function buildDoc() {
  const coverChildren = buildCover();
  const bodyChildren = [
    ...buildRingkasan(),
    ...buildKonteks(),
    ...buildBug1(),
    ...buildBug2(),
    ...buildSolusiDB(),
    ...buildSolusiKode(),
    ...buildTesting(),
    ...buildPencegahan(),
    ...buildLampiran(),
  ];

  // Body header & footer
  const bodyHeader = new Header({
    children: [new Paragraph({
      spacing: { before: 0, after: 0, line: 240 },
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: "Laporan Maintenance \u00b7 hendrikusmuda52-droid", size: 16, color: COLOR.MUTED, font: FONT_HEAD }),
        new TextRun({ text: "\t\t", size: 16, font: FONT_HEAD }),
        new TextRun({ text: "v1.0 \u00b7 20 Agustus 2026", size: 16, color: COLOR.MUTED, font: FONT_HEAD }),
      ],
      tabStops: [
        { type: TabStopType.RIGHT, position: TabStopPosition.MAX },
      ],
    })],
  });

  const bodyFooter = new Footer({
    children: [new Paragraph({
      spacing: { before: 0, after: 0, line: 240 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "hendrikusmuda52-droid \u00b7 Maintenance Report \u2014 Halaman ", size: 16, color: COLOR.MUTED, font: FONT_HEAD }),
        new TextRun({ children: [PageNumber.CURRENT], size: 16, color: COLOR.MUTED, font: FONT_HEAD }),
      ],
    })],
  });

  const doc = new Document({
    creator: "Z.ai",
    title: "Laporan Maintenance hendrikusmuda52-droid",
    description: "Analisis dan Perbaikan Dua Bug Kritis",
    styles: {
      default: {
        document: {
          run: { font: FONT_BODY, size: 22, color: COLOR.PRIMARY },
          paragraph: { spacing: { line: 312 } },
        },
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: FONT_HEAD, size: 32, bold: true, color: COLOR.PRIMARY },
          paragraph: { spacing: { before: 360, after: 180, line: 312 } },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: FONT_HEAD, size: 26, bold: true, color: COLOR.ACCENT },
          paragraph: { spacing: { before: 280, after: 120, line: 312 } },
        },
        {
          id: "Heading3",
          name: "Heading 3",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: FONT_HEAD, size: 24, bold: true, color: COLOR.HEADER },
          paragraph: { spacing: { before: 200, after: 80, line: 312 } },
        },
      ],
    },
    sections: [
      // Section 1: Cover (no header/footer, no page numbers)
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT },
            margin: { top: 0, bottom: 0, left: 0, right: 0 },
          },
        },
        children: coverChildren,
      },
      // Section 2: Body (with header/footer + page numbers)
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT },
            margin: { top: 1440, bottom: 1440, left: 1701, right: 1417 },
            pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL },
          },
        },
        headers: { default: bodyHeader },
        footers: { default: bodyFooter },
        children: bodyChildren,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = "/home/z/my-project/download/Laporan_Maintenance_hendrikusmuda52-droid.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log(`DOCX berhasil dibuat: ${outputPath}`);
  console.log(`Ukuran: ${(buffer.length / 1024).toFixed(1)} KB`);
}

buildDoc().catch(err => {
  console.error("ERROR:", err);
  process.exit(1);
});
