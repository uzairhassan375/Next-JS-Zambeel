'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const TIER_LABELS = { diamond: 'Diamond', gold: 'Gold', silver: 'Silver' };

export default function AdminPartnerAgencyList() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/partner-agencies?admin=true')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setAgencies(data);
        else setError('Failed to load partner agencies');
      })
      .catch(() => setError('Failed to load partner agencies'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/partner-agencies/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setAgencies((prev) => prev.filter((a) => a.id !== id && a._id !== id));
    } else {
      alert('Failed to delete');
    }
  }

  const idKey = (a) => a.id || a._id;

  if (loading) return <p className="text-gray-500">Loading partner agencies...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (agencies.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
        <p>No partner agencies yet. Add one to get started.</p>
      </div>
    );
  }

  const byTier = { diamond: [], gold: [], silver: [] };
  agencies.forEach((a) => {
    const t = a.tier || 'silver';
    if (byTier[t]) byTier[t].push(a);
  });

  return (
    <div className="space-y-8">
      {(['diamond', 'gold', 'silver']).map((tier) => (
        <div key={tier} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <h2 className="px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-gray-800 capitalize">
            {TIER_LABELS[tier]} Partners ({byTier[tier].length})
          </h2>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Logo</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name (EN)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Country</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {byTier[tier].map((agency) => (
                <tr key={idKey(agency)} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <div className="w-14 h-14 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">—</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-800">{agency.nameEn || '—'}</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">{agency.countryEn || agency.countryAr || '—'}</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/partner-agencies/${idKey(agency)}/edit`}
                      className="text-sm text-[#1e3a8a] hover:underline mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(idKey(agency), agency.nameEn)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
