import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LoyaltyTransaction {
  id: string;
  type: 'purchase' | 'review' | 'share' | 'signup_bonus' | 'spin';
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

const POINTS_PER_DOLLAR = 1;
const BONUS_POINTS = {
  review: 10,
  share: 5,
  firstPurchase: 50,
};

type LoyaltyState = {
  points: number;
  transactions: LoyaltyTransaction[];
  addPurchasePoints: (orderTotal: number, orderId: string) => void;
  addReviewPoints: () => number;
  addSharePoints: () => number;
  addSpinPoints: (points: number, reward: string) => number;
  deductPoints: (amount: number, reason: string) => boolean;
  resetLoyalty: () => void;
  getTier: (points: number) => string;
  getNextTierThreshold: (points: number) => number | null;
  getPointsToNextTier: (points: number) => number;
};

export const useLoyaltyStore = create<LoyaltyState>()(
  persist(
    (set, get) => ({
      points: 0,
      transactions: [],

      addPurchasePoints: (orderTotal: number, orderId: string) => {
        set((state) => {
          const pointsEarned = Math.floor(orderTotal * POINTS_PER_DOLLAR);
          const isFirstPurchase = !state.transactions.some(t => t.type === 'purchase');
          const totalPoints = pointsEarned + (isFirstPurchase ? BONUS_POINTS.firstPurchase : 0);

          const transaction: LoyaltyTransaction = {
            id: crypto.randomUUID(),
            type: 'purchase',
            points: totalPoints,
            description: `Earned ${totalPoints} points from purchase of ${orderTotal} DT`,
            timestamp: Date.now(),
            orderId,
          };

          return {
            points: state.points + totalPoints,
            transactions: [transaction, ...state.transactions],
          };
        });
      },

      addReviewPoints: () => {
        const points = BONUS_POINTS.review;
        set((state) => {
          const transaction: LoyaltyTransaction = {
            id: crypto.randomUUID(),
            type: 'review',
            points,
            description: `Earned ${points} points for writing a review`,
            timestamp: Date.now(),
          };
          return {
            points: state.points + points,
            transactions: [transaction, ...state.transactions],
          };
        });
        return points;
      },

      addSharePoints: () => {
        const points = BONUS_POINTS.share;
        set((state) => {
          const transaction: LoyaltyTransaction = {
            id: crypto.randomUUID(),
            type: 'share',
            points,
            description: `Earned ${points} points for sharing a product`,
            timestamp: Date.now(),
          };
          return {
            points: state.points + points,
            transactions: [transaction, ...state.transactions],
          };
        });
        return points;
      },

      addSpinPoints: (pointsEarned: number, reward: string) => {
        set((state) => {
          const transaction: LoyaltyTransaction = {
            id: crypto.randomUUID(),
            type: 'spin',
            points: pointsEarned,
            description: `Earned ${pointsEarned} points from spinning wheel: ${reward}`,
            timestamp: Date.now(),
          };
          return {
            points: state.points + pointsEarned,
            transactions: [transaction, ...state.transactions],
          };
        });
        return pointsEarned;
      },

      deductPoints: (amount: number, reason: string) => {
        const currentPoints = get().points;
        if (currentPoints < amount) return false;

        set((state) => {
          const transaction: LoyaltyTransaction = {
            id: crypto.randomUUID(),
            type: 'purchase', // Using purchase type for redemption
            points: -amount,
            description: `Redeemed ${amount} points: ${reason}`,
            timestamp: Date.now(),
          };
          return {
            points: state.points - amount,
            transactions: [transaction, ...state.transactions],
          };
        });
        return true;
      },

      resetLoyalty: () => set({ points: 0, transactions: [] }),

      getTier: (points: number) => {
        if (points >= 1000) return 'goldTier';
        if (points >= 500) return 'silverTier';
        if (points >= 100) return 'bronzeTier';
        return 'newMember';
      },

      getNextTierThreshold: (points: number) => {
        if (points < 100) return 100;
        if (points < 500) return 500;
        if (points < 1000) return 1000;
        return null;
      },

      getPointsToNextTier: (points: number) => {
        const next = get().getNextTierThreshold(points);
        return next ? next - points : 0;
      },
    }),
    {
      name: "loyalty-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);