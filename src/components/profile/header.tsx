import { Link } from "react-router";
import { buttonVariants } from "../ui/button";
import Icons from "../ui/icons";

export default function Header() {
  return (
    <div className="relative">
      <div className="absolute top-0 bg-gradient-to-tr from-[#A6C0FE] to-[#FFEAF6] h-[84px] w-full rounded-t-[6px]" />
      <div className="px-8 pt-10 ">
        <div className="relative flex gap-6 items-center border-b pb-6">
          <div className="shrink-0 relative">
            <img
              src="https://s3-alpha-sig.figma.com/img/6c1f/e88a/3b9e8dfddf4a065581b04df49638ca9c?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QG~Klln1fhzUy1rkQlgHwFy4g3-9EBdYU54aO3ADBbMndp4aovBwNypWvyFPMSBaKrdIQiEgnDsvqvH5GCAFHlmH0sZulCRrp152TULvPr0E3puyjjgN6NwCxWyhQMFgKbnjAyasHt5~zVsc49CMYY7w64TEOUEVifHeTg9FS6D503j0ADg~Uh768fYf2upyEQX6hkAUOeWexYZaxMvNarNdtK6a6qcHmVihApWK4Lv7vrhVAdlI9fLd7mAjiFOE-0U5MiegfvEXPNVI2T4NbsFCODmDGppns~hlm9rVp4JG0h2dQoD37PqSId8yBMkv8zt-iuotxkH3uR7Yrw~Rsg__"
              alt="Profile"
              className="size-40 aspect-square bg-gray-100 rounded-full object-cover border-4 border-white shadow-[0px_12px_16px_-4px_#10182814]
"
            />

            <Icons.verifiedCheck className="absolute bottom-2 right-2" />
          </div>
          <div className="flex justify-between items-center w-full pt-8">
            <header className="space-y-1">
              <h1 className="text-3xl font-semibold text-[#101828]">
                Oliva Rhye
              </h1>
              <p className="text-[#475467] text-sm">UI/UX Designer</p>
            </header>
            <div className="flex gap-4">
              <Link
                to="/dashboard/profile/settings"
                className={buttonVariants({ variant: "outline" })}
              >
                <Icons.settings className="min-w-6 min-h-6" />
              </Link>
              <Link
                to="/dashboard/profile/edit"
                className={buttonVariants({ variant: "outline" })}
              >
                <Icons.edit className="min-w-6 min-h-6" /> Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
