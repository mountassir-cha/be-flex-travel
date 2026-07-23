'use client'

import Image from 'next/image'
import { activities, excursions } from '@/lib/data'

// Extract images with their titles from our data
const imageData = [
  ...activities.map((a) => ({ src: a.cover_image_url, title: a.title })),
  ...excursions.map((e) => ({ src: e.cover_image_url, title: e.title })),
]

// 3 rows of 5 images each — significantly lighter than the previous 5×6 setup
const row1 = imageData.slice(0, 5)
const row2 = imageData.slice(5, 10)
const row3 = imageData.slice(10, 15)

export function AnimatedHeroGallery() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

      {/* ── Animated grid (behind all overlays) ── */}
      <div
        className="absolute top-1/2 left-1/2 flex flex-col gap-4 sm:gap-5"
        style={{
          transform: 'translate(-50%, -50%) rotate(-12deg) scale(1.3)',
          width: '160vw',
          willChange: 'transform',
        }}
      >
        <MarqueeRow images={row1} direction="left" duration={60} />
        <MarqueeRow images={row2} direction="right" duration={50} />
        <MarqueeRow images={row3} direction="left" duration={55} />
      </div>

      {/* ── Dark contrast backdrop layer for clear photo cards behind text ── */}
      <div className="absolute inset-0 bg-black/45 dark:bg-[#060813]/65 z-10 pointer-events-none" />

      {/* ── Layer 2 — top & bottom subtle fades ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, var(--background) 0%, transparent 15%, transparent 85%, var(--background) 100%)',
        }}
      />

      {/* ── Layer 3 — left & right subtle fades ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, var(--background) 0%, transparent 12%, transparent 88%, var(--background) 100%)',
        }}
      />
    </div>
  )
}

function MarqueeRow({
  images,
  direction,
  duration,
}: {
  images: { src: string; title: string }[]
  direction: 'left' | 'right'
  duration: number
}) {
  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right'

  return (
    <>
      {/* CSS keyframes injected once per direction */}
      <style>{`
        @keyframes marquee-left  { from { transform: translate3d(0, 0, 0); }   to { transform: translate3d(-50%, 0, 0); } }
        @keyframes marquee-right { from { transform: translate3d(-50%, 0, 0); } to { transform: translate3d(0, 0, 0); } }
      `}</style>
      <div className="flex w-max">
        <div
          className="flex gap-4 sm:gap-5 px-2"
          style={{
            animation: `${animName} ${duration}s linear infinite`,
            willChange: 'transform',
          }}
        >
          {/* Duplicate for seamless infinite loop */}
          {[...images, ...images].map(({ src, title }, i) => (
            <div
              key={i}
              className="relative shrink-0 w-44 sm:w-60 md:w-72 h-28 sm:h-44 md:h-52 rounded-xl overflow-hidden border border-border"
            >
              <Image
                src={src}
                alt={title}
                fill
                className="object-cover brightness-105 contrast-105 saturate-105"
                sizes="(max-width: 768px) 11rem, (max-width: 1024px) 15rem, 18rem"
                loading="eager"
              />
              {/* Bottom label */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/90 to-transparent" />
              <span className="absolute bottom-1.5 left-2.5 right-2.5 text-white/70 text-[9px] font-medium tracking-wide truncate leading-none">
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
