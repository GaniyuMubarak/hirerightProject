import AboutMe from "@/components/candidate/profile/about";
import ContactInfo from "@/components/candidate/profile/contact-info";
import ProfileDocuments from "@/components/candidate/profile/documents";
import Header from "@/components/candidate/profile/header";
import Resume from "@/components/candidate/profile/resume";
import SocialLinks from "@/components/candidate/profile/social-links";
import CandidateServices from "@/services/candidate-services";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => CandidateServices.getProfile(),
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <p>Loading profile...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <p className="text-red-500">Error loading profile</p>
      </div>
    );
  }

  // Handle no data
  if (!data?.data) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <p>No profile data found</p>
      </div>
    );
  }

  // Extract profile data
  const profileData = data.data;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-6">
      <Header profile={profileData.user} />
      <AboutMe user={profileData.user} />
      <ProfileDocuments user={profileData.user} />
      <ContactInfo user={profileData.user} />
      <Resume 
        education={profileData.education} 
        experiences={profileData.experiences}
        certifications={profileData.certifications}
      />
      <SocialLinks user={profileData.user} />
    </div>
  );
}