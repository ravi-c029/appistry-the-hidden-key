'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AntiInspection from '@/components/security/AntiInspection'
import RibbonWaves from '@/components/animations/RibbonWaves'
import CyberGrid from '@/components/animations/CyberGrid'
import CyberFrameStage from '@/components/layout/CyberFrameStage'

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
    <div className="relative min-h-screen w-full bg-[#eef2f6] text-slate-800 selection:bg-[#ff5e98] selection:text-white font-sans overflow-x-hidden">
      <AntiInspection />
      <RibbonWaves />
      <CyberGrid />

      <main className="relative z-10 py-6 sm:py-10">
        <CyberFrameStage
          activeNav="mission"
          characterImage="/cyber-hacker-blue.png"
          titleBackdrop={{
            left: 'MISSION',
            right: 'BRIEFING',
          }}
          leftCallout={{
            title: 'Mission Objective',
            description: 'Inspect commit history, build scripts, and package configurations to deduce the mystery passphrase.',
          }}
          rightContent={{
            badge: 'Challenge Briefing',
            title: 'MISSION',
            highlightTitle: 'BRIEFING',
            description: 'Somewhere inside the challenge repository, an encrypted key is sealed. Deduce the mystery passphrase, execute the offline unlock CLI, and claim First Blood.',
            buttonText: 'Clone Repository',
            buttonHref: '/repository',
          }}
          bottomCards={[
            {
              type: 'stat-image',
              image: '/cyber-hacker-blue.png',
              stat: '6 Steps',
              label: 'Mission Protocol',
              sublabel: 'Systematic progression from cloning to cryptographic decryption',
            },
            {
              type: 'feature',
              subtitle: 'Local Tooling',
              title: 'Offline Unlock CLI',
              description: 'The unlock tool operates locally via scrypt key derivation. Zero network requests made.',
            },
            {
              type: 'stat-badge',
              stat: 'AES-256',
              label: 'Security Cipher',
            },
          ]}
        >
          {/* Detailed Mission Content */}
          <div className="max-w-[920px] mx-auto py-4">

            {/* Terminal Briefing */}
            <div className="neu-card rounded-[24px] overflow-hidden mb-8">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-200/60 bg-slate-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5e98]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#00c6ff]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="text-[11px] font-mono text-slate-500 font-bold ml-2">
                  APPISTRY SECURITY TERMINAL — STC IIT PATNA HYBRID
                </span>
              </div>
              <div className="p-5 font-mono text-xs sm:text-sm text-white/90 space-y-2 leading-relaxed bg-[#0b1329]">
                <p className="text-[#00c6ff]">&gt; APPISTRY CHALLENGE SUITE v2.0 [LIVE]</p>
                <p className="text-white/60">Initializing mystery environment...</p>
                <p className="text-[#10b981]">✓ Cryptographic checksum verified</p>
                <p className="text-[#10b981]">✓ AES-256-GCM artifact locked and sealed</p>
                <p className="text-[#ff5e98] font-semibold mt-2">
                  ⚡ DIRECTIVE: Only the genuine passphrase unlocks the secret keyword.
                </p>
                <p className="text-white/60">
                  &gt; Status: READY. Clone repository below to begin.
                </p>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-2">
                Operational Roadmap
              </h3>
              {MISSION_STEPS.map((step, i) => (
                <div 
                  key={i} 
                  className="relative neu-card rounded-[22px] p-5 sm:p-6 transition-all hover:scale-[1.01]"
                >
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[22px]" 
                    style={{ background: step.accentColor }} 
                  />
                  
                  <div className="pl-3">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span 
                        className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full neu-card-sm"
                        style={{ color: step.accentColor }}
                      >
                        STEP {i + 1}
                      </span>
                      <span className="text-base">{step.icon}</span>
                      <h4 className="text-base sm:text-lg font-black text-slate-900">{step.title}</h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-3">
                      {step.description}
                    </p>

                    {step.code && (
                      <div className="relative mt-2">
                        <pre className="font-mono text-xs text-[#00c6ff] bg-[#0b1329] rounded-xl p-3.5 overflow-x-auto shadow-inner">
                          {step.code}
                        </pre>
                        {step.codeKey && (
                          <button
                            onClick={() => copyToClipboard(step.code!, step.codeKey!)}
                            className="absolute top-2.5 right-2.5 text-[10px] font-mono px-2.5 py-1 rounded-full neu-card-sm text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
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

            {/* Repository Box */}
            <div className="neu-card rounded-[24px] p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 mb-1">📦 Official Repository</h3>
                  <p className="text-xs text-slate-600 font-medium mb-2">Contains challenge scripts, hints, and locked artifact.</p>
                  <code className="neu-input text-xs font-mono text-[#0072ff] font-bold px-3 py-1.5 rounded-xl inline-block break-all">
                    {repoUrl}
                  </code>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => copyToClipboard(`git clone ${repoUrl}`, 'clone')}
                    className="neu-btn text-slate-800 text-xs font-bold px-4 py-2 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  >
                    {copied === 'clone' ? '✓ Copied!' : 'Copy Clone'}
                  </button>
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neu-btn-gradient-blue text-white text-xs font-bold px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {IDE_STEPS.map((item, i) => (
                <div key={i} className="neu-card rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs font-black text-slate-900">{item.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1 font-medium">{item.description}</div>
                </div>
              ))}
            </div>

            {/* Final CTA Button */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500 mb-3 font-medium">Found the key? Submit immediately to secure your ranking.</p>
              <Link
                href="/submit"
                className="neu-btn-gradient-pink inline-flex items-center gap-2 text-white text-xs uppercase tracking-wider font-bold px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <span>Submit Discovered Keyword</span>
                <span>→</span>
              </Link>
            </div>

            {/* Back to Home Link */}
            <div className="text-center mt-6">
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

const MISSION_STEPS = [
  {
    icon: '📦',
    title: 'Clone the Repository',
    description: 'Fetch the official challenge codebase containing the encrypted artifact and custom CLI.',
    code: `git clone https://github.com/appistry/hidden-key-challenge\ncd hidden-key-challenge`,
    codeKey: 'clone',
    accentColor: '#00d2ff',
  },
  {
    icon: '⚙️',
    title: 'Install Dependencies',
    description: 'Install the required Node.js packages for the unlock utility.',
    code: `npm install`,
    codeKey: 'install',
    accentColor: '#2563eb',
  },
  {
    icon: '🔍',
    title: 'Explore the Source Code',
    description: 'Examine the repository structure carefully. Look inside commit history, unusual patterns, and build scripts. The clue to the password lies within.',
    code: `code .`,
    codeKey: 'vscode',
    accentColor: '#7942f7',
  },
  {
    icon: '🔐',
    title: 'Run the Unlock Utility',
    description: 'Once you\'ve deduced the password hidden in the source, run the official unlock CLI. Enter the password when prompted.',
    code: `npm run unlock\n\n# [APPISTRY SECURITY TERMINAL]\n# Enter the password: ___________\n# > [type what you found...]`,
    codeKey: 'unlock',
    accentColor: '#00d2ff',
  },
  {
    icon: '✨',
    title: 'Reveal & Copy the Secret Keyword',
    description: 'If the password is correct, the secret keyword will be decrypted. Copy it carefully — you\'ll need the exact value for official verification.',
    accentColor: '#4ADE80',
  },
  {
    icon: '📤',
    title: 'Submit on This Portal',
    description: 'Return to the event portal and submit your name, IITP email, and the revealed keyword. Your atomic server-recorded submission time determines your rank.',
    accentColor: '#00d2ff',
  },
]

const IDE_STEPS = [
  { icon: '🟢', title: 'Node.js v18+', description: 'Required for unlock CLI' },
  { icon: '💻', title: 'VS Code', description: 'Recommended IDE' },
  { icon: '🔀', title: 'Git', description: 'For cloning repository' },
  { icon: '🌐', title: 'Any Browser', description: 'For submitting answer' },
]
