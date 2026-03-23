import Socials from "@/components/Other/Socials/Socials";
import Link from "next/link";
import { RiGithubFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-tertiary py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between">
          <Socials
            containerStyles="flex gap-x-6 mx-auto xl:mx-0 mb-4"
            iconsStyles="text-white/70 text-[20px] hover:text-primary transition-all"
          />

          <div className="text-center lg:text-start text-muted-foreground mb-3">
            Copyright &copy; Muhammad Haikal Baihaqi. All rights reserved
          </div>
          <div className="text-white/30 text-xs mt-2">
            Based on{" "}
            <Link
              href="https://github.com/adamsnows/developer-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-all underline"
            >
              developer-portfolio
            </Link>
            {" "}by Adam Neves
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
