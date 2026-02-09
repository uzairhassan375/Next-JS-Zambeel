import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center pt-16">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-[#1e3a8a] mb-4">
            Blog post not found
          </h1>
          <p className="text-gray-600 mb-6">
            The blog post you’re looking for doesn’t exist or was removed.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#1e3a8a] hover:text-[#FCD64C] font-medium transition-colors"
          >
            <span>←</span> Back to Blog
          </Link>
        </div>
      </main>
    </div>
  );
}
