'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  reset: () => void
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] font-mono p-8">
      <div className="max-w-lg w-full rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--card-border)]">
          <span className="size-2.5 rounded-full bg-[var(--red)]" />
          <span className="size-2.5 rounded-full bg-[var(--amber)]" />
          <span className="size-2.5 rounded-full bg-[var(--green)]" />
          <span className="ml-2 text-xs text-[var(--muted)]">kernel-panic.sh</span>
        </div>

        <pre className="text-[var(--red)] font-bold text-xs sm:text-sm">
{`╔══════════════════════════════════╗
║      RUNTIME ERROR DETECTED      ║
╚══════════════════════════════════╝`}
        </pre>

        <p className="mt-4 text-xs sm:text-sm text-[var(--muted)]">
          [SIGABRT] An unhandled exception occurred in the client runtime.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded border border-[var(--green)] bg-[var(--green)]/10 px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--green)] transition-all duration-200 hover:bg-[var(--green)] hover:text-[var(--background)] hover:shadow-[0_0_16px_rgba(63,185,80,0.25)] cursor-pointer"
          >
            $ systemctl restart client
          </button>
          <Link
            href="/"
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            $ cd /
          </Link>
        </div>
      </div>
    </main>
  )
}
