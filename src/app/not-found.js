import Link from 'next/link';

export const metadata = {
  title: 'Page not found - Zambeel',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center pt-16">
        <div className="text-center px-4">
          <p className="text-5xl font-bold text-[#FCD64C] mb-2">404</p>
          <h1 className="text-2xl font-bold text-[#1e3a8a] mb-4">
            Page not found
          </h1>
          <p className="text-gray-600 mb-6">
            The page you’re looking for doesn’t exist or was moved.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#1e3a8a] hover:text-[#FCD64C] font-medium transition-colors"
            >
              <span>←</span> Back to Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#1e3a8a] hover:text-[#FCD64C] font-medium transition-colors"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
