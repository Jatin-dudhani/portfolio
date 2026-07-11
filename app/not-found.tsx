import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] font-mono p-8">
      <div className="max-w-lg">
        <pre className="text-[var(--green)] text-sm leading-relaxed">
{`╔══════════════════════════════════╗
║        404 — NOT FOUND           ║
╚══════════════════════════════════╝

$ <span className="text-[var(--muted)]">curl</span> -I https://jatin.dev/<span className="text-[var(--red)]">this-page</span>
<span className="text-[var(--red)]">HTTP/2 404 Not Found</span>

$ <span className="text-[var(--muted)]">cat</span> /var/log/nginx/error.log | tail -3
<span className="text-[var(--muted)]">[error] file not found:</span>
<span className="text-[var(--muted)]">  '/home/jatin/public_html/this-page'</span>
<span className="text-[var(--muted)]">  does not exist</span>

$ <span className="text-[var(--muted)]">ls</span> -la ./available-pages/
<span className="text-[var(--green)]">drwxr-xr-x</span>  <span className="text-[var(--foreground)]">./</span>
<span className="text-[var(--green)]">drwxr-xr-x</span>  <span className="text-[var(--foreground)]">../</span>
<span className="text-[var(--green)]">-rw-r--r--</span>  <span className="text-[var(--foreground)]">about/</span>
<span className="text-[var(--green)]">-rw-r--r--</span>  <span className="text-[var(--foreground)]">skills/</span>
<span className="text-[var(--green)]">-rw-r--r--</span>  <span className="text-[var(--foreground)]">projects/</span>
<span className="text-[var(--green)]">-rw-r--r--</span>  <span className="text-[var(--foreground)]">contact/</span>`}
        </pre>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded border border-[var(--green)] bg-[var(--green)]/10 px-5 py-2.5 text-sm font-semibold text-[var(--green)] transition-all duration-200 hover:bg-[var(--green)] hover:text-[var(--background)]"
        >
          $ cd /home &amp;&amp; ls
        </Link>
      </div>
    </main>
  )
}
