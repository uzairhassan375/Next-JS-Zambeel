'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import I18nProvider from '../I18nProvider';
import Header from '../Header';
import Footer from '../Footer';
import WhatsAppPopup from '../WhatsAppPopup';
import WhatsAppFloat from '../WhatsAppFloat';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const shouldHavePadding = pathname === "/" || pathname === "/about" || pathname === "/team";
  const theme = pathname === "/pages/zambeel-360" || pathname === "/pages/dropshipping-uae-and-ksa" || pathname === "/pages/warehousing-3pl" || pathname === "/learn-ecommerce" ? "light" : "dark";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <I18nProvider>
      <WhatsAppPopup />
      <WhatsAppFloat />
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

