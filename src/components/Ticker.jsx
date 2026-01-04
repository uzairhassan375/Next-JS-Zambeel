'use client';

import { useMemo } from 'react';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

export default function Ticker() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const getWhatsAppLink = () => {
    return currentLanguage === 'ar' 
      ? 'https://whatsapp.com/channel/0029Vb1chFnH5JLr8lKoXE2I'
      : 'https://whatsapp.com/channel/0029VaZgjwHIN9iiX6YpEj0w';
  };

  const registerLink = 'https://docs.google.com/forms/d/e/1FAIpQLSeA4WTKzxanXcM4inCxjpGsimihwMlbQh50dK1UMSjUhPEzYQ/viewform';
  
  // Use useMemo to ensure translations update when language changes
  const tickerItems = useMemo(() => {
    const tickerText = t('homepage.ticker.superclass', {
      defaultValue: currentLanguage === 'ar' 
        ? 'لا تدرس التجارة الإلكترونية، أطلقها مباشرة مع زمبيل سوبر كلاس: '
        : "Don't study Ecommerce, Launch it LIVE with Zambeel SuperClass: "
    });
    const registerText = t('homepage.ticker.registerNow', {
      defaultValue: currentLanguage === 'ar' ? 'سجل الآن!' : 'Register Now!'
    });
    
    return [
      { 
        text: tickerText,
        registerText: registerText,
        link: registerLink 
      },
    ];
  }, [t, currentLanguage, registerLink]);

  return (
    <div className="w-screen bg-[#2E3B78] text-white py-2 md:py-3 mt-4 md:mt-0 overflow-hidden relative z-10" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      <Marquee 
        speed={50} 
        gradient={true} 
        gradientColor={[46, 59, 120]} 
        gradientWidth={50}
        pauseOnHover={true}
        direction={currentLanguage === 'ar' ? 'left' : 'right'}
        autoFill={true}
      >
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center mx-4 md:mx-8 whitespace-nowrap text-sm md:text-base">
            <span className="px-1">{item.text}</span>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-bold ml-1 md:ml-2 text-[#FCD64C] px-1"
              >
                {item.registerText}
              </a>
            )}
            <span className="mx-4 md:mx-8 text-white opacity-60">•</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

