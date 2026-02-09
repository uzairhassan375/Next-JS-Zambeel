'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import RichTextEditor from './RichTextEditor';

const defaultBlog = {
  slug: '',
  titleEn: '',
  titleAr: '',
  descriptionEn: '',
  descriptionAr: '',
  image: '',
  contentEn: '',
  contentAr: '',
};

export default function AdminBlogForm({ slug: existingSlug, initialData }) {
  const router = useRouter();
  const isEdit = Boolean(existingSlug);
  const [form, setForm] = useState(initialData || defaultBlog);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      // Set preview for existing image
      if (initialData.image && !removeImage) {
        setImagePreview(initialData.image);
      } else {
        setImagePreview(null);
      }
    }
  }, [initialData, removeImage]);

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
      
      // Convert image file to base64 if selected
      let imageBase64 = '';
      if (imageFile) {
        const reader = new FileReader();
        imageBase64 = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      }
      
      // Send as JSON with base64 string
      const body = {
        ...(isEdit ? {} : { slug: form.slug }),
        titleEn: form.titleEn,
        titleAr: form.titleAr,
        descriptionEn: form.descriptionEn,
        descriptionAr: form.descriptionAr,
        contentEn: form.contentEn,
        contentAr: form.contentAr,
        image: removeImage ? '' : (imageBase64 || form.image || ''),
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
            readOnly={isEdit}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-[#1e3a8a] bg-gray-50"
            placeholder="my-blog-post"
            required
          />
          {isEdit && <p className="text-xs text-gray-500 mt-1">Slug cannot be changed when editing.</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover image</label>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              id="blog-image-file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setImageFile(f);
                  setRemoveImage(false); // Cancel removal if new file selected
                  // Create preview URL for selected file
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
          
          {/* Image Preview */}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => update('descriptionEn', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
            />
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
