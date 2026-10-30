'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState<Date | null>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [eventStatus, setEventStatus] = useState<string>('UPCOMING')

  useEffect(() => {
    // Fetch event config
    fetch('/api/event/config')
      .then(r => r.json())
      .then(data => {
        setEventStatus(data.eventStatus || 'UPCOMING')
        if (data.eventStartAt) {
          setTargetDate(new Date(data.eventStartAt))
        }
      })
      .catch(() => {
        // Default: 48h from now
        setTargetDate(new Date(Date.now() + 48 * 60 * 60 * 1000))
      })
  }, [])

  useEffect(() => {
    if (!targetDate) return

    const calculate = () => {
      const now = Date.now()
      const total = targetDate.getTime() - now

      if (total <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 })
        return
      }

      const days = Math.floor(total / (1000 * 60 * 60 * 24))
      const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((total % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, total })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (eventStatus === 'LIVE') {
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          className="badge badge-green animate-glow-pulse"
          style={{ margin: '0 auto 0.5rem', fontSize: '0.9rem', padding: '0.5rem 1.5rem' }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80', display: 'inline-block', marginRight: '0.5rem' }} />
          EVENT IS LIVE
        </div>
      </div>
    )
  }

  if (eventStatus === 'ENDED') {
    return (
      <div className="badge badge-red" style={{ margin: '0 auto', fontSize: '0.9rem', padding: '0.5rem 1.5rem' }}>
        Event has ended
      </div>
    )
  }

  if (!timeLeft) {
    return (
      <div className="flex gap-6">
        {['--', '--', '--', '--'].map((_, i) => (
          <div key={i} className="text-center">
            <div className="countdown-digit skeleton" style={{ width: 60, height: 56, borderRadius: '4px' }} />
          </div>
        ))}
      </div>
    )
  }

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  return (
    <div>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Event starts in
      </p>
      <div className="flex items-end gap-4">
        {units.map(({ value, label }, i) => (
          <div key={label} className="text-center">
            <div
              className="glass-card"
              style={{
                padding: '1rem 1.25rem',
                minWidth: '72px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top highlight */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '15%',
                right: '15%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--cyan-dim), transparent)',
              }} />
              <div className="countdown-digit">
                {String(value).padStart(2, '0')}
              </div>
            </div>
            <div className="countdown-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
