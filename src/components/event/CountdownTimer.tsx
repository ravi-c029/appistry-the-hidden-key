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
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [eventStatus, setEventStatus] = useState<string>('UPCOMING')
  const [timerBadge, setTimerBadge] = useState<string>('COMMENCES IN')

  useEffect(() => {
    // Default fallback dates: 3 Nov to 8 Nov 2026
    let target = new Date('2026-11-03T00:00:00+05:30')

    const updateTargetFromConfig = (data: { eventStatus?: string; eventStartAt?: string; eventEndAt?: string }) => {
      const now = Date.now()
      const start = data.eventStartAt ? new Date(data.eventStartAt) : new Date('2026-11-03T00:00:00+05:30')
      const end = data.eventEndAt ? new Date(data.eventEndAt) : new Date('2026-11-08T23:59:59+05:30')

      if (now >= start.getTime() && now < end.getTime()) {
        target = end
        setEventStatus('LIVE')
        setTimerBadge('HUNT IS LIVE • CONCLUDES IN')
      } else if (now < start.getTime()) {
        target = start
        setEventStatus('UPCOMING')
        setTimerBadge('CHALLENGE COMMENCES IN')
      } else {
        target = end
        setEventStatus('ENDED')
        setTimerBadge('CHALLENGE CONCLUDED')
      }
    }

    fetch('/api/event/config')
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          updateTargetFromConfig(data)
        } else {
          updateTargetFromConfig({})
        }
      })
      .catch(() => {
        updateTargetFromConfig({})
      })

    const calculate = () => {
      const now = Date.now()
      const total = target.getTime() - now

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
  }, [])

  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 sm:gap-4">
          {['Days', 'Hours', 'Mins', 'Secs'].map((label, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative w-16 sm:w-22 h-18 sm:h-24 rounded-[18px] sm:rounded-[22px] bg-white border border-white/90 flex items-center justify-center shadow-[8px_8px_20px_rgba(166,180,200,0.35),-8px_-8px_20px_#ffffff] animate-pulse">
                <span className="font-mono text-2xl sm:text-4xl font-black text-slate-300">00</span>
              </div>
              <span className="text-xs font-bold tracking-wider uppercase text-slate-400 mt-2">{label}</span>
            </div>
          ))}
        </div>
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
      {/* Live / Status Indicator Pill */}
      <div className="mb-4">
        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border shadow-xs ${
          eventStatus === 'LIVE'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : eventStatus === 'ENDED'
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-pink-50 text-[#ff5e98] border-pink-200'
        }`}>
          <span className={`w-2 h-2 rounded-full ${
            eventStatus === 'LIVE' ? 'bg-emerald-500 animate-ping' : 'bg-[#ff5e98]'
          }`} />
          <span>{timerBadge}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {units.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center">
            
            {/* Timer Pod (Neuomorphic Clay White) */}
            <div className="relative w-16 sm:w-22 h-18 sm:h-24 rounded-[18px] sm:rounded-[22px] bg-white border border-white/90 flex items-center justify-center shadow-[8px_8px_20px_rgba(166,180,200,0.35),-8px_-8px_20px_#ffffff] overflow-hidden">
              {/* Digits */}
              <span className="font-mono text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {String(value).padStart(2, '0')}
              </span>
            </div>

            {/* Label */}
            <span className="text-xs font-bold tracking-wider uppercase text-slate-500 mt-2">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
