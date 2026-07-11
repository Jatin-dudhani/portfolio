'use client'

import { useState } from 'react'
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
          </nav>

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
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="rounded px-4 py-2 text-sm text-left text-[var(--muted)] transition-all duration-150 hover:bg-[var(--green)]/10 hover:text-[var(--green)] cursor-pointer"
                >
                  $ {link}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
