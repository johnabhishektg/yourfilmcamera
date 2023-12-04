import { getAllProducts } from "@/app/(actions)/product";
import Link from "next/link";
import Hero from "./Hero";
import TopPick from "./TopPick";
import { Button, buttonVariants } from "./ui/Button";

const Homepage = async () => {
  const products = await getAllProducts();

  return (
    <div className="px-12">
      <Hero />
      <div className="flex justify-center items-center lg:justify-between">
        <h1 className="font-semibold tracking-tight text-4xl text-center lg:text-left">
          Top Picks
        </h1>
        <Link
          href={"/products"}
          className={buttonVariants({
            variant: "ghost",
            className: "hidden lg:block",
          })}
        >
          Show More
        </Link>
      </div>
      <div className="py-6 flex flex-cols">
        <TopPick products={...products} />
      </div>
      <div className="my-4 flex justify-center">
        <Link href={"/products"}>
          <Button variant="outline" className="md:hidden">
            Show more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
