import BlogsTabs from '../BlogsTabs';
import AdminHomepageBlogs from './AdminHomepageBlogs';

export default function AdminHomepageBlogsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Blogs</h1>
        <BlogsTabs />
        <p className="text-sm text-gray-600 mb-6">
          Pick exactly which blogs appear on the homepage and in what order — separately for desktop
          and mobile. This is independent of the blog list order.
        </p>
        <AdminHomepageBlogs />
      </div>
    </div>
  );
}
