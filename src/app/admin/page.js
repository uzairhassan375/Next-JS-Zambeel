import AdminLoginForm from './AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-[#1e3a8a] mb-2">Admin Login</h1>
        <p className="text-gray-600 text-sm mb-6">Enter your admin password to manage blogs.</p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
