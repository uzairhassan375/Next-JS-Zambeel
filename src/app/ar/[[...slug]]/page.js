import { Suspense } from 'react';
import { headers } from 'next/headers';
import HomePage from '../../../pages/HomePage';
import AboutPage from '../../../pages/AboutPage';
import BlogListingPage from '../../../pages/BlogListingPage';
import BlogDetailPage from '../../../pages/BlogDetailPage';
import SuperClassPage from '../../../pages/SuperClassPage';
import TeamPage from '../../../pages/TeamPage';
import SupplierWrapper from './SupplierWrapper';
import PartnerAgenciesWrapper from './PartnerAgenciesWrapper';
import DropshippingPage from '../../../pages/DropshippingPage';
import Zambeel360Page from '../../../pages/Zambeel360Page';
import Zambeel3PLPage from '../../../pages/Zambeel3PLPage';
import RefundReplacementPolicyPage from '../../../pages/RefundReplacementPolicyPage';
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
  'team': TeamPage,
  'supplier': SupplierWrapper,
  'pages/dropshipping-uae-and-ksa': DropshippingPage,
  'pages/zambeel-360': Zambeel360Page,
  'pages/warehousing-3pl': Zambeel3PLPage,
  'pages/refund-replacement-policy': RefundReplacementPolicyPage,
  'pages/partner-agencies': PartnerAgenciesWrapper,
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
      return {
        title: `${blogSlug ? blogSlug.replace(/-/g, ' ') : 'مقال المدونة'} - مدونة زمبيل`,
        description: `اقرأ مقالنا عن ${blogSlug ? blogSlug.replace(/-/g, ' ') : 'التجارة الإلكترونية'}. احصل على رؤى ونصائح حول الدروبشيبينغ وأعمال التجارة الإلكترونية والمزيد.`,
        openGraph: {
          title: `${blogSlug ? blogSlug.replace(/-/g, ' ') : 'مقال المدونة'} - مدونة زمبيل`,
          description: `اقرأ مقالنا عن ${blogSlug ? blogSlug.replace(/-/g, ' ') : 'التجارة الإلكترونية'}. احصل على رؤى ونصائح حول الدروبشيبينغ وأعمال التجارة الإلكترونية والمزيد.`,
          type: 'article',
        },
      };
    }
  }
  
  // Handle different routes
  switch (routePath) {
    case '':
      return {
        title: 'زمبيل - منصة واحدة لتجارتك الإلكترونية',
        description: translations.footer.seoDescription || translations.homepage.whereToSell.seoDescription || 'حلول زمبيل للتجارة الإلكترونية',
      };
    case 'about':
      return {
        title: `${translations.about.title} - زمبيل`,
        description: translations.about.description || 'تعرف على زمبيل ومهمتنا في تبسيط التجارة الإلكترونية',
      };
    case 'team':
      return {
        title: `${translations.team.title} - زمبيل`,
        description: translations.team.subtitle || 'تعرف على الفريق وراء مهمة زمبيل في تبسيط التجارة الإلكترونية',
      };
    case 'pages/dropshipping-uae-and-ksa':
      return {
        title: `${translations.dropshipping.hero.title} - ${translations.dropshipping.hero.subtitle} | زمبيل`,
        description: translations.dropshipping.whyZambeel.description || 'ابدأ البيع دون عناء إدارة المخزون أو تسجيل الأعمال مع زمبيل دروبشيبينغ',
      };
    case 'pages/zambeel-360':
      return {
        title: `${translations.zambeel360.hero.title} - ${translations.zambeel360.hero.subtitle} | زمبيل`,
        description: translations.zambeel360.whatIs.description || 'توفير منتجات عالية الجودة من الصين مع زمبيل 360 - خدمة كاملة من التوريد إلى التوصيل',
      };
    case 'pages/warehousing-3pl':
      return {
        title: `${translations.zambeel3PL.hero.title} - ${translations.zambeel3PL.hero.subtitle} | زمبيل`,
        description: translations.zambeel3PL.whyZambeel.description || 'احصل على خدمات التخزين وإدارة المخزون والتنفيذ الفعال مع خدمة زمبيل 3PL',
      };
    case 'learn-ecommerce':
      const title = translations.superClass?.hero?.title || translations.learnEcommerce?.hero?.title || 'تعلم التجارة الإلكترونية';
      const description = translations.learnEcommerce?.hero?.description || translations.superClass?.hero?.subtitle || 'تعلم التجارة الإلكترونية مع زمبيل - فصول متقدمة لمساعدتك على فهم وتعلم التجارة الإلكترونية';
      return {
        title: `${title} - زمبيل`,
        description: description,
      };
    case 'blog':
      return {
        title: 'المدونة - رؤى ونصائح التجارة الإلكترونية | زمبيل',
        description: 'اقرأ أحدث رؤى ونصائح التجارة الإلكترونية ودلائل زمبيل. تعلم عن الدروبشيبينغ وخدمات 3PL وتوريد المنتجات والمزيد.',
      };
    case 'pages/refund-replacement-policy':
      return {
        title: `${translations.refundReplacement.title} - زمبيل`,
        description: `تعرف على سياسة الاسترداد والاستبدال لدى زمبيل للعملاء والبائعين. فهم إرشاداتنا وإجراءاتنا لمعالجة عمليات الاسترداد والاستبدال.`,
      };
    case 'supplier':
      return {
        title: `${translations.comingSoon?.supplier?.title || 'كن مورداً'} - زمبيل`,
        description: translations.comingSoon?.supplier?.description || 'انضم إلى شبكة الموردين لدينا ونمّي أعمالك مع زمبيل. نحن نعد شيئًا خاصًا لك!',
      };
    case 'pages/partner-agencies':
      return {
        title: `${translations.comingSoon?.trustedPartners?.title || 'الشركاء الموثوقون'} - زمبيل`,
        description: translations.comingSoon?.trustedPartners?.description || 'نعمل بجد لنقدم لك شبكة شركاء رائعة. ترقبوا التحديثات!',
      };
    default:
      return {
        title: 'زمبيل - منصة واحدة لتجارتك الإلكترونية',
        description: translations.footer.seoDescription || 'حلول زمبيل للتجارة الإلكترونية',
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
      return (
        <Suspense fallback={<PageFallback />}>
          <BlogDetailPage slug={blogSlug} />
        </Suspense>
      );
    }
  }
  
  // Get the component for the route
  const PageComponent = routeMap[routePath];
  
  if (!PageComponent) {
    // 404 - route not found
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2E3B78] mb-4">404</h1>
          <p className="text-lg text-gray-600">Page not found</p>
        </div>
      </div>
    );
  }
  
  return (
    <Suspense fallback={<PageFallback />}>
      <PageComponent />
    </Suspense>
  );
}

