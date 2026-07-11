import type { MetadataRoute } from 'next'

const BASE = 'https://portfolio-jade-six-34.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}

