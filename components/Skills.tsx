'use client'

import { motion, useScroll, useTransform } from 'motion/react'

const spring = { type: 'spring' as const, stiffness: 280, damping: 26 }

const skillCategories = [
  {
    category: 'Languages',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'C++', 'Python'],
  },
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui', 'Vite'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST API Design', 'JWT Auth', 'MongoDB', 'MVC Architecture'],
  },
  {
    category: 'AI & API Integration',
    skills: ['AI SDK', 'OpenAI API', 'OpenRouter', 'LLM Integration', 'RAG', 'Vector Search', 'Zod', 'React Flow'],
  },
  {
    category: 'DevOps & Cloud',
    skills: ['Git', 'GitHub', 'Docker', 'Kubernetes', 'Firebase', 'Vercel', 'Render', 'CI/CD'],
  },
  {
    category: 'Systems & Networking',
    skills: ['C++', 'Multi-threading', 'TCP/IP', 'TLS/SSL', 'PCAP', 'DPI', 'Networking Protocols'],
  },
]

export default function Skills() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [200, 1000], [0, -30])

  return (
    <motion.section
      id="skills"
      className="relative py-24 text-[var(--foreground)] font-mono overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ y }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, var(--green) 0%, transparent 50%)`,
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
            $ <span className="text-[var(--muted)]">cat</span> /home/jatin/skills.json
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]"># Technical Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...spring, delay: i * 0.05 }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className="rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-4 transition-shadow hover:border-[var(--green)]/40 hover:shadow-[0_0_16px_rgba(63,185,80,0.06)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-[var(--green)]">[{i + 1}]</span>
                <h3 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">{category.category}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded px-2 py-1 text-[11px] font-medium border border-[var(--card-border)] text-[var(--muted)] bg-[var(--background)]/30 transition-all duration-150 hover:border-[var(--green)]/40 hover:text-[var(--green)] hover:bg-[var(--green)]/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
