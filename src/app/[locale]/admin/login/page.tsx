import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#080808]">
      <div className="w-full max-w-sm p-8 rounded-2xl glass border border-[var(--brand-gold)]/20">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-muted-foreground text-sm mt-2">Sign in to manage Be Flex Travel</p>
        </div>

        <form className="space-y-4" action="/auth/login" method="post">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="admin@beflextravel.com"
              className="bg-white/5 border-white/10 text-white focus:border-[var(--brand-gold)]/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="bg-white/5 border-white/10 text-white focus:border-[var(--brand-gold)]/50"
            />
          </div>
          
          <Button type="submit" className="w-full bg-gradient-to-r from-[#8A6F28] to-[#C9A84C] text-black font-bold border-0 mt-6 hover:opacity-90">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}
