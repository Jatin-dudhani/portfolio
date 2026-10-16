'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { playKeyClick, playSuccessBeep } from '@/lib/sound'

type Stage = {
  id: string
  name: string
  command: string
  logs: string[]
}

const STAGES: Stage[] = [
  {
    id: 'lint',
    name: '1. Lint & Types',
    command: 'npm run lint && tsc --noEmit',
    logs: [
      '> eslint --ext .ts,.tsx .',
      'Checking 28 source files across /app and /components...',
      '✔ 0 lint errors, 0 warnings found.',
      '✔ TypeScript compilation check passed (0 errors in 1.4s).',
    ],
  },
  {
    id: 'test',
    name: '2. Unit Tests',
    command: 'vitest run --coverage',
    logs: [
      '> vitest run --reporter=verbose',
      '✓ lib/__tests__/projects.test.ts (3 tests passed)',
      'Test Files  1 passed (1)',
      'Tests       3 passed (3)',
      'Code Coverage: 94.2% statements covered in 840ms.',
    ],
  },
  {
    id: 'docker',
    name: '3. Docker Build',
    command: 'docker build -t app:v1.4 .',
    logs: [
      'Sending build context to Docker daemon (2.4MB)...',
      'Step 1/6 : FROM node:20-alpine AS builder',
      'Step 2/6 : COPY package*.json ./ && RUN npm ci --omit=dev',
      'Step 3/6 : RUN npm run build (Turbopack standalone output)',
      'Step 4/6 : FROM gcr.io/distroless/nodejs20-debian12',
      'Successfully tagged app:v1.4 (Final image size: 52.8 MB).',
    ],
  },
  {
    id: 'deploy',
    name: '4. AWS EC2 Deploy',
    command: 'aws deploy --target ec2-prod',
    logs: [
      'Connecting to AWS EC2 via IAM Role (ap-south-1)...',
      'Pulling image app:v1.4 from Amazon ECR registry...',
      'Performing zero-downtime rolling restart on container...',
      'Reloading Nginx reverse proxy configuration (port 443)...',
      '✔ Deployment successful to EC2 host: i-0824b21fa79e.',
    ],
  },
  {
    id: 'smoke',
    name: '5. Health Probe',
    command: 'curl -I https://app/health',
    logs: [
      'HTTP/2 200 OK',
      'content-type: application/json',
      'x-pipeline-status: healthy (uptime: 99.99%)',
      'Pipeline execution complete. All 5 stages succeeded.',
    ],
  },
]

export default function PipelineSimulator() {
  const [activeStage, setActiveStage] = useState<number>(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [completedStages, setCompletedStages] = useState<number[]>([0, 1, 2, 3, 4])
  const [activeLogs, setActiveLogs] = useState<string[]>([
    'GitLab / GitHub Actions Runner initialized.',
    'Ready. Click "Trigger Pipeline" to simulate end-to-end cloud build & deploy.',
  ])

  const timersRef = useRef<NodeJS.Timeout[]>([])

  const clearPendingTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
  }, [])

  useEffect(() => {
    return () => {
      clearPendingTimers()
    }
  }, [clearPendingTimers])

  const triggerPipeline = () => {
    if (isRunning) return

    try {
      playKeyClick()
    } catch {}

    clearPendingTimers()
    setIsRunning(true)
    setCompletedStages([])
    setActiveStage(0)
    setActiveLogs([`[0.00s] Pipeline triggered by commit ${Math.random().toString(16).slice(2, 8)} (ref: master)`])

    STAGES.forEach((stage, idx) => {
      const timer = setTimeout(() => {
        setActiveStage(idx)
        setActiveLogs((prev) => [
          `[STAGE ${idx + 1}/5] Running: $ ${stage.command}`,
          ...stage.logs,
          '-------------------------------------------------------',
          ...prev.slice(0, 8),
        ])
        setCompletedStages((comp) => [...comp, idx])

        try {
          if (idx === STAGES.length - 1) {
            setIsRunning(false)
            setActiveStage(-1)
            playSuccessBeep()
          } else {
            playKeyClick()
          }
        } catch {}
      }, (idx + 1) * 900)

      timersRef.current.push(timer)
    })
  }

  return (
    <section id="devops-pipeline" className="py-20 font-mono text-[var(--foreground)] border-t border-[var(--card-border)] bg-[var(--background)]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--green)]">
              $ <span className="text-[var(--muted)]">gitlab-runner</span> exec docker-runner
            </p>
            <h2 className="mt-1 text-2xl font-bold"># Live DevOps CI/CD Pipeline</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Automated build, test, multi-stage Docker containerization, and AWS EC2 deployment workflow.
            </p>
          </div>

          <button
            type="button"
            onClick={triggerPipeline}
            disabled={isRunning}
            className="rounded border border-[var(--amber)] bg-[var(--amber)]/10 px-4 py-2.5 text-xs font-bold text-[var(--amber)] hover:bg-[var(--amber)] hover:text-[var(--background)] transition-all duration-200 hover:shadow-[0_0_18px_rgba(210,153,34,0.3)] disabled:opacity-50 cursor-pointer self-start sm:self-auto shrink-0"
          >
            {isRunning ? '$ deploying to AWS...' : '$ Trigger Pipeline ⚡'}
          </button>
        </div>

        {/* Pipeline Stage Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {STAGES.map((stage, idx) => {
            const isCurrent = activeStage === idx
            const isDone = completedStages.includes(idx)

            return (
              <div
                key={stage.id}
                className={`rounded border p-3 flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-[var(--amber)] bg-[var(--amber)]/10 text-[var(--amber)] shadow-[0_0_14px_rgba(210,153,34,0.2)]'
                    : isDone
                    ? 'border-[var(--green)]/40 bg-[var(--green)]/5 text-[var(--green)]'
                    : 'border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--muted)]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span>{stage.name}</span>
                  {isCurrent ? (
                    <span className="size-2 rounded-full bg-[var(--amber)] animate-ping" />
                  ) : isDone ? (
                    <span>✔</span>
                  ) : (
                    <span>○</span>
                  )}
                </div>
                <div className="mt-2 text-[10px] text-[var(--muted)] truncate">
                  {stage.command}
                </div>
              </div>
            )
          })}
        </div>

        {/* Live Build Console Log */}
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
          <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-2.5 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[var(--green)] animate-pulse" />
              <span className="text-[var(--muted)]">pipeline-output.log (AWS ap-south-1)</span>
            </div>
            <span className="text-[10px] text-[var(--muted)]">Runner: Docker+EC2</span>
          </div>

          <div className="h-48 overflow-y-auto font-mono text-xs leading-relaxed space-y-1.5 text-[var(--muted)] bg-[var(--background)]/50 p-3 rounded border border-[var(--card-border)]">
            {activeLogs.map((log, i) => (
              <div
                key={i}
                className={
                  log.includes('✔') || log.includes('200 OK') || log.includes('passed')
                    ? 'text-[var(--green)] font-semibold'
                    : log.includes('Running:')
                    ? 'text-[var(--amber)]'
                    : log.startsWith('Step')
                    ? 'text-[var(--foreground)]'
                    : 'text-[var(--muted)]'
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
