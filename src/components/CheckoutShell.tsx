"use client";

import * as React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { type StripeElementsOptions } from "@stripe/stripe-js";

import { getStripe } from "@/lib/get-stripe";
import { cn } from "@/lib/utils";

// Docs: https://stripe.com/docs/payments/quickstart

interface CheckoutShellProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  StripeAccountId: string;
  paymentIntentPromise: Promise<{
    clientSecret: string | null;
  }>;
}

export function CheckoutShell({
  children,
  StripeAccountId,
  paymentIntentPromise,
  className,
  ...props
}: CheckoutShellProps) {
  const stripePromise = React.useMemo(
    () => getStripe(StripeAccountId),
    [StripeAccountId]
  );

  // Calling createPaymentIntentAction at the client component to avoid stripe authentication error in server action
  const { clientSecret } = React.use(paymentIntentPromise);

  if (!clientSecret) {
    return (
      <section className={cn("size-full", className)} {...props}>
        <div className="size-full bg-white" />
      </section>
    );
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <section className={cn("size-full", className)} {...props}>
      <Elements options={options} stripe={stripePromise}>
        {children}
      </Elements>
    </section>
  );
}
