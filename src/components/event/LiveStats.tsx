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

  const totalSubs = Number(stats?.totalSubmissions || 0)
  const totalSubsPct = Math.min(Math.round((totalSubs / 100) * 100), 100)

  const validSubs = Number(stats?.validSubmissions || 0)
  const validSubsPct = Math.min(Math.round((validSubs / 20) * 100), 100)

  const activeVisitors = Number(stats?.activeVisitors || 0)
  const activePct = Math.min(Math.round((activeVisitors / 100) * 100), 100)

  const firstBloodClaimed = Boolean(stats?.firstBloodClaimed)
  const firstBloodPct = firstBloodClaimed ? 100 : 0

  const items = [
    {
      value: totalSubs,
      label: 'Total Submissions',
      sublabel: 'Answers evaluated by server',
      accent: '#00b4d8',
      barGradient: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)',
      pct: `${totalSubsPct}%`,
      progressLabel: `${totalSubs}/100`,
    },
    {
      value: validSubs,
      label: 'Verified Solves',
      sublabel: 'Cryptographically correct keys',
      accent: '#2563eb',
      barGradient: 'linear-gradient(90deg, #2563eb 0%, #7942f7 100%)',
      pct: `${validSubsPct}%`,
      progressLabel: `${validSubs}/20`,
    },
    {
      value: activeVisitors,
      label: 'Active Participants',
      sublabel: 'Live connected sessions',
      accent: '#ff5e98',
      barGradient: 'linear-gradient(90deg, #ff5e98 0%, #ff758c 100%)',
      pct: `${activePct}%`,
      progressLabel: `${activeVisitors}/100`,
    },
    {
      value: firstBloodClaimed ? 'Claimed' : 'Unclaimed',
      label: 'First Blood Bounty',
      sublabel: firstBloodClaimed ? 'Champion logged on server' : 'Awaiting fastest solver',
      accent: firstBloodClaimed ? '#ff5e98' : '#f59e0b',
      barGradient: firstBloodClaimed
        ? 'linear-gradient(90deg, #ff5e98 0%, #ff758c 100%)'
        : 'linear-gradient(90deg, #f6d365 0%, #fda085 100%)',
      pct: `${firstBloodPct}%`,
      progressLabel: firstBloodClaimed ? '1/1' : '0/1',
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

          {/* Progress Header with Ratio */}
          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400 font-medium">
            <span>Progress</span>
            <span className="font-bold text-slate-600">{item.progressLabel}</span>
          </div>

          {/* Soft Inset Pill Progress Bar (Exact match to reference image slider pills) */}
          <div className="mt-1.5 w-full h-3 rounded-full bg-[#edf2f7] shadow-[inset_2px_2px_4px_rgba(166,180,200,0.3),inset_-2px_-2px_4px_#ffffff] p-0.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: item.pct,
                background: item.barGradient,
                boxShadow: item.pct !== '0%' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
