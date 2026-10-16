'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { projects } from '@/lib/projects'

const spring = { type: 'spring' as const, stiffness: 240, damping: 23 }

type GitHubRepo = {
  id: number
  name: string
  fullName: string
  description: string
  language: string
  stars: number
  forks: number
  url: string
  updatedAt: string
  topics: string[]
}

export default function Projects() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [800, 2200], [0, -30])
  const [filter, setFilter] = useState('')
  const [activeTab, setActiveTab] = useState<'featured' | 'repos'>('featured')
  const [liveRepos, setLiveRepos] = useState<GitHubRepo[]>([])
  const [loadingRepos, setLoadingRepos] = useState(true)

  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => {
        if (data.repos && Array.isArray(data.repos)) {
          setLiveRepos(data.repos)
        }
        setLoadingRepos(false)
      })
      .catch(() => {
        setLoadingRepos(false)
      })
  }, [])

  const copyCli = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      import('@/lib/sound').then((s) => s.playSuccessBeep())
      setTimeout(() => setCopiedId(null), 1800)
    })
  }

  const filteredFeatured = filter.trim()
    ? projects.filter(
        (p) =>
          p.technologies.some((t) => t.toLowerCase().includes(filter.toLowerCase())) ||
          p.title.toLowerCase().includes(filter.toLowerCase()) ||
          p.description.toLowerCase().includes(filter.toLowerCase())
      )
    : projects

  const filteredRepos = filter.trim()
    ? liveRepos.filter(
        (r) =>
          r.name.toLowerCase().includes(filter.toLowerCase()) ||
          r.description.toLowerCase().includes(filter.toLowerCase()) ||
          (r.language && r.language.toLowerCase().includes(filter.toLowerCase())) ||
          r.topics.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
      )
    : liveRepos

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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 60%, var(--green) 0%, transparent 50%)`,
          }}
        />
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
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-[var(--foreground)]"># Projects & Repositories</h2>

            {/* View Mode Tabs */}
            <div className="flex gap-1.5 rounded border border-[var(--card-border)] p-1 text-xs bg-[var(--card-bg)] w-fit">
              <button
                onClick={() => setActiveTab('featured')}
                className={`rounded px-3 py-1.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'featured'
                    ? 'bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/30 font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] border border-transparent'
                }`}
              >
                <span>$ ls featured</span>
                <span className="text-[10px] opacity-75">({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('repos')}
                className={`rounded px-3 py-1.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'repos'
                    ? 'bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/30 font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] border border-transparent'
                }`}
              >
                <span>$ ls -t all-repos</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-[var(--green)]">
                  <span className="size-1.5 rounded-full bg-[var(--green)] animate-pulse" />
                  Live ({liveRepos.length ? liveRepos.length : '...'})
                </span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2 max-w-xs">
            <span className="text-xs text-[var(--green)]">$</span>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="grep by name, language, tech..."
              className="flex-1 bg-transparent text-xs text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]/50"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </motion.div>

        {activeTab === 'featured' ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredFeatured.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...spring, delay: index * 0.06 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="group flex h-full flex-col rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-shadow hover:border-[var(--green)]/50 hover:shadow-[0_0_24px_rgba(63,185,80,0.08)]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
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
                  {project.deployed ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--green)]/40 bg-[var(--green)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--green)]">
                      <span className="size-1.5 rounded-full bg-[var(--green)] animate-ping" />
                      LIVE
                    </span>
                  ) : project.technologies.includes('C++') ? (
                    <span className="rounded-full border border-[var(--amber)]/40 bg-[var(--amber)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--amber)]">
                      SYSTEMS / C++
                    </span>
                  ) : (
                    <span className="rounded-full border border-[var(--card-border)] bg-white/5 px-2 py-0.5 text-[10px] text-[var(--muted)]">
                      OPEN SOURCE
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[var(--foreground)]">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{project.description}</p>

                {project.preview && (
                  <div className="relative mt-4 rounded border border-[var(--card-border)] bg-[var(--background)]/40 p-2.5 font-mono text-[11px] leading-5 overflow-x-auto">
                    <button
                      onClick={() => copyCli(project.id, project.preview![0])}
                      className="absolute top-2 right-2 rounded border border-[var(--card-border)] bg-[var(--card-bg)] px-1.5 py-0.5 text-[9px] text-[var(--muted)] hover:text-[var(--green)] hover:border-[var(--green)]/40 transition-colors cursor-pointer"
                      title="Copy command"
                    >
                      {copiedId === project.id ? 'COPIED!' : 'COPY'}
                    </button>
                    {project.preview.map((line, i) => (
                      <div
                        key={i}
                        className={`whitespace-nowrap ${
                          line.startsWith('$')
                            ? 'text-[var(--foreground)] pr-12'
                            : line.startsWith('[') && line.includes('OK]')
                            ? 'text-[var(--green)]'
                            : line.startsWith('[') && line.includes('ERR')
                            ? 'text-[var(--red)]'
                            : 'text-[var(--muted)]'
                        }`}
                      >
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

                <div className="mt-auto pt-5 flex flex-col gap-2 sm:flex-row text-xs">
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
                      $ open demo ↗
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div>
            {loadingRepos ? (
              <div className="flex items-center gap-3 text-xs text-[var(--muted)] py-12">
                <span className="size-2 rounded-full bg-[var(--green)] animate-pulse" />
                Fetching live repositories from GitHub API...
              </div>
            ) : filteredRepos.length === 0 ? (
              <p className="text-xs text-[var(--muted)] py-12">No repositories match your filter.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRepos.map((repo, index) => (
                  <motion.article
                    key={repo.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...spring, delay: Math.min(index * 0.04, 0.4) }}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className="group flex flex-col rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-4 transition-all hover:border-[var(--green)]/50 hover:shadow-[0_0_20px_rgba(63,185,80,0.06)]"
                  >
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--foreground)] group-hover:text-[var(--green)] transition-colors truncate">
                        {repo.name}
                      </span>
                      <span className="shrink-0 rounded-full border border-[var(--card-border)] bg-white/5 px-2 py-0.5 text-[10px] text-[var(--muted)]">
                        {repo.language}
                      </span>
                    </div>

                    <p className="text-xs leading-5 text-[var(--muted)] line-clamp-2 min-h-[40px]">
                      {repo.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--muted)]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          ★ {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          ⑂ {repo.forks}
                        </span>
                      </div>
                      <span className="text-[10px]">
                        {new Date(repo.updatedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block rounded border border-[var(--card-border)] bg-white/[0.02] px-3 py-1.5 text-center text-xs font-medium text-[var(--muted)] transition-all hover:border-[var(--green)] hover:text-[var(--green)] hover:bg-[var(--green)]/5"
                    >
                      $ gh repo view ↗
                    </a>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.section>
  )
}
