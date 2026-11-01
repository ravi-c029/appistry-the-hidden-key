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
    fetch('/api/event/config')
      .then(r => r.json())
      .then(data => {
        setEventStatus(data.eventStatus || 'UPCOMING')
        if (data.eventStartAt) {
          setTargetDate(new Date(data.eventStartAt))
        }
      })
      .catch(() => {
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
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>Hunt Is Live</span>
      </div>
    )
  }

  if (eventStatus === 'ENDED') {
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-wider">
        <span>Event Concluded</span>
      </div>
    )
  }

  if (!timeLeft) {
    return (
      <div className="flex gap-2 sm:gap-4">
        {['Days', 'Hours', 'Mins', 'Secs'].map((label, i) => (
          <div key={i} className="w-16 sm:w-22 h-18 sm:h-24 rounded-2xl bg-[#070e24] border border-white/10 animate-pulse" />
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
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 sm:gap-4">
        {units.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center">
            
            {/* Timer Pod */}
            <div className="relative w-16 sm:w-22 h-18 sm:h-24 rounded-[16px] sm:rounded-[18px] bg-[#070e24]/90 border border-[#00d2ff]/20 flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Notches */}
              <div className="absolute top-0 left-0 w-2 h-2 rounded-br-sm bg-[#00d2ff]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-tl-sm bg-[#00d2ff]" />

              {/* Digits */}
              <span className="font-mono text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {String(value).padStart(2, '0')}
              </span>
            </div>

            {/* Label */}
            <span className="text-xs font-medium tracking-wide text-white/60 mt-2">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
