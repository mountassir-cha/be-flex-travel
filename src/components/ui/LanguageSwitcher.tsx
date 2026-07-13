'use client'

import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { ChevronDown, Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const otherLocales = [
    { code: 'es', label: 'ES' },
    { code: 'it', label: 'IT' },
    { code: 'de', label: 'DE' },
    { code: 'zgh', label: 'AMZ' } // AMZ is readable on all mobile devices instead of Tifinagh 'ⵜⵎⵣ'
  ]

  const isOtherActive = otherLocales.some(l => l.code === locale)
  const activeOther = otherLocales.find(l => l.code === locale)

  return (
    <div className="flex items-center bg-black/10 dark:bg-white/5 rounded-full p-1 relative" ref={dropdownRef}>
      {/* English (fixed) */}
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
          locale === 'en'
            ? 'bg-[var(--brand-gold)] text-black shadow-md font-bold'
            : 'text-foreground/80 hover:text-foreground'
        }`}
      >
        EN
      </button>

      {/* French (fixed) */}
      <button
        onClick={() => switchLocale('fr')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
          locale === 'fr'
            ? 'bg-[var(--brand-gold)] text-black shadow-md font-bold'
            : 'text-foreground/80 hover:text-foreground'
        }`}
      >
        FR
      </button>

      {/* Dropdown for other languages */}
      <div className="relative flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
            isOtherActive
              ? 'bg-[var(--brand-gold)]/20 text-[var(--brand-gold)] font-bold border border-[var(--brand-gold)]/30'
              : 'text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
          }`}
        >
          {isOtherActive ? activeOther?.label : <Globe className="w-3.5 h-3.5" />}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 bottom-[130%] md:top-[130%] md:bottom-auto mb-2 md:mb-0 md:mt-1 py-2 w-28 rounded-xl bg-card border border-border shadow-2xl flex flex-col z-[100] overflow-hidden">
            {otherLocales.map((other) => (
              <button
                key={other.code}
                onClick={() => switchLocale(other.code)}
                className={`px-4 py-2.5 text-xs text-left font-semibold transition-all flex items-center justify-between w-full ${
                  locale === other.code
                    ? 'text-[var(--brand-gold)] bg-black/5 dark:bg-white/5 font-bold'
                    : 'text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{other.label}</span>
                {locale === other.code && <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
