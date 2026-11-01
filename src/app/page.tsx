'use client'

import { useState } from 'react'
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
import RibbonWaves from '@/components/animations/RibbonWaves'
import CyberMechHeroSection from '@/components/event/CyberMechHeroSection'

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen w-full bg-[#070b16] text-white selection:bg-[#00d2ff] selection:text-black overflow-x-hidden font-sans">
      <AntiInspection />

      {/* ── 3D Ribbon Wave Curves on outer backdrop (Exact match to reference canvas) ── */}
      <RibbonWaves />

      {/* ── REFERENCE UI STAGE (RESPONSIVE ADAPTIVE LAYOUT) ── */}
      <div className="relative z-10 w-full min-h-[580px] lg:min-h-[780px] py-4 sm:py-8 lg:py-12 px-3 sm:px-6 lg:px-8 flex items-center justify-center">
        
        {/* The Main Reference Container Card */}
        <div 
          className="relative w-full max-w-[1140px] min-h-[560px] lg:h-[620px] rounded-[24px] overflow-hidden flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-white/10"
          style={{
            background: 'linear-gradient(108deg, #071e3b 0%, #0a2548 38%, #010207 42%, #010207 58%, #1a062e 62%, #26083b 100%)',
          }}
        >
          {/* Vertical Laser Beams & Guidelines from Reference (Desktop only so mobile text is never obscured) */}
          <div className="absolute top-0 bottom-0 left-[7%] w-[1px] border-l border-dashed border-white/15 pointer-events-none hidden lg:block" />
          <div className="absolute top-0 left-[28%] w-[1.5px] h-36 bg-gradient-to-b from-transparent via-[#00d2ff] to-transparent pointer-events-none opacity-80 hidden lg:block" />
          <div className="absolute top-10 left-[23%] w-[2px] h-20 bg-gradient-to-b from-[#ff007f] to-transparent pointer-events-none opacity-90 hidden lg:block" />
          <div className="absolute top-0 right-[27%] w-[1.5px] h-36 bg-gradient-to-b from-transparent via-[#7942f7] to-transparent pointer-events-none opacity-80 hidden lg:block" />
          <div className="absolute top-[52%] right-[6%] w-[2px] h-7 bg-[#00d2ff] pointer-events-none opacity-90 hidden lg:block" />

          {/* ── TOP HEADER BAR ── */}
          <header className="relative z-30 w-full px-4 sm:px-8 lg:px-14 pt-4 sm:pt-6 pb-2 flex items-center justify-between shrink-0">
            {/* Left badge on mobile / spacer on desktop */}
            <div className="flex items-center">
              <span className="lg:hidden px-2.5 py-1 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10 text-[9px] font-mono text-[#00d2ff] uppercase tracking-wider font-bold">
                HUNT 2026
              </span>
              <div className="hidden lg:block w-16" />
            </div>

            {/* Center Logo: APPISTRY × STC IIT PATNA HYBRID */}
            <div className="text-center flex flex-col items-center select-none gap-1 sm:gap-1.5">
              <h1 
                className="text-xl sm:text-2xl lg:text-3xl font-black tracking-[0.08em] uppercase italic text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)] leading-none"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                APPISTRY
              </h1>
              <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-semibold tracking-[0.22em] text-[#ff007f] uppercase">
                STC IIT PATNA HYBRID
              </span>
            </div>

            {/* Right Hamburger Icon & Admin shortcut */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link 
                href="/admin" 
                className="text-[10px] font-mono text-white/50 hover:text-[#00d2ff] transition-colors tracking-widest uppercase hidden sm:inline-block"
              >
                Admin
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex flex-col items-end justify-center gap-1.5 cursor-pointer group p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Toggle navigation"
              >
                <div className={`h-[2px] bg-white group-hover:bg-[#00d2ff] transition-all ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2 bg-[#00d2ff]' : 'w-6'}`} />
                <div className={`h-[2px] bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : 'w-4 group-hover:w-6 group-hover:bg-[#ff007f]'}`} />
                <div className={`h-[2px] bg-white group-hover:bg-[#00d2ff] transition-all ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2 bg-[#00d2ff]' : 'w-5'}`} />
              </button>
            </div>
          </header>

          {/* Mobile Slide-Out Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="relative z-40 lg:hidden mx-4 my-2 p-4 rounded-2xl bg-[#050b1d]/95 border border-[#00d2ff]/30 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex flex-col gap-2.5 text-xs font-mono uppercase tracking-wider animate-fadeIn">
              <Link href="/mission" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white/10 text-white/90 hover:text-[#00d2ff] transition-colors flex items-center justify-between">
                <span>Mission Brief</span>
                <span>&rarr;</span>
              </Link>
              <Link href="/repository" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white/10 text-white/90 hover:text-[#00d2ff] transition-colors flex items-center justify-between">
                <span>Repository &amp; CLI</span>
                <span>&rarr;</span>
              </Link>
              <Link href="/submit" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] font-bold flex items-center justify-between">
                <span>Submit Answer</span>
                <span>&rarr;</span>
              </Link>
              <Link href="/rules" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white/10 text-white/90 hover:text-[#00d2ff] transition-colors flex items-center justify-between">
                <span>Rules &amp; Bounty</span>
                <span>&rarr;</span>
              </Link>
              <Link href="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white/10 text-white/90 hover:text-[#00d2ff] transition-colors flex items-center justify-between">
                <span>Leaderboard</span>
                <span>&rarr;</span>
              </Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-white/40 hover:text-white transition-colors border-t border-white/10 pt-3">
                Admin Console
              </Link>
            </div>
          )}

          {/* ── DESKTOP MIDDLE WORKSPACE (EXACT 3-COLUMN FIGMA REFERENCE FOR LARGE SCREENS) ── */}
          <div className="hidden lg:grid relative z-20 flex-1 grid-cols-12 items-center px-8 sm:px-14 min-h-0 py-2">

            {/* LEFT COLUMN: Slide Tracker + Menu List */}
            <div className="col-span-4 flex flex-col justify-center pl-2 sm:pl-6 relative">
              {/* SLIDE Indicator matching reference: "SLIDE --- 1 / 4" */}
              <div className="flex items-center gap-3.5 mb-6 select-none">
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/40 -rotate-90 origin-center">
                  SLIDE
                </span>
                <div className="h-9 w-[1px] border-l border-dashed border-white/20" />
                <div className="flex flex-col text-xs font-mono font-bold leading-tight">
                  <span className="text-white text-sm">1</span>
                  <span className="text-white/30 text-[10px]">/ 4</span>
                </div>
                <div className="w-[3px] h-8 bg-gradient-to-b from-[#ff007f] to-[#7942f7] rounded-full ml-2 shadow-[0_0_10px_#ff007f]" />
              </div>

              {/* Home Node with Horizontal Hairline */}
              <div className="relative flex items-center gap-3 mb-5">
                <div className="w-14 h-[1px] bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-[#7942f7] shadow-[0_0_8px_#7942f7]" />
                <span className="text-sm font-bold text-white tracking-wide">Challenge</span>
              </div>

              {/* Dotted Navigation Menu: Appistry Event Links */}
              <ul className="flex flex-col gap-2.5 text-xs text-white/70 font-light pl-6 select-none">
                <li className="flex items-center gap-2 hover:text-[#00d2ff] transition-colors cursor-pointer">
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <Link href="/mission">Mission Brief</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#00d2ff] transition-colors cursor-pointer">
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <Link href="/repository">Repository &amp; CLI</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#00d2ff] transition-colors cursor-pointer">
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <Link href="/submit">Submit Answer</Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#00d2ff] transition-colors cursor-pointer">
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <Link href="/rules">Rules &amp; Bounty</Link>
                </li>
              </ul>
            </div>

            {/* CENTER COLUMN: Central Black Frame with Holographic Cyber Avatar & Concentric Rings */}
            <div className="col-span-4 flex flex-col items-center justify-center relative">
              <div 
                className="relative w-[200px] h-[260px] bg-[#010207] rounded-[14px] overflow-hidden flex items-end justify-center shadow-[0_0_50px_rgba(0,0,0,0.95)] z-10"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src="/holo-avatar-clean.png" 
                    alt="Holographic Cyborg Avatar"
                    width={200}
                    height={260}
                    priority
                    className="object-contain h-[96%] w-auto select-none pointer-events-none drop-shadow-[0_15px_30px_rgba(0,210,255,0.35)] animate-float"
                  />
                </div>
              </div>

              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[460px] h-[95px] pointer-events-none z-0 flex items-center justify-center">
                <svg className="w-[460px] h-[95px]" viewBox="0 0 460 95" fill="none">
                  <ellipse cx="230" cy="47" rx="220" ry="36" stroke="#00d2ff" strokeOpacity="0.22" strokeWidth="1.2" />
                  <ellipse cx="230" cy="47" rx="170" ry="28" stroke="#00d2ff" strokeOpacity="0.36" strokeWidth="1.2" />
                  <ellipse cx="230" cy="47" rx="122" ry="20" stroke="#00d2ff" strokeOpacity="0.55" strokeWidth="1.4" />
                </svg>
              </div>
            </div>

            {/* RIGHT COLUMN: ".the hidden / key." Typography & Appistry Subtitle */}
            <div className="col-span-4 flex flex-col justify-center pl-4 relative">
              <div className="relative select-none" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
                <div className="flex items-baseline gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff007f] shadow-[0_0_12px_#ff007f] inline-block mb-1" />
                  <span className="text-4xl sm:text-5xl lg:text-[4rem] font-black tracking-[-0.04em] text-white lowercase leading-[0.92]">
                    the hidden
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-[3.5rem] font-black tracking-[-0.03em] text-[#7044ec] lowercase leading-[0.92] mt-0.5 drop-shadow-[0_4px_30px_rgba(112,68,236,0.45)]">
                  key.
                </div>
              </div>

              <div className="flex items-start gap-3 mt-4 max-w-sm">
                <div className="w-7 h-[2px] bg-white mt-2 flex-shrink-0" />
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  A Code Mystery Hunt organized by APPISTRY — App Development Club, STC IIT Patna Hybrid. Inspect the source, crack the encrypted artifact, and claim First Blood.
                </p>
              </div>
            </div>

          </div>

          {/* ── MOBILE / TABLET MIDDLE WORKSPACE (PERFECT VERTICAL ADAPTIVE FLOW) ── */}
          <div className="flex lg:hidden relative z-20 flex-col items-center justify-center px-4 sm:px-8 py-4 flex-1 text-center gap-3">
            
            {/* Title: The Hidden Key */}
            <div className="select-none pt-1" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
              <div className="inline-flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff007f] shadow-[0_0_12px_#ff007f] inline-block" />
                <span className="text-3xl sm:text-4xl font-black tracking-[-0.03em] text-white lowercase">
                  the hidden
                </span>
                <span className="text-3xl sm:text-4xl font-black tracking-[-0.03em] text-[#7044ec] lowercase drop-shadow-[0_4px_25px_rgba(112,68,236,0.6)]">
                  key.
                </span>
              </div>
            </div>

            {/* Central Holographic Avatar Frame with Scaled Perspective Rings */}
            <div className="relative flex flex-col items-center justify-center my-1">
              <div className="relative w-[150px] sm:w-[175px] h-[195px] sm:h-[230px] bg-[#010207] rounded-[16px] overflow-hidden flex items-end justify-center shadow-[0_0_40px_rgba(0,0,0,0.95)] border border-white/10 z-10">
                <Image 
                  src="/holo-avatar-clean.png" 
                  alt="Holographic Cyborg Avatar"
                  width={175}
                  height={230}
                  priority
                  className="object-contain h-[96%] w-auto select-none pointer-events-none drop-shadow-[0_12px_30px_rgba(0,210,255,0.4)] animate-float"
                />
              </div>

              {/* Scaled Perspective Ellipses */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[300px] sm:w-[380px] h-[70px] pointer-events-none z-0 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 460 95" fill="none">
                  <ellipse cx="230" cy="47" rx="220" ry="36" stroke="#00d2ff" strokeOpacity="0.25" strokeWidth="1.2" />
                  <ellipse cx="230" cy="47" rx="170" ry="28" stroke="#00d2ff" strokeOpacity="0.4" strokeWidth="1.2" />
                  <ellipse cx="230" cy="47" rx="122" ry="20" stroke="#00d2ff" strokeOpacity="0.6" strokeWidth="1.4" />
                </svg>
              </div>
            </div>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light max-w-sm px-2 text-center">
              A Code Mystery Hunt organized by <strong className="text-white font-semibold">APPISTRY</strong> (App Development Club, STC IIT Patna Hybrid). Inspect the source, crack the encrypted artifact, and claim First Blood.
            </p>

            {/* Quick Action Chips */}
            <div className="flex items-center justify-center gap-2 flex-wrap text-[11px] font-mono text-white/70 pt-0.5">
              <Link href="/mission" className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#00d2ff] hover:text-[#00d2ff] transition-all">Mission</Link>
              <Link href="/repository" className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#00d2ff] hover:text-[#00d2ff] transition-all">Repo &amp; CLI</Link>
              <Link href="/rules" className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#00d2ff] hover:text-[#00d2ff] transition-all">Rules</Link>
            </div>

          </div>

          {/* ── DESKTOP BOTTOM BAR (MATCHING REFERENCE "Create Art | Explore Now | Gallery") ── */}
          <footer className="hidden lg:flex relative z-30 w-full px-8 sm:px-14 pb-6 pt-2 items-center justify-between shrink-0">
            <div className="flex flex-col text-[11px] font-bold tracking-wider uppercase text-white select-none leading-tight">
              <span>Appistry</span>
              <span className="text-white/60">Events</span>
            </div>

            <Link 
              href="/mission" 
              className="bg-white text-[#040814] font-bold text-xs uppercase tracking-wider px-8 py-2.5 rounded-full hover:bg-[#00d2ff] hover:text-black transition-all shadow-[0_4px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_8px_30px_rgba(0,210,255,0.4)]"
            >
              Explore Mission
            </Link>

            <div className="flex items-center gap-3">
              <Link 
                href="/leaderboard" 
                className="text-xs font-bold tracking-wider uppercase text-white hover:text-[#00d2ff] transition-colors"
              >
                Leaderboard
              </Link>
              <div className="w-[1.5px] h-4 bg-white/40" />
            </div>
          </footer>

          {/* ── MOBILE / TABLET BOTTOM BAR ── */}
          <footer className="flex lg:hidden relative z-30 w-full px-4 sm:px-8 pb-4 pt-3 border-t border-white/10 items-center justify-between gap-3 shrink-0">
            <div className="flex flex-col text-[10px] font-bold tracking-wider uppercase text-white select-none leading-tight">
              <span>Appistry</span>
              <span className="text-[#00d2ff]">Events</span>
            </div>

            <Link 
              href="/mission" 
              className="flex-1 max-w-[170px] text-center bg-white text-[#040814] font-bold text-xs uppercase tracking-wider py-2.5 px-3 rounded-full hover:bg-[#00d2ff] hover:text-black transition-all shadow-[0_4px_15px_rgba(255,255,255,0.25)]"
            >
              Explore Mission
            </Link>

            <Link 
              href="/leaderboard" 
              className="text-xs font-bold tracking-wider uppercase text-white hover:text-[#00d2ff] transition-colors whitespace-nowrap"
            >
              Board &rarr;
            </Link>
          </footer>

        </div>
      </div>

      {/* ── SECTION 2: LIVE COUNTDOWN & REAL-TIME STATS ── */}
      <section id="event-details-section" className="relative z-10 max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-xs text-[#00d2ff] tracking-widest uppercase font-bold px-4 py-1.5 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10">
            Event Overview
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 text-white uppercase">
            The Hunt Is Underway
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-lg mx-auto">
            The first server-verified submission takes the First Blood title.
          </p>
        </div>

        {/* Countdown */}
        <div className="flex justify-center mb-12">
          <CountdownTimer />
        </div>

        {/* Live Analytics Cards */}
        <LiveStats />
      </section>

      {/* ── SECTION 3: CYBER AI FRAMEWORK & 4 TABS (MATCHING REFERENCE IMAGE 1) ── */}
      <CyberMechHeroSection />

      {/* ── SECTION 4: RECENT ANNOUNCEMENTS ── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 py-12">
        <AnnouncementsSection />
      </section>

      {/* ── SECTION 4: HOW IT WORKS ── */}
      <section id="how-it-works" className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 py-16">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs text-[#00d2ff] tracking-widest uppercase font-bold px-4 py-1.5 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10">
            Challenge Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mt-4">
            How The Challenge <span className="text-[#00d2ff]">Works</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-lg mx-auto">
            A 4-step progression from repository cloning to secret keyword submission.
          </p>
        </div>

        {/* 4 Clean Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Clone Repository',
              desc: 'Fetch the official challenge codebase containing the encrypted artifact and custom CLI.',
              command: 'git clone https://github.com/appistry/hidden-key-challenge',
              accent: '#00d2ff',
            },
            {
              step: '02',
              title: 'Analyze Clues',
              desc: 'Inspect the codebase, commit history, and release hints to deduce the mystery passphrase.',
              command: 'git log -S "clue"',
              accent: '#2563eb',
            },
            {
              step: '03',
              title: 'Run Unlock Utility',
              desc: 'Execute unlock CLI in terminal. Enter the passphrase to decrypt the sealed AES-256 vault.',
              command: 'npm run unlock',
              accent: '#7942f7',
            },
            {
              step: '04',
              title: 'Verify & Claim Rank',
              desc: 'Submit your revealed keyword on the official portal using your @iitp.ac.in email.',
              command: 'POST /api/submit',
              accent: '#00d2ff',
            },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="relative rounded-[20px] bg-[#070e24]/85 border border-white/10 p-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.7)] overflow-hidden transition-all hover:border-[#00d2ff]/40 group"
            >
              {/* Corner Notches */}
              <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-br-sm" style={{ backgroundColor: item.accent }} />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none flex items-end justify-end">
                <div className="w-1.5 h-1.5 rounded-tl-sm" style={{ backgroundColor: item.accent }} />
              </div>

              {/* Watermark Step Number in Background */}
              <div className="absolute -top-2 right-4 text-6xl font-black font-mono text-white/[0.04] pointer-events-none select-none">
                {item.step}
              </div>

              <div>
                {/* Step Header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase" style={{ color: item.accent }}>
                    Step {item.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white tracking-wide mb-2 group-hover:text-[#00d2ff] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-white/60 leading-relaxed font-light mb-4">
                  {item.desc}
                </p>
              </div>

              {/* Clean Command Box */}
              <div className="mt-2 pt-3 border-t border-white/[0.06]">
                <div className="bg-[#02050f] border border-white/10 rounded-lg px-3 py-2 font-mono text-xs text-[#00d2ff] truncate">
                  {item.command}
                </div>
              </div>
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
            THE HIDDEN KEY — Confidential Mystery Challenge © 2026
          </div>
        </div>
      </footer>
    </div>
  )
}
