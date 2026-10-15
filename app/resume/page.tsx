'use client'

import Link from 'next/link'
import { projects } from '@/lib/projects'

export default function ResumePage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-mono py-8 px-4 sm:px-8">
      {/* Non-printing Control Bar */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between gap-4 p-3 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--green)] transition-colors"
        >
          <span>←</span>
          <span>$ cd /home</span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="/resume.md"
            download
            className="rounded border border-[var(--card-border)] px-3 py-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            $ wget resume.md
          </a>
          <button
            onClick={handlePrint}
            className="rounded border border-[var(--green)] bg-[var(--green)]/10 px-3.5 py-1.5 text-xs font-semibold text-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--background)] transition-all cursor-pointer"
          >
            Print / Save PDF ⎙
          </button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <article className="max-w-4xl mx-auto rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-10 shadow-xl print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Header */}
        <header className="border-b border-[var(--card-border)] pb-6 mb-6 print:border-black/20">
          <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)] print:text-black">
            Jatin Dudhani
          </h1>
          <p className="mt-1 text-sm text-[var(--green)] font-semibold print:text-neutral-700">
            Systems & Full-Stack Developer &bull; Aspiring DevOps / Cloud Engineer
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--muted)] print:text-neutral-600">
            <span>Hanumangarh Jn, Rajasthan</span>
            <span>&bull;</span>
            <a href="tel:+918875843487" className="hover:underline">+91-8875843487</a>
            <span>&bull;</span>
            <a href="mailto:jatindudhani07@gmail.com" className="hover:underline">jatindudhani07@gmail.com</a>
            <span>&bull;</span>
            <a href="https://github.com/Jatin-dudhani" target="_blank" rel="noreferrer" className="hover:underline">github.com/Jatin-dudhani</a>
            <span>&bull;</span>
            <a href="https://portfolio-jade-six-34.vercel.app" target="_blank" rel="noreferrer" className="hover:underline">portfolio-jade-six-34.vercel.app</a>
          </div>
        </header>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--green)] border-b border-[var(--card-border)] pb-1 mb-3 print:text-black print:border-black/20">
            # Education
          </h2>
          <div className="flex justify-between items-start text-xs sm:text-sm">
            <div>
              <div className="font-bold text-[var(--foreground)] print:text-black">The LNM Institute of Information Technology (LNMIIT)</div>
              <div className="text-xs text-[var(--muted)] print:text-neutral-600">B.Tech in Computer Science and Engineering</div>
            </div>
            <div className="text-right text-xs">
              <div className="font-semibold text-[var(--muted)] print:text-neutral-700">Graduation: May 2026</div>
              <div className="text-[var(--amber)] font-bold print:text-neutral-800">CGPA: 6.5 / 10</div>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--green)] border-b border-[var(--card-border)] pb-1 mb-3 print:text-black print:border-black/20">
            # Technical Skills
          </h2>
          <div className="grid gap-2 text-xs">
            <div>
              <span className="font-bold text-[var(--foreground)] print:text-black">Languages: </span>
              <span className="text-[var(--muted)] print:text-neutral-700">C++, TypeScript, JavaScript (ES6+), Python, HTML5, CSS3</span>
            </div>
            <div>
              <span className="font-bold text-[var(--foreground)] print:text-black">Systems & Networking: </span>
              <span className="text-[var(--muted)] print:text-neutral-700">Deep Packet Inspection (DPI), Multi-threading, TCP/IP, TLS/SSL, PCAP parsing, Zero-Copy Buffers</span>
            </div>
            <div>
              <span className="font-bold text-[var(--foreground)] print:text-black">Cloud & DevOps: </span>
              <span className="text-[var(--muted)] print:text-neutral-700">AWS (EC2, ECR, IAM), Docker, Kubernetes, CI/CD Pipelines, Nginx, Git, Linux, Vercel, Firebase</span>
            </div>
            <div>
              <span className="font-bold text-[var(--foreground)] print:text-black">Full-Stack Web: </span>
              <span className="text-[var(--muted)] print:text-neutral-700">React.js, Next.js (App Router), Node.js, Express.js, MongoDB, RESTful APIs, JWT Auth, Tailwind CSS</span>
            </div>
            <div>
              <span className="font-bold text-[var(--foreground)] print:text-black">AI & Vector Search: </span>
              <span className="text-[var(--muted)] print:text-neutral-700">AI SDK, OpenAI API, OpenRouter, RAG Pipelines, Vector Search & Embeddings</span>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--green)] border-b border-[var(--card-border)] pb-1 mb-3 print:text-black print:border-black/20">
            # Experience & Leadership
          </h2>
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold text-[var(--foreground)] print:text-black">
                <span>Teaching Assistant — Internet of Things</span>
                <span className="text-[var(--muted)] print:text-neutral-600 font-normal">Jan 2025 – Apr 2025</span>
              </div>
              <div className="text-[var(--muted)] print:text-neutral-600 mb-1">The LNMIIT, Jaipur</div>
              <ul className="list-disc list-inside space-y-1 text-[var(--muted)] print:text-neutral-700 pl-1">
                <li>Guided 40+ students in 30+ laboratory sessions for Arduino, NodeMCU, and network protocol integrations.</li>
                <li>Improved lab completion rates to ~95% through structured debugging protocols, cutting troubleshooting overhead by 30%.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between font-bold text-[var(--foreground)] print:text-black">
                <span>Accommodation & Public Relations Head</span>
                <span className="text-[var(--muted)] print:text-neutral-600 font-normal">2025 – 2026</span>
              </div>
              <div className="text-[var(--muted)] print:text-neutral-600 mb-1">PLINTH Tech Fest — The LNMIIT</div>
              <ul className="list-disc list-inside space-y-1 text-[var(--muted)] print:text-neutral-700 pl-1">
                <li>Directed logistical operations and communications for over 1,000+ national attendees, teams, and guest speakers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--green)] border-b border-[var(--card-border)] pb-1 mb-3 print:text-black print:border-black/20">
            # Key Projects
          </h2>
          <div className="space-y-4 text-xs">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id}>
                <div className="flex justify-between items-baseline font-bold text-[var(--foreground)] print:text-black">
                  <span>{p.title}</span>
                  <span className="text-[10px] text-[var(--green)] print:text-neutral-600 font-normal">
                    {p.technologies.join(' &bull; ')}
                  </span>
                </div>
                <p className="mt-1 text-[var(--muted)] print:text-neutral-700 leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-1 text-[10px] text-[var(--muted)] print:text-neutral-500">
                  <span>Code: {p.github}</span>
                  {p.deployed && <span className="ml-3">Live: {p.deployed}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--green)] border-b border-[var(--card-border)] pb-1 mb-3 print:text-black print:border-black/20">
            # Certifications
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded border border-[var(--card-border)] p-2.5 print:border-black/20">
              <div className="font-bold text-[var(--foreground)] print:text-black">Cloud Computing</div>
              <div className="text-[var(--muted)] print:text-neutral-600">NPTEL &bull; Score: 74.65%</div>
            </div>
            <div className="rounded border border-[var(--card-border)] p-2.5 print:border-black/20">
              <div className="font-bold text-[var(--foreground)] print:text-black">Privacy and Security in Social Media</div>
              <div className="text-[var(--muted)] print:text-neutral-600">NPTEL &bull; Score: 75.58%</div>
            </div>
          </div>
        </section>
      </article>
    </div>
  )
}
