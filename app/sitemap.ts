import type { MetadataRoute } from 'next'

const BASE = 'https://portfolio-jade-six-34.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE}/#about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/#projects`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/#blog`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]
}

