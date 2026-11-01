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
    const loadHints = () => {
      fetch('/api/hints/public')
        .then(r => r.json())
        .then(data => setHints(data.hints ?? []))
        .catch(() => {})
        .finally(() => setLoading(false))
    }

    loadHints()
    const interval = setInterval(loadHints, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs text-[#00b4d8] tracking-widest uppercase font-bold px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-[2px_2px_6px_rgba(166,180,200,0.25),-2px_-2px_6px_#ffffff]">
          Clues &amp; Hints
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase mt-4">
          Challenge <span className="text-[#00b4d8]">Clues</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
          Official hints broadcast by organizers to assist participants in solving the challenge.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {[1, 2].map(i => (
            <div key={i} className="h-44 rounded-[28px] bg-white border border-white/80 shadow-[8px_8px_20px_rgba(166,180,200,0.3),-8px_-8px_20px_#ffffff] animate-pulse" />
          ))}
        </div>
      ) : hints.length === 0 ? (
        /* Empty State */
        <div className="relative rounded-[28px] bg-white border border-white/90 p-10 sm:p-14 text-center max-w-[560px] mx-auto shadow-[10px_10px_30px_rgba(166,180,200,0.35),-10px_-10px_30px_#ffffff] overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-[#edf2f7] border border-slate-200 flex items-center justify-center text-2xl mx-auto mb-4 shadow-[inset_2px_2px_4px_rgba(166,180,200,0.2)]">
            🔒
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-wide mb-2">
            No Hints Released Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-md mx-auto">
            The challenge is in progress. Organizers will post official hints here as the hunt unfolds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
          {hints.map((hint, i) => (
            <div
              key={hint.id || i}
              className="relative rounded-[28px] bg-white border border-white/90 p-6 sm:p-7 shadow-[10px_10px_25px_rgba(166,180,200,0.35),-10px_-10px_25px_#ffffff] transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#edf2f7] text-[#0284c7] font-bold text-xs border border-slate-200/50 shadow-[inset_1px_1px_2px_rgba(166,180,200,0.2)]">
                  Hint #{hint.order || i + 1}
                </span>
                {hint.publishedAt && (
                  <span className="text-xs text-slate-400 font-medium">
                    {new Date(hint.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-wide mb-2.5">
                {hint.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                {hint.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
