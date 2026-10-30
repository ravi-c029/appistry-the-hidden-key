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
  const [themeMode, setThemeMode] = useState<'reference' | 'event'>('reference')

  return (
    <div className="relative min-h-screen w-full bg-[#050814] text-white selection:bg-[#00d2ff] selection:text-black overflow-x-hidden font-sans">
      <AntiInspection />

      {/* ── 3D Ribbon Wave Curves on outer backdrop (Exact match to Figma canvas) ── */}
      <RibbonWaves />

      {/* Subtle background ambient radial lighting */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 15% 30%, rgba(0, 210, 255, 0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(121, 66, 247, 0.18) 0%, transparent 55%)',
        }}
      />

      {/* ── REFERENCE UI STAGE (EXACT 1:1 REPLICA OF ATTACHED FIGMA UI DESIGN) ── */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-12">
        
        {/* Floating Figma UI DESIGN Badge on the Left (from Reference Image) */}
        <aside 
          aria-label="UI Design badge"
          className="hidden 2xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-30 select-none opacity-90 hover:opacity-100 transition-opacity"
        >
          <div className="w-16 h-16 rounded-[22px] bg-[#0c101c] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center justify-center p-3">
            {/* Figma Icon Vector */}
            <svg viewBox="0 0 38 57" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
              <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
              <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
              <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
              <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
            </svg>
          </div>
          <span className="font-extrabold text-[11px] tracking-[0.2em] uppercase text-white/90">
            UI DESIGN
          </span>
        </aside>

        {/* The Main Reference Container Card */}
        <div 
          className="relative w-full max-w-[1360px] h-[88vh] min-h-[660px] max-h-[860px] rounded-[26px] overflow-hidden flex flex-col justify-between shadow-[0_35px_100px_rgba(0,0,0,0.95)] border border-[rgba(0,210,255,0.22)]"
          style={{
            background: 'linear-gradient(108deg, #071c36 0%, #0a2344 38%, #03050c 50%, #160728 62%, #220835 100%)'
          }}
        >
          {/* Vertical Laser Beams & Guidelines from Reference */}
          <div className="absolute top-0 bottom-0 left-[6.5%] w-[1px] border-l border-dashed border-white/20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-[26%] w-[1.5px] bg-gradient-to-b from-transparent via-[#00d2ff]/50 to-transparent pointer-events-none" />
          <div className="absolute top-16 left-[22%] w-[2px] h-24 bg-gradient-to-b from-[#ff007f] to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-[28%] w-[1.5px] bg-gradient-to-b from-transparent via-[#7942f7]/40 to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-[15%] w-[1px] bg-gradient-to-b from-transparent via-[#00d2ff]/30 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 right-[10%] w-[2px] h-8 bg-[#00d2ff]/80 pointer-events-none" />

          {/* ── TOP HEADER BAR ── */}
          <header className="relative z-30 w-full px-8 sm:px-14 pt-8 flex items-center justify-between">
            {/* Left Header Attributed Tag */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-[#00d2ff] uppercase font-bold px-2.5 py-1 rounded-full border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)]">
                STC IIT PATNA HYBRID
              </span>
            </div>

            {/* Center Logo: Exact "HOLO Graphics" from Reference Image */}
            <div className="text-center flex flex-col items-center cursor-pointer select-none" onClick={() => setThemeMode(themeMode === 'reference' ? 'event' : 'reference')}>
              <h1 className="text-2xl sm:text-3xl font-black tracking-[0.06em] uppercase italic text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.35)]">
                {themeMode === 'reference' ? 'HOLO' : 'APPISTRY'}
              </h1>
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] text-[#ff007f] -mt-1.5 uppercase">
                {themeMode === 'reference' ? 'Graphics' : 'The Hidden Key'}
              </span>
            </div>

            {/* Right Hamburger Icon & Quick Links */}
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
                <div className="w-8 h-[2.5px] bg-white group-hover:bg-[#00d2ff] transition-all" />
                <div className="w-5 h-[2.5px] bg-white group-hover:w-8 group-hover:bg-[#ff007f] transition-all" />
              </button>
            </div>
          </header>

          {/* ── MIDDLE WORKSPACE (3-COLUMN EXACT LAYOUT) ── */}
          <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-14">

            {/* LEFT COLUMN: Slide Tracker + Home Menu List */}
            <div className="lg:col-span-4 flex flex-col justify-center h-full pl-2 sm:pl-6 relative">
              
              {/* SLIDE Indicator matching reference: "SLIDE --- 1 / 4" */}
              <div className="flex items-center gap-4 mb-10 select-none">
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/50 -rotate-90 origin-center">
                  SLIDE
                </span>
                <div className="h-10 w-[1px] border-l border-dashed border-white/20" />
                <div className="flex flex-col text-sm font-mono font-bold leading-tight">
                  <span className="text-white text-base">0{activeSlide}</span>
                  <span className="text-white/30 text-xs">/ 04</span>
                </div>
                <div className="w-[3px] h-10 bg-gradient-to-b from-[#ff007f] to-[#7942f7] rounded-full ml-2 shadow-[0_0_12px_#ff007f]" />
              </div>

              {/* Home Indicator with Horizontal Guide Line & Node */}
              <div className="relative flex items-center gap-3 mb-6">
                <div className="absolute -left-20 right-full w-24 h-[1px] bg-gradient-to-r from-transparent to-[#7942f7]" />
                <div className="w-2 h-2 rounded-full bg-[#7942f7] shadow-[0_0_10px_#7942f7]" />
                <div>
                  <div className="text-base font-bold text-white tracking-wide">
                    {themeMode === 'reference' ? 'Home' : 'Mission'}
                  </div>
                  <div className="text-[10px] text-white/40 tracking-wider font-mono">
                    {themeMode === 'reference' ? 'Cyber Exploration' : 'App Development Club'}
                  </div>
                </div>
              </div>

              {/* Dotted Navigation Menu matching reference bullet list */}
              <ul className="flex flex-col gap-3.5 text-xs text-white/75 font-medium select-none">
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer" onClick={() => setActiveSlide(1)}>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 1 ? 'bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]' : 'bg-white/40'}`} />
                  <Link href="/mission">
                    {themeMode === 'reference' ? '• Artist' : '• Mission Briefing'}
                  </Link>
                </li>
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer" onClick={() => setActiveSlide(2)}>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 2 ? 'bg-[#ff007f] shadow-[0_0_8px_#ff007f]' : 'bg-white/40'}`} />
                  <a href="#how-it-works">
                    {themeMode === 'reference' ? '• Work' : '• Challenge Workflow'}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer" onClick={() => setActiveSlide(3)}>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 3 ? 'bg-[#7942f7] shadow-[0_0_8px_#7942f7]' : 'bg-white/40'}`} />
                  <Link href="/submit">
                    {themeMode === 'reference' ? '• Contact' : '• Submit Keyword'}
                  </Link>
                </li>
                <li className="flex items-center gap-2.5 hover:text-[#00d2ff] transition-colors cursor-pointer" onClick={() => setActiveSlide(4)}>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === 4 ? 'bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]' : 'bg-white/40'}`} />
                  <a href="#rules">
                    {themeMode === 'reference' ? '• About' : '• Rules & Bounty'}
                  </a>
                </li>
              </ul>
            </div>

            {/* CENTER COLUMN: Central Black Frame with Holographic Cyber Avatar & Concentric Rings */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center h-full relative">
              
              {/* Central Dark Vertical Showcase Frame from Reference */}
              <div 
                className="relative w-[280px] sm:w-[320px] h-[390px] sm:h-[470px] bg-[#010309] rounded-[20px] overflow-hidden flex items-end justify-center shadow-[0_0_60px_rgba(0,0,0,0.95)] border border-white/10"
              >
                {/* Holographic Avatar Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src="/holo-avatar-clean.png" 
                    alt="Holographic Cyborg Avatar"
                    width={320}
                    height={470}
                    priority
                    className="object-contain h-[96%] w-auto select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,210,255,0.35)] animate-float"
                  />
                </div>
              </div>

              {/* Concentric Elliptical Hologram Platform Rings under Avatar */}
              <div className="hologram-rings">
                <div className="ring-layer ring-1 pulse-ring-anim" />
                <div className="ring-layer ring-2 pulse-ring-anim" style={{ animationDelay: '0.6s' }} />
                <div className="ring-layer ring-3 pulse-ring-anim" style={{ animationDelay: '1.2s' }} />
              </div>
            </div>

            {/* RIGHT COLUMN: ".beyond / imagen" Typography & Mission Subtext */}
            <div className="lg:col-span-4 flex flex-col justify-center h-full pl-0 lg:pl-6 relative">
              
              {/* Exact Reference Typography Hierarchy:
                  Pink Dot + "beyond" in Bold White
                  "imagen" in Electric Purple (#7942f7)
              */}
              <div className="relative mb-6 select-none">
                <div className="flex items-baseline gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ff007f] shadow-[0_0_16px_#ff007f] inline-block mb-1" />
                  <span className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white lowercase">
                    beyond
                  </span>
                </div>
                <div className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-[#7942f7] lowercase -mt-2 sm:-mt-3 drop-shadow-[0_4px_30px_rgba(121,66,247,0.5)]">
                  imagen
                </div>
              </div>

              {/* Horizontal line indicator + Subtitle text */}
              <div className="flex items-start gap-4 max-w-sm mb-8">
                <div className="w-8 h-[2px] bg-white mt-2.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex. A classified code mystery sealed within the official repository.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <Link href="/mission" className="pill-button">
                  Explore Now
                </Link>
                <Link href="/submit" className="pill-button-secondary">
                  Submit Key
                </Link>
              </div>
            </div>

          </div>

          {/* ── BOTTOM BAR (MATCHING REFERENCE "Create Art | Explore Now | Gallery") ── */}
          <footer className="relative z-30 w-full px-8 sm:px-14 pb-8 flex items-center justify-between">
            {/* Left: "Create Art" */}
            <div className="flex flex-col text-xs sm:text-sm font-bold tracking-wider uppercase text-white select-none leading-tight">
              <span>Create</span>
              <span>Art</span>
            </div>

            {/* Center Pill Button: "Explore Now" from Reference */}
            <Link 
              href="/mission" 
              className="pill-button"
            >
              Explore Now
            </Link>

            {/* Right: "Gallery" with vertical divider */}
            <div className="flex items-center gap-3">
              <Link 
                href="/leaderboard" 
                className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white hover:text-[#00d2ff] transition-colors"
              >
                Gallery
              </Link>
              <div className="w-[2px] h-6 bg-white/40" />
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
