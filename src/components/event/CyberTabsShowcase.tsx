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
      
      {/* ── 4 TABS NAVIGATION BAR (SOFT CLAY NEUOMORPHIC PILLS) ── */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 sm:gap-3 px-2 no-scrollbar">
        {TABS.map(tab => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-white text-slate-900 border border-white/90 shadow-[6px_6px_16px_rgba(166,180,200,0.4),-6px_-6px_16px_#ffffff] font-bold'
                  : 'bg-[#edf2f7] border border-slate-200/40 text-slate-500 hover:text-slate-800 shadow-[inset_2px_2px_4px_rgba(166,180,200,0.2),inset_-2px_-2px_4px_#ffffff]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#00b4d8] shadow-[0_0_8px_#00b4d8]' : 'bg-slate-300'}`} />
              <span>{tab.tabName}</span>
            </button>
          )
        })}
      </div>

      {/* ── DUAL COLUMN HERO FEATURE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Heading + Bullet List + Dual Glowing Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-[2px_2px_6px_rgba(166,180,200,0.25),-2px_-2px_6px_#ffffff] text-[#00b4d8] text-[10px] font-mono tracking-widest uppercase mb-4 w-fit font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]" />
            <span>{currentTab.badgeLabel}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            <span>{currentTab.headlineMain} </span>
            <span className="bg-gradient-to-r from-[#00b4d8] via-[#2563eb] to-[#ff5e98] bg-clip-text text-transparent">
              {currentTab.headlineHighlight}
            </span>
          </h2>

          {/* Glowing Bullet Features */}
          <ul className="space-y-3 mb-8">
            {currentTab.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#00b4d8] shadow-[0_0_6px_#00b4d8] shrink-0" />
                <span className="font-medium tracking-wide">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Dual Action Buttons matching Image */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={currentTab.primaryBtn.href}
              className="neu-btn-gradient-pink font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full hover:opacity-95 transition-all flex items-center gap-2"
            >
              <span>{currentTab.primaryBtn.text}</span>
              <span>→</span>
            </Link>

            <Link
              href={currentTab.secondaryBtn.href}
              className="neu-btn font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full text-slate-700 hover:text-slate-900 transition-all"
            >
              {currentTab.secondaryBtn.text}
            </Link>
          </div>

        </div>

        {/* Right Column: High-End Clay Card Showcase */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
          
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {currentTab.paragraph1}
          </p>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            {currentTab.paragraph2}
          </p>

          {/* Soft Clay Showcase Card (Matching Reference Card) */}
          <div className="relative rounded-[28px] bg-white border border-white/90 p-6 shadow-[10px_10px_25px_rgba(166,180,200,0.35),-10px_-10px_25px_#ffffff] overflow-hidden group">
            
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="text-[11px] font-mono text-slate-800 font-bold tracking-wider">
                  {currentTab.tabName.toUpperCase()} PREVIEW
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#00b4d8] bg-[#edf2f7] px-2.5 py-1 rounded-full border border-slate-200/60 shadow-[inset_1px_1px_2px_rgba(166,180,200,0.2)]">
                ACTIVE
              </span>
            </div>

            {/* Dynamic Card Content depending on Tab */}
            {activeTabId === 'mission-brief' && (
              <div className="font-mono text-xs text-slate-700 space-y-1.5 bg-[#edf2f7] p-4 rounded-2xl shadow-[inset_2px_2px_5px_rgba(166,180,200,0.25),inset_-2px_-2px_5px_#ffffff] border border-slate-200/50">
                <p className="text-[#0284c7] font-bold">$ git clone &lt;repo-url&gt;</p>
                <p className="text-slate-500">&gt; Verifying checksum...</p>
                <p className="text-emerald-600 font-semibold">✓ Ready: mystery challenge unlocked</p>
              </div>
            )}

            {activeTabId === 'repository-cli' && (
              <div className="font-mono text-xs text-slate-700 space-y-1.5 bg-[#edf2f7] p-4 rounded-2xl shadow-[inset_2px_2px_5px_rgba(166,180,200,0.25),inset_-2px_-2px_5px_#ffffff] border border-slate-200/50">
                <p className="text-[#0284c7] font-bold">$ npm run unlock</p>
                <p className="text-[#ff5e98] font-bold">&gt; Enter Passphrase: ****************</p>
                <p className="text-emerald-600 font-semibold">✓ Decryption Successful</p>
              </div>
            )}

            {activeTabId === 'submit-answer' && (
              <div className="font-mono text-xs text-slate-700 space-y-1.5 bg-[#edf2f7] p-4 rounded-2xl shadow-[inset_2px_2px_5px_rgba(166,180,200,0.25),inset_-2px_-2px_5px_#ffffff] border border-slate-200/50">
                <p className="text-[#0284c7] font-bold">&gt; Student: verified @iitp.ac.in</p>
                <p className="text-[#7942f7] font-bold">&gt; Timestamp: atomic server logged</p>
                <p className="text-emerald-600 font-semibold">✓ Rank Assigned: Leaderboard synced</p>
              </div>
            )}

            {activeTabId === 'rules-bounty' && (
              <div className="font-mono text-xs text-slate-700 space-y-1.5 bg-[#edf2f7] p-4 rounded-2xl shadow-[inset_2px_2px_5px_rgba(166,180,200,0.25),inset_-2px_-2px_5px_#ffffff] border border-slate-200/50">
                <p className="text-slate-600">&gt; Single submission per student: ACTIVE</p>
                <p className="text-slate-600">&gt; Max 20/min rate protection: ACTIVE</p>
                <p className="text-[#ff5e98] font-bold">★ First Blood Honor: UNCLAIMED</p>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 pt-2 font-medium border-t border-slate-200/60">
              <span>APPISTRY × STC IITP</span>
              <Link href={currentTab.primaryBtn.href} className="text-[#ff5e98] hover:underline flex items-center gap-1 font-mono font-bold">
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

