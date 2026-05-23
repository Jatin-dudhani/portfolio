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
    description: 'Business simulation model showcasing system design principles. A TypeScript-based application that models business operations and workflows.',
    technologies: ['TypeScript', 'Node.js', 'System Design'],
    github: 'https://github.com/Jatin-dudhani/simbusiness',
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
]
