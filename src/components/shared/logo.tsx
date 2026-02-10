import { Link } from "react-router";

export default function Logo({ href = "" }: { href?: string }) {
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




// import { Link } from "react-router";
// import { useUserRole } from "@/providers/user-context";

// export default function Logo() {
//   const role = useUserRole();

//   const dashboardPath = !role
//     ? "/sign-in"
//     : role === "employer"
//       ? "/employer/dashboard"
//       : "/candidate/dashboard";

//   return (
//     <Link
//       to={dashboardPath}
//       className="flex items-center gap-2 text-[#AFAEAD] text-[22px] font-semibold transition-opacity hover:opacity-80">
//       <img src="/logo.svg" alt="Logo" className="size-8" />
//       Logo
//     </Link>
//   );
// }


