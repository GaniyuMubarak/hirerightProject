import { Link } from "react-router";

export default function Logo({ href = "#" }: { href?: string }) {
  return (
    <Link
      to={href}
      className="flex items-center gap-2 text-[#AFAEAD] text-[22px] font-semibold"
    >
      <img src="/logo.svg" alt="Logo" className="size-8" />
      Logo
    </Link>
  );
}
