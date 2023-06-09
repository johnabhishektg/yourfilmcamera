import Link from "next/link";
import Image from "next/image";
import hero from "../../public/images/hero.jpg";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";

export default function Hero() {
  return (
    <div className="h-screen pt-32">
      <div className="text-center">
        <Image
          className="animate-fade-in w-full h-36 object-cover rounded"
          src={hero}
          alt="hero-img"
        />
        <h1 className="mt-8 antialiased  space-y-2 text-6xl font-bold text-primary lg:text-8xl">
          Buy Your First <br className="hidden sm:block" /> Film Camera.
        </h1>
        <p className="text-xl leading-6 tracking-tighter text-gray-400 mt-4">
          Enabling you to express from a different perspective
        </p>

        <Link
          href={"/products"}
          className={cn(buttonVariants({ className: "mt-6" }))}
        >
          Shop now
        </Link>
        {/* githun button */}
        {/* <Link
          href={"/https:/github.com/johnabhishektg/yourfilmcamera"}
          className={cn(
            buttonVariants({ variant: "default", className: "mt-6" })
          )}
        >
          <Github className="h-4 w-4" />
          Github
        </Link> */}
      </div>
    </div>
  );
}
