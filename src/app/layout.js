import '../index.css';
import { headers } from 'next/headers';
import ClientLayout from '../components/layout/ClientLayout';
import FontAwesomeLoader from '../components/FontAwesomeLoader';

export const metadata = {
  title: 'Zambeel',
  description: 'Zambeel E-commerce Solutions',
  icons: {
    icon: '/favicon.webp',
    shortcut: '/favicon.webp',
    apple: '/favicon.webp',
  },
};

export default async function RootLayout({ children }) {
  // Middleware reads cookie and sets x-locale header
  // Server reads header to set language+direction before rendering
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body suppressHydrationWarning>
        <FontAwesomeLoader />
        <div className="min-h-screen flex flex-col bg-transparent">
          <ClientLayout initialLocale={locale}>
            {children}
          </ClientLayout>
        </div>
      </body>
    </html>
  );
}


