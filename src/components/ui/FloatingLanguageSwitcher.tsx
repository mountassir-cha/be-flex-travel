'use client'

import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { ChevronUp, Check } from 'lucide-react'
import { LanguageFlag } from '@/components/ui/Flags'
import { cn } from '@/lib/utils'

interface LanguageOption {
  code: string
  label: string
  nativeName: string
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'fr', label: 'FR', nativeName: 'Français' },
  { code: 'es', label: 'ES', nativeName: 'Español' },
  { code: 'de', label: 'DE', nativeName: 'Deutsch' },
  { code: 'it', label: 'IT', nativeName: 'Italiano' },
  { code: 'zgh', label: 'ZGH', nativeName: 'ⵜⵎⵣ (Tamazight)' },
]

export function FloatingLanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0]

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

  return (
    <div className="fixed bottom-6 left-6 z-50" ref={dropdownRef}>
      {/* Dropdown Menu (Opens Upward) */}
      {isOpen && (
        <div
          className={cn(
            'absolute bottom-full mb-3 left-0 w-52 py-2',
            'bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl',
            'flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200'
          )}
        >
          <div className="px-3 py-1.5 mb-1 border-b border-border/60 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Select Language
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = locale === lang.code
            return (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={cn(
                  'px-3.5 py-2.5 text-xs font-medium transition-all duration-150',
                  'flex items-center justify-between w-full text-left gap-3',
                  isSelected
                    ? 'bg-[var(--brand-gold)]/15 text-[var(--brand-gold)] font-bold'
                    : 'text-foreground/90 hover:text-foreground hover:bg-foreground/5'
                )}
              >
                <div className="flex items-center gap-3">
                  <LanguageFlag code={lang.code} className="w-5 h-3.5" />
                  <span className="text-sm font-medium">{lang.nativeName}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[var(--brand-gold)] shrink-0" />}
              </button>
            )
          })}
        </div>
      )}

      {/* Main Trigger Button (Fixed Bottom-Left) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        className={cn(
          'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-border shadow-lg',
          'bg-card/90 backdrop-blur-md text-foreground font-semibold text-xs',
          'hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group',
          isOpen && 'ring-2 ring-[var(--brand-gold)]/50 border-[var(--brand-gold)]'
        )}
      >
        <LanguageFlag code={currentLang.code} className="w-5 h-3.5" />
        <span className="font-bold tracking-wide uppercase text-foreground">{currentLang.label}</span>
        <ChevronUp
          className={cn(
            'w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform duration-200',
            isOpen ? 'rotate-180 text-[var(--brand-gold)]' : ''
          )}
        />
      </button>
    </div>
  )
}
