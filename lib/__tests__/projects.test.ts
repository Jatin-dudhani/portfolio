import { describe, it, expect } from 'vitest'
import { projects } from '@/lib/projects'

describe('projects data', () => {
  it('should have at least 7 projects', () => {
    expect(projects.length).toBeGreaterThanOrEqual(7)
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

  it('new projects should have deployed URLs', () => {
    const newProjects = projects.filter(p =>
      ['ai-project-planner', 'revolving-clock'].includes(p.id)
    )
    for (const project of newProjects) {
      expect(project.deployed).toBeTruthy()
    }
  })
})
