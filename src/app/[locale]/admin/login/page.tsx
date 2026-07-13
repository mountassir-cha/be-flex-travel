import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function LoginPage() {
  const supabase = await createClient()
  let user = null
  try {
    const { data: { user: supabaseUser } } = await supabase.auth.getUser()
    user = supabaseUser
  } catch (error) {
    console.error('Login page Supabase auth error:', error)
  }

  if (user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm p-8 rounded-2xl glass border border-[var(--brand-gold)]/20">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground text-sm mt-2">Sign in to manage Be Flex Travel</p>
        </div>

        <form className="space-y-4" action="/auth/login" method="post">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/80">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="admin@beflextravel.com"
              className="bg-foreground/5 border-border text-foreground focus:border-[var(--brand-gold)]/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="bg-foreground/5 border-border text-foreground focus:border-[var(--brand-gold)]/50"
            />
          </div>
          
          <Button type="submit" className="w-full bg-gradient-to-r from-brand-gold-dark to-brand-gold text-black font-bold border-0 mt-6 hover:opacity-90">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}
