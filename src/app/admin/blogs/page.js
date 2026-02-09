import AdminBlogList from './AdminBlogList';
import SeedBlogsButton from './SeedBlogsButton';

export default function AdminBlogsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Blogs</h1>
          <div className="flex flex-wrap gap-3">
            <SeedBlogsButton />
            <a
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg font-medium hover:bg-[#1e3a8a]/90 transition-colors"
            >
              ➕ New Blog
            </a>
          </div>
        </div>
        <AdminBlogList />
      </div>
    </div>
  );
}
