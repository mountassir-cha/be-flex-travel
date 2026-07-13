import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

// WhatsApp SVG icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// Facebook SVG icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

// Instagram SVG icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

// TikTok SVG icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.53V6.77a4.85 4.85 0 01-1-.08z" />
    </svg>
  )
}

export async function Footer() {
  const t = await getTranslations('Footer')

  const quickLinks = [
    { href: '/activities', label: t('quickLinkItems.activities') },
    { href: '/excursions', label: t('quickLinkItems.excursions') },
    { href: '/tours/3-day-merzouga', label: t('quickLinkItems.saharaTour') },
    { href: '/transport', label: t('quickLinkItems.transport') },
    { href: '/blog', label: t('quickLinkItems.blog') },
    { href: '/reviews', label: t('quickLinkItems.reviews') },
    { href: '/contact', label: t('quickLinkItems.contactUs') },
  ]

  const popularActivities = [
    { href: '/activities/camel-ride', label: t('popularItems.camelRide') },
    { href: '/activities/hot-air-balloon', label: t('popularItems.hotAirBalloon') },
    { href: '/activities/quad-biking', label: t('popularItems.quadBiking') },
    { href: '/activities/hammam-spa', label: t('popularItems.hammamSpa') },
    { href: '/excursions/ourika-valley', label: t('popularItems.ourikaValley') },
    { href: '/excursions/essaouira', label: t('popularItems.essaouiraDayTrip') },
  ]

  return (
    <footer className="bg-[var(--sidebar)] border-t border-border mt-auto">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Image src="/logo.jpg" alt="Be Flex Travel Logo" fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold text-foreground tracking-wide">Be Flex</span>
                <span className="text-sm font-medium text-[var(--brand-gold)] tracking-widest uppercase">Travel</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              {t('tagline')}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/212672770883"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center text-muted-foreground hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-200"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/19PNLbmruM/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center text-muted-foreground hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-all duration-200"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/beflextravel?igsh=MThjcW95YmhzdHM2cA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center text-muted-foreground hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-all duration-200"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://vt.tiktok.com/ZSCv6oSX6/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-200"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold text-sm uppercase tracking-widest mb-5">{t('quickLinks')}</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-[var(--brand-gold)] text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Activities */}
          <div>
            <h3 className="text-foreground font-semibold text-sm uppercase tracking-widest mb-5">{t('popular')}</h3>
            <ul className="space-y-2.5">
              {popularActivities.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-[var(--brand-gold)] text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-semibold text-sm uppercase tracking-widest mb-5">{t('getInTouch')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[var(--brand-gold)] mt-0.5 shrink-0" />
                <div>
                  <a href="tel:0672770883" className="text-foreground/80 hover:text-foreground text-sm transition-colors">
                    0672770883
                  </a>
                  <p className="text-muted-foreground/60 text-xs mt-0.5">{t('whatsappCalls')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[var(--brand-gold)] mt-0.5 shrink-0" />
                <div>
                  <a href="mailto:beflextravel@gmail.com" className="text-foreground/80 hover:text-foreground text-sm transition-colors">
                    beflextravel@gmail.com
                  </a>
                  <p className="text-muted-foreground/60 text-xs mt-0.5">{t('replyTime')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--brand-gold)] mt-0.5 shrink-0" />
                <div>
                  <p className="text-foreground/80 text-sm">{t('location')}</p>
                  <p className="text-muted-foreground/60 text-xs mt-0.5">{t('basedIn')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground/60 text-xs">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-muted-foreground/60 text-xs">
            {t('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  )
}
