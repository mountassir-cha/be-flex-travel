import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, Clock, Moon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { circuits } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Morocco Circuits — 2 to 20-Day Tours from Marrakech | Be Flex Travel',
  description:
    'Choose your Morocco adventure: a 2-day Zagora escape, 3-day Sahara, 4, 6, 10 or the ultimate 20-day Grand Tour. All private, fully guided, free cancellation.',
}

const cardAccents = [
  { gradient: 'from-[#8A6F28] to-[#C9A84C]', glow: 'shadow-[var(--brand-gold)]/20', badge_bg: 'bg-[var(--brand-gold)] text-black' },
  { gradient: 'from-[#1a6b4a] to-[#2ecc71]', glow: 'shadow-emerald-500/20', badge_bg: 'bg-emerald-500 text-white' },
  { gradient: 'from-[#5b2d8e] to-[#9b59b6]', glow: 'shadow-purple-500/20', badge_bg: 'bg-purple-500 text-white' },
  { gradient: 'from-[#1a3a6b] to-[#2980b9]', glow: 'shadow-blue-500/20', badge_bg: 'bg-blue-500 text-white' },
  { gradient: 'from-[#7a1a1a] to-[#e74c3c]', glow: 'shadow-red-500/20', badge_bg: 'bg-red-500 text-white' },
  { gradient: 'from-[#4a3500] to-[#f39c12]', glow: 'shadow-yellow-500/20', badge_bg: 'bg-yellow-500 text-black' },
  { gradient: 'from-[#0a4a4a] to-[#1abc9c]', glow: 'shadow-teal-500/20', badge_bg: 'bg-teal-500 text-white' },
]

export default function CircuitsPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-4">

        {/* ── Header ── */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <Badge className="bg-[var(--brand-gold)] text-black font-bold mb-4 border-0 text-sm px-4 py-1">
            🏜️ Sahara Circuits
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Choose Your{' '}
            <span className="text-gradient-gold">Morocco</span>
            <br />Circuit
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            From a 3-day desert sprint to a week-long imperial odyssey — every circuit is
            private, fully guided, and crafted around your pace.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
            {['Private tour', 'Expert local guide', 'Free cancellation', 'No hidden fees'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[var(--brand-gold)]" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Circuit Cards ── */}
        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          {circuits.map((circuit, idx) => {
            const accent = cardAccents[idx % cardAccents.length]
            const nights = parseInt(circuit.duration) - 1
            return (
              <div
                key={circuit.slug}
                className={`group relative overflow-hidden rounded-3xl border border-white/8 bg-card/60 backdrop-blur transition-all duration-500 hover:border-white/15 hover:shadow-2xl ${accent.glow} shadow-xl`}
              >
                {/* Glow orb */}
                <div
                  className={`absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br ${accent.gradient} opacity-10 blur-3xl pointer-events-none group-hover:opacity-18 transition-opacity duration-500`}
                />

                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-72 h-56 md:h-auto shrink-0 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                    <Image
                      src={circuit.cover_image_url}
                      alt={circuit.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 288px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
                    {/* Day count pill over image */}
                    <div className="absolute bottom-4 left-4 md:hidden">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${accent.badge_bg}`}>
                        {circuit.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-7 md:p-10 flex flex-col justify-between">
                    <div>
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <span className={`hidden md:inline-flex text-xs font-bold px-3 py-1 rounded-full mb-3 ${accent.badge_bg}`}>
                            {circuit.badge}
                          </span>
                          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                            {circuit.title}
                          </h2>
                          <p className="text-[var(--brand-gold)] text-sm font-medium mt-1">
                            {circuit.subtitle}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-display text-2xl font-bold text-foreground">
                            {circuit.price_label.replace('From ', '')}
                          </div>
                          <div className="text-xs text-muted-foreground">per person</div>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {circuit.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Moon className="w-3.5 h-3.5" />
                          {nights} nights included
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {circuit.short_description}
                      </p>

                      {/* Highlights pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {circuit.highlights_summary.map((h) => (
                          <span
                            key={h}
                            className="flex items-center gap-1.5 text-xs text-foreground/70 glass px-3 py-1.5 rounded-full border border-white/8"
                          >
                            <Check className="w-2.5 h-2.5 text-[var(--brand-gold)]" />
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Day timeline (collapsed — just count) */}
                      <div className="flex gap-1 mb-6">
                        {circuit.days.map((day) => (
                          <div
                            key={day.day}
                            className={`h-1.5 flex-1 rounded-full bg-gradient-to-r ${accent.gradient} opacity-60`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-muted-foreground self-center whitespace-nowrap">
                          {circuit.days.length} days
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        asChild
                        className={`bg-gradient-to-r ${accent.gradient} text-black font-bold hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg`}
                      >
                        <Link href={`/tours/${circuit.slug}`}>
                          View Full Itinerary <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-white/15 text-foreground hover:bg-white/5"
                      >
                        <Link href={`/contact?activity=${encodeURIComponent(circuit.title)}`}>
                          Book This Circuit
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="max-w-2xl mx-auto text-center mt-20">
          <p className="text-muted-foreground mb-4">
            Not sure which circuit is right for you?
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#8A6F28] to-[#C9A84C] text-black font-bold hover:opacity-90 hover:scale-105 transition-all duration-200"
          >
            <a href="https://wa.me/212766908381" target="_blank" rel="noopener noreferrer">
              Ask Us on WhatsApp <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">We reply within 2 hours · No booking fee</p>
        </div>

      </div>
    </div>
  )
}
