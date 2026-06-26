import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { ExperienceCard } from '@/components/ui/ExperienceCard'
import { activities } from '@/lib/data'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Activities in Marrakech',
  description:
    'Book camel rides, quad biking, hot air balloon flights, hammam & spa, cooking classes, paragliding and more in Marrakech with Be Flex Travel.',
}

export default function ActivitiesPage() {
  const featured = activities.filter((a) => a.featured)
  const rest = activities.filter((a) => !a.featured)

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="container mx-auto px-4 mb-14">
        <div className="max-w-2xl">
          <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-3">
            Things to Do
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Activities in <span className="text-gradient-gold">Marrakech</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From high-altitude paragliding to serene hammam rituals — find your perfect
            Marrakech experience with our local expert guides.
          </p>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="container mx-auto px-4 mb-14">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded bg-[var(--brand-gold)] inline-block" />
            Top Picks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((activity) => (
              <ExperienceCard key={activity.id} {...activity} basePath="activities" />
            ))}
          </div>
        </section>
      )}

      {/* All Activities */}
      {rest.length > 0 && (
        <section className="container mx-auto px-4 mb-14">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded bg-[var(--brand-gold)] inline-block" />
            More Experiences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((activity) => (
              <ExperienceCard key={activity.id} {...activity} basePath="activities" />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground mb-4">Can&apos;t find what you&apos;re looking for?</p>
        <Button asChild className="bg-gradient-to-r from-[#8A6F28] to-[#C9A84C] text-white border-0">
          <Link href="/contact">Ask Us Anything <ArrowRight className="ml-2 w-4 h-4" /></Link>
        </Button>
      </div>
    </div>
  )
}

