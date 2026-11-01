'use client'

import { useState } from 'react'
import Link from 'next/link'
import AntiInspection from '@/components/security/AntiInspection'
import RibbonWaves from '@/components/animations/RibbonWaves'
import CyberGrid from '@/components/animations/CyberGrid'
import CyberFrameStage from '@/components/layout/CyberFrameStage'

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

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail.endsWith('@iitp.ac.in')) {
      setState('error')
      setMessage('Submission is restricted to official IIT Patna student emails (@iitp.ac.in). Please use your college email.')
      return
    }

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
        setMessage(data.message || 'Your submission has been verified and recorded!')
      } else {
        setState('error')
        setMessage(data.error || 'Something went wrong. Please check your inputs.')
      }
    } catch {
      setState('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#eef2f6] text-slate-800 selection:bg-[#ff5e98] selection:text-white font-sans overflow-x-hidden">
      <AntiInspection />
      <RibbonWaves />
      <CyberGrid />

      <main className="relative z-10 py-6 sm:py-10">
        <CyberFrameStage
          activeNav="submit"
          characterImage="/cyber-hacker-blue.png"
          titleBackdrop={{
            left: 'SUBMIT',
            right: 'KEYWORD',
          }}
          leftCallout={{
            title: 'Eligibility Requirements',
            description: 'Participation strictly requires @iitp.ac.in credentials. Single verified submission per participant.',
          }}
          rightContent={{
            badge: 'Submission Gateway',
            title: 'SUBMIT',
            highlightTitle: 'SECRET KEY',
            description: 'Enter the exact secret keyword unlocked via the offline CLI utility. Instant atomic server timestamps register your ranking on the official board.',
            buttonText: 'View Leaderboard',
            buttonHref: '/leaderboard',
          }}
          bottomCards={[
            {
              type: 'stat-image',
              image: '/cyber-hacker-blue.png',
              stat: '100% Validated',
              label: 'Server Verification',
              sublabel: 'Cryptographic validation prevents any client-side tampering',
            },
            {
              type: 'feature',
              subtitle: 'Rate Protection',
              title: 'Anti-Spam Security',
              description: 'Submissions are rate-limited. Script spamming triggers immediate disqualification and permanent IP blocking.',
            },
            {
              type: 'stat-badge',
              stat: '1 Attempt',
              label: 'Official Slot',
            },
          ]}
        >
          {/* Submission Form Section */}
          <div className="max-w-[560px] mx-auto py-4">

            {state === 'success' ? (
              /* ── Success State ── */
              <div className="neu-card rounded-[32px] p-8 sm:p-10 text-center">
                <div className="w-16 h-16 rounded-2xl neu-icon-btn flex items-center justify-center text-3xl mx-auto mb-4 text-[#ff5e98]">
                  ✓
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase mb-2">
                  Submission Received
                </h2>
                <div className="neu-card-sm inline-block px-5 py-1.5 rounded-full text-xs font-mono font-bold text-[#ff5e98] mb-4">
                  Recorded &bull; Pending Event Conclusion
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed font-medium">
                  {message}
                </p>
                <div>
                  <Link
                    href="/leaderboard"
                    className="neu-btn-gradient-pink inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
                  >
                    <span>View Live Leaderboard</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* ── Form Card ── */
              <div className="neu-card rounded-[32px] p-7 sm:p-9">
                <div className="mb-6 pb-4 border-b border-slate-200/60">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">
                    Official Submission Portal
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5 font-medium">
                    Enter the passphrase revealed via offline CLI unlock
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                  <div>
                    <label htmlFor="submit-name" className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">
                      Full Name
                    </label>
                    <input
                      id="submit-name"
                      type="text"
                      className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                      placeholder="e.g. Aman Kumar"
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
                    <label htmlFor="submit-email" className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">
                      IIT Patna Email (@iitp.ac.in) <span className="text-[#ff5e98] font-bold">• 1 Submission Only</span>
                    </label>
                    <input
                      id="submit-email"
                      type="email"
                      className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                      placeholder="student_roll@iitp.ac.in"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      disabled={state === 'loading'}
                      autoComplete="email"
                    />
                    <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
                      Strictly @iitp.ac.in student emails only. Each participant can submit only 1 response.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="submit-keyword" className="block text-xs font-mono uppercase tracking-wider text-[#ff5e98] font-black mb-2">
                      Discovered Secret Keyword
                    </label>
                    <input
                      id="submit-keyword"
                      type="text"
                      className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-[#ff5e98] font-mono font-bold tracking-wider placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/40 transition-all"
                      placeholder="Enter the revealed secret phrase..."
                      value={keyword}
                      onChange={e => setKeyword(e.target.value)}
                      required
                      disabled={state === 'loading'}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                    />
                    <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
                      Revealed exclusively via <code className="text-slate-800 font-mono bg-slate-200/50 px-1.5 py-0.5 rounded">npm run unlock</code> in the challenge repository.
                    </p>
                  </div>

                  {state === 'error' && (
                    <div className="rounded-2xl border border-rose-300 bg-rose-50 p-3.5 text-xs text-rose-700 font-medium">
                      ⚠️ {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="neu-btn-gradient-pink w-full text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    {state === 'loading' ? 'Verifying with Server...' : 'Verify & Record Submission'}
                  </button>

                  <p className="text-[11px] text-center text-slate-500 pt-1 font-mono font-medium">
                    By submitting, you agree to APPISTRY honor code and single-entry guidelines.
                  </p>

                </form>
              </div>
            )}

            {/* Back to Home Link */}
            <div className="text-center mt-8">
              <Link
                href="/"
                className="text-xs font-mono text-slate-500 hover:text-[#ff5e98] font-medium transition-colors inline-flex items-center gap-1.5"
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
