import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { blogPosts } from '@/lib/blog-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, ArrowRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Blog' })
  return {
    title: `${t('titleHighlight')} | Be Flex Travel`,
    description: t('description'),
  }
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams
  const activeCategory = (resolvedSearchParams.category as string) || 'all'
  const t = await getTranslations({ locale, namespace: 'Blog' })

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    if (activeCategory === 'all') return true
    return post.category === activeCategory
  })

  // Format date helper
  const formatDate = (dateStr: string, lang: string) => {
    try {
      return new Date(dateStr).toLocaleDateString(lang, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const categories = ['all', 'guides', 'sahara', 'wellness', 'morocco-tips']

  return (
    <div className="min-h-screen pt-28 pb-20 bg-moroccan-gradient grid-pattern relative overflow-hidden">
      {/* Background radial glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--brand-gold)]/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-4 mb-12 relative z-10">
        <div className="max-w-3xl text-center mx-auto">
          <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-4 px-3 py-1 text-xs uppercase tracking-widest bg-[var(--brand-gold)]/5">
            {t('badge')}
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-5 leading-tight">
            {t('title')} <span className="text-gradient-gold">{t('titleHighlight')}</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="container mx-auto px-4 mb-12 relative z-10">
        <div className="flex flex-wrap justify-center items-center gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category
            const url = category === 'all' ? '/blog' : `/blog?category=${category}`
            return (
              <Link key={category} href={url}>
                <span
                  className={`inline-block px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black border-transparent shadow-lg shadow-[var(--brand-gold)]/10 font-bold scale-105'
                      : 'bg-foreground/5 text-foreground/80 border-border hover:bg-foreground/10 hover:text-foreground hover:border-[var(--brand-gold)]/20'
                  }`}
                >
                  {t(category)}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Grid of posts */}
      <div className="container mx-auto px-4 relative z-10">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full block">
                <article className="relative overflow-hidden rounded-2xl bg-card border border-border h-full flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--brand-gold)]/35 hover:shadow-[0_12px_45px_rgba(184,134,11,0.06)]">
                  {/* Post Image Container */}
                  <div className="relative h-56 w-full overflow-hidden shrink-0 bg-white/5">
                    <Image
                      src={post.image}
                      alt={post.title[locale] || post.title['en']}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                    {/* Category Tag (Top-Left) */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black text-[10px] font-bold border-0 tracking-wider uppercase px-2.5 py-1">
                        {t(post.category)}
                      </Badge>
                    </div>

                    {/* Read Time (Bottom-Right) */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-white/90 glass px-2.5 py-1.5 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-[var(--brand-gold)]" />
                      {post.readTime[locale] || post.readTime['en']}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-[var(--brand-gold)] transition-colors duration-300 line-clamp-2 mb-3 leading-snug">
                      {post.title[locale] || post.title['en']}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 font-light mb-6">
                      {post.excerpt[locale] || post.excerpt['en']}
                    </p>

                    {/* Card Footer (Author & Date) */}
                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                      {/* Author Info */}
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground/90">{post.author.name}</p>
                          <p className="text-[10px] text-muted-foreground">{t('writtenBy')}</p>
                        </div>
                      </div>

                      {/* Date / Link */}
                      <div className="flex items-center gap-1.5 text-xs text-[var(--brand-gold)] font-medium">
                        <span>{formatDate(post.date, locale)}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl glass border border-border max-w-lg mx-auto">
            <p className="text-muted-foreground mb-6 text-lg">{t('noPosts')}</p>
            <Button asChild className="bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black font-semibold border-0">
              <Link href="/blog">{t('all')}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
