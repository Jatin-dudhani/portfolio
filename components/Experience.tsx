'use client'

import { motion, useScroll, useTransform } from 'motion/react'

const spring = { type: 'spring' as const, stiffness: 260, damping: 25 }

const experiences = [
  {
    role: 'Teaching Assistant — Internet of Things',
    org: 'The LNMIIT, Jaipur',
    period: 'Jan 2025 – Apr 2025',
    items: [
      'Improved student lab completion rate to ~95% across 30+ sessions by designing structured guides for Arduino/NodeMCU/IoT — reducing average setup time by 20 min per session.',
      'Cut troubleshooting time by ~30% for 40+ students by building a live issue-resolution protocol and pre-session hardware checklist; evaluated 3 lab assignment cycles.',
    ],
  },
  {
    role: 'Accommodation & Public Relations Head',
    org: 'PLINTH Tech Fest — The LNMIIT',
    period: '2025 – 2026',
    items: [
      'Coordinated operations, accommodation, and hospitality for over 1000 external participants, guests, and keynote speakers.',
    ],
  },
  {
    role: 'Member — Aaveg Dramatic Club',
    org: 'The LNMIIT, Jaipur',
    period: '2024 – Present',
    items: [
      'Performed in street plays (Nukkad Nataks) focused on social awareness and represented the university at regional inter-collegiate cultural festivals.',
    ],
  },
]

export default function Experience() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [400, 1400], [0, -35])

  return (
    <motion.section
      id="experience"
      className="relative py-24 text-[var(--foreground)] font-mono overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ y }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, var(--amber) 0%, transparent 50%)`,
        }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <p className="text-sm text-[var(--green)]">
            $ <span className="text-[var(--muted)]">cat</span> /home/jatin/experience.json
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]"># Experience & Leadership</h2>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...spring, delay: i * 0.07 }}
              whileHover={{ y: -1, transition: { duration: 0.12 } }}
              className="rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-shadow hover:border-[var(--green)]/40 hover:shadow-[0_0_16px_rgba(63,185,80,0.05)]"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--green)]">[{i + 1}]</span>
                    <h3 className="text-sm font-bold text-[var(--foreground)]">{exp.role}</h3>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--muted)] ml-4">{exp.org}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--amber)] whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
              <ul className="ml-4 space-y-2">
                {exp.items.map((item) => (
                  <li key={item} className="flex gap-2 text-xs leading-6 text-[var(--muted)]">
                    <span className="text-[var(--muted)] shrink-0 mt-0.5">&raquo;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
