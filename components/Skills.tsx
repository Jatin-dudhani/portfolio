'use client'

import { motion } from 'motion/react'

export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'REST APIs', 'MongoDB'],
    },
    {
      category: 'DevOps',
      skills: ['Git', 'Docker', 'AWS', 'CI/CD'],
    },
    {
      category: 'Craft',
      skills: ['System Design', 'Full-Stack Architecture', 'AI Integration', 'UI Animation'],
    },
  ]

  return (
    <motion.section
      id="skills"
      className="py-24 text-[var(--foreground)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#81dec8]">Stack</p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">Skills & Technologies</h2>
          </div>
          <p className="max-w-xl text-[var(--muted)]">
            Technologies I actually use across my projects.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
              className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition hover:-translate-y-1 hover:border-[#37ab8e]/45 hover:bg-[var(--card-bg)]"
            >
              <h3 className="text-2xl font-black text-[var(--foreground)]">{category.category}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-[var(--card-border)] bg-[var(--background)]/45 px-3 py-2 text-sm font-semibold text-[var(--muted)]"
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
