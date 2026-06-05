'use client'

import { motion } from 'motion/react'

export default function About() {
  const highlights = [
    '7+ full-stack projects shipped and live',
    'Built an AI project planner using the Vercel AI SDK',
    'Set up CI/CD pipelines with Docker & AWS',
    'Designed animated UIs with Framer Motion',
  ]

  return (
    <motion.section
      id="about"
      className="border-y border-[var(--card-border)] bg-[var(--background)] py-24 text-[var(--foreground)]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' as const }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-bold uppercase text-[#1f8f76]">About</p>
          <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            I like building products where engineering depth meets everyday usability.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6 text-lg leading-8 text-[var(--muted)]">
            <p>
              I am a 4th-year CS student at LNMIIT Jaipur. I have built an AI project planner, a 3D flip clock, CI/CD pipelines, and more — each one deployed and live.
            </p>
            <p>
              React, Next.js, Node.js, MongoDB, Docker, AWS — I work across the stack and try to make things that hold up under real use.
            </p>
            <p>
              Lately I have been digging into AI SDKs, distributed systems, and developer tooling.
            </p>
          </div>

          <motion.div
            className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[0_20px_55px_rgba(14,17,22,0.08)]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
          >
            <h3 className="text-2xl font-black text-[var(--foreground)]">Key Highlights</h3>
            <ul className="mt-6 space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-[var(--muted)]">
                  <span className="mt-2 size-2 rounded-full bg-[#f2a65a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
