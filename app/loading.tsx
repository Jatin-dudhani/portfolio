export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] font-mono gap-3">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-[var(--green)] animate-ping" />
        <span className="text-sm text-[var(--green)]">$ booting terminal session...</span>
      </div>
      <p className="text-xs text-[var(--muted)]">[sys] initializing modules</p>
    </div>
  )
}
