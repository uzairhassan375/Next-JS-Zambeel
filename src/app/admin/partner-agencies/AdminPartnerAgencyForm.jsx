'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

const useCloudinary = Boolean(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
);
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

const defaultForm = {
  tier: 'silver',
  order: 0,
  nameEn: '',
  nameAr: '',
  countryEn: '',
  countryAr: '',
  descriptionEn: '',
  descriptionAr: '',
  contact: '',
  phone: '',
  website: '',
  logo: '',
};

export default function AdminPartnerAgencyForm({ agencyId, initialData, initialLogo }) {
  const router = useRouter();
  const isEdit = Boolean(agencyId);
  const [form, setForm] = useState({ ...defaultForm, ...initialData });
  const [imageFile, setImageFile] = useState(null);
  const logoFromProps = initialLogo !== undefined ? initialLogo : initialData?.logo;
  const [imagePreview, setImagePreview] = useState(logoFromProps || null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({ ...defaultForm, ...initialData });
      const logoSource = initialLogo !== undefined ? initialLogo : initialData.logo;
      if (logoSource && !removeImage) {
        setImagePreview(logoSource);
        setForm((prev) => ({ ...prev, logo: logoSource }));
      } else if (!logoSource && !imageFile) {
        setImagePreview(null);
      }
    }
  }, [initialData, removeImage, initialLogo, imageFile]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let logoPayload = form.logo || '';
      if (removeImage) {
        logoPayload = '';
      } else if (imageFile) {
        logoPayload = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      }
      const body = {
        tier: form.tier,
        order: Number(form.order) || 0,
        nameEn: form.nameEn || '',
        nameAr: form.nameAr || '',
        countryEn: form.countryEn || '',
        countryAr: form.countryAr || '',
        descriptionEn: form.descriptionEn || '',
        descriptionAr: form.descriptionAr || '',
        contact: form.contact || '',
        phone: form.phone || '',
        website: form.website || '',
        logo: logoPayload,
      };
      const url = isEdit ? `/api/partner-agencies/${agencyId}` : '/api/partner-agencies';
      const method = isEdit ? 'PUT' : 'POST';
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
      // Only redirect on create if we got a saved document back (id or _id)
      if (!isEdit && !data.id && !data._id) {
        setError('Agency was not saved. Please try again.');
        return;
      }
      router.push('/admin/partner-agencies');
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
          <select
            value={form.tier}
            onChange={(e) => update('tier', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a] bg-white"
            required
          >
            <option value="diamond">Diamond</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order (display order within tier)</label>
          <input
            type="number"
            min={0}
            value={form.order}
            onChange={(e) => update('order', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
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
              options={{ folder: 'agencies', maxFileSize: 2097152, maxFiles: 1, sources: ['local', 'url'], multiple: false }}
              onSuccess={(results, { widget }) => {
                widget?.close?.();
                const url = results?.info?.secure_url;
                if (url) {
                  setImageFile(null);
                  setRemoveImage(false);
                  setImagePreview(url);
                  update('logo', url);
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
            id="agency-logo-file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setImageFile(f);
                setRemoveImage(false);
                const reader = new FileReader();
                reader.onloadend = () => setImagePreview(reader.result);
                reader.readAsDataURL(f);
                update('logo', '');
              }
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById('agency-logo-file')?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-colors font-medium"
          >
            Choose file
          </button>
          {(imageFile || (imagePreview && !removeImage)) && (
            <button
              type="button"
              onClick={() => {
                setImageFile(null);
                setRemoveImage(true);
                setImagePreview(null);
                document.getElementById('agency-logo-file').value = '';
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Remove image
            </button>
          )}
        </div>
        {imagePreview && !removeImage && (
          <div className="mt-2 flex items-center gap-2">
            <div className="relative w-24 h-24 rounded overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
              <Image
                src={imagePreview}
                alt="Logo preview"
                width={96}
                height={96}
                className="object-contain"
                unoptimized={imagePreview.startsWith('data:') || imagePreview.startsWith('/api')}
              />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">English</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN) *</label>
            <input
              type="text"
              value={form.nameEn}
              onChange={(e) => update('nameEn', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country (EN)</label>
            <input
              type="text"
              value={form.countryEn}
              onChange={(e) => update('countryEn', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => update('descriptionEn', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Arabic (العربية)</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (AR)</label>
            <input
              type="text"
              value={form.nameAr}
              onChange={(e) => update('nameAr', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              dir="rtl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country (AR)</label>
            <input
              type="text"
              value={form.countryAr}
              onChange={(e) => update('countryAr', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              dir="rtl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (AR)</label>
            <textarea
              value={form.descriptionAr}
              onChange={(e) => update('descriptionAr', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
              dir="rtl"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact (email)</label>
          <input
            type="email"
            value={form.contact}
            onChange={(e) => update('contact', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone (e.g. +923001234567)</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
            dir="ltr"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Website (without https://)</label>
          <input
            type="text"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1e3a8a]"
            placeholder="www.example.com"
            dir="ltr"
          />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg font-medium hover:bg-[#1e3a8a]/90 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Agency' : 'Create Agency'}
        </button>
        <Link href="/admin/partner-agencies" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Cancel
        </Link>
      </div>
    </form>
  );
}
