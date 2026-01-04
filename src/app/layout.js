import '../index.css';
import { cookies } from 'next/headers';
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
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('zambeel-locale')?.value;
  const locale = (savedLocale === 'en' || savedLocale === 'ar') ? savedLocale : 'en';
  
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


