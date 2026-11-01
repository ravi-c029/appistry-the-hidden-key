'use client'

import { useEffect, useState } from 'react'

interface Hint {
  id: string
  title: string
  content: string
  order: number
  publishedAt: string | null
}

export default function HintsSection() {
  const [hints, setHints] = useState<Hint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hints/public')
      .then(r => r.json())
      .then(data => setHints(data.hints ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs text-[#00d2ff] tracking-widest uppercase font-bold px-4 py-1.5 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10">
          Clues &amp; Hints
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mt-4">
          Challenge <span className="text-[#00d2ff]">Clues</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-lg mx-auto">
          Official hints broadcast by organizers to assist participants in solving the challenge.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
          {[1, 2].map(i => (
            <div key={i} className="h-40 rounded-[20px] bg-[#070e24] border border-white/10 animate-pulse" />
          ))}
        </div>
      ) : hints.length === 0 ? (
        /* Empty State */
        <div className="relative rounded-[24px] bg-[#070e24]/85 border border-white/10 p-10 sm:p-14 text-center max-w-[560px] mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex items-center justify-center text-2xl mx-auto mb-4">
            🔒
          </div>
          <h3 className="text-lg font-bold text-white tracking-wide mb-2">
            No Hints Released Yet
          </h3>
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-md mx-auto">
            The challenge is in progress. Organizers will post official hints here as the hunt unfolds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1000px] mx-auto">
          {hints.map((hint, i) => (
            <div
              key={hint.id || i}
              className="relative rounded-[20px] bg-[#070e24]/85 border border-white/10 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all hover:border-[#00d2ff]/40"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/25 text-[#00d2ff] text-xs font-semibold">
                  Hint #{hint.order || i + 1}
                </span>
                {hint.publishedAt && (
                  <span className="text-xs text-white/40">
                    {new Date(hint.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white tracking-wide mb-2">
                {hint.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light whitespace-pre-line">
                {hint.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
