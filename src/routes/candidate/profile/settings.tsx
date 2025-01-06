import Header from "@/components/candidate/profile/header";
import ChangePassword from "@/components/candidate/settings/change-password";
import DeleteAccount from "@/components/candidate/settings/delete-account";
import { ProfileSettings } from "@/components/candidate/settings/settings";

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
