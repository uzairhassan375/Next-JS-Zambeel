'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogListingPage({ blogs = [] }) {
  const { t, i18n } = useTranslation();
  const isArabic = (i18n.language || '').startsWith('ar');

  // Get content based on language - prefer Arabic if available and has content
  // If Arabic is selected but Arabic content is empty, fallback to English
  const getTitle = (blog) => {
    const titleAr = blog.titleAr?.trim() || '';
    if (isArabic && titleAr) {
      return blog.titleAr;
    }
    return blog.titleEn || blog.slug;
  };
  const getDesc = (blog) => {
    const descAr = blog.descriptionAr?.trim() || '';
    if (isArabic && descAr) {
      return blog.descriptionAr;
    }
    return blog.descriptionEn || '';
  };
  const getImg = (blog) => {
    const arImg = blog.imageAr?.trim?.() || '';
    if (isArabic && arImg) {
      return blog.imageAr;
    }
    return blog.image || '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-16">
        <section
          className="w-full py-12 sm:py-16 lg:py-20"
          style={{ backgroundColor: '#F5FCFF' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] text-center mb-6">
              {t('blog.title', { defaultValue: 'Blogs' })}
            </h1>
            <p className="text-center text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto">
              {t('blog.subtitle', {
                defaultValue: 'Learn more about Zambeel and our services',
              })}
            </p>
            <p className="text-center text-sm sm:text-base text-gray-600 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed">
              {t('blog.intro')}
            </p>

            {blogs.length === 0 ? (
              <p className="text-center text-gray-500">No blogs yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {blogs.map((blog) => (
                  <Link
                    key={blog.slug}
                    href={`/blog/${blog.slug}`}
                    className="group flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="relative w-full aspect-[16/10] bg-gray-100 flex items-center justify-center overflow-hidden">
                      {getImg(blog) ? (
                        <Image
                          src={getImg(blog)}
                          alt={getTitle(blog)}
                          width={500}
                          height={320}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          unoptimized={
                            getImg(blog)?.startsWith('http') ||
                            getImg(blog)?.startsWith('/api') ||
                            getImg(blog)?.startsWith('data:')
                          }
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No image</span>
                      )}
                    </div>
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <h3 className="text-lg sm:text-xl font-bold leading-7 min-h-[3.5rem] text-[#1e3a8a] mb-2 group-hover:text-[#FCD64C] transition-colors line-clamp-2">
                        {getTitle(blog)}
                      </h3>
                      <p className="text-sm sm:text-base leading-6 min-h-[3rem] text-gray-700 line-clamp-2">
                        {getDesc(blog)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
