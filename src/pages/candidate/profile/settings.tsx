import Header from "@/components/candidate/profile/header";
import ChangePassword from "@/components/candidate/settings/change-password";
import DeleteAccount from "@/components/candidate/settings/delete-account";
import { ProfileSettings } from "@/components/candidate/settings/settings";
import CandidateServices from "@/services/candidate-services";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";


export default function Settings() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => CandidateServices.getProfile(),
  });

  const navigate = useNavigate();
  const user = data?.data?.user;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      <button
        onClick={() => navigate("/candidate/profile")}
        className="text-sm font-medium text-muted-foreground hover:text-foreground">
        ← Back to profile
      </button>
      <Header profile={user} />
      <ProfileSettings />
      <ChangePassword />
      <DeleteAccount />
    </div>
  );
}
