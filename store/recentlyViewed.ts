import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RecentlyViewedProduct } from "@/lib/types";

type RecentlyViewedState = {
  recentlyViewedItems: RecentlyViewedProduct[];
  addToRecentlyViewed: (item: RecentlyViewedProduct) => void;
  removeFromRecentlyViewed: (id: string) => void;
  clearRecentlyViewed: () => void;
};

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      recentlyViewedItems: [],

    addToRecentlyViewed: (item) =>
      set((state) => {
        const filtered = state.recentlyViewedItems.filter((i) => i._id !== item._id);
        return {
          recentlyViewedItems: [item, ...filtered].slice(0, 10), // Keep max 10
        };
      }),

    removeFromRecentlyViewed: (id) =>
      set((state) => ({
        recentlyViewedItems: state.recentlyViewedItems.filter((i) => i._id !== id),
      })),

    clearRecentlyViewed: () => set({ recentlyViewedItems: [] }),
  }),
  {
    name: "recently-viewed-storage",
    storage: createJSONStorage(() => sessionStorage),
    version: 1,
    migrate: (persistedState: any, version: number) => {
      if (version === 0) {
        // Migrate from old format with 'images' to 'gallery'
        const migrated = {
          ...persistedState,
          recentlyViewedItems: persistedState.recentlyViewedItems?.map((item: any) => ({
            ...item,
            gallery: item.images || item.gallery,
            description: item.description || '',
            inStock: item.inStock !== undefined ? item.inStock : true,
            originalPrice: item.salePrice || item.originalPrice,
          })) || [],
        };
        return migrated;
      }
      return persistedState;
    },
  }
)
);