import { Suspense } from 'react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import HomePage from '../../../pages/HomePage';
import AboutPage from '../../../pages/AboutPage';
import BlogListingPage from '../../../pages/BlogListingPage';
import BlogDetailPage from '../../../pages/BlogDetailPage';
import SuperClassPage from '../../../pages/SuperClassPage';
import SupplierWrapper from './SupplierWrapper';
import PartnerAgenciesPage from '../../../pages/PartnerAgenciesPage';
import DropshippingPage from '../../../pages/DropshippingPage';
import USDropshippingPage from '../../../pages/USDropshippingPage';
import Zambeel360Page from '../../../pages/Zambeel360Page';
import Zambeel3PLPage from '../../../pages/Zambeel3PLPage';
import AmazonUsaPage from '../../../pages/AmazonUsaPage';
import RefundReplacementPolicyPage from '../../../pages/RefundReplacementPolicyPage';
import TermsOfServicePage from '../../../pages/TermsOfServicePage';
import { getBlogBySlug, getBlogs, getHomepageBlogSelection } from '../../../lib/blog';
import { connectDB } from '../../../lib/db';
import PartnerAgency from '../../../models/PartnerAgency';
import { partnerAgenciesForResponse } from '../../../lib/partnerAgencyResponse';
import { getCachedOrFetch, getCachedPartnerAgencies } from '../../../lib/partnerAgenciesCache';
import { buildMetadataForPage } from '../../../lib/pageMeta';
import { buildBlogPostMetadata } from '../../../lib/blogMetadata';
import ArticleSchema from '../../../components/seo/ArticleSchema';
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';
import enTranslations from '../../../locales/en/translation.json';
import arTranslations from '../../../locales/ar/translation.json';

// Loading fallback
function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E3B78] mx-auto"></div>
        <p className="mt-4 text-[#2E3B78]">Loading...</p>
      </div>
    </div>
  );
}

// Route mapping for Arabic pages
const routeMap = {
  '': HomePage,
  'about': AboutPage,
  'blog': BlogListingPage,
  'learn-ecommerce': SuperClassPage,
  'supplier': SupplierWrapper,
  'pages/dropshipping-uae-and-ksa': DropshippingPage,
  'pages/usa-dropshipping': USDropshippingPage,
  'pages/zambeel-360': Zambeel360Page,
  'pages/warehousing-3pl': Zambeel3PLPage,
  'pages/amazon-usa': AmazonUsaPage,
  'pages/refund-replacement-policy': RefundReplacementPolicyPage,
  'pages/terms-of-service': TermsOfServicePage,
  'pages/partner-agencies': PartnerAgenciesPage,
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const translations = arTranslations;
  const routePath = slug && slug.length > 0 ? slug.join('/') : '';
  
  // Handle blog detail pages
  if (routePath.startsWith('blog/')) {
    const parts = routePath.split('/');
    if (parts.length === 2 && parts[0] === 'blog') {
      const blogSlug = parts[1];
      return buildBlogPostMetadata(blogSlug, 'ar');
    }
  }
  
  // Handle different routes — use dynamic meta from admin (buildMetadataForPage)
  switch (routePath) {
    case '':
      return buildMetadataForPage('home', 'ar', {
        title: 'زمبيل - منصة واحدة لتجارتك الإلكترونية',
        description: translations.footer.seoDescription || translations.homepage?.whereToSell?.seoDescription || 'حلول زمبيل للتجارة الإلكترونية',
      });
    case 'about':
      return buildMetadataForPage('about', 'ar', {
        title: `${translations.about.title} - زمبيل`,
        description: translations.about.description || 'تعرف على زمبيل ومهمتنا في تبسيط التجارة الإلكترونية',
      });
    case 'pages/dropshipping-uae-and-ksa':
      return buildMetadataForPage('pages/dropshipping-uae-and-ksa', 'ar', {
        title: `${translations.dropshipping.hero.title} - ${translations.dropshipping.hero.subtitle} | زمبيل`,
        description: translations.dropshipping.whyZambeel.description || 'ابدأ البيع دون عناء إدارة المخزون أو تسجيل الأعمال مع زمبيل دروبشيبينغ',
      });
    case 'pages/usa-dropshipping':
      return buildMetadataForPage('pages/usa-dropshipping', 'ar', {
        title: `${translations.header?.usDropshipping || 'USA Dropshipping'} | زمبيل`,
        description:
          translations.usDropshipping?.comingSoonSub ||
          'صفحة دروبشيبينغ الولايات المتحدة قيد الإعداد.',
      });
    case 'pages/zambeel-360':
      return buildMetadataForPage('pages/zambeel-360', 'ar', {
        title: `${translations.zambeel360.hero.title} - ${translations.zambeel360.hero.subtitle} | زمبيل`,
        description: translations.zambeel360.whatIs.description || 'توفير منتجات عالية الجودة من الصين مع زمبيل 360 - خدمة كاملة من التوريد إلى التوصيل',
      });
    case 'pages/warehousing-3pl':
      return buildMetadataForPage('pages/warehousing-3pl', 'ar', {
        title: `${translations.zambeel3PL.hero.title} - ${translations.zambeel3PL.hero.subtitle} | زمبيل`,
        description: translations.zambeel3PL.whyZambeel.description || 'احصل على خدمات التخزين وإدارة المخزون والتنفيذ الفعال مع خدمة زمبيل 3PL',
      });
    case 'pages/amazon-usa':
      return buildMetadataForPage('pages/amazon-usa', 'ar', {
        title: translations.amazon.metaTitle || `${translations.amazon.hero.title} - ${translations.amazon.hero.subtitle} | زمبيل`,
        description: translations.amazon.metaDescription || translations.amazon.goldPlan.description,
      });
    case 'learn-ecommerce': {
      const title = translations.superClass?.hero?.title || translations.learnEcommerce?.hero?.title || 'تعلم التجارة الإلكترونية';
      const description = translations.learnEcommerce?.hero?.description || translations.superClass?.hero?.subtitle || 'تعلم التجارة الإلكترونية مع زمبيل - فصول متقدمة لمساعدتك على فهم وتعلم التجارة الإلكترونية';
      return buildMetadataForPage('learn-ecommerce', 'ar', { title: `${title} - زمبيل`, description });
    }
    case 'blog':
      return buildMetadataForPage('blog', 'ar', {
        title: 'المدونة - رؤى ونصائح التجارة الإلكترونية | زمبيل',
        description: 'اقرأ أحدث رؤى ونصائح التجارة الإلكترونية ودلائل زمبيل. تعلم عن الدروبشيبينغ وخدمات 3PL وتوريد المنتجات والمزيد.',
      });
    case 'pages/refund-replacement-policy':
      return buildMetadataForPage('pages/refund-replacement-policy', 'ar', {
        title: `${translations.refundReplacement.title} - زمبيل`,
        description: `تعرف على سياسة الاسترداد والاستبدال لدى زمبيل للعملاء والبائعين. فهم إرشاداتنا وإجراءاتنا لمعالجة عمليات الاسترداد والاستبدال.`,
      });
    case 'pages/terms-of-service':
      return buildMetadataForPage('pages/terms-of-service', 'ar', {
        title: `${translations.footer?.termsOfService || 'شروط الخدمة'} - زمبيل`,
        description: 'اتفاقية الوكيل - الشروط والأحكام لاستخدام خدمات زمبيل الدروبشيبينغ.',
      });
    case 'supplier':
      return buildMetadataForPage('supplier', 'ar', {
        title: `${translations.comingSoon?.supplier?.title || 'كن مورداً'} - زمبيل`,
        description: translations.comingSoon?.supplier?.description || 'انضم إلى شبكة الموردين لدينا ونمّي أعمالك مع زمبيل. نحن نعد شيئًا خاصًا لك!',
      });
    case 'pages/partner-agencies':
      return buildMetadataForPage('pages/partner-agencies', 'ar', {
        title: `${translations.partnerAgencies?.title || 'وكالات الشركاء'} - زمبيل`,
        description: translations.partnerAgencies?.subtitle || 'تواصل مع الشركاء الموثوقين الذين يمكنهم مساعدتك في تنمية أعمالك',
      });
    default:
      // Unknown route: this render calls notFound(), so keep it out of the index
      return {
        title: 'الصفحة غير موجودة - زمبيل',
        robots: { index: false, follow: false },
      };
  }
}

export default async function ArabicPage({ params }) {
  const { slug } = await params;
  
  // Handle empty slug (homepage)
  const routePath = slug && slug.length > 0 ? slug.join('/') : '';
  
  // Handle blog detail pages (blog/[slug])
  if (routePath.startsWith('blog/')) {
    const parts = routePath.split('/');
    if (parts.length === 2 && parts[0] === 'blog') {
      const blogSlug = parts[1];
      // Fetch blog data from database
      const post = await getBlogBySlug(blogSlug);
      if (!post) notFound();
      return (
        <>
          <ArticleSchema post={post} locale="ar" />
          <BreadcrumbSchema
            locale="ar"
            items={[
              { name: arTranslations.header?.home || 'الرئيسية', path: '/' },
              { name: arTranslations.blog?.title || 'المدونة', path: '/blog' },
              { name: post.titleAr || post.titleEn || post.slug, path: `/blog/${post.slug}` },
            ]}
          />
          <Suspense fallback={<PageFallback />}>
            <BlogDetailPage post={post} />
          </Suspense>
        </>
      );
    }
  }
  
  // Handle blog listing page - needs to fetch blogs
  if (routePath === 'blog') {
    const blogs = await getBlogs();
    return (
      <Suspense fallback={<PageFallback />}>
        <BlogListingPage blogs={blogs} />
      </Suspense>
    );
  }
  
  // Get the component for the route
  const PageComponent = routeMap[routePath];
  
  if (!PageComponent) {
    // Real 404 (status code + not-found UI), not a soft 404 with a 200 status
    notFound();
  }
  
  // Homepage: pass the admin-selected blogs so they show immediately without client fetch
  if (routePath === '' && PageComponent === HomePage) {
    const { web, mobile } = await getHomepageBlogSelection();
    return (
      <Suspense fallback={<PageFallback />}>
        <HomePage initialBlogs={web} initialMobileBlogs={mobile} />
      </Suspense>
    );
  }

  // Partner agencies: serve from cache for fast load; cache invalidated when admin changes data
  if (routePath === 'pages/partner-agencies') {
    let initialAgencies = [];
    try {
      await connectDB();
      initialAgencies = await getCachedOrFetch(
        async () => {
          const list = await PartnerAgency.find({})
            .sort({ tier: 1, order: 1, createdAt: 1 })
            .lean();
          return partnerAgenciesForResponse(list);
        },
        async (cacheTimestamp) => {
          const [latest, count] = await Promise.all([
            PartnerAgency.findOne().sort({ updatedAt: -1 }).select('updatedAt').lean(),
            PartnerAgency.countDocuments(),
          ]);
          const cached = getCachedPartnerAgencies();
          const cachedCount = Array.isArray(cached) ? cached.length : 0;
          if (count !== cachedCount) return true;
          if (!latest || !latest.updatedAt) return false;
          return new Date(latest.updatedAt).getTime() > cacheTimestamp;
        }
      );
    } catch {
      // leave initialAgencies as []
    }
    const copy = arTranslations?.partnerAgencies ? { ...arTranslations.partnerAgencies } : {};
    const serialized = JSON.parse(JSON.stringify(initialAgencies));
    return (
      <Suspense fallback={<PageFallback />}>
        <PartnerAgenciesPage initialAgencies={serialized} initialCopy={copy} />
      </Suspense>
    );
  }
  
  return (
    <Suspense fallback={<PageFallback />}>
      <PageComponent />
    </Suspense>
  );
}

