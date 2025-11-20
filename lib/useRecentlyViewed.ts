import { useState, useEffect, useCallback } from 'react';

export interface RecentlyViewedProduct {
  _id: string;
  slug: { current: string };
  title: string;
  images: Array<{
    _key?: string;
    _type: string;
    asset: {
      url: string;
      _ref?: string;
    };
  }>;
  price: number;
  salePrice?: number;
}

const RECENTLY_VIEWED_KEY = 'tama_recently_viewed';
const MAX_RECENTLY_VIEWED = 10;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate that parsed data is an array and filter out invalid items
        if (Array.isArray(parsed)) {
          const validProducts = parsed.filter(product =>
            product &&
            typeof product === 'object' &&
            product._id &&
            product.slug &&
            product.slug.current &&
            product.title
          );
          setRecentlyViewed(validProducts);
        }
      }
    } catch (error) {
      console.error('Error loading recently viewed products:', error);
      // Clear corrupted data
      localStorage.removeItem(RECENTLY_VIEWED_KEY);
    }
  }, []);

  // Save to localStorage whenever recentlyViewed changes
  useEffect(() => {
    try {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error('Error saving recently viewed products:', error);
    }
  }, [recentlyViewed]);

  const addToRecentlyViewed = useCallback((product: RecentlyViewedProduct) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p._id !== product._id);

      // Add to beginning
      const updated = [product, ...filtered];

      // Limit to MAX_RECENTLY_VIEWED
      return updated.slice(0, MAX_RECENTLY_VIEWED);
    });
  }, []);

  const removeFromRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed(prev => prev.filter(p => p._id !== productId));
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, []);

  return {
    recentlyViewed,
    addToRecentlyViewed,
    removeFromRecentlyViewed,
    clearRecentlyViewed
  };
}