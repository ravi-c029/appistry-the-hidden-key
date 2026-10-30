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
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="badge badge-cyan mb-3">Live</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            Leader<span className="gradient-text-cyan">board</span>
          </h2>
        </div>
        <Link href="/leaderboard" className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
          View All
        </Link>
      </div>

      {!isPublic ? (
        <div className="glass-card p-12 text-center">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <p style={{ color: 'var(--text-secondary)' }}>Leaderboard will be revealed when the event is live.</p>
        </div>
      ) : loading ? (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="leaderboard-row">
              <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%' }} />
              <div className="skeleton" style={{ height: 16, borderRadius: 4, width: '60%' }} />
              <div className="skeleton" style={{ height: 14, borderRadius: 4, width: 100 }} />
            </div>
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <p className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No submissions yet
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>Be the first to solve the mystery and claim First Blood!</p>
        </div>
      ) : (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          {entries.map((entry, i) => (
            <div
              key={i}
              className="leaderboard-row"
              style={{
                background: entry.isFirstBlood
                  ? 'linear-gradient(90deg, rgba(245,158,11,0.08), transparent)'
                  : undefined,
              }}
            >
              {/* Rank */}
              <div className={`rank-badge ${entry.rank <= 3 ? `rank-${entry.rank}` : 'rank-other'}`}>
                {entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank - 1] : `#${entry.rank}`}
              </div>

              {/* Name */}
              <div>
                <div
                  className="font-display"
                  style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}
                >
                  {entry.displayName}
                </div>
                {entry.isFirstBlood && (
                  <span className="badge badge-gold" style={{ marginTop: '0.25rem', fontSize: '0.65rem' }}>
                    🩸 First Blood
                  </span>
                )}
              </div>

              {/* Time */}
              <div style={{ textAlign: 'right' }}>
                <div
                  className="font-mono"
                  style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                >
                  {new Date(entry.serverTime).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {new Date(entry.serverTime).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'short'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
