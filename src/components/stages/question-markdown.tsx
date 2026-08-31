'use client'

import { memo, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { Lightbulb, AlertCircle, Info, CheckCircle2, Zap, BookOpen } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// QuestionMarkdown — Markdown renderer khusus untuk soal quiz
//
// Fitur:
//   1. Render **bold**, *italic*, `code`, list, headings
//   2. Auto-detect callout boxes dari pattern teks:
//      - "💡 Tips:" / "Tips:" → green callout
//      - "⚠️ Hati-hati:" / "Peringatan:" → red callout
//      - "ℹ️ Info:" / "Catatan:" → blue callout
//      - "✅ Contoh:" / "Contoh:" → amber callout
//   3. Highlight keyword otomatis (algoritma, variabel, dll)
//   4. Render inline code dengan background
//   5. Render code block dengan background gelap
// ─────────────────────────────────────────────────────────────────────────────

// Keywords yang di-highlight otomatis
const KEYWORD_HIGHLIGHTS: { words: string[]; className: string }[] = [
  {
    words: ['algoritma', 'dekomposisi', 'abstraksi', 'pola', 'berpikir komputasional', 'komputasi'],
    className: 'bg-amber-100 text-amber-900 px-1 rounded font-medium',
  },
  {
    words: ['variabel', 'fungsi', 'loop', 'perulangan', 'percabangan', 'kondisi', 'array'],
    className: 'bg-sky-100 text-sky-900 px-1 rounded font-medium',
  },
  {
    words: ['penting', 'kunci', 'utama', 'wajib', 'harus', 'selalu'],
    className: 'bg-rose-100 text-rose-900 px-1 rounded font-semibold',
  },
  {
    words: ['contoh', 'misalnya', 'seperti', 'ilustrasi'],
    className: 'bg-emerald-100 text-emerald-900 px-1 rounded',
  },
]

// Callout patterns
type CalloutType = 'tip' | 'warning' | 'info' | 'example' | 'note'

interface CalloutConfig {
  Icon: typeof Lightbulb
  color: string
  bgColor: string
  borderColor: string
  title: string
}

const CALLOUT_CONFIG: Record<CalloutType, CalloutConfig> = {
  tip: { Icon: Zap, color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', title: 'Tips' },
  warning: { Icon: AlertCircle, color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', title: 'Peringatan' },
  info: { Icon: Info, color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', title: 'Info' },
  example: { Icon: Lightbulb, color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', title: 'Contoh' },
  note: { Icon: BookOpen, color: 'text-violet-700', bgColor: 'bg-violet-50', borderColor: 'border-violet-200', title: 'Catatan' },
}

// Deteksi callout dari teks
function detectCallout(text: string): { type: CalloutType; content: string } | null {
  const patterns: { regex: RegExp; type: CalloutType }[] = [
    { regex: /^(💡|✨)\s*(Tips?|Trik|Cara)\s*:\s*/i, type: 'tip' },
    { regex: /^(⚠️|🚨)\s*(Hati-hati|Peringatan|Awas|Waspada)\s*:\s*/i, type: 'warning' },
    { regex: /^(ℹ️|📌)\s*(Info|Informasi|Catatan)\s*:\s*/i, type: 'info' },
    { regex: /^(✅|💡|🎯)\s*(Contoh|Misal|Ilustrasi)\s*:\s*/i, type: 'example' },
    { regex: /^(📝|📖)\s*(Catatan|Note)\s*:\s*/i, type: 'note' },
  ]
  for (const { regex, type } of patterns) {
    if (regex.test(text)) {
      return { type, content: text.replace(regex, '') }
    }
  }
  return null
}

// Highlight keyword dalam teks
function highlightKeywords(text: string): ReactNode {
  let result: ReactNode = text
  for (const { words, className } of KEYWORD_HIGHLIGHTS) {
    for (const word of words) {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi')
      const parts = String(result).split(regex)
      if (parts.length > 1) {
        result = parts.map((part, i) =>
          regex.test(part)
            ? <mark key={`${word}-${i}`} className={className}>{part}</mark>
            : part
        )
      }
    }
  }
  return result
}

// Komponen untuk render paragraf dengan callout detection
function Paragraph({ children, ...props }: { children?: ReactNode } & React.HTMLAttributes<HTMLParagraphElement>) {
  // Cek apakah children adalah string yang match callout pattern
  if (typeof children === 'string') {
    const callout = detectCallout(children)
    if (callout) {
      const config = CALLOUT_CONFIG[callout.type]
      const { Icon, color, bgColor, borderColor, title } = config
      return (
        <div className={`my-3 p-3 rounded-lg border ${bgColor} ${borderColor} flex gap-3`}>
          <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${color}`} />
          <div className="flex-1">
            <p className={`text-xs font-semibold mb-1 ${color}`}>{title}</p>
            <div className="text-sm text-slate-700 leading-relaxed">
              {highlightKeywords(callout.content)}
            </div>
          </div>
        </div>
      )
    }
    // Render paragraf normal dengan keyword highlight
    return <p className="my-2 leading-relaxed">{highlightKeywords(children)}</p>
  }
  return <p className="my-2 leading-relaxed" {...props}>{children}</p>
}

// Komponen untuk list item
function ListItem({ children, ...props }: { children?: ReactNode }) {
  return (
    <li className="ml-4 list-disc text-sm leading-relaxed my-1" {...props}>
      {typeof children === 'string' ? highlightKeywords(children) : children}
    </li>
  )
}

// Komponen untuk code inline
function InlineCode({ children }: { children?: ReactNode }) {
  return (
    <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">
      {children}
    </code>
  )
}

// Komponen untuk code block
function CodeBlock({ children, className }: { children?: ReactNode; className?: string }) {
  const isInline = !className
  if (isInline) {
    return <InlineCode>{children}</InlineCode>
  }
  return (
    <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg my-3 overflow-x-auto text-sm font-mono">
      <code>{children}</code>
    </pre>
  )
}

// Komponen untuk heading
function Heading({ level, children }: { level: number; children?: ReactNode }) {
  const sizes: Record<number, string> = {
    1: 'text-lg font-bold text-slate-900 mt-4 mb-2',
    2: 'text-base font-bold text-slate-900 mt-3 mb-2',
    3: 'text-sm font-semibold text-slate-800 mt-2 mb-1',
    4: 'text-sm font-semibold text-slate-700 mt-2 mb-1',
    5: 'text-sm font-medium text-slate-700 mt-1 mb-1',
    6: 'text-xs font-medium text-slate-600 mt-1 mb-1',
  }
  const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return <>{(() => {
    const Tag = tag
    return <Tag className={sizes[level] || sizes[6]}>{children}</Tag>
  })()}</>
}

// Komponen untuk strong (bold)
function Strong({ children }: { children?: ReactNode }) {
  return <strong className="font-bold text-slate-900">{children}</strong>
}

// Komponen untuk emphasis (italic)
function Emphasis({ children }: { children?: ReactNode }) {
  return <em className="italic text-slate-700">{children}</em>
}

// Komponen untuk blockquote
function Blockquote({ children }: { children?: ReactNode }) {
  return (
    <blockquote className="border-l-4 border-teal-500 bg-teal-50 pl-3 py-2 my-3 italic text-slate-700 text-sm">
      {children}
    </blockquote>
  )
}

// Komponen utama
export const QuestionMarkdown = memo(function QuestionMarkdown({ content }: { content: string }) {
  return (
    <div className="question-markdown text-slate-900 text-base">
      <ReactMarkdown
        components={{
          p: Paragraph as any,
          li: ListItem as any,
          code: CodeBlock as any,
          pre: ({ children }) => <>{children}</>,
          h1: ({ children }) => <Heading level={1}>{children}</Heading>,
          h2: ({ children }) => <Heading level={2}>{children}</Heading>,
          h3: ({ children }) => <Heading level={3}>{children}</Heading>,
          h4: ({ children }) => <Heading level={4}>{children}</Heading>,
          h5: ({ children }) => <Heading level={5}>{children}</Heading>,
          h6: ({ children }) => <Heading level={6}>{children}</Heading>,
          strong: Strong,
          em: Emphasis,
          blockquote: Blockquote,
          ul: ({ children }) => <ul className="my-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 space-y-1 list-decimal list-inside">{children}</ol>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-teal-600 underline hover:text-teal-700">
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-3">
              <table className="min-w-full border border-slate-200 text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-left">{children}</th>,
          td: ({ children }) => <td className="border border-slate-200 px-3 py-1.5">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
})
