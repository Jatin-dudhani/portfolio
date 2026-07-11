import type { ReadingItem } from './types'

export const reading: ReadingItem[] = [
  {
    title: 'The Phoenix Project',
    author: 'Gene Kim',
    type: 'book',
    status: 'reading',
    reason: 'Understanding DevOps principles through a novel — IT operations, flow, and continuous improvement.',
    added: 'Jul 2026',
  },
  {
    title: 'Site Reliability Engineering',
    author: 'Google (Beyer, Jones, Petoff, Murphy)',
    type: 'book',
    status: 'planned',
    reason: 'Wanted to learn SRE best practices — SLIs, SLOs, error budgets, incident response.',
    added: 'Jul 2026',
  },
  {
    title: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
    author: 'AWS / A Cloud Guru',
    type: 'course',
    status: 'reading',
    reason: 'Preparing for AWS certification as part of DevOps track.',
    added: 'Jul 2026',
  },
  {
    title: 'Kubernetes in Action',
    author: 'Marko Luksa',
    type: 'book',
    status: 'planned',
    reason: 'Deep dive into K8s — pods, deployments, services, ingress controllers.',
    added: 'Jul 2026',
  },
]
