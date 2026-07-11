'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'

const banner = `╔══════════════════════════════════╗
║   JATIN DUDHANI — PORTFOLIO CLI  ║
╚══════════════════════════════════╝`

const commands: Record<string, string> = {
  help: `about        - who I am
skills       - technical skills
projects     - what I built
--resume     - formatted resume
blog         - technical writing
reading      - what I am reading
activity     - recent GitHub commits
experience   - work & leadership
education    - academic background
certificates - NPTEL certs
contact      - how to reach me
whoami       - display identity
banner       - show banner
ls           - list sections
date         - current time
neofetch     - dev system info
dark         - dark mode
light        - light mode
mario        - watch me run
snake        - slithering snake
guess        - guess the number
clear        - clear terminal
sudo         - try it ;)
matrix       - toggle matrix rain`,

  about: `Full-Stack Developer | 25 | Hanumangarh Jn, Rajasthan
CS @ LNMIIT Jaipur (May 2026)
Expertise: React, Next.js, TypeScript, Node.js, Express, MongoDB
Building: DPI engines (C++), RAG pipelines (Python), AI apps (AI SDK)
Focusing: DevOps / Cloud Engineering (AWS, Docker, K8s)
Outside code: ghazals, shayari, cricket, chess, long walks
Philosophy: live in the moment, don't overthink, pursue what you like`,

  skills: `languages    JavaScript(ES6+), TypeScript, HTML5, CSS3, C++, Python
frontend     React, Next.js, Redux Toolkit, Tailwind, Framer Motion, shadcn/ui
backend      Node.js, Express.js, REST APIs, JWT Auth, MongoDB, MVC
ai/api       AI SDK, OpenAI, OpenRouter, LLM, RAG, Vector Search, Zod
devops       Git, Docker, Kubernetes, Firebase, Vercel, Render, CI/CD
systems      C++, Multi-threading, TCP/IP, TLS/SSL, PCAP, DPI`,

  projects: `dpi-engine           DPI packet analyzer in C++ (multi-threaded)
ai-project-planner   AI-powered project briefs (deployed)
rag-document-qa      RAG system for document Q&A (Python)
simbusiness          Business simulation (system design)
netflix-gpt          Netflix clone w/ AI recommendations
devops-pipeline      Docker + AWS + GitLab CI/CD`,

  '--resume': `╔══════════════════════════════════════════╗
║          JATIN DUDHANI — RESUME          ║
║          Full-Stack Developer            ║
║          25 · Hanumangarh Jn, Rajasthan  ║
╚══════════════════════════════════════════╝

EDUCATION
  B.Tech CSE · LNMIIT, Jaipur · May 2026
  CGPA: 6.5 / 10

EXPERIENCE
  Teaching Assistant — IoT    LNMIIT (Jan-Apr 2025)
  PR Head — PLINTH Tech Fest  (2025-2026)
  Member — Aaveg Dramatic Club (2024-Present)

CAREER FOCUS
  DevOps / Cloud Engineering (AWS, Docker, K8s)

TECHNICAL SKILLS
  Languages:  JavaScript, TypeScript, C++, Python
  Frontend:   React, Next.js, Redux Toolkit, Tailwind, Framer Motion
  Backend:    Node.js, Express, MongoDB, REST APIs, JWT
  AI/ML:      AI SDK, OpenAI, OpenRouter, RAG, Vector Search
  DevOps:     AWS, Docker, Kubernetes, Git, CI/CD, Firebase, Vercel

CERTIFICATIONS
  Cloud Computing — NPTEL (74.65%)
  Privacy & Security in Social Media — NPTEL (75.58%)
  Pursuing: AWS, DevOps & AI certifications

PROJECTS
  • DPI Engine (C++) — Deep packet inspection, 25+ classifiers
  • AI Project Planner — AI-powered briefs w/ visualization
  • RAG Document QA — RAG pipeline w/ vector search
  • SimBusiness — Business simulation (system design)
  • Netflix GPT — Netflix clone w/ AI recs
  • DevOps Pipeline — Docker + AWS + GitLab CI/CD

PERSONALITY
  Blunt, straightforward, leadership-driven, helpful
  Often misunderstood as rude (just direct)

INTERESTS
  Music:  Ghazals, old songs, Urdu/Hindi shayari
  Sports: Cricket, football, track & field
  Games:  Chess
  Other:  Walking, strolling
  Goal:   Improve physique

PHILOSOPHY
  "Live in the moment. Don't overthink. Pursue what you like."

CONTACT
  email:    jatindudhani07@gmail.com
  github:   github.com/Jatin-dudhani
  linkedin: linkedin.com/in/jatin-dudhani
  phone:    +91-8875843487`,

  experience: `TA Internet of Things    LNMIIT (Jan-Apr 2025)
                         ~95% lab completion, -30% troubleshooting
PR Head PLINTH Fest       Coordinated 1000+ participants
Aaveg Dramatic Club       Street plays for social awareness`,

  education: `B.Tech CSE    LNMIIT, Jaipur (May 2026) — CGPA: 6.5/10`,

  certificates: `Cloud Computing                          NPTEL (Jan-Apr 2026) — 74.65%
Privacy & Security in Online Social Media NPTEL (Jul-Oct 2025) — 75.58%`,

  blog: `Writing & Reading — see https://jatin.dev/#blog

  writing:
    dpi-engine-cpp    Building a DPI Engine in C++17
    rag-document-qa   RAG Pipelines with Vector Search

  reading (4 items):
    The Phoenix Project (reading)
    SRE Handbook (planned)
    AWS Solutions Architect (reading)
    Kubernetes in Action (planned)`,

  reading: `Currently reading (4 items):

  The Phoenix Project          Gene Kim                 [reading]
  AWS Solutions Architect      A Cloud Guru             [reading]
  Site Reliability Engineering Google                   [planned]
  Kubernetes in Action         Marko Luksa              [planned]

  Edit lib/reading.ts to add or update entries.`,

  activity: `Fetching latest commits from GitHub...
  Try scrolling to the #activity section on the page.`,

  contact: `email     jatindudhani07@gmail.com
github    github.com/Jatin-dudhani
linkedin  linkedin.com/in/jatin-dudhani
phone     +91-8875843487`,

  whoami: `jatin-dudhani — Full-Stack Developer, CS undergrad @ LNMIIT`,

  banner,

  ls: `about/  skills/  projects/  blog/  activity/  experience/  education/  certificates/  contact/  --resume/`,

  neofetch: `OS       Linux mind x86_64
shell    bash / zsh
editor   VS Code
stack    React / Next.js / Node.js / TypeScript / C++ / Python
status   open to SDE roles`,

  sudo: `Nice try, but there's no root here.`,
  su: `Just type 'help' to see commands.`,
  exit: `Not a real shell. Type 'help'.`,
  matrix: `Use 'matrix' to toggle the matrix rain effect. It's already active!`,
  '': '',
}

type Line = { text: string; isInput?: boolean; isSystem?: boolean }

const MARIO_TOTAL = 36
const MARIO_SPEED = 100

const frames = ["(>'_')>", "<('_'<)"]

const SNAKE_TOTAL = 40
const SNAKE_SPEED = 120

const SNAKE_BODY = ['🐍', '~', '~', '~', '~', '~', '~', '~']

interface Props {
  onMatrixToggle?: () => void
}

export default function TerminalWidget({ onMatrixToggle }: Props) {
  const { setTheme } = useTheme()
  const [history, setHistory] = useState<Line[]>([
    { text: banner, isSystem: true },
    { text: 'Try "help" to see what I can do.', isSystem: true },
    { text: '', isSystem: true },
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [marioPos, setMarioPos] = useState<number | null>(null)
  const [marioFrame, setMarioFrame] = useState(0)
  const [snakePos, setSnakePos] = useState<number | null>(null)
  const [guessGame, setGuessGame] = useState<{ target: number; attempts: number } | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history])

  useEffect(() => {
    if (marioPos === null) return
    if (marioPos >= MARIO_TOTAL) {
      const t = setTimeout(() => {
        setMarioPos(null)
        setHistory((prev) => [
          ...prev,
          { text: '🏁 Mario reached the flag! Thanks for watching.', isSystem: true },
          { text: '', isSystem: true },
        ])
      }, 0)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setMarioPos((p) => p! + 1)
      setMarioFrame((f) => (f + 1) % 2)
    }, MARIO_SPEED)
    return () => clearTimeout(t)
  }, [marioPos])

  useEffect(() => {
    if (snakePos === null) return
    if (snakePos >= SNAKE_TOTAL) {
      const t = setTimeout(() => {
        setSnakePos(null)
        setHistory((prev) => [
          ...prev,
          { text: '🐍 The snake slithered away! Type "snake" to watch again.', isSystem: true },
          { text: '', isSystem: true },
        ])
      }, 0)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setSnakePos((p) => p! + 1)
    }, SNAKE_SPEED)
    return () => clearTimeout(t)
  }, [snakePos])

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim()
      const lower = trimmed.toLowerCase()
      const parts = lower.split(/\s+/)
      const base = parts[0]

      setCommandHistory((prev) => [...prev, cmd])
      setHistoryIndex(-1)

      if (guessGame) {
        const guess = parseInt(trimmed, 10)
        if (!isNaN(guess)) {
          const newAttempts = guessGame.attempts + 1
          setGuessGame((prev) => (prev ? { ...prev, attempts: newAttempts } : null))

          if (guess === guessGame.target) {
            setGuessGame(null)
            setHistory((prev) => [
              ...prev,
              { text: `visitor@portfolio:~$ ${trimmed}`, isInput: true },
              { text: `🎉 Correct! The number was ${guessGame.target}. You got it in ${newAttempts} attempt${newAttempts > 1 ? 's' : ''}!`, isSystem: true },
            ])
          } else if (guess < guessGame.target) {
            setHistory((prev) => [
              ...prev,
              { text: `visitor@portfolio:~$ ${trimmed}`, isInput: true },
              { text: `⬆️ Higher than ${guess}. Try again!`, isSystem: true },
            ])
          } else {
            setHistory((prev) => [
              ...prev,
              { text: `visitor@portfolio:~$ ${trimmed}`, isInput: true },
              { text: `⬇️ Lower than ${guess}. Try again!`, isSystem: true },
            ])
          }
          return
        }
        if (lower === 'quit' || lower === 'exit') {
          setGuessGame(null)
          setHistory((prev) => [
            ...prev,
            { text: `visitor@portfolio:~$ ${trimmed}`, isInput: true },
            { text: `👋 Game ended. The number was ${guessGame.target}.`, isSystem: true },
          ])
          return
        }
      }

      if (base === 'clear') {
        setHistory([])
        return
      }

      if (base === 'dark') {
        setTheme('dark')
        setHistory((prev) => [
          ...prev,
          { text: `visitor@portfolio:~$ ${cmd}`, isInput: true },
          { text: 'Switched to dark mode.', isSystem: true },
        ])
      } else if (base === 'light') {
        setTheme('light')
        setHistory((prev) => [
          ...prev,
          { text: `visitor@portfolio:~$ ${cmd}`, isInput: true },
          { text: 'Switched to light mode.', isSystem: true },
        ])
      } else if (base === 'mario') {
        setHistory((prev) => [
          ...prev,
          { text: `visitor@portfolio:~$ ${cmd}`, isInput: true },
          { text: '', isSystem: true },
        ])
        setMarioPos(0)
        setMarioFrame(0)
      } else if (base === 'snake') {
        setHistory((prev) => [
          ...prev,
          { text: `visitor@portfolio:~$ ${cmd}`, isInput: true },
          { text: '', isSystem: true },
        ])
        setSnakePos(0)
      } else if (base === 'guess') {
        const target = Math.floor(Math.random() * 100) + 1
        setGuessGame({ target, attempts: 0 })
        setHistory((prev) => [
          ...prev,
          { text: `visitor@portfolio:~$ ${cmd}`, isInput: true },
          { text: '🎯 I am thinking of a number between 1 and 100. Type your guess!', isSystem: true },
        ])
      } else if (base === 'matrix') {
        setHistory((prev) => [
          ...prev,
          { text: `visitor@portfolio:~$ ${cmd}`, isInput: true },
        ])
        onMatrixToggle?.()
        setHistory((prev) => [
          ...prev,
          { text: '🌧️ Matrix rain toggled.', isSystem: true },
        ])
      } else if (base === 'date') {
        setHistory((prev) => [
          ...prev,
          { text: `visitor@portfolio:~$ ${cmd}`, isInput: true },
          { text: new Date().toLocaleString(), isSystem: true },
        ])
      } else if (base === 'sudo' && parts[1] === 'rm' && parts[2] === '-rf') {
        setHistory((prev) => [
          ...prev,
          { text: `visitor@portfolio:~$ ${cmd}`, isInput: true },
          { text: '⛔ This is not the command you are looking for.', isSystem: true },
        ])
      } else if (base in commands) {
        setHistory((prev) => [
          ...prev,
          { text: `visitor@portfolio:~$ ${cmd}`, isInput: true },
          { text: commands[base], isSystem: true },
        ])
      } else {
        setHistory((prev) => [
          ...prev,
          { text: `visitor@portfolio:~$ ${cmd}`, isInput: true },
          { text: `bash: ${base}: command not found. Type "help" for available commands.`, isSystem: true },
        ])
      }
    },
    [setTheme, guessGame, setGuessGame, onMatrixToggle]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      setInput(commandHistory[newIndex])
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const newIndex = historyIndex + 1
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
      return
    }
  }

  return (
    <div
      className="rounded-lg border border-white/12 bg-[#0a0d12]/92 p-1 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="size-3 rounded-full bg-[#f26b5a]" />
        <span className="size-3 rounded-full bg-[#f2c45a]" />
        <span className="size-3 rounded-full bg-[#37ab8e]" />
        <span className="ml-3 font-mono text-xs text-white/35">terminal — bash</span>
      </div>

      <div
        ref={scrollRef}
        className="h-72 overflow-y-auto whitespace-pre-wrap px-4 font-mono text-sm leading-relaxed text-[#81dec8]"
      >
        {history.map((line, i) => (
          <div key={i} className={line.isInput ? 'text-white/80' : 'text-[#81dec8]/85'}>
            {line.text}
          </div>
        ))}
        {marioPos !== null && (
          <div className="text-yellow-400">
            {' '.repeat(Math.max(0, marioPos))}
            {frames[marioFrame]}
          </div>
        )}
        {snakePos !== null && (
          <div className="text-lime-400">
            {' '.repeat(Math.max(0, snakePos))}
            {SNAKE_BODY.join('')}
          </div>
        )}
      </div>

      <div className="flex items-center border-t border-white/8 px-4 py-3">
        <span className="mr-2 font-mono text-sm text-[#81dec8]">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent font-mono text-sm text-white outline-none"
          placeholder="help"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  )
}
