import type { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { ArrowRight, Car, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { transportRoutes } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Private Transport & Transfers',
  description:
    'Private airport transfers, city-to-city transfers, and custom point-to-point transport from Marrakech. Airport ↔ Marrakech, Casablanca, Essaouira, Agadir.',
}

const typeLabels: Record<string, string> = {
  airport_transfer: '✈️ Airport Transfer',
  one_way: '→ One Way',
  round_trip: '⇄ Round Trip',
  point_to_point: '📍 City Transfer',
}

export default function TransportPage() {
  const airportRoutes = transportRoutes.filter((r) => r.type === 'airport_transfer')
  const cityRoutes = transportRoutes.filter((r) => r.type !== 'airport_transfer')

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-3">
            Private Transport
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            Transfers & <span className="text-gradient-gold">Transport</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Comfortable, private, and punctual. All vehicles are air-conditioned, driven by licensed professionals.
            We monitor your flight — delays won&apos;t leave you stranded.
          </p>
        </div>

        {/* Why private transfer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { emoji: '🚗', label: 'Private vehicle — just your group' },
            { emoji: '✈️', label: 'Flight monitoring included' },
            { emoji: '💧', label: 'Water & Wi-Fi on board' },
            { emoji: '📍', label: 'Door-to-door service' },
          ].map(({ emoji, label }) => (
            <div key={label} className="p-4 rounded-xl glass border border-border text-center">
              <div className="text-2xl mb-2">{emoji}</div>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Airport Transfers */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded bg-[var(--brand-gold)] inline-block" />
            Airport Transfers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {airportRoutes.map((route) => (
              <div key={route.id} className="p-5 rounded-2xl glass border border-white/5 hover:border-[var(--brand-gold)]/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                    {typeLabels[route.type]}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-foreground font-medium text-sm truncate">{route.origin}</div>
                  </div>
                  <div className="shrink-0">
                    <ArrowRight className="w-4 h-4 text-[var(--brand-gold)]" />
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <div className="text-foreground font-medium text-sm truncate">{route.destination}</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground mb-5">
                  <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> {route.duration}</div>
                  <div className="flex items-start gap-2"><Car className="w-3 h-3 shrink-0 mt-0.5" /> {route.notes}</div>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-brand-gold-dark to-brand-gold text-white border-0 hover:opacity-90 text-sm" size="sm">
                  <Link href={`/contact?activity=Transfer: ${encodeURIComponent(route.origin + ' → ' + route.destination)}`}>
                    Book Transfer
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* City-to-City */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded bg-[var(--brand-gold)] inline-block" />
            City-to-City Transfers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cityRoutes.map((route) => (
              <div key={route.id} className="p-5 rounded-2xl glass border border-white/5 hover:border-[var(--brand-gold)]/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                    {typeLabels[route.type]}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-foreground font-medium text-sm">{route.origin}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--brand-gold)] shrink-0" />
                  <div className="flex-1 min-w-0 text-right">
                    <div className="text-foreground font-medium text-sm">{route.destination}</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground mb-5">
                  <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> {route.duration}</div>
                  <div className="flex items-start gap-2"><Car className="w-3 h-3 shrink-0 mt-0.5" /> {route.notes}</div>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-brand-gold-dark to-brand-gold text-white border-0 hover:opacity-90 text-sm" size="sm">
                  <Link href={`/contact?activity=Transfer: ${encodeURIComponent(route.origin + ' → ' + route.destination)}`}>
                    Book Transfer
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Custom transfer CTA */}
        <div className="p-8 rounded-3xl glass border border-border text-center max-w-2xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">Need a Custom Route?</h3>
          <p className="text-muted-foreground mb-6">
            Don&apos;t see your destination? We offer point-to-point transfers anywhere in Morocco. Just ask.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-to-r from-brand-gold-dark to-brand-gold text-white border-0">
              <Link href="/contact?activity=Custom+Transfer">Request Custom Transfer</Link>
            </Button>
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-foreground/5">
              <a href="https://wa.me/212766908381" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

