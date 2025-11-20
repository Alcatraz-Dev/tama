"use client";

import React from "react";
import LoyaltyStatus from "@/components/LoyaltyStatus";
import { useTranslation } from "@/lib/translationContext";

export default function LoyaltyPage() {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black dark:text-white">
            {t("loyaltyProgram") || "Loyalty Program"}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {t("loyaltyDescription") ||
              "Earn points with every purchase and unlock exclusive rewards"}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-card rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg">
          {/* Loyalty Status Component */}
          <div className="mb-8 sm:mb-12">
            <LoyaltyStatus />
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* How to Earn Points */}
            <div className="bg-card p-3 sm:p-4 lg:p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-black dark:text-white mb-3 sm:mb-4">
                {t("howToEarnPoints") || "How to Earn Points"}
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">
                    {t("earnPointsPerDT") ||
                      "Earn 1 point for every 1 DT spent"}
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">
                    {t("bonusPointsReviews") ||
                      "Bonus points for reviews and referrals"}
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">
                    {t("doublePointsPromotions") ||
                      "Double points on special promotions"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Tier Benefits */}
            <div className="bg-card p-3 sm:p-4 lg:p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-black dark:text-white mb-3 sm:mb-4">
                {t("tierBenefits") || "Tier Benefits"}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-amber-700 dark:text-amber-300 text-xs sm:text-sm">
                      {t("bronzeTier") || "Bronze"}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {t("pointsRequired", { points: 0 }) || "0+ points"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-500 rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                      {t("silverTier") || "Silver"}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {t("pointsRequired", { points: 500 }) || "500+ points"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-yellow-700 dark:text-yellow-300 text-xs sm:text-sm">
                      {t("goldTier") || "Gold"}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {t("pointsRequired", { points: 1000 }) || "1000+ points"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 sm:p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="text-base sm:text-lg font-semibold text-blue-800 dark:text-blue-300 mb-1 sm:mb-2">
                {t("startEarningPoints") ||
                  "Start shopping to earn loyalty points!"}
              </h4>
              <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
                {t("keepShopping") || "Keep shopping to earn more points!"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
