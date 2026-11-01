'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface LeaderboardEntry {
  rank: number
  displayName: string
  serverTime: string
  isFirstBlood: boolean
}

export default function LeaderboardPreview() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [isPublic, setIsPublic] = useState(true)

  useEffect(() => {
    fetch('/api/leaderboard/public?limit=5')
      .then(r => r.json())
      .then(data => {
        setIsPublic(data.isPublic ?? true)
        setEntries(data.entries ?? [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs text-[#00d2ff] tracking-widest uppercase font-bold px-4 py-1.5 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10">
            Live Rankings
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mt-4">
            Hall of <span className="text-[#00d2ff]">Champions</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Standings determined by authoritative server-side key validation.
          </p>
        </div>

        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] via-[#2563eb] to-[#7942f7] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:opacity-90 transition-all shadow-[0_2px_15px_rgba(0,210,255,0.3)] shrink-0 w-fit"
        >
          <span>View Full Leaderboard</span>
          <span>→</span>
        </Link>
      </div>

      {/* Main Table Container */}
      <div className="relative rounded-[22px] bg-[#070e24]/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">

        {!isPublic ? (
          <div className="p-12 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="text-base font-bold text-white mb-1">Rankings Temporarily Hidden</h3>
            <p className="text-xs text-white/50">Leaderboard will be revealed during the event window.</p>
          </div>
        ) : loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="p-10 sm:p-14 text-center">
            <div className="text-4xl mb-3">⏳</div>
            <h3 className="text-lg font-bold text-white tracking-wide mb-2">
              No Submissions Recorded Yet
            </h3>
            <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto mb-6 font-light">
              The hunt has commenced. Be the first participant to decode the key and claim First Blood.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-white font-bold text-xs uppercase tracking-wider px-7 py-2.5 rounded-full transition-all shadow-[0_2px_15px_rgba(0,210,255,0.3)]"
            >
              <span>Submit Discovered Key</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          <div>
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-white/[0.03] border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-white/50">
              <div className="col-span-2">Rank</div>
              <div className="col-span-6">Participant</div>
              <div className="col-span-4 text-right">Time (IST)</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${
                    entry.isFirstBlood 
                      ? 'bg-[#00d2ff]/10 border-l-4 border-l-[#00d2ff]' 
                      : i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                  } hover:bg-white/[0.04]`}
                >
                  {/* Rank */}
                  <div className="col-span-2 flex items-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                      entry.rank === 1
                        ? 'bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-white shadow-[0_0_12px_rgba(0,210,255,0.5)]'
                        : entry.rank === 2
                          ? 'bg-slate-300 text-black'
                          : entry.rank === 3
                            ? 'bg-amber-600 text-white'
                            : 'bg-white/10 text-white/70'
                    }`}>
                      {entry.rank}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="col-span-6 flex flex-col justify-center">
                    <span className="text-sm font-bold text-white tracking-wide">
                      {entry.displayName}
                    </span>
                    {entry.isFirstBlood && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#00d2ff] mt-0.5">
                        <span>First Blood Champion</span>
                      </span>
                    )}
                  </div>

                  {/* Time */}
                  <div className="col-span-4 text-right">
                    <div className="text-xs font-mono text-[#00d2ff]">
                      {new Date(entry.serverTime).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </div>
                    <div className="text-[11px] text-white/40 mt-0.5">
                      {new Date(entry.serverTime).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
