'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { posts } from '@/lib/posts'
import { reading } from '@/lib/reading'

const spring = { type: 'spring' as const, stiffness: 260, damping: 24 }

const statusColor: Record<string, string> = {
  reading: 'text-[var(--green)]',
  finished: 'text-[var(--amber)]',
  planned: 'text-[var(--muted)]',
}

const typeLabel: Record<string, string> = {
  book: 'book',
  article: 'article',
  paper: 'paper',
  course: 'course',
}

export default function Blog() {
  const [tab, setTab] = useState<'writing' | 'reading'>('writing')

  return (
    <motion.section
      id="blog"
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
            $ <span className="text-[var(--muted)]">cat</span> /home/jatin/writing.md
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]"># Writing & Reading</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">Things I write and things I read.</p>

          <div className="mt-4 flex gap-1 rounded border border-[var(--card-border)] p-1 w-fit text-xs">
            <button
              onClick={() => setTab('writing')}
              className={`rounded px-3 py-1.5 transition-colors cursor-pointer ${
                tab === 'writing'
                  ? 'bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/30'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              $ writing
            </button>
            <button
              onClick={() => setTab('reading')}
              className={`rounded px-3 py-1.5 transition-colors cursor-pointer ${
                tab === 'reading'
                  ? 'bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/30'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              $ reading ({reading.length})
            </button>
          </div>
        </motion.div>

        {tab === 'writing' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...spring, delay: i * 0.07 }}
                whileHover={{ y: -2, transition: { duration: 0.12 } }}
                className="rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-shadow hover:border-[var(--green)]/40 hover:shadow-[0_0_16px_rgba(63,185,80,0.06)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted)]">{post.date}</span>
                  <span className="text-[var(--muted)]">/</span>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--green)]">technical</span>
                </div>

                <h3 className="text-sm font-bold text-[var(--foreground)]">{post.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[var(--muted)]">{post.desc}</p>

                <div className="mt-3 rounded border border-[var(--card-border)] bg-[var(--background)]/40 p-2.5 font-mono text-[11px] leading-5 overflow-x-auto">
                  {post.lines.map((line, li) => (
                    <div key={li} className={`whitespace-pre-wrap ${line.startsWith('  ') ? 'text-[var(--green)]/70' : 'text-[var(--muted)]'}`}>
                      {line || '\u00A0'}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded px-2 py-0.5 text-[10px] font-medium border border-[var(--card-border)] text-[var(--muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {tab === 'reading' && (
          <div className="space-y-3">
            {reading.map((item, i) => (
              <motion.div
                key={`${item.title}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...spring, delay: i * 0.05 }}
                className="rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-4 transition-shadow hover:border-[var(--green)]/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-[var(--muted)]">{typeLabel[item.type]}</span>
                      <span className={`text-[10px] uppercase tracking-wider ${statusColor[item.status]}`}>
                        [{item.status}]
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[var(--foreground)] truncate">
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--green)] transition-colors">
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    {item.author && (
                      <p className="text-[11px] text-[var(--muted)] mt-0.5">{item.author}</p>
                    )}
                    {item.reason && (
                      <p className="text-xs text-[var(--muted)] mt-1.5 leading-5">{item.reason}</p>
                    )}
                  </div>
                  <span className="shrink-0 text-[10px] text-[var(--muted)]">{item.added}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  )
}
