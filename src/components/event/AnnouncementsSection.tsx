'use client'

import { useEffect, useState } from 'react'

interface Announcement {
  id: string
  title: string
  content: string
  type: string
  publishedAt: string
}

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    fetch('/api/announcements/public')
      .then(r => r.json())
      .then(data => setAnnouncements(data.announcements ?? []))
      .catch(() => {})

    const interval = setInterval(() => {
      fetch('/api/announcements/public')
        .then(r => r.json())
        .then(data => setAnnouncements(data.announcements ?? []))
        .catch(() => {})
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  if (announcements.length === 0) return null

  return (
    <div className="w-full">
      {/* Clean Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs uppercase tracking-widest text-[#00b4d8] font-bold">
          Announcements &amp; Updates
        </span>
        <div className="flex-1 h-[1px] bg-slate-200" />
      </div>

      <div className="flex flex-col gap-4">
        {announcements.map((ann, idx) => {
          const isFirstBlood = ann.type === 'FIRST_BLOOD'
          const isWarning = ann.type === 'WARNING'
          const isSuccess = ann.type === 'SUCCESS'

          const accentColor = isFirstBlood ? '#ff5e98' : isWarning ? '#f59e0b' : isSuccess ? '#10b981' : '#00b4d8'
          const tagLabel = isFirstBlood ? 'First Blood Bounty' : isWarning ? 'Notice' : isSuccess ? 'Update' : 'Announcement'

          return (
            <div
              key={ann.id || idx}
              className="relative rounded-[28px] bg-white border border-white/90 p-6 shadow-[10px_10px_25px_rgba(166,180,200,0.35),-10px_-10px_25px_#ffffff] transition-all hover:-translate-y-1"
            >
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span
                    className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-[inset_1px_1px_2px_rgba(166,180,200,0.15)]"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                      border: `1px solid ${accentColor}30`,
                    }}
                  >
                    {tagLabel}
                  </span>

                  <span className="text-xs text-slate-400 font-medium">
                    {new Date(ann.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })} at {new Date(ann.publishedAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide mb-1.5">
                  {ann.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {ann.content}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
