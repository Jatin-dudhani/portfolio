export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 text-[#f4efe7]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid min-h-[calc(100vh-6rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-lg border border-[#37ab8e]/35 bg-[#37ab8e]/10 px-4 py-2 text-sm font-medium text-[#9fe8d5]">
            <span className="size-2 rounded-full bg-[#37ab8e] shadow-[0_0_16px_rgba(55,171,142,0.9)]" />
            Full-stack developer building usable systems
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Jatin Dudhani
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-[#d7d0c7] sm:text-2xl">
            Computer Science student focused on full-stack web apps, system design, and clean product experiences.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">
            I build scalable interfaces with React, TypeScript, Node.js, and cloud-minded architecture, then polish the details so the result feels fast, clear, and dependable.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="rounded-lg bg-[#f2a65a] px-6 py-3 text-center text-sm font-bold text-[#111418] shadow-[0_18px_40px_rgba(242,166,90,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffbd79]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-white/15 bg-white/[0.06] px-6 py-3 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-[#37ab8e]/60 hover:bg-[#37ab8e]/12"
            >
              Get In Touch
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-3">
            {[
              ['4th', 'Year CS'],
              ['10+', 'Core Skills'],
              ['4', 'Projects'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <dt className="text-2xl font-black text-white">{value}</dt>
                <dd className="mt-1 text-xs font-medium uppercase text-white/45">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="rounded-lg border border-white/12 bg-[#111720]/82 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <span className="size-3 rounded-full bg-[#f26b5a]" />
                <span className="size-3 rounded-full bg-[#f2c45a]" />
                <span className="size-3 rounded-full bg-[#37ab8e]" />
              </div>
              <span className="font-mono text-xs text-white/40">portfolio.tsx</span>
            </div>

            <div className="space-y-4 pt-5 font-mono text-sm leading-7">
              <p><span className="text-[#81dec8]">const</span> developer = <span className="text-[#f2a65a]">{`'Jatin'`}</span></p>
              <p><span className="text-white/45">skills</span>: {`['React', 'Next.js', 'TypeScript']`}</p>
              <p><span className="text-white/45">focus</span>: {`'Scalable product engineering'`}</p>
              <p><span className="text-[#81dec8]">ship</span>(cleanCode, thoughtfulUX)</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {['React', 'TypeScript', 'Node.js', 'AWS'].map((item) => (
                <span key={item} className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/72">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
