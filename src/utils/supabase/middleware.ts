import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  let user = null
  try {
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser()
    user = supabaseUser
  } catch (error) {
    console.error('Supabase middleware auth error:', error)
  }

  // Parse locale and check if the path is an admin path
  const pathname = request.nextUrl.pathname
  const localeMatch = pathname.match(/^\/(en|fr|es|it|de|zgh)(\/|$)/)
  const locale = localeMatch ? localeMatch[1] : null
  const pathWithoutLocale = locale ? pathname.replace(/^\/(en|fr|es|it|de|zgh)/, '') : pathname

  if (
    !user &&
    pathWithoutLocale.startsWith('/admin') &&
    pathWithoutLocale !== '/admin/login'
  ) {
    const url = request.nextUrl.clone()
    url.pathname = locale ? `/${locale}/admin/login` : '/admin/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
