'use client'

import { motion } from 'motion/react'

const spring = { type: 'spring' as const, stiffness: 260, damping: 24 }

const certificates = [
  {
    title: 'Cloud Computing',
    org: 'NPTEL',
    period: 'Jan – Apr 2026',
    score: '74.65%',
    description: 'Cloud architecture, virtualization, deployment models, and cloud security best practices.',
  },
  {
    title: 'Privacy and Security in Online Social Media',
    org: 'NPTEL',
    period: 'Jul – Oct 2025',
    score: '75.58%',
    description: 'Privacy threat modeling, security mechanisms, and data protection strategies for social media platforms.',
  },
]

export default function Certificates() {
  return (
    <motion.section
      id="certificates"
      className="py-24 text-[var(--foreground)] font-mono"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <p className="text-sm text-[var(--green)]">
            $ <span className="text-[var(--muted)]">ls</span> -la /home/jatin/certificates/
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]"># Certificates</h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...spring, delay: i * 0.07 }}
              whileHover={{ y: -2, transition: { duration: 0.12 } }}
              className="rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-shadow hover:border-[var(--amber)]/40 hover:shadow-[0_0_16px_rgba(210,153,34,0.06)]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--amber)]">[{i + 1}]</span>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">{cert.title}</h3>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--green)]">{cert.score}</span>
              </div>
              <div className="ml-4 space-y-1 text-xs text-[var(--muted)]">
                <p className="text-[var(--amber)]">{cert.org}</p>
                <p>{cert.period}</p>
                <p className="mt-2 leading-5">{cert.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
