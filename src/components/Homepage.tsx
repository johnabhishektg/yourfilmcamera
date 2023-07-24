"use client";

import Hero from "./Hero";
import productjson from "../../products.json";
import ProductItems from "./ProductItems";
import Link from "next/link";
import { Button } from "./ui/Button";
import { useEffect } from "react";
import { Product } from "@/lib/slices/createProductSlice";
import { useShoppingCart } from "@/lib/store";
import React from "react";
import { NextPage } from "next";

const Homepage: NextPage = () => {
  const { cart, products } = useShoppingCart();

  const [cartItem, setCartItem] = React.useState<Product[]>([]);
  const [productItems, setProductItems] = React.useState<Product[]>([]);

  useEffect(() => {
    productjson.products.map((item) => {
      setProductItems([item]);
    });
  });

  useEffect(() => {
    setProductItems(products);
  });

  useEffect(() => {
    setCartItem(cart);
    // calculateTotal();
  }, [cart]);

  console.log();

  return (
    <div className="px-12">
      <Hero />
      <h1 className="font-semibold tracking-tight text-4xl text-center lg:text-left">
        Top Picks
      </h1>
      <div className="py-6 flex flex-cols">
        <div className="flex flex-wrap gap-8 sm:mt-2 justify-center">
          {/* {productjson.products.length > 0 &&
            productjson.products.map((item: any) => (
              <ProductItems key={item.id} {...item} />
            ))} */}
          {productItems?.map((product) => (
            <ProductItems key={product.id} {...product} />
          ))}
        </div>
      </div>
      <div className="my-4 flex justify-center">
        <Link href={"/products"}>
          <Button variant="outline" className="sm:hidden">
            Show more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
