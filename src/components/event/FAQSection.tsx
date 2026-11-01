'use client'

import { useEffect, useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

const DEFAULT_FAQ: FAQItem[] = [
  { q: 'Who is eligible to participate in the mystery hunt?', a: 'Only active, enrolled students of IIT Patna using their official @iitp.ac.in email address are eligible to win and rank on the verified leaderboard.' },
  { q: 'How do I locate and unlock the hidden key?', a: 'Clone the challenge repository, inspect commits and build workflows, identify the mystery passphrase, and run `npm run unlock` on your local terminal.' },
  { q: 'What tools and environment are required?', a: 'Node.js (v18+), Git for repository cloning, and any standard code editor or terminal (e.g. VS Code).' },
  { q: 'Can I collaborate or submit as a team?', a: 'No. This challenge is strictly individual. Shared accounts and proxy submissions are monitored and subject to disqualification.' },
  { q: 'How is the First Blood Champion determined?', a: 'The First Blood Champion is granted to the very first participant whose discovered keyword verifies successfully against authoritative atomic server logs.' },
  { q: 'Can I submit multiple times?', a: 'Each participant has a single verified submission slot. Rate-limiting protects the verification gateway against brute-force attacks.' },
]

export default function FAQSection() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>(DEFAULT_FAQ)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="neu-card-sm text-xs text-[#0072ff] tracking-widest uppercase font-bold px-5 py-2 rounded-full inline-block">
          Support &amp; FAQ
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase mt-4">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0072ff] to-[#ff5e98]">Questions</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto font-medium">
          Operational details, eligibility rules, and unlock guidelines.
        </p>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-4 max-w-[800px] mx-auto">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className={`neu-card rounded-[22px] transition-all overflow-hidden ${
                isOpen ? 'ring-2 ring-[#0072ff]/30' : ''
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer transition-colors"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 tracking-wide pr-4">
                  {item.q}
                </span>

                <div className={`w-8 h-8 rounded-full neu-icon-btn flex items-center justify-center shrink-0 transition-transform ${
                  isOpen ? 'text-[#ff5e98] rotate-180' : 'text-slate-600'
                }`}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
