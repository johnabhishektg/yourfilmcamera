import { create } from "zustand";
import { CartSlice, createCartSlice } from "./slices/createCartSlice";
import { createProductSlice, ProductSlice } from "./slices/createProductSlice";

type StoreState = ProductSlice & CartSlice;

export const useShoppingCart = create<StoreState>()((...a) => ({
  ...createProductSlice(...a),
  ...createCartSlice(...a),
}));
