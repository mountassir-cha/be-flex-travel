'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ImageCarousel } from '@/components/ui/ImageCarousel'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface ExperienceCardProps {
  title: string
  slug: string
  short_description: string
  duration: string
  cover_image_url: string
  gallery?: string[]
  featured?: boolean
  order_rank?: number
  basePath: 'activities' | 'excursions'
  className?: string
}

export function ExperienceCard({
  title,
  slug,
  short_description,
  duration,
  cover_image_url,
  gallery,
  featured,
  order_rank,
  basePath,
  className,
}: ExperienceCardProps) {
  const t = useTranslations('Common')
  const href = `/${basePath}/${slug}`

  const galleryImages = gallery && gallery.length > 0 
    ? gallery 
    : [
        `https://picsum.photos/seed/${slug}-1/800/600`,
        `https://picsum.photos/seed/${slug}-2/800/600`,
        `https://picsum.photos/seed/${slug}-3/800/600`,
      ]
  const carouselImages = [cover_image_url, ...galleryImages]

  return (
    <Link href={href} className={cn('group block', className)}>
      <div className="relative overflow-hidden rounded-2xl bg-card card-hover border border-border h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden shrink-0">
          <ImageCarousel images={carouselImages} title={title} variant="card" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {order_rank === 1 && (
              <Badge className="bg-[var(--brand-gold)] text-black text-xs font-bold border-0 shadow-lg">
                ⭐ {t('pick1')}
              </Badge>
            )}
            {featured && order_rank !== 1 && (
              <Badge className="bg-[var(--brand-gold)] text-black text-xs font-semibold border-0 shadow-lg">
                {t('featured')}
              </Badge>
            )}
          </div>

          {/* Duration pill */}
          <div className="absolute bottom-3 right-3">
            <span className="flex items-center gap-1 text-xs text-white/90 glass px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-[var(--brand-gold)] transition-colors duration-200 line-clamp-1">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {short_description}
          </p>

          {/* Footer row */}
          <div className="mt-auto pt-3 border-t border-border flex items-center justify-end">
            <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-[var(--brand-gold)] transition-colors duration-200">
              {t('viewDetails')} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Simple horizontal card variant for featured sections ─────────────────────
interface FeaturedCardProps {
  title: string
  slug: string
  duration: string
  cover_image_url: string
  basePath: 'activities' | 'excursions'
  highlights: string[]
}

export function FeaturedCard({
  title,
  slug,
  duration,
  cover_image_url,
  basePath,
  highlights,
}: FeaturedCardProps) {
  const href = `/${basePath}/${slug}`
  return (
    <Link href={href} className="group flex gap-4 p-4 rounded-xl glass border border-border hover:border-[var(--brand-gold)]/30 transition-all duration-300 bg-card/50">
      <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
        <Image
          src={cover_image_url}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-foreground group-hover:text-[var(--brand-gold)] transition-colors truncate">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {duration}
        </p>
        {highlights[0] && (
          <p className="text-xs text-muted-foreground/70 mt-1 truncate">✓ {highlights[0]}</p>
        )}
      </div>
    </Link>
  )
}

