import { NextResponse } from 'next/server'

const RATE_LIMIT = 5
const RATE_WINDOW = 60_000

const hits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
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

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://portfolio-jade-six-34.vercel.app',
    },
    body,
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error(`OpenRouter error (${model}):`, res.status, errText)
    return null
  }
  const data = await res.json()
  return data.choices?.[0]?.message?.content || null
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'anonymous'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { reply: `Rate limit exceeded. Try again in a minute.` },
        { status: 429 }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not set')
      return NextResponse.json({
        reply: 'AI chat is not configured yet. Add OPENROUTER_API_KEY to your environment variables.',
      })
    }

    if (!apiKey.startsWith('sk-or-v1-')) {
      console.error('OPENROUTER_API_KEY has invalid format:', apiKey.slice(0, 15))
      return NextResponse.json({ reply: 'API key format is invalid.' }, { status: 500 })
    }

    for (const model of MODELS) {
      const reply = await tryModel(apiKey, message, model)
      if (reply) return NextResponse.json({ reply })
      await new Promise((r) => setTimeout(r, 200))
    }

    return NextResponse.json({ reply: 'AI service temporarily unavailable. Try again later.' }, { status: 502 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Chat API error:', msg)
    return NextResponse.json({ reply: 'Something went wrong. Try again.' }, { status: 500 })
  }
}
