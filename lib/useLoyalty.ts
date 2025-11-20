import { useState, useEffect, useCallback } from 'react';

interface LoyaltyTransaction {
  id: string;
  type: 'purchase' | 'review' | 'share' | 'signup_bonus';
  points: number;
  description: string;
  timestamp: number;
  orderId?: string;
}

interface LoyaltyData {
  points: number;
  transactions: LoyaltyTransaction[];
  lastUpdated: number;
}

const LOYALTY_STORAGE_KEY = 'tama_loyalty';
const POINTS_PER_DOLLAR = 1; // 1 point per DT spent
const BONUS_POINTS = {
  review: 10,
  share: 5,
  firstPurchase: 50,
};

export function useLoyalty() {
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyData>({
    points: 0,
    transactions: [],
    lastUpdated: Date.now(),
  });

  // Load loyalty data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOYALTY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLoyaltyData(parsed);
      }
    } catch (error) {
      console.error('Error loading loyalty data:', error);
    }
  }, []);

  // Save to localStorage whenever loyaltyData changes
  useEffect(() => {
    try {
      localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(loyaltyData));
    } catch (error) {
      console.error('Error saving loyalty data:', error);
    }
  }, [loyaltyData]);

  const addPoints = (type: LoyaltyTransaction['type'], amount: number, description: string, orderId?: string) => {
    const transaction: LoyaltyTransaction = {
      id: crypto.randomUUID(),
      type,
      points: amount,
      description,
      timestamp: Date.now(),
      orderId,
    };

    setLoyaltyData(prev => ({
      ...prev,
      points: prev.points + amount,
      transactions: [transaction, ...prev.transactions],
      lastUpdated: Date.now(),
    }));

    return transaction;
  };

  const addPurchasePoints = useCallback((orderTotal: number, orderId: string) => {
    const pointsEarned = Math.floor(orderTotal * POINTS_PER_DOLLAR);

    // Use functional update to check current state
    setLoyaltyData(prev => {
      const isFirstPurchase = !prev.transactions.some(t => t.type === 'purchase');
      let totalPoints = pointsEarned;

      if (isFirstPurchase) {
        totalPoints += BONUS_POINTS.firstPurchase;
      }

      const transaction: LoyaltyTransaction = {
        id: crypto.randomUUID(),
        type: 'purchase',
        points: totalPoints,
        description: `Earned ${totalPoints} points from purchase`,
        timestamp: Date.now(),
        orderId,
      };

      return {
        ...prev,
        points: prev.points + totalPoints,
        transactions: [transaction, ...prev.transactions],
        lastUpdated: Date.now(),
      };
    });
  }, []);

  const addReviewPoints = useCallback(() => {
    addPoints('review', BONUS_POINTS.review, `Earned ${BONUS_POINTS.review} points for writing a review`);
    return BONUS_POINTS.review;
  }, []);

  const addSharePoints = useCallback(() => {
    addPoints('share', BONUS_POINTS.share, `Earned ${BONUS_POINTS.share} points for sharing a product`);
    return BONUS_POINTS.share;
  }, []);

  const getTier = (points: number) => {
    if (points >= 1000) return 'goldTier';
    if (points >= 500) return 'silverTier';
    if (points >= 100) return 'bronzeTier';
    return 'newMember';
  };

  const getNextTierThreshold = (points: number) => {
    if (points < 100) return 100;
    if (points < 500) return 500;
    if (points < 1000) return 1000;
    return null; // Max tier reached
  };

  const getPointsToNextTier = (points: number) => {
    const nextThreshold = getNextTierThreshold(points);
    return nextThreshold ? nextThreshold - points : 0;
  };

  const resetLoyalty = () => {
    setLoyaltyData({
      points: 0,
      transactions: [],
      lastUpdated: Date.now(),
    });
  };

  return {
    points: loyaltyData.points,
    transactions: loyaltyData.transactions,
    tier: getTier(loyaltyData.points),
    nextTierThreshold: getNextTierThreshold(loyaltyData.points),
    pointsToNextTier: getPointsToNextTier(loyaltyData.points),
    addPurchasePoints,
    addReviewPoints,
    addSharePoints,
    resetLoyalty,
  };
}