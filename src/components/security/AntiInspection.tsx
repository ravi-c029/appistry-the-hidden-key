'use client'

import { useEffect, useRef } from 'react'

export default function AntiInspection() {
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Challenge zones are those within .challenge-zone class
    const isChallengeZone = (el: Element | null): boolean => {
      if (!el) return false
      let current: Element | null = el
      while (current) {
        if (current.classList?.contains('challenge-zone')) return true
        current = current.parentElement
      }
      return false
    }

    // Custom context menu for challenge zones
    const createContextMenu = (x: number, y: number) => {
      removeContextMenu()
      const menu = document.createElement('div')
      menu.className = 'custom-context-menu'
      menu.id = 'appistry-context-menu'
      menu.innerHTML = `
        <div class="context-menu-item warning">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          APPISTRY Security Terminal
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item">🔑 This area is part of the challenge</div>
        <div class="context-menu-item">🕵️ The answer won't be found here</div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item" style="font-size:0.7rem;color:var(--text-muted)">THINK. BUILD. DISCOVER.</div>
      `

      // Position safely within viewport
      const vw = window.innerWidth
      const vh = window.innerHeight
      const menuW = 240
      const menuH = 160
      const safeX = Math.min(x, vw - menuW - 8)
      const safeY = Math.min(y, vh - menuH - 8)
      menu.style.left = `${safeX}px`
      menu.style.top = `${safeY}px`
      document.body.appendChild(menu)
      menuRef.current = menu
    }

    const removeContextMenu = () => {
      const existing = document.getElementById('appistry-context-menu')
      if (existing) existing.remove()
      menuRef.current = null
    }

    const handleContextMenu = (e: MouseEvent) => {
      if (isChallengeZone(e.target as Element)) {
        e.preventDefault()
        createContextMenu(e.clientX, e.clientY)
      }
    }

    // Remove context menu when clicking elsewhere
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        removeContextMenu()
      }
    }

    // Deterrence for common inspection shortcuts (challenge zones only)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Always allow in form inputs
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return

      // F12
      if (e.key === 'F12' && isChallengeZone(target)) {
        e.preventDefault()
        console.log('%c[APPISTRY Security Terminal]', 'color: #00F0FF; font-weight: bold; font-size: 14px;')
        console.log('%cThe answer is not in the browser console.', 'color: #94A3B8;')
        console.log('%cClone the repository and use: npm run unlock', 'color: #E024C3;')
        return
      }

      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+U
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j') &&
        isChallengeZone(target)
      ) {
        e.preventDefault()
        return
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U') && isChallengeZone(target)) {
        e.preventDefault()
        return
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
      removeContextMenu()
    }
  }, [])

  return null
}
