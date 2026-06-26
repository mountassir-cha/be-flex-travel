'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Send, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RatingStars } from '@/components/ui/RatingStars'
import { reviews } from '@/lib/data'

// Note: Metadata cannot be exported from a 'use client' component directly.
// In a real app, we'd move the metadata to a parent layout or a separate server component wrapper.
// export const metadata: Metadata = {
//   title: 'Customer Reviews',
//   description:
//     'Read what travellers say about Be Flex Travel — real reviews from satisfied customers who explored Morocco with our expert local guides.',
// }

const sourceLabels: Record<string, string> = {
  google: '🌐 Google',
  tripadvisor: '🦉 TripAdvisor',
  site: '💬 Direct',
}

const approvedReviews = reviews.filter((r) => r.approved)
const avgRating = approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-3">
            Testimonials
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            What Travellers <span className="text-gradient-gold">Say</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Real experiences from real travellers — {approvedReviews.length} reviews and counting.
          </p>

          {/* Rating summary */}
          <div className="mt-8 inline-flex items-center gap-4 glass px-6 py-4 rounded-2xl border border-white/10">
            <div className="text-center">
              <div className="font-display text-5xl font-bold text-white">{avgRating.toFixed(1)}</div>
              <RatingStars rating={Math.round(avgRating)} className="justify-center mt-1" />
              <div className="text-xs text-white/50 mt-1">out of 5</div>
            </div>
            <div className="w-px h-16 bg-white/10" />
            <div className="text-left">
              <div className="text-white font-semibold">{approvedReviews.length} Reviews</div>
              <div className="text-xs text-white/50">from Google, TripAdvisor & direct</div>
              <div className="text-xs text-[var(--brand-gold)] mt-1">100% verified</div>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {approvedReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <RatingStars rating={review.rating} />
                <span className="text-xs text-white/40 glass px-2 py-1 rounded-full">
                  {sourceLabels[review.source] || review.source}
                </span>
              </div>

              <p className="text-white/80 text-sm leading-relaxed flex-1 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8A6F28] to-[#C9A84C] flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {review.author_name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{review.author_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a review Form Section */}
        <div className="max-w-xl mx-auto p-8 rounded-3xl glass border border-white/10 mt-14">
          <h2 className="font-display text-2xl font-bold text-white mb-2 text-center">Travelled with us?</h2>
          <p className="text-muted-foreground text-sm mb-6 text-center">
            We&apos;d love to hear about your experience. Share your story and help other travellers discover Morocco.
          </p>
          <ReviewForm />
        </div>
      </div>
    </div>
  )
}

function ReviewForm() {
  const [form, setForm] = useState({
    author_name: '',
    text: '',
    rating: 5,
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'site' }),
      })
      if (response.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Submission failed', error)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center p-6 space-y-3">
        <div className="text-4xl mb-2">✨</div>
        <h3 className="text-xl font-bold text-white">Thank you!</h3>
        <p className="text-sm text-white/60">Your review has been submitted and is pending approval.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label className="text-white/80">Rating *</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setForm({ ...form, rating: star })}
              className={`p-1 transition-colors ${star <= form.rating ? 'text-[var(--brand-gold)]' : 'text-white/20 hover:text-white/40'}`}
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="author_name" className="text-white/80">Your Name *</Label>
        <Input
          id="author_name"
          required
          value={form.author_name}
          onChange={(e) => setForm({ ...form, author_name: e.target.value })}
          className="bg-white/5 border-white/10 text-white focus:border-[var(--brand-gold)]/50"
          placeholder="Jane Doe"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="text" className="text-white/80">Review *</Label>
        <Textarea
          id="text"
          required
          rows={4}
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="bg-white/5 border-white/10 text-white focus:border-[var(--brand-gold)]/50 resize-none"
          placeholder="Tell us about your trip..."
        />
      </div>
      <Button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gradient-to-r from-[#8A6F28] to-[#C9A84C] text-black font-semibold border-0 hover:opacity-90 transition-opacity"
      >
        {status === 'sending' ? 'Submitting...' : 'Submit Review'}
      </Button>
      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">Failed to submit review. Please try again.</p>
      )}
    </form>
  )
}

