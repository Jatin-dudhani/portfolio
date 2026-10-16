'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from 'next-themes'
import { playKeyClick, playSuccessBeep } from '@/lib/sound'

type CommandItem = {
  id: string
  title: string
  category: 'Navigation' | 'Actions' | 'Social'
  shortcut?: string
  action: () => void
}

interface CommandPaletteProps {
  onMatrixToggle?: () => void
  onOpenAIChat?: () => void
}

export default function CommandPalette({ onMatrixToggle, onOpenAIChat }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { setTheme } = useTheme()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollTo = (id: string) => {
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const items: CommandItem[] = [
    // Navigation
    { id: 'nav-about', title: 'Go to ~/about', category: 'Navigation', shortcut: '#about', action: () => scrollTo('about') },
    { id: 'nav-skills', title: 'Go to ~/skills', category: 'Navigation', shortcut: '#skills', action: () => scrollTo('skills') },
    { id: 'nav-dpi', title: 'Go to ~/dpi-simulator', category: 'Navigation', shortcut: '#dpi', action: () => scrollTo('dpi-simulator') },
    { id: 'nav-projects', title: 'Go to ~/projects', category: 'Navigation', shortcut: '#projects', action: () => scrollTo('projects') },
    { id: 'nav-experience', title: 'Go to ~/experience', category: 'Navigation', shortcut: '#exp', action: () => scrollTo('experience') },
    { id: 'nav-pipeline', title: 'Go to ~/devops-pipeline', category: 'Navigation', shortcut: '#pipeline', action: () => scrollTo('devops-pipeline') },
    { id: 'nav-blog', title: 'Go to ~/blog & reading', category: 'Navigation', shortcut: '#blog', action: () => scrollTo('blog') },
    { id: 'nav-contact', title: 'Go to ~/contact', category: 'Navigation', shortcut: '#contact', action: () => scrollTo('contact') },

    // Actions & Themes
    {
      id: 'theme-matrix',
      title: 'Set Theme: Matrix Dark (Green)',
      category: 'Actions',
      shortcut: 'dark',
      action: () => {
        setTheme('dark')
        playSuccessBeep()
        setIsOpen(false)
      },
    },
    {
      id: 'theme-amber',
      title: 'Set Theme: Amber Phosphor CRT',
      category: 'Actions',
      shortcut: 'amber',
      action: () => {
        setTheme('amber')
        playSuccessBeep()
        setIsOpen(false)
      },
    },
    {
      id: 'theme-cyberpunk',
      title: 'Set Theme: Cyberpunk Neon',
      category: 'Actions',
      shortcut: 'cyber',
      action: () => {
        setTheme('cyberpunk')
        playSuccessBeep()
        setIsOpen(false)
      },
    },
    {
      id: 'theme-light',
      title: 'Set Theme: Paper Terminal (Light)',
      category: 'Actions',
      shortcut: 'light',
      action: () => {
        setTheme('light')
        playSuccessBeep()
        setIsOpen(false)
      },
    },
    {
      id: 'act-matrix',
      title: 'Toggle Matrix Rain Effect',
      category: 'Actions',
      shortcut: 'matrix',
      action: () => {
        onMatrixToggle?.()
        playSuccessBeep()
        setIsOpen(false)
      },
    },
    {
      id: 'act-chat',
      title: 'Open AI Assistant ($ ask jatin)',
      category: 'Actions',
      shortcut: 'chat',
      action: () => {
        onOpenAIChat?.()
        window.dispatchEvent(new CustomEvent('open-ai-chat'))
        setIsOpen(false)
      },
    },
    {
      id: 'act-resume',
      title: 'Download Resume (resume.md)',
      category: 'Actions',
      shortcut: 'wget',
      action: () => {
        const link = document.createElement('a')
        link.href = '/resume.md'
        link.download = 'resume.md'
        link.click()
        playSuccessBeep()
        setIsOpen(false)
      },
    },
    {
      id: 'act-print-resume',
      title: 'View Recruiter Print Resume (/resume)',
      category: 'Actions',
      shortcut: 'pdf',
      action: () => {
        setIsOpen(false)
        router.push('/resume')
      },
    },

    // Social
    {
      id: 'soc-github',
      title: 'Open GitHub Profile (@Jatin-dudhani)',
      category: 'Social',
      action: () => window.open('https://github.com/Jatin-dudhani', '_blank'),
    },
    {
      id: 'soc-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'Social',
      action: () => window.open('https://www.linkedin.com/in/jatin-dudhani-057664254/', '_blank'),
    },
    {
      id: 'soc-email',
      title: 'Send Email (jatindudhani07@gmail.com)',
      category: 'Social',
      action: () => window.open('mailto:jatindudhani07@gmail.com'),
    },
  ]

  const filtered = query.trim()
    ? items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        (item.shortcut && item.shortcut.toLowerCase().includes(query.toLowerCase()))
      )
    : items

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((open) => !open)
        playKeyClick()
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    const handleOpenEvent = () => {
      setIsOpen(true)
      playKeyClick()
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-palette', handleOpenEvent)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-palette', handleOpenEvent)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
        setSelectedIndex(0)
      }, 50)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setQuery('')
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((idx) => (idx + 1) % Math.max(1, filtered.length))
      playKeyClick()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((idx) => (idx - 1 + filtered.length) % Math.max(1, filtered.length))
      playKeyClick()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action()
      }
    }
  }

  return (
    <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 font-mono">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-xl rounded-lg border border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center border-b border-[var(--card-border)] px-4 py-3">
                <span className="text-sm text-[var(--green)] mr-2.5">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="type a command or section..."
                  className="flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]/50 font-mono"
                  spellCheck={false}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-1.5 py-0.5 text-[10px] text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[var(--muted)]">
                    [!] No matching commands found.
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const isSelected = idx === selectedIndex
                    return (
                      <div
                        key={item.id}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={() => item.action()}
                        className={`flex items-center justify-between rounded px-3 py-2 text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/30'
                            : 'text-[var(--foreground)] hover:bg-[var(--card-bg)]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] text-[var(--muted)] w-16">{item.category}</span>
                          <span className="font-semibold">{item.title}</span>
                        </div>
                        {item.shortcut && (
                          <span className="text-[10px] text-[var(--muted)] bg-[var(--card-bg)] border border-[var(--card-border)] rounded px-1.5 py-0.5">
                            {item.shortcut}
                          </span>
                        )}
                      </div>
                    )
                  })
                )}
              </div>

              <div className="flex items-center justify-between border-t border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2 text-[10px] text-[var(--muted)]">
                <div className="flex items-center gap-3">
                  <span><kbd className="text-[var(--green)]">↑↓</kbd> navigate</span>
                  <span><kbd className="text-[var(--green)]">↵</kbd> select</span>
                  <span><kbd className="text-[var(--green)]">esc</kbd> close</span>
                </div>
                <span>Jatin Dudhani CLI v2</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  )
}
