import { NextResponse } from 'next/server';

const SITE_HOST = 'www.myzambeel.com';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Canonicalize to www (matches sitemap, robots, and businessInfo)
  if (
    hostname === 'myzambeel.com' ||
    (hostname.endsWith('.myzambeel.com') && !hostname.startsWith('www.'))
  ) {
    url.hostname = SITE_HOST;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = url;
  const locale = pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|favicon.webp|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webm|mp4|woff2?)$).*)',
  ],
};
