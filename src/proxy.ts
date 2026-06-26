import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
 
const handleI18nRouting = createIntlMiddleware(routing);
 
export default async function middleware(request: NextRequest) {
  // 1. Update Supabase session
  const response = await updateSession(request);
  
  // 2. Handle internationalization
  return handleI18nRouting(request);
}
 
export const config = {
  matcher: [
    // Combine both matchers
    '/', 
    '/(en|fr|es)/:path*',
    '/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
