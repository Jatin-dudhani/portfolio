import type { Post } from './types'

export const posts: Post[] = [
  {
    title: 'Building a DPI Engine in C++17',
    desc: 'How I built a multi-threaded Deep Packet Inspection engine from scratch — parsing PCAP files, extracting SNI from TLS handshakes, classifying 25+ apps, and blocking traffic. Zero external dependencies.',
    tags: ['C++', 'Networking', 'Multi-threading'],
    slug: 'dpi-engine-cpp',
    date: 'Jul 2026',
    lines: [
      'When you visit https://youtube.com, your browser sends a',
      'TLS Client Hello with the domain in plaintext. Extract that,',
      'and you can classify traffic without decrypting anything.',
      '',
      '  TLS Client Hello → SNI: "www.youtube.com" → App: YOUTUBE',
      '',
      'I built a pipeline: PCAP → parse → classify → block/report.',
      '25+ apps, 4 thread types, 0 dependencies.',
    ],
  },
  {
    title: 'RAG Pipelines with Vector Search',
    desc: 'Building a document QA system using Retrieval-Augmented Generation — chunking PDFs, generating embeddings, vector search, and LLM-powered answers.',
    tags: ['Python', 'RAG', 'LLMs', 'Vector Search'],
    slug: 'rag-document-qa',
    date: 'Jul 2026',
    lines: [
      'The idea: upload a PDF, ask questions in plain English,',
      'get answers grounded in the document. No fine-tuning needed.',
      '',
      '  PDF → Chunks → Embeddings → Vector DB',
      '  Query → Embed → Top-K Retrieve → LLM → Answer',
      '',
      'Key insight: chunk size + overlap + reranking matter more',
      'than the embedding model for domain-specific docs.',
    ],
  },
]
