import type { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { ArrowRight, Star, Users, MapPin, Award, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExperienceCard } from '@/components/ui/ExperienceCard'
import { RatingStars } from '@/components/ui/RatingStars'
import { AnimatedHeroGallery } from '@/components/ui/AnimatedHeroGallery'
import { activities, excursions, reviews } from '@/lib/data'
import { getTranslations } from 'next-intl/server'

// Convert slug like 'camel-ride' → 'camelRide' for translation key lookup
function slugToCamel(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

export const metadata: Metadata = {
  title: 'Be Flex Travel — Marrakech Tours, Activities & Excursions',
  description:
    'Discover Morocco\'s magic with Be Flex Travel. Book camel rides, hot air balloons, desert tours, day excursions & private transfers from Marrakech. Expert local guides.',
}

const featuredActivities = activities.filter((a) => a.featured).slice(0, 4)
const featuredExcursions = excursions.filter((e) => e.featured).slice(0, 4)
const displayedReviews = reviews.filter((r) => r.approved).slice(0, 3)

export default async function HomePage() {
  const t = await getTranslations('Home')
  const tActivities = await getTranslations('Activities')
  const tExcursions = await getTranslations('Excursions')

  const stats = [
    { icon: Users, value: '2,000+', label: t('stats.travellers') },
    { icon: Star, value: '4.6 / 5', label: t('stats.rating') },
    { icon: MapPin, value: '15+', label: t('stats.destinations') },
    { icon: Award, value: '8+ Years', label: t('stats.experience') },
  ]

  const whyCards = [
    { emoji: '🇲🇦', title: t('why.local.title'), desc: t('why.local.desc') },
    { emoji: '🚗', title: t('why.private.title'), desc: t('why.private.desc') },
    { emoji: '💬', title: t('why.reachable.title'), desc: t('why.reachable.desc') },
    { emoji: '📸', title: t('why.photo.title'), desc: t('why.photo.desc') },
    { emoji: '✅', title: t('why.fees.title'), desc: t('why.fees.desc') },
    { emoji: '🔄', title: t('why.cancel.title'), desc: t('why.cancel.desc') },
  ]

  const saharaFeatures = [
    t('sahara.feature1'),
    t('sahara.feature2'),
    t('sahara.feature3'),
    t('sahara.feature4'),
  ]

  return (
    <div className="flex flex-col">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedHeroGallery />

        <div className="relative z-10 container mx-auto px-4 flex justify-center items-center">
          <div className="max-w-3xl w-full glass p-8 md:p-12 rounded-3xl border border-border shadow-2xl text-center flex flex-col items-center">


            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              {t('hero.titleStart')}{' '}
              <span className="text-gradient-gold">{t('hero.titleHighlight')}</span>
              <br />
              {t('hero.titleEnd')}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-brand-gold-dark to-brand-gold text-foreground border-0 hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-[var(--brand-gold)]/30 text-base px-8"
              >
                <Link href="/activities">
                  {t('hero.exploreActivities')} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-foreground/20 text-foreground hover:bg-foreground/10 hover:border-foreground/40 backdrop-blur text-base px-8 transition-all duration-200"
              >
                <Link href="/tours">{t('hero.exploreCircuits')}</Link>
              </Button>
            </div>

            {/* Quick trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-8 text-foreground/60 text-xs border-t border-border/40 pt-6 w-full">
              <div className="flex items-center gap-1">
                <RatingStars rating={5} size="sm" />
                <span>{t('hero.reviews')}</span>
              </div>
              <span className="hidden sm:inline text-foreground/30">·</span>
              <span>{t('hero.noFees')}</span>
              <span className="hidden sm:inline text-foreground/30">·</span>
              <span>{t('hero.freeCancellation')}</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/50 text-xs animate-bounce">
          <span>{t('hero.scroll')}</span>
          <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[var(--brand-gold)]/20 to-[var(--brand-gold-light)]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-[var(--brand-gold)]" />
                </div>
                <div className="font-display text-3xl font-bold text-foreground mb-1">{value}</div>
                <div className="text-muted-foreground text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED ACTIVITIES ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-3">
                {t('activities.badge')}
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                {t('activities.title')} <span className="text-gradient-gold">{t('activities.titleHighlight')}</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-md">
                {t('activities.description')}
              </p>
            </div>
            <Link
              href="/activities"
              className="hidden md:flex items-center gap-2 text-[var(--brand-gold)] hover:gap-3 transition-all duration-200 text-sm font-medium"
            >
              {t('activities.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredActivities.map((activity) => (
              <ExperienceCard
                key={activity.id}
                {...activity}
                title={tActivities(`${slugToCamel(activity.slug)}.title`)}
                short_description={tActivities(`${slugToCamel(activity.slug)}.desc`)}
                basePath="activities"
              />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-foreground/5">
              <Link href="/activities">{t('activities.viewAllBtn')} <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── SAHARA BANNER ───────────────────────────────────────────────── */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <Link href="/tours" className="group block">
            <div className="relative overflow-hidden rounded-3xl bg-[var(--section-accent-bg)] border border-[var(--brand-gold)]/20 hover:border-[var(--brand-gold)]/40 transition-all duration-500 p-8 md:p-12">
              {/* Decorative dune shape */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[var(--brand-gold)]/5 to-transparent hidden md:block" />
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[var(--brand-gold)]/8 blur-3xl pointer-events-none" />
              <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-[var(--brand-gold)]/4 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <Badge className="bg-[var(--brand-gold)] text-black font-bold mb-4 border-0">
                    {t('sahara.badge')}
                  </Badge>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                    {t('sahara.title')}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('sahara.description')}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-5">
                    {saharaFeatures.map((item) => (
                      <span key={item} className="text-xs text-muted-foreground glass px-3 py-1 rounded-full">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                  <Button className="bg-[var(--brand-gold)] text-white font-semibold hover:bg-[var(--brand-gold)]/90 group-hover:scale-105 transition-all duration-200">
                    {t('sahara.cta')} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── FEATURED EXCURSIONS ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-3">
                {t('excursions.badge')}
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                {t('excursions.title')} <span className="text-gradient-gold">{t('excursions.titleHighlight')}</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-md">
                {t('excursions.description')}
              </p>
            </div>
            <Link
              href="/excursions"
              className="hidden md:flex items-center gap-2 text-[var(--brand-gold)] hover:gap-3 transition-all duration-200 text-sm font-medium"
            >
              {t('excursions.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredExcursions.map((excursion) => (
              <ExperienceCard
                key={excursion.id}
                {...excursion}
                title={tExcursions(`${slugToCamel(excursion.slug)}.title`)}
                short_description={tExcursions(`${slugToCamel(excursion.slug)}.desc`)}
                basePath="excursions"
              />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-foreground/5">
              <Link href="/excursions">{t('excursions.viewAllBtn')} <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ───────────────────────────────────────────────── */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-3">
              {t('why.badge')}
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              {t('why.title')} <span className="text-gradient-gold">{t('why.titleHighlight')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyCards.map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl glass border border-border hover:border-[var(--brand-gold)]/20 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-[var(--brand-gold)] transition-colors">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-3">
              {t('reviews.badge')}
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              {t('reviews.title')} <span className="text-gradient-gold">{t('reviews.titleHighlight')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl glass border border-border bg-card/50 flex flex-col gap-4"
              >
                <RatingStars rating={review.rating} />
                <p className="text-foreground/80 text-sm leading-relaxed flex-1 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <div className="font-semibold text-sm text-foreground">{review.author_name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{review.source}</div>
                  </div>
                  {review.source === 'google' && (
                    <span className="text-xs glass px-2 py-1 rounded-full text-foreground/60 border border-border bg-background/50">Google</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-foreground/5">
              <Link href="/reviews">{t('reviews.readAll')} <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--section-accent-bg)] border border-[var(--brand-gold)]/25 p-12 text-center">
            {/* Gold shimmer corners */}
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[var(--brand-gold)]/6 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-[var(--brand-gold)]/6 blur-2xl pointer-events-none" />
            {/* Moroccan diamond pattern */}
            <div className="absolute inset-0 moroccan-pattern opacity-100 pointer-events-none rounded-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto">
              {/* Gold divider above */}
              <div className="gold-divider w-24 mx-auto mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black font-bold hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-[var(--brand-gold)]/20"
                >
                  <Link href="/contact">{t('cta.quote')} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[var(--brand-gold)]/30 text-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/10 hover:border-[var(--brand-gold)]/60"
                >
                  <a href="https://wa.me/212672770883" target="_blank" rel="noopener noreferrer">
                    {t('cta.whatsapp')}
                  </a>
                </Button>
              </div>
              {/* Gold divider below */}
              <div className="gold-divider w-24 mx-auto mt-6" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
