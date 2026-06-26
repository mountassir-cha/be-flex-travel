'use client'

import { useState, useEffect } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function NavBar() {
  const t = useTranslations('Nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/activities', label: t('activities') },
    { href: '/excursions', label: t('excursions') },
    { href: '/tours', label: t('sahara') },
    { href: '/transport', label: t('transport') },
    { href: '/reviews', label: t('reviews') },
    { href: '/contact', label: t('contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background border-b border-border py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Image src="/logo.jpg" alt="Be Flex Travel Logo" fill className="object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold text-foreground tracking-wide">Be Flex</span>
            <span className="text-xs font-medium text-[var(--brand-gold)] tracking-widest uppercase">Travel</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-[var(--brand-gold)] bg-foreground/5'
                    : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Button
            asChild
            className="bg-gradient-to-r from-[#8A6F28] to-[#C9A84C] text-black font-semibold border-0 hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-[var(--brand-gold)]/20"
          >
            <Link href="/contact">{t('bookNow')}</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-foreground/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background border-l border-border p-0">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center p-6 border-b border-border">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image src="/logo.jpg" alt="Be Flex Travel Logo" fill className="object-cover" />
                  </div>
                  <span className="font-display text-lg font-bold text-foreground">Be Flex Travel</span>
                </Link>
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col p-4 gap-1 flex-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                        isActive
                          ? 'text-[var(--brand-gold)] bg-foreground/5'
                          : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5'
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-border flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <LanguageSwitcher />
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-[#8A6F28] to-[#C9A84C] text-black font-semibold border-0"
                >
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>{t('bookNow')}</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

