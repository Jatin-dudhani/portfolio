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
    id: 'packet-analyser',
    title: 'DPI Engine',
    description: 'A multi-threaded Deep Packet Inspection engine in C++ that parses PCAP files, extracts SNI/TLS/HTTP/QUIC data, classifies 25+ applications, and enforces blocking rules — all with no external dependencies.',
    technologies: ['C++', 'Networking', 'TCP/IP', 'Multi-threading', 'PCAP'],
    github: 'https://github.com/Jatin-dudhani/packet-analyser',
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
    id: 'rag-document-qa',
    title: 'RAG Document QA',
    description: 'A Retrieval-Augmented Generation system for answering questions against custom documents. Uses embeddings, vector search, and LLMs to provide contextual answers from uploaded data.',
    technologies: ['Python', 'RAG', 'LLMs', 'Vector Search', 'Embeddings'],
    github: 'https://github.com/Jatin-dudhani/rag-document-qa',
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
    id: 'netflix-gpt',
    title: 'Netflix GPT',
    description: 'A Netflix clone powered by GPT. Search for movies and get AI-powered recommendations. Built with React and integrated with TMDB API.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'TMDB API'],
    github: 'https://github.com/Jatin-dudhani/netflix-gpt',
  },
  {
    id: 'devops-learning',
    title: 'DevOps Learning Project',
    description: 'End-to-end CI/CD pipeline with GitLab CI/CD, Docker, AWS EC2, and Nginx. Automates build, test, containerization, and deployment workflows.',
    technologies: ['Docker', 'AWS', 'CI/CD', 'GitLab'],
    github: 'https://github.com/Jatin-dudhani/DevOps-learning-project',
  },
]
