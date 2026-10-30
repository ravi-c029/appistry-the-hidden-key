'use client'

import { useEffect, useState } from 'react'

interface Hint {
  id: string
  title: string
  content: string
  order: number
  publishedAt: string | null
}

export default function HintsSection() {
  const [hints, setHints] = useState<Hint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hints/public')
      .then(r => r.json())
      .then(data => setHints(data.hints ?? []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="text-center mb-12">
        <p className="badge badge-magenta mb-4" style={{ margin: '0 auto 1rem' }}>Admin Released</p>
        <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
          Clues & <span className="gradient-text-magenta">Hints</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '0.95rem' }}>
          Hints will be released by organizers during the event.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[1, 2].map(i => (
            <div key={i} className="hint-card">
              <div className="skeleton" style={{ height: 18, width: '60%', borderRadius: 4, marginBottom: '0.75rem' }} />
              <div className="skeleton" style={{ height: 60, borderRadius: 4 }} />
            </div>
          ))}
        </div>
      ) : hints.length === 0 ? (
        <div className="glass-card p-12 text-center" style={{ maxWidth: 500, margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔮</div>
          <p className="font-display" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No hints released yet
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Organizers will release hints during the event. Stay tuned.
          </p>
        </div>
      ) : (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {hints.map((hint, i) => (
            <div key={hint.id} className="hint-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-magenta">Hint #{hint.order || i + 1}</span>
                {hint.publishedAt && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {new Date(hint.publishedAt).toLocaleDateString('en-IN')}
                  </span>
                )}
              </div>
              <h3 className="font-display mb-2" style={{ fontSize: '1rem', fontWeight: 700 }}>
                {hint.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {hint.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
