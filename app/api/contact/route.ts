import { NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(254, 'Email cannot exceed 254 characters'),
  message: z
    .string()
    .trim()
    .min(2, 'Message must be at least 2 characters')
    .max(5000, 'Message cannot exceed 5,000 characters'),
  website: z.string().optional(), // Honeypot field for bot protection
})

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  // Clean up expired entries periodically to prevent memory leaks
  if (rateLimit.size > 1000) {
    for (const [key, value] of rateLimit.entries()) {
      if (now > value.resetAt) rateLimit.delete(key)
    }
  }

  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

function isOriginAllowed(origin: string): boolean {
  if (!origin) return true // Allow same-origin / server-to-server calls
  try {
    const parsed = new URL(origin)
    const hostname = parsed.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true
    if (hostname === 'portfolio-jade-six-34.vercel.app') return true
    if (hostname.endsWith('.vercel.app')) return true
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (siteUrl && hostname === new URL(siteUrl).hostname) return true
    return false
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin') || request.headers.get('referer') || ''
  if (!isOriginAllowed(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 })
  }

  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    const parsed = bodySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, message, website } = parsed.data

    // Bot honeypot check: if filled, silently succeed without sending email
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const safeMessage = escapeHtml(message)
    // Strip CRLF / header injection characters from subject line name
    const sanitizedSubjectName = name.replace(/[\r\n\x00-\x1f]/g, ' ').trim().slice(0, 80)

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured on Vercel')
      return NextResponse.json(
        {
          success: true,
          configured: false,
          note: 'Submission logged on server (RESEND_API_KEY not configured).',
        },
        { status: 200 }
      )
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'jatindudhani07@gmail.com',
      replyTo: email,
      subject: `New message from ${sanitizedSubjectName} via portfolio`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${safeMessage}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again or email directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error'
    console.error('Contact API error:', msg)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
