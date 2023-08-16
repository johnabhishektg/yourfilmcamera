"use client";

import productjson from "../../../../../products.json";
import { Aperture, RotateCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useShoppingCart } from "@/lib/store";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/Toast";

interface pageProps {
  params: {
    productId: number;
  };
}

const Page = ({ params }: pageProps) => {
  const { increaseCart, products } = useShoppingCart();
  const { toast } = useToast();
  const { productId } = params;
  const cameraId = productjson.products.find((p) => p.id == productId);
  const product = products.find((p) => p.id == productId);

  function increaseCartItems() {
    increaseCart(product!);
    toast({
      title: "Added to cart",
      description: `${product?.name} has been added to your cart`,
      action: (
        <Link href="/">
          <ToastAction altText="View">View</ToastAction>
        </Link>
      ),
    });
  }

  return (
    <div className="min-h-screen mx-auto p-6">
      <div className="block gap-8 md:flex ">
        <Image
          className="rounded object-cover h-72 w-full md:w-1/2 md:h-96"
          src={"/" + cameraId?.image}
          width={1080}
          height={720}
          alt=""
        />
        <div>
          <h2 className="text-2xl font-semibold mt-6 capitalize md:text-5xl md:mt-0">
            {cameraId?.name}
          </h2>
          <p className="text-md  font-bold text-gray-400 md:mt-0">NEW</p>
          <p className="font-normal mt-2 text-2xl md:mt-6 md:font-bold md:text-4xl">
            ${cameraId?.price}
          </p>
          <div className="mt-6 ">
            <Button
              className="w-full lg:w-fit"
              onClick={() => increaseCartItems()}
              variant="default"
            >
              Add to Cart
            </Button>
          </div>
          <footer className="flex  items-center justify-center gap-8 text-center mt-12 lg:mt-20 ">
            <div className=" bg-secondary p-2 space-y-1 inline-block rounded">
              <Zap className="w-24 rounded-full text-primary" />
              <p className="text-sm lg:text-base">Fast Delivery</p>
            </div>
            <div className="bg-secondary p-2 space-y-1 inline-block rounded">
              <RotateCw className="w-full flex items-center justify-center rounded-full text-primary" />
              <p className="text-sm lg:text-base">30 Day Return</p>
            </div>
            <div className=" bg-secondary p-2 space-y-1  inline-block rounded">
              <Aperture className=" w-24 rounded-full text-primary" />
              <p className="text-sm lg:text-base">High Quality</p>
            </div>
          </footer>
        </div>
      </div>

      <div className="mt-24">
        <h3 className="text-2xl font-semibold">Description:</h3>
        <p>{cameraId?.description}</p>
      </div>
    </div>
  );
};

export default Page;
