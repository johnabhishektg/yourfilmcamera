import { Button } from "./ui/Button";
import { Trash } from "lucide-react";
import EditButton from "./EditButton";
import { getAllProducts } from "@/app/(actions)/product";
import { UpdateCart } from "./EditCartButton";
import { getCart, getCartItems } from "@/lib/fetchers/cart";
import { cookies } from "next/headers";

type CartItemProps = {
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
};

export default async function CartItem(product: CartItemProps) {
  // const { toast } = useToast();

  const allProducts = await getAllProducts();
  const cartId = cookies().get("cartId")?.value;
  const cartItems = await getCartItems({ cartId: Number(cartId) });

  console.log(cartItems);

  const { productId, quantity } = product;

  const item = allProducts.find((i) => i.id === productId);

  // function removeFromCartToast() {
  //   toast({
  //     title: "Removed from cart",
  //     description: `${product.name} has been removed from your cart`,
  //     variant: "destructive",
  //   });
  // }

  if (item == null) return null;

  return (
    <div className="w-full mt-8 flex items-center justify-between px-2.5 sm:p-0">
      <div className="w-72 flex items-center">
        <img
          src={"/" + item.images!}
          className="w-20 h-16 object-cover rounded-sm"
        />
        <div className="ml-6 w-full text-left md:w-52 sm:ml-4">
          <h4 className="text-sm font-semibold text-primary">
            {item.name}{" "}
            <span className="font-medium text-gray-400"> (x{quantity})</span>
          </h4>
          <p className="text-primary">${item.price}</p>
        </div>
      </div>
      {/* <EditButton product={product} productId={product.id} /> */}
      <div className="flex gap-2 justify-end ">
        <UpdateCart productId={item.id} quantity={quantity} />
        <Button
          // onClick={() => removeFromCartToast()}
          variant="outline"
          className="p-3 h-8"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
