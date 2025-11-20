"use client";

import React from 'react';
import Link from 'next/link';
import { useRecentlyViewedStore } from '@/store/recentlyViewed';
import { useTranslation } from '@/lib/translationContext';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

export default function RecentlyViewedPage() {
  const { recentlyViewedItems, clearRecentlyViewed } = useRecentlyViewedStore();
  const { t, language } = useTranslation();

  const hasItems = recentlyViewedItems.length > 0;

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black dark:text-white">
            {t('recentlyViewed') || 'Recently Viewed'}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {t('recentlyViewedDescription') || 'Your recently viewed products are saved here for easy access'}
          </p>
          <p className="text-xs text-gray-500 mt-4">
            {t('totalItems')} {recentlyViewedItems.length}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {!hasItems ? (
          <div className="bg-card rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">
                {t('noRecentlyViewed') || 'No recently viewed items yet'}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mb-6">
                {t('startBrowsing') || 'Start browsing products to see them here'}
              </p>
              <Link href="/products">
                <Button className="bg-zinc-700 dark:bg-white text-white dark:text-zinc-700 hover:bg-zinc-800 dark:hover:bg-gray-100">
                  {t('browseProducts') || 'Browse Products'}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-1 sm:mb-2">
                  {t('yourRecentlyViewed') || 'Your Recently Viewed Products'}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                  {recentlyViewedItems.length} {t('items') || 'items'}
                </p>
              </div>
              <Button
                onClick={clearRecentlyViewed}
                variant="outline"
                className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-xs sm:text-sm"
              >
                {t('clearAll') || 'Clear All'}
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recentlyViewedItems.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8 sm:mt-12 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 sm:p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="text-sm sm:text-base font-semibold text-blue-800 dark:text-blue-300 mb-1 sm:mb-2">
                  {t('continueShopping') || 'Continue Shopping'}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  {t('discoverMoreProducts') || 'Discover more products in our collection'}
                </p>
                <Link href="/products">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm">
                    {t('shopNow') || 'Shop Now'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}