import '../index.css';
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <FontAwesomeLoader />
        <div className="min-h-screen flex flex-col bg-transparent">
          <ClientLayout>
            {children}
          </ClientLayout>
        </div>
      </body>
    </html>
  );
}


