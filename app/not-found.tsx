import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] font-mono p-8">
      <div className="max-w-xl w-full rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--card-border)]">
          <span className="size-2.5 rounded-full bg-[var(--red)]" />
          <span className="size-2.5 rounded-full bg-[var(--amber)]" />
          <span className="size-2.5 rounded-full bg-[var(--green)]" />
          <span className="ml-2 text-xs text-[var(--muted)]">404-not-found.sh</span>
        </div>

        <div className="text-xs sm:text-sm font-mono leading-relaxed space-y-3">
          <pre className="text-[var(--red)] font-bold">
{`╔══════════════════════════════════╗
║        404 — NOT FOUND           ║
╚══════════════════════════════════╝`}
          </pre>

          <p>
            <span className="text-[var(--green)]">$ </span>
            <span className="text-[var(--muted)]">curl</span> -I https://portfolio-jade-six-34.vercel.app/
            <span className="text-[var(--red)]">unknown-path</span>
          </p>
          <p className="text-[var(--red)] font-semibold">HTTP/2 404 Not Found</p>

          <p className="pt-2 text-[var(--muted)]">
            # cat /var/log/nginx/error.log | tail -2<br />
            [error] entrypoint not resolved in /home/jatin/portfolio
          </p>

          <div className="pt-2">
            <p className="text-[var(--green)]">$ ls -la ./available-sections/</p>
            <div className="grid grid-cols-2 gap-1 text-[var(--muted)] mt-1.5 pl-2 text-xs">
              <div><span className="text-[var(--green)]">drwxr-xr-x</span> ~/about</div>
              <div><span className="text-[var(--green)]">drwxr-xr-x</span> ~/skills</div>
              <div><span className="text-[var(--green)]">drwxr-xr-x</span> ~/projects</div>
              <div><span className="text-[var(--green)]">drwxr-xr-x</span> ~/blog</div>
              <div><span className="text-[var(--green)]">drwxr-xr-x</span> ~/activity</div>
              <div><span className="text-[var(--green)]">drwxr-xr-x</span> ~/contact</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[var(--card-border)] flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded border border-[var(--green)] bg-[var(--green)]/10 px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--green)] transition-all duration-200 hover:bg-[var(--green)] hover:text-[var(--background)] hover:shadow-[0_0_16px_rgba(63,185,80,0.25)]"
          >
            $ cd /home &amp;&amp; ls
          </Link>
          <span className="text-xs text-[var(--muted)] animate-pulse"># return to terminal root</span>
        </div>
      </div>
    </main>
  )
}
