import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { blogPosts } from '@/lib/blog-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, ArrowRight, ChevronLeft, Share2, MessageCircle } from 'lucide-react'
import { CopyButton } from '@/components/ui/CopyButton'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title[locale] || post.title['en']} | Be Flex Travel`,
    description: post.excerpt[locale] || post.excerpt['en'],
  }
}

export function generateStaticParams() {
  const locales = ['en', 'fr', 'es', 'it', 'de']
  const params: { locale: string; slug: string }[] = []
  
  blogPosts.forEach((post) => {
    locales.forEach((locale) => {
      params.push({ locale, slug: post.slug })
    })
  })
  
  return params
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const t = await getTranslations({ locale, namespace: 'Blog' })

  // Find related posts (same category, or just other posts)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2)

  // Date formatter
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  // Sharing URLs
  const siteUrl = 'https://beflextravel.com'
  const postUrl = `${siteUrl}/${locale}/blog/${slug}`
  const postTitle = post.title[locale] || post.title['en']
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' ' + postUrl)}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`

  return (
    <div className="min-h-screen pt-24 pb-20 bg-moroccan-gradient grid-pattern relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] rounded-full bg-[var(--brand-gold)]/5 blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Back to Blog Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-[var(--brand-gold)] transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" /> {t('back')}
          </Link>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Block */}
          <article className="lg:col-span-8 space-y-8">
            {/* Header Block */}
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black text-xs font-bold border-0 uppercase tracking-wider px-3 py-1">
                {t(post.category)}
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {postTitle}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed font-light italic">
                {post.excerpt[locale] || post.excerpt['en']}
              </p>
            </div>

            {/* Author / Date Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl glass border border-border">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{post.author.role}</p>
                </div>
              </div>

              {/* Date & Read time */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[var(--brand-gold)]" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[var(--brand-gold)]" />
                  {post.readTime[locale] || post.readTime['en']}
                </span>
              </div>
            </div>

            {/* Post Cover Image */}
            <div className="relative h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted">
              <Image
                src={post.image}
                alt={postTitle}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            </div>

            {/* Article Content Parser */}
            <div className="prose max-w-none text-foreground/80 leading-relaxed space-y-6">
              {(post.sections[locale] || post.sections['en']).map((section, idx) => {
                if (section.type === 'heading') {
                  return (
                    <h2
                      key={idx}
                      className="font-display text-2xl md:text-3xl font-bold text-foreground pt-6 pb-2 border-b border-border flex items-center gap-2"
                    >
                      <span className="w-1.5 h-6 rounded bg-[var(--brand-gold)] inline-block" />
                      {section.text}
                    </h2>
                  )
                } else if (section.type === 'paragraph') {
                  return (
                    <p key={idx} className="text-foreground/70 text-base md:text-lg leading-relaxed font-light">
                      {section.text}
                    </p>
                  )
                } else if (section.type === 'list' && section.items) {
                  return (
                    <ul key={idx} className="space-y-3.5 my-6 pl-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-foreground/70 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)] shrink-0 mt-2.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                return null
              })}
            </div>

            {/* Social Share Row */}
            <div className="pt-8 border-t border-border flex items-center gap-4 flex-wrap">
              <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[var(--brand-gold)]" /> {t('share')}:
              </span>
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-all text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp
              </a>
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-all text-xs font-semibold"
              >
                <FacebookIcon className="w-4 h-4 fill-current" /> Facebook
              </a>
              <CopyButton textToCopy={postUrl} successText="Copied!" label="Copy Link" />
            </div>

            {/* Dynamic CTA box */}
            <div className="p-8 rounded-2xl glass border border-border bg-gradient-to-r from-brand-gold-dark/10 via-brand-gold/5 to-transparent relative overflow-hidden">
              <div className="absolute -right-16 -bottom-16 w-40 h-40 rounded-full bg-[var(--brand-gold)]/5 blur-3xl pointer-events-none" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                {t('bookCTA')}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xl">
                Be Flex Travel provides premium guided activities, private excursions, desert tours, and transfers across Marrakech and Morocco. Let us design your custom travel experience.
              </p>
              <Button asChild className="bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black font-bold border-0 hover:opacity-90 transition-opacity">
                <Link href="/contact">
                  {t('contactUs')} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </article>

          {/* Sidebar / Related Posts */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Related Posts */}
            <div className="sticky top-24 space-y-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
                <span className="w-1 h-5 rounded bg-[var(--brand-gold)] inline-block" />
                {t('related')}
              </h3>

              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                  <div className="p-4 rounded-xl glass border border-border hover:border-[var(--brand-gold)]/20 hover:bg-foreground/[0.03] transition-all duration-300 flex gap-4">
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-border bg-muted">
                      <Image
                        src={related.image}
                        alt={related.title[locale] || related.title['en']}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h4 className="font-medium text-sm text-foreground group-hover:text-[var(--brand-gold)] transition-colors line-clamp-2 leading-snug">
                        {related.title[locale] || related.title['en']}
                      </h4>
                      <p className="text-muted-foreground text-[10px] flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 text-[var(--brand-gold)]" />
                        {related.readTime[locale] || related.readTime['en']}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
