import { create } from "zustand";

export type CartItem = {
  _id: string; // Sanity product _id
  title: string;
  slug: string;
  price: number;
  gallery?: any[]; // Sanity gallery array (images + optional video)
  color?: string; // user selected
  size?: string; // user selected
  quantity: number;
  inStock: boolean;
};

type CartState = {
  cartItems: CartItem[];
  discount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  setDiscount: (amount: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  discount: 0,

  addToCart: (item) =>
    set((state) => {
      const existing = state.cartItems.find(
        (i) => i._id === item._id && i.size === item.size && i.color === item.color
      );
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i._id === item._id && i.size === item.size && i.color === item.color
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i._id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),

  increaseQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((i) =>
        i._id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((i) =>
        i._id === id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      ),
    })),

  setDiscount: (amount) => set({ discount: amount }),
}));