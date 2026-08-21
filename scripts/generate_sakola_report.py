#!/usr/bin/env python3
"""
SAKOLA - Laporan Teknis Arsitektur & Audit Bug
Generated via ReportLab with cascade palette + TocDocTemplate
"""

import os
import hashlib
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, Image, Flowable, HRFlowable
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfgen import canvas

# ─────────────────────────────────────────────────────────────────────────────
# FONT REGISTRATION (Noto Serif SC for body, Noto Sans SC for headings)
# ─────────────────────────────────────────────────────────────────────────────
FONT_DIR = '/usr/share/fonts'

pdfmetrics.registerFont(TTFont('NotoSerifSC', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerifSC-Bold', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC-Bold')

# Noto Sans SC variable font is incompatible with ReportLab; use NotoSerifSC-Bold as sans-substitute
# for headings, and SarasaMonoSC for code blocks
pdfmetrics.registerFont(TTFont('SansSC', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-SemiBold.ttf'))
pdfmetrics.registerFont(TTFont('SansSC-Bold', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Black.ttf'))
registerFontFamily('SansSC', normal='SansSC', bold='SansSC-Bold')

# Mono font for code blocks (SarasaMonoSC has full CJK + Latin coverage)
pdfmetrics.registerFont(TTFont('MonoFont', f'{FONT_DIR}/truetype/chinese/SarasaMonoSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('MonoFont-Bold', f'{FONT_DIR}/truetype/chinese/SarasaMonoSC-Bold.ttf'))
registerFontFamily('MonoFont', normal='MonoFont', bold='MonoFont-Bold')

# ─────────────────────────────────────────────────────────────────────────────
# CASCADE PALETTE (auto-generated, complementary harmony, seed 42)
# ─────────────────────────────────────────────────────────────────────────────
PAGE_BG       = colors.HexColor('#f0f0f1')
SECTION_BG    = colors.HexColor('#eeeff0')
CARD_BG       = colors.HexColor('#e9eced')
TABLE_STRIPE  = colors.HexColor('#eaebec')
HEADER_FILL   = colors.HexColor('#475b66')
COVER_BLOCK   = colors.HexColor('#536e7b')
BORDER        = colors.HexColor('#b2c3cc')
ICON          = colors.HexColor('#416f85')
ACCENT        = colors.HexColor('#2b6886')
ACCENT_2      = colors.HexColor('#b76e4a')
TEXT_PRIMARY  = colors.HexColor('#151617')
TEXT_MUTED    = colors.HexColor('#80878a')
SEM_SUCCESS   = colors.HexColor('#437a55')
SEM_WARNING   = colors.HexColor('#93773d')
SEM_ERROR     = colors.HexColor('#964e47')
SEM_INFO      = colors.HexColor('#4b6c8d')

TABLE_HEADER_COLOR = HEADER_FILL
TABLE_HEADER_TEXT  = colors.white
TABLE_ROW_EVEN     = colors.white
TABLE_ROW_ODD      = TABLE_STRIPE

# ─────────────────────────────────────────────────────────────────────────────
# PAGE LAYOUT
# ─────────────────────────────────────────────────────────────────────────────
PAGE_W, PAGE_H = A4
LEFT_MARGIN   = 22 * mm
RIGHT_MARGIN  = 22 * mm
TOP_MARGIN    = 25 * mm
BOTTOM_MARGIN = 22 * mm
CONTENT_WIDTH = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN

# ─────────────────────────────────────────────────────────────────────────────
# STYLES
# ─────────────────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

style_h1 = ParagraphStyle(
    'H1', parent=styles['Heading1'],
    fontName='SansSC-Bold', fontSize=18, leading=24,
    textColor=HEADER_FILL, spaceBefore=18, spaceAfter=10,
    keepWithNext=True, alignment=TA_LEFT,
)

style_h2 = ParagraphStyle(
    'H2', parent=styles['Heading2'],
    fontName='SansSC-Bold', fontSize=14, leading=19,
    textColor=ACCENT, spaceBefore=14, spaceAfter=6,
    keepWithNext=True, alignment=TA_LEFT,
)

style_h3 = ParagraphStyle(
    'H3', parent=styles['Heading3'],
    fontName='SansSC-Bold', fontSize=12, leading=16,
    textColor=TEXT_PRIMARY, spaceBefore=10, spaceAfter=4,
    keepWithNext=True, alignment=TA_LEFT,
)

style_body = ParagraphStyle(
    'Body', parent=styles['Normal'],
    fontName='NotoSerifSC', fontSize=10, leading=15,
    textColor=TEXT_PRIMARY, spaceBefore=2, spaceAfter=6,
    alignment=TA_JUSTIFY, firstLineIndent=0,
)

style_body_left = ParagraphStyle(
    'BodyLeft', parent=style_body,
    alignment=TA_LEFT,
)

style_bullet = ParagraphStyle(
    'Bullet', parent=style_body,
    leftIndent=18, bulletIndent=6, spaceBefore=1, spaceAfter=3,
    alignment=TA_LEFT,
)

style_code = ParagraphStyle(
    'Code', parent=styles['Code'],
    fontName='MonoFont', fontSize=8.5, leading=11,
    textColor=TEXT_PRIMARY, backColor=CARD_BG,
    leftIndent=8, rightIndent=8, spaceBefore=4, spaceAfter=8,
    borderColor=BORDER, borderWidth=0.5, borderPadding=6,
    alignment=TA_LEFT,
)

style_callout = ParagraphStyle(
    'Callout', parent=style_body,
    fontName='NotoSerifSC', fontSize=10, leading=14,
    leftIndent=12, rightIndent=12, spaceBefore=6, spaceAfter=6,
    backColor=SECTION_BG, borderColor=ACCENT, borderWidth=0,
    borderPadding=8, alignment=TA_LEFT,
)

style_meta = ParagraphStyle(
    'Meta', parent=style_body,
    fontName='SansSC', fontSize=9, leading=12,
    textColor=TEXT_MUTED, alignment=TA_LEFT,
)

style_toc_l0 = ParagraphStyle(
    'TOC0', fontName='SansSC-Bold', fontSize=11, leading=18,
    textColor=TEXT_PRIMARY, leftIndent=0,
)
style_toc_l1 = ParagraphStyle(
    'TOC1', fontName='NotoSerifSC', fontSize=10, leading=15,
    textColor=TEXT_MUTED, leftIndent=18,
)

# ─────────────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────────────
def add_heading(text, style, level=0):
    """Add heading with TOC bookmark."""
    key = f'h_{hashlib.md5(text.encode()).hexdigest()[:8]}'
    p = Paragraph(f'<a name="{key}"/>{text}', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def h1(text):
    return add_heading(text, style_h1, level=0)

def h2(text):
    return add_heading(text, style_h2, level=1)

def h3(text):
    return Paragraph(text, style_h3)

def p(text):
    return Paragraph(text, style_body)

def pl(text):
    return Paragraph(text, style_body_left)

def bullet(text):
    return Paragraph(f'• {text}', style_bullet)

def code(text):
    # Escape HTML special chars
    escaped = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    return Paragraph(f'<pre>{escaped}</pre>', style_code)

def callout(text, color=ACCENT):
    """Colored callout box."""
    style = ParagraphStyle(
        'CalloutBox', parent=style_body,
        fontName='NotoSerifSC', fontSize=10, leading=14,
        leftIndent=12, rightIndent=12, spaceBefore=6, spaceAfter=6,
        backColor=SECTION_BG, borderColor=color, borderWidth=0,
        borderPadding=10, alignment=TA_LEFT,
    )
    return Paragraph(text, style)

def spacer(h=6):
    return Spacer(1, h)

def hr():
    return HRFlowable(width='100%', thickness=0.5, color=BORDER, spaceBefore=4, spaceAfter=4)

def make_table(data, col_widths=None, header=True, stripe=True):
    """Build a styled table."""
    if col_widths is None:
        n = len(data[0])
        col_widths = [CONTENT_WIDTH / n] * n
    t = Table(data, colWidths=col_widths, repeatRows=1 if header else 0)
    style_cmds = [
        ('FONT', (0, 0), (-1, -1), 'NotoSerifSC', 9),
        ('TEXTCOLOR', (0, 0), (-1, -1), TEXT_PRIMARY),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LINEBELOW', (0, 0), (-1, 0), 0.5, BORDER),
        ('LINEBELOW', (0, -1), (-1, -1), 0.5, BORDER),
    ]
    if header:
        style_cmds.extend([
            ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
            ('TEXTCOLOR', (0, 0), (-1, 0), TABLE_HEADER_TEXT),
            ('FONT', (0, 0), (-1, 0), 'SansSC-Bold', 9),
            ('FONTSIZE', (0, 0), (-1, 0), 9),
        ])
    if stripe and header:
        for i in range(1, len(data)):
            bg = TABLE_ROW_ODD if i % 2 == 1 else TABLE_ROW_EVEN
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t

# ─────────────────────────────────────────────────────────────────────────────
# TocDocTemplate (MANDATORY for TOC support)
# ─────────────────────────────────────────────────────────────────────────────
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

# ─────────────────────────────────────────────────────────────────────────────
# PAGE TEMPLATE (header + footer)
# ─────────────────────────────────────────────────────────────────────────────
def page_header_footer(canv, doc):
    canv.saveState()
    # Header line
    canv.setStrokeColor(BORDER)
    canv.setLineWidth(0.4)
    canv.line(LEFT_MARGIN, PAGE_H - 15 * mm, PAGE_W - RIGHT_MARGIN, PAGE_H - 15 * mm)
    # Header text
    canv.setFont('SansSC', 8)
    canv.setFillColor(TEXT_MUTED)
    canv.drawString(LEFT_MARGIN, PAGE_H - 13 * mm, 'SAKOLA — Laporan Teknis Arsitektur & Audit Bug')
    canv.drawRightString(PAGE_W - RIGHT_MARGIN, PAGE_H - 13 * mm, 'v0.2.0  •  12 Agustus 2026')

    # Footer line
    canv.line(LEFT_MARGIN, 15 * mm, PAGE_W - RIGHT_MARGIN, 15 * mm)
    # Footer text
    canv.setFont('SansSC', 8)
    canv.setFillColor(TEXT_MUTED)
    canv.drawString(LEFT_MARGIN, 11 * mm, 'Dokumen Internal — Tim IT SAKOLA')
    page_num = canv.getPageNumber()
    canv.drawRightString(PAGE_W - RIGHT_MARGIN, 11 * mm, f'Halaman {page_num}')
    canv.restoreState()

# ─────────────────────────────────────────────────────────────────────────────
# BUILD STORY
# ─────────────────────────────────────────────────────────────────────────────
story = []

# ═══════════════════════════════════════════════════════════════════════════
# TABLE OF CONTENTS
# ═══════════════════════════════════════════════════════════════════════════
story.append(Spacer(1, 10 * mm))
story.append(Paragraph('Daftar Isi', ParagraphStyle(
    'TOCTitle', fontName='SansSC-Bold', fontSize=22, leading=28,
    textColor=HEADER_FILL, alignment=TA_LEFT, spaceAfter=14,
)))
story.append(HRFlowable(width='100%', thickness=2, color=ACCENT, spaceBefore=0, spaceAfter=14))

toc = TableOfContents()
toc.levelStyles = [style_toc_l0, style_toc_l1]
story.append(toc)
story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════════════════
# BAB 1: RINGKASAN EKSEKUTIF
# ═══════════════════════════════════════════════════════════════════════════
story.append(h1('1. Ringkasan Eksekutif'))

story.append(p(
    '<b>SAKOLA</b> (Santo Augustinus Komputasi Online Learning Aplikasi) adalah platform e-learning '
    'terpadu untuk SMP Santo Augustinus dan SMK Santo Petrus. Aplikasi ini berevolusi dari alat latihan '
    'mengetik menjadi LMS multi-mata pelajaran lengkap dengan fitur hierarki CP-TP sesuai Kurikulum Merdeka, '
    'sistem multi-guru dengan isolasi subject berbasis JWT, 5 jenis soal multi-type, perhitungan nilai '
    'hierarkis (NH/STS/SAS/NA), AI-powered generation via Gemini, serta fitur akademik lengkap '
    '(absensi, jurnal mengajar, catatan sikap, reset center, analytics).'
))

story.append(p(
    'Laporan teknis ini disusun untuk memberikan gambaran menyeluruh kepada tim IT mengenai arsitektur '
    'sistem, struktur kode, alur kerja inti, serta daftar bug aktif yang masih perlu diperbaiki. '
    'Audit dilakukan dengan menjalankan <font face="MonoFont">npx tsc --noEmit</font> yang menemukan '
    '15 error TypeScript aktif di direktori <font face="MonoFont">src/</font>, ditambah 9 bug medium/low '
    'yang teridentifikasi melalui analisis kode manual.'
))

story.append(h3('Status Kesehatan Kode (per 12 Agustus 2026)'))
story.append(bullet('<b>15 error TypeScript aktif</b> di direktori <font face="MonoFont">src/</font>'))
story.append(bullet('<b>9 bug medium/low</b> belum diperbaiki'))
story.append(bullet('Build Vercel tetap sukses karena <font face="MonoFont">typescript.ignoreBuildErrors: true</font> — <b>BERBAHAYA</b>, bug lolos ke production'))
story.append(bullet('5 migration Prisma aktif (anti-reset protection)'))
story.append(bullet('59 API routes, 17 Prisma models, 83 komponen React'))

story.append(spacer(10))

# Quick stats table
stats_data = [
    ['Metrik', 'Nilai', 'Catatan'],
    ['Total API Routes', '59', 'Tersebar di 10 domain fitur'],
    ['Total Prisma Models', '17', 'Termasuk 1 legacy (LearningObjective)'],
    ['Total Komponen React', '83', '48 UI primitives + 17 teacher + 6 student + 9 stages + 3 lainnya'],
    ['Error TypeScript Aktif', '15', '6 di subject-config, 4 di quiz/results-stage, 2 di typing-stage, 2 di student-dashboard, 1 di examples'],
    ['Bug Medium/Low', '9', 'ForceStop tabel, ignoreBuildErrors, resilient fetch, Material dual FK, dll'],
    ['Migrations Prisma', '5', '0_init, 1_cp_tp_upgrade, 2_academic_features, 3_multi_type_questions, 4_reset_request'],
    ['Mapel SMP', '14', 'Matematika ditambahkan per 2026'],
    ['Mapel SMK', '5', 'DKV, Komputer Akuntansi, Multimedia, TKJ, RPL'],
]
story.append(make_table(stats_data, col_widths=[55*mm, 35*mm, CONTENT_WIDTH - 90*mm]))

story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════════════════
# BAB 2: ARSITEKTUR & TEKNOLOGI
# ═══════════════════════════════════════════════════════════════════════════
story.append(h1('2. Arsitektur & Teknologi'))

story.append(h2('2.1 Tech Stack Inti'))
story.append(p(
    'Aplikasi SAKOLA dibangun di atas teknologi modern dengan Next.js 16 (App Router) sebagai framework '
    'utama, React 19 untuk runtime UI, dan TypeScript 5 untuk type safety. Database menggunakan PostgreSQL '
    'yang dihosting di Supabase (region ap-northeast-1) dengan Prisma 6 sebagai ORM. Autentikasi '
    'menggunakan custom stateless JWT (HMAC-SHA256) yang disimpan di httpOnly cookies — bukan library '
    'pihak ketiga seperti NextAuth, meskipun library tersebut terinstall. State management menggunakan '
    'Zustand 5 dengan persist middleware ke localStorage.'
))

stack_data = [
    ['Lapisan', 'Teknologi', 'Versi', 'Catatan'],
    ['Framework', 'Next.js (App Router)', '16.1.1', 'output: "standalone", reactStrictMode: false'],
    ['Bahasa', 'TypeScript', '5.x', 'tsconfig.json aktif'],
    ['Runtime UI', 'React', '19.0.0', 'Memakai React 19 features'],
    ['ORM', 'Prisma Client', '6.11.1', 'postinstall: prisma generate'],
    ['Database', 'PostgreSQL (Supabase)', '—', 'Project: wkvtjcvsttxypouzdwys'],
    ['Auth', 'Stateless JWT (custom)', '—', 'HMAC-SHA256, httpOnly cookies'],
    ['State Mgmt', 'Zustand', '5.0.6', 'persist middleware, localStorage'],
    ['Styling', 'Tailwind CSS', '4.x', '@tailwindcss/postcss'],
    ['UI Kit', 'shadcn/ui + Radix', '—', '30+ Radix primitives'],
    ['PWA', 'manifest.json + sw.js', '—', 'Service worker register di layout.tsx'],
    ['Deployment', 'Vercel serverless', '—', 'vercel-build: prisma generate && prisma migrate deploy && next build'],
]
story.append(make_table(stack_data, col_widths=[28*mm, 42*mm, 22*mm, CONTENT_WIDTH - 92*mm]))

story.append(spacer(8))
story.append(h2('2.2 Library Pendukung Utama'))
story.append(p(
    'Selain stack inti, aplikasi menggunakan banyak library pendukung untuk fungsi spesifik. Library '
    '<font face="MonoFont">z-ai-web-dev-sdk</font> berfungsi sebagai gateway ke Gemini AI untuk generasi '
    'soal, materi, dan infografis — API key hanya disimpan di backend dan tidak pernah diekspos ke client. '
    'Library <font face="MonoFont">xlsx</font> digunakan untuk import/export Excel (template soal, ekspor '
    'nilai), <font face="MonoFont">mammoth</font> untuk ekstraksi teks dari file .docx, dan '
    '<font face="MonoFont">pdfjs-dist</font> untuk ekstraksi teks PDF — keduanya untuk fitur AI generate '
    'dari dokumen yang diupload guru.'
))

lib_data = [
    ['Library', 'Versi', 'Fungsi'],
    ['z-ai-web-dev-sdk', '0.0.18', 'AI gateway ke Gemini (soal/materi/infografis) — backend only'],
    ['xlsx', '0.18.5', 'Import/export Excel (template soal, ekspor nilai)'],
    ['mammoth', '1.12.1', 'Ekstraksi teks .docx untuk AI generate'],
    ['pdfjs-dist', '6.2.108', 'Ekstraksi teks PDF untuk AI generate'],
    ['recharts', '2.15.4', 'Chart di analytics & dashboard'],
    ['framer-motion', '12.23.2', 'Animasi overlay (force-stop countdown, modal)'],
    ['react-markdown', '10.1.0', 'Render teks bacaan kelas 9 (markdown)'],
    ['sonner', '2.0.6', 'Toast notifications'],
    ['date-fns', '4.1.0', 'Manipulasi tanggal (absensi, jurnal)'],
    ['react-hook-form + zod', '4.0.2', 'Form validation'],
    ['@dnd-kit/*', '6.3.1', 'Drag-and-drop (mencocokkan, urutan TP)'],
    ['@mdxeditor/editor', '3.39.1', 'Editor MDX untuk materi'],
]
story.append(make_table(lib_data, col_widths=[42*mm, 22*mm, CONTENT_WIDTH - 64*mm]))

story.append(spacer(8))
story.append(h2('2.3 Konfigurasi Kunci'))
story.append(p(
    'File <font face="MonoFont">next.config.ts</font> mengatur output standalone untuk Vercel dan '
    '<b>ignoreBuildErrors: true</b> untuk TypeScript — ini berbahaya karena build selalu sukses meskipun '
    'ada type error, sehingga bug bisa lolos ke production. File <font face="MonoFont">.env</font> '
    'berisi 3 secrets: DATABASE_URL, DIRECT_URL, dan GEMINI_API_KEY. Script '
    '<font face="MonoFont">vercel-build</font> menjalankan prisma generate, prisma migrate deploy, '
    'dan next build secara berurutan untuk memastikan schema database selalu sinkron dengan code.'
))

story.append(callout(
    '<b>Peringatan Kritis:</b> Setting <font face="MonoFont">typescript.ignoreBuildErrors: true</font> '
    'di <font face="MonoFont">next.config.ts</font> menyebabkan build Vercel selalu sukses meskipun '
    'ada 15 TypeScript error aktif. Bug bisa lolos ke production tanpa terdeteksi. Disarankan set ke '
    '<font face="MonoFont">false</font> setelah semua Bug P0 (#1-#4) diperbaiki.'
, color=SEM_ERROR))

story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════════════════
# BAB 3: STRUKTUR FILE & DIREKTORI
# ═══════════════════════════════════════════════════════════════════════════
story.append(h1('3. Struktur File & Direktori'))

story.append(p(
    'Aplikasi mengikuti struktur standar Next.js App Router dengan pemisahan yang jelas antara API routes '
    '(di <font face="MonoFont">src/app/api/</font>), komponen UI (di <font face="MonoFont">src/components/</font>), '
    'dan utility layer (di <font face="MonoFont">src/lib/</font>). Database schema dan migration files '
    'tersimpan di folder <font face="MonoFont">prisma/</font> dengan 5 migration files yang terlokir '
    'untuk mencegah reset schema saat deploy Vercel.'
))

story.append(h2('3.1 Tree Struktur Direktori'))
story.append(code('''my-project/
├── prisma/
│   ├── schema.prisma              # 13 model Prisma
│   └── migrations/                # 5 migration files (anti-reset)
│       ├── 0_init/                # baseline schema
│       ├── 1_cp_tp_upgrade/       # CP/TP hierarchy
│       ├── 2_academic_features/   # attendance, jurnal, sikap
│       ├── 3_multi_type_questions/# 5 jenis soal + levelKognitif
│       └── 4_reset_request/       # reset request untuk remedial
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # root layout (PWA, SW, fonts, Toaster)
│   │   ├── page.tsx               # routing utama (?view=teacher|student-dashboard)
│   │   ├── globals.css
│   │   └── api/                   # 59 API routes
│   ├── components/
│   │   ├── teacher-dashboard.tsx  # shell utama guru (sidebar + 15 menu)
│   │   ├── teacher-login.tsx
│   │   ├── pwa-installer.tsx
│   │   ├── ui/                    # 48 shadcn/ui primitives
│   │   ├── teacher/               # 17 manager komponen guru
│   │   ├── student/               # 6 komponen siswa
│   │   └── stages/                # 9 stage alur latihan siswa
│   ├── lib/                       # utility layer
│   │   ├── auth.ts                # JWT HMAC-SHA256 (stateless)
│   │   ├── db.ts                  # PrismaClient singleton
│   │   ├── constants.ts           # SMP/SMK subjects, grade tiers, task types
│   │   ├── store.ts               # Zustand store
│   │   ├── data.ts                # data fetching helpers
│   │   ├── utils.ts               # cn(), format helpers
│   │   └── use-resilient-fetch.ts # hook resilient fetch (auto-retry 401)
│   └── hooks/
│       ├── use-toast.ts
│       └── use-mobile.ts
├── public/
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                      # service worker
│   ├── logo.svg
│   └── icons/                     # PWA icons (72-512px)
├── .zscripts/                     # build/dev/start shell scripts
├── .env                           # 3 secrets (gitignored)
└── worklog.md                     # audit trail perbaikan bug'''))

story.append(spacer(8))
story.append(h2('3.2 Penjelasan Folder Utama'))

folder_data = [
    ['Folder', 'Fungsi'],
    ['prisma/migrations/', 'Migration files terlokir — JANGAN gunakan db:push yang bisa reset schema'],
    ['src/app/api/', '59 API routes Next.js App Router, terorganisir per domain'],
    ['src/components/ui/', '48 shadcn/ui primitives (Button, Dialog, Select, dll)'],
    ['src/components/teacher/', '17 komponen manager untuk dashboard guru'],
    ['src/components/student/', '6 komponen untuk siswa (login, dashboard, self-assessment, overlay)'],
    ['src/components/stages/', '9 stage alur latihan (typing → quiz → results → completed)'],
    ['src/lib/', 'Utility layer: auth, db, constants, store, hooks'],
    ['public/', 'Static assets: PWA manifest, service worker, icons'],
]
story.append(make_table(folder_data, col_widths=[55*mm, CONTENT_WIDTH - 55*mm]))

story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════════════════
# BAB 4: ALUR KERJA UTAMA
# ═══════════════════════════════════════════════════════════════════════════
story.append(h1('4. Alur Kerja Utama (Core Logic & Flow)'))

story.append(h2('4.1 Authentication Flow (Stateless JWT)'))
story.append(p(
    'Autentikasi menggunakan custom stateless JWT yang di-sign dengan HMAC-SHA256. Token berisi payload '
    '(teacherId, username, name, role, subject, kelasDiampu, type, iat) dan disimpan di httpOnly cookie '
    'dengan maxAge 8 jam untuk guru dan 7 hari untuk siswa. Verifikasi dilakukan dengan recompute '
    'signature menggunakan secret dan compare — tidak ada query DB untuk verifikasi, sehingga sangat '
    'cepat dan cocok untuk Vercel serverless. Terdapat emergency bypass untuk admin/guru123 yang skip '
    'DB query sepenuhnya, bekerja bahkan jika database offline.'
))

story.append(p(
    'Secret JWT menggunakan fallback berantai: <font face="MonoFont">process.env.JWT_SECRET || '
    'process.env.GEMINI_API_KEY || \'SAKOLA_SECRET_2024_hendrikus\'</font>. Ini berbahaya karena jika '
    'JWT_SECRET tidak diset dan GEMINI_API_KEY berubah, semua session invalidate. Disarankan set '
    'JWT_SECRET eksplisit di Vercel env vars.'
))

story.append(h3('Implementasi JWT'))
story.append(code('''const JWT_SECRET = process.env.JWT_SECRET
  || process.env.GEMINI_API_KEY
  || 'SAKOLA_SECRET_2024_hendrikus'

export function createTeacherToken(data: TeacherSession): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({ ...data, type: 'teacher', iat: Date.now() })).toString('base64url')
  const signature = crypto.createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`).digest('base64url')
  return `${header}.${payload}.${signature}`
}'''))

story.append(h2('4.2 Subject Isolation Pattern'))
story.append(p(
    'Setiap API guru WAJIB mengikuti pola isolasi subject: verifikasi JWT, ekstrak teacher.subject dari '
    'token, lalu filter semua query Prisma dengan <font face="MonoFont">where: { subject: teacher.subject }</font>. '
    'Pola ini memastikan guru hanya bisa melihat dan mengelola data milik subject-nya sendiri. '
    'JANGAN pernah menggunakan <font face="MonoFont">where: {}</font> (akan bocor ke semua subject) atau '
    'menerima subject dari query param client (bisa dimanipulasi).'
))

story.append(h3('Contoh Pattern yang Benar'))
story.append(code('''export async function GET(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const teacher = getTeacherFromToken(req)
  if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

  const texts = await db.typingText.findMany({
    where: { subject: teacher.subject },  // ← ISOLATED
    orderBy: [{ gradeLevel: 'asc' }, { updatedAt: 'desc' }],
  })
  return NextResponse.json({ success: true, texts })
}'''))

story.append(h2('4.3 Alur Latihan Siswa'))
story.append(p(
    'Alur latihan siswa dimulai dari login NISN+password, lalu redirect ke student-dashboard. Siswa '
    'memilih tugas aktif, lalu masuk ke typing stage (40 menit, auto-save setiap 5 detik via fetch + '
    'sendBeacon saat beforeunload). Saat handleFinish dipanggil, sistem mengecek taskType dari localStorage: '
    'jika typing_only, langsung submit result dan skip quiz; jika typing_quiz, lanjut ke quiz stage (25 menit). '
    'Setelah selesai, siswa melihat results stage dengan skor + pembahasan, lalu self-assessment '
    'TUNTAS/BELUM TUNTAS. Jika BELUM TUNTAS, siswa bisa mengajukan remedial yang harus diapprove guru '
    'di Reset Center (atomic transaction: delete Result + Progress, lalu siswa bisa kerjakan ulang).'
))

story.append(h2('4.4 Force Stop Flow (Polling-based)'))
story.append(p(
    'Force Stop menggunakan polling (bukan WebSocket) untuk kompatibilitas dengan Vercel serverless. '
    'Guru trigger via POST /api/force-stop yang membuat record di tabel ForceStop dengan expiresAt = '
    'NOW+60s. Siswa poll GET /api/force-stop setiap 3 detik di ForceStopOverlay. Saat countdown habis, '
    'overlay dispatch CustomEvent("force-stop-expired") yang didengarkan oleh typing-stage dan quiz-stage '
    'untuk memanggil handleFinish/handleSubmit, plus sendBeacon ke /api/student/progress/force-submit '
    'sebagai backup. Setelah 2.5 detik, siswa di-redirect ke student-dashboard (bukan login page).'
))

story.append(h2('4.5 Hierarchical Grade Calculation'))
story.append(p(
    'Perhitungan nilai menggunakan hierarki 3 tingkat: (1) ManualGrade dikelompokkan per gradeCategory '
    '(tugas_harian, ulangan_harian, sts, sas), (2) Nilai Harian (NH) dihitung dari rata-rata tugas harian '
    'dan ulangan harian dengan bobot dari SubjectConfig (default 40/60), (3) Nilai Akhir (NA) = '
    'NH×bobotNH + STS×bobotSTS + SAS×bobotSAS (default 40/30/30). Bobot dapat dikustomisasi per mapel '
    'per tahun ajaran per semester melalui SubjectConfig. Hasil perhitungan dapat diekspor ke Excel '
    'dalam 3 format: per_cp (per CP), all_cp (gabungan), na_summary (ringkasan NA).'
))

story.append(h2('4.6 AI Generation Flow'))
story.append(p(
    'AI generation menggunakan Gemini via z-ai-web-dev-sdk. Guru memilih CP + TP + jumlah soal + level '
    'kognitif di AI Generate Dialog, lalu POST /api/ai/generate-questions. Backend memvalidasi cpId dan '
    'tpId dari DB, membangun prompt dengan konteks CP/TP, lalu call Gemini API. Response dibersihkan '
    'melalui cleanAndParseJSON (6-step cleaning: strip markdown fences, extract JSON array, fix trailing '
    'commas, parse, validate). Jika parse gagal, generateFallbackQuestions dipanggil untuk membuat soal '
    'mock — API tidak pernah return 500. API key Gemini hanya ada di .env dan tidak pernah diekspos ke client.'
))

story.append(h2('4.7 Database Migration Strategy (Anti-Reset)'))
story.append(p(
    'Database menggunakan Prisma migrate deploy (BUKAN db:push) untuk mencegah reset schema saat deploy '
    'Vercel. Script <font face="MonoFont">vercel-build</font> menjalankan <font face="MonoFont">prisma generate '
    '&& prisma migrate deploy && next build</font>. prisma migrate deploy membaca folder '
    '<font face="MonoFont">prisma/migrations/</font>, mengecek tabel _prisma_migrations di DB, lalu '
    'menjalankan migration yang belum di-applied. Schema tidak pernah di-overwrite. Larangan kritis: '
    'JANGAN jalankan <font face="MonoFont">prisma db push</font> — ini akan overwrite .env dan bisa reset '
    'schema. Sudah dihapus dari .zscripts/dev.sh.'
))

story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════════════════
# BAB 5: API ENDPOINT REFERENCE
# ═══════════════════════════════════════════════════════════════════════════
story.append(h1('5. API Endpoint Reference'))

story.append(p(
    'Aplikasi memiliki total 59 API routes yang dikelompokkan per domain. Setiap API guru wajib '
    'mengimplementasikan subject isolation (filter by teacher.subject dari JWT). API siswa menggunakan '
    'student_token cookie untuk autentikasi. Beberapa API publik (content/questions, content/typing-text) '
    'tidak memerlukan autentikasi karena diakses oleh siswa yang sudah login untuk mengambil soal/teks bacaan.'
))

story.append(h2('5.1 Auth & Session (5 endpoint)'))
auth_data = [
    ['Method', 'Endpoint', 'Fungsi'],
    ['POST', '/api/teacher/login', 'Login guru + bypass admin/guru123'],
    ['GET', '/api/teacher/session', 'Cek session dari JWT'],
    ['POST', '/api/teacher/logout', 'Hapus cookie'],
    ['POST', '/api/student/auth', 'Login siswa (NISN + password)'],
    ['GET', '/api/student/auth', 'Cek session siswa (resilient fallback ke JWT)'],
]
story.append(make_table(auth_data, col_widths=[18*mm, 55*mm, CONTENT_WIDTH - 73*mm]))

story.append(spacer(6))
story.append(h2('5.2 Teacher CRUD (7 endpoint)'))
teacher_data = [
    ['Method', 'Endpoint', 'Fungsi'],
    ['GET/POST', '/api/teacher/manage', 'Kelola akun guru (admin only)'],
    ['GET/PUT', '/api/teacher/profile', 'Profil guru'],
    ['POST', '/api/teacher/reset-bulk', 'Reset bulk siswa'],
    ['CRUD', '/api/teacher/students', 'CRUD siswa'],
    ['GET', '/api/teacher/students/template', 'Download template Excel'],
    ['POST', '/api/teacher/students/import', 'Import Excel siswa'],
    ['POST', '/api/teacher/students/[id]/reset', 'Reset progress siswa'],
]
story.append(make_table(teacher_data, col_widths=[18*mm, 55*mm, CONTENT_WIDTH - 73*mm]))

story.append(spacer(6))
story.append(h2('5.3 Dashboard & Analytics (3 endpoint)'))
dash_data = [
    ['Method', 'Endpoint', 'Fungsi'],
    ['GET', '/api/dashboard', 'Data dashboard guru (subject-isolated)'],
    ['GET', '/api/dashboard/global', 'Stats global (pendingGrades, jurnalToday, dll)'],
    ['GET', '/api/analytics/student', 'Analytics per siswa (STRICT subject dari JWT)'],
]
story.append(make_table(dash_data, col_widths=[18*mm, 55*mm, CONTENT_WIDTH - 73*mm]))

story.append(spacer(6))
story.append(h2('5.4 Tugas & Materi (8 endpoint)'))
task_data = [
    ['Method', 'Endpoint', 'Fungsi'],
    ['CRUD', '/api/assignments + [id]', 'CRUD tugas'],
    ['CRUD', '/api/materials + [id]', 'CRUD materi'],
    ['CRUD', '/api/typing-texts + [id]', 'CRUD teks bacaan'],
    ['CRUD', '/api/questions + [id] + /template + /import', 'CRUD bank soal'],
    ['CRUD', '/api/cp + [id]', 'Capaian Pembelajaran'],
    ['CRUD', '/api/tp + [id]', 'Tujuan Pembelajaran (filter by cpId)'],
    ['CRUD', '/api/learning-objectives + [id]', 'Legacy'],
    ['GET/PUT', '/api/subject-config', 'KKM + bobot'],
]
story.append(make_table(task_data, col_widths=[18*mm, 70*mm, CONTENT_WIDTH - 88*mm]))

story.append(spacer(6))
story.append(h2('5.5 Hasil, Nilai, Fitur Akademik, AI, Force Stop'))
rest_data = [
    ['Domain', 'Endpoint Count', 'Endpoint Utama'],
    ['Hasil & Nilai', '5', '/api/result, /api/manual-grades, /api/grades/calculate, /api/grades/export'],
    ['Sisi Siswa', '5', '/api/student, /api/student/assignments, /api/student/materials, /api/student/grades, /api/student/progress'],
    ['Fitur Akademik', '4', '/api/attendance, /api/jurnal, /api/sikap, /api/reset-requests'],
    ['AI Generation', '4', '/api/ai/generate-questions, generate-material, generate-from-document, generate-infographic'],
    ['Force Stop & Backup', '2', '/api/force-stop (GET/POST), /api/student/progress/force-submit'],
    ['Content Public', '2', '/api/content/questions, /api/content/typing-text'],
]
story.append(make_table(rest_data, col_widths=[42*mm, 28*mm, CONTENT_WIDTH - 70*mm]))

story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════════════════
# BAB 6: DAFTAR BUG & ERROR AKTIF
# ═══════════════════════════════════════════════════════════════════════════
story.append(h1('6. Daftar Bug & Error Aktif'))

story.append(p(
    'Berdasarkan <font face="MonoFont">npx tsc --noEmit</font> (15 error di direktori src/) ditambah '
    'analisis kode manual, berikut bug aktif yang masih perlu diperbaiki. Bug dikelompokkan per prioritas: '
    'P0 (Kritis), P1 (Medium), P2 (Low). Setiap bug disertai dengan file lokasi, pesan error, akar masalah, '
    'dampak runtime, dan fix yang diperlukan.'
))

# ─── Bug #1 ───
story.append(h2('6.1 Bug #1 [P0 Kritis]: SubjectConfig API pakai unique key lama'))
story.append(p('<b>File:</b> <font face="MonoFont">src/app/api/subject-config/route.ts</font> lines 51, 64, 87, 88, 133, 134, 135'))
story.append(p('<b>Pesan Error:</b>'))
story.append(code('''src/app/api/subject-config/route.ts(51,37): error TS2322:
  Type '{ subject: string; }' is not assignable to type 'SubjectConfigWhereUniqueInput'.
  Missing properties: id, subject_tahunAjaran_semester

src/app/api/subject-config/route.ts(87,26): error TS2551:
  Property 'bobotUTS' does not exist. Did you mean 'bobotSTS'?'''))
story.append(p('<b>Akar Masalah:</b>'))
story.append(p(
    'Schema Prisma diubah ke compound unique: <font face="MonoFont">@@unique([subject, tahunAjaran, semester])</font> '
    'di line 194 schema.prisma. Field <font face="MonoFont">bobotUTS</font> dan <font face="MonoFont">bobotUAS</font> '
    'di-rename menjadi <font face="MonoFont">bobotSTS</font> dan <font face="MonoFont">bobotSAS</font>. '
    'TAPI route <font face="MonoFont">subject-config/route.ts</font> masih pakai pattern lama: '
    '<font face="MonoFont">db.subjectConfig.findUnique({ where: { subject } })</font> dan '
    '<font face="MonoFont">config.bobotUTS</font> / <font face="MonoFont">config.bobotUAS</font>.'
))
story.append(p('<b>Dampak Runtime:</b>'))
story.append(p(
    'API return 200 dengan <font face="MonoFont">fallback: true</font> (hardcoded default) — perubahan '
    'KKM/bobot TIDAK tersimpan ke DB. Saat guru ubah bobot, upsert throw error → catch block return '
    '<font face="MonoFont">fallback: true</font> → UI show success toast padahal data tidak tersimpan.'
))
story.append(p('<b>Fix yang Diperlukan:</b>'))
story.append(code('''// Ganti semua where: { subject } → compound unique
db.subjectConfig.findUnique({
  where: {
    subject_tahunAjaran_semester: { subject, tahunAjaran, semester }
  }
})

// Rename bobotUTS → bobotSTS, bobotUAS → bobotSAS
const DEFAULT_BOBOT = { bobotNH: 40, bobotSTS: 30, bobotSAS: 30 }'))

// Ambil tahunAjaran dan semester dari query param atau default
// '2026/2027' + 'ganjil'.'''))

story.append(PageBreak())

# ─── Bug #2 ───
story.append(h2('6.2 Bug #2 [P0 Kritis]: Question.imageUrl tidak ada di interface'))
story.append(p('<b>File:</b> <font face="MonoFont">src/components/stages/quiz-stage.tsx</font> lines 362, 365; <font face="MonoFont">src/components/stages/results-stage.tsx</font> lines 310, 312'))
story.append(p('<b>Pesan Error:</b>'))
story.append(code('''src/components/stages/quiz-stage.tsx(362,25): error TS2339:
  Property 'imageUrl' does not exist on type 'Question'.
src/components/stages/results-stage.tsx(310,28): error TS2339:
  Property 'imageUrl' does not exist on type 'Question'.'''))
story.append(p('<b>Akar Masalah:</b>'))
story.append(p(
    'Schema Prisma Question model memiliki field <font face="MonoFont">imageUrl String?</font> (line 57 schema.prisma). '
    'API /api/content/questions return <font face="MonoFont">imageUrl: q.imageUrl || null</font>. '
    'TAPI interface Question di quiz-stage.tsx dan results-stage.tsx tidak mendeklarasikan field imageUrl.'
))
story.append(p('<b>Dampak Runtime:</b>'))
story.append(p(
    'Karena next.config.ts set <font face="MonoFont">typescript.ignoreBuildErrors: true</font>, build tetap sukses. '
    'Runtime: <font face="MonoFont">currentQ.imageUrl</font> akan <font face="MonoFont">undefined</font> → '
    '<font face="MonoFont">currentQ.imageUrl && (...)</font> falsy → gambar soal TIDAK pernah dirender, '
    'meskipun ada di DB.'
))
story.append(p('<b>Fix yang Diperlukan:</b> Tambahkan <font face="MonoFont">imageUrl?: string | null</font> ke interface Question di kedua file.'))

# ─── Bug #3 ───
story.append(h2('6.3 Bug #3 [P0 Kritis]: Progress.copyWarnings tidak ada di interface'))
story.append(p('<b>File:</b> <font face="MonoFont">src/components/stages/typing-stage.tsx</font> lines 102, 103'))
story.append(p('<b>Pesan Error:</b>'))
story.append(code('''src/components/stages/typing-stage.tsx(102,20): error TS2339:
  Property 'copyWarnings' does not exist on type 'ResumableProgress'.'''))
story.append(p('<b>Akar Masalah:</b>'))
story.append(p(
    'Interface ResumableProgress di <font face="MonoFont">src/lib/store.ts</font> lines 44-53 TIDAK punya '
    'field copyWarnings. TAPI typing-stage.tsx line 102-103 mengakses <font face="MonoFont">progress.copyWarnings</font>.'
))
story.append(p('<b>Dampak Runtime:</b>'))
story.append(p(
    'Saat siswa resume latihan (ada progress tersimpan), <font face="MonoFont">progress.copyWarnings</font> '
    'undefined → <font face="MonoFont">if (undefined)</font> falsy → <font face="MonoFont">setCopyWarnings</font> '
    'tidak dipanggil → counter copy-paste reset ke 0. Tidak fatal, tapi data warning hilang.'
))
story.append(p('<b>Fix yang Diperlukan:</b> Tambahkan <font face="MonoFont">copyWarnings?: number</font> ke ResumableProgress di src/lib/store.ts.'))

# ─── Bug #4 ───
story.append(h2('6.4 Bug #4 [P0 Kritis]: student-dashboard.tsx nullable access'))
story.append(p('<b>File:</b> <font face="MonoFont">src/components/student/student-dashboard.tsx</font> lines 189, 190'))
story.append(p('<b>Pesan Error:</b>'))
story.append(code('''src/components/student/student-dashboard.tsx(189,14): error TS18048:
  'data.pendingResultsCount' is possibly 'undefined'.
src/components/student/student-dashboard.tsx(190,242): error TS18047:
  'data' is possibly 'null'.'''))
story.append(p('<b>Akar Masalah:</b>'))
story.append(p(
    'Line 189: <font face="MonoFont">{data?.pendingResultsCount > 0 && (...)}</font> — '
    '<font face="MonoFont">data?.pendingResultsCount</font> bisa undefined, lalu '
    '<font face="MonoFont">undefined > 0</font> adalah type error. '
    'Line 190: Akses <font face="MonoFont">data.pendingResultsCount</font> di dalam JSX tanpa null check.'
))
story.append(p('<b>Dampak Runtime:</b>'))
story.append(p(
    'Build sukses (ignoreBuildErrors), tapi bisa crash jika data null saat fetch gagal. '
    'Client-side exception → siswa lihat error overlay.'
))
story.append(p('<b>Fix yang Diperlukan:</b>'))
story.append(code('''// Ganti line 189:
{(data?.pendingResultsCount ?? 0) > 0 && data && (
  <Card ...>
    <p>{data.pendingResultsCount} hasil menunggu review guru</p>'''))

story.append(PageBreak())

# ─── Bug #5-8 Medium ───
story.append(h2('6.5 Bug #5 [P1 Medium]: Tabel ForceStop tidak ada di schema Prisma'))
story.append(p('<b>File:</b> <font face="MonoFont">src/app/api/force-stop/route.ts</font> lines 22-29, 76-86'))
story.append(p('<b>Akar Masalah:</b>'))
story.append(p(
    'API menggunakan <font face="MonoFont">db.$queryRaw</font> dan <font face="MonoFont">db.$executeRaw</font> '
    'untuk akses tabel ForceStop karena model ini TIDAK didefinisikan di prisma/schema.prisma. Saat POST '
    'pertama kali, INSERT gagal → catch block CREATE TABLE IF NOT EXISTS via raw SQL → retry INSERT.'
))
story.append(p('<b>Dampak Runtime:</b>'))
story.append(p(
    'POST pertama setelah deploy bisa lambat (2 query: failed INSERT + CREATE TABLE + retry INSERT). '
    'Jika CREATE TABLE gagal (permission issue), force-stop tidak berfungsi sama sekali.'
))
story.append(p('<b>Fix yang Diperlukan:</b> Tambahkan model ForceStop ke prisma/schema.prisma, buat migration, ganti raw SQL dengan db.forceStop.create()/findFirst().'))

story.append(spacer(8))
story.append(h2('6.6 Bug #6 [P1 Medium]: next.config.ts ignore TypeScript errors'))
story.append(p('<b>File:</b> <font face="MonoFont">next.config.ts</font> line 7'))
story.append(p('<b>Kode Bermasalah:</b>'))
story.append(code('''const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,   // BERBAHAYA
  },
  reactStrictMode: false,
};'''))
story.append(p('<b>Dampak:</b> Build Vercel selalu sukses meskipun ada 15 TypeScript error. Bug bisa lolos ke production.'))
story.append(p('<b>Fix:</b> Set <font face="MonoFont">ignoreBuildErrors: false</font> SETELAH semua Bug #1-#4 diperbaiki.'))

story.append(spacer(8))
story.append(h2('6.7 Bug #7 [P1 Medium]: Resilient Fetch hook belum diterapkan ke semua manager'))
story.append(p('<b>Status:</b> Sebagian diperbaiki.'))
story.append(p('<b>Sudah diterapkan</b> (auto-retry 401, preserve last data, error state):'))
story.append(bullet('text-manager.tsx'))
story.append(bullet('materials-manager.tsx'))
story.append(bullet('question-bank.tsx'))
story.append(p('<b>Belum diterapkan</b> (masih pakai pattern lama yang menyebabkan state loss):'))
story.append(bullet('cptp-manager.tsx, grade-book.tsx, attendance-manager.tsx'))
story.append(bullet('jurnal-manager.tsx, sikap-manager.tsx, analytics-manager.tsx'))
story.append(bullet('students-manager.tsx, admin-manager.tsx, reset-center.tsx'))
story.append(p('<b>Fix:</b> Terapkan useResilientFetch hook (sudah ada di src/lib/use-resilient-fetch.ts) ke 9 komponen di atas.'))

story.append(spacer(8))
story.append(h2('6.8 Bug #8 [P1 Medium]: Material model punya dua FK field untuk TP'))
story.append(p('<b>File:</b> <font face="MonoFont">prisma/schema.prisma</font> lines 121-123'))
story.append(p('<b>Kode Bermasalah:</b>'))
story.append(code('''model Material {
  tpId        String?  // legacy String field
  cpId        String?  // link ke CapaianPembelajaran
  newTpId     String?  // proper FK name (duplicate)
}'''))
story.append(p('<b>Dampak:</b> Konsistensi data terancam — beberapa material pakai tpId, beberapa pakai newTpId. Query join tidak reliable.'))
story.append(p('<b>Fix:</b> Pilih satu field (mis. tpId), migrasi data dari newTpId, hapus newTpId dari schema + buat migration.'))

story.append(PageBreak())

# ─── Bug #9-14 Low ───
story.append(h2('6.9 Bug Low (Priority 2)'))

low_data = [
    ['#', 'Deskripsi', 'File', 'Fix'],
    ['9', 'examples/ dan scripts/ error (non-production)', 'examples/websocket/, scripts/', 'Exclude di tsconfig.json: "exclude": ["examples", "scripts", "skills"]'],
    ['10', 'skills/ error (bukan bagian aplikasi)', 'skills/image-edit/, skills/stock-analysis-skill/', 'Exclude di tsconfig.json'],
    ['11', 'worklog.md tidak ter-update untuk Task 7, 8, 9', 'worklog.md', 'Append Task ID 7, 8, 9 ke worklog.md'],
    ['12', 'TEACHER_SUBJECT hardcode di assignments-manager', 'src/components/teacher/assignments-manager.tsx line 76', 'Ambil subject dari /api/teacher/session saat komponen mount'],
    ['13', 'Tidak ada rate limiting di AI generation endpoints', 'src/app/api/ai/*', 'Tambahkan rate limit (max 10 req/menit per teacherId) via in-memory Map atau Vercel KV'],
    ['14', 'Service worker sw.js tidak di-update otomatis', 'public/sw.js, src/app/layout.tsx', 'Tambahkan registration.update() saat controllerchange event, atau gunakan Workbox'],
]
story.append(make_table(low_data, col_widths=[10*mm, 50*mm, 50*mm, CONTENT_WIDTH - 110*mm]))

story.append(spacer(10))
story.append(h2('6.10 Ringkasan Bug per Prioritas'))

prio_data = [
    ['Prioritas', 'Bug #', 'Deskripsi', 'Effort', 'Dampak'],
    ['P0', '#1', 'SubjectConfig API unique key lama (6 TS error)', '1 jam', 'KKM/bobot tidak tersimpan'],
    ['P0', '#2', 'Question.imageUrl tidak ada di interface (4 TS error)', '30 menit', 'Gambar soal tidak tampil'],
    ['P0', '#3', 'ResumableProgress.copyWarnings hilang (2 TS error)', '15 menit', 'Resume kehilangan counter'],
    ['P0', '#4', 'student-dashboard nullable access (2 TS error)', '15 menit', 'Crash saat fetch gagal'],
    ['P1', '#5', 'ForceStop tabel tidak di schema', '1 jam', 'Force stop gagal di deploy baru'],
    ['P1', '#6', 'ignoreBuildErrors: true', '5 menit', 'Bug lolos ke production'],
    ['P1', '#7', 'Resilient fetch ke 9 manager lainnya', '4 jam', 'State loss di banyak menu'],
    ['P1', '#8', 'Material tpId/newTpId dual field', '2 jam', 'Data inconsistency'],
    ['P2', '#9-14', '6 bug low priority', '~3 jam', 'Audit trail, UX, hardening'],
]
story.append(make_table(prio_data, col_widths=[14*mm, 14*mm, 65*mm, 18*mm, CONTENT_WIDTH - 111*mm]))

story.append(callout(
    '<b>Total: 15 error TypeScript aktif + 9 bug medium/low yang belum diperbaiki.</b> '
    'Rekomendasi: mulai dari Bug #1 (SubjectConfig) karena paling kritis — guru tidak bisa menyimpan '
    'konfigurasi KKM dan bobot nilai, yang berdampak ke seluruh perhitungan grade book.'
, color=SEM_WARNING))

story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════════════════
# BAB 7: KESIMPULAN & REKOMENDASI
# ═══════════════════════════════════════════════════════════════════════════
story.append(h1('7. Kesimpulan Teknis & Rekomendasi'))

story.append(h2('7.1 Status Kesehatan Aplikasi'))
story.append(p(
    'Aplikasi SAKOLA secara fungsional sudah matang dengan fitur lengkap (LMS multi-subject, AI integration, '
    'PWA, hierarchical grading). Namun secara teknis masih memiliki 15 error TypeScript aktif yang tertutup '
    'oleh <font face="MonoFont">ignoreBuildErrors: true</font>. Ini berbahaya karena bug lolos ke production '
    'tanpa terdeteksi, type safety tergerus (TypeScript seharusnya menangkap bug saat compile, tapi di-override), '
    'dan maintenance sulit (developer baru tidak bisa andalkan type checker untuk memahami kode).'
))

story.append(h2('7.2 Rekomendasi Langkah Perbaikan Terdekat'))

story.append(h3('Fase 1: Stabilisasi Kritis (1-2 hari kerja)'))
story.append(bullet('Perbaiki Bug #1 (SubjectConfig API) — paling kritis karena guru tidak bisa menyimpan KKM/bobot. Ikuti fix di Bab 6.1.'))
story.append(bullet('Perbaiki Bug #2-#4 (TypeScript errors) — tambahkan field yang hilang ke interface. Cepat dan mudah.'))
story.append(bullet('Set <font face="MonoFont">ignoreBuildErrors: false</font> setelah semua P0 selesai. Build akan gagal jika ada type error baru — ini adalah safety net.'))

story.append(h3('Fase 2: Konsistensi Data (3-5 hari kerja)'))
story.append(bullet('Tambahkan model ForceStop ke schema Prisma (Bug #5) — buat migration resmi, hapus raw SQL.'))
story.append(bullet('Konsolidasi Material.tpId/newTpId (Bug #8) — pilih satu field, migrasi data, hapus field legacy.'))
story.append(bullet('Terapkan <font face="MonoFont">useResilientFetch</font> ke 9 manager sisanya (Bug #7) — menghilangkan state loss di seluruh dashboard guru.'))

story.append(h3('Fase 3: Hardening & Polish (1 minggu)'))
story.append(bullet('Update worklog.md (Bug #11) — append Task 7, 8, 9 untuk audit trail.'))
story.append(bullet('Ambil subject dari JWT di assignments-manager (Bug #12) — hapus hardcode TEACHER_SUBJECT.'))
story.append(bullet('Tambah rate limiting di AI endpoints (Bug #13) — lindungi kuota Gemini.'))
story.append(bullet('Update service worker strategy (Bug #14) — gunakan Workbox atau network-first untuk HTML.'))
story.append(bullet('Exclude examples/scripts/skills dari tsconfig (Bug #9, #10) — bersihkan output tsc --noEmit.'))

story.append(h2('7.3 Catatan Penting untuk Tim IT'))

story.append(callout(
    '<b>1. Build Vercel selalu sukses</b> karena <font face="MonoFont">ignoreBuildErrors: true</font>. '
    'Jangan andalkan build status sebagai indikator kesehatan kode. Selalu jalankan '
    '<font face="MonoFont">npx tsc --noEmit</font> secara lokal sebelum push.'
, color=SEM_INFO))

story.append(callout(
    '<b>2. Database tidak pernah di-reset</b> selama deploy karena <font face="MonoFont">prisma migrate deploy</font> '
    '(bukan <font face="MonoFont">db:push</font>). JANGAN ubah .zscripts/dev.sh kembali ke db:push.'
, color=SEM_INFO))

story.append(callout(
    '<b>3. Subject isolation adalah prinsip sacrosanct.</b> Setiap API baru WAJIB filter by '
    '<font face="MonoFont">teacher.subject</font> dari JWT. JANGAN pernah pakai '
    '<font face="MonoFont">where: {}</font> atau terima subject dari query param client.'
, color=SEM_INFO))

story.append(callout(
    '<b>4. JWT secret fallback ke GEMINI_API_KEY</b> jika JWT_SECRET tidak diset. Berbahaya karena '
    'jika GEMINI_API_KEY berubah, semua session invalidate. Disarankan set JWT_SECRET eksplisit '
    'di Vercel env vars.'
, color=SEM_WARNING))

story.append(callout(
    '<b>5. Gemini API key</b> ada di .env sebagai GEMINI_API_KEY. Hanya dipakai di server-side '
    '(/api/ai/*). JANGAN pernah expose ke client. Jika key bocor, segera rotate di Google AI Studio.'
, color=SEM_WARNING))

story.append(h2('7.4 Roadmap Jangka Panjang'))

story.append(p('Selain bug-fix, beberapa peningkatan arsitektur yang direkomendasikan:'))
story.append(bullet('<b>Pindahkan auth ke NextAuth.js</b> — sudah terinstall tapi tidak dipakai. Akan memberikan session management yang lebih robust, refresh token, dan provider OAuth.'))
story.append(bullet('<b>Tambah Redis (Vercel KV)</b> untuk caching dan rate limiting — mengurangi beban database dan melindungi AI endpoints.'))
story.append(bullet('<b>Implementasi WebSocket</b> untuk Force Stop — saat ini polling 3 detik, bisa diganti real-time push. Folder examples/websocket/ sudah ada contoh.'))
story.append(bullet('<b>Audit performance</b> dengan Lighthouse — aplikasi PWA harus memenuhi Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1).'))
story.append(bullet('<b>Backup otomatis database Supabase</b> — setup daily backup ke S3 atau Google Cloud Storage.'))
story.append(bullet('<b>Monitoring error production</b> — integrasikan Sentry atau Vercel Analytics untuk catch error yang terlewat.'))
story.append(bullet('<b>Testing</b> — saat ini tidak ada unit test/integration test. Tambahkan Jest + React Testing Library untuk komponen kritis.'))
story.append(bullet('<b>CI/CD pipeline</b> — GitHub Actions untuk run tsc --noEmit + eslint + next build sebelum merge ke main. Block PR yang gagal type check.'))

story.append(spacer(12))
story.append(HRFlowable(width='100%', thickness=1, color=ACCENT, spaceBefore=8, spaceAfter=8))
story.append(p(
    '<b>Penutup.</b> Laporan ini disusun berdasarkan audit menyeluruh terhadap codebase SAKOLA per 12 Agustus 2026. '
    'Setiap bug telah diidentifikasi akar masalahnya, dampak runtime-nya, dan fix yang diperlukan. '
    'Tim IT dapat langsung mulai dari Fase 1 (Bug #1-#4) karena paling kritis dan paling cepat diperbaiki. '
    'Untuk pertanyaan teknis atau klarifikasi, silakan merujuk ke worklog.md yang berisi audit trail perbaikan '
    'bug dari Task ID 1 hingga 9, atau periksa langsung kode sumber di repository GitHub.'
))

# ─────────────────────────────────────────────────────────────────────────────
# BUILD PDF
# ─────────────────────────────────────────────────────────────────────────────
BODY_PDF = '/home/z/my-project/scripts/body.pdf'
FINAL_PDF = '/home/z/my-project/download/SAKOLA_Laporan_Teknis_Arsitektur_dan_Audit_Bug.pdf'

doc = TocDocTemplate(
    BODY_PDF,
    pagesize=A4,
    leftMargin=LEFT_MARGIN, rightMargin=RIGHT_MARGIN,
    topMargin=TOP_MARGIN, bottomMargin=BOTTOM_MARGIN,
    title='SAKOLA - Laporan Teknis Arsitektur & Audit Bug',
    author='Z.ai',
    subject='Technical Architecture & Bug Audit Report',
    creator='SAKOLA IT Team',
)

doc.multiBuild(story, onFirstPage=page_header_footer, onLaterPages=page_header_footer)
print(f'Body PDF generated: {BODY_PDF}')

# ─────────────────────────────────────────────────────────────────────────────
# MERGE COVER + BODY
# ─────────────────────────────────────────────────────────────────────────────
from pypdf import PdfWriter, PdfReader

COVER_PDF = '/home/z/my-project/scripts/cover.pdf'

writer = PdfWriter()
# Add cover
cover_reader = PdfReader(COVER_PDF)
for page in cover_reader.pages:
    writer.add_page(page)
# Add body
body_reader = PdfReader(BODY_PDF)
for page in body_reader.pages:
    writer.add_page(page)

# Set metadata
writer.add_metadata({
    '/Title': 'SAKOLA - Laporan Teknis Arsitektur & Audit Bug',
    '/Author': 'Z.ai',
    '/Subject': 'Technical Architecture & Bug Audit Report',
    '/Creator': 'SAKOLA IT Team',
    '/Producer': 'ReportLab + Playwright',
})

with open(FINAL_PDF, 'wb') as f:
    writer.write(f)

print(f'Final PDF (cover + body merged): {FINAL_PDF}')
print(f'Total pages: {len(writer.pages)}')

# Get file size
size_kb = os.path.getsize(FINAL_PDF) / 1024
print(f'File size: {size_kb:.1f} KB')
