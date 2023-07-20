"use client";

import { Aperture, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";
import UserAuthButton from "./UserAuthButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/NavigationMenu";
import React from "react";
import { cn } from "@/lib/utils";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default function Navbar() {
  return (
    <nav className="w-full z-10 top-0 bg-white nav fixed flex justify-between align-center px-10 py-6 shadow-md">
      <div className="flex items-center gap-8">
        <Link className="flex items-center space-x-1" href={"/"}>
          <Aperture />
          <h2 className="hidden font-bold cursor-pointer lg:inline-block">
            YourFilmCamera
          </h2>
        </Link>
        <ul className="hidden list-none  items-center justify-center md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Aperture className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            YourFilmCamera
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Ecommerce store for film proaducts built by Nextjs
                            13.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/products" title="Cameras">
                      Capture your memories.
                    </ListItem>
                    <ListItem href="/products" title="Lens">
                      Eyes
                    </ListItem>
                    <ListItem href="/products" title="Film Rolls">
                      Excellent sharpness and fine grain provide high quality
                      pictures
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ul>
      </div>

      <div className="space-x-4 flex justify-center items-center">
        <Button
          variant="outline"
          className="cursor-pointer inline-flex items-center space-x-2 justify-center rounded-md text-sm shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          {/* {quantity > 0 && (
            <span className="bg-primary rounded-full w-6 h-6 text-white flex items-center justify-center text-sm absolute -top-3 -right-3">
              {quantity}
            </span>
          )} */}
        </Button>
        <UserAuthButton />
      </div>
    </nav>
  );
}
