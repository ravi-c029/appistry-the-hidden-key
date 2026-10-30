'use client'

import { useEffect, useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

const DEFAULT_FAQ: FAQItem[] = [
  { q: 'Who can participate?', a: 'Only eligible IIT Patna students with a valid @iitp.ac.in email address.' },
  { q: 'How do I find the hidden keyword?', a: 'Clone the challenge repository, explore the source code using the custom unlock utility (npm run unlock), and follow the puzzle clues.' },
  { q: 'What tools do I need?', a: 'Node.js (v18+), VS Code or any terminal, and Git for cloning the repository.' },
  { q: 'Can I participate in a team?', a: 'No. This is a strictly individual competition.' },
  { q: 'How is First Blood determined?', a: 'The first valid, verified submission with the correct keyword — determined by the authoritative server-recorded timestamp.' },
  { q: 'Can I submit multiple times?', a: 'Only one valid submission per participant is accepted. Duplicate submissions will be detected and rejected.' },
]

export default function FAQSection() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>(DEFAULT_FAQ)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/event/config')
      .then(r => r.json())
      .then(data => {
        if (data.faq) {
          try {
            const parsed = JSON.parse(data.faq)
            if (Array.isArray(parsed) && parsed.length > 0) setFaqItems(parsed)
          } catch { /* use default */ }
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div>
      <div className="text-center mb-12">
        <p className="badge badge-cyan mb-4" style={{ margin: '0 auto 1rem' }}>Questions</p>
        <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
          Frequently Asked <span className="gradient-text-cyan">Questions</span>
        </h2>
      </div>

      <div
        className="flex flex-col gap-3"
        style={{ maxWidth: 720, margin: '0 auto' }}
      >
        {faqItems.map((item, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? 'open' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--text-primary)' }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>
                {item.q}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  flexShrink: 0,
                  transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  color: 'var(--cyan)',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-answer">
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
