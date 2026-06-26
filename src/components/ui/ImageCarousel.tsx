'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageCarouselProps {
  images: string[]
  title: string
  variant?: 'hero' | 'card'
}

export function ImageCarousel({ images, title, variant = 'hero' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  if (images.length === 0) return null

  const isHero = variant === 'hero'
  const imageClassName = isHero ? "object-cover" : "object-cover group-hover:scale-110 transition-transform duration-700"

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden group">
      {images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <Image
            src={image}
            alt={`${title} - Image ${index + 1}`}
            fill
            priority={index === 0}
            className={imageClassName}
            sizes={isHero ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-2 flex items-center z-20">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className={`${isHero ? 'w-12 h-12' : 'w-8 h-8'} rounded-full bg-black/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40 border border-white/10`}
            >
              <ChevronLeft className={isHero ? 'w-8 h-8' : 'w-5 h-5'} />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center z-20">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className={`${isHero ? 'w-12 h-12' : 'w-8 h-8'} rounded-full bg-black/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40 border border-white/10`}
            >
              <ChevronRight className={isHero ? 'w-8 h-8' : 'w-5 h-5'} />
            </Button>
          </div>
          <div className={`absolute ${isHero ? 'bottom-32' : 'bottom-4'} left-0 right-0 flex justify-center gap-2 z-20`}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/40 hover:bg-white/80 w-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
