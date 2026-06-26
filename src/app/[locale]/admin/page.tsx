import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, MessageSquare, Star, Map } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch some basic stats (if the tables were populated)
  // For now, we will just count all rows or show 0 if empty
  const { count: activitiesCount } = await supabase.from('activities').select('*', { count: 'exact', head: true })
  const { count: excursionsCount } = await supabase.from('excursions').select('*', { count: 'exact', head: true })
  const { count: inquiriesCount } = await supabase.from('inquiries').select('*', { count: 'exact', head: true })
  const { count: reviewsCount } = await supabase.from('reviews').select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-bold text-white">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#111111] border-[var(--brand-gold)]/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Inquiries</CardTitle>
            <MessageSquare className="w-4 h-4 text-[var(--brand-gold)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{inquiriesCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Total messages received</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-[var(--brand-gold)]/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Reviews</CardTitle>
            <Star className="w-4 h-4 text-[var(--brand-gold)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{reviewsCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Total reviews submitted</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-[var(--brand-gold)]/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Activities</CardTitle>
            <Activity className="w-4 h-4 text-[var(--brand-gold)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activitiesCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Active on website</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-[var(--brand-gold)]/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Excursions</CardTitle>
            <Map className="w-4 h-4 text-[var(--brand-gold)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{excursionsCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Active on website</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="rounded-2xl glass border border-[var(--brand-gold)]/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Inquiries</h2>
          <div className="text-sm text-white/50">Navigate to the Inquiries tab to view and manage leads.</div>
        </div>
        <div className="rounded-2xl glass border border-[var(--brand-gold)]/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Pending Reviews</h2>
          <div className="text-sm text-white/50">Navigate to the Reviews tab to approve or reject customer testimonials.</div>
        </div>
      </div>
    </div>
  )
}
