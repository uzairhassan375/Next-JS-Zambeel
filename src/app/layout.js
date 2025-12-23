import '../index.css';
import ClientLayout from './components/ClientLayout';
import FontAwesomeLoader from '../components/FontAwesomeLoader';

export const metadata = {
  title: 'Zambeel',
  description: 'Zambeel E-commerce Solutions',
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


