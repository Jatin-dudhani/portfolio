'use client'

import { motion, useScroll, useTransform } from 'motion/react'

const spring = { type: 'spring' as const, stiffness: 250, damping: 24 }

export default function About() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, -40])

  return (
    <motion.section
      id="about"
      className="relative border-y border-[var(--card-border)] bg-[var(--background)] py-24 text-[var(--foreground)] font-mono overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35 }}
    >
      <motion.div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ y }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, var(--green) 0%, transparent 50%)`,
        }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <p className="text-sm text-[var(--green)]">
            $ <span className="text-[var(--muted)]">cat</span> /home/jatin/summary.md
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]"># Professional Summary</h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            className="space-y-5 text-sm leading-7 text-[var(--muted)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.08 }}
          >
            <p>
                Full-Stack Developer with expertise in <span className="text-[var(--green)]">React.js, Next.js, TypeScript, Node.js, Express.js, and MongoDB</span>.
                Experienced in engineering end-to-end web applications featuring LLM integrations via AI SDK and OpenRouter,
                AI-powered tools with OpenAI API, and high-performance RESTful APIs with JWT authentication.
              </p>
              <p>
                Proficient in modern frontend development with <span className="text-[var(--amber)]">Tailwind CSS, Redux state management,
                Framer Motion animations, and responsive design patterns</span>. Strong understanding of full-stack deployment
                workflows including CI/CD pipelines, Firebase hosting and authentication, and cloud deployment on Vercel and Render.
              </p>
              <p>
                Proven ability to build complete production-grade applications from database schema design to user interface implementation.
                Also experienced in <span className="text-[var(--green)]">C++ systems programming</span> (DPI engines, network protocol analysis)
                and <span className="text-[var(--green-bright)]">AI/LLM infrastructure</span> (RAG pipelines, vector search, embeddings).
                Currently deepening expertise in <span className="text-[var(--amber)]">DevOps, cloud engineering, and AI modeling</span>.
              </p>
              <p className="pt-2 border-t border-[var(--card-border)]">
                <span className="text-[var(--green)]">25</span> &bull; Hanumangarh Jn, Rajasthan &bull;
                Aspiring <span className="text-[var(--amber)]">DevOps / Cloud Engineer</span>.
                Blunt, straightforward, and leadership-driven. Outside code: ghazals, shayari, cricket, chess, and long walks.
              </p>
          </motion.div>

          <motion.div
            className="rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-5"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2 rounded-full bg-[var(--green)]" />
              <span className="size-2 rounded-full bg-[var(--amber)]" />
              <span className="size-2 rounded-full bg-[var(--red)]" />
              <span className="ml-2 text-xs text-[var(--muted)]">highlights.log</span>
            </div>
            <div className="space-y-3 text-sm">
              {[
                'Built a multi-threaded DPI engine in C++17 (zero deps)',
                'Built an AI project planner using Vercel AI SDK + OpenRouter',
                'Built a RAG document QA system with vector search & LLMs',
                'Set up end-to-end CI/CD pipelines with Docker, AWS & GitLab',
                'TA for IoT course — improved lab completion to ~95%',
                'Cloud Computing cert (NPTEL) — 74.65%',
                'Currently pursuing AWS, DevOps & AI certifications',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  className="flex gap-2 text-[var(--muted)]"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: 0.2 + i * 0.04 }}
                >
                  <span className="text-[var(--green)] shrink-0">[{i + 1}]</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
