import { NextResponse } from 'next/server'

export const revalidate = 60

const GITHUB_USER = 'Jatin-dudhani'

export async function GET() {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-realtime-sync',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const [eventsRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=25`, {
        headers,
        next: { revalidate: 60 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30&type=owner`, {
        headers,
        next: { revalidate: 60 },
      }),
    ])

    type RawEvent = {
      id: string
      type: string
      repo?: { name: string }
      payload?: {
        ref?: string
        ref_type?: string
        size?: number
        action?: string
        number?: number
        pull_request?: { merged?: boolean; title?: string }
        release?: { tag_name?: string }
        issue?: { number?: number; title?: string }
      }
      created_at: string
    }

    let activity: {
      id: string
      type: string
      repo: string
      message: string
      date: string
      url: string
    }[] = []

    if (eventsRes.ok) {
      const rawEvents: RawEvent[] = await eventsRes.json()
      if (Array.isArray(rawEvents)) {
        activity = rawEvents
          .map((e) => {
            let message = ''
            if (e.type === 'PushEvent') {
              const branch = (e.payload?.ref || '').replace('refs/heads/', '')
              const count = e.payload?.size || 1
              message = `Pushed ${count} commit${count > 1 ? 's' : ''} to ${branch || 'main'}`
            } else if (e.type === 'PullRequestEvent') {
              const action = e.payload?.action || 'updated'
              const merged = e.payload?.pull_request?.merged
              const title = e.payload?.pull_request?.title ? ` — ${e.payload.pull_request.title}` : ''
              message = `${action === 'closed' && merged ? 'Merged' : action} PR #${e.payload?.number || ''}${title}`
            } else if (e.type === 'CreateEvent') {
              const refType = e.payload?.ref_type || 'repository'
              const ref = e.payload?.ref ? ` "${e.payload.ref}"` : ''
              message = `Created ${refType}${ref}`
            } else if (e.type === 'ReleaseEvent') {
              message = `Published release ${e.payload?.release?.tag_name || ''}`
            } else if (e.type === 'WatchEvent') {
              message = `Starred repository`
            } else if (e.type === 'ForkEvent') {
              message = `Forked repository`
            } else if (e.type === 'IssuesEvent') {
              message = `${e.payload?.action || 'updated'} issue #${e.payload?.issue?.number || ''}`
            } else {
              message = `${e.type.replace('Event', '')} on ${e.repo?.name || ''}`
            }

            return {
              id: String(e.id),
              type: e.type,
              repo: e.repo?.name || '',
              message,
              date: e.created_at,
              url: `https://github.com/${e.repo?.name || GITHUB_USER}`,
            }
          })
          .filter((e) => e.repo)
          .slice(0, 8)
      }
    }

    type RawRepo = {
      id: number
      name: string
      full_name: string
      description: string | null
      language: string | null
      stargazers_count: number
      forks_count: number
      html_url: string
      updated_at: string
      topics?: string[]
      fork: boolean
    }

    let repos: {
      id: number
      name: string
      fullName: string
      description: string
      language: string
      stars: number
      forks: number
      url: string
      updatedAt: string
      topics: string[]
    }[] = []

    if (reposRes.ok) {
      const rawRepos: RawRepo[] = await reposRes.json()
      if (Array.isArray(rawRepos)) {
        repos = rawRepos
          .filter((r) => !r.fork && r.name !== 'portfolio')
          .map((r) => ({
            id: r.id,
            name: r.name,
            fullName: r.full_name,
            description: r.description || 'Public GitHub project',
            language: r.language || 'Code',
            stars: r.stargazers_count,
            forks: r.forks_count,
            url: r.html_url,
            updatedAt: r.updated_at,
            topics: r.topics || [],
          }))
      }
    }

    return NextResponse.json(
      { activity, repos },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (err) {
    return NextResponse.json(
      { activity: [], repos: [], error: String(err) },
      { status: 500 }
    )
  }
}
