"use client";

import React from "react";
import { Button } from "./ui/Button";
import { generateProducts } from "@/app/(actions)/generate";
import { toast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

export function GenerateButton() {
  const [isPending, startTransition] = React.useTransition();

  return (
    <Button
      className="h-8 px-2 lg:px-3"
      onClick={() => {
        startTransition(async () => {
          try {
            await generateProducts();
            toast({
              title: "Generated items to db",
            });
          } catch (err) {
            throw err;
          }
        });
      }}
    >
      {isPending && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      Generate
    </Button>
  );
}
