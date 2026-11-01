'use client'

import Link from 'next/link'
import AntiInspection from '@/components/security/AntiInspection'
import RibbonWaves from '@/components/animations/RibbonWaves'
import CyberGrid from '@/components/animations/CyberGrid'
import CyberFrameStage from '@/components/layout/CyberFrameStage'

const RULES_LIST = [
  {
    num: '01',
    title: 'IIT Patna Eligibility',
    desc: 'Participation is exclusively open to active, verified students of IIT Patna using their official @iitp.ac.in email address.',
  },
  {
    num: '02',
    title: 'Individual Participation',
    desc: 'This is an individual code mystery hunt. Team submissions, shared accounts, and proxy participation are not permitted.',
  },
  {
    num: '03',
    title: 'Single Verified Submission',
    desc: 'Each student is granted one official verified submission. Ensure your discovered keyword is exact before confirming.',
  },
  {
    num: '04',
    title: 'Atomic Server Timestamping',
    desc: 'Official leaderboard rankings are ordered strictly by the atomic server-recorded timestamp upon successful answer verification.',
  },
  {
    num: '05',
    title: 'First Blood Honor',
    desc: 'The very first participant whose submission verifies successfully will be awarded the First Blood Champion title and bounty recognition.',
  },
  {
    num: '06',
    title: 'No Automated Brute-Force',
    desc: 'Submissions are rate-limited. Automated script spamming, brute-force dictionary attacks against submission endpoints, or DoS attempts will result in immediate permanent disqualification.',
  },
  {
    num: '07',
    title: 'Anti-Tampering Integrity',
    desc: 'The platform employs client-side and server-side integrity verification. Any attempt to forge request payloads or falsify timestamps is logged in the audit trail.',
  },
  {
    num: '08',
    title: 'Finality of Decision',
    desc: 'Organizers from APPISTRY (App Development Club, STC IIT Patna Hybrid) retain full authority regarding verification disputes and award designations.',
  },
]

export default function RulesPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#eef2f6] text-slate-800 selection:bg-[#ff5e98] selection:text-white font-sans overflow-x-hidden">
      <AntiInspection />
      <RibbonWaves />
      <CyberGrid />

      <main className="relative z-10 py-6 sm:py-10">
        <CyberFrameStage
          activeNav="rules"
          characterImage="/cyber-hacker-blue.png"
          titleBackdrop={{
            left: 'OFFICIAL',
            right: 'RULEBOOK',
          }}
          leftCallout={{
            title: 'Fair Play Policy',
            description: 'Individual participation only. Automated brute-force attacks result in instant disqualification.',
          }}
          rightContent={{
            badge: 'Code of Conduct',
            title: 'RULES &',
            highlightTitle: 'BOUNTY TERMS',
            description: 'Standard rules of engagement established by APPISTRY (App Development Club × STC IIT Patna Hybrid) for THE HIDDEN KEY challenge.',
            buttonText: 'Start The Hunt',
            buttonHref: '/mission',
          }}
          bottomCards={[
            {
              type: 'stat-image',
              image: '/cyber-hacker-blue.png',
              stat: 'First Blood',
              label: 'Honor Bounty',
              sublabel: 'Permanent recognition on the official IIT Patna leaderboard',
            },
            {
              type: 'feature',
              subtitle: 'Fair Play Terms',
              title: '8 Core Regulations',
              description: 'Rate-limiting, single verified submission, and anti-tampering heuristics enforced.',
            },
            {
              type: 'stat-badge',
              stat: '100%',
              label: 'Fair Competition',
            },
          ]}
        >
          {/* Rules Grid & First Blood Bounty Content */}
          <div className="max-w-[960px] mx-auto py-4">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Official Regulations
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5 font-medium">
                  8 binding directives for all participants
                </p>
              </div>
              <a
                href="/Appistry_The_Hidden_Key_Participant_Rulebook.pdf"
                download="Appistry_The_Hidden_Key_Participant_Rulebook.pdf"
                className="neu-card-sm inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-700 hover:text-[#ff5e98] px-4 py-2.5 rounded-full transition-all cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto active:scale-95"
              >
                <span>📥</span>
                <span>Download Rulebook PDF</span>
              </a>
            </div>

            {/* Rules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {RULES_LIST.map((rule, idx) => (
                <div
                  key={idx}
                  className="neu-card rounded-[24px] p-5 sm:p-6 transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="w-9 h-9 rounded-full neu-icon-btn text-slate-800 font-mono text-xs font-black flex items-center justify-center shrink-0">
                      {rule.num}
                    </span>
                    <h4 className="text-base font-black text-slate-900 tracking-wide">{rule.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium sm:pl-12">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bounties & Top 10 Spotlight Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {/* First Blood Bounty Banner */}
              <div className="neu-card rounded-[28px] p-6 sm:p-8 text-center flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl neu-icon-btn mx-auto flex items-center justify-center text-2xl mb-3 text-[#ff5e98]">
                    ⚡
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight uppercase mb-2">
                    First Blood Bounty
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    The 1st participant whose submission verifies successfully will receive the First Blood award, trophy emblem, and headline announcement.
                  </p>
                </div>
                <div>
                  <Link
                    href="/mission"
                    className="neu-btn-gradient-pink inline-flex items-center gap-2 text-white text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
                  >
                    <span>Mission Protocol →</span>
                  </Link>
                </div>
              </div>

              {/* Top 10 Instagram Spotlight Banner */}
              <div className="neu-card rounded-[28px] p-6 sm:p-8 text-center flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl neu-icon-btn mx-auto flex items-center justify-center text-2xl mb-3 text-[#0072ff]">
                    🌟
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight uppercase mb-2">
                    Top 10 STC Instagram Spotlight
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    The top 10 fastest and correct verified solvers will be featured on the official <strong>STC IIT Patna Hybrid Instagram & social handles</strong> with their photo, rank, and shoutout (with their consent).
                  </p>
                </div>
                <div>
                  <Link
                    href="/leaderboard"
                    className="neu-card-sm inline-flex items-center gap-2 text-slate-800 text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full hover:text-[#ff5e98] transition-all cursor-pointer"
                  >
                    <span>View Leaderboard →</span>
                  </Link>
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
