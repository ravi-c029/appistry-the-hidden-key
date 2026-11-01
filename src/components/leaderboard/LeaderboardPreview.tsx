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
          <span className="text-xs text-[#00b4d8] tracking-widest uppercase font-bold px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-[2px_2px_6px_rgba(166,180,200,0.25),-2px_-2px_6px_#ffffff]">
            Live Rankings
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase mt-4">
            Hall of <span className="text-[#00b4d8]">Champions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standings determined by authoritative server-side key validation.
          </p>
        </div>

        <Link
          href="/leaderboard"
          className="neu-btn-gradient-blue text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:opacity-95 transition-all shrink-0 w-fit inline-flex items-center gap-2"
        >
          <span>View Full Leaderboard</span>
          <span>→</span>
        </Link>
      </div>

      {/* Main Table Container (Soft Neuomorphic Card) */}
      <div className="relative rounded-[28px] bg-white border border-white/90 shadow-[10px_10px_25px_rgba(166,180,200,0.35),-10px_-10px_25px_#ffffff] overflow-hidden">

        {!isPublic ? (
          <div className="p-12 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Rankings Temporarily Hidden</h3>
            <p className="text-xs text-slate-500">Leaderboard will be revealed during the event window.</p>
          </div>
        ) : loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="p-10 sm:p-14 text-center">
            <div className="text-4xl mb-3">⏳</div>
            <h3 className="text-lg font-bold text-slate-900 tracking-wide mb-2">
              No Submissions Recorded Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 font-normal">
              The hunt has commenced. Be the first participant to decode the key and claim First Blood.
            </p>
            <Link
              href="/submit"
              className="neu-btn-gradient-pink text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full hover:opacity-95 transition-all inline-flex items-center gap-2"
            >
              <span>Submit Discovered Key</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          <div>
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              <div className="col-span-2">Rank</div>
              <div className="col-span-6">Participant</div>
              <div className="col-span-4 text-right">Time (IST)</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${
                    entry.isFirstBlood 
                      ? 'bg-rose-50/50 border-l-4 border-l-[#ff5e98]' 
                      : i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/40'
                  } hover:bg-slate-50`}
                >
                  {/* Rank */}
                  <div className="col-span-2 flex items-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-sm ${
                      entry.rank === 1
                        ? 'neu-btn-gradient-blue text-white'
                        : entry.rank === 2
                          ? 'bg-slate-200 text-slate-800'
                          : entry.rank === 3
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-600'
                    }`}>
                      {entry.rank}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="col-span-6 flex flex-col justify-center">
                    <span className="text-sm font-bold text-slate-900 tracking-wide">
                      {entry.displayName}
                    </span>
                    {entry.isFirstBlood && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ff5e98] mt-0.5">
                        <span>★ First Blood Champion</span>
                      </span>
                    )}
                  </div>

                  {/* Time */}
                  <div className="col-span-4 text-right">
                    <div className="text-xs font-mono font-bold text-[#0284c7]">
                      {new Date(entry.serverTime).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
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
