'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { activities, excursions } from '@/lib/data'

// Extract images with their titles from our data
const imageData = [
  ...activities.map((a) => ({ src: a.cover_image_url, title: a.title })),
  ...excursions.map((e) => ({ src: e.cover_image_url, title: e.title })),
]

// Offset each row so they don't all start with the same image
const row1 = [...imageData]
const row2 = [...imageData.slice(5),  ...imageData.slice(0, 5)]
const row3 = [...imageData.slice(10), ...imageData.slice(0, 10)]
const row4 = [...imageData.slice(3),  ...imageData.slice(0, 3)]
const row5 = [...imageData.slice(7),  ...imageData.slice(0, 7)]

export function AnimatedHeroGallery() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-background">

      {/* ── Animated grid (behind all overlays) ── */}
      <div
        className="absolute top-1/2 left-1/2 flex flex-col gap-4 sm:gap-5"
        style={{
          transform: 'translate(-50%, -50%) rotate(-12deg) scale(1.3)',
          width: '160vw',
        }}
      >
        <MarqueeRow images={row1} direction="left"  speed={50} />
        <MarqueeRow images={row2} direction="right" speed={38} />
        <MarqueeRow images={row3} direction="left"  speed={55} />
        <MarqueeRow images={row4} direction="right" speed={42} />
        <MarqueeRow images={row5} direction="left"  speed={60} />
      </div>

      {/* ── Layer 1 — uniform dark base (dims the whole gallery) ── */}
      <div className="absolute inset-0 bg-black/65 z-10" />

      {/* ── Layer 2 — top & bottom solid fades (background colour) ── */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            'linear-gradient(to bottom, var(--background) 0%, transparent 28%, transparent 72%, var(--background) 100%)',
        }}
      />

      {/* ── Layer 3 — left & right solid fades ── */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            'linear-gradient(to right, var(--background) 0%, transparent 22%, transparent 78%, var(--background) 100%)',
        }}
      />

      {/* ── Layer 4 — centre soft vignette (extra darkness behind headline) ── */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(0,0,0,0.50) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}

function MarqueeRow({
  images,
  direction,
  speed,
}: {
  images: { src: string; title: string }[]
  direction: 'left' | 'right'
  speed: number
}) {
  return (
    <div className="flex w-max">
      <motion.div
        className="flex gap-4 sm:gap-5 px-2"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {/* Duplicate for seamless infinite loop */}
        {[...images, ...images].map(({ src, title }, i) => (
          <div
            key={i}
            className="relative shrink-0 w-44 sm:w-60 md:w-72 h-28 sm:h-44 md:h-52 rounded-xl overflow-hidden border border-white/10"
            style={{ filter: 'brightness(0.55) saturate(0.85)' }}
          >
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 11rem, (max-width: 1024px) 15rem, 18rem"
            />
            {/* Bottom label */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/90 to-transparent" />
            <span className="absolute bottom-1.5 left-2.5 right-2.5 text-white/70 text-[9px] font-medium tracking-wide truncate leading-none">
              {title}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
