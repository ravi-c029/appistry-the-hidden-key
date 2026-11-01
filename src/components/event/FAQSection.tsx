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
        <span className="text-xs text-[#00d2ff] tracking-widest uppercase font-bold px-4 py-1.5 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10">
          Support &amp; FAQ
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mt-4">
          Frequently Asked <span className="text-[#00d2ff]">Questions</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-lg mx-auto">
          Operational details, eligibility rules, and unlock guidelines.
        </p>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-3 max-w-[800px] mx-auto">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className={`rounded-[18px] bg-[#070e24]/85 border transition-all overflow-hidden ${
                isOpen ? 'border-[#00d2ff]/40 shadow-[0_15px_35px_rgba(0,210,255,0.1)]' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer transition-colors"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-white tracking-wide pr-4">
                  {item.q}
                </span>

                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  isOpen ? 'border-[#00d2ff] text-[#00d2ff] bg-[#00d2ff]/10 rotate-180' : 'border-white/20 text-white/50'
                }`}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-white/[0.06] text-xs sm:text-sm text-white/70 leading-relaxed font-light">
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
