'use client'

import { useEffect, useState } from 'react'

interface Stats {
  totalSubmissions: number
  validSubmissions: number
  activeVisitors: number
  firstBloodClaimed: boolean
}

export default function LiveStats() {
  const [stats, setStats] = useState<Stats | null>(null)

  const fetchStats = () => {
    fetch('/api/stats/public')
      .then(r => r.json())
      .then(setStats)
      .catch(() => {})
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 30000) // refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const items = [
    { value: stats?.totalSubmissions ?? '—', label: 'Submissions' },
    { value: stats?.validSubmissions ?? '—', label: 'Valid Answers' },
    { value: stats?.activeVisitors ?? '—', label: 'Active Now' },
    {
      value: stats?.firstBloodClaimed ? '🩸 Claimed' : 'Not yet',
      label: 'First Blood',
      highlight: stats?.firstBloodClaimed,
    },
  ]

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-6"
      style={{ padding: '1.5rem 0' }}
    >
      {items.map(({ value, label, highlight }, i) => (
        <div
          key={i}
          className="text-center"
          style={{ minWidth: '80px' }}
        >
          <div
            className="font-display"
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: highlight ? 'var(--gold)' : 'var(--text-primary)',
              lineHeight: 1,
              textShadow: highlight ? 'var(--glow-gold)' : undefined,
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginTop: '0.25rem',
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
