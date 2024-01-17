import { cn } from "@/lib/utils";
import { Aperture, Sun } from "lucide-react";
import { Icons } from "./Icons";
import { Button, buttonVariants } from "./ui/Button";
import { Input } from "./ui/Input";
import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  return (
    <footer className="mt-12 p-6 border-t w-full">
      <section className="grid items-center gap-8 pb-8 pt-6 md:py-8 container">
        <section className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <header className="flex space-x-1">
            <Aperture />
            <span className="hidden font-bold cursor-pointer sm:inline-block">
              YourFilmCamera
            </span>
          </header>
          <section className="grid flex-1 grid-cols-1 gap-10 xxs:grid-cols-2 sm:grid-cols-3">
            <div className="space-y-3">
              <h4 className="text-base font-semibold">Inspiration</h4>
              <ul className="space-y-2.5">
                <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                  <a href="https://skateshop.sadmn.com/" target="_blank">
                    SkateShop
                  </a>
                </li>
                <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                  <a href="https://onestopshop.jackblatch.com/" target="_blank">
                    OneStopShop
                  </a>
                </li>
                <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                  <a
                    href="https://www.youtube.com/watch?v=ccRbK-uucSk&t=1537s"
                    target="_blank"
                  >
                    Product Card
                  </a>
                </li>
                <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                  <a
                    href="https://www.youtube.com/@joshtriedcoding"
                    target="_blank"
                  >
                    Josh Tried Coding
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-semibold">Blog</h4>
              <ul className="space-y-2.5">
                <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                  Film Reviews
                </li>
                <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                  Poems
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-semibold">Social</h4>
              <ul className="space-y-2.5">
                <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                  <a href="https://www.instagram.com/johhntg/" target="_blank">
                    Instagram
                  </a>
                </li>
                <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                  <a href="https://www.instagram.com/johhntg/" target="_blank">
                    Twitter
                  </a>
                </li>
                <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                  <a href="https://github.com/johnabhishektg" target="_blank">
                    Github
                  </a>
                </li>
                <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                  <a
                    href="https://www.linkedin.com/in/johnabhishek/"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </section>
          <section id="newsletter" className="space-y-3">
            <h4 className="text-base font-semibold">Subscribe to our blog</h4>
            <div className="flex relative space-y-0 ">
              <form className="grid w-full" action="">
                <Input placeholder="yfc@gmail.com" />
                <Button className="absolute right-[3.5px] top-[4px] h-8 px-2.5 py-0.5">
                  <Icons.sendhorizontal
                    className={cn(buttonVariants({ className: "h-9 w-9" }))}
                  />
                </Button>
              </form>
            </div>
          </section>
        </section>

        <section className="flex items-center justify-between space-x-4">
          <div className="text-sm text-muted-foreground">
            Built by{" "}
            <a target="_blank" href="https://github.com/johnabhishektg">
              <span className="font-semibold transition-colors hover:text-foreground">
                johntg{" "}
              </span>
            </a>
          </div>

          <div className="font-light text-sm text-right">
            <div className="flex items-center justify-end">
              <a target="_blank" href="https://github.com/johnabhishektg">
                <Icons.gitHub
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className: "cursor-pointer transition-colors h-9 w-12",
                    })
                  )}
                />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
