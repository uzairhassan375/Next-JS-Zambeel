import { NextResponse } from 'next/server';

export function middleware(request) {
  // Read cookie to decide locale
  const langCookie = request.cookies.get('lang')?.value;
  const locale = (langCookie === 'en' || langCookie === 'ar') ? langCookie : 'en';
  
  // Set headers for locale (can be read by layout)
  const response = NextResponse.next();
  response.headers.set('x-locale', locale);
  
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


