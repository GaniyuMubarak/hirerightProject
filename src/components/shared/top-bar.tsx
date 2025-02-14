import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "./logo";
import Notifications from "./notifications";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Cookies from "js-cookie";

export default function Topbar() {
  const hanndleLogout = () => {
    localStorage.clear();
    Cookies.remove("HRuserInfo");
    window.location.href = "/";
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center w-full">
      <Logo href="/candidate/dashboard" />

      <div className="flex gap-8 items-center">
        <Notifications />
        {/* <Link to="/candidate/profile">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://s3-alpha-sig.figma.com/img/6c1f/e88a/3b9e8dfddf4a065581b04df49638ca9c?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QG~Klln1fhzUy1rkQlgHwFy4g3-9EBdYU54aO3ADBbMndp4aovBwNypWvyFPMSBaKrdIQiEgnDsvqvH5GCAFHlmH0sZulCRrp152TULvPr0E3puyjjgN6NwCxWyhQMFgKbnjAyasHt5~zVsc49CMYY7w64TEOUEVifHeTg9FS6D503j0ADg~Uh768fYf2upyEQX6hkAUOeWexYZaxMvNarNdtK6a6qcHmVihApWK4Lv7vrhVAdlI9fLd7mAjiFOE-0U5MiegfvEXPNVI2T4NbsFCODmDGppns~hlm9rVp4JG0h2dQoD37PqSId8yBMkv8zt-iuotxkH3uR7Yrw~Rsg__" />
              <AvatarFallback>OR</AvatarFallback>
            </Avatar>
            <span className="text-[#475467] text-sm font-semibold">
              Olivia Rhye
            </span>
          </div>
        </Link> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" asChild>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://s3-alpha-sig.figma.com/img/6c1f/e88a/3b9e8dfddf4a065581b04df49638ca9c?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QG~Klln1fhzUy1rkQlgHwFy4g3-9EBdYU54aO3ADBbMndp4aovBwNypWvyFPMSBaKrdIQiEgnDsvqvH5GCAFHlmH0sZulCRrp152TULvPr0E3puyjjgN6NwCxWyhQMFgKbnjAyasHt5~zVsc49CMYY7w64TEOUEVifHeTg9FS6D503j0ADg~Uh768fYf2upyEQX6hkAUOeWexYZaxMvNarNdtK6a6qcHmVihApWK4Lv7vrhVAdlI9fLd7mAjiFOE-0U5MiegfvEXPNVI2T4NbsFCODmDGppns~hlm9rVp4JG0h2dQoD37PqSId8yBMkv8zt-iuotxkH3uR7Yrw~Rsg__" />
                  <AvatarFallback>OR</AvatarFallback>
                </Avatar>
                <span className="text-[#475467] text-sm font-semibold">
                  Olivia Rhye
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Button
                onClick={hanndleLogout}
                variant="ghost"
                className="w-full justify-start"
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
