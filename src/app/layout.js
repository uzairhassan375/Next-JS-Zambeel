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
  // Read cookie BEFORE rendering - this is the flow: request → read cookie → set language+direction → render page
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('lang')?.value;
  const locale = (langCookie === 'en' || langCookie === 'ar') ? langCookie : 'en';
  
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


