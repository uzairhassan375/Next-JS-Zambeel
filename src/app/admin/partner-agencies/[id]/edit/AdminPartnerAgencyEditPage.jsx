'use client';

import { useEffect, useState } from 'react';
import AdminPartnerAgencyForm from '../../AdminPartnerAgencyForm';

export default function AdminPartnerAgencyEditPage({ agencyId }) {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/partner-agencies/${agencyId}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setInitialData)
      .catch(() => setError('Partner agency not found'))
      .finally(() => setLoading(false));
  }, [agencyId]);

  if (loading) return <div className="p-6"><p className="text-gray-500">Loading...</p></div>;
  if (error) return <div className="p-6"><p className="text-red-600">{error}</p></div>;
  if (!initialData) return null;

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Partner Agency</h1>
        <AdminPartnerAgencyForm agencyId={agencyId} initialData={initialData} />
      </div>
    </div>
  );
}
