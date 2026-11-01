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
    <div className="relative min-h-screen w-full bg-[#eef2f6] text-slate-800 selection:bg-[#ff5e98] selection:text-white font-sans overflow-x-hidden">
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
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Verified Rankings
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Ordered by atomic server-verified decryption time
                </p>
              </div>

              {lastUpdated && (
                <div className="neu-card-sm inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#0072ff]">
                  <span className="w-2 h-2 rounded-full bg-[#0072ff]" />
                  <span>Refreshed at {lastUpdated.toLocaleTimeString('en-IN')}</span>
                </div>
              )}
            </div>

            {!isPublic ? (
              <div className="neu-card rounded-[28px] p-12 text-center">
                <div className="w-14 h-14 rounded-2xl neu-icon-btn mx-auto flex items-center justify-center text-3xl mb-3 text-slate-700">
                  🔒
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-2">Leaderboard Concealed</h2>
                <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
                  Organizers have temporarily hidden rankings. They will become live during the challenge reveal.
                </p>
              </div>
            ) : loading ? (
              <div className="neu-card rounded-[28px] overflow-hidden p-6 space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-12 bg-slate-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : entries.length === 0 ? (
              <div className="neu-card rounded-[28px] p-12 text-center">
                <div className="w-14 h-14 rounded-2xl neu-icon-btn mx-auto flex items-center justify-center text-3xl mb-3 text-[#ff5e98]">
                  ⏳
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-2">No Submissions Recorded Yet</h2>
                <p className="text-xs text-slate-600 mb-6 max-w-md mx-auto font-medium leading-relaxed">
                  The hunt has commenced! Be the very first to unlock THE HIDDEN KEY and claim the prestigious First Blood bounty.
                </p>
                <Link
                  href="/submit"
                  className="neu-btn-gradient-pink inline-flex items-center gap-2 text-white text-xs uppercase tracking-wider font-bold px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <span>Submit Your Answer</span>
                  <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="neu-card rounded-[28px] overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200/60 text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">
                  <div className="col-span-2">Rank</div>
                  <div className="col-span-6">Participant</div>
                  <div className="col-span-4 text-right">Verified Time (IST)</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-slate-100">
                  {entries.map((entry, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${
                        entry.isFirstBlood 
                          ? 'bg-pink-50/50 border-l-4 border-l-[#ff5e98]' 
                          : i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                      } hover:bg-slate-100/50`}
                    >
                      {/* Rank Badge */}
                      <div className="col-span-2 flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black ${
                          entry.rank === 1 
                            ? 'neu-btn-gradient-pink text-white shadow-sm' 
                            : entry.rank === 2 
                              ? 'bg-slate-200 text-slate-800' 
                              : entry.rank === 3 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'neu-icon-btn text-slate-700'
                        }`}>
                          {entry.rank}
                        </span>
                      </div>

                      {/* Participant Name */}
                      <div className="col-span-6 flex flex-col justify-center">
                        <span className="text-sm font-bold text-slate-900 tracking-wide">
                          {entry.displayName}
                        </span>
                        {entry.isFirstBlood && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#ff5e98] mt-0.5">
                            <span>⚡</span>
                            <span>First Blood Champion</span>
                          </span>
                        )}
                      </div>

                      {/* Timestamp */}
                      <div className="col-span-4 text-right">
                        <div className="text-xs font-mono text-[#0072ff] font-bold">
                          {new Date(entry.serverTime).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
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
                className="text-xs font-mono text-slate-500 hover:text-[#ff5e98] transition-colors inline-flex items-center gap-1.5 font-medium"
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
