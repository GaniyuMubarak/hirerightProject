import { cn } from "@/lib/utils";
import { Link } from "react-router";
import Logo from "../shared/logo";
import { buttonVariants } from "../ui/button";
const navlinks = [
  {
    title: "How it works",
    href: "/candidate/dashboard",
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
    <div className="flex justify-between items-center container mx-auto py-2">
      <Logo />
      <ul className="flex items-center gap-6">
        {navlinks.map((link) => (
          <li
            key={link.title}
            className={cn("text-sm text-[#0F132499] font-medium py-3", {
              "border-b-2 border-primary text-[#253B7A]":
                location.pathname === link.href,
            })}
          >
            <Link to={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        <Link
          to={"/sign-up"}
          className={cn(buttonVariants(), "rounded-[6px] px-6")}
        >
          Sign up
        </Link>
        <Link
          to={"/sign-up"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "text-[#EE7B36] rounded-[6px] px-6"
          )}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
