'use client';

import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { getLocalePath } from '../lib/localeUtils';

function renderWithBold(text) {
  if (!text || typeof text !== 'string') return text;
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function isHtml(content) {
  if (!content || typeof content !== 'string') return false;
  const trimmed = content.trim();
  return (
    trimmed.startsWith('<') &&
    (trimmed.includes('</') || trimmed.includes('/>'))
  );
}

function renderContent(blogContent) {
  if (!blogContent) return null;
  if (isHtml(blogContent)) {
    return (
      <div
        className="prose prose-lg max-w-none blog-content"
        dangerouslySetInnerHTML={{ __html: blogContent }}
      />
    );
  }
  return (
    <div className="whitespace-pre-line">
      {blogContent.split('\n').map((line, index) => {
        if (line.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="text-2xl font-bold text-[#1e3a8a] mt-8 mb-4"
            >
              {renderWithBold(line.replace('## ', ''))}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3
              key={index}
              className="text-xl font-semibold text-[#1e3a8a] mt-6 mb-3"
            >
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
  );
}

export default function BlogDetailPage({ post }) {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const isArabic = (i18n.language || '').startsWith('ar');

  // Ensure all links are properly styled and have title attributes displayed on hover
  useEffect(() => {
    const blogContent = document.querySelector('.blog-content, .prose');
    if (blogContent) {
      const links = blogContent.querySelectorAll('a');
      links.forEach((link) => {
        // Ensure links have proper styling classes
        if (!link.classList.contains('blog-link')) {
          link.classList.add('blog-link');
        }
        // Ensure links with target="_blank" have proper rel attribute for security
        if (link.target === '_blank' && !link.getAttribute('rel')) {
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });
    }
  }, [post]);

  if (!post) return null;

  // Get content based on language - prefer Arabic if available and has content
  // If Arabic is selected but Arabic content is empty, fallback to English
  const titleAr = post.titleAr?.trim() || '';
  const descAr = post.descriptionAr?.trim() || '';
  const contentAr = post.contentAr?.trim() || '';
  
  const title = isArabic && titleAr
    ? titleAr
    : (post.titleEn || post.slug);
  const desc = isArabic && descAr
    ? descAr
    : (post.descriptionEn || '');
  const blogContent = isArabic && contentAr
    ? post.contentAr  // Use original (with formatting) not trimmed
    : (post.contentEn || '');
  const img = isArabic && (post.imageAr?.trim() || '')
    ? post.imageAr
    : (post.image || '');

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-16">
        <section
          className="w-full py-12 sm:py-16 lg:py-20"
          style={{ backgroundColor: '#F5FCFF' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Link
              href={getLocalePath('/blog', pathname)}
              className="inline-flex items-center gap-2 text-[#1e3a8a] hover:text-[#FCD64C] mb-8 transition-colors"
            >
              <i className="fa-solid fa-arrow-left" />
              <span>
                {t('blog.backToBlog', { defaultValue: 'Back to Blog' })}
              </span>
            </Link>

            {img ? (
              <div className="w-full rounded-lg overflow-hidden shadow-lg mb-8">
                {/* Article hero = LCP element: sized, eager and priority-loaded.
                    Remote/base64 sources bypass the optimizer (same rule as the listing). */}
                <Image
                  src={img}
                  alt={title}
                  width={1200}
                  height={675}
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                  className="w-full h-auto block"
                  unoptimized={
                    img.startsWith('http') ||
                    img.startsWith('/api') ||
                    img.startsWith('data:')
                  }
                />
              </div>
            ) : null}

            <article
              dir={isArabic ? 'rtl' : 'ltr'}
              className={isArabic ? 'text-right' : ''}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-6">
                {title}
              </h1>

              <div className="prose prose-lg max-w-none">
                {desc ? (
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {desc}
                  </p>
                ) : null}

                <div className="text-base text-gray-600 leading-relaxed space-y-6">
                  {renderContent(blogContent) || (
                    <p>More content will be added here.</p>
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
