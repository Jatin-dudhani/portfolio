export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'Next.js'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'JavaScript', 'REST APIs', 'System Design'],
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git', 'AWS', 'GitHub', 'npm', 'VS Code'],
    },
    {
      category: 'Specialties',
      skills: ['System Design', 'Scalability', 'Full-Stack Development', 'Clean Code'],
    },
  ]

  return (
    <section id="skills" className="py-24 text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#81dec8]">Stack</p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">Skills & Technologies</h2>
          </div>
          <p className="max-w-xl text-white/58">
            A compact toolkit for shipping modern interfaces, APIs, and scalable application foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              className="rounded-lg border border-white/10 bg-white/[0.055] p-6 transition hover:-translate-y-1 hover:border-[#37ab8e]/45 hover:bg-white/[0.075]"
            >
              <h3 className="text-2xl font-black text-white">{category.category}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/10 bg-[#0e1116]/45 px-3 py-2 text-sm font-semibold text-[#d7d0c7]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
