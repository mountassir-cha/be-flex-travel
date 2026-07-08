import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { Clock, ArrowRight, Check, ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RatingStars } from '@/components/ui/RatingStars'
import { ImageCarousel } from '@/components/ui/ImageCarousel'
import { excursions } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const excursion = excursions.find((e) => e.slug === slug)
  if (!excursion) return { title: 'Not Found' }
  return {
    title: excursion.title,
    description: excursion.short_description,
  }
}

export function generateStaticParams() {
  return excursions.map((e) => ({ slug: e.slug }))
}

export default async function ExcursionDetailPage({ params }: Props) {
  const { slug } = await params
  const excursion = excursions.find((e) => e.slug === slug)
  if (!excursion) notFound()

  const contactHref = `/contact?activity=${encodeURIComponent(excursion.title)}`

  const galleryImages = excursion.gallery?.length > 0 
    ? excursion.gallery 
    : [
        `https://picsum.photos/seed/${excursion.slug}-1/1200/800`,
        `https://picsum.photos/seed/${excursion.slug}-2/1200/800`,
        `https://picsum.photos/seed/${excursion.slug}-3/1200/800`,
      ]
  const carouselImages = [excursion.cover_image_url, ...galleryImages]

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <ImageCarousel images={carouselImages} title={excursion.title} priority={true} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
        <div className="absolute top-6 left-4 z-10">
          <Button asChild variant="ghost" className="text-white glass hover:bg-white/20">
            <Link href="/excursions">
              <ChevronLeft className="w-4 h-4 mr-1" /> All Excursions
            </Link>
          </Button>
        </div>
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {excursion.featured && (
              <Badge className="bg-[var(--brand-gold)] text-white border-0">Popular</Badge>
            )}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">{excursion.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm text-white/80">
                <Clock className="w-4 h-4 text-[var(--brand-gold)]" />{excursion.duration}
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm">

              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl">
                <RatingStars rating={5} size="sm" />
                <span className="text-sm text-white/60">Excellent</span>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">About this excursion</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{excursion.description}</p>
            </div>

            {excursion.highlights.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">Highlights</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {excursion.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-white/80">
                      <div className="w-5 h-5 rounded-full bg-[var(--brand-gold)]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[var(--brand-gold)]" />
                      </div>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {excursion.included.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">What&apos;s Included</h2>
                <ul className="flex flex-wrap gap-2">
                  {excursion.included.map((item) => (
                    <li key={item}>
                      <span className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-sm text-white/70">
                        <Check className="w-3 h-3 text-[var(--brand-gold)]" /> {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
             <div className="sticky top-24 rounded-2xl glass border border-border p-6 space-y-5">
              <div>

              </div>
              <div className="border-t border-border pt-5 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[var(--brand-gold)]" /> {excursion.duration}</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--brand-gold)]" /> Free cancellation (48h)</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--brand-gold)]" /> Private — just your group</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--brand-gold)]" /> Expert local guide</div>
              </div>
              <Button asChild className="w-full bg-gradient-to-r from-brand-gold-dark to-brand-gold text-white border-0 hover:opacity-90" size="lg">
                <Link href={contactHref}>Book This Excursion <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-border text-foreground hover:bg-foreground/5">
                <a href="https://wa.me/212766908381" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
              </Button>
              <p className="text-xs text-center text-muted-foreground">We reply within 2 hours · No booking fee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
