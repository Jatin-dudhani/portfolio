'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { projects } from '@/lib/projects'
import ProjectScreenshot from './ProjectScreenshot'

const spring = { type: 'spring' as const, stiffness: 240, damping: 23 }

export default function Projects() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [800, 2200], [0, -30])

  return (
    <motion.section
      id="projects"
      className="relative py-24 text-[var(--foreground)] font-mono overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ y }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 60%, var(--green) 0%, transparent 50%)`,
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
            $ <span className="text-[var(--muted)]">ls</span> -la /home/jatin/projects/
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]"># Featured Projects</h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...spring, delay: index * 0.06 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="group flex h-full flex-col rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-shadow hover:border-[var(--green)]/50 hover:shadow-[0_0_24px_rgba(63,185,80,0.08)]"
            >
              <div className="mb-3 flex items-center gap-3">
                <motion.span
                  className="grid size-8 place-items-center rounded border border-[var(--green)]/30 bg-[var(--green)]/8 text-xs font-bold text-[var(--green)]"
                  whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.3 } }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">
                  ./project
                </span>
              </div>

              <h3 className="text-base font-bold text-[var(--foreground)]">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{project.description}</p>

              {project.deployed && <ProjectScreenshot url={project.deployed} title={project.title} />}

              {project.preview && (
                <div className="mt-4 rounded border border-[var(--card-border)] bg-[var(--background)]/40 p-2.5 font-mono text-[11px] leading-5 overflow-x-auto">
                  {project.preview.map((line, i) => (
                    <div key={i} className={`whitespace-nowrap ${line.startsWith('$') ? 'text-[var(--foreground)]' : line.startsWith('[') && line.includes('OK]') ? 'text-[var(--green)]' : line.startsWith('[') && line.includes('ERR') ? 'text-[var(--red)]' : 'text-[var(--muted)]'}`}>
                      {line}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded px-2 py-0.5 text-[11px] font-medium border border-[var(--card-border)] text-[var(--muted)] transition-all duration-150 group-hover:border-[var(--green)]/30 group-hover:text-[var(--green)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row text-xs">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded border border-[var(--green)] px-3 py-2 text-center font-semibold text-[var(--green)] transition-all duration-200 hover:bg-[var(--green)] hover:text-[var(--background)] hover:shadow-[0_0_14px_rgba(63,185,80,0.25)]"
                >
                  $ gh repo view
                </a>
                {project.deployed && (
                  <a
                    href={project.deployed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded border border-[var(--card-border)] px-3 py-2 text-center font-semibold text-[var(--muted)] transition-all duration-200 hover:border-[var(--amber)] hover:text-[var(--amber)] hover:shadow-[0_0_14px_rgba(210,153,34,0.15)]"
                  >
                    curl -L {project.deployed.replace(/https?:\/\//, '')}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
