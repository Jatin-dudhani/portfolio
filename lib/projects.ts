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
  {
    id: 'genai-application',
    title: 'GenAI Application',
    description: 'A generative AI application exploring LLM-based content generation, prompt engineering, and AI-powered workflows.',
    technologies: ['JavaScript', 'AI', 'LLM', 'GenAI'],
    github: 'https://github.com/Jatin-dudhani/genai-application',
    preview: [
      '$ node run --prompt "generate summary"',
      '[GenAI] Loading model...',
      '[OK] Content generated in 2.3s',
      '[OK] Token usage: 342',
    ],
  },
  {
    id: 'jenkins-zero-to-hero',
    title: 'Jenkins Zero to Hero',
    description: 'Hands-on Jenkins setup covering pipelines, declarative syntax, multi-branch builds, Docker integration, and automated deployment workflows.',
    technologies: ['Jenkins', 'DevOps', 'CI/CD', 'Docker'],
    github: 'https://github.com/Jatin-dudhani/jenkins-zero-to-hero',
    preview: [
      '$ jenkins-cli build pipeline-hello-world',
      '[Jenkins] Pipeline started...',
      '  Checkout → Build → Test → Dockerize → Deploy',
      '[OK] Build #42 passed (12.4s)',
    ],
  },
  {
    id: 'ansible-apache-deploy',
    title: 'Ansible Apache Deploy',
    description: 'Automated Apache web server deployment using Ansible playbooks — configuration management, idempotent tasks, and infrastructure as code.',
    technologies: ['Ansible', 'DevOps', 'Automation', 'Infrastructure'],
    github: 'https://github.com/Jatin-dudhani/ansible-apache-deploy',
    preview: [
      '$ ansible-playbook -i inventory deploy-apache.yml',
      '[Ansible] Gathering facts...',
      '[OK] apache2: installed',
      '[OK] vhost: configured',
      '[OK] firewall: allowed 80/443',
    ],
  },
  {
    id: 'bulk-email-sender',
    title: 'Bulk Email Sender',
    description: 'A bulk email sending application with template support, recipient management, and delivery tracking.',
    technologies: ['JavaScript', 'Node.js', 'Email', 'SMTP'],
    github: 'https://github.com/Jatin-dudhani/bulk-email-sender',
    preview: [
      '$ node send.js --template welcome --list recipients.csv',
      '[Mailer] Parsing 150 recipients...',
      '[OK] 148 delivered, 2 bounced',
      '[OK] Duration: 6.2s',
    ],
  },
  {
    id: 'birthday-reminder',
    title: 'Birthday Reminder',
    description: 'A birthday reminder app that tracks contacts and sends automated notifications for upcoming birthdays.',
    technologies: ['JavaScript', 'React', 'Node.js'],
    github: 'https://github.com/Jatin-dudhani/birthday-reminder',
    preview: [
      '$ npm start',
      '[App] Loading contact list...',
      '[OK] Upcoming birthdays: 3 this week',
      '[OK] Notifications queued',
    ],
  },
  {
    id: 'revolving-clock',
    title: 'Revolving Clock',
    description: 'An animated revolving clock built with JavaScript, featuring real-time rotation of clock hands and smooth CSS transitions.',
    technologies: ['JavaScript', 'CSS', 'Animation'],
    github: 'https://github.com/Jatin-dudhani/revolving-clock',
    preview: [
      '$ open index.html',
      '[Clock] Rendering analog face...',
      '[OK] Tick-tock — real-time hand rotation',
      '[OK] Smooth transitions enabled',
    ],
  },
  {
    id: 'act-gen',
    title: 'Activity Generator',
    description: 'A random activity generator that suggests things to do when you are bored — powered by the Bored API.',
    technologies: ['JavaScript', 'API Integration', 'HTML', 'CSS'],
    github: 'https://github.com/Jatin-dudhani/act-gen',
    preview: [
      '$ node activity.js --type recreational',
      '[API] Fetching suggestion...',
      '[OK] "Go for a walk in the park"',
      '[Tip] Try --type=educational | social | diy',
    ],
  },
]
