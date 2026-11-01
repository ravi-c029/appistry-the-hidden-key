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
        <span className="text-xs text-[#00d2ff] tracking-widest uppercase font-bold px-4 py-1.5 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10">
          Official Guidelines
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mt-4">
          Challenge <span className="text-[#00d2ff]">Rules</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-lg mx-auto">
          Standard code of conduct and regulations enforced by APPISTRY — STC IIT Patna Hybrid.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto mb-8">
        {rules.map((rule, i) => (
          <div
            key={i}
            className="relative rounded-[20px] bg-[#070e24]/85 border border-white/10 p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all hover:border-[#00d2ff]/40"
          >
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/25 text-[#00d2ff] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                {rule}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* First Blood Guarantee Banner */}
      <div className="relative rounded-[24px] bg-gradient-to-r from-[#0a1835]/90 via-[#070e24]/90 to-[#120a2e]/90 border border-[#00d2ff]/30 p-6 sm:p-8 text-center max-w-[800px] mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="text-3xl mb-2">⚡</div>
        <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
          The First Blood Bounty
        </h3>
        <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto mb-5 font-light leading-relaxed">
          The fastest solver to verify their secret key on the server earns the First Blood title, recognized on the official IIT Patna leaderboard.
        </p>
        <Link
          href="/rules"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] via-[#2563eb] to-[#7942f7] text-white text-xs uppercase tracking-wider font-bold px-7 py-2.5 rounded-full hover:opacity-95 transition-all shadow-[0_2px_15px_rgba(0,210,255,0.4)]"
        >
          <span>View Complete Rulebook</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
