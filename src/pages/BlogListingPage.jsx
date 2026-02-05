'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { blogList } from '../data/blogs/index';

export default function BlogListingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-16">
        <section className="w-full py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#F5FCFF' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] text-center mb-6">
              {t('blog.title', { defaultValue: 'Blogs' })}
            </h1>
            <p className="text-center text-base sm:text-lg text-gray-700 mb-12 sm:mb-16">
              {t('blog.subtitle', { defaultValue: 'Learn more about Zambeel and our services' })}
            </p>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogList.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="group flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
                >
                  <div className="relative w-full aspect-[16/10] bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={blog.img}
                      alt={t(blog.titleKey)}
                      width={500}
                      height={320}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1e3a8a] mb-2 group-hover:text-[#FCD64C] transition-colors">
                      {t(blog.titleKey)}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 line-clamp-2">
                      {t(blog.descKey)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

