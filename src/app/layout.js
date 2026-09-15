import '../index.css';
import { Suspense } from 'react';
import { headers, cookies } from 'next/headers';
import ClientLayout from '../components/layout/ClientLayout';
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import MetaPixel from '../components/meta/MetaPixel';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';
import {
  getClientIpFromHeaders,
  getEventSourceUrlFromHeaders,
  sendMetaPageView,
} from '../lib/metaCapi';

const FONT_AWESOME_HREF =
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Zambeel',
  description: 'Zambeel E-commerce Solutions',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.png', sizes: '200x200', type: 'image/png' },
      { url: '/favicon.webp', sizes: '200x200', type: 'image/webp' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon-192.png',
  },
  openGraph: {
    siteName: 'Zambeel',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function RootLayout({ children }) {
  // Middleware reads cookie and sets x-locale header
  // Server reads header to set language+direction before rendering
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const pathname = headersList.get('x-pathname') || '/';
  const isAdmin = pathname.startsWith('/admin');

  // One shared event_id for Pixel + CAPI deduplication on this server render
  const metaEventId = crypto.randomUUID();

  if (!isAdmin) {
    const cookieStore = await cookies();
    // Fire-and-forget so Meta latency does not block HTML
    void sendMetaPageView({
      eventId: metaEventId,
      eventSourceUrl: getEventSourceUrlFromHeaders(headersList),
      clientIpAddress: getClientIpFromHeaders(headersList),
      clientUserAgent: headersList.get('user-agent') || '',
      fbp: cookieStore.get('_fbp')?.value,
      fbc: cookieStore.get('_fbc')?.value,
    });
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Font Awesome in the initial HTML: loading it from a client effect
            delayed every icon on the page. */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href={FONT_AWESOME_HREF}
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body suppressHydrationWarning>
        {!isAdmin ? (
          <Suspense fallback={null}>
            <MetaPixel initialEventId={metaEventId} />
          </Suspense>
        ) : null}
        <OrganizationSchema />
        <LocalBusinessSchema />
        <div className="min-h-screen flex flex-col bg-transparent">
          <ClientLayout initialLocale={locale}>
            {children}
          </ClientLayout>
        </div>
      </body>
    </html>
  );
}
