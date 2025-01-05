import { Link } from "react-router";
import Icons from "../ui/icons";

const footetlinks = [
  {
    title: "Job Seeker",
    href: "#",
  },
  {
    title: "Employer",
    href: "#",
  },
  {
    title: "Terms of Service",
    href: "#",
  },
  {
    title: "Privacy & Policy",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
];

export default function Footer() {
  return (
    <div className="bg-[#F8F8FD] ">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="w-1/6">
          <img src="/logo.svg" alt="Logo" className="size-8 " />
        </div>
        <ul className="flex items-center justify-center gap-6 w-4/6">
          {footetlinks.map((link) => (
            <li
              key={link.title}
              className="text-sm text-[#0F132499] font-medium"
            >
              <Link to={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-6 items-center justify-end w-1/6">
          <a href="#" target="_blank">
            <Icons.twitter />
          </a>
          <a href="#" target="_blank">
            <Icons.instagram />
          </a>
          <a href="#" target="_blank">
            <Icons.facebook />
          </a>
        </div>
      </div>
    </div>
  );
}
