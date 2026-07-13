import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RatingStars } from '@/components/ui/RatingStars'

export default async function AdminReviewsPage() {
  const supabase = await createClient()

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load reviews', error)
  }

  async function toggleApproval(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const approved = formData.get('approved') === 'true'
    
    const supabaseAction = await createClient()
    await supabaseAction.from('reviews').update({ approved: !approved }).eq('id', id)
    
    revalidatePath('/admin/reviews')
    revalidatePath('/reviews')
  }

  async function deleteReview(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    
    const supabaseAction = await createClient()
    await supabaseAction.from('reviews').delete().eq('id', id)
    
    revalidatePath('/admin/reviews')
    revalidatePath('/reviews')
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-bold text-foreground">Manage Reviews</h1>
      
      {(!reviews || reviews.length === 0) ? (
        <div className="p-8 text-center text-foreground/50 bg-card rounded-2xl border border-[var(--brand-gold)]/10">
          No reviews received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-card border-[var(--brand-gold)]/20 flex flex-col">
              <CardHeader className="pb-3 flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-bold text-foreground">{review.author_name}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
                <Badge variant={review.approved ? "default" : "secondary"} className={review.approved ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                  {review.approved ? 'Approved' : 'Pending'}
                </Badge>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <RatingStars rating={review.rating} size="sm" />
                  <span className="text-xs text-foreground/50 capitalize ml-auto">{review.source}</span>
                </div>
                <div className="p-4 bg-foreground/5 rounded-lg text-foreground/80 text-sm italic flex-1 mb-4">
                  &ldquo;{review.text}&rdquo;
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <form action={toggleApproval} className="flex-1">
                    <input type="hidden" name="id" value={review.id} />
                    <input type="hidden" name="approved" value={review.approved.toString()} />
                    <Button type="submit" variant="outline" className="w-full border-[var(--brand-gold)]/30 text-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/10">
                      {review.approved ? 'Unapprove' : 'Approve'}
                    </Button>
                  </form>
                  <form action={deleteReview} className="flex-1">
                    <input type="hidden" name="id" value={review.id} />
                    <Button type="submit" variant="destructive" className="w-full">
                      Delete
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
