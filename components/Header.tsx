'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const links = ['About', 'Skills', 'Projects', 'Contact']

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0e1116]/80 text-[#f4efe7] backdrop-blur-xl">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg border border-[#37ab8e]/50 bg-[#37ab8e]/15 text-sm font-black text-[#81dec8] shadow-[0_0_30px_rgba(55,171,142,0.18)] transition-transform group-hover:scale-105">
            JD
          </span>
          <span className="hidden text-sm font-semibold text-white/80 sm:block">
            Jatin Dudhani
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-1 text-sm text-white/70">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="rounded-md px-4 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {link}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden grid size-10 place-items-center rounded-lg border border-white/15 bg-white/[0.06] text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="flex h-4 w-5 flex-col justify-between">
            <span className={`h-0.5 rounded bg-current transition ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-0.5 rounded bg-current transition ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 rounded bg-current transition ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden border-t border-white/10 bg-[#111720]/95 px-4 py-4">
          <div className="w-full max-w-6xl mx-auto flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="rounded-lg px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
