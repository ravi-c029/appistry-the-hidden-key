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
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const items = [
    {
      value: stats?.totalSubmissions ?? '0',
      label: 'Total Submissions',
      sublabel: 'Answers evaluated by server',
      accent: '#00d2ff',
    },
    {
      value: stats?.validSubmissions ?? '0',
      label: 'Verified Solves',
      sublabel: 'Cryptographically correct keys',
      accent: '#2563eb',
    },
    {
      value: stats?.activeVisitors ?? '1',
      label: 'Active Participants',
      sublabel: 'Live connected sessions',
      accent: '#7942f7',
    },
    {
      value: stats?.firstBloodClaimed ? 'Claimed' : 'Unclaimed',
      label: 'First Blood Bounty',
      sublabel: stats?.firstBloodClaimed ? 'Champion logged on server' : 'Awaiting fastest solver',
      accent: stats?.firstBloodClaimed ? '#ff007f' : '#00d2ff',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative rounded-[20px] bg-[#070e24]/85 border border-white/10 p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] overflow-hidden transition-all hover:border-[#00d2ff]/40"
        >
          {/* Subtle Corner Notches */}
          <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-br-sm" style={{ backgroundColor: item.accent }} />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none flex items-end justify-end">
            <div className="w-1.5 h-1.5 rounded-tl-sm" style={{ backgroundColor: item.accent }} />
          </div>

          {/* Metric Value */}
          <div
            className="font-mono text-3xl sm:text-4xl font-black tracking-tight"
            style={{ color: item.accent }}
          >
            {item.value}
          </div>

          {/* Label */}
          <div className="text-sm font-bold text-white tracking-wide mt-2">
            {item.label}
          </div>

          {/* Sublabel */}
          <div className="text-xs text-white/50 leading-relaxed mt-1 font-light">
            {item.sublabel}
          </div>
        </div>
      ))}
    </div>
  )
}
