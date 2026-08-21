'use client'

import { useMemo, useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import {
  ChevronDown, ChevronRight, Lightbulb, AlertCircle, Info, CheckCircle2,
  BookOpen, Target, Zap, ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  RefreshCw, Star, Flame,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// MaterialMarkdownRenderer — Interactive Markdown renderer for student materials
//
// Features (Bug #3 fix):
//   1. Headings (#, ##, ###) become collapsible Accordion sections
//   2. Keywords auto-highlighted (stabilo effect) — see KEYWORD_HIGHLIGHTS
//   3. LaTeX arrow syntax (\rightarrow, \leftarrow, etc.) → animated SVG arrows
//   4. Callout boxes auto-detected from text patterns:
//      - "Contoh Keseharian:" → amber callout with Lightbulb icon
//      - "4 Pilar Utama:" → purple callout with Star icon
//      - "Penting:" / "Catatan:" → blue callout with Info icon
//      - "Peringatan:" / "Hati-hati:" → red callout with AlertCircle icon
//      - "Tips:" / "Trik:" → green callout with Zap icon
// ─────────────────────────────────────────────────────────────────────────────

// Keywords to auto-highlight with stabilo effect (case-insensitive, whole word)
const KEYWORD_HIGHLIGHTS: { words: string[]; className: string }[] = [
  {
    words: ['algoritma', 'dekomposisi', 'abstraksi', 'pengenalan pola', 'berpikir komputasional'],
    className: 'bg-amber-200 text-amber-900 px-1 rounded font-medium',
  },
  {
    words: ['penting', 'kunci', 'utama', 'wajib', 'harus'],
    className: 'bg-rose-200 text-rose-900 px-1 rounded font-semibold',
  },
  {
    words: ['contoh', 'ilustrasi', 'misalnya'],
    className: 'bg-sky-200 text-sky-900 px-1 rounded',
  },
  {
    words: ['definisi', 'artinya', 'maksudnya'],
    className: 'bg-violet-200 text-violet-900 px-1 rounded',
  },
]

// LaTeX arrow patterns → icon mapping
const ARROW_MAP: Record<string, { Icon: typeof ArrowRight; label: string; color: string }> = {
  '\\rightarrow': { Icon: ArrowRight, label: 'panah kanan', color: 'text-emerald-600' },
  '\\leftarrow': { Icon: ArrowLeft, label: 'panah kiri', color: 'text-blue-600' },
  '\\uparrow': { Icon: ArrowUp, label: 'panah atas', color: 'text-purple-600' },
  '\\downarrow': { Icon: ArrowDown, label: 'panah bawah', color: 'text-rose-600' },
  '\\Rightarrow': { Icon: ArrowRight, label: 'panah ganda kanan', color: 'text-emerald-700' },
  '\\Leftarrow': { Icon: ArrowLeft, label: 'panah ganda kiri', color: 'text-blue-700' },
  '\\leftrightarrow': { Icon: RefreshCw, label: 'panah dua arah', color: 'text-amber-600' },
  '\\Leftrightarrow': { Icon: RefreshCw, label: 'panah ganda dua arah', color: 'text-amber-700' },
}

// Callout detection patterns
const CALLOUT_PATTERNS: {
  prefixes: string[]
  className: string
  Icon: typeof Info
  title: string
}[] = [
  {
    prefixes: ['contoh keseharian', 'contoh kehidupan', 'contoh sehari-hari', 'contoh:'],
    className: 'border-amber-300 bg-amber-50 text-amber-900',
    Icon: Lightbulb,
    title: 'Contoh Keseharian',
  },
  {
    prefixes: ['4 pilar utama', 'pilar utama', 'pilar berpikir komputasional'],
    className: 'border-purple-300 bg-purple-50 text-purple-900',
    Icon: Star,
    title: '4 Pilar Utama',
  },
  {
    prefixes: ['penting:', 'catatan:', 'note:', 'ingat:'],
    className: 'border-blue-300 bg-blue-50 text-blue-900',
    Icon: Info,
    title: 'Catatan Penting',
  },
  {
    prefixes: ['peringatan:', 'hati-hati:', 'awas:', 'warning:'],
    className: 'border-rose-300 bg-rose-50 text-rose-900',
    Icon: AlertCircle,
    title: 'Peringatan',
  },
  {
    prefixes: ['tips:', 'trik:', 'saran:', 'tips dan trik:'],
    className: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    Icon: Zap,
    title: 'Tips',
  },
  {
    prefixes: ['tujuan:', 'goal:', 'maksud:'],
    className: 'border-teal-300 bg-teal-50 text-teal-900',
    Icon: Target,
    title: 'Tujuan',
  },
]

// ── Helper: Highlight keywords in text ──
function highlightKeywords(text: string): ReactNode {
  // First, replace LaTeX arrows with placeholder tokens
  let processed = text
  const arrowPlaceholders: { token: string; Icon: typeof ArrowRight; label: string; color: string }[] = []
  for (const [latex, meta] of Object.entries(ARROW_MAP)) {
    const token = `__ARROW_${arrowPlaceholders.length}__`
    const regex = new RegExp(
      latex.replace(/\\/g, '\\\\').replace(/[()]/g, '\\$&').replace(/[{}]/g, '\\$&'),
      'g',
    )
    if (regex.test(processed)) {
      processed = processed.replace(regex, token)
      arrowPlaceholders.push({ token, ...meta })
    }
  }

  // Split by placeholders and arrow icons
  const parts = processed.split(/(__ARROW_\d+__)/)
  return parts.map((part, i) => {
    // Check if this part is an arrow placeholder
    const arrowMatch = arrowPlaceholders.find((a) => a.token === part)
    if (arrowMatch) {
      const { Icon, label, color } = arrowMatch
      return (
        <motion.span
          key={`arrow-${i}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.2, x: 2 }}
          className={`inline-flex items-center align-middle ${color} mx-0.5`}
          role="img"
          aria-label={label}
          title={label}
        >
          <Icon className="w-4 h-4" strokeWidth={2.5} />
        </motion.span>
      )
    }

    // Highlight keywords in regular text
    return <TextWithHighlights key={`text-${i}`} text={part} />
  })
}

// ── Helper: Highlight keywords in a text string ──
function TextWithHighlights({ text }: { text: string }) {
  // Build a combined regex for all keywords
  const allWords = KEYWORD_HIGHLIGHTS.flatMap((g) => g.words)
  if (allWords.length === 0) return <>{text}</>

  const pattern = new RegExp(
    `\\b(${allWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
    'gi',
  )

  const segments = text.split(pattern)
  return (
    <>
      {segments.map((seg, i) => {
        if (!seg) return null
        const matchedGroup = KEYWORD_HIGHLIGHTS.find((g) =>
          g.words.some((w) => w.toLowerCase() === seg.toLowerCase()),
        )
        if (matchedGroup) {
          return (
            <mark key={`hl-${i}`} className={`${matchedGroup.className}`}>
              {seg}
            </mark>
          )
        }
        return <span key={`seg-${i}`}>{seg}</span>
      })}
    </>
  )
}

// ── Helper: Detect callout from paragraph text ──
function detectCallout(text: string) {
  const lower = text.trim().toLowerCase()
  for (const pattern of CALLOUT_PATTERNS) {
    for (const prefix of pattern.prefixes) {
      if (lower.startsWith(prefix)) {
        // Remove the prefix from the text
        const regex = new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'i')
        const content = text.trim().replace(regex, '')
        return { ...pattern, content }
      }
    }
  }
  return null
}

// ── Helper: Check if content is a code block or inline code ──
function isCodeBlock(text: string): boolean {
  return text.trim().startsWith('```') || text.trim().startsWith('    ')
}

// ── Main component ──
export function MaterialMarkdownRenderer({ content }: { content: string }) {
  const [openSections, setOpenSections] = useState<string[]>(['item-0'])

  // Parse markdown into sections based on headings (#, ##, ###)
  // Each top-level heading becomes an Accordion section
  const sections = useMemo(() => {
    if (!content) return [{ heading: null, body: '' }]
    const lines = content.split('\n')
    const sections: { heading: string | null; level: number; body: string }[] = []
    let currentSection: { heading: string | null; level: number; body: string } = {
      heading: null,
      level: 0,
      body: '',
    }

    for (const line of lines) {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
      if (headingMatch) {
        // Save previous section if it has content
        if (currentSection.body.trim() || currentSection.heading) {
          sections.push(currentSection)
        }
        currentSection = {
          heading: headingMatch[2],
          level: headingMatch[1].length,
          body: '',
        }
      } else {
        currentSection.body += line + '\n'
      }
    }
    // Don't forget the last section
    if (currentSection.body.trim() || currentSection.heading) {
      sections.push(currentSection)
    }

    return sections.length > 0 ? sections : [{ heading: null, level: 0, body: content }]
  }, [content])

  return (
    <div className="material-renderer space-y-3">
      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={setOpenSections}
        className="w-full"
      >
        {sections.map((section, idx) => {
          const itemKey = `item-${idx}`

          // If no heading, render body directly (intro text)
          if (!section.heading) {
            return (
              <div key={itemKey} className="prose prose-sm max-w-none">
                <MarkdownBody content={section.body} />
              </div>
            )
          }

          // Heading icon based on level
          const headingIcon =
            section.level === 1 ? BookOpen : section.level === 2 ? Target : Star
          const HeadingIcon = headingIcon

          // Heading color based on level
          const headingColor =
            section.level === 1
              ? 'text-slate-900 bg-slate-50'
              : section.level === 2
                ? 'text-emerald-800 bg-emerald-50'
                : 'text-purple-800 bg-purple-50'

          return (
            <AccordionItem
              key={itemKey}
              value={itemKey}
              className="border border-slate-200 rounded-lg overflow-hidden mb-2 bg-white"
            >
              <AccordionTrigger
                className={`hover:no-underline px-4 py-3 ${headingColor}`}
              >
                <div className="flex items-center gap-2 w-full text-left">
                  <HeadingIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold text-sm flex-1">{section.heading}</span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0 text-slate-400 transition-transform" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="prose prose-sm max-w-none">
                  <MarkdownBody content={section.body} />
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

// ── MarkdownBody: renders markdown with custom components for callouts, arrows, highlights ──
function MarkdownBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        // Custom paragraph renderer — detects callouts
        p: ({ children, ...props }) => {
          const text = extractText(children)
          const callout = detectCallout(text)
          if (callout) {
            const { Icon, title, className } = callout
            return (
              <div className={`rounded-lg border p-3 my-3 flex gap-3 ${className}`}>
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-70">{title}</p>
                  <div className="text-sm leading-relaxed">
                    {renderWithHighlights(callout.content)}
                  </div>
                </div>
              </div>
            )
          }
          return <p {...props}>{renderWithHighlights(children)}</p>
        },
        // Custom text renderer for inline content — handles arrows + highlights
        text: ({ children }) => <>{renderWithHighlights(String(children))}</>,
        // Code blocks — styled with syntax-highlight-like background
        code: ({ inline, className, children, ...props }: {
          inline?: boolean; className?: string; children?: ReactNode
        }) => {
          if (inline) {
            return (
              <code
                className="px-1.5 py-0.5 rounded bg-slate-100 text-pink-600 text-xs font-mono"
                {...props}
              >
                {children}
              </code>
            )
          }
          return (
            <code
              className={`block p-3 rounded-lg bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto my-2 ${className || ''}`}
              {...props}
            >
              {children}
            </code>
          )
        },
        // Lists — nicer styling
        ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2 text-sm">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2 text-sm">{children}</ol>,
        // Blockquotes — styled as info callout
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-400 bg-blue-50 pl-3 py-2 my-2 text-sm text-blue-900 italic">
            {children}
          </blockquote>
        ),
        // Tables — responsive
        table: ({ children }) => (
          <div className="overflow-x-auto my-3">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-slate-300 bg-slate-100 px-3 py-1.5 text-left font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-slate-300 px-3 py-1.5">{children}</td>
        ),
        // Links — open in new tab
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {children}
          </a>
        ),
        // Strong/bold — slightly enhanced
        strong: ({ children }) => (
          <strong className="font-semibold text-slate-900">{children}</strong>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

// ── Helper: Extract plain text from React children (for callout detection) ──
function extractText(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(extractText).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    const props = (children as { props: { children?: ReactNode } }).props
    return extractText(props.children)
  }
  return ''
}

// ── Helper: Render content with highlights + arrows (used in paragraphs + callouts) ──
function renderWithHighlights(content: ReactNode | string): ReactNode {
  if (typeof content === 'string') {
    return highlightKeywords(content)
  }
  // If it's React children, try to highlight each text node
  if (Array.isArray(content)) {
    return content.map((child, i) => {
      if (typeof child === 'string') {
        return <span key={i}>{highlightKeywords(child)}</span>
      }
      return child
    })
  }
  return content
}

export default MaterialMarkdownRenderer
