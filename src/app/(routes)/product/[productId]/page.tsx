// "use client";

import { getProductFromId } from "@/app/(actions)/product";
import { AddToCartButton } from "@/components/cart/add-item";
import { Aperture, RotateCw, Zap } from "lucide-react";
import Image from "next/image";

interface pageProps {
  params: {
    productId: number;
  };
}

const Page = async ({ params }: pageProps) => {
  const id = await getProductFromId(params);

  const cameraId = id[0];

  return (
    <div className="min-h-screen mx-auto p-6">
      <div className="block gap-8 md:flex ">
        <Image
          priority
          className="rounded object-cover h-72 w-full md:w-1/2 md:h-96"
          src={"/" + cameraId?.images}
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
            <AddToCartButton
              id={cameraId.id}
              name={cameraId.name}
              className={`w-full lg:w-fit`}
            />
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
