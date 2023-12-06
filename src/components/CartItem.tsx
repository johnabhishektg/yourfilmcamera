import { Button } from "./ui/Button";
import { Trash } from "lucide-react";
import EditButton from "./EditButton";
import { useToast } from "./ui/use-toast";
import { getAllProducts } from "@/app/(actions)/product";

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
  // const { removeFromCart } = useShoppingCart();
  // const { toast } = useToast();

  const allProducts = await getAllProducts();
  const { productId, quantity } = product;

  const item = allProducts.find((i) => i.id === productId);

  // function removeFromCartToast() {
  //   removeFromCart(product.id);
  //   toast({
  //     title: "Removed from cart",
  //     description: `${product.name} has been removed from your cart`,
  //     variant: "destructive",
  //   });
  // }

  // const item = productjson.products.find((i) => i.id === product.id);

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
      <div className="flex gap-2 justify-end ">
        <EditButton product={product} productId={product.id} />

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
