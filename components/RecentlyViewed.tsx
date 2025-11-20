"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRecentlyViewedStore } from '@/store/recentlyViewed';
import { useTranslation } from '@/lib/translationContext';
import { urlFor } from '@/sanity/lib/image';

export default function RecentlyViewed() {
  const { recentlyViewedItems, removeFromRecentlyViewed, clearRecentlyViewed } = useRecentlyViewedStore();
  const { t, language } = useTranslation();

  // Show only first 3 items with valid slug
  const validProducts = recentlyViewedItems.filter(product => product.slug?.current).slice(0, 3);

  return (
    <section className="py-12" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white">
              {t('recentlyViewed') || 'Recently Viewed'}
            </h2>
            <p className="text-xs text-gray-500">Debug: {recentlyViewedItems.length} items stored</p>
          </div>
          {recentlyViewedItems.length > 0 && (
            <button
              onClick={clearRecentlyViewed}
              className="text-sm text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              {t('clearAll') || 'Clear All'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {validProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <Link href={`/product/${product.slug.current}`}>
                <div className="aspect-square relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 mb-3">
                  {product.gallery && product.gallery[0] && (
                    <Image
                      src={urlFor(product.gallery[0]).width(300).height(300).url()}
                      alt={product.title || 'Product'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromRecentlyViewed(product._id);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-white/80 dark:bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove from recently viewed"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </Link>

              <div className="space-y-1">
                <Link href={`/product/${product.slug.current}`}>
                  <h3 className="font-medium text-sm text-black dark:text-white line-clamp-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {product.title || 'Untitled Product'}
                  </h3>
                </Link>
                <div className="flex items-center gap-2">
                  {product.originalPrice ? (
                    <>
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                        {product.price} DT
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                        {product.originalPrice} DT
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-black dark:text-white">
                      {product.price} DT
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}