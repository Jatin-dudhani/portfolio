import { describe, it, expect } from 'vitest'
import { projects } from '@/lib/projects'

describe('projects data', () => {
  it('should have at least 6 projects', () => {
    expect(projects.length).toBeGreaterThanOrEqual(6)
  })

  it('each project should have required fields', () => {
    for (const project of projects) {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.technologies.length).toBeGreaterThan(0)
      expect(project.github).toMatch(/^https:\/\/github\.com/)
    }
  })

  it('featured projects should have deployed URLs', () => {
    const featured = projects.filter(p =>
      ['ai-project-planner', 'simbusiness'].includes(p.id)
    )
    for (const project of featured) {
      expect(project.deployed).toBeTruthy()
    }
  })
})
