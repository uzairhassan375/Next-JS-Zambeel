import AdminPageMeta from './AdminPageMeta';

export default function PageMetaAdminPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Page meta (SEO)</h1>
        <p className="text-gray-600 text-sm mb-6">
          Set meta title and description for each page. Used for search engines and social sharing. Leave empty to use default text.
        </p>
        <AdminPageMeta />
      </div>
    </div>
  );
}
