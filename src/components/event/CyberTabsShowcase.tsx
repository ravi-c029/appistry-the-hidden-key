'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TabContent {
  id: string
  number: string
  tabName: string
  headlineMain: string
  headlineHighlight: string
  bullets: string[]
  primaryBtn: { text: string; href: string }
  secondaryBtn: { text: string; href: string }
  paragraph1: string
  paragraph2: string
  badgeLabel: string
}

const TABS: TabContent[] = [
  {
    id: 'mission-brief',
    number: '01',
    tabName: 'Mission Brief',
    headlineMain: 'Engineered into the',
    headlineHighlight: 'Intelligence Designed for the Future.',
    bullets: [
      'Clue Deduction & Source Analysis',
      'Encrypted AES-256-GCM Mystery Payload',
      'IIT Patna Community First Blood Bounty',
    ],
    primaryBtn: { text: 'Start Mission', href: '/mission' },
    secondaryBtn: { text: 'View Clues', href: '#hints' },
    paragraph1:
      'Step into a world where cutting-edge code mystery collides with elite developer curiosity. APPISTRY serves as your portal to the most anticipated technical event of STC IIT Patna Hybrid.',
    paragraph2:
      'Inspect the source repository, decode hidden commits, discover the mystery passphrase, and decrypt the sealed artifact before anyone else claims the title.',
    badgeLabel: 'APPISTRY INTELLIGENCE PROTOCOL',
  },
  {
    id: 'repository-cli',
    number: '02',
    tabName: 'Repository & CLI',
    headlineMain: 'Isolated Execution with',
    headlineHighlight: 'Offline Cryptographic Tooling.',
    bullets: [
      'Custom Node.js Terminal Unlock Tool',
      'Zero Client-Side Secret Leakage (Strict Verification)',
      'Scrypt Password-Based Key Derivation',
    ],
    primaryBtn: { text: 'Explore Repository', href: '/repository' },
    secondaryBtn: { text: 'Run Unlock CLI', href: '/mission' },
    paragraph1:
      'The challenge is built with cryptographic integrity. The target passphrase is never exposed in client bundles, network requests, or source files.',
    paragraph2:
      'Clone the repository, install dependencies, and run npm run unlock. When prompted by the APPISTRY security terminal, supply your deduced passphrase to reveal the final keyword.',
    badgeLabel: 'OFFLINE CLI ARCHITECTURE',
  },
  {
    id: 'submit-answer',
    number: '03',
    tabName: 'Submit Answer',
    headlineMain: 'Server-Verified with',
    headlineHighlight: 'Atomic Timestamped Rankings.',
    bullets: [
      'Exclusive to IIT Patna Students (@iitp.ac.in)',
      'Atomic Transaction for First Blood Detection',
      'Instant Hall of Champions Leaderboard Placement',
    ],
    primaryBtn: { text: 'Submit Key Now', href: '/submit' },
    secondaryBtn: { text: 'Live Leaderboard', href: '/leaderboard' },
    paragraph1:
      'Every millisecond counts in the race for First Blood. When you unlock the confidential keyword, navigate directly to the verified submission portal.',
    paragraph2:
      'Submissions are cryptographically hashed and verified strictly on the backend. The first valid verification automatically claims First Blood honors.',
    badgeLabel: 'ATOMIC VERIFICATION ENGINE',
  },
  {
    id: 'rules-bounty',
    number: '04',
    tabName: 'Rules & Bounty',
    headlineMain: 'Strict Fair Play and',
    headlineHighlight: 'Honors for the Code Champion.',
    bullets: [
      'Single Verified Entry Per IIT Patna Student',
      'Individual Participation (No Team Assistance)',
      'Anti-Inspection & Challenge Integrity Enforcement',
    ],
    primaryBtn: { text: 'Full Rulebook', href: '/rules' },
    secondaryBtn: { text: 'Hall of Fame', href: '/leaderboard' },
    paragraph1:
      'THE HIDDEN KEY is governed by strict developer ethics. Automated botting, brute-force spamming, and tampering with verification endpoints are strictly prohibited.',
    paragraph2:
      'The victor will receive official certification from APPISTRY — App Development Club, STC IIT Patna Hybrid, along with the First Blood Champion title.',
    badgeLabel: 'FAIR PLAY CODE OF CONDUCT',
  },
]

interface CyberTabsShowcaseProps {
  initialTab?: string
}

export default function CyberTabsShowcase({ initialTab = 'mission-brief' }: CyberTabsShowcaseProps) {
  const [activeTabId, setActiveTabId] = useState(initialTab)
  const currentTab = TABS.find(t => t.id === activeTabId) || TABS[0]

  return (
    <div id="challenge-tabs-showcase" className="relative w-full max-w-[1240px] mx-auto py-8">
      
      {/* ── 4 TABS NAVIGATION BAR (MATCHING IMAGE 1 EXACT CYBER STYLE) ── */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 sm:gap-3 px-2 no-scrollbar">
        {TABS.map(tab => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-[#2962ff]/30 to-[#7942f7]/30 border border-[#00d2ff] text-white shadow-[0_0_20px_rgba(0,210,255,0.35)]'
                  : 'bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.08]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]' : 'bg-white/30'}`} />
              <span className="font-bold">{tab.tabName}</span>
            </button>
          )
        })}
      </div>

      {/* ── DUAL COLUMN HERO FEATURE (EXACT MATCH TO IMAGE 1 REFERENCE) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Heading + Bullet List + Dual Glowing Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10 text-[#00d2ff] text-[10px] font-mono tracking-widest uppercase mb-4 w-fit">
            <span>●</span>
            <span>{currentTab.badgeLabel}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white tracking-tight leading-[1.15] mb-6">
            <span>{currentTab.headlineMain} </span>
            <span className="bg-gradient-to-r from-[#00d2ff] via-[#4d88ff] to-[#7942f7] bg-clip-text text-transparent">
              {currentTab.headlineHighlight}
            </span>
          </h2>

          {/* Glowing Bullet Features */}
          <ul className="space-y-3 mb-8">
            {currentTab.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-white/85">
                <span className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff] shrink-0" />
                <span className="font-medium tracking-wide">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Dual Action Buttons matching Image 1 */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={currentTab.primaryBtn.href}
              className="bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] hover:from-[#2563eb] hover:to-[#60a5fa] text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full transition-all shadow-[0_4px_25px_rgba(37,99,235,0.5)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.7)] flex items-center gap-2"
            >
              <span>{currentTab.primaryBtn.text}</span>
              <span>→</span>
            </Link>

            <Link
              href={currentTab.secondaryBtn.href}
              className="bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-white/20 hover:border-[#00d2ff]/60 transition-all"
            >
              {currentTab.secondaryBtn.text}
            </Link>
          </div>

        </div>

        {/* Right Column: High-End Cyber Text + Holographic Showcase Card */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
          
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
            {currentTab.paragraph1}
          </p>

          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
            {currentTab.paragraph2}
          </p>

          {/* Holographic Cyber Card from Image 1 */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1836]/90 via-[#070e22]/95 to-[#160a2b]/90 border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] animate-ping" />
                <span className="text-[11px] font-mono text-white/80 font-bold tracking-wider">
                  {currentTab.tabName.toUpperCase()} PREVIEW
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#00d2ff] bg-[#00d2ff]/10 px-2 py-0.5 rounded border border-[#00d2ff]/20">
                ACTIVE
              </span>
            </div>

            {/* Dynamic Card Content depending on Tab */}
            {activeTabId === 'mission-brief' && (
              <div className="font-mono text-xs text-white/70 space-y-1.5 bg-black/40 p-3 rounded-lg border border-white/5">
                <p className="text-[#00d2ff]">$ git clone &lt;repo-url&gt;</p>
                <p className="text-white/40">&gt; Verifying checksum...</p>
                <p className="text-[#4ade80]">✓ Ready: mystery challenge unlocked</p>
              </div>
            )}

            {activeTabId === 'repository-cli' && (
              <div className="font-mono text-xs text-white/70 space-y-1.5 bg-black/40 p-3 rounded-lg border border-white/5">
                <p className="text-[#00d2ff]">$ npm run unlock</p>
                <p className="text-[#ff007f]">&gt; Enter Passphrase: ****************</p>
                <p className="text-[#4ade80]">✓ Decryption Successful</p>
              </div>
            )}

            {activeTabId === 'submit-answer' && (
              <div className="font-mono text-xs text-white/70 space-y-1.5 bg-black/40 p-3 rounded-lg border border-white/5">
                <p className="text-white/50">Target: POST /api/submit</p>
                <p className="text-[#00d2ff]">Email: user@iitp.ac.in</p>
                <p className="text-[#ff007f] font-bold">First Blood Evaluation: ATOMIC</p>
              </div>
            )}

            {activeTabId === 'rules-bounty' && (
              <div className="font-mono text-xs text-white/70 space-y-1.5 bg-black/40 p-3 rounded-lg border border-white/5">
                <p className="text-[#00d2ff]">● Eligibility: IIT Patna Students Only</p>
                <p className="text-white/70">● Single verified entry per participant</p>
                <p className="text-amber-400">● Prize: First Blood Champion Trophy</p>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between text-[11px] text-white/40 pt-1">
              <span>APPISTRY × STC IITP</span>
              <Link href={currentTab.primaryBtn.href} className="text-[#00d2ff] hover:underline flex items-center gap-1 font-mono">
                <span>Open Dedicated Page</span>
                <span>↗</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

