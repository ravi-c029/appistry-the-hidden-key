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

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(1)

  return (
    <div className="relative min-h-screen w-full bg-[#050814] text-white selection:bg-[#00d2ff] selection:text-black overflow-x-hidden font-sans">
      <AntiInspection />

      {/* ── 3D Ribbon Wave Curves on outer backdrop (Exact match to reference canvas) ── */}
      <RibbonWaves />

      {/* Subtle organic ambient glow */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 15% 25%, rgba(0, 210, 255, 0.16) 0%, transparent 50%), radial-gradient(ellipse at 85% 75%, rgba(121, 66, 247, 0.16) 0%, transparent 50%)',
        }}
      />

      {/* ── REFERENCE UI STAGE (EXACT THEME & 3-COLUMN REPLICA) ── */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-10">
        
        {/* The Main Reference Container Card */}
        <div 
          className="relative w-full max-w-[1240px] rounded-[26px] overflow-hidden flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.85)] border border-[rgba(0,210,255,0.18)] my-4"
          style={{
            background: 'linear-gradient(108deg, #071c36 0%, #0a2344 38%, #03050c 50%, #160728 62%, #220835 100%)',
            minHeight: '660px',
          }}
        >
          {/* Vertical Laser Beams & Guidelines from Reference */}
          <div className="absolute top-0 bottom-0 left-[6%] w-[1px] border-l border-dashed border-white/15 pointer-events-none hidden sm:block" />
          <div className="absolute top-0 bottom-0 left-[26%] w-[1px] bg-gradient-to-b from-transparent via-[#00d2ff]/40 to-transparent pointer-events-none hidden lg:block" />
          <div className="absolute top-16 left-[22%] w-[2px] h-20 bg-gradient-to-b from-[#ff007f] to-transparent pointer-events-none hidden lg:block" />
          <div className="absolute top-0 bottom-0 right-[28%] w-[1px] bg-gradient-to-b from-transparent via-[#7942f7]/40 to-transparent pointer-events-none hidden lg:block" />
          <div className="absolute top-0 bottom-0 right-[15%] w-[1px] bg-gradient-to-b from-transparent via-[#00d2ff]/20 to-transparent pointer-events-none hidden sm:block" />

          {/* ── TOP HEADER BAR ── */}
          <header className="relative z-30 w-full px-6 sm:px-12 pt-7 pb-4 flex items-center justify-between">
            {/* Left Header Tag */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#00d2ff] uppercase font-bold px-2.5 py-1 rounded-full border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)]">
                IIT PATNA HYBRID
              </span>
            </div>

            {/* Center Logo: APPISTRY / The Hidden Key (HOLO Cyber Typography) */}
            <div className="text-center flex flex-col items-center select-none">
              <h1 className="text-2xl sm:text-3xl font-black tracking-[0.08em] uppercase italic text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.35)]">
                APPISTRY
              </h1>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#ff007f] -mt-1 uppercase">
                THE HIDDEN KEY
              </span>
            </div>

            {/* Right Hamburger Icon & Admin Link */}
            <div className="flex items-center gap-4">
              <Link 
                href="/admin" 
                className="hidden sm:inline-block text-[11px] font-mono text-white/50 hover:text-[#00d2ff] transition-colors tracking-widest"
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
          </header>

          {/* ── MIDDLE WORKSPACE (3-COLUMN LAYOUT) ── */}
          <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-12 py-8 gap-8 lg:gap-0">

            {/* LEFT COLUMN: Slide Tracker + Menu List */}
            <div className="lg:col-span-4 flex flex-col justify-center h-full pl-0 sm:pl-4 relative">
              
              {/* SLIDE Indicator matching reference: "SLIDE --- 1 / 4" */}
              <div className="flex items-center gap-4 mb-8 select-none">
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

              {/* Home / Mission Node with Horizontal Guide */}
              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7942f7] shadow-[0_0_10px_#7942f7]" />
                <div>
                  <div className="text-base font-bold text-white tracking-wide">Mission</div>
                  <div className="text-[10px] text-white/40 tracking-wider font-mono">App Development Hunt</div>
                </div>
              </div>

              {/* Dotted Navigation Menu */}
              <ul className="flex flex-col gap-3.5 text-xs text-white/70 font-medium">
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer" onClick={() => setActiveSlide(1)}>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 1 ? 'bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]' : 'bg-white/40'}`} />
                  <Link href="/mission">The Challenge Brief</Link>
                </li>
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer" onClick={() => setActiveSlide(2)}>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 2 ? 'bg-[#ff007f] shadow-[0_0_8px_#ff007f]' : 'bg-white/40'}`} />
                  <a href="#how-it-works">How It Works</a>
                </li>
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer" onClick={() => setActiveSlide(3)}>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 3 ? 'bg-[#7942f7] shadow-[0_0_8px_#7942f7]' : 'bg-white/40'}`} />
                  <Link href="/leaderboard">Live Leaderboard</Link>
                </li>
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer" onClick={() => setActiveSlide(4)}>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 4 ? 'bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]' : 'bg-white/40'}`} />
                  <a href="#rules">Rules & Bounty</a>
                </li>
              </ul>
            </div>

            {/* CENTER COLUMN: Central Black Frame with Holographic Cyber Avatar & Rings */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative my-6 lg:my-0">
              
              {/* Central Dark Vertical Showcase Frame from Reference */}
              <div 
                className="relative w-[260px] sm:w-[290px] h-[360px] sm:h-[430px] bg-[#010309] rounded-[20px] overflow-hidden flex items-end justify-center shadow-[0_20px_60px_rgba(0,0,0,0.95)] border border-white/10 z-10"
              >
                {/* Holographic Avatar Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src="/holo-avatar-clean.png" 
                    alt="Holographic Cyborg Avatar"
                    width={290}
                    height={430}
                    priority
                    className="object-contain h-[95%] w-auto select-none pointer-events-none drop-shadow-[0_20px_35px_rgba(0,210,255,0.35)] animate-float"
                  />
                </div>
              </div>

              {/* Concentric Elliptical Hologram Platform Rings under Avatar */}
              <div className="relative w-full max-w-[460px] h-[90px] -mt-12 pointer-events-none z-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[420px] h-[100px] rounded-full border border-[rgba(0,210,255,0.25)] shadow-[0_0_15px_rgba(0,210,255,0.15)] [transform:rotateX(72deg)]" />
                  <div className="absolute w-[340px] h-[80px] rounded-full border border-[rgba(0,210,255,0.35)] shadow-[0_0_15px_rgba(0,210,255,0.2)] [transform:rotateX(72deg)]" />
                  <div className="absolute w-[260px] h-[60px] rounded-full border border-[rgba(0,210,255,0.5)] shadow-[0_0_20px_rgba(0,210,255,0.3)] [transform:rotateX(72deg)]" />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ".beyond / the key." Typography & Mission Subtext */}
            <div className="lg:col-span-4 flex flex-col justify-center h-full pl-0 lg:pl-6 relative">
              
              {/* Reference Typography Hierarchy:
                  Pink Dot + "beyond" in Bold White
                  "the key." in Electric Purple (#7942f7)
              */}
              <div className="relative mb-6 select-none">
                <div className="flex items-baseline gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ff007f] shadow-[0_0_16px_#ff007f] inline-block mb-1" />
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white lowercase">
                    beyond
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-[#7942f7] lowercase -mt-2 sm:-mt-3 drop-shadow-[0_4px_30px_rgba(121,66,247,0.5)]">
                  the key.
                </div>
              </div>

              {/* Subtitle text */}
              <div className="flex items-start gap-4 max-w-sm mb-8">
                <div className="w-8 h-[2px] bg-white mt-2.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  A high-priority secret has been sealed inside the official repository. Discover the unlock utility, decode the cipher, and claim the First Blood bounty.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-4 flex-wrap">
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
          <footer className="relative z-30 w-full px-6 sm:px-12 py-6 flex items-center justify-between border-t border-white/5">
            {/* Left: Club Identity */}
            <div className="flex flex-col text-xs font-bold tracking-wider uppercase text-white/90">
              <span>APPISTRY CLUB</span>
              <span className="text-white/40 text-[10px] font-mono font-normal">STC IIT PATNA HYBRID</span>
            </div>

            {/* Center Pill Button: "Explore Now" from Reference */}
            <Link 
              href="/mission" 
              className="pill-button"
            >
              Explore Now
            </Link>

            {/* Right: Live Leaderboard Link */}
            <div className="flex items-center gap-2">
              <Link 
                href="/leaderboard" 
                className="text-xs font-bold tracking-wider uppercase text-white/80 hover:text-[#00d2ff] transition-colors"
              >
                Live Leaderboard
              </Link>
              <div className="w-[2px] h-5 bg-white/30 hidden sm:block" />
            </div>
          </footer>

        </div>
      </div>

      {/* ── SECTION 2: LIVE COUNTDOWN & REAL-TIME STATS ── */}
      <section id="event-details-section" className="relative z-10 max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="font-mono text-xs text-[#00d2ff] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.06)]">
            LIVE EVENT INFRASTRUCTURE
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
