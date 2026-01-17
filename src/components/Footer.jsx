'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getLocalePath } from "../lib/localeUtils";
const white_logoImage = "/white_logo.png";

export default function Footer() {
  const { t } = useTranslation();
  const pathname = usePathname();
  return (
    <footer className="max-w-6xl mx-auto text-white pb-8 md:pb-12 pt-8 md:pt-12 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6 text-sm items-start">
        <div className="space-y-5 flex flex-col">
          <Image
            src={white_logoImage}
            alt="Zambeel Logo"
            width={200}
            height={56}
            className="h-12 md:h-14 object-contain"
          />
          <p className="text-sm leading-relaxed text-blue-50 opacity-90 pr-2">
          {t('footer.tagline')}
          </p>
          <div className="flex gap-5 text-sm mt-6">
            <a href={pathname?.startsWith('/ar') ? 'https://www.instagram.com/zambeel_ecommerce?igsh=MWg0emhiMndqY3lq' : 'https://www.instagram.com/zambeel.ecommerce?igsh=a20zdW9naGE2aDA4'} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/share/1CHT3yCtCm/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://www.linkedin.com/company/myzambeel/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <div className="pt-2 md:pl-4 flex flex-col">
          <h4 className="font-bold text-base mb-4 md:mb-6 text-white">
            {t('footer.services')}
          </h4>
          <ul className="space-y-3 text-sm text-blue-50 opacity-90">
            <li>
              <Link href={getLocalePath('/learn-ecommerce', pathname)} className="hover:text-white hover:underline">
                {t('footer.learnEcommerce')}
              </Link>
            </li>
            <li>
              <Link href={getLocalePath('/pages/dropshipping-uae-and-ksa', pathname)} className="hover:text-white hover:underline">
                {t('header.dropshipping')}
              </Link>
            </li>
            <li>
              <Link href={getLocalePath('/pages/warehousing-3pl', pathname)} className="hover:text-white hover:underline">
                {t('header.zambeel3PL')}
              </Link>
            </li>
            <li>
              <Link href={getLocalePath('/pages/zambeel-360', pathname)} className="hover:text-white hover:underline">
                {t('header.zambeel360')}
              </Link>
            </li>
            <li>
              <a href="https://storeintel.tools/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                {t('footer.storeIntel')}
              </a>
            </li>
          </ul>
        </div>
        <div className="pt-2 md:pl-4 flex flex-col">
          <h4 className="font-bold text-base mb-4 md:mb-6 text-white">
            {t('footer.zambeelPortal')}
          </h4>
          <ul className="space-y-3 text-sm text-blue-50 opacity-90">
            <li>
              <a href="https://portal.myzambeel.com/register" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                {t('common.signUp')}
              </a>
            </li>
            <li>
              <a href="https://portal.myzambeel.com/login" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                {t('common.signIn')}
              </a>
            </li>
          </ul>
        </div>
        <div className="pt-2 md:pl-4 flex flex-col">
          <h4 className="font-bold text-base mb-4 md:mb-6 text-white">
            {t('footer.policies')}
          </h4>
          <ul className="space-y-3 text-sm text-blue-50 opacity-90">
            <li>
              <Link href={getLocalePath('/pages/refund-replacement-policy', pathname)} className="hover:text-white hover:underline">
                {t('refundReplacement.title')}
              </Link>
            </li>
          </ul>
        </div>
        <div className="pt-2 flex flex-col">
          <h4 className="font-bold text-base mb-4 md:mb-6 text-white">
            {t('footer.contactUs')}
          </h4>
          <ul className="space-y-3 text-sm text-blue-50 opacity-90">
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-envelope w-4"></i>
              <a
                href="mailto:zambeelsupport@myzambeel.com"
                className="hover:text-white hover:underline"
                dir="ltr"
              >
                {t('footer.email')}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-brands fa-whatsapp w-4"></i>
              <a 
                href="https://wa.me/971568472271" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white hover:underline" 
                dir="ltr"
              >
                {t('footer.phone')}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-info-circle w-4"></i>
              <Link href={getLocalePath('/about', pathname)} className="hover:text-white hover:underline">
                {t('header.aboutUs')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

