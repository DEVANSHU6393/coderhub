import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin/*'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://coderhub-g0md.onrender.com'}/sitemap.xml`,
  }
}
