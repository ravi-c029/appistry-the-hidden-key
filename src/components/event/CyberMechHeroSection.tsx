'use client'

import Image from 'next/image'
import CyberGrid from '@/components/animations/CyberGrid'
import CyberTabsShowcase from '@/components/event/CyberTabsShowcase'

export default function CyberMechHeroSection() {
  return (
    <section id="cyber-ai-framework" className="relative w-full overflow-hidden bg-[#030712] py-20 px-4 sm:px-6">
      <CyberGrid />

      <div className="relative z-10 max-w-[1240px] mx-auto">
        
        {/* ── TOP HERO STAGE: 3D CYBER MECH WITH FLOATING CALLOUT LABELS (EXACT MATCH TO IMAGE 1) ── */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[480px] sm:min-h-[560px] select-none mb-12">
          
          {/* Giant Split Techno Typography Behind Mech */}
          <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-4 sm:px-16 pointer-events-none z-0">
            <span 
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white/10"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              APPISTRY
            </span>
            <span 
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-[#00d2ff]/10"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              HIDDEN KEY
            </span>
          </div>

          {/* Centered 3D Cyber Mech Warrior Image */}
          <div className="relative z-10 w-[280px] sm:w-[380px] md:w-[440px] aspect-square flex items-center justify-center drop-shadow-[0_20px_60px_rgba(0,210,255,0.35)]">
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
            <div className="bg-[#081226]/90 border border-[#00d2ff]/30 rounded-xl px-4 py-3 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-w-[200px]">
              <div className="text-xs font-bold text-[#00d2ff] tracking-wide mb-1">
                AES-256 Vault
              </div>
              <p className="text-[11px] text-white/60 leading-tight">
                Local key derivation with authenticated GCM verification.
              </p>
            </div>
            {/* SVG Elbow Connector Line */}
            <svg className="w-24 h-12 stroke-[#00d2ff] opacity-80" fill="none">
              <polyline points="0,24 60,24 96,40" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="96" cy="40" r="3" fill="#00d2ff" />
            </svg>
          </div>

          {/* Right Callout Line */}
          <div className="hidden md:flex absolute right-8 top-1/3 z-20 items-center flex-row-reverse">
            <div className="bg-[#081226]/90 border border-[#7942f7]/30 rounded-xl px-4 py-3 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-w-[200px] text-right">
              <div className="text-xs font-bold text-[#7942f7] tracking-wide mb-1">
                First Blood
              </div>
              <p className="text-[11px] text-white/60 leading-tight">
                Atomic timestamp detection on official portal.
              </p>
            </div>
            {/* SVG Elbow Connector Line */}
            <svg className="w-24 h-12 stroke-[#7942f7] opacity-80" fill="none">
              <polyline points="96,24 36,24 0,40" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="0" cy="40" r="3" fill="#7942f7" />
            </svg>
          </div>

        </div>

        {/* ── 4 TABS INTERACTIVE SHOWCASE (MATCHING IMAGE 1 BELOW SECTION) ── */}
        <CyberTabsShowcase initialTab="mission-brief" />

      </div>
    </section>
  )
}

