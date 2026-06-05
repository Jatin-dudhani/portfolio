import { NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin') || request.headers.get('referer') || ''
  const allowedOrigins = ['http://localhost:3000', 'https://YOUR_DOMAIN.vercel.app']
  if (!allowedOrigins.some((a) => origin.startsWith(a))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const parsed = bodySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, message } = parsed.data
    const safeMessage = escapeHtml(message)

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured — falling back to log')
      console.log('Contact form submission:', { name, email, message })
      return NextResponse.json(
        { success: true, note: 'Logged (no email service configured)' },
        { status: 200 }
      )
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'jatindudhani07@gmail.com',
      subject: `New message from ${name} via portfolio`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
