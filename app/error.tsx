'use client'

export default function Error({
  reset,
}: {
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-black">Something went wrong</h2>
      <p className="text-[var(--muted)]">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="rounded-lg bg-[#37ab8e] px-6 py-3 font-bold text-[#07110f] transition hover:bg-[#81dec8]"
      >
        Try again
      </button>
    </div>
  )
}
