'use client';

import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogs } from '../data/blogs/index';
import { getLocalePath } from '../lib/localeUtils';

export default function BlogDetailPage({ slug }) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const blog = blogs[slug];

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

            {/* Blog Image */}
            <div className="relative rounded-lg overflow-hidden shadow-lg mb-8 h-64 sm:h-96">
              <Image
                src={blog.img}
                alt={t(blog.titleKey)}
                fill
                className="object-cover"
              />
            </div>

            {/* Blog Content */}
            <article>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-6">
                {t(blog.titleKey)}
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {t(blog.descKey)}
                </p>
                
                <div className="text-base text-gray-600 leading-relaxed space-y-6">
                  {blog.content ? (
                    <div className="whitespace-pre-line">
                      {blog.content.split('\n').map((line, index) => {
                        if (line.startsWith('## ')) {
                          return (
                            <h2 key={index} className="text-2xl font-bold text-[#1e3a8a] mt-8 mb-4">
                              {line.replace('## ', '')}
                            </h2>
                          );
                        }
                        if (line.trim().startsWith('- ')) {
                          return (
                            <li key={index} className="ml-6 list-disc">
                              {line.replace('- ', '')}
                            </li>
                          );
                        }
                        if (line.trim() === '') {
                          return <br key={index} />;
                        }
                        return (
                          <p key={index} className="mb-4">
                            {line}
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

