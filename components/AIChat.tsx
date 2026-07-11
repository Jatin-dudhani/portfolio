'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  const send = async () => {
    const msg = input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: msg }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Network error. Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded border border-[var(--green)]/50 bg-[var(--background)]/90 backdrop-blur px-4 py-2.5 font-mono text-xs font-semibold text-[var(--green)] shadow-lg transition-all duration-200 hover:bg-[var(--green)] hover:text-[var(--background)] hover:shadow-[0_0_20px_rgba(63,185,80,0.3)]"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        $ ask jatin
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 rounded border border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur-xl shadow-2xl font-mono overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--red)]" />
                <span className="size-2 rounded-full bg-[var(--amber)]" />
                <span className="size-2 rounded-full bg-[var(--green)]" />
                <span className="ml-2 text-[10px] text-[var(--muted)]">ask-jatin.sh</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[10px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                $ exit
              </button>
            </div>

            <div ref={scrollRef} className="h-64 overflow-y-auto px-4 py-3 space-y-3 text-xs">
              {messages.length === 0 && (
                <p className="text-[var(--muted)] italic">Ask me anything about Jatin — skills, projects, experience...</p>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
                  <div className={`rounded px-3 py-2 max-w-[85%] leading-5 ${
                    m.role === 'user'
                      ? 'bg-[var(--green)]/15 text-[var(--foreground)] border border-[var(--green)]/20'
                      : 'bg-[var(--card-bg)] text-[var(--muted)] border border-[var(--card-border)]'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="rounded px-3 py-2 bg-[var(--card-bg)] text-[var(--muted)] border border-[var(--card-border)] flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-[var(--green)] animate-pulse" />
                    <span className="size-1.5 rounded-full bg-[var(--green)] animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="size-1.5 rounded-full bg-[var(--green)] animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center border-t border-[var(--card-border)] px-4 py-2.5 gap-2">
              <span className="text-[11px] text-[var(--green)] shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="ask about jatin..."
                className="flex-1 bg-transparent text-xs text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]/50"
                spellCheck={false}
                autoComplete="off"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="text-[10px] font-semibold text-[var(--green)] hover:text-[var(--green-bright)] transition-colors disabled:opacity-30 cursor-pointer"
              >
                send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
