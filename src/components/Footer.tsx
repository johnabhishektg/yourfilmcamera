import { Aperture, Github, Linkedin, Sun } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";

const Footer = () => {
  return (
    <footer className="mt-12 p-6 antialiased border-t shadow">
      <section className="grid items-center gap-8 pb-8 pt-6 md:py-8 container">
        <section className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="flex space-x-1">
            <Aperture />
            <span className="hidden font-bold cursor-pointer sm:inline-block">
              YourFilmCamera
            </span>
          </div>
          <div className="space-y-3">
            <h4 className="text-base font-semibold">Inspiration</h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                SkateShop
              </li>
              <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                OneStopShop
              </li>
              <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                Product Card
              </li>
              <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                Josh Tried Coding
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
                Twitter
              </li>
              <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                Github
              </li>
              <li className="text-sm text-muted-foreground transition-colors cursor-pointer hover:text-foreground">
                LinkedIn
              </li>
            </ul>
          </div>
          <section id="newsletter" className="space-y-3">
            <h4 className="text-base font-semibold">Subscribe to our blog</h4>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
              htmlFor=""
            >
              <div className="flex flex-row relative space-y-0">
                <Input placeholder="yfc@gmail.com" />
                <Button className="absolute px-2 my-2 top-0 right-0 ">
                  <Icons.sendhorizontal className="h-3 w-3" />
                </Button>
              </div>
            </label>
          </section>
        </section>

        <section className="flex items-center justify-between space-x-4">
          <div className="text-sm text-muted-foreground">
            Built by{" "}
            <a target="_blank" href="https://github.com/johnabhishektg">
              <span className="font-medium hover:underline"> johntg </span>
            </a>
          </div>

          <div className="font-light text-sm text-right">
            <div className="flex justify-end mt-2">
              <a target="_blank" href="https://github.com/johnabhishektg">
                <Github className="cursor-pointer w-4 mr-2" />
              </a>
              <Sun className="cursor-pointer w-4 mr-2" />
            </div>
          </div>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
