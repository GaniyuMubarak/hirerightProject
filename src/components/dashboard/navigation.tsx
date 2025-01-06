import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
const navlinks = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Find Jobs",
    href: "/dashboard/jobs",
  },
  {
    title: "My Jobs",
    href: "#",
  },
];
export default function Navigation() {
  const location = useLocation();

  // console.log("loction>>", location.pathname);
  return (
    <div className="bg-[#F8F8FD]">
      <div className="max-w-7xl mx-auto px-4  flex justify-between items-center">
        <ul className="flex items-center gap-6">
          {navlinks.map((link) => (
            <li
              key={link.title}
              className={cn("text-base text-[#0F132499] font-medium py-3", {
                "border-b-2 border-primary text-[#253B7A]":
                  location.pathname === link.href,
              })}
            >
              <Link to={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
