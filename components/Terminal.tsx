'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'

const banner = `╔══════════════════════════════════╗
║   JATIN DUDHANI — PORTFOLIO CLI  ║
╚══════════════════════════════════╝`

const commands: Record<string, string> = {
  help: `about      - who I am
skills     - what I know
projects   - what I built
contact    - how to reach me
whoami     - display identity
banner     - show banner
ls         - list sections
date       - current time
neofetch   - dev system info
dark       - dark mode
light      - light mode
mario      - watch me run
clear      - clear terminal
sudo       - try it ;)
matrix     - follow the rabbit`,

  about: `CS student at LNMIIT Jaipur.
Building full-stack apps with React, Next.js, TypeScript.
Exploring AI SDKs, distributed systems & DevOps.`,

  skills: `frontend    React, Next.js, TypeScript, Tailwind, Framer Motion
backend     Node.js, REST APIs, MongoDB
devops      Git, Docker, AWS, CI/CD
craft       System Design, Full Stack, AI Integration`,

  projects: `ai-project-planner    AI-powered project briefs (deployed)
netflix-gpt           Netflix clone w/ AI recommendations
revolving-clock       3D flip clock w/ MongoDB (deployed)
simbusiness           Business simulation (system design)
bulk-email-sender     Batch email w/ scheduling
birthday-reminder     React-based birthday tracker
devops-pipeline       Docker + AWS + GitLab CI/CD`,

  contact: `email     jatindudhani07@gmail.com
github    github.com/Jatin-dudhani
linkedin  linkedin.com/in/jatin-dudhani`,

  whoami: `jatin-dudhani — full-stack developer, CS undergrad.`,

  banner,

  ls: `about/  skills/  projects/  contact/`,

  neofetch: `OS       Linux mind x86_64
shell    bash / zsh
editor   VS Code
stack    Next.js + TypeScript + Tailwind
status   building the next thing`,

  sudo: `Nice try, but there's no root here.`,
  su: `Just type 'help' to see commands.`,
  exit: `Not a real shell. Type 'help'.`,
  matrix: `You start typing... the code stares back.`,
  '': '',
}

type Line = { text: string; isInput?: boolean; isSystem?: boolean }

const MARIO_TOTAL = 36
const MARIO_SPEED = 100

const frames = ["(>'_')>", "<('_'<)"]

export default function TerminalWidget() {
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

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase()
      const parts = trimmed.split(/\s+/)
      const base = parts[0]

      setCommandHistory((prev) => [...prev, cmd])
      setHistoryIndex(-1)

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
    [setTheme]
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
