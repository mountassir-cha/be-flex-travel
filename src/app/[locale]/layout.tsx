import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../globals.css'
import { NavBar } from '@/components/layout/NavBar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Be Flex Travel — Marrakech Tours, Activities & Excursions',
    template: '%s | Be Flex Travel',
  },
  description:
    'Discover Morocco\'s magic with Be Flex Travel. Book camel rides, hot air balloons, desert tours, day excursions & private transfers from Marrakech. Expert local guides.',
  keywords: [
    'Marrakech tours', 'Morocco excursions', 'camel ride Marrakech',
    'hot air balloon Morocco', 'Sahara desert tour', 'Marrakech activities',
    'Morocco travel agency', 'private transfer Marrakech',
  ],
  openGraph: {
    title: 'Be Flex Travel — Marrakech Tours & Excursions',
    description: 'Expert-guided activities, excursions & desert tours from Marrakech.',
    url: 'https://beflextravel.com',
    siteName: 'Be Flex Travel',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#080808',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <NavBar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
