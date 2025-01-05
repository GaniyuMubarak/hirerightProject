import Header from "@/components/profile/header";
import ChangePassword from "@/components/settings/change-password";
import DeleteAccount from "@/components/settings/delete-account";
import { ProfileSettings } from "@/components/settings/settings";

export default function Settings() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      <Header />
      <ProfileSettings />
      <ChangePassword />
      <DeleteAccount />
    </div>
  );
}
