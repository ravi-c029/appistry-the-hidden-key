'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface BottomStatImageCard {
  type: 'stat-image'
  image: string
  stat: string
  label: string
  sublabel: string
}

interface BottomFeatureCard {
  type: 'feature'
  title: string
  subtitle: string
  description: string
}

interface BottomStatBadgeCard {
  type: 'stat-badge'
  stat: string
  label: string
}

export type BottomCard = BottomStatImageCard | BottomFeatureCard | BottomStatBadgeCard

interface CyberFrameStageProps {
  titleBackdrop: { left: string; right: string }
  characterImage?: string
  activeNav?: 'home' | 'mission' | 'repository' | 'rules' | 'leaderboard' | 'submit'
  leftCallout: {
    title: string
    description: string
  }
  rightContent: {
    badge?: string
    title: string
    highlightTitle?: string
    description: string
    buttonText: string
    buttonHref: string
  }
  bottomCards?: BottomCard[]
  children?: React.ReactNode
}

export default function CyberFrameStage({
  titleBackdrop,
  characterImage = '/cyber-hacker-blue.png',
  activeNav,
  leftCallout,
  rightContent,
  bottomCards,
  children,
}: CyberFrameStageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  return (
    <div className="relative w-full max-w-[1280px] mx-auto py-6 px-3 sm:px-6">
      
      {/* ── THE MASTER CYBER FRAME (EXACT REPLICA OF USER UPLOADED DESIGN) ── */}
      <div className="relative rounded-[24px] bg-[#030612] border border-[#00d2ff]/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Subtle Ambient Radial Lighting in Blue Variant */}
        <div 
          className="absolute -top-40 left-1/4 w-[600px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(0,210,255,0.7) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.8) 0%, transparent 70%)' }}
        />

        {/* ── 4 CORNER NOTCH ACCENTS (CYBER BLUE VARIANT) ── */}
        <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-30">
          <div className="w-4 h-4 rounded-br-xl bg-[#00d2ff] shadow-[0_0_15px_#00d2ff]" />
          <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#00d2ff]" />
          <div className="absolute top-0 left-0 h-8 w-[1px] bg-[#00d2ff]" />
        </div>
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-30 flex justify-end">
          <div className="w-4 h-4 rounded-bl-xl bg-[#00d2ff] shadow-[0_0_15px_#00d2ff]" />
          <div className="absolute top-0 right-0 w-8 h-[1px] bg-[#00d2ff]" />
          <div className="absolute top-0 right-0 h-8 w-[1px] bg-[#00d2ff]" />
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-30 flex items-end">
          <div className="w-4 h-4 rounded-tr-xl bg-[#00d2ff] shadow-[0_0_15px_#00d2ff]" />
          <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-[#00d2ff]" />
          <div className="absolute bottom-0 left-0 h-8 w-[1px] bg-[#00d2ff]" />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-30 flex items-end justify-end">
          <div className="w-4 h-4 rounded-tl-xl bg-[#00d2ff] shadow-[0_0_15px_#00d2ff]" />
          <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#00d2ff]" />
          <div className="absolute bottom-0 right-0 h-8 w-[1px] bg-[#00d2ff]" />
        </div>

        {/* Framing Crosshair Guidelines */}
        <div className="absolute top-12 left-0 right-0 h-[1px] bg-white/[0.06] pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-white/[0.04] pointer-events-none hidden sm:block" />
        <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-white/[0.04] pointer-events-none hidden sm:block" />

        {/* ── TOP NAV BAR INSIDE THE FRAME ── */}
        <div className="relative z-30 flex items-center justify-between px-6 sm:px-14 py-4 border-b border-white/[0.08]">
          <Link href="/" className="flex items-center gap-2 select-none group">
            <span className="text-base sm:text-lg font-black tracking-[0.08em] uppercase text-white group-hover:text-[#00d2ff] transition-colors">
              APPISTRY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
            <span className="text-[10px] font-mono text-[#00d2ff] uppercase tracking-wider hidden sm:inline-block">
              STC IIT PATNA
            </span>
          </Link>

          {/* Desktop Navigation items with active state */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider uppercase">
            {[
              { id: 'home', href: '/', label: 'Home' },
              { id: 'mission', href: '/mission', label: 'Mission' },
              { id: 'repository', href: '/repository', label: 'Repository' },
              { id: 'rules', href: '/rules', label: 'Rules' },
              { id: 'leaderboard', href: '/leaderboard', label: 'Leaderboard' },
            ].map(item => {
              const isActive = activeNav === item.id
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#00d2ff] font-bold drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00d2ff] shadow-[0_0_8px_#00d2ff] rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/submit"
              className={`font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-full transition-all shadow-[0_2px_15px_rgba(0,210,255,0.4)] ${
                activeNav === 'submit'
                  ? 'bg-[#00d2ff] text-black shadow-[0_0_20px_#00d2ff]'
                  : 'bg-gradient-to-r from-[#00d2ff] via-[#2563eb] to-[#7942f7] hover:opacity-90 text-white'
              }`}
            >
              Submit Key
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white p-1"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-[2px] bg-[#00d2ff] transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-[2px] bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-[2px] bg-[#00d2ff] transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="relative z-30 md:hidden px-6 py-4 bg-[#050b1d] border-b border-white/10 flex flex-col gap-3 text-xs uppercase font-mono tracking-wider">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'home' ? 'text-[#00d2ff] font-bold' : 'text-white/70'}`}>Home</Link>
            <Link href="/mission" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'mission' ? 'text-[#00d2ff] font-bold' : 'text-white/70'}`}>Mission Brief</Link>
            <Link href="/repository" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'repository' ? 'text-[#00d2ff] font-bold' : 'text-white/70'}`}>Repository &amp; CLI</Link>
            <Link href="/rules" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'rules' ? 'text-[#00d2ff] font-bold' : 'text-white/70'}`}>Rules &amp; Bounty</Link>
            <Link href="/leaderboard" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'leaderboard' ? 'text-[#00d2ff] font-bold' : 'text-white/70'}`}>Leaderboard</Link>
            <Link href="/submit" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'submit' ? 'text-[#00d2ff] font-bold' : 'text-white/70'}`}>Submit Key</Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-white/40 hover:text-white">Admin Portal</Link>
          </div>
        )}

        {/* ── HERO STAGE: BACKDROP TITLE + CENTERED CYBER CHARACTER + CALLOUTS ── */}
        <div className="relative z-10 px-6 sm:px-14 pt-8 pb-12">
          
          {/* Massive Backdrop Title (Exact typography like "Cyber Punk" in user image) */}
          <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-6 sm:px-16 pointer-events-none select-none z-0">
            <span 
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white/[0.12] drop-shadow-[0_2px_20px_rgba(255,255,255,0.05)]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {titleBackdrop.left}
            </span>
            <span 
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-[#00d2ff]/[0.15] drop-shadow-[0_2px_20px_rgba(0,210,255,0.1)]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {titleBackdrop.right}
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 min-h-[460px] pt-6">
            
            {/* Left Side: Callout Box with Elbow Line (Matching user image) */}
            <div className="lg:col-span-3 flex flex-col justify-center order-2 lg:order-1 relative z-20">
              <div className="relative bg-[#070e24]/90 border border-[#00d2ff]/30 rounded-2xl p-4 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00d2ff]" />
                  <span className="text-xs font-bold text-[#00d2ff] tracking-wide">
                    {leftCallout.title}
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  {leftCallout.description}
                </p>
              </div>

              {/* Elbow Line connecting to center character (Desktop only) */}
              <div className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 w-16 pointer-events-none">
                <svg className="w-16 h-10 stroke-[#00d2ff] opacity-80" fill="none">
                  <polyline points="0,20 35,20 60,35" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="60" cy="35" r="4" fill="#00d2ff" className="shadow-[0_0_10px_#00d2ff]" />
                </svg>
              </div>
            </div>

            {/* Center: Focal Cyber Character (Matching user image) */}
            <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 relative z-10">
              <div className="relative w-[280px] sm:w-[340px] md:w-[380px] aspect-square flex items-center justify-center drop-shadow-[0_25px_60px_rgba(0,210,255,0.3)]">
                <Image
                  src={characterImage}
                  alt="Cyber Intelligence Character"
                  width={420}
                  height={420}
                  priority
                  className="w-full h-auto object-contain rounded-3xl animate-float"
                />

                {/* Glowing Target Ring on Character (Matching yellow/orange ring in user image, but blue variant) */}
                <div className="absolute top-[48%] left-[28%] w-10 h-10 rounded-full border-2 border-[#00d2ff]/60 bg-[#00d2ff]/10 animate-pulse flex items-center justify-center pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] shadow-[0_0_10px_#00d2ff]" />
                </div>
              </div>
            </div>

            {/* Right Side: Section Title + Description + Pill Button (Matching user image) */}
            <div className="lg:col-span-4 flex flex-col justify-center order-3 relative z-20 space-y-4">
              {rightContent.badge && (
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10 text-[#00d2ff] text-xs font-semibold tracking-wider uppercase w-fit">
                  {rightContent.badge}
                </div>
              )}

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-tight">
                <span>{rightContent.title} </span>
                {rightContent.highlightTitle && (
                  <span className="text-[#00d2ff] drop-shadow-[0_2px_15px_rgba(0,210,255,0.4)]">
                    {rightContent.highlightTitle}
                  </span>
                )}
              </h2>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                {rightContent.description}
              </p>

              <div>
                <Link
                  href={rightContent.buttonHref}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00d2ff] to-[#2563eb] hover:from-[#2563eb] hover:to-[#00d2ff] text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full transition-all shadow-[0_4px_20px_rgba(0,210,255,0.4)]"
                >
                  <span>{rightContent.buttonText}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>

          {/* ── BOTTOM 3-CARD SHOWCASE GRID (EXACT MATCH TO USER UPLOADED DESIGN) ── */}
          {bottomCards && bottomCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-8 pt-8 border-t border-white/[0.08]">
              
              {/* Card 1: Wide Card with Thumbnail + Large Stat */}
              {bottomCards[0] && bottomCards[0].type === 'stat-image' && (
                <div className="md:col-span-5 rounded-2xl bg-[#070e24]/85 border border-[#00d2ff]/20 p-4 sm:p-5 flex items-center gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:border-[#00d2ff]/50 transition-all">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 relative">
                    <Image
                      src={bottomCards[0].image}
                      alt="Showcase thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-[#00d2ff] font-mono tracking-tight drop-shadow-[0_2px_10px_rgba(0,210,255,0.4)]">
                      {bottomCards[0].stat}
                    </div>
                    <div className="text-xs font-bold text-white uppercase tracking-wide mt-0.5">
                      {bottomCards[0].label}
                    </div>
                    <div className="text-[11px] text-white/50 leading-tight mt-1">
                      {bottomCards[0].sublabel}
                    </div>
                  </div>
                </div>
              )}

              {/* Card 2: Center Feature Text Card */}
              {bottomCards[1] && bottomCards[1].type === 'feature' && (
                <div className="md:col-span-4 rounded-2xl bg-[#070e24]/85 border border-white/10 p-5 flex flex-col justify-center shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:border-[#00d2ff]/30 transition-all">
                  <div className="text-[11px] font-mono uppercase text-[#00d2ff] tracking-wider mb-1">
                    {bottomCards[1].subtitle}
                  </div>
                  <div className="text-sm font-black text-white uppercase tracking-wide mb-2">
                    {bottomCards[1].title}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {bottomCards[1].description}
                  </p>
                </div>
              )}

              {/* Card 3: Right Stat Badge Card */}
              {bottomCards[2] && bottomCards[2].type === 'stat-badge' && (
                <div className="md:col-span-3 rounded-2xl bg-[#070e24]/85 border border-[#00d2ff]/20 p-5 flex flex-col justify-center items-center text-center shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:border-[#00d2ff]/50 transition-all">
                  <div className="text-3xl sm:text-4xl font-black text-[#00d2ff] font-mono tracking-tight drop-shadow-[0_2px_15px_rgba(0,210,255,0.4)]">
                    {bottomCards[2].stat}
                  </div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mt-1">
                    {bottomCards[2].label}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Optional In-Page Detailed Content (Forms, Tables, Step Lists) */}
          {children && (
            <div className="mt-8 pt-8 border-t border-white/[0.08]">
              {children}
            </div>
          )}

        </div>

      </div>

    </div>
  )
}
