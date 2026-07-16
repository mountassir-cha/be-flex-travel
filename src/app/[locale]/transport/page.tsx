'use client'

import { useState } from 'react'
import { ArrowRight, Car, Clock, MapPin, Send, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { transportRoutes } from '@/lib/data'
import { Link } from '@/i18n/routing'

const typeLabels: Record<string, string> = {
  airport_transfer: '✈️ Airport Transfer',
  one_way: '→ One Way',
  round_trip: '⇄ Round Trip',
  point_to_point: '📍 City Transfer',
}

export default function TransportPage() {
  const airportRoutes = transportRoutes.filter((r) => r.type === 'airport_transfer')
  const cityRoutes = transportRoutes.filter((r) => r.type !== 'airport_transfer')

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] mb-3">
            Private Transport
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            Transfers &amp; <span className="text-gradient-gold">Transport</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Comfortable, private, and punctual. All vehicles are air-conditioned, driven by licensed professionals.
            We monitor your flight — delays won&apos;t leave you stranded.
          </p>
        </div>

        {/* Why private transfer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { emoji: '🚗', label: 'Private vehicle — just your group' },
            { emoji: '✈️', label: 'Flight monitoring included' },
            { emoji: '💧', label: 'Water & Wi-Fi on board' },
            { emoji: '📍', label: 'Door-to-door service' },
          ].map(({ emoji, label }) => (
            <div key={label} className="p-4 rounded-xl glass border border-border text-center">
              <div className="text-2xl mb-2">{emoji}</div>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Airport Transfers */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded bg-[var(--brand-gold)] inline-block" />
            Airport Transfers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {airportRoutes.map((route) => (
              <div key={route.id} className="p-5 rounded-2xl glass border border-border hover:border-[var(--brand-gold)]/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                    {typeLabels[route.type]}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-foreground font-medium text-sm truncate">{route.origin}</div>
                  </div>
                  <div className="shrink-0">
                    <ArrowRight className="w-4 h-4 text-[var(--brand-gold)]" />
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <div className="text-foreground font-medium text-sm truncate">{route.destination}</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground mb-5">
                  <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> {route.duration}</div>
                  <div className="flex items-start gap-2"><Car className="w-3 h-3 shrink-0 mt-0.5" /> {route.notes}</div>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-brand-gold-dark to-brand-gold text-white border-0 hover:opacity-90 text-sm" size="sm">
                  <Link href={`/contact?activity=Transfer: ${encodeURIComponent(route.origin + ' → ' + route.destination)}`}>
                    Book Transfer
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* City-to-City */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 rounded bg-[var(--brand-gold)] inline-block" />
            City-to-City Transfers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cityRoutes.map((route) => (
              <div key={route.id} className="p-5 rounded-2xl glass border border-border hover:border-[var(--brand-gold)]/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                    {typeLabels[route.type]}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-foreground font-medium text-sm">{route.origin}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--brand-gold)] shrink-0" />
                  <div className="flex-1 min-w-0 text-right">
                    <div className="text-foreground font-medium text-sm">{route.destination}</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground mb-5">
                  <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> {route.duration}</div>
                  <div className="flex items-start gap-2"><Car className="w-3 h-3 shrink-0 mt-0.5" /> {route.notes}</div>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-brand-gold-dark to-brand-gold text-white border-0 hover:opacity-90 text-sm" size="sm">
                  <Link href={`/contact?activity=Transfer: ${encodeURIComponent(route.origin + ' → ' + route.destination)}`}>
                    Book Transfer
                  </Link>
                </Button>
              </div>
            ))}

            {/* Custom booking card */}
            <CustomBookingCard />
          </div>
        </section>

        {/* Custom transfer CTA */}
        <div className="p-8 rounded-3xl glass border border-border text-center max-w-2xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">Need a Custom Route?</h3>
          <p className="text-muted-foreground mb-6">
            Don&apos;t see your destination? We offer point-to-point transfers anywhere in Morocco. Just ask.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-to-r from-brand-gold-dark to-brand-gold text-white border-0">
              <Link href="/contact?activity=Custom+Transfer">Request Custom Transfer</Link>
            </Button>
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-foreground/5">
              <a href="https://wa.me/212672770883" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CustomBookingCard() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',
    date: '',
    passengers: '1',
    notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/transport-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="p-5 rounded-2xl glass border border-[var(--brand-gold)]/40 flex flex-col items-center justify-center gap-3 min-h-[240px] text-center">
        <div className="text-4xl">✅</div>
        <h3 className="font-display text-lg font-bold text-foreground">Booking Received!</h3>
        <p className="text-sm text-muted-foreground">We&apos;ll confirm your transfer by email within a few hours.</p>
        <button
          onClick={() => { setStatus('idle'); setIsOpen(false); setForm({ name: '', email: '', phone: '', origin: '', destination: '', date: '', passengers: '1', notes: '' }) }}
          className="text-xs text-[var(--brand-gold)] underline mt-2"
        >
          Book another transfer
        </button>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="p-5 rounded-2xl border-2 border-dashed border-[var(--brand-gold)]/30 hover:border-[var(--brand-gold)]/60 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3 min-h-[240px] text-center group"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold-dark to-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform">
          <MapPin className="w-6 h-6 text-black" />
        </div>
        <div>
          <div className="font-display font-bold text-foreground mb-1">Book Your Own Route</div>
          <p className="text-xs text-muted-foreground">Choose any origin &amp; destination — we go anywhere in Morocco</p>
        </div>
        <span className="text-xs text-[var(--brand-gold)] font-medium mt-1">Click to book →</span>
      </div>
    )
  }

  return (
    <div className="p-5 rounded-2xl glass border border-[var(--brand-gold)]/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] text-xs">
          🗺️ Custom Transfer
        </Badge>
        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-foreground/70 text-xs mb-1 block">From *</Label>
            <Input
              required
              value={form.origin}
              onChange={(e) => setForm({ ...form, origin: e.target.value })}
              placeholder="Marrakech..."
              className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 text-sm h-9"
            />
          </div>
          <div>
            <Label className="text-foreground/70 text-xs mb-1 block">To *</Label>
            <Input
              required
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              placeholder="Rabat..."
              className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 text-sm h-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-foreground/70 text-xs mb-1 block">Date *</Label>
            <Input
              type="date"
              required
              value={form.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-foreground/5 border-border text-foreground focus:border-[var(--brand-gold)]/50 text-sm h-9"
            />
          </div>
          <div>
            <Label className="text-foreground/70 text-xs mb-1 block flex items-center gap-1"><Users className="w-3 h-3" /> Passengers</Label>
            <select
              value={form.passengers}
              onChange={(e) => setForm({ ...form, passengers: e.target.value })}
              className="w-full h-9 rounded-md bg-foreground/5 border border-border text-foreground text-sm px-2 focus:outline-none focus:border-[var(--brand-gold)]/50"
            >
              {['1', '2', '3', '4', '5', '6+'].map(n => (
                <option key={n} value={n} className="bg-background">{n}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label className="text-foreground/70 text-xs mb-1 block">Your Name *</Label>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jane Doe"
            className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 text-sm h-9"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-foreground/70 text-xs mb-1 block">Email *</Label>
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@email.com"
              className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 text-sm h-9"
            />
          </div>
          <div>
            <Label className="text-foreground/70 text-xs mb-1 block">Phone / WhatsApp</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+212..."
              className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 text-sm h-9"
            />
          </div>
        </div>

        <div>
          <Label className="text-foreground/70 text-xs mb-1 block">Notes (optional)</Label>
          <Textarea
            rows={2}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Flight number, special requests..."
            className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 resize-none text-sm"
          />
        </div>

        <Button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black font-semibold border-0 hover:opacity-90 transition-opacity text-sm"
          size="sm"
        >
          {status === 'sending' ? (
            'Sending...'
          ) : (
            <span className="flex items-center gap-2"><Send className="w-3 h-3" /> Send Booking Request</span>
          )}
        </Button>

        {status === 'error' && (
          <p className="text-red-400 text-xs text-center">Failed to send. Please try again.</p>
        )}
      </form>
    </div>
  )
}
