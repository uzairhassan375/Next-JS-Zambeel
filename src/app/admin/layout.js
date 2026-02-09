import AdminGuard from './AdminGuard';

export const metadata = {
  title: 'Admin | Zambeel',
  description: 'Admin dashboard',
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
