"use client";

import * as React from "react";
import { Button } from "./ui/Button";
import { createAccountLink } from "@/app/(actions)/stripe";
import { catchError } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ConnectToStripeButtonProps {
  cartId: number;
}

export function ConnectStoreToStripeButton({
  cartId,
}: ConnectToStripeButtonProps) {
  const [isPending, startTransaction] = React.useTransition();

  return (
    <Button
      aria-label="Connect to Stripe"
      onClick={() => {
        startTransaction(async () => {
          try {
            const connection = await createAccountLink({ cartId });
            window.location.href = connection.url;
          } catch (err) {
            catchError(err);
          }
        });
      }}
      disabled={isPending}
    >
      {isPending && (
        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
      )}
      Connect to Stripe
    </Button>
  );
}
