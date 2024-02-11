import CartItem from "@/components/cart/CartItem";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Separator } from "@/components/ui/separator";
import { getCart, getCartItems } from "@/lib/fetchers/cart";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cart",
  description: "Checkout with your cart items",
};

export default async function page() {
  const cartLineItems = await getCart();

  const cartId = cookies().get("cartId")?.value;
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
        className="p-6"
        // key={storeId}
        // as="section"
        // id={`checkout-store-${storeId}`}
        // aria-labelledby={`checkout-store-${storeId}-heading`}
        // className={cn(
        //   cartLineItems[0]?.storeStripeAccountId
        // ? "border-green-500"
        // : "border-destructive"
        // )}
      >
        <CardHeader className="flex flex-row items-center space-x-4 py-4">
          <CardTitle className="line-clamp-1 flex-1">Order Number</CardTitle>
          <Link
            aria-label="Checkout"
            href={`/checkout`}
            className={cn(
              buttonVariants({
                size: "sm",
              })
            )}
          >
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

        {/* <CartLineItems items={cartLineItems} className="max-h-[280px]" /> */}
        <Separator className="mb-4" />
        <CardFooter className="space-x-4">
          <span className="">
            Total ({cartLineItems.reduce((acc, item) => acc + item.quantity, 0)}
            )
          </span>
          <span>
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
