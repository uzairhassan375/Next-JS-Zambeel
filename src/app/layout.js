import '../index.css';
import { headers } from 'next/headers';
import ClientLayout from '../components/layout/ClientLayout';
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

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
