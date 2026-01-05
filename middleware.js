import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Determine locale from URL path
  const isArabicRoute = pathname.startsWith('/ar');
  const urlLocale = isArabicRoute ? 'ar' : 'en';
  
  // Read cookie to get saved preference
  const langCookie = request.cookies.get('lang')?.value;
  const savedLocale = (langCookie === 'en' || langCookie === 'ar') ? langCookie : 'en';
  
  // Use URL locale (URL is source of truth for routing)
  const locale = urlLocale;
  
  // Set headers for locale (can be read by layout)
  const response = NextResponse.next();
  response.headers.set('x-locale', locale);
  
  // Update cookie if it doesn't match the URL locale
  if (savedLocale !== locale) {
    response.cookies.set('lang', locale, {
      path: '/',
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: 'lax',
    });
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};


