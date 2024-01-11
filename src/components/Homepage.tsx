import { getAllProducts } from "@/app/(actions)/product";
import Link from "next/link";
import Hero from "./Hero";
import TopPick from "./TopPick";
import { Button, buttonVariants } from "./ui/Button";
import { MoveRight } from "lucide-react";
import Perks from "./Perks";
import { Card, CardFooter, CardHeader } from "./ui/Card";

const Homepage = async () => {
  const products = await getAllProducts();

  return (
    <div className="px-12 sm:px-36">
      <Hero />
      <Perks />
      <div className="flex justify-center items-center lg:justify-between">
        <h1 className="font-bold tracking-tight text-4xl text-center lg:text-left">
          Top Picks
        </h1>
        <Link
          href={"/products"}
          className={buttonVariants({
            variant: "ghost",
            className: "hidden lg:flex",
          })}
        >
          Show More
          <MoveRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
      <div className="py-6">
        <TopPick {...products} />
      </div>
      <div className="my-4 flex justify-center">
        <Link href={"/products"}>
          <Button variant="outline" className="md:hidden">
            Show more
          </Button>
        </Link>
      </div>

      {/* BLOG */}
      <div className="py-8">
        <div className="flex justify-center items-center lg:justify-between">
          <h1 className="font-bold tracking-tight text-4xl text-center lg:text-left">
            Blog
          </h1>
          <Link
            href={"/blog"}
            className={buttonVariants({
              variant: "ghost",
              className: "hidden lg:flex",
            })}
          >
            Show More
            <MoveRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="py-8">
          <div className="flex flex-wrap justify-center gap-8 w-full md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 md:gap-16 ">
            <Card className="w-full">
              <Link href={"/blog"}>
                <CardHeader>
                  <img
                    src="./images/blog/film-review.jpg"
                    className="relative w-full rounded-t h-32 object-cover cursor-pointer"
                    width={120}
                    height={45}
                  />
                </CardHeader>
              </Link>
              <CardFooter className="p-3">
                <p className="p-1 text-lg font-bold text-primary">
                  Film Reviews
                </p>
              </CardFooter>
            </Card>

            <Card className="w-full">
              <Link href={"/blog"}>
                <CardHeader>
                  <img
                    src="./images/blog/poems.jpg"
                    className="relative w-full rounded-t h-32 object-cover cursor-pointer"
                    width={120}
                    height={45}
                  />
                </CardHeader>
              </Link>
              <CardFooter className="p-3">
                <p className="p-1 text-lg font-bold text-primary">Poems</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
