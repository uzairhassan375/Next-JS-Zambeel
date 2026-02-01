import '../../index.css';
import ClientLayout from '../../components/layout/ClientLayout';
import FontAwesomeLoader from '../../components/FontAwesomeLoader';

export const metadata = {
  title: 'Zambeel',
  description: 'Zambeel E-commerce Solutions',
  icons: {
    icon: '/favicon.webp',
    shortcut: '/favicon.webp',
    apple: '/favicon.webp',
  },
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default function LocaleLayout({ children, params }) {
  const locale = params.locale || 'en';
  const validLocale = (locale === 'en' || locale === 'ar') ? locale : 'en';
  
  return (
    <html lang={validLocale} dir={validLocale === 'ar' ? 'rtl' : 'ltr'}>
      <body suppressHydrationWarning>
        <FontAwesomeLoader />
        <div className="min-h-screen flex flex-col bg-transparent">
          <ClientLayout initialLocale={validLocale}>
            {children}
          </ClientLayout>
        </div>
      </body>
    </html>
  );
}
