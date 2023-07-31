import { Product } from "@/lib/slices/createProductSlice";
import productjson from "../../products.json";
import { Button } from "./ui/Button";
import { Trash } from "lucide-react";
import { useShoppingCart } from "@/lib/store";
import EditButton from "./EditButton";
import { useToast } from "./ui/use-toast";

export default function CartItem(product: Product) {
  const { removeFromCart } = useShoppingCart();
  const { toast } = useToast();

  function removeFromCartToast() {
    removeFromCart(product.id);
    toast({
      title: "Removed from cart",
      description: `${product.name} has been removed from your cart`,
      variant: "destructive",
    });
  }

  const item = productjson.products.find((i) => i.id === product.id);
  if (item == null) return null;

  return (
    <div className="w-full mt-8 flex items-center justify-between px-2.5 sm:p-0">
      <div className="w-72 flex items-center">
        <img
          src={"/" + item.image}
          className="w-20 h-16 object-cover rounded-sm"
        />
        <div className="ml-6 w-full text-left md:w-52 sm:ml-4">
          <h4 className="text-sm font-semibold text-primary">
            {item.name}{" "}
            <span className="font-medium text-gray-400">
              {" "}
              (x{product?.quantity})
            </span>
          </h4>
          <p className="text-primary">${item.price}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end ">
        <EditButton product={product} productId={product.id} />

        <Button
          onClick={() => removeFromCartToast()}
          variant="outline"
          className="p-3 h-8"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
