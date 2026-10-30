'use client'

import { useEffect, useState } from 'react'

const DEFAULT_RULES = [
  'Participation is strictly limited to eligible IIT Patna students.',
  'Individual participation only — no teams.',
  'One verified submission per participant.',
  'Only the server-recorded successful submission timestamp determines ranking.',
  'Automated scripts, exploitation or attempts to manipulate the leaderboard are prohibited.',
  'Duplicate or fraudulent submissions may result in disqualification.',
  'Participants must follow the official event instructions.',
  "The organizers' decision is final.",
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
    <div>
      <div className="text-center mb-12">
        <p className="badge badge-red mb-4" style={{ margin: '0 auto 1rem' }}>Mandatory</p>
        <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
          Event <span className="gradient-text-magenta">Rules</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '0.95rem' }}>
          By participating, you agree to all the following rules.
        </p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          {rules.map((rule, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '1rem 1.5rem',
                borderBottom: i < rules.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.02)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '')}
            >
              {/* Rule number */}
              <div
                className="font-mono"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--cyan-ghost)',
                  border: '1px solid var(--border-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--cyan)',
                  flexShrink: 0,
                  marginTop: '0.1rem',
                }}
              >
                {i + 1}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                {rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
