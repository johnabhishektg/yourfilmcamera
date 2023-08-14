"use client";

import Hero from "./Hero";
import productjson from "../../products.json";
import ProductItems from "./ProductItems";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";
import { useEffect } from "react";
import { Product } from "@/lib/slices/createProductSlice";
import { useShoppingCart } from "@/lib/store";
import React from "react";
import { NextPage } from "next";
import { GenerateButton } from "./GenerateButton";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";

const Homepage: NextPage = async () => {
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
  }, [cart]);

  let topPickArray = [];
  for (let i = 0; i < 4; i++) {
    topPickArray.push({
      id: products[i].id,
      category: products[i].category,
      image: products[i].image,
      name: products[i].name,
      new: products[i].new,
      description: products[i].description,
      price: products[i].price,
    });
  }

  return (
    <div className="px-12">
      <Hero />
      <div className="flex justify-center items-center lg:justify-between">
        <h1 className="font-semibold tracking-tight text-4xl text-center lg:text-left">
          Top Picks
        </h1>
        <Link
          href={"/products"}
          className={buttonVariants({
            variant: "link",
            className: "cursor-pointer text-lg text-primary hidden lg:flex",
          })}
        >
          Show More
        </Link>
      </div>
      <div className="py-6 flex flex-cols">
        <div className="flex flex-wrap gap-8 justify-center lg:gap-16 sm:mt-2">
          {topPickArray?.map((product) => (
            <ProductItems key={product.id} {...product} />
          ))}
        </div>
      </div>
      <div className="my-4 flex justify-center">
        <Link href={"/products"}>
          <Button variant="outline" className="md:hidden">
            Show more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
