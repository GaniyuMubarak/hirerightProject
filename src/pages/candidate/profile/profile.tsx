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
  // if (isLoading) {
  //   return (
  //     <div className="max-w-7xl mx-auto px-4 pt-8">
  //       <p>Loading profile...</p>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="text-center py-12 flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
            <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent absolute top-0 left-0 animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading Profile...</p>
        </div>
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