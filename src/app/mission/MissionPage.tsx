'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/layout/Navigation'
import ParticleCanvas from '@/components/animations/ParticleCanvas'
import AntiInspection from '@/components/security/AntiInspection'

export default function MissionPage() {
  const [repoUrl, setRepoUrl] = useState('https://github.com/appistry/hidden-key-challenge')
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/event/config')
      .then(r => r.json())
      .then(data => { if (data.repositoryUrl) setRepoUrl(data.repositoryUrl) })
      .catch(() => {})
  }, [])

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gradient-hero)' }}>
      <AntiInspection />
      <ParticleCanvas />
      <Navigation />

      <main style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="container-narrow">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="badge badge-gold animate-glow-pulse">Mission Briefing</span>
            </div>
            <h1 className="font-display mb-4" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Your Mission,<br />
              <span className="gradient-text-cyan">Should You Choose to Accept It</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Somewhere within the challenge repository, a secret lies encoded.
              Your mission is to find it, unlock it, and submit it before anyone else does.
            </p>
          </div>

          {/* Terminal intro */}
          <div className="terminal mb-12 challenge-zone">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#FF5F57' }} />
              <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
              <div className="terminal-dot" style={{ background: '#28C840' }} />
              <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                APPISTRY SECURITY TERMINAL — Mission Broadcast
              </span>
            </div>
            <div className="terminal-body">
              <span className="terminal-line terminal-prompt">{'>'} APPISTRY MISSION SYSTEM v2.024</span>
              <span className="terminal-line terminal-output">Initializing challenge environment...</span>
              <span className="terminal-line terminal-success">✓ Repository checksum verified</span>
              <span className="terminal-line terminal-success">✓ Challenge artifact sealed</span>
              <span className="terminal-line terminal-output">&nbsp;</span>
              <span className="terminal-line terminal-warning">⚡ CLASSIFIED: One hidden keyword exists within the source.</span>
              <span className="terminal-line terminal-output">   It is encrypted. It is waiting. It is yours to find.</span>
              <span className="terminal-line terminal-output">&nbsp;</span>
              <span className="terminal-line terminal-prompt">{'>'} Mission Status: ACTIVE</span>
              <span className="terminal-line terminal-output">Awaiting participant input...&nbsp;<span className="terminal-cursor" /></span>
            </div>
          </div>

          {/* Step-by-step instructions */}
          <div className="flex flex-col gap-6 mb-12">
            {MISSION_STEPS.map((step, i) => (
              <div key={i} className="glass-card p-6" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Step accent line */}
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: 3,
                  background: step.accentColor,
                  borderRadius: '4px 0 0 4px',
                }} />
                <div style={{ paddingLeft: '1rem' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: step.labelColor,
                      background: step.labelBg,
                      border: `1px solid ${step.labelBorder}`,
                      padding: '0.15rem 0.5rem',
                      borderRadius: 4,
                    }}>STEP {i + 1}</span>
                    <span style={{ fontSize: '1.25rem' }}>{step.icon}</span>
                  </div>
                  <h3 className="font-display mb-2" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: step.code ? '1rem' : 0 }}>
                    {step.description}
                  </p>
                  {step.code && (
                    <div style={{ position: 'relative' }}>
                      <pre
                        className="font-mono"
                        style={{
                          background: '#000D1A',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.875rem 1.25rem',
                          fontSize: '0.85rem',
                          color: 'var(--text-code)',
                          overflowX: 'auto',
                          lineHeight: 1.6,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}
                      >
                        {step.code}
                      </pre>
                      {step.codeKey && (
                        <button
                          onClick={() => copyToClipboard(step.code!, step.codeKey!)}
                          style={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            color: copied === step.codeKey ? 'var(--cyan)' : 'var(--text-muted)',
                            transition: 'color 0.2s',
                          }}
                          aria-label="Copy code"
                        >
                          {copied === step.codeKey ? '✓ Copied' : 'Copy'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Repository Access Card */}
          <div
            className="glass-card p-8 mb-12"
            style={{ borderColor: 'var(--border-cyan)', background: 'rgba(0,240,255,0.03)' }}
          >
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div style={{ flex: 1, minWidth: 200 }}>
                <h3 className="font-display mb-2" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  📦 Challenge Repository
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  The official repository for THE HIDDEN KEY challenge.
                </p>
                <code
                  className="font-mono"
                  style={{
                    display: 'block',
                    background: '#000D1A',
                    border: '1px solid var(--border-cyan)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.75rem 1rem',
                    fontSize: '0.8rem',
                    color: 'var(--cyan)',
                    wordBreak: 'break-all',
                  }}
                >
                  {repoUrl}
                </code>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
                <button
                  onClick={() => copyToClipboard(`git clone ${repoUrl}`, 'clone')}
                  className="btn-secondary"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {copied === 'clone' ? '✓ Copied!' : '📋 Copy Clone Command'}
                </button>
              </div>
            </div>
          </div>

          {/* IDE Setup */}
          <div className="glass-card p-6 mb-12">
            <h3 className="font-display mb-4" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              🛠️ IDE & Environment Setup
            </h3>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              {IDE_STEPS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.875rem',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                  <div className="font-display" style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Found the keyword? Submit it here before anyone else does.
            </p>
            <Link href="/submit" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.37a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
              </svg>
              Submit Your Answer
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}

const MISSION_STEPS = [
  {
    icon: '📦',
    title: 'Clone the Repository',
    description: 'Start by cloning the official challenge repository to your local machine.',
    code: `git clone https://github.com/appistry/hidden-key-challenge\ncd hidden-key-challenge`,
    codeKey: 'clone',
    accentColor: 'var(--cyan)',
    labelColor: 'var(--cyan)',
    labelBg: 'rgba(0,240,255,0.08)',
    labelBorder: 'rgba(0,240,255,0.2)',
  },
  {
    icon: '⚙️',
    title: 'Install Dependencies',
    description: 'Install the required Node.js packages for the unlock utility.',
    code: `npm install`,
    codeKey: 'install',
    accentColor: 'var(--violet)',
    labelColor: 'var(--violet)',
    labelBg: 'rgba(155,81,224,0.08)',
    labelBorder: 'rgba(155,81,224,0.2)',
  },
  {
    icon: '🔍',
    title: 'Explore the Source Code',
    description: 'Examine the repository structure carefully. Look inside every file, every comment, every unusual pattern. The clue to the password lies within. Open in VS Code or your preferred IDE.',
    code: `code .`,
    codeKey: 'vscode',
    accentColor: 'var(--magenta)',
    labelColor: 'var(--magenta)',
    labelBg: 'rgba(224,36,195,0.08)',
    labelBorder: 'rgba(224,36,195,0.2)',
  },
  {
    icon: '🔐',
    title: 'Run the Unlock Utility',
    description: 'Once you\'ve discovered the password hidden in the source, run the official APPISTRY unlock CLI. Enter the password when prompted.',
    code: `npm run unlock\n\n# [APPISTRY SECURITY TERMINAL]\n# Enter the password: ___________\n# > [type what you found...]`,
    codeKey: 'unlock',
    accentColor: 'var(--gold)',
    labelColor: 'var(--gold)',
    labelBg: 'rgba(245,158,11,0.08)',
    labelBorder: 'rgba(245,158,11,0.2)',
  },
  {
    icon: '✨',
    title: 'Reveal & Copy the Secret Keyword',
    description: 'If the password is correct, the secret keyword will be revealed. Copy it carefully — you\'ll need the exact value for your submission.',
    accentColor: '#4ADE80',
    labelColor: '#4ADE80',
    labelBg: 'rgba(34,197,94,0.08)',
    labelBorder: 'rgba(34,197,94,0.2)',
  },
  {
    icon: '📤',
    title: 'Submit on This Portal',
    description: 'Return to the event portal and submit your name, IITP email, and the discovered keyword. Your server-recorded submission time determines your rank.',
    accentColor: 'var(--cyan)',
    labelColor: 'var(--cyan)',
    labelBg: 'rgba(0,240,255,0.08)',
    labelBorder: 'rgba(0,240,255,0.2)',
  },
]

const IDE_STEPS = [
  { icon: '🟢', title: 'Node.js v18+', description: 'Required for the unlock CLI utility' },
  { icon: '💻', title: 'VS Code', description: 'Recommended IDE. Any terminal works.' },
  { icon: '🔀', title: 'Git', description: 'For cloning the repository' },
  { icon: '🔍', title: 'Any Browser', description: 'For submitting your answer here' },
]
