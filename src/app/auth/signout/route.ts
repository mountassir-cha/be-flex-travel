import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.redirect(new URL('/admin?error=Could not sign out', request.url))
  }

  return NextResponse.redirect(new URL('/admin/login', request.url))
}
