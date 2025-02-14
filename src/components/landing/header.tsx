import { cn } from "@/lib/utils";
import { Link } from "react-router";
import Logo from "../shared/logo";
import { buttonVariants } from "../ui/button";
const navlinks = [
  {
    title: "How it works",
    href: "#howItWorks",
  },
  {
    title: "Why choose Us",
    href: "#whyus",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
];
export default function Header() {
  return (
    <div className="bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center container px-4 mx-auto py-2 ">
        <Logo />
        <ul className="flex items-center gap-6 max-lg:hidden">
          {navlinks.map((link) => (
            <li
              key={link.title}
              className={cn("text-sm text-[#0F132499] font-medium py-3", {
                "border-b-2 border-primary text-[#253B7A]":
                  location.pathname === link.href,
              })}
            >
              <a href={link.href}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Link
            to={"/account-type"}
            className={cn(buttonVariants(), "rounded-[6px] px-6")}
          >
            Sign up
          </Link>
          <Link
            to={"/sign-in"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "text-[#EE7B36] rounded-[6px] px-6"
            )}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
