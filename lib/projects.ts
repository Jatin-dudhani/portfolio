export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github: string
  deployed?: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 'netflix-gpt',
    title: 'Netflix GPT',
    description: 'A Netflix clone powered by GPT. Search for movies and get AI-powered recommendations. Built with React and integrated with TMDB API.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'TMDB API'],
    github: 'https://github.com/Jatin-dudhani/netflix-gpt',
  },
  {
    id: 'simbusiness',
    title: 'SimBusiness',
    description: 'A business simulation built in TypeScript that models operations and workflows, with a focus on system design.',
    technologies: ['TypeScript', 'Node.js', 'System Design'],
    github: 'https://github.com/Jatin-dudhani/simbusiness',
    deployed: 'https://simbusiness.vercel.app',
  },
  {
    id: 'bulk-email-sender',
    title: 'Bulk Email Sender',
    description: 'A JavaScript application for sending bulk emails efficiently. Features batching, scheduling, and error handling.',
    technologies: ['JavaScript', 'Node.js', 'Email API'],
    github: 'https://github.com/Jatin-dudhani/Bulk-Email-Sender',
  },
  {
    id: 'birthday-reminder',
    title: 'Birthday Reminder',
    description: 'A reminder application to never miss birthdays. Track and get notifications for important dates.',
    technologies: ['JavaScript', 'React', 'Local Storage'],
    github: 'https://github.com/Jatin-dudhani/birthday-reminder',
  },
  {
    id: 'ai-project-planner',
    title: 'AI Project Planner',
    description: 'Turn rough app ideas into structured, editable project briefs using AI. Features inline editing, data model visualization, and a ready-to-use prompt for AI coding tools.',
    technologies: ['TypeScript', 'Next.js', 'AI SDK', 'shadcn/ui'],
    github: 'https://github.com/Jatin-dudhani/ai-project-planner',
    deployed: 'https://ai-project-planner-blue.vercel.app',
  },
  {
    id: 'revolving-clock',
    title: 'Revolving Clock',
    description: 'A modern animated flip clock with 3D flip animations, 12h/24h toggle, MongoDB settings persistence, and a glowing neon UI. Fully responsive.',
    technologies: ['JavaScript', 'Next.js', 'Framer Motion', 'MongoDB'],
    github: 'https://github.com/Jatin-dudhani/revolving-clock',
    deployed: 'https://revolving-clock-drab.vercel.app',
  },
  {
    id: 'devops-learning',
    title: 'DevOps Learning Project',
    description: 'End-to-end CI/CD pipeline with GitLab CI/CD, Docker, AWS EC2, and Nginx. Automates build, test, containerization, and deployment workflows.',
    technologies: ['Docker', 'AWS', 'CI/CD', 'GitLab'],
    github: 'https://github.com/Jatin-dudhani/DevOps-learning-project',
  },
]
