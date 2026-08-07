#!/usr/bin/env python3
"""Update semua API route yang pakai __teacherSessions ke stateless auth"""
import os
import re

SRC_DIR = '/home/z/my-project/src/app/api'

# Pattern lama (berbagai variasi)
OLD_PATTERNS = [
    # Pattern: const g = globalThis... + requireAuth function
    r'''const g = globalThis as unknown as \{
  __teacherSessions\?: Map<string, unknown>
\}

async function requireAuth\(req: NextRequest\) \{
  const token = req\.cookies\.get\('teacher_token'\)\.value
  return !!\(token && g\.__teacherSessions\?\.has\(token\)\)
\}''',
    r'''const g = globalThis as unknown as \{
  __teacherSessions\?: Map<string, unknown>
\}

async function requireAuth\(req: NextRequest\) \{
  const token = req\.cookies\.get\('teacher_token'\)\?\.value
  return !!\(token && g\.__teacherSessions\?\.has\(token\)\)
\}''',
    r'''const g = globalThis as unknown as \{[^}]*__teacherSessions[^}]*\}

async function requireAuth[^}]*\{[^}]*\}''',
]

# Pattern untuk requireAuth dengan teacher
OLD_ADMIN_PATTERN = r'''const g = globalThis as unknown as \{[^}]*__teacherSessions[^}]*\}

async function requireAuth\(req: NextRequest\) \{[^}]*role[^}]*\}'''

# Replacement
NEW_IMPORT = "import { requireTeacherAuth } from '@/lib/auth'"
NEW_ADMIN_IMPORT = "import { requireAdminAuth } from '@/lib/auth'"

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    if '__teacherSessions' not in content:
        return False
    
    original = content
    
    # Replace import: tambah import auth jika belum ada
    if "from '@/lib/auth'" not in content and "from \"@/lib/auth\"" not in content:
        # Cari import terakhir
        lines = content.split('\n')
        last_import_idx = 0
        for i, line in enumerate(lines):
            if line.startswith('import '):
                last_import_idx = i
        lines.insert(last_import_idx + 1, NEW_IMPORT)
        content = '\n'.join(lines)
    
    # Replace requireAuth function definitions
    # Pattern 1: full function with globalThis
    content = re.sub(
        r"const g = globalThis as unknown as \{[^}]*__teacherSessions[^}]*\}\s*\n\s*async function requireAuth\([^)]*\)[^{]*\{[^}]*\}",
        "// Auth via stateless JWT - see @/lib/auth",
        content
    )
    
    # Replace requireAuth() calls dengan requireTeacherAuth()
    content = content.replace('await requireAuth(req)', 'await requireTeacherAuth(req)')
    content = content.replace('requireAuth(req)', 'requireTeacherAuth(req)')
    
    # Replace requireAdminAuth jika ada
    if 'requireAdminAuth' in content:
        content = content.replace("import { requireTeacherAuth } from '@/lib/auth'", 
                                  "import { requireTeacherAuth, requireAdminAuth } from '@/lib/auth'")
    
    # Clean up: hapus baris kosong berlebih
    content = re.sub(r'\n{4,}', '\n\n\n', content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        return True
    return False

# Cari semua .ts files
updated = []
for root, dirs, files in os.walk(SRC_DIR):
    for f in files:
        if f.endswith('.ts'):
            filepath = os.path.join(root, f)
            if process_file(filepath):
                updated.append(filepath)

print(f"Updated {len(updated)} files:")
for f in updated:
    print(f"  ✅ {f.replace(SRC_DIR, '')}")
