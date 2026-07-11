export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github: string
  deployed?: string
  image?: string
  preview?: string[]
}

export const projects: Project[] = [
  {
    id: 'packet-analyser',
    title: 'DPI Engine',
    description: 'A multi-threaded Deep Packet Inspection engine in C++ that parses PCAP files, extracts SNI/TLS/HTTP/QUIC data, classifies 25+ applications, and enforces blocking rules — all with no external dependencies.',
    technologies: ['C++', 'Networking', 'TCP/IP', 'Multi-threading', 'PCAP'],
    github: 'https://github.com/Jatin-dudhani/packet-analyser',
    preview: [
      '$ ./dpi_mt capture.pcap output.pcap --block-app YouTube',
      '[DPI] Processing 146 packets...',
      '[OK]  YouTube: 12 packets (BLOCKED)',
      '[OK]  TikTok:  8 packets  (BLOCKED)',
      '[OK]  Forwarded: 136 | Dropped: 10',
    ],
  },
  {
    id: 'ai-project-planner',
    title: 'AI Project Planner',
    description: 'Turn rough app ideas into structured, editable project briefs using AI. Features inline editing, data model visualization, and a ready-to-use prompt for AI coding tools.',
    technologies: ['TypeScript', 'Next.js', 'AI SDK', 'shadcn/ui'],
    github: 'https://github.com/Jatin-dudhani/ai-project-planner',
    deployed: 'https://ai-project-planner-blue.vercel.app',
    preview: [
      '$ npm run dev',
      '> Ask AI to plan your project...',
      '> Idea: "A habit tracker with streaks"',
      '[OK] Generated: 8 sections, 12 features',
      '[OK] Data model: 4 entities, 3 relations',
    ],
  },
  {
    id: 'rag-document-qa',
    title: 'RAG Document QA',
    description: 'A Retrieval-Augmented Generation system for answering questions against custom documents. Uses embeddings, vector search, and LLMs to provide contextual answers from uploaded data.',
    technologies: ['Python', 'RAG', 'LLMs', 'Vector Search', 'Embeddings'],
    github: 'https://github.com/Jatin-dudhani/rag-document-qa',
    preview: [
      '$ python query.py --doc contracts.pdf',
      '> "What is the termination clause?"',
      '[Retrieval] Top 3 chunks (score: 0.92)',
      '[Generation] Context + LLM inference',
      '[Answer] "Either party may terminate..."',
    ],
  },
  {
    id: 'simbusiness',
    title: 'SimBusiness',
    description: 'A business simulation built in TypeScript that models operations and workflows, with a focus on system design.',
    technologies: ['TypeScript', 'Node.js', 'System Design'],
    github: 'https://github.com/Jatin-dudhani/simbusiness',
    deployed: 'https://simbusiness.vercel.app',
    preview: [
      '$ curl -X POST /api/company -d \'{"name":"Acme"}\'',
      '{ "id": "c_001", "balance": 10000,',
      '  "employees": 0, "revenue": 0 }',
      '> Company created. Start trading.',
    ],
  },
  {
    id: 'netflix-gpt',
    title: 'Netflix GPT',
    description: 'A Netflix clone powered by GPT. Search for movies and get AI-powered recommendations. Built with React and integrated with TMDB API.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'TMDB API'],
    github: 'https://github.com/Jatin-dudhani/netflix-gpt',
    preview: [
      '$ search --ai "feel-good sci-fi movies"',
      '[GPT] Analyzing preferences...',
      '[TMDB] Found 12 matches',
      '1. The Martian    ★ 8.0',
      '2. Interstellar   ★ 8.7',
    ],
  },
  {
    id: 'devops-learning',
    title: 'DevOps Learning Project',
    description: 'End-to-end CI/CD pipeline with GitLab CI/CD, Docker, AWS EC2, and Nginx. Automates build, test, containerization, and deployment workflows.',
    technologies: ['Docker', 'AWS', 'CI/CD', 'GitLab'],
    github: 'https://github.com/Jatin-dudhani/DevOps-learning-project',
    preview: [
      '$ git push origin main',
      '[GitLab] Pipeline triggered...',
      '  build  → test  → docker  → deploy',
      '[AWS] Deployed to EC2 (nginx)',
      '[OK] https://devops.jatin.dev',
    ],
  },
]
