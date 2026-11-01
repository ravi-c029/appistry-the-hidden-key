'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import RibbonWaves from '@/components/animations/RibbonWaves'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Authentication failed. Please verify credentials.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#070b16] text-white selection:bg-[#00d2ff] selection:text-black font-sans overflow-x-hidden flex items-center justify-center p-4">
      <RibbonWaves />

      <div className="relative z-10 w-full max-w-[420px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center group mb-3 gap-1">
            <span className="text-2xl font-black tracking-[0.08em] uppercase text-white group-hover:text-[#00d2ff] transition-colors leading-none">
              APPISTRY
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-[#ff007f] uppercase">
              STC IIT PATNA HYBRID
            </span>
          </Link>
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#00d2ff]/30 bg-[#070e24] flex items-center justify-center mx-auto mb-4 p-1 shadow-[0_0_25px_rgba(0,210,255,0.25)]">
            <Image
              src="/images/appistry-logo.png"
              alt="APPISTRY Emblem"
              width={56}
              height={56}
              className="w-full h-full object-cover rounded-xl"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Console</h1>
          <p className="text-xs text-white/50 mt-1">Authorized event organizers only</p>
        </div>

        {/* Form Card */}
        <div className="rounded-[24px] bg-[#081226]/85 border border-white/10 p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                Organizer Email
              </label>
              <input
                id="admin-email"
                type="email"
                className="w-full bg-[#02050f] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00d2ff] transition-colors"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@appistry.dev"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="w-full bg-[#02050f] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00d2ff] transition-colors"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00d2ff] to-[#7942f7] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full transition-all shadow-[0_4px_25px_rgba(0,210,255,0.3)] disabled:opacity-50 cursor-pointer mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Super-Admin'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs font-mono text-white/40 hover:text-[#00d2ff] transition-colors">
            ← Return to Event Challenge
          </Link>
        </div>
      </div>
    </div>
  )
}
