"use client";

import React from 'react';
import LoyaltyStatus from '@/components/LoyaltyStatus';
import { useTranslation } from '@/lib/translationContext';

export default function LoyaltyPage() {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="flex justify-center items-center md:m-10 m-5">
        <section className="w-full max-w-6xl mx-auto px-6 py-16 bg-card rounded-3xl p-5">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white mb-4">
              {t('loyaltyProgram') || 'Loyalty Program'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              {t('loyaltyDescription') || 'Earn points with every purchase and unlock exclusive rewards'}
            </p>
          </div>

          {/* Loyalty Status Component */}
          <div className="mb-8 sm:mb-12">
            <LoyaltyStatus />
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* How to Earn Points */}
            <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black dark:text-white mb-4 sm:mb-6">
                {t('howToEarnPoints') || 'How to Earn Points'}
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">{t('earnPointsPerDT') || 'Earn 1 point for every 1 DT spent'}</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">{t('bonusPointsReviews') || 'Bonus points for reviews and referrals'}</span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">{t('doublePointsPromotions') || 'Double points on special promotions'}</span>
                </li>
              </ul>
            </div>

            {/* Tier Benefits */}
            <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black dark:text-white mb-4 sm:mb-6">
                {t('tierBenefits') || 'Tier Benefits'}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-amber-700 dark:text-amber-300 text-sm sm:text-base">
                      {t('bronzeTier') || 'Bronze'}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {t('pointsRequired', { points: 0 }) || '0+ points'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-500 rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      {t('silverTier') || 'Silver'}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {t('pointsRequired', { points: 500 }) || '500+ points'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-yellow-700 dark:text-yellow-300 text-sm sm:text-base">
                      {t('goldTier') || 'Gold'}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {t('pointsRequired', { points: 1000 }) || '1000+ points'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 sm:p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="text-lg sm:text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">
                {t('startEarningPoints') || 'Start shopping to earn loyalty points!'}
              </h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                {t('keepShopping') || 'Keep shopping to earn more points!'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}