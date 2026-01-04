import BlogDetailPage from '../../../pages/BlogDetailPage';

export default async function BlogPost({ params }) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}

