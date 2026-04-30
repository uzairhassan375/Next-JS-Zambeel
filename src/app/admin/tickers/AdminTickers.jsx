'use client';

import { useEffect, useState } from 'react';

export default function AdminTickers() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/tickers', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load');
        return r.json();
      })
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch(() => setError('Failed to load tickers'))
      .finally(() => setLoading(false));
  }, []);

  function updateItem(pageId, field, value) {
    setList((prev) => prev.map((item) => (item.pageId === pageId ? { ...item, [field]: value } : item)));
  }

  async function saveItem(item) {
    setSavingId(item.pageId);
    setError('');
    try {
      const res = await fetch('/api/admin/tickers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: item.pageId,
          textEn: item.textEn || '',
          textAr: item.textAr || '',
          isBold: Boolean(item.isBold),
          isUnderline: Boolean(item.isUnderline),
          isHighlight: Boolean(item.isHighlight),
          isBlink: Boolean(item.isBlink),
        }),
      });
      if (!res.ok) throw new Error('Save failed');
    } catch {
      setError('Failed to save ticker');
    } finally {
      setSavingId('');
    }
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error && list.length === 0) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {list.map((item) => (
        <div key={item.pageId} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">{item.label}</h2>
            <span className="text-xs text-gray-400 font-mono">{item.path}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ticker text (EN)</label>
              <textarea
                value={item.textEn || ''}
                onChange={(e) => updateItem(item.pageId, 'textEn', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ticker text (AR)</label>
              <textarea
                value={item.textAr || ''}
                onChange={(e) => updateItem(item.pageId, 'textAr', e.target.value)}
                rows={3}
                dir="rtl"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={Boolean(item.isBold)} onChange={(e) => updateItem(item.pageId, 'isBold', e.target.checked)} />
              Bold
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={Boolean(item.isUnderline)} onChange={(e) => updateItem(item.pageId, 'isUnderline', e.target.checked)} />
              Underline
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={Boolean(item.isHighlight)} onChange={(e) => updateItem(item.pageId, 'isHighlight', e.target.checked)} />
              Highlight
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={Boolean(item.isBlink)} onChange={(e) => updateItem(item.pageId, 'isBlink', e.target.checked)} />
              Blink
            </label>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => saveItem(item)}
              disabled={savingId === item.pageId}
              className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 disabled:opacity-50"
            >
              {savingId === item.pageId ? 'Saving...' : 'Save ticker'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
