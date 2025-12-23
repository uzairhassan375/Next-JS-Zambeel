'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import I18nProvider from '../../components/I18nProvider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppPopup from '../../components/WhatsAppPopup';
import WhatsAppFloat from '../../components/WhatsAppFloat';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const shouldHavePadding = pathname === "/" || pathname === "/about" || pathname === "/team";
  const theme = pathname === "/zambeel-360" || pathname === "/dropshipping" || pathname === "/zambeel-3pl" || pathname === "/learn-ecommerce" ? "light" : "dark";

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


