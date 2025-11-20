"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Trophy, Gift, TrendingUp } from 'lucide-react';
import { useLoyalty } from '@/lib/useLoyalty';
import { useTranslation } from '@/lib/translationContext';

interface LoyaltyStatusProps {
  compact?: boolean;
}

export default function LoyaltyStatus({ compact = false }: LoyaltyStatusProps) {
  const { points, tier } = useLoyalty();
  const { t } = useTranslation();

  const getTierColor = (tierKey: string) => {
    switch (tierKey) {
      case 'goldTier': return 'text-yellow-500';
      case 'silverTier': return 'text-gray-400';
      case 'bronzeTier': return 'text-amber-600';
      default: return 'text-gray-500';
    }
  };

  const getTierIcon = (tierKey: string) => {
    switch (tierKey) {
      case 'goldTier': return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'silverTier': return <Star className="w-4 h-4 text-gray-400" />;
      case 'bronzeTier': return <Star className="w-4 h-4 text-amber-600" />;
      default: return <Star className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTranslatedTierName = (tierKey: string) => {
    return t(tierKey as any) || tierKey;
  };

  if (compact) {
    // Compact version for navbar
    return (
      <Link href="/loyalty">
        <div className="relative bg-card p-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors">
          <div className={`flex items-center gap-1 ${getTierColor(tier)}`}>
            {getTierIcon(tier)}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-semibold text-black dark:text-white">
              {points}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {t('points') || 'pts'}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Full version for dedicated pages
  const { nextTierThreshold, pointsToNextTier, transactions } = useLoyalty();

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
          <Gift className="w-5 h-5" />
          {t('loyaltyProgram') || 'Loyalty Program'}
        </h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getTierColor(tier)} bg-opacity-10`}>
          {getTierIcon(tier)}
          {getTranslatedTierName(tier)}
        </div>
      </div>

      {/* Points Display */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('totalPoints') || 'Total Points'}
            </p>
            <p className="text-2xl font-bold text-black dark:text-white">
              {points.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('points') || 'Points'}
            </p>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">{t('pointsPerDT') || '+1 per DT'}</span>
            </div>
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTierThreshold && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>{t('nextTier') || 'Next Tier'}</span>
              <span>{pointsToNextTier} {t('points') || 'points'} {t('pointsToGo') || 'to go'}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((points / nextTierThreshold) * 100, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      {transactions.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-black dark:text-white mb-3">
            {t('recentActivity') || 'Recent Activity'}
          </h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {transactions.slice(0, 5).map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${
                    transaction.points > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    +{transaction.points}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {transactions.length === 0 && (
        <div className="text-center py-8">
          <Gift className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('startEarningPoints') || 'Start shopping to earn loyalty points!'}
          </p>
        </div>
      )}
    </div>
  );
}