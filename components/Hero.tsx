'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import TerminalWidget from './Terminal'

const TYPING_SPEED = 35
const WORDS = ['Systems', 'Full-Stack', 'AI/LLM', 'DevOps']

const spring = { type: 'spring' as const, stiffness: 220, damping: 22 }

interface HeroProps {
  onMatrixToggle?: () => void
}

export default function Hero({ onMatrixToggle }: HeroProps) {
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [display, setDisplay] = useState('')

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 600], [0, -80])
  const fadeOut = useTransform(scrollY, [0, 500], [1, 0.6])

  useEffect(() => {
    const current = WORDS[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, TYPING_SPEED)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1600)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, TYPING_SPEED / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % WORDS.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx])

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: spring },
  }

  return (
    <motion.section
      className="relative min-h-screen overflow-hidden pt-24 text-[var(--foreground)]"
      initial="hidden"
      animate="visible"
      variants={container}
      style={{ opacity: fadeOut }}
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{ y: parallaxY }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--green) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, var(--amber) 0%, transparent 50%)`,
        }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid min-h-[calc(100vh-6rem)] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div variants={item} className="mb-4">
            <span className="font-mono text-sm text-[var(--green)]">
              $ <span className="text-[var(--muted)]">cat</span> /home/jatin/README.md
            </span>
          </motion.div>

          <motion.h1 variants={item} className="font-mono text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            <span className="text-[var(--foreground)]">jatin-dudhani</span>
            <br />
            <span className="text-[var(--muted)] text-xl sm:text-2xl lg:text-3xl">@portfolio:~$</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 text-base leading-7 text-[var(--muted)] font-mono sm:text-lg">
            <span className="text-[var(--amber)]">Full-Stack Developer</span> &bull; CS undergrad @ LNMIIT Jaipur
          </motion.p>

          <motion.div variants={item} className="mt-3 font-mono text-lg sm:text-xl">
            <span className="text-[var(--muted)]">Building </span>
            <span className="text-[var(--green-bright)] font-bold">
              {display}<span className="animate-blink text-[var(--green)]">_</span>
            </span>
          </motion.div>

          <motion.p variants={item} className="mt-4 max-w-xl text-sm leading-6 text-[var(--muted)] font-mono">
            React &bull; Next.js &bull; TypeScript &bull; Node.js &bull; C++ &bull; AI/LLM &bull; Docker
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row font-mono text-sm">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded border border-[var(--green)] bg-[var(--green)]/10 px-5 py-2.5 font-semibold text-[var(--green)] transition-all duration-200 hover:bg-[var(--green)] hover:text-[var(--background)] hover:shadow-[0_0_20px_rgba(63,185,80,0.3)]"
            >
              $ ls projects/
            </a>
            <a
              href="#experience"
              className="rounded border border-[var(--card-border)] px-5 py-2.5 font-semibold text-[var(--muted)] transition-all duration-200 hover:border-[var(--amber)] hover:text-[var(--amber)]"
            >
              $ cat experience
            </a>
            <a
              href="#contact"
              className="rounded border border-[var(--card-border)] px-5 py-2.5 font-semibold text-[var(--muted)] transition-all duration-200 hover:border-[var(--green)] hover:text-[var(--green)]"
            >
              $ mail jatin
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-[var(--muted)]">
            {[
              { label: 'C++', desc: 'DPI / Networking' },
              { label: 'React/Next.js', desc: 'Full-stack Apps' },
              { label: 'Node.js', desc: 'REST APIs' },
              { label: 'AI/LLM', desc: 'RAG / AI SDK' },
              { label: 'Docker', desc: 'CI/CD & Cloud' },
            ].map(({ label, desc }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[var(--green)] font-semibold">{label}</span>
                <span className="text-[var(--muted)]">{desc}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={item} className="relative w-full max-w-lg mx-auto lg:mx-0">
          <TerminalWidget onMatrixToggle={onMatrixToggle} />
        </motion.div>
      </div>
    </motion.section>
  )
}
