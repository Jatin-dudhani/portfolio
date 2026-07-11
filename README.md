# Jatin Dudhani — Portfolio

Personal portfolio built with Next.js, TypeScript, Tailwind CSS v4, and motion. Terminal-themed, data-driven, and feature-rich.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- motion (Framer Motion v12)
- next-themes (dark/light mode)
- Zod + Resend (contact form)
- Plausible (analytics)
- Vitest (tests)

## Features

- **CLI Terminal** — Interactive bash-like terminal with 16+ commands (`help`, `about`, `skills`, `--resume`, `matrix`, `mario`, `snake`, `guess`, etc.)
- **AI Chat** — Floating chat widget that answers questions about me via OpenRouter (GPT/LLaMA/Gemma) with model fallback and rate limiting
- **Matrix Rain** — Toggleable kata kana canvas overlay
- **Mini Games** — Snake animation, number guessing game
- **JSON API** — Structured profile data at `/api/jatin`
- **Blog & Reading** — Dual-tab section with data in `lib/` + auto-sync script (`scripts/sync-github.mjs`)
- **Project Filter** — Live grep-style filtering of projects by technology
- **Particle Background** — Canvas particle system
- **Dark/Light Theme** — Persisted via `next-themes`
- **Contact Form** — Server-side validation + Resend email delivery
- **SEO** — Open Graph image, rich meta tags, sitemap, robots.txt

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | No | Contact form email delivery |
| `OPENROUTER_API_KEY` | No (chat degrades gracefully) | AI Chat via OpenRouter |

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run test` | Run Vitest tests |
| `node scripts/sync-github.mjs` | Dry-run GitHub → blog sync |
| `node scripts/sync-github.mjs --apply` | Write blog drafts from GitHub repos |

## Project Structure

```
app/
  api/
    jatin/route.ts      — Profile JSON API
    chat/route.ts       — AI Chat endpoint with rate limiter
    contact/route.ts    — Contact form handler
  opengraph-image.tsx    — Dynamic OG image
  sitemap.ts             — SEO sitemap
  robots.ts              — Robots config
  page.tsx               — Main page
components/
  Terminal.tsx           — CLI terminal widget
  AIChat.tsx             — Floating AI chat
  MatrixRain.tsx         — Matrix rain canvas
  Particles.tsx          — Particle background
  ...                    — Section components
lib/
  projects.ts            — Project data
  posts.ts               — Blog posts
  reading.ts             — Reading list
  types.ts               — Shared types
  utils.ts               — Utilities
scripts/
  sync-github.mjs        — GitHub activity → blog draft generator
public/
  resume.md              — Downloadable resume
```

## Deployment

Deploy on Vercel. Set `RESEND_API_KEY` and `OPENROUTER_API_KEY` in environment variables for full functionality.

A GitHub Actions workflow (`.github/workflows/sync-content.yml`) runs weekly to sync new repos into blog drafts.

## Author

**Jatin Dudhani**

- GitHub: [@Jatin-dudhani](https://github.com/Jatin-dudhani)
- LinkedIn: [jatin-dudhani](https://www.linkedin.com/in/jatin-dudhani-057664254/)
- Email: [jatindudhani07@gmail.com](mailto:jatindudhani07@gmail.com)
- Portfolio: [portfolio-jade-six-34.vercel.app](https://portfolio-jade-six-34.vercel.app)
