import type { MetadataRoute } from 'next'
import { activities, excursions, circuits } from '@/lib/data'

const BASE_URL = 'https://beflextravel.com'
const LOCALES = ['en', 'fr', 'es', 'it', 'de', 'zgh']

function localeUrls(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly'): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages = [
    ...localeUrls('', 1.0, 'weekly'),            // Home
    ...localeUrls('/activities', 0.9, 'weekly'),
    ...localeUrls('/excursions', 0.9, 'weekly'),
    ...localeUrls('/tours', 0.9, 'weekly'),
    ...localeUrls('/transport', 0.8),
    ...localeUrls('/blog', 0.8, 'weekly'),
    ...localeUrls('/reviews', 0.7),
    ...localeUrls('/contact', 0.8),
  ]

  // Dynamic activity pages
  const activityPages = activities.flatMap((activity) =>
    localeUrls(`/activities/${activity.slug}`, 0.7)
  )

  // Dynamic excursion pages
  const excursionPages = excursions.flatMap((excursion) =>
    localeUrls(`/excursions/${excursion.slug}`, 0.7)
  )

  // Dynamic tour/circuit pages
  const tourPages = circuits.flatMap((circuit) =>
    localeUrls(`/tours/${circuit.slug}`, 0.7)
  )

  return [...staticPages, ...activityPages, ...excursionPages, ...tourPages]
}
