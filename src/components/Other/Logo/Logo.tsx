import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="lg:mt-4">
      <p className="sm:text-4xl text-2xl font-bold text-secondary tracking-[4px] relative text-center">
        MHB's Portofolio Site
      </p>
    </Link>
  );
};

export default Logo;
