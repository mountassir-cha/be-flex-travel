import { createClient } from '@/utils/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminInquiriesPage() {
  const supabase = await createClient()

  const { data: inquiries, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load inquiries', error)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-bold text-foreground">Inquiries</h1>
      
      {(!inquiries || inquiries.length === 0) ? (
        <div className="p-8 text-center text-foreground/50 bg-card rounded-2xl border border-[var(--brand-gold)]/10">
          No inquiries received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {inquiries.map((inq) => (
            <Card key={inq.id} className="bg-card border-[var(--brand-gold)]/20">
              <CardHeader className="pb-3 flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">{inq.name}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    {new Date(inq.created_at).toLocaleString()}
                  </div>
                </div>
                <Badge variant="outline" className="border-[var(--brand-gold)] text-[var(--brand-gold)]">
                  {inq.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-foreground/80">
                  <div><strong>Email:</strong> <a href={`mailto:${inq.email}`} className="text-[#C9A84C] hover:underline">{inq.email}</a></div>
                  <div><strong>Phone:</strong> {inq.phone || 'N/A'}</div>
                  {inq.activity_ref && (
                    <div className="md:col-span-2"><strong>Interested in:</strong> {inq.activity_ref}</div>
                  )}
                </div>
                <div className="p-4 bg-foreground/5 rounded-lg text-foreground/90 text-sm whitespace-pre-wrap">
                  {inq.message}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
