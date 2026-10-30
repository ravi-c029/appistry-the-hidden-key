'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import ParticleCanvas from '@/components/animations/ParticleCanvas'
import Link from 'next/link'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function SubmitPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [keyword, setKeyword] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')
  const [rank, setRank] = useState<number | null>(null)
  const [isFirstBlood, setIsFirstBlood] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (state === 'loading') return
    setState('loading')
    setMessage('')

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), keyword: keyword.trim() }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setState('success')
        setRank(data.rank ?? null)
        setIsFirstBlood(data.isFirstBlood ?? false)
        setMessage(data.message || 'Your submission has been recorded!')
      } else {
        setState('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setState('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gradient-hero)' }}>
      <ParticleCanvas />
      <Navigation />

      <main style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Header */}
          <div className="text-center mb-10">
            <span className="badge badge-gold mb-4" style={{ margin: '0 auto 1rem' }}>
              Submission Portal
            </span>
            <h1 className="font-display mb-3" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Submit Your <span className="gradient-text-cyan">Answer</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Enter the secret keyword you discovered through the challenge.
              Your submission time is recorded by the server.
            </p>
          </div>

          {state === 'success' ? (
            /* ── Success State ── */
            <div
              className="glass-card p-10 text-center unlock-success"
              style={{ borderColor: isFirstBlood ? 'rgba(245,158,11,0.5)' : 'rgba(34,197,94,0.3)' }}
            >
              {isFirstBlood ? (
                <>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🩸</div>
                  <h2 className="font-display gradient-text-gold mb-3" style={{ fontSize: '2rem', fontWeight: 800 }}>
                    FIRST BLOOD!
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    You are the FIRST to crack THE HIDDEN KEY!<br />
                    Your name will live in APPISTRY legend.
                  </p>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                  <h2 className="font-display gradient-text-cyan mb-3" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                    Submission Accepted!
                  </h2>
                </>
              )}

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {message}
              </p>

              {rank && (
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: 'var(--cyan)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Your Rank: #{rank}
                </div>
              )}

              <Link href="/leaderboard" className="btn-primary">
                View Leaderboard
              </Link>
            </div>
          ) : (
            /* ── Form ── */
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

                <div>
                  <label htmlFor="submit-name" className="input-label">Full Name</label>
                  <input
                    id="submit-name"
                    type="text"
                    className="input-field"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    minLength={2}
                    maxLength={100}
                    disabled={state === 'loading'}
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="submit-email" className="input-label">
                    IIT Patna Student Email
                  </label>
                  <input
                    id="submit-email"
                    type="email"
                    className="input-field"
                    placeholder="yourname@iitp.ac.in"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={state === 'loading'}
                    autoComplete="email"
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
                    Only @iitp.ac.in email addresses are accepted.
                  </p>
                </div>

                <div>
                  <label htmlFor="submit-keyword" className="input-label">
                    Discovered Keyword
                  </label>
                  <input
                    id="submit-keyword"
                    type="text"
                    className="input-field font-mono"
                    placeholder="Enter the secret keyword..."
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    required
                    disabled={state === 'loading'}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    style={{ letterSpacing: '0.05em' }}
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
                    Found via the npm run unlock command in the challenge repository.
                  </p>
                </div>

                {state === 'error' && (
                  <div
                    className="badge"
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      color: '#F87171',
                      fontSize: '0.875rem',
                      display: 'block',
                      textTransform: 'none',
                      letterSpacing: 'normal',
                    }}
                  >
                    ⚠️ {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={state === 'loading'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    padding: '1rem',
                    opacity: state === 'loading' ? 0.7 : 1,
                  }}
                >
                  {state === 'loading' ? (
                    <>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          border: '2px solid rgba(0,0,0,0.3)',
                          borderTopColor: 'black',
                          animation: 'rotate-slow 0.7s linear infinite',
                          display: 'inline-block',
                        }}
                      />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Submit Answer
                    </>
                  )}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  By submitting, you confirm you are an eligible IIT Patna student
                  and agree to the event rules. Your submission timestamp is generated
                  by the server and determines your rank.
                </p>
              </form>
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/mission"
              style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              ← Back to Mission Briefing
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
