'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CountdownTimer from '@/components/event/CountdownTimer'
import LiveStats from '@/components/event/LiveStats'
import LeaderboardPreview from '@/components/leaderboard/LeaderboardPreview'
import HintsSection from '@/components/event/HintsSection'
import AnnouncementsSection from '@/components/event/AnnouncementsSection'
import FAQSection from '@/components/event/FAQSection'
import RulesSection from '@/components/event/RulesSection'
import AntiInspection from '@/components/security/AntiInspection'

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(1)

  return (
    <div className="relative min-h-screen w-full bg-[#040814] text-white selection:bg-[#00d2ff] selection:text-black overflow-x-hidden font-sans">
      <AntiInspection />

      {/* Background Subtle Organic Wave Graphic from Figma Reference */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 15% 25%, rgba(0, 210, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 85% 75%, rgba(121, 66, 247, 0.15) 0%, transparent 50%)',
        }}
      />

      {/* ── REFERENCE UI STAGE (EXACT REPLICA OF ATTACHED FIGMA UI DESIGN) ── */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-2 sm:p-6 lg:p-10">
        
        {/* The Main Reference Container Card */}
        <div 
          className="relative w-full max-w-[1400px] h-[90vh] min-h-[680px] max-h-[880px] rounded-[24px] overflow-hidden flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.85)] border border-[rgba(0,210,255,0.18)]"
          style={{
            background: 'linear-gradient(105deg, #09172c 0%, #0c1c36 40%, #060914 50%, #110825 80%, #0a0518 100%)'
          }}
        >
          {/* Vertical Laser Beams & Guidelines from Reference */}
          <div className="absolute top-0 bottom-0 left-[6%] w-[1px] border-l border-dashed border-[rgba(255,255,255,0.12)] pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-[26%] w-[1px] bg-gradient-to-b from-transparent via-[rgba(0,210,255,0.4)] to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-[28%] w-[1px] bg-gradient-to-b from-transparent via-[rgba(121,66,247,0.3)] to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-[15%] w-[1px] bg-gradient-to-b from-transparent via-[rgba(0,210,255,0.2)] to-transparent pointer-events-none" />
          <div className="absolute top-16 left-[22%] w-[2px] h-20 bg-gradient-to-b from-[#ff007f] to-[#7942f7]" />

          {/* ── TOP HEADER BAR ── */}
          <div className="relative z-30 w-full px-8 sm:px-14 pt-8 flex items-center justify-between">
            {/* Left Header Tag */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#00d2ff] uppercase font-bold px-2 py-0.5 rounded border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.06)]">
                IIT PATNA HYBRID
              </span>
            </div>

            {/* Center Logo: APPISTRY / The Hidden Key (Styled precisely like "HOLO Graphics" in reference) */}
            <div className="text-center flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl font-black tracking-[-0.03em] uppercase italic text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]">
                APPISTRY
              </h1>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#ff007f] uppercase -mt-1">
                THE HIDDEN KEY
              </span>
            </div>

            {/* Right Hamburger Icon & Quick Nav */}
            <div className="flex items-center gap-4">
              <Link 
                href="/admin" 
                className="hidden sm:inline-block text-[11px] font-mono text-white/50 hover:text-[#00d2ff] transition-colors"
              >
                ADMIN
              </Link>
              <button 
                onClick={() => {
                  const el = document.getElementById('event-details-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-10 h-10 flex flex-col items-end justify-center gap-1.5 cursor-pointer group"
                aria-label="Toggle navigation"
              >
                <div className="w-8 h-[2px] bg-white group-hover:bg-[#00d2ff] transition-all" />
                <div className="w-5 h-[2px] bg-white group-hover:w-8 group-hover:bg-[#ff007f] transition-all" />
              </button>
            </div>
          </div>

          {/* ── MIDDLE WORKSPACE (3-COLUMN EXACT LAYOUT) ── */}
          <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-14">

            {/* LEFT COLUMN: Slide Tracker + Home Menu List */}
            <div className="lg:col-span-4 flex flex-col justify-center h-full pl-2 sm:pl-6 relative">
              
              {/* SLIDE Indicator matching reference: "SLIDE --- 1 / 4" */}
              <div className="flex items-center gap-4 mb-10">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 rotate-180 [writing-mode:vertical-rl]">
                  SLIDE
                </span>
                <div className="h-10 w-[1px] border-l border-dashed border-white/20" />
                <div className="flex flex-col text-sm font-mono font-bold leading-tight">
                  <span className="text-white text-base">0{activeSlide}</span>
                  <span className="text-white/30 text-xs">/ 04</span>
                </div>
                <div className="w-[3px] h-10 bg-gradient-to-b from-[#ff007f] to-[#7942f7] rounded-full ml-2 shadow-[0_0_10px_#ff007f]" />
              </div>

              {/* Home Indicator with Horizontal Cyan Guide Line */}
              <div className="relative flex items-center gap-3 mb-6">
                <div className="absolute -left-20 right-full w-24 h-[1px] bg-gradient-to-r from-transparent to-[#7942f7]" />
                <div className="w-2 h-2 rounded-full bg-[#7942f7] shadow-[0_0_8px_#7942f7]" />
                <div>
                  <div className="text-base font-bold text-white tracking-wide">Mission</div>
                  <div className="text-[10px] text-white/40 tracking-wider font-mono">App Development Hunt</div>
                </div>
              </div>

              {/* Dotted Navigation Menu matching reference bullet list */}
              <ul className="flex flex-col gap-3.5 text-xs text-white/70 font-medium">
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <a href="#how-it-works">How It Works</a>
                </li>
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <Link href="/leaderboard">Live Leaderboard</Link>
                </li>
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <a href="#rules">Rules & Bounty</a>
                </li>
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <a href="#faq">FAQ & Support</a>
                </li>
              </ul>
            </div>

            {/* CENTER COLUMN: Central Black Frame with Holographic Cyber Avatar & Concentric Rings */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center h-full relative">
              
              {/* Central Dark Vertical Showcase Frame from Reference */}
              <div 
                className="relative w-[280px] sm:w-[320px] h-[380px] sm:h-[460px] bg-[#02050e] rounded-[16px] overflow-hidden flex items-end justify-center shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/5"
              >
                {/* Holographic Avatar Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src="/holo-avatar-clean.png" 
                    alt="Cyber Avatar Hologram"
                    width={320}
                    height={460}
                    priority
                    className="object-contain h-[95%] w-auto select-none pointer-events-none drop-shadow-[0_15px_30px_rgba(0,210,255,0.3)] animate-float"
                  />
                </div>
              </div>

              {/* Concentric Elliptical Hologram Platform Rings under Avatar */}
              <div className="hologram-rings">
                <div className="ring-layer ring-1 pulse-ring-anim" />
                <div className="ring-layer ring-2 pulse-ring-anim" style={{ animationDelay: '0.5s' }} />
                <div className="ring-layer ring-3 pulse-ring-anim" style={{ animationDelay: '1s' }} />
              </div>
            </div>

            {/* RIGHT COLUMN: ".beyond / imagen" Typography & Mission Subtext */}
            <div className="lg:col-span-4 flex flex-col justify-center h-full pl-0 lg:pl-6 relative">
              
              {/* Reference Typography Hierarchy:
                  Pink Dot + "beyond" (Bold White)
                  "imagen" -> replaced with "The Key" in Electric Purple (#7942f7)
              */}
              <div className="relative mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ff007f] shadow-[0_0_15px_#ff007f] inline-block" />
                  <span className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] text-white lowercase">
                    beyond
                  </span>
                </div>
                <div className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] text-[#7942f7] lowercase -mt-2 drop-shadow-[0_4px_25px_rgba(121,66,247,0.4)]">
                  the key.
                </div>
              </div>

              {/* Latin/Subtitle text replaced with Event Mission brief */}
              <div className="flex items-start gap-4 max-w-sm mb-8">
                <div className="w-8 h-[2px] bg-white mt-2.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  A high-priority secret has been sealed inside the official repository. Discover the unlock utility, decode the cipher, and claim the First Blood bounty.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-4">
                <Link href="/mission" className="pill-button">
                  Explore Mission ↗
                </Link>
                <Link href="/submit" className="pill-button-secondary">
                  Submit Key
                </Link>
              </div>
            </div>

          </div>

          {/* ── BOTTOM BAR (MATCHING REFERENCE "Create Art | Explore Now | Gallery") ── */}
          <div className="relative z-30 w-full px-8 sm:px-14 pb-8 flex items-center justify-between">
            {/* Left: "Create Art" -> Replaced with "APPISTRY / STC IITP" */}
            <div className="flex flex-col text-xs font-bold tracking-wider uppercase text-white/90">
              <span>APPISTRY CLUB</span>
              <span className="text-white/40 text-[10px] font-mono font-normal">IIT PATNA HYBRID</span>
            </div>

            {/* Center Pill Button: "Explore Now" from Reference */}
            <Link 
              href="/mission" 
              className="pill-button"
            >
              Explore Now
            </Link>

            {/* Right: "Gallery" -> Replaced with "Leaderboard" */}
            <div className="flex items-center gap-2">
              <Link 
                href="/leaderboard" 
                className="text-xs font-bold tracking-wider uppercase text-white/80 hover:text-[#00d2ff] transition-colors"
              >
                Live Leaderboard
              </Link>
              <div className="w-[2px] h-6 bg-white/30" />
            </div>
          </div>

        </div>
      </div>

      {/* ── SECTION 2: LIVE COUNTDOWN & REAL-TIME STATS ── */}
      <section id="event-details-section" className="relative z-10 max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="font-mono text-xs text-[#00d2ff] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.06)]">
            LIVE EVENT STATUS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 text-white">
            The Hunt Is Underway
          </h2>
          <p className="text-sm text-white/60 mt-2 font-mono">
            Every second counts. The first server-verified submission takes First Blood.
          </p>
        </div>

        {/* Countdown */}
        <div className="flex justify-center mb-12">
          <CountdownTimer />
        </div>

        {/* Live Analytics Cards */}
        <LiveStats />
      </section>

      {/* ── SECTION 3: RECENT ANNOUNCEMENTS ── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 py-12">
        <AnnouncementsSection />
      </section>

      {/* ── SECTION 4: HOW IT WORKS ── */}
      <section id="how-it-works" className="relative z-10 max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#7942f7] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full border border-[rgba(121,66,247,0.3)] bg-[rgba(121,66,247,0.06)]">
            WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 text-white">
            How The Challenge Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Clone Repository',
              desc: 'Fetch the official challenge codebase containing the encrypted artifact and custom CLI.',
              accent: '#00d2ff',
            },
            {
              step: '02',
              title: 'Analyze Clues',
              desc: 'Inspect the build tools, commit history, and release hints for the mystery passphrase.',
              accent: '#ff007f',
            },
            {
              step: '03',
              title: 'Run Unlock Utility',
              desc: 'Execute `npm run unlock` in terminal. Input the passphrase to decrypt the artifact.',
              accent: '#7942f7',
            },
            {
              step: '04',
              title: 'Verify & Win',
              desc: 'Submit your revealed keyword on the official portal using your @iitp.ac.in email.',
              accent: '#00d2ff',
            },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-[20px] reference-card-frame flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-2xl font-black" style={{ color: item.accent }}>
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mt-4 mb-2">{item.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">{item.desc}</p>
              </div>
              <div className="w-full h-[2px] bg-white/10 mt-6" />
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: LIVE HINTS ── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 py-12">
        <HintsSection />
      </section>

      {/* ── SECTION 6: LIVE LEADERBOARD PREVIEW ── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 py-16">
        <LeaderboardPreview />
      </section>

      {/* ── SECTION 7: RULES & BOUNTY ── */}
      <section id="rules" className="relative z-10 max-w-[1400px] mx-auto px-6 py-16">
        <RulesSection />
      </section>

      {/* ── SECTION 8: FAQ ── */}
      <section id="faq" className="relative z-10 max-w-[1400px] mx-auto px-6 py-16">
        <FAQSection />
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/10 bg-[#02050e] py-12 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-lg font-black tracking-tight text-white uppercase italic">
              APPISTRY
            </span>
            <span className="text-xs text-white/50">
              App Development Club × STC IIT Patna Hybrid
            </span>
          </div>
          <div className="text-xs text-white/40 font-mono text-center sm:text-right">
            THE HIDDEN KEY — Confidential Mystery Challenge © 2024
          </div>
        </div>
      </footer>
    </div>
  )
}
