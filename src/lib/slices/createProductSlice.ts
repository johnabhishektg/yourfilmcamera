import { StateCreator } from "zustand";
import productjson from "../../../products.json";

export interface Product {
  images: string;
  id: number;
  productId: number;
  category: string;
  image: string;
  name: string;
  new: boolean;
  description: string;
  price: number;
  quantity?: number;
}

export interface ProductSlice {
  products: Product[];
  // fetchProducts: () => void;
}
export const createProductSlice: StateCreator<ProductSlice> = () => ({
  products: [],
  // fetchProducts: async () => {
  // const res = await fetch(
  // "https://api.escuelajs.co/api/v1/products?offset=0&limit=20"
  // );
  // set({ products: await res.json() });
  // },
});
