import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "./logo";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "@/hooks/use-current-user";
import Cookies from "js-cookie";
import { Link } from "react-router";

export default function Topbar() {
  const user = useCurrentUser();
  const hanndleLogout = () => {
    localStorage.clear();
    Cookies.remove("HRuserInfo");
    window.location.href = "/";
  };

  function getAvatarInitials(firstName?: string, lastName?: string): string {
    if (!firstName && !lastName) return "";

    const first = firstName?.trim().charAt(0).toUpperCase() || "";
    const last = lastName?.trim().charAt(0).toUpperCase() || "";

    return first + last;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center w-full">
      <Logo href="/candidate/dashboard" />

      <div className="flex gap-8 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" asChild>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://s3-alpha-sig.figma.com/img/6c1f/e88a/3b9e8dfddf4a065581b04df49638ca9c?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QG~Klln1fhzUy1rkQlgHwFy4g3-9EBdYU54aO3ADBbMndp4aovBwNypWvyFPMSBaKrdIQiEgnDsvqvH5GCAFHlmH0sZulCRrp152TULvPr0E3puyjjgN6NwCxWyhQMFgKbnjAyasHt5~zVsc49CMYY7w64TEOUEVifHeTg9FS6D503j0ADg~Uh768fYf2upyEQX6hkAUOeWexYZaxMvNarNdtK6a6qcHmVihApWK4Lv7vrhVAdlI9fLd7mAjiFOE-0U5MiegfvEXPNVI2T4NbsFCODmDGppns~hlm9rVp4JG0h2dQoD37PqSId8yBMkv8zt-iuotxkH3uR7Yrw~Rsg__" />
                  <AvatarFallback>{getAvatarInitials(user?.first_name, user?.last_name)}</AvatarFallback>
                </Avatar>
                <span className="text-[#475467] text-sm font-semibold">
                  {user?.first_name}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <Link to={`/${user?.app_role}/profile`}>
              <DropdownMenuItem asChild>
                <Button variant="ghost" className="w-full justify-start h-10">
                  Profile
                </Button>
              </DropdownMenuItem>
            </Link>{" "}
            <DropdownMenuItem asChild>
              <Button
                onClick={hanndleLogout}
                variant="ghost"
                className="w-full justify-start h-10  "
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
