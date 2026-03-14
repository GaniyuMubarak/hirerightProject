import { Link } from "react-router";
import Icons from "../ui/icons";

const footetlinks = [
  {
    title: "Job Seeker",
    // href: "../account-type",
    href: "../sign-up?app_role=candidate",
  },
  {
    title: "Employer",
    // href: "../account-type",
    href: "../sign-up?app_role=employer",
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
      <div className="max-w-7xl mx-auto px-4 py-6 flex max-lg:flex-col max-lg:gap-16 justify-between items-center">
        <div className="lg:w-1/6">
          {/* <img src="/logo.svg" alt="Logo" className="size-8 " /> */}

          <img
            src="/logo_app.png"
            alt="Logo"
            className="h-12 w-auto object-contain"
            // className="size-12"
          />
        </div>
        <ul className="flex max-lg:flex-col  items-center justify-center gap-6 w-4/6">
          {footetlinks.map((link) => (
            <li
              key={link.title}
              className="text-sm text-[#0F132499] font-medium"
            >
              <Link to={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-6 items-center justify-end lg:w-1/6">
          {/* <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hire Right on Twitter"
            className="hover:opacity-70 transition">
            <Icons.twitter />
          </a> */}
          <a
            href="https://www.linkedin.com/company/hire-right-ng/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hire Right on LinkedIn"
            className="hover:opacity-70 transition"
          >
            <Icons.linkedin />
          </a>
          <a
            href="https://www.instagram.com/hirerightng?igsh=MTQ5Mm1lbmt0eTR0ZA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hire Right on Instagram"
            className="hover:opacity-70 transition"
          >
            <Icons.instagram />
          </a>
          <a
            href="https://www.facebook.com/Hireright.ng?mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hire Right on Facebook"
            className="hover:opacity-70 transition"
          >
            <Icons.facebook />
          </a>
        </div>
      </div>
    </div>
  );
}
