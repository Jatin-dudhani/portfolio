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

export interface Post {
  title: string
  desc: string
  tags: string[]
  slug: string
  date: string
  lines: string[]
}

export interface ReadingItem {
  title: string
  author?: string
  url?: string
  type: 'book' | 'article' | 'paper' | 'course'
  status: 'reading' | 'finished' | 'planned'
  reason?: string
  added: string
}
