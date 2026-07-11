'use client'

import { motion } from 'motion/react'

const spring = { type: 'spring' as const, stiffness: 260, damping: 24 }

const posts = [
  {
    title: 'Building a DPI Engine in C++17',
    desc: 'How I built a multi-threaded Deep Packet Inspection engine from scratch — parsing PCAP files, extracting SNI from TLS handshakes, classifying 25+ apps, and blocking traffic. Zero external dependencies.',
    tags: ['C++', 'Networking', 'Multi-threading'],
    slug: 'dpi-engine-cpp',
    date: 'Jul 2026',
    lines: [
      'When you visit https://youtube.com, your browser sends a',
      'TLS Client Hello with the domain in plaintext. Extract that,',
      'and you can classify traffic without decrypting anything.',
      '',
      '  TLS Client Hello → SNI: "www.youtube.com" → App: YOUTUBE',
      '',
      'I built a pipeline: PCAP → parse → classify → block/report.',
      '25+ apps, 4 thread types, 0 dependencies.',
    ],
  },
  {
    title: 'RAG Pipelines with Vector Search',
    desc: 'Building a document QA system using Retrieval-Augmented Generation — chunking PDFs, generating embeddings, vector search, and LLM-powered answers.',
    tags: ['Python', 'RAG', 'LLMs', 'Vector Search'],
    slug: 'rag-document-qa',
    date: 'Jul 2026',
    lines: [
      'The idea: upload a PDF, ask questions in plain English,',
      'get answers grounded in the document. No fine-tuning needed.',
      '',
      '  PDF → Chunks → Embeddings → Vector DB',
      '  Query → Embed → Top-K Retrieve → LLM → Answer',
      '',
      'Key insight: chunk size + overlap + reranking matter more',
      'than the embedding model for domain-specific docs.',
    ],
  },
]

export default function Blog() {
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
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]"># Reading</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">Technical writing about things I built.</p>
        </motion.div>

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
      </div>
    </motion.section>
  )
}
