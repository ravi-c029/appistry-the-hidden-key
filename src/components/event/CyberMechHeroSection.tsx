'use client'

import Image from 'next/image'
import CyberGrid from '@/components/animations/CyberGrid'
import CyberTabsShowcase from '@/components/event/CyberTabsShowcase'

export default function CyberMechHeroSection() {
  return (
    <section id="cyber-ai-framework" className="relative w-full overflow-hidden bg-[#eef2f6] py-20 px-4 sm:px-6">
      <CyberGrid />

      <div className="relative z-10 max-w-[1240px] mx-auto">
        
        {/* ── TOP HERO STAGE: 3D CYBER MECH WITH FLOATING CALLOUT LABELS ── */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[480px] sm:min-h-[560px] select-none mb-12">
          
          {/* Giant Split Techno Typography Behind Mech */}
          <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-4 sm:px-16 pointer-events-none z-0">
            <span 
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-slate-900/[0.05]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              APPISTRY
            </span>
            <span 
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-[#00b4d8]/[0.08]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              HIDDEN KEY
            </span>
          </div>

          {/* Centered 3D Cyber Mech Warrior Image */}
          <div className="relative z-10 w-[280px] sm:w-[380px] md:w-[440px] aspect-square flex items-center justify-center drop-shadow-[0_20px_40px_rgba(166,180,200,0.4)]">
            <Image
              src="/cyber-mech-hero.png"
              alt="APPISTRY Cybernetic Intelligence Mech"
              width={480}
              height={480}
              priority
              className="w-full h-auto object-contain rounded-3xl"
            />
          </div>

          {/* Left Callout Line */}
          <div className="hidden md:flex absolute left-8 top-1/3 z-20 items-center">
            <div className="bg-white border border-white/90 rounded-2xl px-5 py-4 shadow-[8px_8px_20px_rgba(166,180,200,0.35),-8px_-8px_20px_#ffffff] max-w-[210px]">
              <div className="text-xs font-bold text-[#00b4d8] tracking-wide mb-1">
                AES-256 Vault
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                Local key derivation with authenticated GCM verification.
              </p>
            </div>
            {/* SVG Elbow Connector Line */}
            <svg className="w-24 h-12 stroke-[#00b4d8] opacity-70" fill="none">
              <polyline points="0,24 60,24 96,40" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="96" cy="40" r="3" fill="#00b4d8" />
            </svg>
          </div>

          {/* Right Callout Line */}
          <div className="hidden md:flex absolute right-8 top-1/3 z-20 items-center flex-row-reverse">
            <div className="bg-white border border-white/90 rounded-2xl px-5 py-4 shadow-[8px_8px_20px_rgba(166,180,200,0.35),-8px_-8px_20px_#ffffff] max-w-[210px] text-right">
              <div className="text-xs font-bold text-[#ff5e98] tracking-wide mb-1">
                First Blood
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                Atomic timestamp detection on official portal.
              </p>
            </div>
            {/* SVG Elbow Connector Line */}
            <svg className="w-24 h-12 stroke-[#ff5e98] opacity-70" fill="none">
              <polyline points="96,24 36,24 0,40" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="0" cy="40" r="3" fill="#ff5e98" />
            </svg>
          </div>

        </div>

        {/* ── 4 TABS INTERACTIVE SHOWCASE ── */}
        <CyberTabsShowcase initialTab="mission-brief" />

      </div>
    </section>
  )
}

