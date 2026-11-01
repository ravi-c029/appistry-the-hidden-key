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

            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Official Regulations
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5 font-medium">
                8 binding directives for all participants
              </p>
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
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pl-12">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* First Blood Bounty Banner */}
            <div className="neu-card rounded-[28px] p-7 sm:p-9 text-center mb-8">
              <div className="w-14 h-14 rounded-2xl neu-icon-btn mx-auto flex items-center justify-center text-3xl mb-3 text-[#ff5e98]">
                ⚡
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase mb-2">
                The First Blood Bounty
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-6 font-medium leading-relaxed">
                The first participant to decrypt the mystery artifact and register a valid keyword submission on the server will receive the First Blood award and headline APPISTRY communications.
              </p>
              <Link
                href="/mission"
                className="neu-btn-gradient-pink inline-flex items-center gap-2 text-white text-xs uppercase tracking-wider font-bold px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <span>Read Mission Protocol</span>
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
