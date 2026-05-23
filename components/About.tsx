export default function About() {
  const highlights = [
    'Full-stack web development with modern frameworks',
    'System design and scalable architecture',
    'Cloud services and deployment with AWS',
    'Version control and collaborative development',
  ]

  return (
    <section id="about" className="border-y border-white/10 bg-[#f4efe7] py-24 text-[#151515]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-bold uppercase text-[#1f8f76]">About</p>
          <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            I like building products where engineering depth meets everyday usability.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6 text-lg leading-8 text-black/68">
            <p>
              I am a 4th-year Computer Science student at LNMIIT Jaipur, passionate about web development and system design. I love building products that are functional, reliable, and genuinely pleasant to use.
            </p>
            <p>
              With experience across JavaScript, React, TypeScript, and Node.js, I create full-stack applications that solve real problems with maintainable code and clear architecture.
            </p>
            <p>
              I am currently exploring AWS and distributed systems, with an eye toward products that scale cleanly without losing their human feel.
            </p>
          </div>

          <div className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_20px_55px_rgba(14,17,22,0.08)]">
            <h3 className="text-2xl font-black">Key Highlights</h3>
            <ul className="mt-6 space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-black/70">
                  <span className="mt-2 size-2 rounded-full bg-[#f2a65a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
