import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabel?: boolean
}

export function RatingStars({ rating, max = 5, size = 'md', className, showLabel }: RatingStarsProps) {
  const sizeMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeMap[size],
            'transition-colors',
            i < rating
              ? 'fill-[var(--brand-gold)] text-[var(--brand-gold)]'
              : 'fill-transparent text-foreground/20'
          )}
        />
      ))}
      {showLabel && (
        <span className="ml-1 text-sm text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

