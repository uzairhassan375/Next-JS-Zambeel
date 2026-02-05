'use client';

import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { blogs } from '../data/blogs/index';
import { getLocalePath } from '../lib/localeUtils';

// Renders text with **bold** converted to <strong>
function renderWithBold(text) {
  if (!text || typeof text !== 'string') return text;
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);
}

export default function BlogDetailPage({ slug }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const isArabic = (i18n.language || '').startsWith('ar');

  const blog = blogs[slug];
  const blogContent = blog && (isArabic && blog.contentAr ? blog.contentAr : blog.content);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
            <Link href={getLocalePath('/blog', pathname)} className="text-blue-600 hover:underline">
              Back to Blog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-16">
        <section className="w-full py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#F5FCFF' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Back Button */}
            <Link
              href={getLocalePath('/blog', pathname)}
              className="inline-flex items-center gap-2 text-[#1e3a8a] hover:text-[#FCD64C] mb-8 transition-colors"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>{t('blog.backToBlog', { defaultValue: 'Back to Blog' })}</span>
            </Link>

            {/* Blog Image - full height visible, no cropping */}
            <div className="w-full rounded-lg overflow-hidden shadow-lg mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.img}
                alt={t(blog.titleKey)}
                className="w-full h-auto block"
              />
            </div>

            {/* Blog Content */}
            <article dir={isArabic ? 'rtl' : 'ltr'} className={isArabic ? 'text-right' : ''}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-6">
                {t(blog.titleKey)}
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {t(blog.descKey)}
                </p>
                
                <div className="text-base text-gray-600 leading-relaxed space-y-6">
                  {blogContent ? (
                    <div className="whitespace-pre-line">
                      {blogContent.split('\n').map((line, index) => {
                        if (line.startsWith('## ')) {
                          return (
                            <h2 key={index} className="text-2xl font-bold text-[#1e3a8a] mt-8 mb-4">
                              {renderWithBold(line.replace('## ', ''))}
                            </h2>
                          );
                        }
                        if (line.startsWith('### ')) {
                          return (
                            <h3 key={index} className="text-xl font-semibold text-[#1e3a8a] mt-6 mb-3">
                              {renderWithBold(line.replace('### ', ''))}
                            </h3>
                          );
                        }
                        if (line.trim().startsWith('- ')) {
                          return (
                            <li key={index} className="ml-6 list-disc">
                              {renderWithBold(line.replace(/^- /, ''))}
                            </li>
                          );
                        }
                        if (line.trim() === '') {
                          return <br key={index} />;
                        }
                        return (
                          <p key={index} className="mb-4">
                            {renderWithBold(line)}
                          </p>
                        );
                      })}
                    </div>
                  ) : (
                    <p>
                      {t(blog.contentKey, {
                        defaultValue: 'This is a detailed blog post about ' + t(blog.titleKey) + '. More content will be added here.',
                      })}
                    </p>
                  )}
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

