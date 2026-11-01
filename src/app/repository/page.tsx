'use client'

import { useState } from 'react'
import Link from 'next/link'
import AntiInspection from '@/components/security/AntiInspection'
import RibbonWaves from '@/components/animations/RibbonWaves'
import CyberGrid from '@/components/animations/CyberGrid'
import CyberFrameStage from '@/components/layout/CyberFrameStage'

export default function RepositoryPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const repoUrl = 'https://github.com/appistry/hidden-key-challenge'

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
          activeNav="repository"
          characterImage="/cyber-hacker-blue.png"
          titleBackdrop={{
            left: 'REPO &',
            right: 'TOOLING',
          }}
          leftCallout={{
            title: 'Security Architecture',
            description: 'Zero secret exposure occurs client-side. The encrypted artifact is unpacked offline with Node.js.',
          }}
          rightContent={{
            badge: 'Developer Toolkit',
            title: 'REPOSITORY &',
            highlightTitle: 'LOCAL CLI',
            description: 'The official codebase houses the encrypted payload, challenge build scripts, and local unlock CLI engine.',
            buttonText: 'Submit Key',
            buttonHref: '/submit',
          }}
          bottomCards={[
            {
              type: 'stat-image',
              image: '/cyber-hacker-blue.png',
              stat: 'Scrypt KDF',
              label: 'Key Derivation',
              sublabel: 'N=32768, r=8, p=1 authenticated standard',
            },
            {
              type: 'feature',
              subtitle: 'Cipher Standard',
              title: 'AES-256-GCM',
              description: 'Authenticated decryption validates payload integrity and prevents tampering.',
            },
            {
              type: 'stat-badge',
              stat: '0ms',
              label: 'Offline Latency',
            },
          ]}
        >
          {/* Main Terminal & Specs Section */}
          <div className="max-w-[1000px] mx-auto py-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
              
              {/* Left: Terminal Commands */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Clone Box */}
                <div className="neu-card rounded-[24px] p-5 sm:p-6 transition-all hover:scale-[1.01]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-slate-900">01. Clone Codebase</span>
                    <button
                      onClick={() => copyToClipboard(`git clone ${repoUrl}`, 'clone')}
                      className="neu-card-sm text-xs px-3 py-1 rounded-full text-slate-700 hover:text-slate-900 font-bold transition-colors cursor-pointer"
                    >
                      {copied === 'clone' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-white/95 bg-[#0b1329] rounded-xl p-4 overflow-x-auto shadow-inner">
                    git clone {repoUrl}
                    <br />
                    cd hidden-key-challenge
                  </pre>
                </div>

                {/* Install Box */}
                <div className="neu-card rounded-[24px] p-5 sm:p-6 transition-all hover:scale-[1.01]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-[#0072ff]">02. Install Dependencies</span>
                    <button
                      onClick={() => copyToClipboard('npm install', 'install')}
                      className="neu-card-sm text-xs px-3 py-1 rounded-full text-slate-700 hover:text-slate-900 font-bold transition-colors cursor-pointer"
                    >
                      {copied === 'install' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-white/95 bg-[#0b1329] rounded-xl p-4 overflow-x-auto shadow-inner">
                    npm install
                  </pre>
                </div>

                {/* Unlock CLI Box */}
                <div className="neu-card rounded-[24px] p-5 sm:p-6 transition-all hover:scale-[1.01]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-[#ff5e98]">03. Run Offline Unlock CLI</span>
                    <button
                      onClick={() => copyToClipboard('npm run unlock', 'unlock')}
                      className="neu-card-sm text-xs px-3 py-1 rounded-full text-slate-700 hover:text-slate-900 font-bold transition-colors cursor-pointer"
                    >
                      {copied === 'unlock' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-[#00c6ff] bg-[#0b1329] rounded-xl p-4 overflow-x-auto shadow-inner font-bold">
                    npm run unlock
                  </pre>
                  <p className="text-xs text-slate-600 mt-2 font-medium">
                    Supplies your deduced mystery passphrase to derive the AES-256-GCM key and decrypt the payload.
                  </p>
                </div>

              </div>

              {/* Right: Security & Architecture Specs */}
              <div className="lg:col-span-5 space-y-4">
                
                <div className="neu-card rounded-[28px] p-6 sm:p-7">
                  <h3 className="text-base font-black text-slate-900 mb-4 uppercase tracking-wider">
                    Cryptographic Specifications
                  </h3>
                  <ul className="space-y-3.5 text-xs text-slate-700 leading-relaxed font-medium">
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff5e98] mt-1.5 shrink-0" />
                      <span><strong className="text-slate-900">Algorithm:</strong> AES-256-GCM with Authenticated Decryption tag.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#0072ff] mt-1.5 shrink-0" />
                      <span><strong className="text-slate-900">Key Derivation:</strong> Scrypt KDF with N=32768, r=8, p=1 and unique random salt.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] mt-1.5 shrink-0" />
                      <span><strong className="text-slate-900">Verification:</strong> Strict server-side verification in atomic transaction.</span>
                    </li>
                  </ul>

                  <div className="mt-6 pt-5 border-t border-slate-200/60">
                    <Link
                      href="/submit"
                      className="w-full neu-btn-gradient-pink inline-flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md"
                    >
                      <span>Proceed to Submission Portal</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

              </div>

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
