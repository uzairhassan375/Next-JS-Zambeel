'use client';

import { useEffect, useState } from 'react';
import TickerRichTextEditor from './TickerRichTextEditor';

export default function AdminTickers() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState('');

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
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-mono">{item.path}</span>
              <button
                type="button"
                onClick={() => setEditingId((prev) => (prev === item.pageId ? '' : item.pageId))}
                className="text-xs px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                {editingId === item.pageId ? 'Close editor' : 'Edit ticker'}
              </button>
            </div>
          </div>

          {editingId === item.pageId && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ticker text (EN)
              </label>
              <TickerRichTextEditor
                value={item.textEn || ''}
                onChange={(val) => updateItem(item.pageId, 'textEn', val)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ticker text (AR)
              </label>
              <TickerRichTextEditor
                value={item.textAr || ''}
                onChange={(val) => updateItem(item.pageId, 'textAr', val)}
                dir="rtl"
              />
            </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Select specific words and use toolbar buttons for bold, italic, underline, highlight, or blink.
              </p>

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
            </>
          )}
        </div>
      ))}
    </div>
  );
}
