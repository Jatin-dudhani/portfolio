'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { playSuccessBeep } from '@/lib/sound'

const emptySubscribe = () => () => {}

const THEMES = [
  { id: 'dark', label: 'Matrix Dark (Green)' },
  { id: 'amber', label: 'Phosphor CRT (Amber)' },
  { id: 'cyberpunk', label: 'Cyberpunk (Neon)' },
  { id: 'light', label: 'Paper Terminal (Light)' },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  if (!mounted) return <div className="size-9" />

  const currentTheme = theme || 'dark'

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === currentTheme)
    const nextIndex = (currentIndex + 1) % THEMES.length
    const nextTheme = THEMES[nextIndex].id
    setTheme(nextTheme)
    playSuccessBeep()
  }

  const activeThemeMeta = THEMES.find((t) => t.id === currentTheme) || THEMES[0]

  return (
    <motion.button
      onClick={cycleTheme}
      className="relative grid size-9 place-items-center rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-sm text-[var(--muted)] transition-colors hover:border-[var(--green)] hover:text-[var(--green)] cursor-pointer"
      aria-label={`Current theme: ${activeThemeMeta.label}. Click to cycle.`}
      title={`Theme: ${activeThemeMeta.label} (click to cycle)`}
      whileTap={{ scale: 0.88 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentTheme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute"
        >
          {currentTheme === 'dark' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
          {currentTheme === 'amber' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          )}
          {currentTheme === 'cyberpunk' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          )}
          {currentTheme === 'light' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
