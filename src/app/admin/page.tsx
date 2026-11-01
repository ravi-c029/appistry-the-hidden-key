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
    <div className="relative min-h-screen w-full bg-[#eef2f6] text-slate-800 selection:bg-[#ff5e98] selection:text-white font-sans overflow-x-hidden flex items-center justify-center p-4">
      <RibbonWaves />

      <div className="relative z-10 w-full max-w-[420px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center group mb-3 gap-1">
            <span className="text-2xl font-black tracking-[0.08em] uppercase text-slate-900 group-hover:text-[#ff5e98] transition-colors leading-none">
              APPISTRY
            </span>
            <span className="block text-[10px] font-bold tracking-[0.22em] text-[#ff5e98] uppercase">
              STC IIT PATNA HYBRID
            </span>
          </Link>
          <div className="w-16 h-16 rounded-2xl neu-icon-btn overflow-hidden flex items-center justify-center mx-auto mb-4 p-1">
            <Image
              src="/images/appistry-logo.png"
              alt="APPISTRY Emblem"
              width={56}
              height={56}
              className="w-full h-full object-cover rounded-xl"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Console</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Authorized event organizers only</p>
        </div>

        {/* Form Card */}
        <div className="neu-card rounded-[28px] p-7 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">
                Organizer Email
              </label>
              <input
                id="admin-email"
                type="email"
                className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@appistry.dev"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="neu-input w-full rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5e98]/30 transition-all font-sans"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-300 bg-rose-50 p-3.5 text-xs text-rose-700 font-medium">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="neu-btn-gradient-pink w-full text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md disabled:opacity-50 cursor-pointer mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Super-Admin'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs font-mono text-slate-500 hover:text-[#ff5e98] transition-colors font-medium">
            ← Return to Event Challenge
          </Link>
        </div>
      </div>
    </div>
  )
}
