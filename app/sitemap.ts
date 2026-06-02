import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://qihongtextile.com'
  const locales = ['en', 'zh']
  const routes = ['', 'about', 'contact', 'process', 'products']

  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: route ? `${baseUrl}/${locale}/${route}` : `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    }
  }

  return sitemapEntries
}