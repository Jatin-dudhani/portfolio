'use client'

import { motion } from 'motion/react'
import TerminalWidget from './Terminal'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.8 + i * 0.15, duration: 0.5, ease: 'easeOut' as const },
  }),
}

export default function Hero() {
  return (
    <motion.section
      className="relative min-h-screen overflow-hidden pt-24 text-[var(--foreground)]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid min-h-[calc(100vh-6rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-3 rounded-lg border border-[#37ab8e]/35 bg-[#37ab8e]/10 px-4 py-2 text-sm font-medium text-[#9fe8d5]"
          >
            <span className="size-2 rounded-full bg-[#37ab8e] shadow-[0_0_16px_rgba(55,171,142,0.9)]" />
            Full-stack developer building usable systems
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="max-w-4xl text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            <span className="text-[var(--foreground)]">Jatin Dudhani</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-xl leading-8 text-[var(--muted)] sm:text-2xl"
          >
            Computer Science student focused on full-stack web apps, system design, and clean product experiences.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg"
          >
            I build scalable interfaces with React, TypeScript, Node.js, and cloud-minded architecture, then polish the details so the result feels fast, clear, and dependable.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#projects"
              className="rounded-lg bg-[#f2a65a] px-6 py-3 text-center text-sm font-bold text-[#111418] shadow-[0_18px_40px_rgba(242,166,90,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffbd79]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-6 py-3 text-center text-sm font-bold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[#37ab8e]/60 hover:bg-[#37ab8e]/12"
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.dl
            variants={itemVariants}
            className="mt-12 grid max-w-xl grid-cols-3 gap-3"
          >
            {[
              ['4th', 'Year CS'],
              ['10+', 'Core Skills'],
              ['7', 'Projects'],
            ].map(([value, label], i) => (
              <motion.div
                key={label}
                custom={i}
                variants={statVariants}
                className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4"
              >
                <dt className="text-2xl font-black text-[var(--foreground)]">{value}</dt>
                <dd className="mt-1 text-xs font-medium uppercase text-[var(--muted)]">{label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <TerminalWidget />
        </motion.div>
      </div>
    </motion.section>
  )
}
