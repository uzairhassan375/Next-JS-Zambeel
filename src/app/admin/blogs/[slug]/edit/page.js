import AdminBlogEditPage from './AdminBlogEditPage';

export default async function EditBlogPage({ params }) {
  const { slug } = await params;
  return <AdminBlogEditPage slug={slug} />;
}
