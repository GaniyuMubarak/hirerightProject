import { AccountTypeForm } from "@/components/auth/account-type";
import Icons from "@/components/ui/icons";
import { Link } from "react-router";

export default function AccountTypePage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#AFAEAD] text-[22px] font-semibold"
          >
            <img src="/logo.svg" alt="Logo" className="size-8" />
            Logo
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center mt-8">
          <div className="w-full max-w-[500px] border p-8 rounded-lg">
            <AccountTypeForm />
          </div>
        </div>

        <div className="mt-8 text-sm text-[#475467] flex justify-end items-center gap-2">
          <Icons.mail className="size-4" /> <span>help@untitledui.com</span>
        </div>
      </div>
      <div className="relative hidden bg-gradient-to-b from-[#435E93] to-[#151D2D] lg:block">
        <div className="absolute inset-0 right-0 h-full w-full py-12 flex justify-end">
          <img
            src="/images/sign-up.png"
            alt="Image"
            className="relative  h-full w-auto object-contain "
          />
        </div>
      </div>
    </div>
  );
}
