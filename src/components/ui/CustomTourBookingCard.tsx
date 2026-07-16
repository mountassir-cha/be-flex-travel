'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function CustomTourBookingCard() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    circuit: '',
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
      const res = await fetch('/api/tour-booking', {
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
        <p className="text-sm text-muted-foreground">We&apos;ll confirm your tour by email within a few hours.</p>
        <button
          onClick={() => { setStatus('idle'); setIsOpen(false); setForm({ name: '', email: '', phone: '', circuit: '', date: '', passengers: '1', notes: '' }) }}
          className="text-xs text-[var(--brand-gold)] underline mt-2"
        >
          Book another tour
        </button>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="p-5 rounded-2xl border-2 border-dashed border-[var(--brand-gold)]/30 hover:border-[var(--brand-gold)]/60 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3 min-h-[240px] text-center group w-full"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold-dark to-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform">
          <MapPin className="w-6 h-6 text-black" />
        </div>
        <div>
          <div className="font-display font-bold text-foreground mb-1">Custom Tour / Circuit</div>
          <p className="text-xs text-muted-foreground">Choose one of our proposals or create your own custom trip</p>
        </div>
        <span className="text-xs text-[var(--brand-gold)] font-medium mt-1">Click to book →</span>
      </div>
    )
  }

  return (
    <div className="p-5 rounded-2xl glass border border-[var(--brand-gold)]/40 transition-all duration-300 w-full">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="outline" className="border-[var(--brand-gold)]/40 text-[var(--brand-gold)] text-xs">
          🗺️ Custom Circuit
        </Badge>
        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Label className="text-foreground/70 text-xs mb-1 block">Circuit / Cities *</Label>
            <select
              required
              value={form.circuit}
              onChange={(e) => setForm({ ...form, circuit: e.target.value })}
              className="w-full bg-foreground/5 border border-border text-foreground text-sm h-9 px-3 rounded-md focus:outline-none focus:border-[var(--brand-gold)]/50 transition-colors"
            >
              <option value="" disabled>Select a starting city...</option>
              {['Marrakech', 'Casablanca', 'Fes', 'Tanger', 'Agadir', 'Rabat', 'Ouarzazate', 'Essaouira'].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
              <option value="Other">Other / Not Listed</option>
            </select>
          </div>
          <div>
            <Label className="text-foreground/70 text-xs mb-1 block">Date *</Label>
            <Input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 text-sm h-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <Label className="text-foreground/70 text-xs mb-1 block">Your Name *</Label>
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Doe"
              className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 text-sm h-9"
            />
          </div>
          <div className="col-span-1">
            <Label className="text-foreground/70 text-xs mb-1 block">Passengers</Label>
            <select
              value={form.passengers}
              onChange={(e) => setForm({ ...form, passengers: e.target.value })}
              className="w-full bg-foreground/5 border border-border text-foreground text-sm h-9 px-3 rounded-md focus:outline-none focus:border-[var(--brand-gold)]/50 transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
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
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+212..."
              className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 text-sm h-9"
            />
          </div>
        </div>

        <div>
          <Label className="text-foreground/70 text-xs mb-1 block">Notes / Custom Cities</Label>
          <Textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="List any specific cities you want to visit or special requests..."
            className="bg-foreground/5 border-border text-foreground placeholder:text-muted-foreground/30 focus:border-[var(--brand-gold)]/50 text-sm min-h-[60px] resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={status === 'sending'}
          className="w-full h-10 bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black font-bold hover:opacity-90 transition-all mt-2"
        >
          {status === 'sending' ? 'Sending...' : 'Send Booking Request'}
        </Button>
        {status === 'error' && (
          <p className="text-xs text-red-500 text-center mt-2">Failed to send. Please try again or use WhatsApp.</p>
        )}
      </form>
    </div>
  )
}
