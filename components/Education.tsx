'use client'

import { motion } from 'motion/react'

const spring = { type: 'spring' as const, stiffness: 280, damping: 26 }

const education = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    school: 'LNMIIT, Jaipur',
    period: 'May 2026',
    cgpa: '6.5 / 10',
  },
]

export default function Education() {
  return (
    <motion.section
      id="education"
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
            $ <span className="text-[var(--muted)]">cat</span> /home/jatin/education.json
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]"># Education</h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((ed, i) => (
            <motion.div
              key={ed.degree}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...spring, delay: i * 0.07 }}
              whileHover={{ y: -1, transition: { duration: 0.12 } }}
              className="rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-shadow hover:border-[var(--green)]/40 hover:shadow-[0_0_16px_rgba(63,185,80,0.05)] col-span-full sm:col-span-2 lg:col-span-3 max-w-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-[var(--green)]">[{i + 1}]</span>
                <h3 className="text-sm font-bold text-[var(--foreground)]">{ed.degree}</h3>
              </div>
              <div className="ml-4 space-y-1 text-xs text-[var(--muted)]">
                <p>{ed.school}</p>
                <p>Graduation: {ed.period}</p>
                <p>CGPA: {ed.cgpa}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
