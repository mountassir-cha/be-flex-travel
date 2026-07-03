'use client'

import * as React from 'react'
import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    // We use the routing methods from next-intl/navigation
    // to preserve the current pathname and just swap the locale.
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center bg-black/10 dark:bg-white/5 rounded-full p-1">
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
          locale === 'en'
            ? 'bg-[var(--brand-gold)] text-black shadow-md'
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('fr')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
          locale === 'fr'
            ? 'bg-[var(--brand-gold)] text-black shadow-md'
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => switchLocale('es')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
          locale === 'es'
            ? 'bg-[var(--brand-gold)] text-black shadow-md'
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale('it')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
          locale === 'it'
            ? 'bg-[var(--brand-gold)] text-black shadow-md'
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        IT
      </button>
      <button
        onClick={() => switchLocale('de')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
          locale === 'de'
            ? 'bg-[var(--brand-gold)] text-black shadow-md'
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => switchLocale('zgh')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
          locale === 'zgh'
            ? 'bg-[var(--brand-gold)] text-black shadow-md'
            : 'text-foreground/70 hover:text-foreground'
        }`}
      >
        ⵜⵎⵣ
      </button>
    </div>
  )
}
