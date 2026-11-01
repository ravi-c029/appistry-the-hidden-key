'use client'

export default function CyberGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Ambient Side Soft Spotlights */}
      <div 
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-30 blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.25) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,94,152,0.2) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-25 blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }}
      />

      {/* 3D Perspective Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[450px] overflow-hidden pointer-events-none">
        <div 
          className="w-[200%] -left-[50%] h-[800px] absolute bottom-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            transform: 'perspective(450px) rotateX(68deg)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 15%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 15%, transparent 90%)',
          }}
        />
      </div>

      {/* Top subtle vertical wireframe lines */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px)',
          backgroundSize: '96px 100%',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 60%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}

