import AdminGuard from './AdminGuard';

export const metadata = {
  title: 'Admin | Zambeel',
  description: 'Admin dashboard',
  // robots.txt disallows /admin/, this keeps it out of the index if it ever gets linked
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100">
        {children}
      </div>
    </AdminGuard>
  );
}
