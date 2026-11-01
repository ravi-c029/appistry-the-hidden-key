'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AntiInspection from '@/components/security/AntiInspection'
import RibbonWaves from '@/components/animations/RibbonWaves'
import CyberGrid from '@/components/animations/CyberGrid'
import CyberFrameStage from '@/components/layout/CyberFrameStage'

interface LeaderboardEntry {
  rank: number
  displayName: string
  serverTime: string
  isFirstBlood: boolean
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [isPublic, setIsPublic] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchLeaderboard = () => {
    fetch('/api/leaderboard/public')
      .then(r => r.json())
      .then(data => {
        setIsPublic(data.isPublic ?? true)
        setEntries(data.entries ?? [])
        setLastUpdated(new Date())
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchLeaderboard()
    const interval = setInterval(fetchLeaderboard, 30000)
    return () => clearInterval(interval)
  }, [])

  const firstBloodChamp = entries.find(e => e.isFirstBlood)

  return (
    <div className="relative min-h-screen w-full bg-[#030612] text-white selection:bg-[#00d2ff] selection:text-black font-sans overflow-x-hidden">
      <AntiInspection />
      <RibbonWaves />
      <CyberGrid />

      <main className="relative z-10 py-6 sm:py-10">
        <CyberFrameStage
          activeNav="leaderboard"
          characterImage="/cyber-hacker-blue.png"
          titleBackdrop={{
            left: 'HALL OF',
            right: 'CHAMPIONS',
          }}
          leftCallout={{
            title: 'Atomic Timestamps',
            description: 'Microsecond precision server logging directly timestamped on verified decryption.',
          }}
          rightContent={{
            badge: 'Live Leaderboard',
            title: 'HALL OF',
            highlightTitle: 'CHAMPIONS',
            description: 'Real-time standings strictly determined by atomic server-side key validation. First Blood secures eternal honor in IIT Patna records.',
            buttonText: 'Submit Your Key',
            buttonHref: '/submit',
          }}
          bottomCards={[
            {
              type: 'stat-image',
              image: '/cyber-hacker-blue.png',
              stat: firstBloodChamp ? 'Claimed' : 'Unclaimed',
              label: 'First Blood Bounty',
              sublabel: firstBloodChamp ? `Claimed by ${firstBloodChamp.displayName}` : 'Be the first solver to capture the crown',
            },
            {
              type: 'feature',
              subtitle: 'Verification Engine',
              title: 'Server-Side Validation',
              description: 'Zero plaintext stored client-side. Decryption keys are verified via scrypt and AES-256 authenticated tags.',
            },
            {
              type: 'stat-badge',
              stat: entries.length > 0 ? `${entries.length}` : 'Live',
              label: entries.length > 0 ? 'Verified Solves' : 'Hunt Active',
            },
          ]}
        >
          {/* Detailed Leaderboard Table Section */}
          <div className="max-w-[960px] mx-auto py-4">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Verified Rankings
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Ordered by atomic server-verified decryption time
                </p>
              </div>

              {lastUpdated && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#00d2ff]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff]" />
                  <span>Refreshed at {lastUpdated.toLocaleTimeString('en-IN')}</span>
                </div>
              )}
            </div>

            {!isPublic ? (
              <div className="rounded-[20px] bg-[#070e24]/90 border border-white/10 p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="text-4xl mb-3">🔒</div>
                <h2 className="text-xl font-bold text-white mb-2">Leaderboard Concealed</h2>
                <p className="text-xs text-white/60">
                  Organizers have temporarily hidden rankings. They will become live during the challenge reveal.
                </p>
              </div>
            ) : loading ? (
              <div className="rounded-[20px] bg-[#070e24]/90 border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : entries.length === 0 ? (
              <div className="rounded-[20px] bg-[#070e24]/90 border border-[#00d2ff]/20 p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="text-4xl mb-3">⏳</div>
                <h2 className="text-xl font-bold text-white mb-2">No Submissions Recorded Yet</h2>
                <p className="text-xs text-white/60 mb-6 max-w-md mx-auto">
                  The hunt has commenced! Be the very first to unlock THE HIDDEN KEY and claim the prestigious First Blood bounty.
                </p>
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] via-[#2563eb] to-[#7942f7] text-white text-xs uppercase tracking-wider font-bold px-8 py-3 rounded-full hover:opacity-95 transition-all shadow-[0_4px_20px_rgba(0,210,255,0.4)]"
                >
                  <span>Submit Your Answer</span>
                  <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="rounded-[20px] bg-[#070e24]/90 border border-[#00d2ff]/20 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-white/[0.04] border-b border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-white/50">
                  <div className="col-span-2">Rank</div>
                  <div className="col-span-6">Participant</div>
                  <div className="col-span-4 text-right">Verified Time (IST)</div>
                </div>

                {/* Table Body */}
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
                      {/* Rank Badge */}
                      <div className="col-span-2 flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          entry.rank === 1 
                            ? 'bg-gradient-to-r from-[#00d2ff] to-[#2563eb] text-white shadow-[0_0_15px_rgba(0,210,255,0.6)]' 
                            : entry.rank === 2 
                              ? 'bg-slate-300 text-black' 
                              : entry.rank === 3 
                                ? 'bg-amber-600 text-white' 
                                : 'bg-white/10 text-white/70'
                        }`}>
                          {entry.rank}
                        </span>
                      </div>

                      {/* Participant Name */}
                      <div className="col-span-6 flex flex-col justify-center">
                        <span className="text-sm font-bold text-white tracking-wide">
                          {entry.displayName}
                        </span>
                        {entry.isFirstBlood && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#00d2ff] mt-0.5">
                            <span>⚡</span>
                            <span>First Blood Champion</span>
                          </span>
                        )}
                      </div>

                      {/* Timestamp */}
                      <div className="col-span-4 text-right">
                        <div className="text-xs font-mono text-[#00d2ff] font-semibold">
                          {new Date(entry.serverTime).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </div>
                        <div className="text-[10px] text-white/40 mt-0.5 font-mono">
                          {new Date(entry.serverTime).toLocaleDateString('en-IN', {
                            day: '2-digit',
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

            {/* Back to Home Link */}
            <div className="text-center mt-8">
              <Link
                href="/"
                className="text-xs font-mono text-white/50 hover:text-[#00d2ff] transition-colors inline-flex items-center gap-1.5"
              >
                <span>←</span>
                <span>Back to Main Stage</span>
              </Link>
            </div>

          </div>
        </CyberFrameStage>
      </main>
    </div>
  )
}
