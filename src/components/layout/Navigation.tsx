'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/mission', label: 'Mission Brief' },
  { href: '/repository', label: 'Repository & CLI' },
  { href: '/submit', label: 'Submit Answer' },
  { href: '/rules', label: 'Rules & Bounty' },
  { href: '/leaderboard', label: 'Leaderboard' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 flex items-center px-4 sm:px-8 ${
          scrolled 
            ? 'bg-[#050814]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between">
          
          {/* Brand Logo with Official Appistry Emblem */}
          <Link href="/" className="flex items-center gap-3 select-none group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[#00d2ff]/30 bg-[#070e24] flex items-center justify-center p-0.5 shadow-[0_0_20px_rgba(0,210,255,0.2)] group-hover:border-[#00d2ff] group-hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all">
              <Image
                src="/images/appistry-logo.png"
                alt="APPISTRY Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover rounded-lg"
                priority
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-black tracking-[0.08em] uppercase text-white group-hover:text-[#00d2ff] transition-colors leading-none">
                APPISTRY
              </span>
              <span className="text-[9px] font-semibold tracking-[0.2em] text-[#ff007f] uppercase leading-none">
                STC IIT PATNA HYBRID
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
                  pathname === href 
                    ? 'text-[#00d2ff] font-bold' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[10px] font-mono text-white/40 hover:text-[#00d2ff] uppercase tracking-widest transition-colors hidden sm:inline-block"
            >
              Admin
            </Link>

            <Link
              href="/submit"
              className="bg-white text-[#040814] font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-full hover:bg-[#00d2ff] hover:text-black transition-all shadow-[0_2px_15px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_20px_rgba(0,210,255,0.4)] whitespace-nowrap hidden sm:inline-flex items-center gap-1.5"
            >
              <span>Submit Key</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col items-end justify-center gap-1.5 p-2 text-white"
              aria-label="Toggle navigation menu"
            >
              <div className={`h-[2px] bg-white transition-all ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
              <div className={`h-[2px] bg-white transition-all ${menuOpen ? 'opacity-0' : 'w-4'}`} />
              <div className={`h-[2px] bg-white transition-all ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050814]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 p-6 md:hidden">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-xl font-bold tracking-wider uppercase text-white hover:text-[#00d2ff] transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={closeMenu}
            className="text-sm font-mono text-white/50 hover:text-[#00d2ff] uppercase tracking-widest mt-2"
          >
            Admin Console
          </Link>
          <Link
            href="/submit"
            onClick={closeMenu}
            className="bg-gradient-to-r from-[#00d2ff] to-[#7942f7] text-black font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-full mt-4 shadow-[0_4px_20px_rgba(0,210,255,0.3)]"
          >
            Submit Discovered Key
          </Link>
        </div>
      )}
    </>
  )
}
