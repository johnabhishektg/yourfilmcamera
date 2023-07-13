import { Zap, RotateCw, Aperture } from "lucide-react";
import { FC } from "react";

interface ProductDetailPageProps {}

const ProductDetailPage: FC<ProductDetailPageProps> = ({}) => {
  return (
    <div className="container mt-24 mx-auto p-6">
      <div className="block gap-8 md:flex ">
        <img
          className="rounded object-cover h-72 w-full md:w-1/2 md:h-96"
          src={"/" + cameraId?.image}
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
              value={quantity}
              readOnly
            ></input>
            <button
              onClick={() => increaseQuantity(cameraId?.id!)}
              className="primary-btn"
            >
              Add to Cart
            </button>
          </div>
          <footer className="flex items-center justify-center gap-8 text-center mt-12 w-full md:mt-20 ">
            <div>
              <Zap className=" w-24 rounded-full text-primary" />
              <p>Fast Delivery</p>
            </div>
            <div>
              <RotateCw className=" w-24 rounded-full text-primary" />
              <p>30 Day Return</p>
            </div>
            <div>
              <Aperture className=" w-24 rounded-full text-primary" />
              <p>High Quality</p>
            </div>
          </footer>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold">Description:</h3>
        <p>{cameraId?.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
