import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a helpful assistant for Jatin Dudhani's portfolio website. Answer questions about Jatin's skills, experience, projects, and background. Be concise and technical.

About Jatin:
- Full-Stack Developer, CS undergrad at LNMIIT Jaipur (graduating May 2026)
- Tech: React, Next.js, TypeScript, Node.js, Express, MongoDB, C++, Python, Docker, AI/LLM
- Built: DPI engine in C++, AI project planner, RAG document QA, business simulation, Netflix GPT, DevOps pipelines
- TA for IoT course, PR Head for PLINTH Tech Fest
- NPTEL certs: Cloud Computing (74.65%), Privacy & Security (75.58%)
- Contact: jatindudhani07@gmail.com, +91-8875843487`

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

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://portfolio-jade-six-34.vercel.app',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        max_tokens: 300,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('OpenRouter error:', res.status, errText)
      return NextResponse.json({ reply: 'AI service temporarily unavailable. Try again later.' }, { status: 502 })
    }

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content || 'No response.'

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ reply: 'Something went wrong. Try again.' }, { status: 500 })
  }
}
