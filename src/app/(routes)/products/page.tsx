import { Checkbox } from "@/components/ui/Checkbox";
import Image from "next/image";
import prodHeader from "../../../../public/images/products-header.jpeg";
import productsjson from "../../../../products.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import ProductItems from "@/components/ProductItems";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="min-h-screen mx-12">
      <Card>
        <CardHeader>
          <Image
            className="w-full h-36 object-cover rounded-t"
            src={prodHeader}
            alt="product-header-image"
          />
          <div className="p-4">
            <CardTitle className="text-3xl font-semibold tracking-tight text-primary">
              Products
            </CardTitle>
            <CardDescription className="text-gray-400 py-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
              at tellus at urna. Sit amet porttitor eget dolor morbi non.
              Feugiat odio euismod. Auctor augue mauris augue neque gravida in
              fermentum.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_4fr]">
        <Card className="hidden p-6 w-52 lg:block">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="pt-2">
              <div className="mt-2 flex flex-row items-start space-x-2">
                <Checkbox id="camera" />
                <label
                  htmlFor="camera"
                  className=" cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Camera
                </label>
              </div>
              <div className="mt-2 flex flex-row items-start space-x-2">
                <Checkbox id="film-roll" />
                <label
                  htmlFor="film-roll"
                  className=" cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Film roll
                </label>
              </div>
              <div className="mt-2 flex flex-row items-start space-x-2">
                <Checkbox id="lens" />
                <label
                  htmlFor="lens"
                  className=" cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Lens
                </label>
              </div>
            </ul>
          </CardContent>
        </Card>

        {/* camera scene */}

        <div className="flex flex-cols ">
          <div className="flex flex-wrap gap-8 items-center justify-center lg:items-start lg:justify-start">
            {productsjson.products.length > 0 &&
              productsjson.products.map((item) => (
                <ProductItems key={item.id} {...item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
