import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { ExperienceCard } from '@/components/ui/ExperienceCard'
import { excursions } from '@/lib/data'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Day Excursions from Marrakech',
  description:
    'Explore Morocco beyond the city — Ourika Valley, Essaouira, Ouzoud Waterfalls, Ouarzazate, Agafay Desert, Imlil & more. Private day trips from Marrakech.',
}

export default function ExcursionsPage() {
  const featured = excursions.filter((e) => e.featured)
  const rest = excursions.filter((e) => !e.featured)

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 mb-14">
        <div className="max-w-2xl">
          <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-3">
            Day Trips
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            Excursions from <span className="text-gradient-gold">Marrakech</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Venture beyond the medina. Our private day trips take you to Morocco&apos;s most
            spectacular landscapes — mountains, waterfalls, desert, and coast.
          </p>
        </div>
      </div>

      {featured.length > 0 && (
        <section className="container mx-auto px-4 mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded bg-[var(--brand-gold)] inline-block" />
            Most Popular
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((excursion) => (
              <ExperienceCard key={excursion.id} {...excursion} basePath="excursions" />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="container mx-auto px-4 mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded bg-[var(--brand-gold)] inline-block" />
            More Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((excursion) => (
              <ExperienceCard key={excursion.id} {...excursion} basePath="excursions" />
            ))}
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground mb-4">Want a custom itinerary or multi-day tour?</p>
        <Button asChild className="bg-gradient-to-r from-brand-gold-dark to-brand-gold text-white border-0">
          <Link href="/contact">Request Custom Tour <ArrowRight className="ml-2 w-4 h-4" /></Link>
        </Button>
      </div>
    </div>
  )
}

