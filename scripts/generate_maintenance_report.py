#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator Laporan Maintenance PDF untuk proyek hendrikusmuda52-droid.
Output: /home/z/my-project/download/Laporan_Maintenance_hendrikusmuda52-droid.pdf
"""

import os
from datetime import datetime
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm, mm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, KeepTogether, Image, HRFlowable, ListFlowable, ListItem
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.pdfgen import canvas

# ============================================================
# 1. REGISTER FONTS
# ============================================================
FONT_DIR = '/usr/share/fonts'
pdfmetrics.registerFont(TTFont('Body',         f'{FONT_DIR}/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Body-Bold',    f'{FONT_DIR}/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Body-Italic',  f'{FONT_DIR}/truetype/liberation/LiberationSerif-Italic.ttf'))
pdfmetrics.registerFont(TTFont('Body-BoldItalic', f'{FONT_DIR}/truetype/liberation/LiberationSerif-BoldItalic.ttf'))
registerFontFamily('Body', normal='Body', bold='Body-Bold', italic='Body-Italic', boldItalic='Body-BoldItalic')

pdfmetrics.registerFont(TTFont('Head',         f'{FONT_DIR}/truetype/liberation/LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Head-Bold',    f'{FONT_DIR}/truetype/liberation/LiberationSans-Bold.ttf'))
registerFontFamily('Head', normal='Head', bold='Head-Bold')

pdfmetrics.registerFont(TTFont('Mono',         f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))
pdfmetrics.registerFont(TTFont('Mono-Bold',    f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono-Bold.ttf'))
registerFontFamily('Mono', normal='Mono', bold='Mono-Bold')

# ============================================================
# 2. CASCADE PALETTE (auto-generated)
# ============================================================
PAGE_BG       = colors.HexColor('#f4f5f5')
SECTION_BG    = colors.HexColor('#ebedee')
CARD_BG       = colors.HexColor('#ebeef0')
TABLE_STRIPE  = colors.HexColor('#eff1f2')
HEADER_FILL   = colors.HexColor('#4a636f')
COVER_BLOCK   = colors.HexColor('#44555d')
BORDER        = colors.HexColor('#c0ced5')
ICON          = colors.HexColor('#41809f')
ACCENT        = colors.HexColor('#236b8e')
ACCENT_2      = colors.HexColor('#b97058')
TEXT_PRIMARY  = colors.HexColor('#1e2021')
TEXT_MUTED    = colors.HexColor('#767d80')
SEM_SUCCESS   = colors.HexColor('#4a9462')
SEM_WARNING   = colors.HexColor('#9e7e3e')
SEM_ERROR     = colors.HexColor('#884b45')
SEM_INFO      = colors.HexColor('#42668b')

# Code block colors
CODE_BG       = colors.HexColor('#1e2530')
CODE_TEXT     = colors.HexColor('#e6e6e6')
CODE_COMMENT  = colors.HexColor('#7c9bb5')

# ============================================================
# 3. PAGE GEOMETRY
# ============================================================
PAGE_W, PAGE_H = A4
MARGIN_L = 2.0 * cm
MARGIN_R = 2.0 * cm
MARGIN_T = 2.2 * cm
MARGIN_B = 2.0 * cm
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R

# ============================================================
# 4. STYLES
# ============================================================
styles = getSampleStyleSheet()

style_cover_eyebrow = ParagraphStyle(
    'CoverEyebrow', fontName='Head', fontSize=11, textColor=ACCENT,
    alignment=TA_LEFT, leading=14, spaceAfter=4, letterSpacing=2,
)
style_cover_title = ParagraphStyle(
    'CoverTitle', fontName='Head-Bold', fontSize=34, textColor=TEXT_PRIMARY,
    alignment=TA_LEFT, leading=40, spaceAfter=12,
)
style_cover_subtitle = ParagraphStyle(
    'CoverSubtitle', fontName='Head-Bold', fontSize=18, textColor=ACCENT,
    alignment=TA_LEFT, leading=22, spaceAfter=18,
)
style_cover_desc = ParagraphStyle(
    'CoverDesc', fontName='Body', fontSize=12, textColor=TEXT_PRIMARY,
    alignment=TA_LEFT, leading=18, spaceAfter=8,
)
style_cover_meta = ParagraphStyle(
    'CoverMeta', fontName='Head', fontSize=10, textColor=TEXT_MUTED,
    alignment=TA_LEFT, leading=14,
)

style_h1 = ParagraphStyle(
    'H1', fontName='Head-Bold', fontSize=22, textColor=TEXT_PRIMARY,
    leading=28, spaceBefore=18, spaceAfter=10, alignment=TA_LEFT,
)
style_h2 = ParagraphStyle(
    'H2', fontName='Head-Bold', fontSize=15, textColor=ACCENT,
    leading=20, spaceBefore=14, spaceAfter=6, alignment=TA_LEFT,
)
style_h3 = ParagraphStyle(
    'H3', fontName='Head-Bold', fontSize=12, textColor=HEADER_FILL,
    leading=16, spaceBefore=10, spaceAfter=4, alignment=TA_LEFT,
)
style_body = ParagraphStyle(
    'Body', fontName='Body', fontSize=10.5, textColor=TEXT_PRIMARY,
    leading=16, spaceAfter=8, alignment=TA_JUSTIFY,
    firstLineIndent=0,
)
style_body_left = ParagraphStyle(
    'BodyLeft', fontName='Body', fontSize=10.5, textColor=TEXT_PRIMARY,
    leading=16, spaceAfter=8, alignment=TA_LEFT,
)
style_bullet = ParagraphStyle(
    'Bullet', fontName='Body', fontSize=10.5, textColor=TEXT_PRIMARY,
    leading=15, spaceAfter=4, alignment=TA_LEFT, leftIndent=18,
)
style_callout_title = ParagraphStyle(
    'CalloutTitle', fontName='Head-Bold', fontSize=10.5, textColor=colors.white,
    leading=14, alignment=TA_LEFT, spaceAfter=4,
)
style_callout_body = ParagraphStyle(
    'CalloutBody', fontName='Body', fontSize=10, textColor=colors.white,
    leading=14, alignment=TA_LEFT,
)
style_code = ParagraphStyle(
    'Code', fontName='Mono', fontSize=8.5, textColor=CODE_TEXT,
    leading=12, alignment=TA_LEFT, leftIndent=0, rightIndent=0,
    spaceBefore=0, spaceAfter=0,
)
style_caption = ParagraphStyle(
    'Caption', fontName='Body-Italic', fontSize=9, textColor=TEXT_MUTED,
    leading=12, alignment=TA_CENTER, spaceBefore=4, spaceAfter=10,
)
style_table_cell = ParagraphStyle(
    'TableCell', fontName='Body', fontSize=9, textColor=TEXT_PRIMARY,
    leading=12, alignment=TA_LEFT,
)
style_table_header = ParagraphStyle(
    'TableHeader', fontName='Head-Bold', fontSize=9.5, textColor=colors.white,
    leading=12, alignment=TA_LEFT,
)
style_table_mono = ParagraphStyle(
    'TableMono', fontName='Mono', fontSize=8.5, textColor=TEXT_PRIMARY,
    leading=11, alignment=TA_LEFT,
)


# ============================================================
# 5. HELPER BUILDERS
# ============================================================

def P(text, style=None):
    """Shortcut for Paragraph."""
    return Paragraph(text, style or style_body)


def code_block(code_text, caption=None, language_label=None):
    """
    Render a code block with dark background, monospace font.
    Splits long code blocks into multiple chunks to fit page boundaries.
    Each chunk has its own background table (ReportLab Tables with >1 row
    can split across pages, but each chunk ensures clean breaks).
    """
    # Escape XML
    escaped = (code_text
               .replace('&', '&amp;')
               .replace('<', '&lt;')
               .replace('>', '&gt;'))
    # Preserve line breaks: split into Paragraphs per line
    lines = escaped.split('\n')
    # Drop trailing empty
    while lines and lines[-1] == '':
        lines.pop()

    # Convert each line to a Paragraph (preserving leading spaces via &nbsp;)
    line_flowables = []
    for line in lines:
        if line.strip() == '':
            line_flowables.append(Paragraph('&nbsp;', style_code))
        else:
            stripped = line.lstrip(' ')
            indent_count = len(line) - len(stripped)
            indent = '&nbsp;' * indent_count
            line_flowables.append(Paragraph(indent + stripped, style_code))

    # Split into chunks of MAX_LINES_PER_CHUNK to allow page breaks
    MAX_LINES_PER_CHUNK = 38
    chunks = []
    for i in range(0, len(line_flowables), MAX_LINES_PER_CHUNK):
        chunks.append(line_flowables[i:i + MAX_LINES_PER_CHUNK])

    elements = [Spacer(1, 4)]

    for chunk_idx, chunk in enumerate(chunks):
        # Language label only on first chunk
        if chunk_idx == 0 and language_label:
            label_para = Paragraph(
                f'<font name="Mono-Bold" color="#7c9bb5" size="8">{language_label}</font>',
                ParagraphStyle('langLabel', fontName='Mono-Bold', fontSize=8,
                               textColor=CODE_COMMENT, alignment=TA_LEFT, leading=10)
            )
            label_table = Table([[label_para]], colWidths=[CONTENT_W])
            label_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), CODE_BG),
                ('LEFTPADDING', (0, 0), (-1, -1), 10),
                ('RIGHTPADDING', (0, 0), (-1, -1), 10),
                ('TOPPADDING', (0, 0), (-1, -1), 6),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
            ]))
            elements.append(label_table)

        # Build inner table for this chunk
        inner_table = Table(
            [[f] for f in chunk],
            colWidths=[CONTENT_W - 14],
            splitByRow=True,    # allow ReportLab to split if needed
        )
        # Continuation chunks get a top label
        top_pad = 6 if chunk_idx == 0 else 6
        bottom_pad = 6 if chunk_idx == len(chunks) - 1 else 0
        inner_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), CODE_BG),
            ('LEFTPADDING', (0, 0), (-1, -1), 10),
            ('RIGHTPADDING', (0, 0), (-1, -1), 10),
            ('TOPPADDING', (0, 0), (-1, -1), top_pad if chunk_idx == 0 and not language_label else 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), bottom_pad),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))

        # Wrap inner_table to add top padding for continuation chunks
        wrapper = Table([[inner_table]], colWidths=[CONTENT_W])
        wrapper_style = [
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]
        wrapper.setStyle(TableStyle(wrapper_style))
        elements.append(wrapper)

    if caption:
        elements.append(Paragraph(caption, style_caption))
    else:
        elements.append(Spacer(1, 8))
    return elements


def callout(title, body_text, kind='info'):
    """
    Colored callout box for tips / warnings / dangers.
    kind: 'info' (blue), 'success' (green), 'warning' (amber), 'danger' (red)
    """
    color_map = {
        'info':    SEM_INFO,
        'success': SEM_SUCCESS,
        'warning': SEM_WARNING,
        'danger':  SEM_ERROR,
    }
    bg = color_map.get(kind, SEM_INFO)

    inner = Table(
        [[Paragraph(title, style_callout_title)],
         [Paragraph(body_text, style_callout_body)]],
        colWidths=[CONTENT_W - 24],
    )
    inner.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), bg),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (0, 0), 8),
        ('BOTTOMPADDING', (0, 0), (0, 0), 2),
        ('TOPPADDING', (0, 1), (0, 1), 0),
        ('BOTTOMPADDING', (0, 1), (0, 1), 8),
    ]))
    return [Spacer(1, 4), inner, Spacer(1, 8)]


def data_table(header_row, body_rows, col_widths=None, mono_cols=None):
    """
    Render a clean striped table.
    header_row: list of strings
    body_rows: list of list of strings
    col_widths: list of widths in points
    mono_cols: set of column indices to render in monospace
    """
    mono_cols = mono_cols or set()
    if col_widths is None:
        n = len(header_row)
        col_widths = [CONTENT_W / n] * n

    # Build cells
    header_cells = [Paragraph(h, style_table_header) for h in header_row]
    body_cells = []
    for row in body_rows:
        cells = []
        for i, val in enumerate(row):
            style = style_table_mono if i in mono_cols else style_table_cell
            cells.append(Paragraph(str(val), style))
        body_cells.append(cells)

    data = [header_cells] + body_cells
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Head-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.4, BORDER),
    ]
    # Stripe odd rows
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
    t.setStyle(TableStyle(style_cmds))
    return [Spacer(1, 4), t, Spacer(1, 10)]


def bullet_list(items):
    """Render a list of bullet items."""
    flowables = []
    for item in items:
        flowables.append(Paragraph(f'• {item}', style_bullet))
    flowables.append(Spacer(1, 6))
    return flowables


def numbered_list(items):
    """Render a numbered list."""
    flowables = []
    for i, item in enumerate(items, 1):
        flowables.append(Paragraph(f'<b>{i}.</b>&nbsp;&nbsp;{item}', style_bullet))
    flowables.append(Spacer(1, 6))
    return flowables


def hr():
    return HRFlowable(width='100%', thickness=0.5, color=BORDER, spaceBefore=4, spaceAfter=10)


# ============================================================
# 6. COVER PAGE (drawn on canvas via onFirstPage)
# ============================================================

def draw_cover(canv, doc):
    """Draw the cover page directly on the canvas."""
    canv.saveState()

    # Background block (top 40% of page)
    block_h = PAGE_H * 0.42
    canv.setFillColor(COVER_BLOCK)
    canv.rect(0, PAGE_H - block_h, PAGE_W, block_h, fill=1, stroke=0)

    # Accent stripe under the block
    canv.setFillColor(ACCENT)
    canv.rect(0, PAGE_H - block_h - 6, PAGE_W, 6, fill=1, stroke=0)

    # Eyebrow text
    canv.setFillColor(colors.HexColor('#a4c3d2'))
    canv.setFont('Head', 10)
    canv.drawString(MARGIN_L, PAGE_H - 2.5 * cm, 'DOKUMEN INTERNAL — PEMELIHARAAN APLIKASI')

    # Title — split across two lines if needed
    canv.setFillColor(colors.white)
    canv.setFont('Head-Bold', 32)
    canv.drawString(MARGIN_L, PAGE_H - 4.5 * cm, 'Laporan Maintenance')
    canv.setFont('Head-Bold', 32)
    canv.drawString(MARGIN_L, PAGE_H - 6.2 * cm, 'Aplikasi')

    # Subtitle (project name)
    canv.setFillColor(colors.HexColor('#ffd9b3'))
    canv.setFont('Head-Bold', 18)
    canv.drawString(MARGIN_L, PAGE_H - 8.0 * cm, 'hendrikusmuda52-droid')

    # Decorative dots
    canv.setFillColor(colors.HexColor('#a4c3d2'))
    canv.circle(MARGIN_L + 3, PAGE_H - 9.0 * cm, 2, fill=1, stroke=0)
    canv.circle(MARGIN_L + 12, PAGE_H - 9.0 * cm, 2, fill=1, stroke=0)
    canv.circle(MARGIN_L + 21, PAGE_H - 9.0 * cm, 2, fill=1, stroke=0)

    # Description block on white area
    desc_y = PAGE_H - block_h - 2.5 * cm
    canv.setFillColor(TEXT_PRIMARY)
    canv.setFont('Body', 12)
    canv.drawString(MARGIN_L, desc_y, 'Analisis dan Perbaikan Dua Bug Kritis:')

    canv.setFont('Body-Bold', 11)
    canv.setFillColor(ACCENT)
    canv.drawString(MARGIN_L, desc_y - 0.8 * cm, 'Bug #1 — Sinkronisasi Nilai Tugas ke CP & TP')
    canv.drawString(MARGIN_L, desc_y - 1.5 * cm, 'Bug #2 — Tugas SMK (11 DKV & 12 DKV) Tidak Muncul di Dashboard Siswa')

    canv.setFillColor(TEXT_MUTED)
    canv.setFont('Body-Italic', 10)
    canv.drawString(MARGIN_L, desc_y - 2.6 * cm,
                   'Panduan ramah pemula untuk Analisis Akar Masalah, Solusi Database Supabase,')
    canv.drawString(MARGIN_L, desc_y - 3.2 * cm,
                   'Solusi Logika Kode (JavaScript / Supabase-JS), serta Langkah Testing.')

    # Metadata footer at bottom
    foot_y = 2.5 * cm
    canv.setStrokeColor(BORDER)
    canv.setLineWidth(0.5)
    canv.line(MARGIN_L, foot_y + 1.2 * cm, PAGE_W - MARGIN_R, foot_y + 1.2 * cm)

    canv.setFillColor(TEXT_MUTED)
    canv.setFont('Head', 9)
    canv.drawString(MARGIN_L, foot_y + 0.5 * cm, 'Disusun oleh')
    canv.drawString(MARGIN_L + 6 * cm, foot_y + 0.5 * cm, 'Tanggal')
    canv.drawString(MARGIN_L + 12 * cm, foot_y + 0.5 * cm, 'Versi Dokumen')

    canv.setFillColor(TEXT_PRIMARY)
    canv.setFont('Head-Bold', 10)
    canv.drawString(MARGIN_L, foot_y - 0.1 * cm, 'Senior Full-Stack Developer')
    canv.drawString(MARGIN_L + 6 * cm, foot_y - 0.1 * cm, '20 Agustus 2026')
    canv.drawString(MARGIN_L + 12 * cm, foot_y - 0.1 * cm, 'v1.0')

    canv.setFillColor(TEXT_MUTED)
    canv.setFont('Head', 8)
    canv.drawString(MARGIN_L, foot_y - 1.0 * cm,
                   'Stack: Next.js · Vercel · Supabase (PostgreSQL) · Prisma ORM')
    canv.drawString(MARGIN_L, foot_y - 1.5 * cm,
                   'Target pembaca: Pemula (coding) · Bahasa: Indonesia')

    canv.restoreState()


def draw_body_page(canv, doc):
    """Header & footer for body pages."""
    canv.saveState()

    # Top thin rule
    canv.setStrokeColor(BORDER)
    canv.setLineWidth(0.4)
    canv.line(MARGIN_L, PAGE_H - 1.3 * cm, PAGE_W - MARGIN_R, PAGE_H - 1.3 * cm)

    # Header text (left)
    canv.setFillColor(TEXT_MUTED)
    canv.setFont('Head', 8)
    canv.drawString(MARGIN_L, PAGE_H - 1.0 * cm, 'Laporan Maintenance · hendrikusmuda52-droid')

    # Header text (right)
    canv.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 1.0 * cm, 'v1.0 · 20 Agustus 2026')

    # Footer
    page_num = canv.getPageNumber()
    # Page 1 is cover; body pages start at page 2
    if page_num >= 2:
        canv.setStrokeColor(BORDER)
        canv.line(MARGIN_L, 1.3 * cm, PAGE_W - MARGIN_R, 1.3 * cm)
        canv.setFillColor(TEXT_MUTED)
        canv.setFont('Head', 8)
        canv.drawString(MARGIN_L, 0.9 * cm, 'hendrikusmuda52-droid · Maintenance Report')
        canv.drawRightString(PAGE_W - MARGIN_R, 0.9 * cm, f'Halaman {page_num - 1}')

    canv.restoreState()


# ============================================================
# 7. CONTENT — STORY BUILDERS
# ============================================================

def build_section_2_ringkasan():
    """Section: Ringkasan Eksekutif"""
    s = []
    s.append(P('Ringkasan Eksekutif', style_h1))
    s.append(P(
        'Dokumen ini menganalisis dua bug kritis yang ditemukan pada aplikasi web program digitalisasi sekolah '
        '<b>hendrikusmuda52-droid</b>, sebuah proyek yang dibangun di atas stack Next.js, di-hosting di Vercel, '
        'dan menggunakan Supabase (PostgreSQL) sebagai database bersama Prisma ORM sebagai lapisan akses data. '
        'Aplikasi ini dipakai untuk mengajar siswa tingkat SMP dan SMK, dengan fokus khusus pada dua kelas SMK '
        'yaitu <b>11 DKV</b> dan <b>12 DKV</b>. Kedua bug yang dibahas berdampak langsung pada pengalaman guru '
        'saat memberikan penilaian, serta pada pengalaman siswa SMK saat mencoba mengakses tugas yang sudah '
        'diberikan kepada mereka.'
    ))
    s.append(P(
        'Bug pertama adalah ketidaksinkronan antara nilai tugas siswa dengan Capaian Pembelajaran (CP) dan Tujuan '
        'Pembelajaran (TP) yang seharusnya terikat pada tugas tersebut. Akibatnya, ketika guru mengekspor nilai '
        'per CP untuk lapor-eRapor, hasilnya selalu kosong. Bug kedua adalah tugas yang dibuat guru untuk kelas '
        '11 DKV atau 12 DKV tidak muncul di dashboard siswa yang bersangkutan, meskipun di sisi guru tugas '
        'tersebut tercatat sudah aktif. Siswa SMK jadi seolah-olah tidak memiliki tugas sama sekali.'
    ))
    s.append(P(
        'Setelah dilakukan investigasi mendalam terhadap kode sumber dan skema database, ditemukan bahwa kedua '
        'bug ini bukanlah masalah kompleks pada logika bisnis, melainkan <b>kesalahan pada lapisan transfer data</b> '
        'antara frontend dan backend. Bug pertama disebabkan oleh handler API yang menerima field cpId/tpId dari '
        'frontend tetapi tidak menyimpannya ke database. Bug kedua disebabkan oleh perbandingan string kelas yang '
        'case-sensitive tanpa normalisasi, sehingga "11 DKV" (dengan spasi) tidak cocok dengan "11DKV" (tanpa spasi).'
    ))
    s.append(P(
        'Laporan ini menyediakan tiga lapis solusi: (1) perbaikan skema database Supabase via SQL untuk '
        'menormalkan data lama dan menambah index, (2) perbaikan kode JavaScript/TypeScript pada lima file API '
        'route yang bermasalah dengan contoh kode before/after, dan (3) panduan testing manual serta checklist '
        'pencegahan agar bug serupa tidak terulang. Semua solusi disusun dengan bahasa yang ramah pemula dan '
        'dapat diikuti tanpa perlu pengalaman coding sebelumnya.'
    ))

    # Quick summary table
    s.append(P('Ringkasan Dua Bug dalam Sekejap', style_h3))
    s.extend(data_table(
        header_row=['Aspek', 'Bug #1: Nilai ke CP/TP', 'Bug #2: Tugas SMK Tidak Muncul'],
        body_rows=[
            ['Lokasi utama',
             'API /api/manual-grades dan /api/result',
             'API /api/student/assignments'],
            ['Akar masalah',
             'Field cpId/tpId di-drop saat insert ke DB',
             'Filter string kelas case-sensitive tanpa normalisasi'],
            ['Dampak pengguna',
             'Export nilai per CP selalu kosong',
             'Siswa 11 DKV / 12 DKV tidak melihat tugas'],
            ['Tingkat kerumitan',
             'Sedang (5 file perlu di-patch)',
             'Rendah (1 file utama + 1 helper)'],
            ['Estimasi waktu fix',
             '30–45 menit',
             '20–30 menit'],
            ['Risiko regresi',
             'Rendah (field baru, tidak overwrite data lama)',
             'Sangat rendah (hanya menambah normalisasi)'],
        ],
        col_widths=[3.5 * cm, 6.5 * cm, 6.5 * cm],
    ))
    return s


def build_section_3_konteks():
    """Section: Konteks Aplikasi"""
    s = []
    s.append(P('Konteks Aplikasi', style_h1))
    s.append(P('3.1 Stack Teknologi yang Digunakan', style_h2))
    s.append(P(
        'Aplikasi <b>hendrikusmuda52-droid</b> dibangun dengan stack modern yang umum dipakai untuk membangun '
        'aplikasi web full-stack dengan kecepatan tinggi. Pemahaman tentang stack ini penting karena setiap '
        'komponen memiliki peran berbeda dalam alur data, dan bug yang akan dianalisis berakar pada interaksi '
        'antara komponen-komponen tersebut. Berikut adalah daftar komponen utama dan perannya:'
    ))
    s.extend(data_table(
        header_row=['Komponen', 'Teknologi', 'Peran dalam Aplikasi'],
        body_rows=[
            ['Frontend', 'Next.js (React)', 'Halaman dashboard guru & siswa, form input nilai & tugas'],
            ['Hosting Frontend', 'Vercel', 'Men-deploy aplikasi Next.js secara otomatis dari Git'],
            ['Database', 'Supabase (PostgreSQL)', 'Menyimpan semua data: siswa, guru, tugas, nilai, CP, TP'],
            ['ORM', 'Prisma', 'Lapisan akses data yang menerjemahkan kode JS menjadi query SQL'],
            ['Auth', 'JWT + Cookie', 'Login guru & siswa, session disimpan di cookie HTTP-only'],
            ['Bahasa', 'TypeScript', 'Superset JavaScript dengan tipe data statis untuk mencegah bug'],
        ],
        col_widths=[3.0 * cm, 4.0 * cm, 9.5 * cm],
    ))

    s.append(P('3.2 Struktur Tabel Utama di Database', style_h2))
    s.append(P(
        'Berikut adalah enam tabel utama yang relevan dengan kedua bug. Memahami relasi antar tabel adalah kunci '
        'untuk memahami mengapa bug bisa terjadi. Tabel-tabel ini didefinisikan di file '
        '<font name="Mono" size="9">prisma/schema.prisma</font> dan diterjemahkan oleh Prisma menjadi skema '
        'PostgreSQL di Supabase.'
    ))
    s.extend(data_table(
        header_row=['Tabel', 'Peran', 'Field Relevan untuk Bug'],
        body_rows=[
            ['Student', 'Data siswa SMP & SMK',
             'id, namaLengkap, nisn, kelas, jenjang, sekolah'],
            ['Assignment', 'Tugas/materi dari guru',
             'id, title, targetKelas, targetJenjang, cpId, tpId, tahunAjaran, semester'],
            ['CapaianPembelajaran', 'CP (parent)',
             'id, kodeCP, deskripsi, gradeLevel'],
            ['TujuanPembelajaran', 'TP (child of CP)',
             'id, cpId, kodeTP, deskripsi'],
            ['ManualGrade', 'Nilai manual dari guru',
             'id, studentId, score, cpId, tpId, gradeCategory, tahunAjaran, semester'],
            ['Result', 'Nilai otomatis dari quiz/typing',
             'id, studentId, assignmentId, totalScore, cpId, tpId, tahunAjaran, semester'],
        ],
        col_widths=[3.5 * cm, 4.0 * cm, 9.0 * cm],
        mono_cols=set(),
    ))

    s.append(P('3.3 Relasi Ideal antar Tabel', style_h2))
    s.append(P(
        'Hubungan ideal yang seharusnya terjadi adalah: setiap <b>Assignment</b> terhubung ke satu <b>CP</b> dan '
        'satu <b>TP</b> (bisa kosong jika guru belum memilih). Ketika siswa mengerjakan tugas, sistem membuat '
        'record <b>Result</b> yang seharusnya juga membawa cpId/tpId yang sama dengan Assignment. Untuk nilai '
        'manual yang diinput guru melalui grade-book, record <b>ManualGrade</b> juga seharusnya membawa cpId/tpId '
        'yang dipilih guru di form. Dengan struktur ini, ketika guru mengekspor nilai per CP, sistem cukup '
        'memfilter <font name="Mono" size="9">WHERE cpId = ?</font> pada tabel Result dan ManualGrade.'
    ))
    s.append(P(
        'Untuk kelas SMK, konstanta yang dipakai di seluruh aplikasi adalah <font name="Mono" size="9">11DKV</font> '
        'dan <font name="Mono" size="9">12DKV</font> (tanpa spasi, huruf kapital semua). Konstanta ini didefinisikan '
        'di file <font name="Mono" size="9">src/lib/constants.ts</font> pada array <font name="Mono" size="9">ALL_GRADES</font>. '
        'Namun, beberapa jalur input (terutama self-registration siswa dan API langsung) tidak melakukan sanitasi, '
        'sehingga bisa menyimpan nilai seperti "11 DKV" (dengan spasi), "11dkv" (huruf kecil), atau " 11DKV " '
        '(dengan spasi di awal/akhir). Inilah akar masalah Bug #2.'
    ))
    return s


def build_section_4_bug1():
    """Section: Bug #1 Analysis"""
    s = []
    s.append(P('Analisis Akar Masalah — Bug #1: Sinkronisasi Nilai ke CP/TP', style_h1))

    s.append(P('4.1 Gejala yang Diamati', style_h2))
    s.append(P(
        'Guru membuat tugas dengan memilih CP dan TP tertentu. Siswa mengerjakan tugas, sistem otomatis menyimpan '
        'nilai ke tabel Result. Selain itu, guru juga bisa menginput nilai manual melalui grade-book, yang disimpan '
        'ke tabel ManualGrade. Namun ketika guru membuka menu Export Nilai per CP (untuk lapor-eRapor), hasilnya '
        'selalu kosong. Padahal di database, record nilai tersebut ada — hanya saja kolom cpId dan tpId-nya NULL.'
    ))

    s.append(P('4.2 Alur Data yang Diharapkan vs Aktual', style_h2))
    s.append(P(
        'Mari kita telusuri alur data dari frontend hingga backend. Pada frontend, komponen '
        '<font name="Mono" size="9">grade-book.tsx</font> sudah mengirim field cpId/tpId dengan benar. Berikut '
        'adalah kode frontend yang sudah benar (untuk konfirmasi bahwa masalahnya bukan di frontend):'
    ))

    frontend_code = """// File: src/components/teacher/grade-book.tsx (baris 204-245)
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
})"""
    s.extend(code_block(frontend_code, language_label='TypeScript · grade-book.tsx'))

    s.append(P(
        'Sampai di sini, data sudah benar. Frontend mengirim cpId, tpId, tahunAjaran, semester, dan gradeCategory. '
        'Masalah muncul di sisi backend. Mari kita lihat handler API yang menerima request ini:'
    ))

    backend_code = """// File: src/app/api/manual-grades/route.ts (baris 79-135)
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
)"""
    s.extend(code_block(backend_code, language_label='TypeScript · /api/manual-grades/route.ts'))

    s.append(P(
        'Inilah akar masalahnya. Frontend sudah mengirim data lengkap, tetapi backend <b>hanya membaca sebagian '
        'field</b> dan mengabaikan cpId, tpId, tahunAjaran, semester, serta gradeCategory. Akibatnya, record '
        'ManualGrade yang tersimpan ke database selalu memiliki cpId = NULL dan tpId = NULL. Skema database '
        'memang menyediakan kolom ini, tetapi kode tidak mengisinya.'
    ))

    s.append(P('4.3 Bug yang Sama pada Auto-Result (Quiz/Typing)', style_h2))
    s.append(P(
        'Bug serupa juga terjadi pada endpoint <font name="Mono" size="9">/api/result/route.ts</font> yang menerima '
        'nilai otomatis dari quiz, typing, drawing, dan game. Frontend hanya mengirim <font name="Mono" size="9">'
        'assignmentId</font> tanpa cpId/tpId, dengan harapan backend akan lookup ke tabel Assignment untuk mengambil '
        'cpId/tpId tersebut. Sayangnya, backend tidak melakukan lookup ini sama sekali.'
    ))

    result_code = """// File: src/app/api/result/route.ts (baris 7-51)
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
})"""
    s.extend(code_block(result_code, language_label='TypeScript · /api/result/route.ts'))

    s.append(P('4.4 Dampak Berantai pada Export', style_h2))
    s.append(P(
        'Karena cpId/tpId selalu NULL di tabel Result dan ManualGrade, ketika guru membuka menu Export Nilai per '
        'CP, kode berikut tidak pernah menemukan data yang cocok:'
    ))

    export_code = """// File: src/app/api/grades/export/route.ts (baris 64-103)
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
}"""
    s.extend(code_block(export_code, language_label='TypeScript · /api/grades/export/route.ts'))

    s.extend(callout(
        'Kesimpulan Bug #1',
        'Bukan skema database yang salah — kolom cpId/tpId sudah ada. Bukan frontend yang salah — data sudah '
        'dikirim. Yang salah adalah <b>handler API tidak membaca field yang dikirim frontend dan tidak menyimpannya '
        'ke database</b>. Fix-nya bersifat additive (menambahkan field yang hilang), bukan destructive, jadi tidak '
        'akan menghapus data lama.',
        kind='info'
    ))
    return s


def build_section_5_bug2():
    """Section: Bug #2 Analysis"""
    s = []
    s.append(P('Analisis Akar Masalah — Bug #2: Tugas SMK Tidak Muncul', style_h1))

    s.append(P('5.1 Gejala yang Diamati', style_h2))
    s.append(P(
        'Guru membuat tugas melalui menu Assignment Manager, memilih target kelas "11 DKV" dari dropdown. Tugas '
        'tersimpan ke database dengan status isActive = true. Namun ketika siswa kelas 11 DKV login ke dashboard '
        'mereka, tugas tersebut tidak muncul sama sekali. Hanya tugas untuk kelas "ALL" yang muncul. Siswa SMP '
        '(kelas 7A, 8B, dll) tidak mengalami masalah ini — hanya siswa SMK yang terdampak.'
    ))

    s.append(P('5.2 Lokasi Bug: Filter Assignment di Student API', style_h2))
    s.append(P(
        'Endpoint <font name="Mono" size="9">/api/student/assignments/route.ts</font> bertugas mengambil semua '
        'assignment aktif untuk subject tertentu, lalu memfilter berdasarkan kelas siswa. Inilah kode yang bermasalah:'
    ))

    filter_code = """// File: src/app/api/student/assignments/route.ts (baris 16-26)
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
})"""
    s.extend(code_block(filter_code, language_label='TypeScript · /api/student/assignments/route.ts'))

    s.append(P('5.3 Mengapa Siswa SMK Lebih Sering Terdampak?', style_h2))
    s.append(P(
        'Pertanyaan yang wajar: mengapa bug ini hanya muncul untuk SMK, padahal kelas SMP juga memakai string '
        'seperti "7A", "8B"? Jawabannya adalah pada <b>jalur input data siswa</b>. Aplikasi memiliki tiga jalur '
        'untuk membuat record siswa, dan hanya satu yang melakukan sanitasi:'
    ))

    s.extend(data_table(
        header_row=['Jalur Input', 'File API', 'Sanitasi kelas?', 'Sumber String'],
        body_rows=[
            ['Bulk Import (Excel)',
             '/api/teacher/students/import/route.ts',
             'YA — fungsi sanitizeKelas()',
             'File Excel yang diupload guru'],
            ['Manual Create (Form)',
             '/api/teacher/students/route.ts',
             'TIDAK — kelas disimpan apa adanya',
             'Form Select dengan pilihan fixed'],
            ['Update Siswa',
             '/api/teacher/students/[id]/route.ts',
             'TIDAK — kelas disimpan apa adanya',
             'Form Select dengan pilihan fixed'],
            ['Self-Register Siswa',
             '/api/student/route.ts',
             'TIDAK — kelas bebas input text',
             'Input text siswa (bisa apa saja!)'],
        ],
        col_widths=[3.5 * cm, 5.5 * cm, 3.5 * cm, 4.0 * cm],
    ))

    s.append(P(
        'Untuk siswa SMP, form Select selalu menghasilkan nilai yang sudah benar ("7A", "8B", dll) karena pilihan '
        'fixed. Tapi untuk siswa SMK, seringkali data siswa dimasukkan via self-register atau import manual dengan '
        'format yang tidak konsisten. Berikut adalah fungsi sanitasi yang HANYA ada di file import:'
    ))

    sanitize_code = """// File: src/app/api/teacher/students/import/route.ts (baris 24-26)
// Fungsi ini HANYA dipakai di import, belum dipakai di tempat lain

function sanitizeKelas(raw: string): string {
  return raw.trim().toUpperCase().replace(/\\s+/g, '')
  // "11 DKV"   -> "11DKV"   (hapus spasi)
  // " 11dkv "  -> "11DKV"   (trim + uppercase)
  // "11  DKV"  -> "11DKV"   (hapus multi spasi)
}"""
    s.extend(code_block(sanitize_code, language_label='TypeScript · import/route.ts'))

    s.append(P('5.4 Ilustrasi String Mismatch', style_h2))
    s.append(P(
        'Untuk membuat masalah ini lebih konkret, berikut adalah tabel yang menunjukkan bagaimana berbagai variasi '
        'input string "kelas" tidak akan cocok saat dilakukan perbandingan <font name="Mono" size="9">.includes()</font> '
        'tanpa normalisasi. Inilah mengapa beberapa siswa SMK bisa melihat tugas (jika kebetulan formatnya pas), '
        'sementara siswa lain tidak.'
    ))

    s.extend(data_table(
        header_row=['Nilai di DB Siswa', 'Nilai di Assignment', 'Hasil .includes()', 'Siswa Lihat Tugas?'],
        body_rows=[
            ['"11DKV"',  '"11DKV"',  'true',  'YA'],
            ['"11 DKV"', '"11DKV"',  'false', 'TIDAK'],
            ['"11dkv"',  '"11DKV"',  'false', 'TIDAK'],
            ['" 11DKV "', '"11DKV"', 'false', 'TIDAK'],
            ['"11  DKV"', '"11DKV"', 'false', 'TIDAK'],
            ['"11DKV"',  '"ALL"',    'true',  'YA (lewat cabang ALL)'],
        ],
        col_widths=[4.0 * cm, 4.0 * cm, 3.5 * cm, 5.0 * cm],
        mono_cols={0, 1},
    ))

    s.append(P('5.5 Bug Tambahan: Field targetJenjang yang Tak Pernah Dipakai', style_h2))
    s.append(P(
        'Hasil investigasi tambahan: skema Prisma memiliki field <font name="Mono" size="9">targetJenjang</font> '
        'di tabel Assignment dan Material (default "ALL"). Field ini seharusnya bisa dipakai sebagai filter '
        'kedua setelah kelas — misalnya "ALL kelas SMK" atau "ALL kelas SMP". Namun, setelah pencarian di seluruh '
        'folder <font name="Mono" size="9">src/</font>, field ini tidak pernah di-set atau di-query di mana pun. '
        'Ini bukan penyebab langsung Bug #2, tetapi merupakan "dead code" yang menyesatkan developer masa depan. '
        'Rekomendasi: biarkan saja (karena filter berdasarkan kelas sudah cukup), tapi tambahkan komentar di skema '
        'bahwa field ini reserved untuk future use.'
    ))

    s.extend(callout(
        'Kesimpulan Bug #2',
        'Akar masalahnya adalah <b>ketidakkonsistenan format string kelas</b> antara data siswa dan data assignment. '
        'Konstanta resmi di <font name="Mono" size="9">src/lib/constants.ts</font> adalah "11DKV" (tanpa spasi), '
        'tapi beberapa jalur input tidak memakai konstanta tersebut. Fix-nya ada di dua tempat: (1) lakukan '
        'normalisasi di kedua sisi saat perbandingan, (2) sanitasi semua jalur input siswa agar selalu konsisten.',
        kind='warning'
    ))
    return s


def build_section_6_solusi_db():
    """Section: Solusi Database Supabase"""
    s = []
    s.append(P('Solusi Database Supabase', style_h1))

    s.append(P('6.1 Mengapa Perlu Memperbaiki Database?', style_h2))
    s.append(P(
        'Sebelum mengubah kode, ada baiknya kita membersihkan data lama di Supabase terlebih dahulu. Tujuannya '
        'adalah: (1) menormalkan string kelas yang sudah ada di tabel Student agar semua menggunakan format "11DKV" '
        '(tanpa spasi), (2) backfill cpId/tpId untuk record Result lama yang sebenarnya punya Assignment tapi cpId-nya '
        'NULL, dan (3) menambah index untuk mempercepat query export nilai per CP. Langkah ini bersifat opsional '
        'tetapi sangat dianjurkan agar laporan export masa lalu juga bisa muncul setelah fix kode diterapkan.'
    ))

    s.append(P('6.2 Cara Mengakses Supabase SQL Editor', style_h2))
    s.extend(numbered_list([
        'Buka <b>https://supabase.com</b> dan login dengan akun proyek hendrikusmuda52-droid.',
        'Pilih project yang benar dari dropdown di pojok kiri atas dashboard.',
        'Di sidebar kiri, klik menu <b>SQL Editor</b> (ikon database dengan tanda panah).',
        'Klik tombol <b>New query</b> di pojok kanan atas.',
        'Salin salah satu blok SQL di bawah ini, paste ke editor, lalu klik <b>Run</b> (tombol hijau play).',
        'Tunggu sampai muncul pesan "Success. No rows returned" — itu artinya query berhasil dijalankan.',
    ]))

    s.append(P('6.3 SQL #1: Normalisasi String Kelas di Tabel Student', style_h2))
    s.append(P(
        'Query ini akan mengubah semua variasi penulisan kelas menjadi format konsisten: huruf kapital semua, '
        'tanpa spasi di awal/akhir, dan tanpa spasi di tengah. Aman dijalankan berulang kali (idempotent).'
    ))

    sql_1 = """-- SQL #1: Normalisasi kolom kelas pada tabel Student
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
ORDER BY kelas;"""
    s.extend(code_block(sql_1, language_label='SQL · Supabase SQL Editor'))

    s.append(P('6.4 SQL #2: Backfill cpId/tpId pada Tabel Result dari Assignment', style_h2))
    s.append(P(
        'Query ini akan mengisi cpId dan tpId pada record Result yang masih NULL, dengan cara mengambil nilai dari '
        'tabel Assignment yang terhubung via assignmentId. Hanya record yang memiliki assignmentId dan assignment-nya '
        'memiliki cpId yang akan di-update. Data yang tidak punya assignment (legacy) akan tetap NULL.'
    ))

    sql_2 = """-- SQL #2: Backfill cpId, tpId, tahunAjaran, semester pada tabel Result
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
FROM "Result";"""
    s.extend(code_block(sql_2, language_label='SQL · Supabase SQL Editor'))

    s.append(P('6.5 SQL #3: Verifikasi Foreign Key antar Tabel', style_h2))
    s.append(P(
        'Skema Prisma sebenarnya sudah membuat foreign key antara TujuanPembelajaran.cpId → CapaianPembelajaran.id '
        'secara otomatis. Namun, field cpId/tpId di tabel Result, ManualGrade, dan Assignment <b>tidak memiliki '
        'foreign key constraint</b> karena didefinisikan sebagai String biasa, bukan relation Prisma. Ini bukan '
        'bug — ini adalah pilihan desain agar field boleh NULL. Verifikasi struktur berikut untuk memastikan tidak '
        'ada constraint yang rusak:'
    ))

    sql_3 = """-- SQL #3: Cek semua foreign key constraint yang ada di database
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
ORDER BY tc.table_name, kcu.column_name;"""
    s.extend(code_block(sql_3, language_label='SQL · Supabase SQL Editor'))

    s.append(P('6.6 SQL #4: Tambah Index untuk Mempercepat Query Export', style_h2))
    s.append(P(
        'Setelah backfill selesai, query export nilai per CP akan sering memfilter <font name="Mono" size="9">'
        'WHERE cpId = ?</font> pada tabel Result dan ManualGrade. Tanpa index, query ini akan melakukan sequential '
        'scan yang lambat ketika data sudah mencapai ribuan record. Tambahkan index berikut (jika belum ada):'
    ))

    sql_4 = """-- SQL #4: Tambah index pada kolom cpId & tpId di Result & ManualGrade
-- Cek dulu apakah index sudah ada, lalu buat jika belum.

CREATE INDEX IF NOT EXISTS idx_result_cpid
  ON "Result" ("cpId")
  WHERE "cpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_result_tpid
  ON "Result" ("tpId")
  WHERE "tpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_manualgrade_cpid
  ON "ManualGrade" ("cpId")
  WHERE "cpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_manualgrade_tpid
  ON "ManualGrade" ("tpId")
  WHERE "tpId" IS NOT NULL;

-- Index gabungan untuk filter export (cpId + tahunAjaran + semester)
CREATE INDEX IF NOT EXISTS idx_result_cp_tahun_semester
  ON "Result" ("cpId", "tahunAjaran", "semester")
  WHERE "cpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_manualgrade_cp_tahun_semester
  ON "ManualGrade" ("cpId", "tahunAjaran", "semester")
  WHERE "cpId" IS NOT NULL;"""
    s.extend(code_block(sql_4, language_label='SQL · Supabase SQL Editor'))

    s.extend(callout(
        'Catatan Penting sebelum Menjalankan SQL',
        'Selalu backup database sebelum menjalankan UPDATE massal. Di Supabase, buka menu <b>Database → Backups</b> '
        'lalu klik <b>Create a backup</b>. Jika terjadi kesalahan, Anda bisa restore ke titik sebelum perubahan. '
        'Untuk proyek free tier Supabase, backup manual via <font name="Mono" size="9">pg_dump</font> juga bisa '
        'dilakukan dari terminal lokal.',
        kind='warning'
    ))
    return s


def build_section_7_solusi_kode():
    """Section: Solusi Logika Kode"""
    s = []
    s.append(P('Solusi Logika Kode', style_h1))
    s.append(P(
        'Bagian ini berisi lima patch kode yang perlu diterapkan. Setiap patch disertai dengan penjelasan, kode '
        '<b>before</b> (sebelum) dan <b>after</b> (sesudah), serta lokasi file yang tepat. Untuk pemula: '
        'buka file di editor (VS Code), cari baris yang ditunjukkan, lalu ganti blok kode tersebut. Setelah '
        'selesai, simpan file dan deploy ulang ke Vercel.'
    ))

    # ===== PATCH 1 =====
    s.append(P('7.1 Patch #1: Perbaiki /api/manual-grades/route.ts (Single Path)', style_h2))
    s.append(P(
        'Pada path single-grade (POST biasa, bukan bulk), kita perlu menambahkan field cpId, tpId, tahunAjaran, '
        'semester, gradeCategory, dan isOverride ke destructuring body dan ke data yang dikirim ke Prisma.'
    ))

    p1_before = """// BEFORE — /api/manual-grades/route.ts (sekitar baris 137-171)
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
})"""

    p1_after = """// AFTER — /api/manual-grades/route.ts (single path)
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
})"""
    s.extend(code_block(p1_before, language_label='TypeScript · BEFORE'))
    s.extend(code_block(p1_after, language_label='TypeScript · AFTER'))

    # ===== PATCH 2 =====
    s.append(P('7.2 Patch #2: Perbaiki /api/manual-grades/route.ts (Bulk Path)', style_h2))
    s.append(P(
        'Pada bulk path (path yang menerima array grades), kita perlu melakukan hal serupa: membaca field v2 dari '
        'setiap item di array, lalu meneruskannya ke <font name="Mono" size="9">db.manualGrade.create()</font>.'
    ))

    p2_before = """// BEFORE — /api/manual-grades/route.ts bulk path (sekitar baris 79-135)
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
)"""

    p2_after = """// AFTER — /api/manual-grades/route.ts bulk path
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
)"""
    s.extend(code_block(p2_before, language_label='TypeScript · BEFORE'))
    s.extend(code_block(p2_after, language_label='TypeScript · AFTER'))

    # ===== PATCH 3 =====
    s.append(P('7.3 Patch #3: /api/result/route.ts — Inherit cpId/tpId dari Assignment', style_h2))
    s.append(P(
        'Pada endpoint ini, frontend hanya mengirim assignmentId. Backend harus melakukan lookup ke tabel '
        'Assignment untuk mendapatkan cpId, tpId, tahunAjaran, dan semester yang terkait, lalu menyimpannya '
        'ke record Result. Jika assignmentId tidak ada (legacy), gunakan nilai default dari body atau schema.'
    ))

    p3_after = """// AFTER — /api/result/route.ts (sekitar baris 7-51)
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
})"""
    s.extend(code_block(p3_after, language_label='TypeScript · AFTER · /api/result/route.ts'))

    # ===== PATCH 4 =====
    s.append(P('7.4 Patch #4: Buat Helper normalizeKelas di src/lib/kelas.ts', style_h2))
    s.append(P(
        'Buat file baru <font name="Mono" size="9">src/lib/kelas.ts</font> yang berisi helper untuk normalisasi '
        'string kelas. Helper ini akan dipakai di banyak tempat agar logika normalisasi terpusat di satu file '
        'saja (DRY principle — Don\'t Repeat Yourself).'
    ))

    p4_code = """// File: src/lib/kelas.ts (FILE BARU)
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
}"""
    s.extend(code_block(p4_code, language_label='TypeScript · src/lib/kelas.ts (NEW)'))

    # ===== PATCH 5 =====
    s.append(P('7.5 Patch #5: Pakai Helper di /api/student/assignments/route.ts', style_h2))
    s.append(P(
        'Setelah helper dibuat, ganti logika filter di endpoint student/assignments dengan pemanggilan helper '
        'tersebut. Ini menghapus bug string mismatch sekaligus membuat kode lebih bersih.'
    ))

    p5_before = """// BEFORE — /api/student/assignments/route.ts (baris 16-26)
const allActive = await db.assignment.findMany({
  where: { isActive: true, subject },
  orderBy: { createdAt: 'desc' },
})

const studentKelas = session.kelas
const assignments = allActive.filter((a) => {
  if (a.targetKelas === 'ALL') return true
  const kelasList = a.targetKelas.split(',').map((k) => k.trim())
  return kelasList.includes(studentKelas)   // BUG: case-sensitive
})"""

    p5_after = """// AFTER — /api/student/assignments/route.ts
import { isKelasMatch } from '@/lib/kelas'

const allActive = await db.assignment.findMany({
  where: { isActive: true, subject },
  orderBy: { createdAt: 'desc' },
})

const studentKelas = session.kelas
const assignments = allActive.filter((a) =>
  isKelasMatch(studentKelas, a.targetKelas)
)"""
    s.extend(code_block(p5_before, language_label='TypeScript · BEFORE'))
    s.extend(code_block(p5_after, language_label='TypeScript · AFTER'))

    # ===== PATCH 6 =====
    s.append(P('7.6 Patch #6: Sanitasi Write Paths di Student API', style_h2))
    s.append(P(
        'Untuk mencegah data kelas kotor masuk lagi di masa depan, terapkan sanitasi pada tiga write paths: '
        '(a) <font name="Mono" size="9">/api/teacher/students/route.ts</font> POST, '
        '(b) <font name="Mono" size="9">/api/teacher/students/[id]/route.ts</font> PUT, dan '
        '(c) <font name="Mono" size="9">/api/student/route.ts</font> POST (self-register).'
    ))

    p6_code = """// Patch yang sama diterapkan di 3 file berbeda:

// File 1: src/app/api/teacher/students/route.ts (POST handler)
// File 2: src/app/api/teacher/students/[id]/route.ts (PUT handler)
// File 3: src/app/api/student/route.ts (POST self-register)

import { normalizeKelas } from '@/lib/kelas'

// Di bagian destructuring body, setelah `const { ... } = body`:
const rawKelas = (body as { kelas?: string }).kelas || ''
const kelas = normalizeKelas(rawKelas)

// Validasi (opsional tapi dianjurkan):
import { ALL_GRADES } from '@/lib/constants'
if (!ALL_GRADES.includes(kelas as any)) {
  return NextResponse.json(
    { error: `Kelas tidak valid: "${rawKelas}". ` +
              `Yang valid: ${ALL_GRADES.join(', ')}` },
    { status: 400 }
  )
}

// Lalu pakai `kelas` (yang sudah dinormalisasi) saat:
//   db.student.create({ data: { ..., kelas, ... } })
//   db.student.update({ data: { ..., kelas, ... } })

// Catatan: pastikan `kelas` juga disimpan ke field `jenjang`:
import { getJenjang } from '@/lib/constants'
const jenjang = getJenjang(kelas)   // "SMK" untuk "11DKV", "SMP" untuk "7A"
// Lalu: db.student.create({ data: { ..., kelas, jenjang, ... } })"""
    s.extend(code_block(p6_code, language_label='TypeScript · 3 files'))

    s.extend(callout(
        'Urutan Penerapan Patch',
        'Untuk meminimalkan risiko deploy setengah jalan, terapkan patch dengan urutan berikut: '
        '(1) Buat helper <font name="Mono" size="9">src/lib/kelas.ts</font> terlebih dahulu karena patch lain '
        'bergantung padanya. (2) Patch tiga write paths student (agar data baru yang masuk sudah bersih). '
        '(3) Jalankan SQL #1 untuk membersihkan data lama. (4) Patch /api/student/assignments untuk filter. '
        '(5) Patch /api/manual-grades dan /api/result untuk CP/TP. (6) Jalankan SQL #2 untuk backfill.',
        kind='success'
    ))
    return s


def build_section_8_testing():
    """Section: Testing"""
    s = []
    s.append(P('Panduan Testing & Verifikasi', style_h1))
    s.append(P(
        'Setelah semua patch diterapkan dan deploy ke Vercel, lakukan testing manual berikut untuk memastikan '
        'kedua bug sudah teratasi. Testing dilakukan dari sudut pandang guru (di dashboard guru) dan siswa '
        '(di dashboard siswa). Catat hasilnya di kolom "Status" untuk dokumentasi internal.'
    ))

    s.append(P('8.1 Test Scenario untuk Bug #1 (Sinkronisasi CP/TP)', style_h2))
    s.extend(data_table(
        header_row=['#', 'Langkah Testing', 'Expected Result', 'Status'],
        body_rows=[
            ['T1', 'Login sebagai guru, buka Grade Book, pilih satu siswa, klik "Tambah Nilai".',
             'Form muncul dengan dropdown CP dan TP terisi.', '[ ] Pass / [ ] Fail'],
            ['T2', 'Pilih CP tertentu (mis: CP.1) dan TP tertentu (mis: TP.1.1), input nilai 85, simpan.',
             'Nilai tersimpan, tidak ada error.', '[ ] Pass / [ ] Fail'],
            ['T3', 'Buka Supabase Table Editor → ManualGrade, cari record baru.',
             'Kolom cpId dan tpId TERISI (tidak NULL).', '[ ] Pass / [ ] Fail'],
            ['T4', 'Buka menu Export Nilai, pilih format "per CP", pilih CP.1, export.',
             'File Excel ter-download, berisi nilai yang baru diinput.', '[ ] Pass / [ ] Fail'],
            ['T5', 'Login sebagai siswa, kerjakan tugas quiz yang punya CP/TP.',
             'Setelah selesai, cek tabel Result di Supabase — cpId TERISI.', '[ ] Pass / [ ] Fail'],
            ['T6', 'Buka menu Export Nilai, pilih format "all CP".',
             'Semua CP yang punya nilai muncul, bukan hanya CP.1.', '[ ] Pass / [ ] Fail'],
        ],
        col_widths=[1.0 * cm, 6.5 * cm, 6.0 * cm, 3.0 * cm],
    ))

    s.append(P('8.2 Test Scenario untuk Bug #2 (Tugas SMK)', style_h2))
    s.extend(data_table(
        header_row=['#', 'Langkah Testing', 'Expected Result', 'Status'],
        body_rows=[
            ['T7', 'Login sebagai guru, buka Assignment Manager, klik "Buat Tugas".',
             'Form muncul dengan dropdown kelas.', '[ ] Pass / [ ] Fail'],
            ['T8', 'Pilih target kelas "11 DKV", buat tugas baru, simpan.',
             'Tugas tersimpan dengan targetKelas = "11DKV".', '[ ] Pass / [ ] Fail'],
            ['T9', 'Buka Supabase Table Editor → Student, cari siswa kelas 11 DKV. '
             'Periksa field kelas — pastikan formatnya "11DKV" (tanpa spasi).',
             'Semua siswa SMK punya format kelas konsisten.', '[ ] Pass / [ ] Fail'],
            ['T10', 'Login sebagai siswa kelas 11 DKV, buka dashboard.',
             'Tugas yang baru dibuat muncul di daftar tugas aktif.', '[ ] Pass / [ ] Fail'],
            ['T11', 'Ulangi T8-T10 untuk kelas "12 DKV".',
             'Tugas untuk 12 DKV juga muncul di dashboard siswa 12 DKV.', '[ ] Pass / [ ] Fail'],
            ['T12', 'Buat tugas dengan target kelas "11DKV,12DKV" (multi-kelas).',
             'Tugas muncul di dashboard siswa 11 DKV dan 12 DKV.', '[ ] Pass / [ ] Fail'],
            ['T13', 'Edit salah satu siswa di Students Manager, ubah kelas dari "11 DKV" ke "11DKV".',
             'Perubahan tersimpan, format tetap konsisten.', '[ ] Pass / [ ] Fail'],
            ['T14', 'Tes self-register siswa baru dengan input "11 dkv" (spasi + huruf kecil).',
             'Sistem menolak ATAU menormalisasi menjadi "11DKV".', '[ ] Pass / [ ] Fail'],
        ],
        col_widths=[1.0 * cm, 6.5 * cm, 6.0 * cm, 3.0 * cm],
    ))

    s.append(P('8.3 Smoke Test Setelah Deploy', style_h2))
    s.append(P(
        'Selain testing per-bug, lakukan smoke test singkat untuk memastikan tidak ada fitur lain yang rusak '
        'akibat patch. Berikut adalah checklist cepat yang bisa dijalankan dalam 10 menit:'
    ))
    s.extend(bullet_list([
        'Login sebagai guru dan siswa SMP (kelas 7A) — pastikan tidak ada error 500.',
        'Buat tugas untuk kelas SMP (mis: 7A) — pastikan siswa 7A bisa melihat tugas.',
        'Buka menu Attendance, Jurnal Guru, Catatan Sikap — pastikan semua bisa load data.',
        'Buka menu Analytics — pastikan chart nilai bisa render.',
        'Cek Vercel logs (di dashboard Vercel → tab Logs) — pastikan tidak ada error baru.',
    ]))
    return s


def build_section_9_pencegahan():
    """Section: Prevention"""
    s = []
    s.append(P('Pencegahan Kedepan', style_h1))
    s.append(P(
        'Memperbaiki bug hanyalah langkah pertama. Agar bug serupa tidak terulang di masa depan, ada beberapa '
        'praktik yang disarankan untuk diterapkan pada proyek hendrikusmuda52-droid. Praktik ini diurutkan dari '
        'yang paling mudah diterapkan hingga yang paling investasi waktunya besar.'
    ))

    s.append(P('9.1 Validasi Input dengan Zod (Mudah, Dampak Besar)', style_h2))
    s.append(P(
        'Salah satu pelajaran dari Bug #1 dan #2 adalah bahwa handler API percaya sepenuhnya pada data yang '
        'dikirim frontend. Jika frontend salah format, backend ikut salah. Solusinya adalah menambahkan validasi '
        'schema di setiap handler API menggunakan library <b>Zod</b>. Zod akan otomatis menolak request yang tidak '
        'sesuai schema, sekaligus memberi TypeScript type inference sehingga autocomplete di editor lebih akurat.'
    ))

    zod_code = """// Contoh: validasi body /api/manual-grades dengan Zod
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
}"""
    s.extend(code_block(zod_code, language_label='TypeScript · Zod schema example'))

    s.append(P('9.2 Unit Test untuk Helper normalizeKelas', style_h2))
    s.append(P(
        'Karena <font name="Mono" size="9">normalizeKelas</font> adalah fungsi murni yang dipakai di banyak tempat, '
        'menulis unit test untuknya adalah investasi murah dengan dampak besar. Berikut adalah contoh test pakai '
        'Vitest yang bisa langsung ditambahkan ke proyek:'
    ))

    test_code = """// File: src/lib/kelas.test.ts
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
})"""
    s.extend(code_block(test_code, language_label='TypeScript · Vitest unit test'))

    s.append(P('9.3 Code Review Checklist', style_h2))
    s.append(P(
        'Setiap kali ada Pull Request baru ke proyek, pastikan reviewer mengecek poin-poin berikut. Checklist '
        'ini bisa di-copy ke template PR description di GitHub:'
    ))
    s.extend(bullet_list([
        '<b>API handler</b>: Apakah semua field dari frontend di-destructure dan disimpan ke DB? Jangan ada field yang "diterima tapi diabaikan".',
        '<b>String filter</b>: Apakah perbandingan string sudah dinormalisasi (uppercase, trim, hapus spasi)?',
        '<b>Foreign key</b>: Apakah field cpId/tpId/assignmentId yang baru ditambah sudah disimpan di handler create?',
        '<b>Validasi</b>: Apakah input dari user sudah divalidasi (boleh pakai Zod atau validasi manual)?',
        '<b>Tes</b>: Apakah ada unit test untuk helper baru? Apakah smoke test masih pass?',
        '<b>Skema</b>: Apakah ada field di schema.prisma yang ditambah tapi tidak pernah dipakai? Hapus atau tambah komentar.',
    ]))

    s.append(P('9.4 Jadwal Maintenance Berkala', style_h2))
    s.append(P(
        'Selain testing per-deploy, disarankan melakukan maintenance berkala untuk menjaga kesehatan database. '
        'Berikut adalah jadwal yang disarankan untuk proyek sekolah dengan skala seperti hendrikusmuda52-droid:'
    ))
    s.extend(data_table(
        header_row=['Frekuensi', 'Aktivitas', 'Output'],
        body_rows=[
            ['Setiap deploy', 'Jalankan smoke test 10 menit', 'Sign-off checklist'],
            ['Mingguan', 'Cek Vercel logs untuk error 500 baru', 'Daftar error + tiket perbaikan'],
            ['Bulanan', 'Backup database Supabase (manual atau scheduled)', 'File backup .sql di storage'],
            ['Per semester', 'Jalankan SQL normalisasi & cek data orphan', 'Laporan data health'],
            ['Tahunan', 'Review schema Prisma, hapus field dead code', 'Schema migration'],
        ],
        col_widths=[3.0 * cm, 7.5 * cm, 6.0 * cm],
    ))
    return s


def build_section_10_lampiran():
    """Section: Lampiran"""
    s = []
    s.append(P('Lampiran', style_h1))

    s.append(P('A. Daftar File yang Dimodifikasi', style_h2))
    s.append(P(
        'Berikut adalah daftar lengkap file yang perlu diubah atau dibuat untuk menerapkan solusi pada laporan ini. '
        'Gunakan daftar ini sebagai checklist saat implementasi.'
    ))
    s.extend(data_table(
        header_row=['#', 'File Path', 'Aksi', 'Untuk Bug'],
        body_rows=[
            ['1', 'src/lib/kelas.ts', 'BUAT (file baru)', 'Bug #2'],
            ['2', 'src/app/api/student/assignments/route.ts', 'EDIT (ganti filter)', 'Bug #2'],
            ['3', 'src/app/api/student/materials/route.ts', 'EDIT (ganti filter)', 'Bug #2'],
            ['4', 'src/app/api/teacher/students/route.ts', 'EDIT (POST: sanitasi kelas)', 'Bug #2'],
            ['5', 'src/app/api/teacher/students/[id]/route.ts', 'EDIT (PUT: sanitasi kelas)', 'Bug #2'],
            ['6', 'src/app/api/student/route.ts', 'EDIT (POST: sanitasi kelas)', 'Bug #2'],
            ['7', 'src/app/api/manual-grades/route.ts', 'EDIT (single + bulk path)', 'Bug #1'],
            ['8', 'src/app/api/result/route.ts', 'EDIT (lookup Assignment)', 'Bug #1'],
            ['9', 'src/lib/kelas.test.ts', 'BUAT (unit test)', 'Bug #2 (pencegahan)'],
            ['10', 'Supabase SQL Editor', 'JALANKAN SQL #1–#4', 'Bug #1 + #2'],
        ],
        col_widths=[1.0 * cm, 7.5 * cm, 4.5 * cm, 3.5 * cm],
        mono_cols={1},
    ))

    s.append(P('B. Skrip SQL Lengkap (Satu Blok)', style_h2))
    s.append(P(
        'Berikut adalah semua skrip SQL dari Bab 6 yang sudah digabungkan menjadi satu blok. Anda bisa copy '
        'sekali jalan untuk efisiensi. Namun disarankan menjalankan satu per satu agar bisa verifikasi hasil '
        'tiap langkah.'
    ))

    sql_full = """-- ============================================================
-- SKRIP SQL LENGKAP MAINTENANCE HENDRIKUSMUDA52-DROID
-- Jalankan di Supabase SQL Editor, satu per satu blok.
-- ============================================================

-- ── 1. Normalisasi kelas di tabel Student ──
UPDATE "Student"
SET kelas = UPPER(TRIM(REGEXP_REPLACE(kelas, '\\s+', '', 'g')))
WHERE kelas IS NOT NULL
  AND kelas != UPPER(TRIM(REGEXP_REPLACE(kelas, '\\s+', '', 'g')));

-- ── 2. Backfill cpId/tpId di tabel Result dari Assignment ──
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

-- ── 3. Tambah index untuk query export ──
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

-- ── 4. Verifikasi ──
SELECT 'Student.kelas values' AS info, kelas, COUNT(*)
FROM "Student" GROUP BY kelas ORDER BY kelas;

SELECT 'Result.cpId status' AS info,
  COUNT(*) FILTER (WHERE "cpId" IS NULL) AS null_count,
  COUNT(*) FILTER (WHERE "cpId" IS NOT NULL) AS filled_count
FROM "Result";"""
    s.extend(code_block(sql_full, language_label='SQL · Complete maintenance script'))

    s.append(P('C. Checklist Implementasi Step-by-Step', style_h2))
    s.append(P(
        'Checklist berikut dirancang agar bisa diikuti berurutan. Centang setiap langkah yang selesai. Jika ada '
        'langkah yang gagal, hentikan dan debug dulu sebelum lanjut ke langkah berikutnya.'
    ))
    s.extend(numbered_list([
        '<b>Backup database</b> Supabase via Database → Backups → Create a backup.',
        '<b>Buat branch Git baru</b>: <font name="Mono" size="9">git checkout -b fix/cp-tp-and-smk-assignments</font>.',
        '<b>Buat file</b> <font name="Mono" size="9">src/lib/kelas.ts</font> dengan kode dari Patch #4.',
        '<b>Patch</b> <font name="Mono" size="9">/api/student/assignments/route.ts</font> dengan kode dari Patch #5.',
        '<b>Patch</b> <font name="Mono" size="9">/api/student/materials/route.ts</font> dengan pola yang sama.',
        '<b>Patch</b> 3 file write-paths student dengan kode dari Patch #6.',
        '<b>Patch</b> <font name="Mono" size="9">/api/manual-grades/route.ts</font> (single + bulk) dengan Patch #1 dan #2.',
        '<b>Patch</b> <font name="Mono" size="9">/api/result/route.ts</font> dengan Patch #3.',
        '<b>Commit & push</b>: <font name="Mono" size="9">git add . && git commit -m "fix: CP/TP sync + SMK assignment filter" && git push</font>.',
        '<b>Tunggu Vercel deploy</b> selesai (cek di dashboard Vercel).',
        '<b>Jalankan SQL #1</b> di Supabase untuk normalisasi kelas. Verifikasi dengan SELECT.',
        '<b>Jalankan SQL #2</b> untuk backfill cpId/tpId Result. Verifikasi dengan SELECT.',
        '<b>Jalankan SQL #3</b> untuk cek foreign key constraints.',
        '<b>Jalankan SQL #4</b> untuk tambah index.',
        '<b>Lakukan Testing T1–T14</b> dari Bab 8. Catat hasilnya.',
        '<b>Lakukan Smoke Test</b> dari Bab 8.3.',
        '<b>Merge branch</b> ke main setelah semua test pass.',
        '<b>Update dokumentasi</b>: tambahkan tanggal fix ke changelog proyek.',
    ]))

    s.append(P('D. Glosarium Istilah Teknis', style_h2))
    s.append(P(
        'Untuk memudahkan pemula, berikut adalah penjelasan singkat istilah teknis yang dipakai di laporan ini:'
    ))
    s.extend(data_table(
        header_row=['Istilah', 'Penjelasan Singkat'],
        body_rows=[
            ['API (Application Programming Interface)',
             'Cara aplikasi frontend "bicara" dengan backend, biasanya via HTTP request ke URL tertentu.'],
            ['Backend', 'Bagian aplikasi yang berjalan di server, mengakses database, dan mengembalikan data ke frontend.'],
            ['CP (Capaian Pembelajaran)',
             'Tujuan pembelajaran tingkat tinggi yang dicapai siswa setelah menyelesaikan satu fase.'],
            ['TP (Tujuan Pembelajaran)',
             'Sub-tujuan lebih spesifik di bawah CP. Satu CP bisa punya banyak TP.'],
            ['Foreign Key (FK)',
             'Field di tabel yang merujuk ke primary key tabel lain, untuk membuat relasi.'],
            ['ORM (Object-Relational Mapper)',
             'Library yang menerjemahkan kode JS menjadi query SQL. Prisma adalah ORM yang dipakai di proyek ini.'],
            ['Prisma Schema',
             'File <font name="Mono" size="9">schema.prisma</font> yang mendefinisikan struktur tabel database.'],
            ['Normalization (Normalisasi)',
             'Proses membersihkan string agar konsisten: trim spasi, uppercase, dll.'],
            ['Sanitization (Sanitasi)',
             'Proses membersihkan input user sebelum disimpan ke database.'],
            ['Idempotent',
             'Operasi yang aman dijalankan berulang kali tanpa efek samping.'],
            ['Backfill',
             'Mengisi field yang sudah ada (biasanya baru ditambah) dengan data dari field/sumber lain.'],
            ['Sequential Scan',
             'Cara database membaca seluruh baris tabel satu per satu. Lambat untuk tabel besar.'],
            ['Index',
             'Struktur data yang mempercepat pencarian baris berdasarkan kolom tertentu.'],
            ['Zod',
             'Library TypeScript untuk validasi schema data.'],
            ['Vitest',
             'Library testing untuk JavaScript/TypeScript, mirip Jest tapi lebih cepat.'],
        ],
        col_widths=[5.0 * cm, 11.5 * cm],
    ))
    return s


# ============================================================
# 8. ASSEMBLE STORY
# ============================================================

def build_story():
    story = []

    # Cover page is drawn on canvas (onFirstPage), so we just need a PageBreak
    # to end page 1. We add a tiny spacer so the cover page is "owned" by the doc.
    story.append(Spacer(1, 1))
    story.append(PageBreak())

    # Section 2: Ringkasan Eksekutif
    story.extend(build_section_2_ringkasan())

    # Section 3: Konteks Aplikasi
    story.extend(build_section_3_konteks())

    # Section 4: Bug #1 Analysis
    story.extend(build_section_4_bug1())

    # Section 5: Bug #2 Analysis
    story.extend(build_section_5_bug2())

    # Section 6: Solusi Database Supabase
    story.extend(build_section_6_solusi_db())

    # Section 7: Solusi Logika Kode
    story.extend(build_section_7_solusi_kode())

    # Section 8: Testing
    story.extend(build_section_8_testing())

    # Section 9: Pencegahan
    story.extend(build_section_9_pencegahan())

    # Section 10: Lampiran
    story.extend(build_section_10_lampiran())

    return story


# ============================================================
# 9. BUILD PDF
# ============================================================

def build_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B,
        title='Laporan Maintenance hendrikusmuda52-droid',
        author='Senior Full-Stack Developer',
        subject='Analisis dan Perbaikan Dua Bug Kritis',
        creator='Z.ai PDF Skill (ReportLab)',
    )

    story = build_story()

    doc.build(
        story,
        onFirstPage=draw_cover,
        onLaterPages=draw_body_page,
    )
    print(f'PDF berhasil dibuat: {output_path}')
    print(f'Ukuran: {os.path.getsize(output_path) / 1024:.1f} KB')


if __name__ == '__main__':
    OUTPUT = '/home/z/my-project/download/Laporan_Maintenance_hendrikusmuda52-droid.pdf'
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    build_pdf(OUTPUT)
