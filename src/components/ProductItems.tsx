"use client";

import { useRouter } from "next/navigation";
import { buttonVariants } from "./ui/Button";
import Image from "next/image";

type ProductItemProps = {
  id: number;
  image: string;
  name: string;
  new: Boolean;
  description: string;
  price: number;
};

export default function ProductItems({
  id,
  image,
  name,
  price,
}: ProductItemProps) {
  const router = useRouter();
  //   const { increaseQuantity } = useShoppingCart();

  //   const navigate = useNavigate();

  //   function navigateProduct(id: number) {
  //     navigate(`/product/${id}`);
  //   }

  return (
    <header className="border w-64 h-82 rounded shadow-md">
      <img
        className="relative w-full rounded-t h-40 object-cover cursor-pointer"
        src={image}
        alt=""
        width={90}
        height={90}
        onClick={() => router.push(`/product/${id}`)}
      />
      <footer className="p-4">
        <p className="text-xs font-bold text-gray-400">NEW </p>
        <h2 className="mt-1 font-medium text-primary">{name}</h2>
        <div className="mt-2 flex justify-between items-center content-center">
          <p className="font-bold text-2xl">${price}</p>
          <button className={buttonVariants({})}>Add to cart</button>
        </div>
      </footer>
    </header>
  );
}
