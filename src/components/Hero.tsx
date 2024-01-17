import Link from "next/link";
import Image from "next/image";
import hero from "../../public/images/hero.jpg";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";

export default function Hero() {
  return (
    <>
      <div className="text-center">
        <Image
          priority
          className="animate-fade-in w-full h-36 object-cover rounded dark:border"
          src={hero}
          alt="hero-img"
        />
        <h1 className="mt-8 antialiased space-y-2 font-bold text-primary text-6xl  lg:text-8xl">
          Buy Your First <br className="hidden sm:block" /> Film Camera.
        </h1>
        <p className="text-xl leading-6 tracking-tighter text-muted-foreground mt-4">
          Enabling you to express from a different perspective
        </p>

        <Link
          href={"/products"}
          className={cn(buttonVariants({ className: "mt-6" }))}
        >
          Shop now
        </Link>
      </div>
    </>
  );
}
