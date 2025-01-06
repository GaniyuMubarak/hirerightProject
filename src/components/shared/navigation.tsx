import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

type navlinks = {
  title: string;
  href: string;
}[];
export default function Navigation({ navlinks }: { navlinks: navlinks }) {
  // console.log("loction>>", location.pathname);
  return (
    <div className="bg-[#F8F8FD]">
      <div className="max-w-7xl mx-auto px-4  flex justify-between items-center">
        <ul className="flex items-center gap-6">
          {navlinks.map((link) => (
            <li key={link.title} className="py-3">
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  cn("text-base text-[#0F132499] font-medium py-3", {
                    "border-b-2 border-primary text-[#253B7A]": isActive,
                  })
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
