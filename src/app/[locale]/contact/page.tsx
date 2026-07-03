'use client'

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import { ArrowRight, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ContactForm() {
  const searchParams = useSearchParams()
  const activityParam = searchParams.get('activity') || ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: activityParam ? `Hi, I'd like to book: ${activityParam}\n\n` : '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          activityParam,
        }),
      })

      if (response.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
        console.error('Submission failed')
      }
    } catch (error) {
      setStatus('error')
      console.error('Error submitting form:', error)
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-5xl">🎉</div>
        <h3 className="font-display text-2xl font-bold text-foreground">Message Sent!</h3>
        <p className="text-muted-foreground">
          Thank you! We&apos;ll get back to you within 2 hours via email or WhatsApp.
        </p>
        <Button asChild variant="outline" className="border-border text-foreground hover:bg-foreground/5 mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {activityParam && (
        <div className="glass border border-[var(--brand-gold)]/30 rounded-xl p-4 text-sm text-[var(--brand-gold)]">
          📎 Enquiring about: <strong>{activityParam}</strong>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground/80 text-sm">Full Name *</Label>
          <Input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 focus:ring-[var(--brand-gold)]/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground/80 text-sm">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 focus:ring-[var(--brand-gold)]/20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground/80 text-sm">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+33 6 12345678"
          className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 focus:ring-[var(--brand-gold)]/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground/80 text-sm">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your trip — dates, group size, activities of interest..."
          rows={5}
          className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 focus:ring-[var(--brand-gold)]/20 resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black font-semibold border-0 hover:opacity-90 transition-opacity"
        size="lg"
      >
        {status === 'sending' ? (
          'Sending...'
        ) : (
          <>
            Send Message <Send className="ml-2 w-4 h-4" />
          </>
        )}
      </Button>

      {status === 'error' && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
          Oops, something went wrong. Please try again or message us on WhatsApp.
        </div>
      )}

      <p className="text-xs text-center text-muted-foreground">
        Or reach us directly on{' '}
        <a href="https://wa.me/0766908381" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
          WhatsApp
        </a>{' '}
        — we reply within 2 hours.
      </p>
    </form>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: info */}
            <div>
              <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-4">
                Get In Touch
              </Badge>
              <h1 className="font-display text-5xl font-bold text-foreground mb-4">
                Plan Your <span className="text-gradient-gold">Morocco</span> Trip
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Whether you know exactly what you want or need inspiration — we&apos;re here to help.
                Send us a message and we&apos;ll craft a personalised itinerary, with no obligation.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { emoji: '⚡', title: 'Fast response', desc: 'We reply within 2 hours, 7 days a week.' },
                  { emoji: '🎯', title: 'Tailored to you', desc: 'Every itinerary is custom-built for your group.' },
                  { emoji: '💬', title: 'WhatsApp friendly', desc: 'Chat with us directly on WhatsApp anytime.' },
                  { emoji: '🔒', title: 'No pressure', desc: 'Free quotes, no obligation to book.' },
                ].map(({ emoji, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 p-4 rounded-xl glass border border-border">
                    <span className="text-2xl shrink-0">{emoji}</span>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{title}</div>
                      <div className="text-muted-foreground text-sm">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/0766908381"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                <div>
                  <div className="font-semibold text-sm">WhatsApp Us Now</div>
                  <div className="text-xs text-[#25D366]/70">0766908381</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </a>
            </div>

            {/* Right: form */}
            <div className="rounded-2xl glass border border-border p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send a Message</h2>
              <Suspense fallback={<div className="text-muted-foreground/50">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

