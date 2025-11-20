import { useState, useEffect, useCallback } from "react";
import { RecentlyViewedProduct } from "@/lib/types";

const RECENTLY_VIEWED_KEY = "tama_recently_viewed";
const storage = typeof window !== "undefined" ? localStorage : null; // change here
const MAX_RECENTLY_VIEWED = 10;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>(
    []
  );
  useEffect(() => {
    if (!storage) return;
    storage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);
  // Load recently viewed from storage on mount
  useEffect(() => {
    if (!storage) return;
    try {
      const stored = storage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate that parsed data is an array and filter out invalid items
        if (Array.isArray(parsed)) {
          const validProducts = parsed.filter(
            (product) =>
              product &&
              typeof product === "object" &&
              product._id &&
              product.slug &&
              product.slug.current &&
              product.title
          );
          setRecentlyViewed(validProducts);
        }
      }
    } catch (error) {
      console.error("Error loading recently viewed products:", error);
      // Clear corrupted data
      storage.removeItem(RECENTLY_VIEWED_KEY);
    }
  }, []);

  // Save to storage whenever recentlyViewed changes
  useEffect(() => {
    if (!storage) return;
    try {
      storage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error("Error saving recently viewed products:", error);
    }
  }, [recentlyViewed]);

 const addToRecentlyViewed = useCallback((product: RecentlyViewedProduct) => {
  console.log("Adding to recently viewed:", product._id);
  setRecentlyViewed(prev => {
    const filtered = prev.filter(p => p._id !== product._id);
    const updated = [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
    console.log("Updated recently viewed:", updated.map(p => p._id));
    if (storage) storage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
    return updated;
  });
}, []);

  const removeFromRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => prev.filter((p) => p._id !== productId));
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, []);

  return {
    recentlyViewed,
    addToRecentlyViewed,
    removeFromRecentlyViewed,
    clearRecentlyViewed,
  };
}
