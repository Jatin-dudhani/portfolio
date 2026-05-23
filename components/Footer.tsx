export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#0b0e13] py-8 text-white/45">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between gap-3 text-sm sm:flex-row sm:items-center">
        <p>Copyright {currentYear} Jatin Dudhani. All rights reserved.</p>
        <p>Built with React, Next.js, TypeScript, and Tailwind CSS</p>
      </div>
    </footer>
  )
}
