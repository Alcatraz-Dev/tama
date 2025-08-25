// store/cart.ts
import { create } from "zustand";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.id !== id),
    })),
  clearCart: () => set({ cartItems: [] }),
}));