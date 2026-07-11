import { NextResponse } from 'next/server'
import { projects } from '@/lib/projects'

export async function GET() {
  const profile = {
    name: 'Jatin Dudhani',
    title: 'Full-Stack Developer',
    education: {
      degree: 'B.Tech in Computer Science and Engineering',
      school: 'LNMIIT, Jaipur',
      graduation: 'May 2026',
      cgpa: '6.5 / 10',
    },
    contact: {
      email: 'jatindudhani07@gmail.com',
      phone: '+91-8875843487',
      github: 'https://github.com/Jatin-dudhani',
      linkedin: 'https://www.linkedin.com/in/jatin-dudhani-057664254/',
      portfolio: 'https://portfolio-jade-six-34.vercel.app',
    },
    skills: {
      languages: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'C++', 'Python'],
      frontend: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui', 'Vite'],
      backend: ['Node.js', 'Express.js', 'REST API Design', 'JWT Auth', 'MongoDB', 'MVC Architecture'],
      ai: ['AI SDK', 'OpenAI API', 'OpenRouter', 'LLM Integration', 'RAG', 'Vector Search', 'Zod', 'React Flow'],
      devops: ['Git', 'GitHub', 'Docker', 'Kubernetes', 'Firebase', 'Vercel', 'Render', 'CI/CD'],
      systems: ['C++', 'Multi-threading', 'TCP/IP', 'TLS/SSL', 'PCAP', 'DPI'],
    },
    experience: [
      { role: 'Teaching Assistant — Internet of Things', org: 'The LNMIIT', period: 'Jan 2025 – Apr 2025' },
      { role: 'Accommodation & Public Relations Head', org: 'PLINTH Tech Fest', period: '2025 – 2026' },
      { role: 'Member — Aaveg Dramatic Club', org: 'The LNMIIT', period: '2024 – Present' },
    ],
    certificates: [
      { title: 'Cloud Computing', org: 'NPTEL', score: '74.65%', period: 'Jan – Apr 2026' },
      { title: 'Privacy and Security in Online Social Media', org: 'NPTEL', score: '75.58%', period: 'Jul – Oct 2025' },
    ],
    projects: projects.map(({ id, title, description, technologies, github, deployed, preview }) => ({
      id, title, description, technologies, github, deployed, preview,
    })),
  }

  return NextResponse.json(profile, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  })
}
