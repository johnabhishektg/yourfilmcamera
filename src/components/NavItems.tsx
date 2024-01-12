"use client";

import { FC } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/NavigationMenu";
import React from "react";
import { Aperture } from "lucide-react";
import { cn } from "@/lib/utils";
import { allPosts } from "contentlayer/generated";

interface NavItemsProps {}

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

const NavItems: FC<NavItemsProps> = ({}) => {
  return (
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
                    href="/products"
                  >
                    <Aperture className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      YourFilmCamera
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Ecommerce store for film products built by Nextjs 13.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/products" title="Cameras">
                Capture your memories.
              </ListItem>
              <ListItem href="/products" title="Lens">
                Eye of the Camera
              </ListItem>
              <ListItem href="/products" title="Film Rolls">
                High quality pictures
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* BLOGS */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Blogs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {allPosts.map((post) => (
                <ListItem key={post._id} href={post.url} title={post.title}>
                  {post.description}
                </ListItem>
              ))}
              {/* <ListItem href="/blog/phantasmagoria" title={post.title}>
                {post.description}
              </ListItem>
              <ListItem href="/blog/the-meet" title="Lens">
                The Meet
              </ListItem>
              <ListItem href="/products" title="Film Rolls">
                High quality pictures
              </ListItem> */}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavItems;
