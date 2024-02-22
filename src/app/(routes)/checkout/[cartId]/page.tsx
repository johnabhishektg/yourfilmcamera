import { CheckoutForm } from "@/components/CheckoutForm";
import { CheckoutShell } from "@/components/CheckoutShell";
import CartItem from "@/components/cart/CartItem";
import CartItemsEdit from "@/components/cart/CartItemsEdit";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { carts } from "@/lib/db/schema";
import { getCart, getCartItems } from "@/lib/fetchers/cart";
import { cn, formatPrice } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Checkout",
  description: "Checkout with store items",
};

interface CheckoutPageProps {
  params: {
    cartId: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const cartId = Number(params.cartId);

  const cartItems = await getCartItems({ cartId: Number(cartId) });

  const cart = await db
    .select({
      id: carts.id,
      stripeAccountId: carts.stripeAccountId,
    })
    .from(carts)
    .where(eq(carts.id, cartId))
    .execute()
    .then((rows) => rows[0]);

  if (!cart) {
    notFound();
  }

  const cartLineItems = await getCart({ cartId });

  const total = cartLineItems.reduce(
    (total, item) => total + item.quantity * Number(item.price),
    0
  );

  // return (
  //   <div className="container">
  //     <div className="flex flex-col items-center justify-center gap-2 pt-20">
  //       <div className="text-center text-2xl font-bold">
  //         Store is not connected to Stripe
  //       </div>
  //       <div className="text-center text-muted-foreground">
  //         Store owner needs to connect their store to Stripe to accept
  //         payments
  //       </div>
  //       <Link
  //         aria-label="Back to cart"
  //         href="/cart"
  //         className={cn(
  //           buttonVariants({
  //             size: "sm",
  //           })
  //         )}
  //       >
  //         Back to cart
  //       </Link>
  //     </div>
  //   </div>
  // );

  return (
    <section className="relative flex h-full min-h-[100dvh] flex-col items-start justify-center lg:h-[100dvh] lg:flex-row lg:overflow-hidden">
      <div className="w-full space-y-12 pt-8 lg:pt-16">
        <div className="fixed top-0 z-40 h-16 w-full bg-[#09090b] py-4 lg:static lg:top-auto lg:z-0 lg:h-0 lg:py-0">
          <div className="container flex max-w-xl items-center justify-between space-x-2 lg:ml-auto lg:mr-0 lg:pr-[4.5rem]">
            <Link
              aria-label="Back to cart"
              href="/cart"
              className="group flex w-28 items-center space-x-2 lg:flex-auto"
            >
              <ArrowLeftIcon
                className="size-5 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
              />
              <div className="block font-medium transition group-hover:hidden">
                YourFilmCamera
              </div>
              <div className="hidden font-medium transition group-hover:block">
                Back
              </div>
            </Link>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </DrawerTrigger>
              <DrawerContent className="mx-auto flex h-[82%] w-full max-w-4xl flex-col space-y-6 border pb-6 pt-8">
                {cartItems?.map((item: any) => (
                  <CartItemsEdit key={item.id} {...item} />
                ))}
                {/* <CartLineItems
                  items={cartLineItems}
                  variant="minimal"
                  isEditable={false}
                  className="container h-full flex-1 pr-8"
                /> */}
                <div className="container space-y-4 pr-8">
                  <Separator />
                  <div className="flex font-medium">
                    <div className="flex-1">
                      Total (
                      {cartLineItems.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                      )
                    </div>
                    <div>{formatPrice(total)}</div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="flex max-w-xl flex-col items-center space-y-1 lg:ml-auto lg:mr-0 lg:items-start lg:pr-[4.5rem]">
          <div className="line-clamp-1 font-semibold text-muted-foreground">
            Pay
          </div>
          <div className="text-3xl font-bold">{formatPrice(total)}</div>
        </div>
        {cartItems?.map((item: any) => (
          <CartItemsEdit key={item.id} {...item} />
        ))}
      </div>
      {/* <CheckoutShell
        className="size-full flex-1 bg-white pb-12 pt-10 lg:flex-initial lg:pl-12 lg:pt-16"
      >
      <ScrollArea className="h-full">
        <CheckoutForm
          cartId={cart.id}
          className="container max-w-xl pr-6 lg:ml-0 lg:mr-auto"
        />
      </ScrollArea>
      </CheckoutShell> */}
    </section>
  );
}
