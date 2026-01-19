'use client';

import dynamic from 'next/dynamic';

// Dynamically import SuperClassPage with SSR disabled to prevent rendering errors
const SuperClassPage = dynamic(() => import('../pages/SuperClassPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E3B78] mx-auto"></div>
        <p className="mt-4 text-[#2E3B78]">Loading...</p>
      </div>
    </div>
  ),
});

export default function SuperClassWrapper() {
  return <SuperClassPage />;
}
