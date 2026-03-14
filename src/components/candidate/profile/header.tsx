import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { buttonVariants } from "../../ui/button";
import Icons from "../../ui/icons";

export default function Header({ profile }: { profile: any }) {
  // ✅ Use actual profile image, fall back to a placeholder
  const avatarSrc =
    profile?.profile_image_url ||
    profile?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent((profile?.first_name || "") + "+" + (profile?.last_name || ""))}&background=A6C0FE&color=fff&size=160`;

  return (
    <div className="relative">
      <div className="absolute top-0 bg-gradient-to-tr from-[#A6C0FE] to-[#FFEAF6] h-[84px] w-full rounded-t-[6px]" />
      <div className="px-4 lg:px-8 pt-16 lg:pt-10">
        <div className="relative flex gap-2 lg:gap-6 items-center border-b pb-6">
          <div className="shrink-0 relative">
            <img
              src={avatarSrc}
              alt={`${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`}
              className="size-[72px] lg:size-40 aspect-square bg-gray-100 rounded-full object-cover border-4 border-white shadow-[0px_12px_16px_-4px_#10182814]"
            />
            <Icons.verifiedCheck className="absolute bottom-0.5 lg:bottom-2 right-0.5 lg:right-2 max-lg:w-4" />
          </div>
          <div className="flex justify-between items-center w-full pt-4 lg:pt-8">
            <header className="space-y-1">
              <h1 className="lg:text-3xl font-semibold text-[#101828]">
                {profile?.first_name} {profile?.last_name}
              </h1>
              <p className="text-[#475467] text-xs lg:text-sm">
                {profile?.title}
              </p>
            </header>
            <div className="flex gap-2 lg:gap-4">
              <Link
                to="/candidate/profile/settings"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "px-3.5 h-10",
                )}>
                <Icons.settings className="min-w-5 min-h-5 lg:min-w-6 lg:min-h-6" />
              </Link>
              <Link
                to="/candidate/profile/edit"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "px-3.5 h-10",
                )}>
                <Icons.edit className="min-w-5 min-h-5 lg:min-w-6 lg:min-h-6" />
                <span className="max-lg:hidden">Edit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}