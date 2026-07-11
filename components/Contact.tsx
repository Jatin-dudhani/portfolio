'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

const spring = { type: 'spring' as const, stiffness: 260, damping: 25 }

const contactEmail = 'jatindudhani07@gmail.com'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to send')

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactLinks = [
    {
      label: 'GitHub',
      value: 'github.com/Jatin-dudhani',
      href: 'https://github.com/Jatin-dudhani',
      cmd: 'gh user Jatin-dudhani',
    },
    {
      label: 'LinkedIn',
      value: 'jatin-dudhani',
      href: 'https://www.linkedin.com/in/jatin-dudhani-057664254/',
      cmd: 'in/jatin-dudhani',
    },
    {
      label: 'Email',
      value: 'jatindudhani07@gmail.com',
      href: `mailto:${contactEmail}`,
      cmd: 'mail jatindudhani07@gmail.com',
    },
  ]

  return (
    <motion.section
      id="contact"
      className="py-24 text-[var(--foreground)] font-mono"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <p className="text-sm text-[var(--green)]">
            $ <span className="text-[var(--muted)]">cat</span> /home/jatin/contact.md
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]"># Get In Touch</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Have a project in mind? Want to collaborate? Drop a message.
          </p>
          <motion.a
            href="/resume.md"
            download
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.08 }}
            whileHover={{ scale: 1.02 }}
            className="mt-4 inline-flex items-center gap-2 rounded border border-[var(--amber)] bg-[var(--amber)]/8 px-4 py-2 text-xs font-semibold text-[var(--amber)] transition-all duration-200 hover:bg-[var(--amber)] hover:text-[var(--background)] hover:shadow-[0_0_14px_rgba(210,153,34,0.2)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            $ wget resume.md
          </motion.a>
        </motion.div>

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {contactLinks.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.05 + i * 0.04 }}
              whileHover={{ y: -2, transition: { duration: 0.12 } }}
              className="group rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-4 transition-shadow hover:border-[var(--green)]/40 hover:shadow-[0_0_14px_rgba(63,185,80,0.05)]"
            >
              <div className="text-xs text-[var(--green)]">$ {item.cmd}</div>
              <h3 className="mt-2 text-sm font-bold text-[var(--foreground)]">{item.label}</h3>
              <p className="mt-1 text-xs text-[var(--muted)]">{item.value}</p>
            </motion.a>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.1 }}
          className="mx-auto max-w-2xl rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="size-2 rounded-full bg-[var(--green)]" />
            <span className="size-2 rounded-full bg-[var(--amber)]" />
            <span className="size-2 rounded-full bg-[var(--red)]" />
            <span className="ml-2 text-xs text-[var(--muted)]">contact-form.sh</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-[var(--muted)]">
                $ name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded border border-[var(--card-border)] bg-[var(--background)]/50 px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-all duration-150 placeholder:text-[var(--muted)]/40 font-mono focus:border-[var(--green)]/60 focus:shadow-[0_0_12px_rgba(63,185,80,0.08)]"
                placeholder="your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[var(--muted)]">
                $ email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded border border-[var(--card-border)] bg-[var(--background)]/50 px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-all duration-150 placeholder:text-[var(--muted)]/40 font-mono focus:border-[var(--green)]/60 focus:shadow-[0_0_12px_rgba(63,185,80,0.08)]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="block text-xs font-semibold text-[var(--muted)]">
              $ message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 w-full resize-none rounded border border-[var(--card-border)] bg-[var(--background)]/50 px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-all duration-150 placeholder:text-[var(--muted)]/40 font-mono focus:border-[var(--green)]/60 focus:shadow-[0_0_12px_rgba(63,185,80,0.08)]"
              placeholder="your message..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full rounded border border-[var(--green)] bg-[var(--green)]/10 px-4 py-2.5 text-sm font-semibold text-[var(--green)] transition-all duration-200 hover:bg-[var(--green)] hover:text-[var(--background)] hover:shadow-[0_0_18px_rgba(63,185,80,0.2)] disabled:opacity-50"
          >
            {isSubmitting ? '$ sending...' : '$ send --to jatin'}
          </motion.button>

          {submitStatus === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center text-xs text-[var(--green)]"
            >
              [OK] Message sent. I will get back to you soon.
            </motion.p>
          )}
          {submitStatus === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center text-xs text-[var(--red)]"
            >
              [ERR] Failed to send. Try emailing directly.
            </motion.p>
          )}
        </motion.form>
      </div>
    </motion.section>
  )
}
