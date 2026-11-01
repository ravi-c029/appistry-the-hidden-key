'use client'

import { useEffect, useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

const DEFAULT_FAQ: FAQItem[] = [
  { 
    q: 'Who is eligible to participate in the mystery hunt?', 
    a: 'Participation is strictly open to enrolled students of IIT Patna using their official @iitp.ac.in credentials to verify and rank on the leaderboard.' 
  },
  { 
    q: 'How do I locate and unlock the hidden key?', 
    a: 'Clone the challenge repository, inspect commit history and workflow clues, deduce the mystery passphrase, and run `npm run unlock` on your local terminal.' 
  },
  { 
    q: 'What tools and environment are required?', 
    a: 'Node.js (v18+), Git for cloning, and any standard code editor or terminal (e.g. VS Code).' 
  },
  { 
    q: 'Can I collaborate or submit as a team?', 
    a: 'No. This challenge is strictly individual. Shared accounts or proxy submissions are monitored and subject to disqualification.' 
  },
  { 
    q: 'How is the First Blood Champion determined?', 
    a: 'First Blood is awarded to the very first participant whose discovered keyword verifies successfully against atomic server timestamps.' 
  },
  { 
    q: 'Can I submit multiple times?', 
    a: 'Each participant has a single verified submission slot. Rate-limiting strictly protects the verification gateway against automated spam.' 
  },
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
            const parsed = Array.isArray(data.faq) ? data.faq : JSON.parse(data.faq)
            if (Array.isArray(parsed) && parsed.length > 0) setFaqItems(parsed)
          } catch { /* use default */ }
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="neu-card-sm text-xs text-[#0072ff] tracking-widest uppercase font-bold px-5 py-2 rounded-full inline-block">
          Support &amp; FAQ
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase mt-4">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0072ff] to-[#ff5e98]">Questions</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto font-medium">
          Operational details, eligibility rules, and unlock guidelines.
        </p>
      </div>

      {/* Sleek Neuomorphic Unified Card (Matches Reference Image UI) */}
      <div className="max-w-[820px] mx-auto neu-card rounded-[28px] p-4 sm:p-6 divide-y divide-slate-100">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} className="py-2 first:pt-0 last:pb-0 transition-colors">
              <button
                className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer rounded-2xl hover:bg-slate-50/80 transition-colors group"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide group-hover:text-slate-900">
                    {item.q}
                  </span>
                </div>

                <div className={`w-7 h-7 rounded-full neu-icon-btn flex items-center justify-center shrink-0 transition-all ${
                  isOpen ? 'text-[#ff5e98] rotate-180 bg-pink-50' : 'text-slate-500'
                }`}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 pl-12 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal animate-fadeIn">
                  <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100/80 shadow-[inset_1px_1px_3px_rgba(166,180,200,0.15)]">
                    {item.a}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
