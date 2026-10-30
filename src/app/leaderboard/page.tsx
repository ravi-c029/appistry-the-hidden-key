'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import ParticleCanvas from '@/components/animations/ParticleCanvas'

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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gradient-hero)' }}>
      <ParticleCanvas />
      <Navigation />

      <main style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="container-wide" style={{ maxWidth: 800 }}>

          {/* Header */}
          <div className="text-center mb-12">
            <span className="badge badge-gold mb-4" style={{ margin: '0 auto 1rem' }}>Live Rankings</span>
            <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 800 }}>
              Leader<span className="gradient-text-cyan">board</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Rankings based on server-verified submission timestamps.
            </p>
            {lastUpdated && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Last updated: {lastUpdated.toLocaleTimeString('en-IN')} · Auto-refreshes every 30s
              </p>
            )}
          </div>

          {!isPublic ? (
            <div className="glass-card p-16 text-center">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
              <h2 className="font-display mb-2" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                Leaderboard Hidden
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                The leaderboard will be revealed by organizers once the event begins.
              </p>
            </div>
          ) : loading ? (
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} className="leaderboard-row">
                  <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div>
                    <div className="skeleton" style={{ height: 14, width: '50%', borderRadius: 4, marginBottom: 6 }} />
                    <div className="skeleton" style={{ height: 12, width: 80, borderRadius: 4 }} />
                  </div>
                  <div className="skeleton" style={{ height: 14, width: 80, borderRadius: 4 }} />
                </div>
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏳</div>
              <h2 className="font-display mb-2" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                No Submissions Yet
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Be the first to solve the mystery and claim First Blood!
              </p>
              <a href="/submit" className="btn-primary">Submit Your Answer</a>
            </div>
          ) : (
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              {/* Table header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr auto',
                  gap: '1rem',
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(0,240,255,0.04)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>#</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Participant</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'right' }}>Time</span>
              </div>

              {entries.map((entry, i) => (
                <div
                  key={i}
                  className="leaderboard-row"
                  style={{
                    background: entry.isFirstBlood
                      ? 'linear-gradient(90deg, rgba(245,158,11,0.08), transparent)'
                      : i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    borderLeft: entry.isFirstBlood ? '3px solid var(--gold)' : '3px solid transparent',
                  }}
                >
                  <div className={`rank-badge ${entry.rank <= 3 ? `rank-${entry.rank}` : 'rank-other'}`}>
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                  </div>

                  <div>
                    <div className="font-display" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {entry.displayName}
                    </div>
                    {entry.isFirstBlood && (
                      <span className="badge badge-gold" style={{ fontSize: '0.62rem', marginTop: '0.25rem' }}>
                        🩸 First Blood
                      </span>
                    )}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {new Date(entry.serverTime).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>
                      {new Date(entry.serverTime).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
