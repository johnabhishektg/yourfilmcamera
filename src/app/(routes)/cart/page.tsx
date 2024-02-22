import { Lock } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Separator } from "@/components/ui/separator";
import { getCart, getCartItems } from "@/lib/fetchers/cart";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cart",
  description: "Checkout with your cart items",
};

export default async function page() {
  const cartId = cookies().get("cartId")?.value;

  const cartLineItems = await getCart({ cartId: Number(cartId) });

  const cartItems = await getCartItems({ cartId: Number(cartId) });

  const itemCount = cartLineItems.reduce(
    (total: number, item: { quantity: any }) => total + Number(item.quantity),
    0
  );

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Cart</PageHeaderHeading>

        <p className="text-muted-foreground text-sm">
          Checkout with your cart items
        </p>
      </PageHeader>
      <Card
        className="p-4"
        key={cartId}
        // as="section"
        id={`checkout-store-${cartId}`}
        // aria-labelledby={`checkout-store-${storeId}-heading`}
        // className={cn(
        //   cartItems[0]?.quantity
        //     ? "border-green-500 p-4"
        //     : "border-destructive p-4"
        // )}
      >
        <CardHeader className="flex flex-row items-center space-x-4 py-4">
          <CardTitle className="line-clamp-1 flex-1">Order Number</CardTitle>
          <Link
            className={cn(
              buttonVariants({
                className: "flex gap-1",
                size: "sm",
              })
            )}
            href={`/checkout/${cartId}`}
          >
            <Lock className="w-4 h-4 mr-1" />
            Checkout
          </Link>
        </CardHeader>
        <Separator className="mb-4" />
        {itemCount > 0 && (
          <CardContent className="pb-6 pl-6 pr-0">
            {cartItems?.map((item: any) => (
              <CartItem key={item.id} {...item} />
            ))}
          </CardContent>
        )}

        <Separator className="mb-4" />
        <CardFooter className="space-x-4 justify-center">
          <span className="flex-1 font-medium text-base">
            Total ({cartLineItems.reduce((acc, item) => acc + item.quantity, 0)}
            )
          </span>
          <span className="text-2xl font-semibold">
            $
            {cartLineItems.reduce(
              (acc, item) => acc + Number(item.price) * item.quantity,
              0
            )}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
