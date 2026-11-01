'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const DEFAULT_RULES = [
  'Participation is strictly limited to eligible IIT Patna students using @iitp.ac.in credentials.',
  'Individual participation only — teams, proxy accounts, or joint solvers are not permitted.',
  'One verified submission per participant. Ensure your keyword is accurate before confirming.',
  'Leaderboard rankings are determined strictly by authoritative server-recorded verification timestamps.',
  'Automated scripts, dictionary attacks, or endpoint spamming will result in immediate permanent disqualification.',
  'Zero secret exposure client-side: all cryptographic payload decryption occurs offline via Node.js CLI.',
  'Anti-tampering heuristics monitor audit logs for fraudulent timestamps or payload manipulation.',
  "The organizers' decision from APPISTRY (STC IIT Patna Hybrid) is final and binding.",
]

export default function RulesSection() {
  const [rules, setRules] = useState<string[]>(DEFAULT_RULES)

  useEffect(() => {
    fetch('/api/event/config')
      .then(r => r.json())
      .then(data => {
        if (data.rules) {
          try {
            const parsed = JSON.parse(data.rules)
            if (Array.isArray(parsed) && parsed.length > 0) setRules(parsed)
          } catch { /* use default */ }
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="neu-card-sm text-xs text-[#ff5e98] tracking-widest uppercase font-bold px-5 py-2 rounded-full inline-block">
          Official Guidelines
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase mt-4">
          Challenge <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e98] to-[#0072ff]">Rules</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto font-medium">
          Standard code of conduct and regulations enforced by APPISTRY — STC IIT Patna Hybrid.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1000px] mx-auto mb-10">
        {rules.map((rule, i) => (
          <div
            key={i}
            className="neu-card rounded-[24px] p-5 sm:p-6 transition-all hover:scale-[1.01]"
          >
            <div className="flex items-start gap-4">
              <span className="w-9 h-9 rounded-full neu-icon-btn text-slate-800 font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {rule}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* First Blood Guarantee Banner */}
      <div className="neu-card rounded-[28px] p-7 sm:p-9 text-center max-w-[800px] mx-auto">
        <div className="w-12 h-12 rounded-2xl neu-icon-btn mx-auto flex items-center justify-center text-2xl mb-3 text-[#ff5e98]">
          ⚡
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
          The First Blood Bounty
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-6 font-medium leading-relaxed">
          The fastest solver to verify their secret key on the server earns the First Blood title, recognized on the official IIT Patna leaderboard.
        </p>
        <Link
          href="/rules"
          className="neu-btn-gradient-pink inline-flex items-center gap-2 text-white text-xs uppercase tracking-wider font-bold px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <span>View Complete Rulebook</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
