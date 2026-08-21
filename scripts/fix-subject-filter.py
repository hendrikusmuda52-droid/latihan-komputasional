#!/usr/bin/env python3
"""Batch update teacher API routes to filter by subject from JWT"""
import os, re

# Files to update with subject filtering
FILES_TO_UPDATE = {
    'src/app/api/questions/route.ts': {
        'GET_filter': 'where: { ...where, subject: teacher.subject }',
        'POST_add': 'subject: teacher.subject, teacherId: teacher.teacherId,',
    },
    'src/app/api/materials/route.ts': {
        'GET_filter': 'where: { ...where, subject: teacher.subject }',
        'POST_add': 'subject: teacher.subject, teacherId: teacher.teacherId,',
    },
    'src/app/api/assignments/route.ts': {
        'GET_filter': 'where: { subject: teacher.subject }',
        'POST_add': 'subject: teacher.subject, teacherId: teacher.teacherId,',
    },
    'src/app/api/typing-texts/route.ts': {
        'GET_filter': 'where: { ...where, subject: teacher.subject }',
        'POST_add': 'subject: teacher.subject, teacherId: teacher.teacherId,',
    },
    'src/app/api/manual-grades/route.ts': {
        'GET_filter': 'where: { ...where, subject: teacher.subject }',
        'POST_add': 'subject: teacher.subject, teacherId: teacher.teacherId,',
    },
}

BASE = '/home/z/my-project/'

for filepath, config in FILES_TO_UPDATE.items():
    fullpath = os.path.join(BASE, filepath)
    if not os.path.exists(fullpath):
        print(f"SKIP (not found): {filepath}")
        continue
    
    with open(fullpath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Add getTeacherFromToken import if not present
    if 'getTeacherFromToken' not in content:
        content = content.replace(
            "import { requireTeacherAuth } from '@/lib/auth'",
            "import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'"
        )
    
    # In GET handler: after requireTeacherAuth check, add teacher = getTeacherFromToken
    # Pattern: if (!(await requireTeacherAuth(req))) { ... }
    if 'const teacher = getTeacherFromToken(req)' not in content:
        content = content.replace(
            "if (!(await requireTeacherAuth(req))) {\n      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })\n    }",
            "if (!(await requireTeacherAuth(req))) {\n      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })\n    }\n    const teacher = getTeacherFromToken(req)!\n    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })",
            1  # Only replace first occurrence (GET handler)
        )
    
    # In POST handler: add teacher = getTeacherFromToken
    # Find second requireTeacherAuth check
    if content.count("if (!(await requireTeacherAuth(req)))") >= 2 and 'const teacher = getTeacherFromToken(req)' not in content.split('export async function POST')[1].split('}')[0] if 'export async function POST' in content else True:
        # Split by POST function
        parts = content.split('export async function POST')
        if len(parts) >= 2:
            post_part = parts[1]
            if 'const teacher = getTeacherFromToken(req)' not in post_part[:500]:
                post_part = post_part.replace(
                    "if (!(await requireTeacherAuth(req))) {\n      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })\n    }",
                    "if (!(await requireTeacherAuth(req))) {\n      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })\n    }\n    const teacher = getTeacherFromToken(req)!\n    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })",
                    1
                )
                content = parts[0] + 'export async function POST' + post_part
    
    if content != original:
        with open(fullpath, 'w') as f:
            f.write(content)
        print(f"✅ Updated: {filepath}")
    else:
        print(f"⚠️ No changes: {filepath}")

print("\nDone! Manual review needed for query filters.")
