'use client'

export default function RibbonWaves() {
  // Generates smooth sinusoidal spline ribbons matching the Figma background mesh
  const waves = [
    { d: "M -100 200 Q 150 100, 300 350 T 700 300 T 1100 500", opacity: 0.15, strokeWidth: 1 },
    { d: "M -100 220 Q 150 120, 300 370 T 700 320 T 1100 520", opacity: 0.20, strokeWidth: 1.2 },
    { d: "M -100 240 Q 150 140, 300 390 T 700 340 T 1100 540", opacity: 0.25, strokeWidth: 1 },
    { d: "M -100 260 Q 150 160, 300 410 T 700 360 T 1100 560", opacity: 0.30, strokeWidth: 1.5 },
    { d: "M -100 280 Q 150 180, 300 430 T 700 380 T 1100 580", opacity: 0.25, strokeWidth: 1.2 },
    { d: "M -100 300 Q 150 200, 300 450 T 700 400 T 1100 600", opacity: 0.20, strokeWidth: 1 },
    { d: "M -100 320 Q 150 220, 300 470 T 700 420 T 1100 620", opacity: 0.15, strokeWidth: 0.8 },

    // Bottom-left cluster
    { d: "M -50 600 Q 200 500, 350 750 T 750 700 T 1200 900", opacity: 0.12, strokeWidth: 1 },
    { d: "M -50 630 Q 200 530, 350 780 T 750 730 T 1200 930", opacity: 0.18, strokeWidth: 1.2 },
    { d: "M -50 660 Q 200 560, 350 810 T 750 760 T 1200 960", opacity: 0.22, strokeWidth: 1.5 },
    { d: "M -50 690 Q 200 590, 350 840 T 750 790 T 1200 990", opacity: 0.18, strokeWidth: 1.2 },
    { d: "M -50 720 Q 200 620, 350 870 T 750 820 T 1200 1020", opacity: 0.12, strokeWidth: 1 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <svg 
        className="w-full h-full opacity-60" 
        viewBox="0 0 1440 900" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#00d2ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7942f7" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {waves.map((w, i) => (
          <path
            key={i}
            d={w.d}
            stroke="url(#waveGrad)"
            strokeWidth={w.strokeWidth}
            strokeOpacity={w.opacity}
            fill="none"
          />
        ))}
      </svg>
    </div>
  )
}

