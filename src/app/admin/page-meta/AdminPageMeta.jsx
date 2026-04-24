'use client';

import { useState, useEffect } from 'react';

export default function AdminPageMeta() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/page-meta')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load');
        return r.json();
      })
      .then(setList)
      .catch(() => setError('Failed to load page meta'))
      .finally(() => setLoading(false));
  }, []);

  function updateItem(pageId, field, value) {
    setList((prev) =>
      prev.map((p) => (p.pageId === pageId ? { ...p, [field]: value } : p))
    );
  }

  async function savePage(item) {
    setSavingId(item.pageId);
    setError('');
    try {
      const res = await fetch('/api/admin/page-meta', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: item.pageId,
          metaTitleEn: item.metaTitleEn || '',
          metaTitleAr: item.metaTitleAr || '',
          metaDescriptionEn: item.metaDescriptionEn || '',
          metaDescriptionAr: item.metaDescriptionAr || '',
        }),
      });
      if (!res.ok) throw new Error('Save failed');
    } catch {
      setError('Failed to save');
    } finally {
      setSavingId(null);
    }
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error && list.length === 0) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {list.map((item) => (
        <div
          key={item.pageId}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">{item.label}</h2>
            <span className="text-xs text-gray-400 font-mono">{item.path}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta title (EN)</label>
              <input
                type="text"
                value={item.metaTitleEn || ''}
                onChange={(e) => updateItem(item.pageId, 'metaTitleEn', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a8a]"
                placeholder="Optional"
                maxLength={200}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta title (AR)</label>
              <input
                type="text"
                value={item.metaTitleAr || ''}
                onChange={(e) => updateItem(item.pageId, 'metaTitleAr', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a8a]"
                placeholder="اختياري"
                dir="rtl"
                maxLength={200}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta description (EN)</label>
              <textarea
                value={item.metaDescriptionEn || ''}
                onChange={(e) => updateItem(item.pageId, 'metaDescriptionEn', e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a8a]"
                placeholder="Optional"
                maxLength={500}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta description (AR)</label>
              <textarea
                value={item.metaDescriptionAr || ''}
                onChange={(e) => updateItem(item.pageId, 'metaDescriptionAr', e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a8a]"
                placeholder="اختياري"
                dir="rtl"
                maxLength={500}
              />
            </div>
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={() => savePage(item)}
              disabled={savingId === item.pageId}
              className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 disabled:opacity-50"
            >
              {savingId === item.pageId ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
