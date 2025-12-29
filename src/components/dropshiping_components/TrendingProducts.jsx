'use client';

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const TrendingProducts = () => {
  const { t } = useTranslation();
  
  const trendingProducts = [
    {
      img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdCUyMGltYWdlc3xlbnwwfDF8MHx8fDA%3D",
      nameKey: "nikeShoes",
      sold: "2.4k sold",
      rank: "1st",
      roas: "5x ROAS",
      price: "21 AED",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1677838847721-2bf14b48c256?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdCUyMGltYWdlc3xlbnwwfDF8MHx8fDA%3D",
      nameKey: "audionicHeadphones",
      sold: "3.8k sold",
      rank: "2nd",
      roas: "6x ROAS",
      price: "24 AED",
    },
    {
      img: "https://images.unsplash.com/photo-1691415993286-91f1586a5e20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2R1Y3QlMjBpbWFnZXN8ZW58MHwxfDB8fHww",
      nameKey: "rolexWatch",
      sold: "1.6k sold",
      rank: "3rd",
      roas: "4x ROAS",
      price: "18 AED",
    },
    {
      img: "https://images.unsplash.com/photo-1648104063828-d99e9599959e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2R1Y3QlMjBpbWFnZXN8ZW58MHwxfDB8fHww",
      nameKey: "selfieStick",
      sold: "7.4k sold",
      rank: "4th",
      roas: "5x ROAS",
      price: "31 AED",
    },
    {
      img: "https://images.unsplash.com/photo-1703052399541-34d3bfa12e9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHByb2R1Y3QlMjBpbWFnZXN8ZW58MHwxfDB8fHww",
      nameKey: "rgbMouse",
      sold: "11.9k sold",
      rank: "5th",
      roas: "4x ROAS",
      price: "16 AED",
    },
    {
      img: "https://images.unsplash.com/photo-1625123625854-43c9e8da9803?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHByb2R1Y3QlMjBpbWFnZXN8ZW58MHwxfDB8fHww",
      nameKey: "roninMicrophone",
      sold: "9.2k sold",
      rank: "6th",
      roas: "4x ROAS",
      price: "22 AED",
    },
  ];
  const carouselRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="trending-products"
      className="w-full mx-auto py-8 md:py-8 px-6 sm:px-10 lg:px-12"
      style={{
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(180deg, rgba(79, 102, 200, 0.3) 0%, rgba(79, 102, 200, 0.1) 100%)",
      }}
    >
      <div className="max-w-[1050px] mx-auto text-center">
        <h2 className="text-[20px] md:text-[36px] font-[700] leading-[100%] tracking-[0] text-center text-white mb-10" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '700' }}>
          {t('dropshipping.trendingProducts.title')}
        </h2>

        {/* ==================== */}
        {/* MOBILE VIEW (below 850px) - 2x2 grid with Show More/Less buttons */}
        {/* ==================== */}
        <div className="min-[850px]:hidden">
          {/* 2x2 Grid for first 4 cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {trendingProducts.slice(0, 4).map((product, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-2xl w-full relative overflow-hidden"
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="relative">
                  <Image
                    src={product.img}
                    alt={t(`trendingProducts.products.${product.nameKey}`)}
                    width={500}
                    height={256}
                    className="w-full h-64 object-cover"
                  />
                  <span className="absolute top-3 left-3 text-white text-xs font-medium">
                    {product.sold.replace('sold', t('trendingProducts.sold'))}
                  </span>
                  <div
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#243a86] border-2 border-white"
                    style={{ backgroundColor: "#FFD24C" }}
                  >
                    {t(`trendingProducts.rank.${product.rank}`)}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="font-semibold text-white text-sm mb-2 text-left leading-tight">
                      {t(`trendingProducts.products.${product.nameKey}`)}
                    </div>
                    <div className="flex gap-2 text-xs justify-start">
                      <span className="bg-[#243a86] text-white px-2 py-1 rounded-full font-medium">
                        {product.roas.replace('ROAS', t('trendingProducts.roas'))}
                      </span>
                      <span className="bg-[#ffd24c] text-[#243a86] px-2 py-1 rounded-full font-bold">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All Products Button */}
          {!showMore && (
            <a
              href="https://www.myzambeel.com/pages/products"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FCD64C] text-[#243a86] px-8 py-3 rounded-full font-bold text-base hover:bg-[#ffc933] transition-colors mb-6 inline-block"
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)" }}
            >
              {t('common.allProducts')}
            </a>
          )}

          {/* Additional cards when Show More is clicked */}
          {showMore && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {trendingProducts.slice(4).map((product, idx) => (
                  <div
                    key={idx + 4}
                    className="bg-gray-800 rounded-2xl w-full relative overflow-hidden"
                    style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)" }}
                  >
                    <div className="relative">
                      <Image
                        src={product.img}
                        alt={t(`trendingProducts.products.${product.nameKey}`)}
                        width={500}
                        height={256}
                        className="w-full h-64 object-cover"
                      />
                      <span className="absolute top-3 left-3 text-white text-xs font-medium">
                        {product.sold.replace('sold', t('trendingProducts.sold'))}
                      </span>
                      <div
                        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#243a86] border-2 border-white"
                        style={{ backgroundColor: "#FFD24C" }}
                      >
                        {t(`trendingProducts.rank.${product.rank}`)}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="font-semibold text-white text-sm mb-2 text-left leading-tight">
                          {t(`trendingProducts.products.${product.nameKey}`)}
                        </div>
                        <div className="flex gap-2 text-xs justify-start">
                          <span className="bg-[#243a86] text-white px-2 py-1 rounded-full font-medium">
                            {product.roas.replace('ROAS', t('trendingProducts.roas'))}
                          </span>
                          <span className="bg-[#ffd24c] text-[#243a86] px-2 py-1 rounded-full font-bold">
                            {product.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Show Less Button */}
              <button
                onClick={() => setShowMore(false)}
                className="bg-[#243a86] text-white px-8 py-3 rounded-full font-medium text-base hover:bg-opacity-90 transition-colors"
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)" }}
              >
                {t('common.showLess')}
              </button>
            </>
          )}
        </div>

        {/* ==================== */}
        {/* DESKTOP VIEW (850px and above) - Horizontal carousel */}
        {/* ==================== */}
        <div className="hidden min-[850px]:block relative">
          {/* Product Carousel */}
          <div
            className="mb-10 overflow-x-hidden"
            ref={carouselRef}
          >
            <div className="flex gap-8 justify-start w-max" style={{ paddingBottom: "1rem" }}>
              {trendingProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 rounded-2xl w-52 shrink-0 relative overflow-hidden"
                  style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)" }}
                >
                  <div className="relative">
                    <Image
                      src={product.img}
                      alt={t(`trendingProducts.products.${product.nameKey}`)}
                      width={500}
                      height={256}
                      className="w-full h-64 object-cover"
                    />
                    <span className="absolute top-3 left-3 text-white text-xs font-medium">
                      {product.sold.replace('sold', t('trendingProducts.sold'))}
                    </span>
                    <div
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#243a86] border-2 border-white"
                      style={{ backgroundColor: "#FFD24C" }}
                    >
                      {t(`trendingProducts.rank.${product.rank}`)}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="font-semibold text-white text-sm mb-2 text-left">
                        {t(`trendingProducts.products.${product.nameKey}`)}
                      </div>
                      <div className="flex gap-2 text-xs justify-start">
                        <span className="bg-[#243a86] text-white px-2 py-1 rounded-full font-medium">
                          {product.roas.replace('ROAS', t('trendingProducts.roas'))}
                        </span>
                        <span className="bg-[#ffd24c] text-[#243a86] px-2 py-1 rounded-full font-bold">
                          {product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="relative mt-6 flex items-center justify-center">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#243a86] text-white w-12 h-12 rounded-full font-medium text-base hover:bg-opacity-90 transition-colors flex items-center justify-center"
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)" }}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            <a
              href="https://portal.myzambeel.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#FCD64C] text-[#243a86] px-8 py-3 rounded-full font-bold text-base hover:bg-[#ffc933] transition-colors"
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)" }}
            >
              <span>{t('common.viewAllProducts')}</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#243a86] text-white w-12 h-12 rounded-full font-medium text-base hover:bg-opacity-90 transition-colors flex items-center justify-center"
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)" }}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;