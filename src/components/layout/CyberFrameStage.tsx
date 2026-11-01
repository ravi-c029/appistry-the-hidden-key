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
      
      {/* ── THE MASTER WHITE NEUOMORPHIC CLAY FRAME ── */}
      <div className="relative rounded-[32px] sm:rounded-[40px] bg-white border border-white/90 shadow-[15px_15px_35px_rgba(166,180,200,0.38),-15px_-15px_35px_#ffffff] overflow-hidden">
        
        {/* Subtle Ambient Radial Lighting in Pastel Pink & Blue */}
        <div 
          className="absolute -top-40 left-1/4 w-[600px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(255,94,152,0.25) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(0,198,255,0.25) 0%, transparent 70%)' }}
        />

        {/* ── 4 CORNER NOTCH ACCENTS (SOFT NEUOMORPHIC SLATE/PINK) ── */}
        <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-30">
          <div className="w-3.5 h-3.5 rounded-br-lg bg-[#ff5e98] opacity-70" />
          <div className="absolute top-0 left-0 w-7 h-[1px] bg-slate-300" />
          <div className="absolute top-0 left-0 h-7 w-[1px] bg-slate-300" />
        </div>
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-30 flex justify-end">
          <div className="w-3.5 h-3.5 rounded-bl-lg bg-[#ff5e98] opacity-70" />
          <div className="absolute top-0 right-0 w-7 h-[1px] bg-slate-300" />
          <div className="absolute top-0 right-0 h-7 w-[1px] bg-slate-300" />
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-30 flex items-end">
          <div className="w-3.5 h-3.5 rounded-tr-lg bg-[#0072ff] opacity-70" />
          <div className="absolute bottom-0 left-0 w-7 h-[1px] bg-slate-300" />
          <div className="absolute bottom-0 left-0 h-7 w-[1px] bg-slate-300" />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-30 flex items-end justify-end">
          <div className="w-3.5 h-3.5 rounded-tl-lg bg-[#0072ff] opacity-70" />
          <div className="absolute bottom-0 right-0 w-7 h-[1px] bg-slate-300" />
          <div className="absolute bottom-0 right-0 h-7 w-[1px] bg-slate-300" />
        </div>

        {/* Framing Crosshair Guidelines */}
        <div className="absolute top-14 left-0 right-0 h-[1px] bg-slate-200/50 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-slate-200/40 pointer-events-none hidden sm:block" />
        <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-slate-200/40 pointer-events-none hidden sm:block" />

        {/* ── TOP NAV BAR INSIDE THE FRAME ── */}
        <div className="relative z-30 flex items-center justify-between px-6 sm:px-14 py-4 border-b border-slate-200/60">
          <Link href="/" className="flex items-center gap-2 select-none group">
            <span className="text-base sm:text-lg font-black tracking-[0.08em] uppercase text-slate-900 group-hover:text-[#ff5e98] transition-colors">
              APPISTRY
            </span>
            <span className="w-2 h-2 rounded-full bg-[#ff5e98] shadow-[0_0_8px_#ff5e98]" />
            <span className="text-[10px] font-mono text-[#ff5e98] uppercase tracking-wider hidden sm:inline-block font-bold">
              STC IIT PATNA
            </span>
          </Link>

          {/* Desktop Navigation items with active state */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider uppercase">
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
                      ? 'text-[#ff5e98] font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#ff5e98] to-[#0072ff] rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/submit"
              className={`font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-all neu-btn-gradient-pink text-white hover:scale-105 active:scale-95 shadow-md`}
            >
              Submit Key
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-xl neu-card-sm text-slate-700 p-1"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-[2px] bg-[#ff5e98] transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-[2px] bg-slate-700 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-[2px] bg-[#0072ff] transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="relative z-30 md:hidden px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200/60 flex flex-col gap-3 text-xs uppercase font-bold tracking-wider text-slate-700 shadow-md">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'home' ? 'text-[#ff5e98]' : 'text-slate-600'}`}>Home</Link>
            <Link href="/mission" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'mission' ? 'text-[#ff5e98]' : 'text-slate-600'}`}>Mission Brief</Link>
            <Link href="/repository" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'repository' ? 'text-[#ff5e98]' : 'text-slate-600'}`}>Repository &amp; CLI</Link>
            <Link href="/rules" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'rules' ? 'text-[#ff5e98]' : 'text-slate-600'}`}>Rules &amp; Bounty</Link>
            <Link href="/leaderboard" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'leaderboard' ? 'text-[#ff5e98]' : 'text-slate-600'}`}>Leaderboard</Link>
            <Link href="/submit" onClick={() => setMobileMenuOpen(false)} className={`py-1.5 ${activeNav === 'submit' ? 'text-[#ff5e98]' : 'text-slate-600'}`}>Submit Key</Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-slate-400 hover:text-slate-700">Admin Portal</Link>
          </div>
        )}

        {/* ── HERO STAGE: BACKDROP TITLE + CENTERED CYBER CHARACTER + CALLOUTS ── */}
        <div className="relative z-10 px-6 sm:px-14 pt-8 pb-12">
          
          {/* Massive Backdrop Title */}
          <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-6 sm:px-16 pointer-events-none select-none z-0">
            <span 
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-slate-900/[0.04]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {titleBackdrop.left}
            </span>
            <span 
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-[#0072ff]/[0.05]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {titleBackdrop.right}
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 min-h-[460px] pt-6">
            
            {/* Left Side: Callout Box with Elbow Line */}
            <div className="lg:col-span-3 flex flex-col justify-center order-2 lg:order-1 relative z-20">
              <div className="relative neu-card rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff5e98]" />
                  <span className="text-xs font-bold text-slate-900 tracking-wide">
                    {leftCallout.title}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {leftCallout.description}
                </p>
              </div>

              {/* Elbow Line connecting to center character (Desktop only) */}
              <div className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 w-16 pointer-events-none">
                <svg className="w-16 h-10 stroke-[#ff5e98] opacity-70" fill="none">
                  <polyline points="0,20 35,20 60,35" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="60" cy="35" r="4" fill="#ff5e98" />
                </svg>
              </div>
            </div>

            {/* Center: Focal Cyber Character */}
            <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 relative z-10">
              <div className="relative w-[280px] sm:w-[340px] md:w-[380px] aspect-square flex items-center justify-center neu-card rounded-[32px] p-4">
                <Image
                  src={characterImage}
                  alt="Cyber Intelligence Character"
                  width={420}
                  height={420}
                  priority
                  className="w-full h-auto object-contain rounded-2xl"
                />

                {/* Glowing Target Ring on Character */}
                <div className="absolute top-[48%] left-[28%] w-10 h-10 rounded-full border-2 border-[#ff5e98]/60 bg-[#ff5e98]/10 animate-pulse flex items-center justify-center pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5e98] shadow-[0_0_10px_#ff5e98]" />
                </div>
              </div>
            </div>

            {/* Right Side: Section Title + Description + Pill Button */}
            <div className="lg:col-span-4 flex flex-col justify-center order-3 relative z-20 space-y-4">
              {rightContent.badge && (
                <div className="neu-card-sm inline-flex items-center px-4 py-1.5 rounded-full text-[#ff5e98] text-xs font-bold tracking-wider uppercase w-fit">
                  {rightContent.badge}
                </div>
              )}

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                <span>{rightContent.title} </span>
                {rightContent.highlightTitle && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e98] to-[#0072ff]">
                    {rightContent.highlightTitle}
                  </span>
                )}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {rightContent.description}
              </p>

              <div>
                <Link
                  href={rightContent.buttonHref}
                  className="neu-btn-gradient-pink inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <span>{rightContent.buttonText}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>

          {/* ── BOTTOM 3-CARD SHOWCASE GRID ── */}
          {bottomCards && bottomCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-10 pt-8 border-t border-slate-200/60">
              
              {/* Card 1: Wide Card with Thumbnail + Large Stat */}
              {bottomCards[0] && bottomCards[0].type === 'stat-image' && (
                <div className="md:col-span-5 neu-card rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.01]">
                  <div className="w-20 h-20 rounded-xl overflow-hidden neu-card-sm shrink-0 relative bg-slate-100">
                    <Image
                      src={bottomCards[0].image}
                      alt="Showcase thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                      {bottomCards[0].stat}
                    </div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mt-1">
                      {bottomCards[0].label}
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-1 font-medium">
                      {bottomCards[0].sublabel}
                    </div>
                  </div>
                </div>
              )}

              {/* Card 2: Center Feature Text Card */}
              {bottomCards[1] && bottomCards[1].type === 'feature' && (
                <div className="md:col-span-4 neu-card rounded-2xl p-5 flex flex-col justify-center transition-all hover:scale-[1.01]">
                  <div className="text-[11px] font-mono uppercase text-[#ff5e98] tracking-wider mb-1 font-bold">
                    {bottomCards[1].subtitle}
                  </div>
                  <div className="text-sm font-black text-slate-900 uppercase tracking-wide mb-2">
                    {bottomCards[1].title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {bottomCards[1].description}
                  </p>
                </div>
              )}

              {/* Card 3: Right Stat Badge Card */}
              {bottomCards[2] && bottomCards[2].type === 'stat-badge' && (
                <div className="md:col-span-3 neu-card rounded-2xl p-5 flex flex-col justify-center items-center text-center transition-all hover:scale-[1.01]">
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e98] to-[#0072ff] font-mono tracking-tight">
                    {bottomCards[2].stat}
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">
                    {bottomCards[2].label}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Optional In-Page Detailed Content (Forms, Tables, Step Lists) */}
          {children && (
            <div className="mt-8 pt-8 border-t border-slate-200/60">
              {children}
            </div>
          )}

        </div>

      </div>

    </div>
  )
}
