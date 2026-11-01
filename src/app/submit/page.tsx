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
    <div className="relative min-h-screen w-full bg-[#030612] text-white selection:bg-[#00d2ff] selection:text-black font-sans overflow-x-hidden">
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
              <div className="rounded-[24px] p-8 sm:p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-[#00d2ff]/40 bg-[#070e24]/90">
                <div className="w-16 h-16 rounded-2xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center text-3xl mx-auto mb-4 shadow-[0_0_25px_rgba(0,210,255,0.3)] text-[#00d2ff]">
                  ✓
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2">
                  Submission Received
                </h2>
                <div className="inline-block px-4 py-1 rounded-full border border-[#00d2ff]/40 bg-[#00d2ff]/10 text-xs font-mono font-bold text-[#00d2ff] mb-4">
                  Recorded &bull; Pending Event Conclusion
                </div>
                <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto mb-6 leading-relaxed">
                  {message}
                </p>
                <div>
                  <Link
                    href="/leaderboard"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] via-[#2563eb] to-[#7942f7] text-white font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-full hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(0,210,255,0.4)]"
                  >
                    <span>View Live Leaderboard</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* ── Form Card ── */
              <div className="rounded-[24px] bg-[#070e24]/90 border border-[#00d2ff]/20 p-7 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                <div className="mb-6 pb-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    Official Submission Portal
                  </h3>
                  <p className="text-xs text-white/50 font-mono mt-0.5">
                    Enter the passphrase revealed via offline CLI unlock
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                  <div>
                    <label htmlFor="submit-name" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                      Full Name
                    </label>
                    <input
                      id="submit-name"
                      type="text"
                      className="w-full bg-[#02050f] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00d2ff] transition-colors"
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
                    <label htmlFor="submit-email" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                      IIT Patna Email (@iitp.ac.in) <span className="text-[#00d2ff] font-semibold">• 1 Submission Only</span>
                    </label>
                    <input
                      id="submit-email"
                      type="email"
                      className="w-full bg-[#02050f] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00d2ff] transition-colors"
                      placeholder="student_roll@iitp.ac.in"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      disabled={state === 'loading'}
                      autoComplete="email"
                    />
                    <p className="text-[11px] text-white/40 mt-1">
                      Strictly @iitp.ac.in student emails only. Each participant can submit only 1 response.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="submit-keyword" className="block text-xs font-mono uppercase tracking-wider text-[#00d2ff] font-semibold mb-2">
                      Discovered Secret Keyword
                    </label>
                    <input
                      id="submit-keyword"
                      type="text"
                      className="w-full bg-[#02050f] border border-[#00d2ff]/40 rounded-xl px-4 py-3 text-sm text-[#00d2ff] font-mono tracking-wider placeholder-white/30 focus:outline-none focus:border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.1)] transition-colors"
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
                    <p className="text-[11px] text-white/40 mt-1">
                      Revealed exclusively via <code className="text-white/70 font-mono">npm run unlock</code> in the challenge repository.
                    </p>
                  </div>

                  {state === 'error' && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                      ⚠️ {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="w-full bg-gradient-to-r from-[#00d2ff] via-[#2563eb] to-[#7942f7] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full transition-all shadow-[0_4px_25px_rgba(0,210,255,0.4)] disabled:opacity-50 cursor-pointer"
                  >
                    {state === 'loading' ? 'Verifying with Server...' : 'Verify & Record Submission'}
                  </button>

                  <p className="text-[10px] text-center text-white/40 pt-1 font-mono">
                    By submitting, you agree to APPISTRY honor code and single-entry guidelines.
                  </p>

                </form>
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
