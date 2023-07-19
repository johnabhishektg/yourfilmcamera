import { FC } from "react";
import productjson from "../../../../../products.json";
import { Aperture, RotateCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface pageProps {
  params: {
    productId: number;
  };
}

const page: FC<pageProps> = ({ params }) => {
  const { productId } = params;

  const cameraId = productjson.products.find((p) => p.id == productId);

  return (
    <div className="min-h-screen mx-auto p-6">
      <div className="block gap-8 md:flex ">
        <img
          className="rounded object-cover h-72 w-full md:w-1/2 md:h-96"
          src={"/" + cameraId?.image}
          width={90}
          height={90}
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
          <div className="mt-6 flex gap-4">
            <input
              className="border-2 border-slate-500 rounded w-12 px-2"
              type="number"
              placeholder="0"
              readOnly
            ></input>
            <Button variant="default">Add to Cart</Button>
          </div>
          <footer className="flex items-center justify-center gap-8 text-center mt-12 w-full md:mt-20 ">
            <div className="w-32 h-20 bg-gray-100 space-y-1 px-4 py-2 inline-block rounded">
              <Zap className="w-24 rounded-full text-primary" />
              <p>Fast Delivery</p>
            </div>
            <div className="w-32 h-20 bg-gray-100 space-y-1 px-4 py-2 inline-block rounded">
              <RotateCw className=" w-24 rounded-full text-primary" />
              <p>30 Day Return</p>
            </div>
            <div className="w-32 h-20 bg-gray-100 space-y-1 px-4 py-2 inline-block rounded">
              <Aperture className=" w-24 rounded-full text-primary" />
              <p>High Quality</p>
            </div>
          </footer>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-24">
        <h3 className="text-2xl font-semibold">Description:</h3>
        <p>{cameraId?.description}</p>
      </div>
    </div>
  );
};

export default page;
