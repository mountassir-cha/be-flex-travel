import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RatingStars } from '@/components/ui/RatingStars'
import { circuits } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  return circuits.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tour = circuits.find((c) => c.slug === slug)
  if (!tour) return {}
  return {
    title: `${tour.title} — Be Flex Travel`,
    description: tour.short_description,
  }
}

const dayGradients = [
  'from-brand-gold-dark to-brand-gold',
  'from-brand-gold to-brand-gold-light',
  'from-brand-gold-dark to-brand-gold-light',
  'from-brand-gold-dark to-brand-gold',
  'from-[#555555] to-[#888888]',
  'from-[#444444] to-[#777777]',
  'from-[#333333] to-[#666666]',
]

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params
  const tour = circuits.find((c) => c.slug === slug)
  if (!tour) notFound()

  // Other circuits to cross-promote
  const others = circuits.filter((c) => c.slug !== slug)

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">

        {/* Back link */}
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All Circuits
        </Link>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="bg-[var(--brand-gold)] text-black font-bold mb-4 border-0">
            {tour.badge}
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            {tour.title}
          </h1>
          <p className="text-xl text-[var(--brand-gold)] font-medium mb-4">{tour.subtitle}</p>
          <p className="text-muted-foreground text-lg leading-relaxed">{tour.short_description}</p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="glass px-4 py-2 rounded-full text-sm text-foreground/80">⏱️ {tour.duration}</span>
            <span className="glass px-4 py-2 rounded-full text-sm text-foreground/80">🚗 Private transport</span>
            <span className="glass px-4 py-2 rounded-full text-sm text-foreground/80">💰 {tour.price_label}</span>
            <span className="glass px-4 py-2 rounded-full text-sm text-foreground/80">👥 Max 6 passengers</span>
          </div>
        </div>

        {/* Day-by-day itinerary */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            Day-by-Day <span className="text-gradient-gold">Itinerary</span>
          </h2>

          <div className="space-y-6">
            {tour.days.map((day, idx) => (
              <div key={day.day} className="group relative">
                {/* Connector line */}
                {idx < tour.days.length - 1 && (
                  <div className="absolute left-8 top-full w-0.5 h-6 bg-border z-10" />
                )}

                <div className="flex gap-6 p-6 rounded-2xl glass border border-border hover:border-[var(--brand-gold)]/20 transition-all duration-300">
                  {/* Day badge */}
                  <div
                    className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${dayGradients[idx] ?? dayGradients[dayGradients.length - 1]} flex flex-col items-center justify-center text-white shadow-lg`}
                  >
                    <span className="text-xs font-medium opacity-80">Day</span>
                    <span className="font-display text-2xl font-bold">{day.day}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <h3 className="font-display text-xl font-bold text-foreground">{day.title}</h3>
                      <Badge variant="outline" className="border-white/20 text-foreground/60 text-xs w-fit">
                        {day.subtitle}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{day.description}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {day.highlights.map((h) => (
                        <span key={h} className="flex items-center gap-1 text-xs text-foreground/60 glass px-2.5 py-1 rounded-full">
                          <Check className="w-2.5 h-2.5 text-[var(--brand-gold)]" /> {h}
                        </span>
                      ))}
                    </div>

                    {day.overnight && (
                      <div className="flex items-center gap-2 text-xs text-[var(--brand-gold)]">
                        🏨 Overnight: {day.overnight}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Included / Not included */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl glass border border-[var(--brand-gold)]/20">
              <h3 className="font-display text-xl font-bold text-foreground mb-5">✅ What&apos;s Included</h3>
              <ul className="space-y-3">
                {tour.included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                    <div className="w-5 h-5 rounded-full bg-[var(--brand-gold)]/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[var(--brand-gold)]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl glass border border-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-5">❌ Not Included</h3>
              <ul className="space-y-3">
                {tour.not_included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground/60">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <span className="text-xs text-foreground/40">×</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <div className="p-8 rounded-3xl glass border border-[var(--brand-gold)]/20">
            <RatingStars rating={5} className="justify-center mb-3" />
            <p className="text-foreground/60 text-sm mb-6">Rated 5/5 by over 50 travellers on Google</p>
            <p className="text-muted-foreground text-sm mb-6">Private tour · Free cancellation · Reply in 2hrs</p>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black font-bold hover:opacity-90"
              size="lg"
            >
              <Link href={`/contact?activity=${encodeURIComponent(tour.title)}`}>
                Book This Circuit <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">No booking fee · We reply within 2 hours</p>
          </div>
        </div>

        {/* Other circuits */}
        {others.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
              Also Consider
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/tours/${other.slug}`}
                  className="group p-6 rounded-2xl glass border border-white/5 hover:border-[var(--brand-gold)]/20 transition-all duration-300 flex flex-col gap-3"
                >
                  <Badge className="bg-[var(--brand-gold)]/10 text-[var(--brand-gold)] border-[var(--brand-gold)]/30 w-fit">
                    {other.badge}
                  </Badge>
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-[var(--brand-gold)] transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{other.duration} · {other.price_label}</p>
                  <span className="text-[var(--brand-gold)] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View itinerary <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
