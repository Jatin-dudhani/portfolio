import { NextResponse } from 'next/server'

const RATE_LIMIT = 5
const RATE_WINDOW = 60_000

const hits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  // Clean up expired entries periodically to prevent memory leaks
  if (hits.size > 1000) {
    for (const [key, value] of hits.entries()) {
      if (now > value.resetAt) hits.delete(key)
    }
  }

  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
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

const SYSTEM_PROMPT = `You are a helpful assistant for Jatin Dudhani's portfolio website. Answer questions about Jatin's skills, experience, projects, and background. Be concise and technical.

About Jatin:
- Full-Stack Developer, 25, from Hanumangarh Jn, Rajasthan
- CS undergrad at LNMIIT Jaipur (graduating May 2026), CGPA 6.5
- Tech: React, Next.js, TypeScript, Node.js, Express, MongoDB, C++, Python, Docker, AI/LLM
- Aspiring DevOps / Cloud Engineer — currently pursuing AWS, DevOps & AI certifications
- Built: DPI engine in C++, AI project planner, RAG document QA, business simulation, Netflix GPT, DevOps pipelines
- TA for IoT course, PR Head for PLINTH Tech Fest
- NPTEL certs: Cloud Computing (74.65%), Privacy & Security (75.58%)
- Personality: blunt, straightforward, leadership-driven, helpful. Often misunderstood as rude due to directness.
- Outside code: ghazals, old Hindi/Urdu songs, shayari, cricket, football, track & field, chess, walking
- Philosophy: live in the moment, don't overthink, pursue what you like
- Contact: jatindudhani07@gmail.com, +91-8875843487`

const MODELS = [
  'qwen/qwen3-coder:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  'openai/gpt-oss-20b:free',
]

async function tryModel(apiKey: string, message: string, model: string) {
  const url = 'https://openrouter.ai/api/v1/chat/completions'
  const body = JSON.stringify({
    model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message },
    ],
    max_tokens: 300,
  })

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://portfolio-jade-six-34.vercel.app',
      },
      body,
      signal: AbortSignal.timeout(8000), // 8s timeout to avoid worker hang
    })

    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data.choices?.[0]?.message?.content || null
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  // Origin validation
  const origin = request.headers.get('origin') || request.headers.get('referer') || ''
  if (!isOriginAllowed(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Rate limiting per IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { reply: 'Rate limit exceeded. Try again in a minute.' },
      { status: 429 }
    )
  }

  try {
    let payload: { message?: unknown }
    try {
      payload = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    const { message } = payload

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const trimmed = message.trim()
    if (!trimmed) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 })
    }

    if (trimmed.length > 600) {
      return NextResponse.json(
        { error: 'Message is too long. Please limit to 600 characters.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        reply: 'AI chat is not configured yet. Add OPENROUTER_API_KEY to your environment variables.',
      })
    }

    if (!apiKey.startsWith('sk-or-v1-')) {
      console.error('OPENROUTER_API_KEY has invalid format')
      return NextResponse.json({ reply: 'API key format is invalid.' }, { status: 500 })
    }

    for (const model of MODELS) {
      const reply = await tryModel(apiKey, trimmed, model)
      if (reply) return NextResponse.json({ reply })
      await new Promise((r) => setTimeout(r, 150))
    }

    return NextResponse.json(
      { reply: 'AI service temporarily unavailable. Try again in a moment.' },
      { status: 502 }
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Chat API error:', msg)
    return NextResponse.json({ reply: 'Something went wrong. Try again.' }, { status: 500 })
  }
}
