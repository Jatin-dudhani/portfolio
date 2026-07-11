import { NextResponse } from 'next/server'

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
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://portfolio-jade-six-34.vercel.app',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
      max_tokens: 300,
    }),
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

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        reply: 'AI chat is not configured yet. Add OPENROUTER_API_KEY to your environment variables.',
      })
    }

    for (const model of MODELS) {
      const reply = await tryModel(apiKey, message, model)
      if (reply) return NextResponse.json({ reply })
      await new Promise((r) => setTimeout(r, 200))
    }

    return NextResponse.json({ reply: 'AI service temporarily unavailable. Try again later.' }, { status: 502 })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ reply: 'Something went wrong. Try again.' }, { status: 500 })
  }
}
