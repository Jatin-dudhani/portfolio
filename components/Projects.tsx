import { projects } from '@/lib/projects'

export default function Projects() {
  return (
    <section id="projects" className="bg-[#111720] py-24 text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#f2a65a]">Selected Work</p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">Featured Projects</h2>
          </div>
          <p className="max-w-xl text-white/58">
            Practical builds across frontend, automation, and systems thinking.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group flex h-full flex-col rounded-lg border border-white/10 bg-[#0e1116] p-6 transition hover:-translate-y-1 hover:border-[#f2a65a]/50 hover:shadow-[0_22px_60px_rgba(0,0,0,0.28)]"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="grid size-12 place-items-center rounded-lg bg-[#37ab8e]/13 text-sm font-black text-[#81dec8]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span className="rounded-md border border-white/10 px-3 py-1 text-xs font-bold uppercase text-white/45">
                  Project
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">{project.title}</h3>
              <p className="mt-3 flex-1 leading-7 text-white/62">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-[#d7d0c7]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg bg-white px-4 py-3 text-center text-sm font-bold text-[#111418] transition hover:bg-[#f2a65a]"
                >
                  View GitHub
                </a>
                {project.deployed && (
                  <a
                    href={project.deployed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg border border-white/15 px-4 py-3 text-center text-sm font-bold text-white transition hover:border-[#37ab8e]/60 hover:bg-[#37ab8e]/12"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
