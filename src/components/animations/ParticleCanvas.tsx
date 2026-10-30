'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

const COLORS = [
  'rgba(0, 240, 255, ',   // cyan
  'rgba(155, 81, 224, ',  // violet
  'rgba(224, 36, 195, ',  // magenta
]

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnParticle = (): Particle => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 1.2 + 0.4),
        size: Math.random() * 2 + 0.5,
        opacity: 0,
        color,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      }
    }

    let frameCount = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frameCount++

      // Spawn new particles
      if (frameCount % 3 === 0 && particlesRef.current.length < 80) {
        particlesRef.current.push(spawnParticle())
      }

      // Update and draw
      particlesRef.current = particlesRef.current.filter(p => {
        p.life++
        p.x += p.vx
        p.y += p.vy

        const progress = p.life / p.maxLife
        if (progress < 0.1) {
          p.opacity = progress / 0.1 * 0.7
        } else if (progress > 0.8) {
          p.opacity = (1 - progress) / 0.2 * 0.7
        } else {
          p.opacity = 0.7
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.opacity})`
        ctx.fill()

        return p.life < p.maxLife && p.y > -20
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
