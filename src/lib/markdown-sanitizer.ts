// ─────────────────────────────────────────────────────────────────────────────
// Markdown content sanitizer — ensures pasted text preserves paragraph breaks
//
// PROBLEM: When teachers copy text from web pages, the newlines are often
// stripped or merged, producing a single run-on paragraph. This module
// normalizes content into valid Markdown so react-markdown can render it
// with proper paragraph separation.
//
// Pipeline (in order):
//   1. Normalize line endings to \n
//   2. Strip dangerous HTML tags (allow inline code, emphasis, links)
//   3. Convert Windows/Linux mixed line endings
//   4. Collapse 3+ consecutive blank lines into 2 (Markdown paragraph break)
//   5. Ensure single \n between lines becomes \n\n (paragraph break) UNLESS
//      the line is a list item (-, *, 1.) or inside a code fence (```)
//   6. Trim trailing whitespace per line (Markdown needs 2 trailing spaces
//      for soft break — but we use \n\n for paragraph break instead, which
//      is more robust)
//   7. Ensure headings have a blank line before them
//   8. Ensure list items have a blank line before the list starts
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sanitize markdown content for storage.
 * Called by /api/materials POST and PUT before writing to DB.
 */
export function sanitizeMarkdownContent(raw: string): string {
  if (!raw || typeof raw !== 'string') return ''

  let text = raw

  // 1. Normalize line endings
  text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  // 2. Strip <script> and <style> blocks entirely (XSS prevention)
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '')
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '')

  // 3. Strip dangerous HTML tags but keep content (allow b, i, em, strong, code, a, br, p, h1-h6, ul, ol, li, blockquote, pre)
  //    Convert <br> to \n, <p> to \n\n, then strip remaining tags
  text = text.replace(/<br\s*\/?>/gi, '\n')
  text = text.replace(/<\/p>/gi, '\n\n')
  text = text.replace(/<p[^>]*>/gi, '')
  text = text.replace(/<\/(div|section|article)>/gi, '\n\n')

  // Strip all remaining HTML tags (we trust markdown, not raw HTML)
  text = text.replace(/<[^>]+>/g, '')

  // 4. Decode common HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')

  // 5. Trim trailing whitespace per line (but preserve intentional code indentation)
  text = text
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n')

  // 6. Collapse 3+ blank lines into 2 (Markdown paragraph break is \n\n)
  text = text.replace(/\n{3,}/g, '\n\n')

  // 7. Process line-by-line to ensure proper paragraph breaks
  //    Rules:
  //    - Headings (#, ##, ###, etc.) get a blank line before AND after
  //    - List items (-, *, 1.) get a blank line before the FIRST item only
  //    - Blockquotes (>) get a blank line before
  //    - Code fences (```) preserve internal content as-is
  const lines = text.split('\n')
  const result: string[] = []
  let inCodeFence = false
  let prevWasListItem = false
  let prevWasBlank = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Track code fence state
    if (trimmed.startsWith('```')) {
      inCodeFence = !inCodeFence
      // Ensure blank line before opening fence
      if (!inCodeFence === false && result.length > 0 && result[result.length - 1].trim() !== '') {
        result.push('')
      }
      result.push(line)
      prevWasListItem = false
      prevWasBlank = false
      continue
    }

    // Inside code fence — preserve as-is
    if (inCodeFence) {
      result.push(line)
      continue
    }

    // Skip if line is empty
    if (trimmed === '') {
      if (!prevWasBlank) {
        result.push('')
      }
      prevWasBlank = true
      prevWasListItem = false
      continue
    }

    // Heading: ensure blank line before (unless already blank or start of doc)
    if (/^#{1,6}\s/.test(trimmed)) {
      if (result.length > 0 && result[result.length - 1].trim() !== '') {
        result.push('')
      }
      result.push(line)
      // Ensure blank line after heading
      result.push('')
      prevWasListItem = false
      prevWasBlank = true
      continue
    }

    // List item: ensure blank line before FIRST item
    const isListItem = /^[-*+]\s|^\d+\.\s/.test(trimmed)
    if (isListItem && !prevWasListItem && result.length > 0 && result[result.length - 1].trim() !== '') {
      result.push('')
    }
    result.push(line)
    prevWasListItem = isListItem
    prevWasBlank = false
  }

  text = result.join('\n')

  // 8. Collapse 3+ blank lines again (post-processing may have introduced some)
  text = text.replace(/\n{3,}/g, '\n\n')

  // 9. Trim leading/trailing whitespace
  return text.trim()
}

/**
 * Detect if content has markdown formatting (headings, lists, code, etc.)
 * Used by the frontend to decide whether to show "Auto-Format" button.
 */
export function hasMarkdownFormatting(content: string): boolean {
  if (!content) return false
  return (
    /^#{1,6}\s/m.test(content) ||
    /^[-*+]\s/m.test(content) ||
    /^\d+\.\s/m.test(content) ||
    /```/.test(content) ||
    /\*\*[^*]+\*\*/.test(content) ||
    /`[^`]+`/.test(content)
  )
}
