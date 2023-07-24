import { StateCreator } from "zustand";
import { Product } from "./createProductSlice";

export interface CartSlice {
  cart: Product[];
  increaseCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, action: "increase" | "decrease") => void;
  getItemQuantity: (productId: number) => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  cart: [],
  increaseCart: (product: Product) => {
    const cart = get().cart;
    const findProduct = cart.find((p) => p.id === product.id);
    if (findProduct) {
      findProduct.quantity! += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    set({ cart });
  },
  removeFromCart: (productId: number) => {
    set({ cart: get().cart.filter((product) => product.id !== productId) });
  },
  updateQuantity: (productId: number, action: "increase" | "decrease") => {
    const cart = get().cart;
    const findProduct = cart.find((p) => p.id === productId);
    if (findProduct) {
      if (action === "decrease") {
        findProduct.quantity =
          findProduct.quantity! > 1
            ? findProduct.quantity! - 1
            : findProduct.quantity!;
      } else {
        findProduct.quantity! += 1;
      }
    }
    set({ cart });
  },
  getItemQuantity(productId: number) {
    const cart = get().cart;
    const findProduct = cart.find((p) => p.id === productId);
  },
});
