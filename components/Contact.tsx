'use client'

import { useState } from 'react'

const contactEmail = 'jatindudhani07@gmail.com'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
  }

  const contactLinks = [
    {
      label: 'GitHub',
      value: 'github.com/Jatin-dudhani',
      href: 'https://github.com/Jatin-dudhani',
      mark: 'GH',
    },
    {
      label: 'LinkedIn',
      value: 'jatin-dudhani',
      href: 'https://www.linkedin.com/in/jatin-dudhani-057664254/',
      mark: 'IN',
    },
    {
      label: 'Email',
      value: 'jatindudhani07@gmail.com',
      href: `mailto:${contactEmail}`,
      mark: '@',
    },
  ]

  return (
    <section id="contact" className="py-24 text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase text-[#81dec8]">Contact</p>
          <h2 className="mt-3 text-4xl font-black sm:text-5xl">Let us build something useful.</h2>
          <p className="mt-4 text-lg text-white/60">
            Have a project in mind or want to collaborate? Reach out and I will get back to you.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {contactLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group rounded-lg border border-white/10 bg-white/[0.055] p-5 transition hover:-translate-y-1 hover:border-[#37ab8e]/45 hover:bg-white/[0.075]"
            >
              <div className="mb-4 grid size-11 place-items-center rounded-lg bg-[#f2a65a]/14 text-sm font-black text-[#f2a65a]">
                {item.mark}
              </div>
              <h3 className="font-black text-white">{item.label}</h3>
              <p className="mt-2 break-all text-sm text-white/50 group-hover:text-white/70">{item.value}</p>
            </a>
          ))}
        </div>

        <form
          action={`https://formsubmit.co/${contactEmail}`}
          method="POST"
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-[#111720]/92 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)] md:p-8"
        >
          <input type="hidden" name="_subject" value="New portfolio contact message" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-white/74">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/30 focus:border-[#37ab8e]/70 focus:bg-white/[0.08]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-white/74">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/30 focus:border-[#37ab8e]/70 focus:bg-white/[0.08]"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="block text-sm font-bold text-white/74">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/30 focus:border-[#37ab8e]/70 focus:bg-white/[0.08]"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-lg bg-[#37ab8e] px-6 py-3 font-black text-[#07110f] transition hover:-translate-y-0.5 hover:bg-[#81dec8]"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          <p className="mt-4 text-center text-sm text-white/45">
            The first submission may ask you to confirm this form by email.
          </p>
        </form>
      </div>
    </section>
  )
}
