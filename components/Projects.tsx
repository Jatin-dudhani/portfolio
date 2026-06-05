'use client'

import { motion } from 'motion/react'
import { projects } from '@/lib/projects'

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="py-24 text-[var(--foreground)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#f2a65a]">Selected Work</p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">Featured Projects</h2>
          </div>
          <p className="max-w-xl text-[var(--muted)]">
            What I have built, deployed, and learned from.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' as const }}
              className="group flex h-full flex-col rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition hover:-translate-y-1 hover:border-[#f2a65a]/50 hover:shadow-[0_22px_60px_rgba(0,0,0,0.28)]"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="grid size-12 place-items-center rounded-lg bg-[#37ab8e]/13 text-sm font-black text-[#81dec8]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span className="rounded-md border border-[var(--card-border)] px-3 py-1 text-xs font-bold uppercase text-[var(--muted)]">
                  Project
                </span>
              </div>

              <h3 className="text-2xl font-black text-[var(--foreground)]">{project.title}</h3>
              <p className="mt-3 flex-1 leading-7 text-[var(--muted)]">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-[var(--foreground)]/6 px-3 py-1.5 text-xs font-semibold text-[var(--muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg bg-[var(--foreground)] px-4 py-3 text-center text-sm font-bold text-[var(--background)] transition hover:bg-[#f2a65a]"
                >
                  View GitHub
                </a>
                {project.deployed && (
                  <a
                    href={project.deployed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg border border-[var(--card-border)] px-4 py-3 text-center text-sm font-bold text-[var(--foreground)] transition hover:border-[#37ab8e]/60 hover:bg-[#37ab8e]/12"
                  >
                    Live Demo
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
