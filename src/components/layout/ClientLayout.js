'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import I18nProvider from '../I18nProvider';
import Header from '../Header';
import Footer from '../Footer';
import WhatsAppPopup from '../WhatsAppPopup';
import WhatsAppFloat from '../WhatsAppFloat';

export default function ClientLayout({ children, initialLocale }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // Admin dashboard: no site header/footer or WhatsApp
  if (isAdmin) {
    return <>{children}</>;
  }

  // Check for pages that need padding (both English and Arabic routes)
  const shouldHavePadding = pathname === "/" || pathname === "/ar" || 
    pathname === "/about" || pathname === "/ar/about" ||
    pathname === "/team" || pathname === "/ar/team";
  
  // Check for pages that need light theme (both English and Arabic routes)
  const isLightThemePage = 
    pathname === "/pages/zambeel-360" || pathname === "/ar/pages/zambeel-360" ||
    pathname === "/pages/dropshipping-uae-and-ksa" || pathname === "/ar/pages/dropshipping-uae-and-ksa" ||
    pathname === "/pages/us-dropshipping" || pathname === "/ar/pages/us-dropshipping" ||
    pathname === "/pages/warehousing-3pl" || pathname === "/ar/pages/warehousing-3pl" ||
    pathname === "/pages/partner-agencies" || pathname === "/ar/pages/partner-agencies" ||
    pathname === "/learn-ecommerce" || pathname === "/ar/learn-ecommerce";

  const shouldHideWhatsAppFloat =
    pathname === "/pages/us-dropshipping" || pathname === "/ar/pages/us-dropshipping";
  
  const theme = isLightThemePage ? "light" : "dark";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <I18nProvider initialLocale={initialLocale}>
      <WhatsAppPopup />
      {!shouldHideWhatsAppFloat && <WhatsAppFloat />}
      <Header theme={theme} />
      <main className={`flex-grow bg-transparent ${shouldHavePadding ? "pt-20" : ""}`}>
        {children}
      </main>
      <div className="w-full" style={{ backgroundColor: '#4F66C8' }}>
        <Footer />
      </div>
    </I18nProvider>
  );
}

