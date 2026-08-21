#!/usr/bin/env python3
"""Update student API routes dari __studentSessions ke stateless auth"""
import os, re

SRC_DIR = '/home/z/my-project/src/app/api/student'
NEW_IMPORT = "import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'"

for root, dirs, files in os.walk(SRC_DIR):
    for f in files:
        if not f.endswith('.ts'):
            continue
        filepath = os.path.join(root, f)
        with open(filepath, 'r') as fh:
            content = fh.read()
        
        if '__studentSessions' not in content:
            continue
        
        original = content
        
        # Add import
        if "from '@/lib/auth'" not in content:
            lines = content.split('\n')
            last_import = 0
            for i, line in enumerate(lines):
                if line.startswith('import '):
                    last_import = i
            lines.insert(last_import + 1, NEW_IMPORT)
            content = '\n'.join(lines)
        
        # Replace globalThis pattern
        content = re.sub(
            r"const g = globalThis as unknown as \{[^}]*__studentSessions[^}]*\}",
            "// Student auth via stateless JWT",
            content
        )
        
        # Replace session access patterns
        # Pattern: g.__studentSessions?.get(token) or g.__studentSessions?.has(token)
        content = re.sub(
            r"if \(!token \|\| !g\.__studentSessions\?\.has\(token\)\)[^{]*\{[^}]*\}",
            "if (!(await requireStudentAuth(req))) { return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 }) }",
            content
        )
        
        # Replace: const session = g.__studentSessions.get(token)!
        content = re.sub(
            r"const session = g\.__studentSessions\.get\(token\)!?",
            "const session = getStudentFromToken(req)!",
            content
        )
        
        # Clean up
        content = re.sub(r'\n{4,}', '\n\n\n', content)
        
        if content != original:
            with open(filepath, 'w') as fh:
                fh.write(content)
            print(f"✅ {filepath.replace(SRC_DIR, '')}")
