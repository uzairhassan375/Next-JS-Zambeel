'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

// Cookie utility functions
const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const setCookie = (name, value, days = 365) => {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

const ComingSoon = ({ title, description, cookieName = 'supplier_countdown_target' }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const isRTL = currentLanguage === 'ar';
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer (10 days) - persists across page refreshes using cookies
  useEffect(() => {
    // Get target date from cookie or create new one
    let targetDate;
    const savedTargetDate = getCookie(cookieName);
    
    if (savedTargetDate) {
      // Use saved target date from cookie
      targetDate = new Date(parseInt(savedTargetDate, 10));
    } else {
      // First visit: set target date to 10 days from now and save to cookie
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 10);
      setCookie(cookieName, targetDate.getTime().toString(), 11); // Store for 11 days to be safe
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        // Timer expired
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [cookieName]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(186.57deg, rgba(18, 75, 61, 0.75) 5.1%, rgba(31, 46, 100, 0.958277) 12.51%, rgba(28, 54, 89, 0.911419) 31.95%, rgba(22, 81, 66, 0.793286) 47.98%, rgba(51, 88, 140, 0.913498) 70.93%, #4A61C4 81.76%)`,
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FCD64C] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[#FF8C00] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#2E3B78] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute left-[5%] top-[20%] hidden md:block opacity-30">
        <svg width="120" height="140" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.4"/>
        </svg>
      </div>
      <div className="absolute right-[5%] top-[30%] hidden md:block opacity-30">
        <svg width="140" height="160" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.4"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center pt-24 md:pt-32">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/white_logo.png"
            alt="Zambeel Logo"
            width={200}
            height={60}
            className="h-12 md:h-16 object-contain"
          />
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-block mb-6 px-6 py-2 bg-[#FCD64C]/20 backdrop-blur-sm rounded-full border border-[#FCD64C]/30">
          <span className="text-[#FCD64C] font-semibold text-sm md:text-base tracking-wide uppercase">
            {t('comingSoon.badge') || 'Coming Soon'}
          </span>
        </div>

        {/* Main Title */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {description}
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto mb-12">
          {[
            { label: t('comingSoon.days') || 'Days', value: timeLeft.days },
            { label: t('comingSoon.hours') || 'Hours', value: timeLeft.hours },
            { label: t('comingSoon.minutes') || 'Minutes', value: timeLeft.minutes },
            { label: t('comingSoon.seconds') || 'Seconds', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 pb-12 md:pb-16">
          <a
            href={i18n.language === 'ar' ? 'https://whatsapp.com/channel/0029Vb1chFnH5JLr8lKoXE2I' : 'https://whatsapp.com/channel/0029VaZgjwHIN9iiX6YpEj0w'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-white text-xl"></i>
          </a>
          <a
            href={i18n.language === 'ar' ? 'https://www.facebook.com/share/1AMQmX7cT6/?mibextid=wwXIfr' : 'https://www.facebook.com/share/1CHT3yCtCm/'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="Facebook"
          >
            <i className="fa-brands fa-facebook-f text-white text-xl"></i>
          </a>
          <a
            href={i18n.language === 'ar' ? 'https://www.instagram.com/zambeel_ecommerce?igsh=MWg0emhiMndqY3lq' : 'https://www.instagram.com/zambeel.ecommerce?igsh=a20zdW9naGE2aDA4'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram text-white text-xl"></i>
          </a>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;

