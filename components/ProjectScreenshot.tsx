'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function ProjectScreenshot({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`

  return (
    <>
      <div
        className="relative mt-3 rounded overflow-hidden border border-[var(--card-border)] bg-[var(--background)]/60 cursor-pointer group/shot transition-all duration-200 hover:border-[var(--amber)]/50"
        onClick={() => setOpen(true)}
      >
        {!loaded && (
          <div className="flex items-center gap-2 px-3 py-2 text-[10px] text-[var(--muted)] font-mono">
            <span className="size-1.5 rounded-full bg-[var(--amber)] animate-pulse" />
            Loading preview...
          </div>
        )}
        <img
          src={screenshotUrl}
          alt={`${title} screenshot`}
          onLoad={() => setLoaded(true)}
          className={`w-full transition-opacity duration-300 ${loaded ? 'opacity-80 hover:opacity-100' : 'opacity-0 h-0'}`}
          style={{ aspectRatio: '16/10', objectFit: 'cover' }}
        />
        {loaded && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/shot:opacity-100 transition-opacity duration-200 bg-[var(--background)]/60">
            <span className="text-[10px] font-mono text-[var(--amber)] border border-[var(--amber)]/50 rounded px-2 py-1 bg-[var(--background)]/80">
              ▸ preview
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[var(--background)]/90 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative w-full max-w-4xl rounded border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[var(--red)]" />
                  <span className="size-2 rounded-full bg-[var(--amber)]" />
                  <span className="size-2 rounded-full bg-[var(--green)]" />
                  <span className="ml-2 text-[10px] font-mono text-[var(--muted)]">{url.replace(/https?:\/\//, '')}</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-[10px] font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                >
                  $ exit
                </button>
              </div>
              <iframe
                src={url}
                className="w-full h-[60vh] sm:h-[70vh]"
                title={`${title} live preview`}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
