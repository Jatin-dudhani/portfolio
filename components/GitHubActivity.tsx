'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const spring = { type: 'spring' as const, stiffness: 260, damping: 24 }

type GHPost = {
  id: string
  repo: string
  message: string
  date: string
  url: string
}

const FALLBACK: GHPost[] = [
  { id: '1', repo: 'Jatin-dudhani/packet-analyser', message: 'Add multi-threaded DPI engine with SNI extraction', date: new Date().toISOString(), url: 'https://github.com/Jatin-dudhani/packet-analyser' },
  { id: '2', repo: 'Jatin-dudhani/portfolio', message: 'Redesign with terminal theme and spring animations', date: new Date().toISOString(), url: 'https://github.com/Jatin-dudhani/portfolio' },
  { id: '3', repo: 'Jatin-dudhani/rag-document-qa', message: 'Initial commit — RAG pipeline with vector search', date: new Date().toISOString(), url: 'https://github.com/Jatin-dudhani/rag-document-qa' },
  { id: '4', repo: 'Jatin-dudhani/ai-project-planner', message: 'Add AI brief generation with OpenRouter', date: new Date().toISOString(), url: 'https://github.com/Jatin-dudhani/ai-project-planner' },
]

export default function GitHubActivity() {
  const [events, setEvents] = useState<GHPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://api.github.com/users/Jatin-dudhani/events/public', {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('fetch failed')
        return res.json()
      })
      .then((data: { type: string; repo: { name: string }; payload: { commits?: { message: string }[] }; created_at: string; id: string }[]) => {
        const parsed: GHPost[] = data
          .filter((e) => e.type === 'PushEvent' && e.payload.commits?.length)
          .slice(0, 6)
          .map((e) => ({
            id: e.id,
            repo: e.repo.name,
            message: e.payload.commits![0].message.split('\n')[0],
            date: e.created_at,
            url: `https://github.com/${e.repo.name}`,
          }))
        setEvents(parsed.length ? parsed : FALLBACK)
        setLoading(false)
      })
      .catch(() => {
        setEvents(FALLBACK)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return (
    <motion.section
      id="activity"
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
            $ <span className="text-[var(--muted)]">curl</span> -s api.github.com/users/Jatin-dudhani/events
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]"># Recent Activity</h2>
        </motion.div>

        {loading ? (
          <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
            <span className="size-2 rounded-full bg-[var(--green)] animate-pulse" />
            Fetching latest commits...
          </div>
        ) : (
          <div className="space-y-2">
            {events.map((event, i) => (
              <motion.a
                key={event.id}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.03 }}
                whileHover={{ x: 3, transition: { duration: 0.1 } }}
                className="flex items-start gap-3 rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-3 transition-all duration-150 hover:border-[var(--green)]/30 hover:shadow-[0_0_10px_rgba(63,185,80,0.04)]"
              >
                <span className="text-xs text-[var(--green)] shrink-0 mt-0.5">&gt;</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[var(--foreground)] truncate">{event.message}</p>
                  <p className="text-[10px] text-[var(--muted)] mt-0.5 truncate">
                    {event.repo}
                    <span className="mx-1">&bull;</span>
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  )
}
