'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import RichTextEditor from './RichTextEditor';

function truncateMiddle(str, maxLen = 60) {
  if (!str) return '';
  if (str.length <= maxLen) return str;
  const half = Math.floor((maxLen - 3) / 2);
  return `${str.slice(0, half)}...${str.slice(str.length - half)}`;
}

function copyToClipboard(text) {
  if (!text) return;
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

const defaultBlog = {
  slug: '',
  titleEn: '',
  titleAr: '',
  descriptionEn: '',
  descriptionAr: '',
  metaTitleEn: '',
  metaTitleAr: '',
  metaDescriptionEn: '',
  metaDescriptionAr: '',
  image: '',
  imageAr: '',
  contentEn: '',
  contentAr: '',
  status: 'published',
  sortOrder: 0,
};

export default function AdminBlogForm({ slug: existingSlug, initialData }) {
  const router = useRouter();
  const isEdit = Boolean(existingSlug);
  const [form, setForm] = useState(initialData || defaultBlog);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [imagePreviewAr, setImagePreviewAr] = useState(null);
  const [removeImageAr, setRemoveImageAr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedKey, setCopiedKey] = useState('');

  function handleCopy(text, key) {
    copyToClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((c) => (c === key ? '' : c)), 1500);
  }

  useEffect(() => {
    if (initialData) {
      // Merge with defaultBlog to ensure all fields are strings (not undefined)
      setForm({
        ...defaultBlog,
        ...initialData,
        status: initialData.status === 'draft' ? 'draft' : 'published',
        sortOrder: Number.parseInt(initialData.sortOrder, 10) || 0,
        metaTitleEn: initialData.metaTitleEn || '',
        metaTitleAr: initialData.metaTitleAr || '',
        metaDescriptionEn: initialData.metaDescriptionEn || '',
        metaDescriptionAr: initialData.metaDescriptionAr || '',
      });
      // Set preview for existing images (EN + AR)
      if (initialData.image && !removeImage) {
        setImagePreview(initialData.image);
      } else {
        setImagePreview(null);
      }
      if (initialData.imageAr && !removeImageAr) {
        setImagePreviewAr(initialData.imageAr);
      } else {
        setImagePreviewAr(null);
      }
    }
  }, [initialData, removeImage, removeImageAr]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'titleEn' && !isEdit) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setForm((prev) => ({ ...prev, slug }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = isEdit
        ? `/api/blogs/${encodeURIComponent(existingSlug)}`
        : '/api/blogs';
      const method = isEdit ? 'PUT' : 'POST';
      
      const imagePayload = removeImage ? '' : (form.image || '');
      const imageArPayload = removeImageAr ? '' : (form.imageAr || '');

      const body = {
        slug: form.slug,
        titleEn: form.titleEn,
        titleAr: form.titleAr || '',
        descriptionEn: form.descriptionEn || '',
        descriptionAr: form.descriptionAr || '',
        metaTitleEn: form.metaTitleEn || '',
        metaTitleAr: form.metaTitleAr || '',
        metaDescriptionEn: form.metaDescriptionEn || '',
        metaDescriptionAr: form.metaDescriptionAr || '',
        contentEn: form.contentEn || '',
        contentAr: form.contentAr || '',
        image: imagePayload,
        imageAr: imageArPayload,
        status: form.status === 'draft' ? 'draft' : 'published',
        sortOrder: Number.parseInt(form.sortOrder, 10) || 0,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Request failed');
        return;
      }
      router.push('/admin/blogs');
      router.refresh();
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-[#1e3a8a] bg-white"
            placeholder="my-blog-post"
            required
          />
          {isEdit && <p className="text-xs text-gray-500 mt-1">Changing the slug will change the blog URL. Old links may break.</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={form.status || 'published'}
            onChange={(e) => update('status', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a] bg-white"
          >
            <option value="published">Published (Live)</option>
            <option value="draft">Draft (Not live)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Draft blogs are only visible in admin.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
          <input
            type="number"
            value={form.sortOrder ?? 0}
            onChange={(e) => update('sortOrder', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a] bg-white"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">Lower number shows first (top).</p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover image (English) — Shopify Files image URL
          </label>
          <input
            type="url"
            value={form.image && !form.image.startsWith('data:') ? form.image : ''}
            onChange={(e) => {
              const url = e.target.value.trim();
              setRemoveImage(false);
              update('image', url);
              setImagePreview(url || null);
            }}
            placeholder="https://cdn.shopify.com/s/files/..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#1e3a8a] bg-white"
          />
          {imagePreview && !removeImage && (
            <button
              type="button"
              onClick={() => {
                setRemoveImage(true);
                setImagePreview(null);
                update('image', '');
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Remove image
            </button>
          )}

          {/* Image Preview (EN) */}
          {imagePreview && !removeImage && (
            <div className="mt-3 border border-gray-200 rounded-lg p-3 bg-gray-50">
              <p className="text-xs text-gray-600 mb-2 font-medium">Preview:</p>
              <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-contain"
                  unoptimized={imagePreview.startsWith('data:') || imagePreview.startsWith('/api')}
                />
              </div>

              {/* Current stored URL (only shown when it's a real URL, not a base64 data URI) */}
              {form.image && !form.image.startsWith('data:') && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-gray-600 font-medium">Stored URL:</span>
                  <span
                    className="font-mono text-gray-700 bg-white border border-gray-200 rounded px-2 py-1 break-all"
                    title={form.image}
                  >
                    {truncateMiddle(form.image, 70)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(form.image, 'image-en')}
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
                  >
                    {copiedKey === 'image-en' ? 'Copied!' : 'Copy'}
                  </button>
                  <a
                    href={form.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1e3a8a] hover:underline"
                  >
                    Open in new tab
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Arabic thumbnail */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Arabic Thumbnail (اختياري)</h3>
        <p className="text-xs text-gray-500 mb-2">
          Optional separate Shopify Files link for Arabic. If empty, the English thumbnail is used.
        </p>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Shopify Files image URL (Arabic)
          </label>
          <input
            type="url"
            value={form.imageAr && !form.imageAr.startsWith('data:') ? form.imageAr : ''}
            onChange={(e) => {
              const url = e.target.value.trim();
              setRemoveImageAr(false);
              update('imageAr', url);
              setImagePreviewAr(url || null);
            }}
            placeholder="https://cdn.shopify.com/s/files/..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#1e3a8a] bg-white"
          />
        </div>
        {imagePreviewAr && !removeImageAr && (
          <button
            type="button"
            onClick={() => {
              setRemoveImageAr(true);
              setImagePreviewAr(null);
              update('imageAr', '');
            }}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Remove Arabic image
          </button>
        )}

        {imagePreviewAr && !removeImageAr && (
          <div className="mt-3 border border-gray-200 rounded-lg p-3 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2 font-medium">Arabic preview:</p>
            <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded overflow-hidden">
              <Image
                src={imagePreviewAr}
                alt="Arabic Preview"
                fill
                className="object-contain"
                unoptimized={imagePreviewAr.startsWith('data:') || imagePreviewAr.startsWith('/api')}
              />
            </div>

            {/* Current stored URL (Arabic) */}
            {form.imageAr && !form.imageAr.startsWith('data:') && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-gray-600 font-medium">Stored URL:</span>
                <span
                  className="font-mono text-gray-700 bg-white border border-gray-200 rounded px-2 py-1 break-all"
                  title={form.imageAr}
                >
                  {truncateMiddle(form.imageAr, 70)}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(form.imageAr, 'image-ar')}
                  className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
                >
                  {copiedKey === 'image-ar' ? 'Copied!' : 'Copy'}
                </button>
                <a
                  href={form.imageAr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e3a8a] hover:underline"
                >
                  Open in new tab
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">English</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => update('titleEn', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title (EN)</label>
            <input
              type="text"
              value={form.metaTitleEn || ''}
              onChange={(e) => update('metaTitleEn', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              placeholder="SEO title for search engines (optional)"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters. If empty, blog title will be used.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => update('descriptionEn', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description (EN)</label>
            <textarea
              value={form.metaDescriptionEn || ''}
              onChange={(e) => update('metaDescriptionEn', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              placeholder="SEO description for search engines (optional)"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters. If empty, blog description will be used.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (EN)</label>
            <p className="text-xs text-gray-500 mb-2">
              Use the toolbar for formatting, fonts, and colors. Use Image URL to paste a Shopify Files link.
            </p>
            <RichTextEditor
              value={form.contentEn}
              onChange={(html) => update('contentEn', html)}
              placeholder="Write your content here..."
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Arabic (العربية)</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (AR)</label>
            <input
              type="text"
              value={form.titleAr}
              onChange={(e) => update('titleAr', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              dir="rtl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title (AR)</label>
            <input
              type="text"
              value={form.metaTitleAr || ''}
              onChange={(e) => update('metaTitleAr', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              placeholder="عنوان SEO لمحركات البحث (اختياري)"
              dir="rtl"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1" dir="ltr">Recommended: 50-60 characters. If empty, blog title will be used.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (AR)</label>
            <textarea
              value={form.descriptionAr}
              onChange={(e) => update('descriptionAr', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              dir="rtl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description (AR)</label>
            <textarea
              value={form.metaDescriptionAr || ''}
              onChange={(e) => update('metaDescriptionAr', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              placeholder="وصف SEO لمحركات البحث (اختياري)"
              dir="rtl"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1" dir="ltr">Recommended: 150-160 characters. If empty, blog description will be used.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (AR)</label>
            <p className="text-xs text-gray-500 mb-2">
              Use the toolbar for formatting, fonts, and colors. Use Image URL to paste a Shopify Files link.
            </p>
            <RichTextEditor
              value={form.contentAr}
              onChange={(html) => update('contentAr', html)}
              placeholder="اكتب المحتوى هنا..."
              dir="rtl"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg font-medium hover:bg-[#1e3a8a]/90 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Blog' : 'Create Blog'}
        </button>
        <Link
          href="/admin/blogs"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
