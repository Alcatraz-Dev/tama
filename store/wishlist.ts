import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/lib/types";

type WishlistState = {
  wishlistItems: Product[];
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistItems: [],

      addToWishlist: (item) =>
        set((state) => {
          const existing = state.wishlistItems.find((i) => i._id === item._id);
          if (!existing) {
            return {
              wishlistItems: [
                ...state.wishlistItems,
                { ...item, addedAt: new Date().toISOString() },
              ],
            };
          }
          return state;
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlistItems: state.wishlistItems.filter((i) => i._id !== id),
        })),

      clearWishlist: () => set({ wishlistItems: [] }),

      isInWishlist: (id) => {
        return get().wishlistItems.some((item) => item._id === id);
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);