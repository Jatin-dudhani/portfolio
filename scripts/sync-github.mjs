#!/usr/bin/env node

/**
 * sync-github.mjs
 *
 * Fetches your public GitHub repos and generates draft blog + reading entries.
 * Usage:
 *   node scripts/sync-github.mjs              # dry-run, print to console
 *   node scripts/sync-github.mjs --apply       # update lib/posts.ts and lib/reading.ts
 *
 * Reads GITHUB_TOKEN from env or works unauthenticated (lower rate limit).
 */

const GITHUB_USER = 'Jatin-dudhani'

const headers = {}
const token = process.env.GITHUB_TOKEN
if (token) headers.Authorization = `Bearer ${token}`

const apply = process.argv.includes('--apply')

async function fetchJSON(url) {
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`)
  return res.json()
}

function repoToPost(repo) {
  const tech = (repo.topics || []).map((t) => t.charAt(0).toUpperCase() + t.slice(1))
  if (repo.language && !tech.includes(repo.language)) tech.push(repo.language)

  const desc = (repo.description || 'No description provided.').replace(/['"]/g, '')

  return {
    title: `${repo.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`,
    desc,
    tags: tech.length ? tech : ['Misc'],
    slug: repo.name,
    date: new Date(repo.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    lines: [
      `Repository: ${repo.html_url}`,
      repo.description ? `Description: ${repo.description}` : '',
      `Language: ${repo.language || 'N/A'}`,
      `Stars: ${repo.stargazers_count} · Forks: ${repo.forks_count}`,
      '',
      '<!-- TODO: replace with actual write-up -->',
    ],
  }
}

async function main() {
  console.log(`\nFetching repos for ${GITHUB_USER}...\n`)

  const repos = await fetchJSON(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30&type=owner`
  )

  const nonForkRepos = repos.filter((r) => !r.fork && r.name !== 'portfolio')
  console.log(`Found ${nonForkRepos.length} non-fork repos (excluding portfolio).\n`)

  const draftPosts = nonForkRepos.map(repoToPost)

  if (!apply) {
    console.log('=== DRY RUN === (use --apply to write files)\n')
    for (const p of draftPosts) {
      console.log(`  • ${p.title}  (${p.date}) — ${p.tags.join(', ')}`)
      console.log(`    ${p.desc}\n`)
    }
    console.log(`\nDone. ${draftPosts.length} draft entries generated. Rerun with --apply to write.`)
    return
  }

  const fs = await import('fs/promises')
  const path = await import('path')

  const postsPath = path.resolve(process.cwd(), 'lib/posts.ts')
  const raw = await fs.readFile(postsPath, 'utf-8')

  const existingMatch = raw.match(/export const posts: Post\[\] = (\[[\s\S]*?\n\])/)
  if (!existingMatch) {
    console.error('Could not find posts array in lib/posts.ts')
    process.exit(1)
  }

  const existingPosts = eval(`(${existingMatch[1]})`)
  const existingSlugs = new Set(existingPosts.map((p) => p.slug))

  const newPosts = draftPosts.filter((p) => !existingSlugs.has(p.slug))

  if (newPosts.length === 0) {
    console.log('No new repos to add. Posts already up to date.')
    return
  }

  const updated = [...newPosts, ...existingPosts]

  const output = raw.replace(
    /export const posts: Post\[\] = \[[\s\S]*?\n\]/,
    `export const posts: Post[] = ${JSON.stringify(updated, null, 2)}`
  )

  await fs.writeFile(postsPath, output, 'utf-8')
  console.log(`✅ Added ${newPosts.length} new post(s) to lib/posts.ts`)
}

main().catch(console.error)
