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
        <span className="text-xs uppercase tracking-widest text-[#00d2ff] font-bold">
          Announcements &amp; Updates
        </span>
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      <div className="flex flex-col gap-4">
        {announcements.map((ann, idx) => {
          const isFirstBlood = ann.type === 'FIRST_BLOOD'
          const isWarning = ann.type === 'WARNING'
          const isSuccess = ann.type === 'SUCCESS'

          const accentColor = isFirstBlood ? '#ff007f' : isWarning ? '#febc2e' : isSuccess ? '#28c840' : '#00d2ff'
          const tagLabel = isFirstBlood ? 'First Blood Bounty' : isWarning ? 'Notice' : isSuccess ? 'Update' : 'Announcement'

          return (
            <div
              key={ann.id || idx}
              className="relative rounded-[20px] bg-[#070e24]/85 border border-white/10 p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] overflow-hidden transition-all hover:border-[#00d2ff]/40"
            >
              {/* Corner Notches */}
              <div className="absolute top-0 left-0 w-3.5 h-3.5 pointer-events-none">
                <div className="w-2 h-2 rounded-br-sm" style={{ backgroundColor: accentColor }} />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 pointer-events-none flex items-end justify-end">
                <div className="w-2 h-2 rounded-tl-sm" style={{ backgroundColor: accentColor }} />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                      border: `1px solid ${accentColor}35`,
                    }}
                  >
                    {tagLabel}
                  </span>

                  <span className="text-xs text-white/40">
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

                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide mb-1.5">
                  {ann.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
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
