'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import ParticleCanvas from '@/components/animations/ParticleCanvas'
import CountdownTimer from '@/components/event/CountdownTimer'
import LiveStats from '@/components/event/LiveStats'
import LeaderboardPreview from '@/components/leaderboard/LeaderboardPreview'
import HintsSection from '@/components/event/HintsSection'
import AnnouncementsSection from '@/components/event/AnnouncementsSection'
import FAQSection from '@/components/event/FAQSection'
import RulesSection from '@/components/event/RulesSection'
import AntiInspection from '@/components/security/AntiInspection'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      <AntiInspection />
      <ParticleCanvas />
      <Navigation />

      {/* ── Hero Section ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: '80px' }}
      >
        {/* Radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,240,255,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Concentric portal rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[300, 420, 560, 700].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size * 0.4,
                border: `1px solid rgba(0,240,255,${0.08 - i * 0.015})`,
                transform: `rotateX(75deg)`,
                animation: `rotate-slow ${20 + i * 10}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
              }}
            />
          ))}
        </div>

        <div className="container-wide relative z-10 text-center">
          {/* Club attribution */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="badge badge-cyan">APPISTRY</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>×</span>
            <span className="badge badge-magenta">STC IIT Patna Hybrid</span>
          </div>

          {/* Main title */}
          <div className="mb-6" style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease' }}>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: 'var(--text-primary)',
              }}
            >
              THE
              <br />
              <span className="gradient-text-cyan"> HIDDEN</span>
              <br />
              KEY
            </h1>
          </div>

          {/* Tagline */}
          <p
            className="font-body mb-2"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: 'var(--text-secondary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            A Code Mystery Hunt
          </p>
          <p
            className="font-mono mb-10"
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
            }}
          >
            Dive into the source. Find what lies beneath.
          </p>

          {/* Countdown timer */}
          <div className="mb-10 flex justify-center">
            <CountdownTimer />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link href="/mission" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Start Mission
            </Link>
            <Link href="/submit" className="btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
              </svg>
              Submit Answer
            </Link>
          </div>

          {/* Live stats */}
          <LiveStats />
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.1em' }}
        >
          <span>SCROLL</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--border-cyan), transparent)' }} />
        </div>
      </section>

      {/* ── Announcements ── */}
      <section id="announcements" className="py-16">
        <div className="container-wide">
          <AnnouncementsSection />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="badge badge-cyan mb-4" style={{ margin: '0 auto 1rem' }}>Process</p>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}
            >
              How It <span className="gradient-text-cyan">Works</span>
            </h2>
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={i}
                className="glass-card p-8 relative overflow-hidden"
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--glow-cyan)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = ''
                  ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                }}
              >
                {/* Step number */}
                <div
                  className="font-display"
                  style={{
                    fontSize: '4rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, rgba(0,240,255,0.15), transparent)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    position: 'absolute',
                    top: '1rem',
                    right: '1.25rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div
                  className="mb-4"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '10px',
                    background: 'var(--cyan-ghost)',
                    border: '1px solid var(--border-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{step.icon}</span>
                </div>
                <h3 className="font-display mb-2" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Hints ── */}
      <section id="hints" className="py-16">
        <div className="container-wide">
          <HintsSection />
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Rules ── */}
      <section id="rules" className="py-24">
        <div className="container-wide">
          <RulesSection />
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Leaderboard Preview ── */}
      <section id="leaderboard" className="py-24">
        <div className="container-wide">
          <LeaderboardPreview />
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Prizes ── */}
      <section id="prizes" className="py-24">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="badge badge-gold" style={{ margin: '0 auto 1rem' }}>Rewards</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
              Prizes & <span className="gradient-text-gold">Recognition</span>
            </h2>
          </div>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {PRIZES.map((prize, i) => (
              <div
                key={i}
                className="glass-card p-8 text-center"
                style={{ borderColor: prize.borderColor }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{prize.emoji}</div>
                <h3 className="font-display mb-2" style={{ fontSize: '1.2rem', fontWeight: 800, color: prize.color }}>
                  {prize.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{prize.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FAQ ── */}
      <section id="faq" className="py-24">
        <div className="container-wide">
          <FAQSection />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '3rem 0',
          background: 'rgba(5,8,20,0.8)',
        }}
      >
        <div className="container-wide">
          <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div>
              <h3 className="font-display mb-3" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                <span className="gradient-text-cyan">APPISTRY</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                App Development Club<br />STC IIT Patna Hybrid
              </p>
            </div>
            <div>
              <h4 className="font-display mb-3" style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Event
              </h4>
              <div className="flex flex-col gap-2">
                {[['Mission', '/mission'], ['Submit', '/submit'], ['Leaderboard', '/leaderboard'], ['Rules', '#rules']].map(([label, href]) => (
                  <Link key={href} href={href} className="nav-link" style={{ display: 'inline-block', fontWeight: 500, textTransform: 'none', fontSize: '0.9rem', letterSpacing: 'normal' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display mb-3" style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                The Challenge
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                THE HIDDEN KEY — A Code Mystery Hunt<br />
                Find the secret. Win the challenge.
              </p>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-8"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              © 2024 APPISTRY — App Development Club, STC IIT Patna Hybrid. All rights reserved.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              THINK. BUILD. DISCOVER.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const HOW_IT_WORKS = [
  {
    icon: '🔍',
    title: 'Access the Repository',
    description: 'Clone or download the official challenge repository. Set up your development environment with VS Code or any preferred IDE.',
  },
  {
    icon: '🕵️',
    title: 'Explore the Source',
    description: 'Dive deep into the code. Hunt for clues hidden within the architecture, comments, and file structure.',
  },
  {
    icon: '🔐',
    title: 'Run the Unlock Utility',
    description: 'Discover the encrypted challenge artifact. Use the custom CLI unlock tool (npm run unlock) and enter the discovered password.',
  },
  {
    icon: '✨',
    title: 'Reveal the Key',
    description: 'The correct password triggers the unlock sequence, revealing the secret keyword hidden within.',
  },
  {
    icon: '📤',
    title: 'Submit Your Answer',
    description: 'Return to this portal and submit your discovered keyword with your name and IITP email.',
  },
  {
    icon: '🏆',
    title: 'Claim First Blood',
    description: 'Race against other participants. The fastest verified submission earns the legendary First Blood title.',
  },
]

const PRIZES = [
  {
    emoji: '🥇',
    title: 'First Blood',
    description: 'Certificate of Excellence + APPISTRY First Blood badge + public recognition on the event portal',
    color: 'var(--gold)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  {
    emoji: '🎖️',
    title: 'Top 3 Finalists',
    description: 'Digital achievement certificates with APPISTRY and STC IIT Patna Hybrid official recognition',
    color: 'var(--cyan)',
    borderColor: 'var(--border-cyan)',
  },
  {
    emoji: '🏅',
    title: 'All Valid Submissions',
    description: 'Digital participation certificate for all participants who successfully solve the mystery',
    color: 'var(--violet)',
    borderColor: 'rgba(155, 81, 224, 0.3)',
  },
]
