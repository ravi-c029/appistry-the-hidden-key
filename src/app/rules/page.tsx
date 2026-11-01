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
    <div className="relative min-h-screen w-full bg-[#030612] text-white selection:bg-[#00d2ff] selection:text-black font-sans overflow-x-hidden">
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
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Official Regulations
              </h3>
              <p className="text-xs text-white/50 font-mono mt-0.5">
                8 binding directives for all participants
              </p>
            </div>

            {/* Rules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {RULES_LIST.map((rule, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#070e24]/85 border border-white/10 p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-[#00d2ff]/40 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {rule.num}
                    </span>
                    <h4 className="text-base font-bold text-white tracking-wide">{rule.title}</h4>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-light pl-11">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* First Blood Bounty Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-[#0a1835]/90 via-[#070e24]/90 to-[#120a2e]/90 border border-[#00d2ff]/40 p-6 sm:p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-8">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase mb-2">
                The First Blood Bounty
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto mb-6">
                The first participant to decrypt the mystery artifact and register a valid keyword submission on the server will receive the First Blood award and headline APPISTRY communications.
              </p>
              <Link
                href="/mission"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] via-[#2563eb] to-[#7942f7] text-white text-xs uppercase tracking-wider font-bold px-8 py-3.5 rounded-full hover:opacity-95 transition-all shadow-[0_4px_25px_rgba(0,210,255,0.4)]"
              >
                <span>Read Mission Protocol</span>
                <span>→</span>
              </Link>
            </div>

            {/* Back to Home Link */}
            <div className="text-center mt-6">
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
