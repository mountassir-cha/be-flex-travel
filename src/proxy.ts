import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
 
const handleI18nRouting = createIntlMiddleware(routing);
 
export default async function proxy(request: NextRequest) {
  // 1. Update Supabase session
  const response = await updateSession(request);
  
  // If the response from supabase is a redirect (e.g. redirecting to /admin/login), return it immediately
  if (response.headers.get('location')) {
    return response;
  }
  
  // 2. Handle internationalization
  const i18nResponse = handleI18nRouting(request);
  
  // Copy cookies from Supabase response to next-intl response
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      i18nResponse.headers.append(key, value);
    }
  });

  return i18nResponse;
}
 
export const config = {
  matcher: [
    // Combine both matchers
    '/', 
    '/(en|fr|es|it|de|zgh)/:path*',
    '/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
