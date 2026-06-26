import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // You might want to pass error message to the page
    return NextResponse.redirect(new URL('/admin/login?error=Could not authenticate user', request.url))
  }

  return NextResponse.redirect(new URL('/admin', request.url))
}
