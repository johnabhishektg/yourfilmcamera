import { Aperture, Github, Linkedin } from "lucide-react";

const Footer = ({}) => {
  return (
    <footer className="mt-12 p-6 antialiased text-secondary bg-primary shadow pb-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1 p-6">
          <Aperture />
          <h2 className="hidden font-bold cursor-pointer sm:inline-block">
            YourFilmCamera
          </h2>
        </div>

        <div className="font-light text-sm text-right">
          <>
            Built by{" "}
            <a target="_blank" href="https://github.com/johnabhishektg">
              <span className="font-semibold hover:underline"> @johntg </span>
            </a>
          </>
          <p>Source code available on Github</p>
          <div className="flex justify-end mt-2">
            <a target="_blank" href="https://github.com/johnabhishektg">
              <Github className="cursor-pointer w-4 mr-2" />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/johnabhishek">
              <Linkedin className="cursor-pointer w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
