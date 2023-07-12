import Hero from "./Hero";
import { products } from "../../products.json";
import ProductItems from "./ProductItems";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";

const Homepage = () => {
  return (
    <div className="px-12">
      <Hero />
      <h1 className="font-medium text-primary text-4xl text-center md:text-left">
        Top Picks
      </h1>
      <div className="py-6 flex flex-cols ">
        <div className="flex flex-wrap gap-8 sm:mt-2 justify-center">
          {products.length > 0 &&
            products.map((item: any) => (
              <ProductItems key={item.id} {...item} />
            ))}
        </div>
      </div>
      <div className="my-4 flex justify-center">
        <Link href={"/products"}>
          <Button variant="outline" className="sm:hidden">
            Show more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
