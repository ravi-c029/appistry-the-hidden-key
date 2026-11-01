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
      accent: '#00b4d8',
      barGradient: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)',
      pct: '100%',
    },
    {
      value: stats?.validSubmissions ?? '0',
      label: 'Verified Solves',
      sublabel: 'Cryptographically correct keys',
      accent: '#2563eb',
      barGradient: 'linear-gradient(90deg, #2563eb 0%, #7942f7 100%)',
      pct: stats?.validSubmissions ? '100%' : '15%',
    },
    {
      value: stats?.activeVisitors ?? '1',
      label: 'Active Participants',
      sublabel: 'Live connected sessions',
      accent: '#ff5e98',
      barGradient: 'linear-gradient(90deg, #ff5e98 0%, #ff758c 100%)',
      pct: '85%',
    },
    {
      value: stats?.firstBloodClaimed ? 'Claimed' : 'Unclaimed',
      label: 'First Blood Bounty',
      sublabel: stats?.firstBloodClaimed ? 'Champion logged on server' : 'Awaiting fastest solver',
      accent: stats?.firstBloodClaimed ? '#ff5e98' : '#f59e0b',
      barGradient: stats?.firstBloodClaimed
        ? 'linear-gradient(90deg, #ff5e98 0%, #ff758c 100%)'
        : 'linear-gradient(90deg, #f6d365 0%, #fda085 100%)',
      pct: stats?.firstBloodClaimed ? '100%' : '35%',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative rounded-[28px] bg-white border border-white/90 p-6 shadow-[10px_10px_25px_rgba(166,180,200,0.35),-10px_-10px_25px_#ffffff] transition-all hover:-translate-y-1"
        >
          {/* Metric Value */}
          <div
            className="font-mono text-3xl sm:text-4xl font-black tracking-tight"
            style={{ color: item.accent }}
          >
            {item.value}
          </div>

          {/* Label */}
          <div className="text-sm font-bold text-slate-800 tracking-wide mt-2">
            {item.label}
          </div>

          {/* Sublabel */}
          <div className="text-xs text-slate-500 leading-relaxed mt-1 font-normal">
            {item.sublabel}
          </div>

          {/* Soft Inset Pill Progress Bar (Exact match to reference image slider pills) */}
          <div className="mt-4 w-full h-3 rounded-full bg-[#edf2f7] shadow-[inset_2px_2px_4px_rgba(166,180,200,0.3),inset_-2px_-2px_4px_#ffffff] p-0.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: item.pct,
                background: item.barGradient,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
