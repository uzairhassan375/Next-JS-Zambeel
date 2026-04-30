'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import RichTextEditor from './RichTextEditor';

const useCloudinary = Boolean(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
);
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [imageFileAr, setImageFileAr] = useState(null);
  const [imagePreviewAr, setImagePreviewAr] = useState(null);
  const [removeImageAr, setRemoveImageAr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      
      // Image (EN): Cloudinary URL (fast) or base64 from file fallback
      let imagePayload = form.image || '';
      if (removeImage) {
        imagePayload = '';
      } else if (imageFile) {
        const reader = new FileReader();
        imagePayload = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      }

      // Image (AR): Cloudinary URL or base64 from file fallback
      let imageArPayload = form.imageAr || '';
      if (removeImageAr) {
        imageArPayload = '';
      } else if (imageFileAr) {
        const readerAr = new FileReader();
        imageArPayload = await new Promise((resolve, reject) => {
          readerAr.onloadend = () => resolve(readerAr.result);
          readerAr.onerror = reject;
          readerAr.readAsDataURL(imageFileAr);
        });
      }

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
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover image (English)</label>
          <p className="text-xs text-gray-500 mb-2">Upload to Cloudinary for fast loading (URL stored in DB). Or choose a file to embed.</p>
          <div className="flex flex-wrap items-center gap-3">
            {useCloudinary && (
              <CldUploadWidget
                config={{
                  cloud: {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                  },
                }}
                uploadPreset={uploadPreset}
                options={{ folder: 'blogs', maxFileSize: 3145728, maxFiles: 1, sources: ['local', 'url'], multiple: false }}
                onSuccess={(results, { widget }) => {
                  widget?.close?.();
                  const url = results?.info?.secure_url;
                  if (url) {
                    setImageFile(null);
                    setRemoveImage(false);
                    setImagePreview(url);
                    update('image', url);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg font-medium hover:bg-[#1e3a8a]/90 transition-colors"
                  >
                    ☁️ Upload to Cloudinary
                  </button>
                )}
              </CldUploadWidget>
            )}
            <input
              type="file"
              id="blog-image-file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setImageFile(f);
                  setRemoveImage(false);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result);
                  };
                  reader.readAsDataURL(f);
                  update('image', '');
                }
              }}
            />
            <button
              type="button"
              onClick={() => document.getElementById('blog-image-file')?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-colors font-medium"
            >
              📁 Choose file
            </button>
            {imageFile ? (
              <span className="text-sm text-green-600 font-medium">
                {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
              </span>
            ) : imagePreview && !removeImage ? (
              <span className="text-sm text-blue-600 font-medium">Image selected</span>
            ) : (
              <span className="text-sm text-gray-500">JPEG, PNG, WebP or GIF — max 3MB</span>
            )}
            {(imageFile || (imagePreview && !removeImage)) && (
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setRemoveImage(true);
                  setImagePreview(null);
                  document.getElementById('blog-image-file').value = '';
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Remove image
              </button>
            )}
          </div>
          
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
            </div>
          )}
        </div>
      </div>

      {/* Arabic thumbnail upload */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Arabic Thumbnail (اختياري)</h3>
        <p className="text-xs text-gray-500 mb-2">
          Upload a separate thumbnail for Arabic. If not set, the English thumbnail will be used.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {useCloudinary && (
            <CldUploadWidget
              config={{
                cloud: {
                  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                },
              }}
              uploadPreset={uploadPreset}
              options={{ folder: 'blogs/ar', maxFileSize: 3145728, maxFiles: 1, sources: ['local', 'url'], multiple: false }}
              onSuccess={(results, { widget }) => {
                widget?.close?.();
                const url = results?.info?.secure_url;
                if (url) {
                  setImageFileAr(null);
                  setRemoveImageAr(false);
                  setImagePreviewAr(url);
                  update('imageAr', url);
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg font-medium hover:bg-[#1e3a8a]/90 transition-colors"
                >
                  ☁️ Upload Arabic thumbnail
                </button>
              )}
            </CldUploadWidget>
          )}
          <input
            type="file"
            id="blog-image-ar-file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setImageFileAr(f);
                setRemoveImageAr(false);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImagePreviewAr(reader.result);
                };
                reader.readAsDataURL(f);
                update('imageAr', '');
              }
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById('blog-image-ar-file')?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-colors font-medium"
          >
            📁 Choose Arabic file
          </button>
          {imageFileAr ? (
            <span className="text-sm text-green-600 font-medium">
              {imageFileAr.name} ({(imageFileAr.size / 1024).toFixed(1)} KB)
            </span>
          ) : imagePreviewAr && !removeImageAr ? (
            <span className="text-sm text-blue-600 font-medium">Arabic image selected</span>
          ) : (
            <span className="text-sm text-gray-500">JPEG, PNG, WebP or GIF — max 3MB</span>
          )}
          {(imageFileAr || (imagePreviewAr && !removeImageAr)) && (
            <button
              type="button"
              onClick={() => {
                setImageFileAr(null);
                setRemoveImageAr(true);
                setImagePreviewAr(null);
                const input = document.getElementById('blog-image-ar-file');
                if (input) input.value = '';
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Remove Arabic image
            </button>
          )}
        </div>
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
            <p className="text-xs text-gray-500 mb-2">Use the toolbar for bold, italic, color, headings, lists and to insert images.</p>
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
            <p className="text-xs text-gray-500 mb-2">Use the toolbar for bold, italic, color, headings, lists and to insert images.</p>
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
