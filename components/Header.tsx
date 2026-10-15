'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const links = ['about', 'skills', 'experience', 'projects', 'blog', 'contact']

  const scrollTo = (id: string) => {
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 w-full z-50 border-b border-[var(--nav-border)] bg-[var(--nav-bg)] text-[var(--foreground)] backdrop-blur-xl font-mono">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-3">
          <span className="text-sm font-bold text-[var(--green)] transition-colors duration-200 group-hover:text-[var(--green-bright)]">
            ~/jd
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-1 text-sm text-[var(--muted)]">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="px-3 py-1.5 rounded transition-all duration-150 hover:text-[var(--green)] hover:bg-[var(--green)]/5 cursor-pointer"
              >
                $ {link}
              </button>
            ))}
            <Link
              href="/resume"
              className="px-3 py-1.5 rounded transition-all duration-150 hover:text-[var(--amber)] hover:bg-[var(--amber)]/5 cursor-pointer text-[var(--amber)]"
            >
              $ resume
            </Link>
          </nav>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-command-palette'))
            }}
            className="flex items-center gap-1.5 rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-2.5 py-1 text-xs text-[var(--muted)] hover:border-[var(--green)] hover:text-[var(--green)] transition-all cursor-pointer"
            aria-label="Open command palette"
            title="Search & Commands (⌘K / Ctrl+K)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="hidden sm:inline">cmd</span>
            <kbd className="hidden sm:inline rounded border border-[var(--card-border)] bg-[var(--background)] px-1 py-0.2 text-[9px] text-[var(--green)]">⌘K</kbd>
          </button>

          <SoundToggle />
          <ThemeToggle />

          <button
            className="md:hidden grid size-9 place-items-center rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] font-mono text-xs transition-all duration-150 hover:border-[var(--green)] hover:text-[var(--green)] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? 'X' : '>>'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-[var(--card-border)] bg-[var(--nav-bg)] backdrop-blur-xl font-mono"
          >
            <div className="px-4 py-3 flex flex-col gap-1.5">
              <button
                onClick={() => {
                  setIsOpen(false)
                  window.dispatchEvent(new CustomEvent('open-command-palette'))
                }}
                className="rounded px-4 py-2 text-sm text-left text-[var(--green)] transition-all duration-150 hover:bg-[var(--green)]/10 cursor-pointer font-semibold"
              >
                &gt; search &amp; commands (⌘K)
              </button>
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="rounded px-4 py-2 text-sm text-left text-[var(--muted)] transition-all duration-150 hover:bg-[var(--green)]/10 hover:text-[var(--green)] cursor-pointer"
                >
                  $ {link}
                </button>
              ))}
              <Link
                href="/resume"
                onClick={() => setIsOpen(false)}
                className="rounded px-4 py-2 text-sm text-left text-[var(--amber)] transition-all duration-150 hover:bg-[var(--amber)]/10 cursor-pointer"
              >
                $ resume (print / ATS)
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function subscribeSound(callback: () => void) {
  window.addEventListener('terminal-sound-change', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('terminal-sound-change', callback)
    window.removeEventListener('storage', callback)
  }
}

function getSoundSnapshot() {
  try {
    return localStorage.getItem('terminal_sound') === 'true'
  } catch {
    return false
  }
}

const emptySubscribe = () => () => {}

function SoundToggle() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const enabled = useSyncExternalStore(subscribeSound, getSoundSnapshot, () => false)

  if (!mounted) return <div className="size-9" />

  const toggle = () => {
    const next = !enabled
    try {
      localStorage.setItem('terminal_sound', next ? 'true' : 'false')
      window.dispatchEvent(new Event('terminal-sound-change'))
      if (next) {
        import('@/lib/sound').then((s) => s.playSuccessBeep())
      }
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      className={`grid size-9 place-items-center rounded border transition-colors cursor-pointer ${
        enabled
          ? 'border-[var(--green)]/60 bg-[var(--green)]/10 text-[var(--green)]'
          : 'border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--muted)] hover:border-[var(--green)] hover:text-[var(--green)]'
      }`}
      aria-label={enabled ? 'Mute terminal sound' : 'Enable terminal sound'}
      title={enabled ? 'Terminal sound: ON' : 'Terminal sound: OFF'}
    >
      {enabled ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  )
}
