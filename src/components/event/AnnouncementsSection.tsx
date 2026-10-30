'use client'

import { useEffect, useState } from 'react'

interface Announcement {
  id: string
  title: string
  content: string
  type: string
  publishedAt: string
}

const typeStyles: Record<string, { border: string; badge: string; class: string }> = {
  INFO:        { border: 'var(--border-cyan)',            badge: 'badge-cyan',    class: '' },
  WARNING:     { border: 'rgba(245,158,11,0.3)',          badge: 'badge-gold',    class: '' },
  SUCCESS:     { border: 'rgba(34,197,94,0.3)',           badge: 'badge-green',   class: '' },
  FIRST_BLOOD: { border: 'rgba(245,158,11,0.5)',          badge: 'badge-gold',    class: 'first-blood-banner' },
  WINNER:      { border: 'rgba(155,81,224,0.5)',          badge: 'badge-magenta', class: '' },
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
    <div className="flex flex-col gap-4">
      {announcements.map(ann => {
        const style = typeStyles[ann.type] || typeStyles.INFO
        return (
          <div
            key={ann.id}
            className={`glass-card p-5 ${style.class}`}
            style={{ borderColor: style.border }}
          >
            <div className="flex items-start gap-3">
              <div style={{ flex: 1 }}>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={`badge ${style.badge}`}>
                    {ann.type === 'FIRST_BLOOD' ? '🩸 First Blood' :
                     ann.type === 'WINNER' ? '🏆 Winner' :
                     ann.type === 'WARNING' ? '⚠️ Notice' :
                     ann.type === 'SUCCESS' ? '✅ Update' : '📢 Announcement'}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {new Date(ann.publishedAt).toLocaleString('en-IN')}
                  </span>
                </div>
                <h3 className="font-display mb-1" style={{ fontSize: '1rem', fontWeight: 700 }}>
                  {ann.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {ann.content}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
