// import AboutMe from "@/components/candidate/profile/about";
// import ContactInfo from "@/components/candidate/profile/contact-info";
// import ProfileDocuments from "@/components/candidate/profile/documents";
// import Header from "@/components/candidate/profile/header";
// import Resume from "@/components/candidate/profile/resume";
// import SocialLinks from "@/components/candidate/profile/social-links";
// import CandidateServices from "@/services/candidate-services";
// import { useQuery } from "@tanstack/react-query";

// export default function Profile() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["profile"],
//     queryFn: () => CandidateServices.getProfile(),
//   });

//   // Handle loading state
//   // if (isLoading) {
//   //   return (
//   //     <div className="max-w-7xl mx-auto px-4 pt-8">
//   //       <p>Loading profile...</p>
//   //     </div>
//   //   );
//   // }

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 pt-8">
//         <div className="text-center py-12 flex flex-col items-center gap-4">
//           {/* Spinner */}
//           <div className="relative">
//             <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
//             <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent absolute top-0 left-0 animate-spin"></div>
//           </div>
//           <p className="text-gray-600">Loading Profile...</p>
//         </div>
//       </div>
//     );
//   }

//   // Handle error state
//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 pt-8">
//         <p className="text-red-500">Error loading profile</p>
//       </div>
//     );
//   }

//   // Handle no data
//   if (!data?.data) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 pt-8">
//         <p>No profile data found</p>
//       </div>
//     );
//   }

//   // Extract profile data
//   const profileData = data.data;

//   return (
//     <div className="max-w-7xl mx-auto px-4 pt-8 space-y-6">
//       <Header profile={profileData.user} />
//       <AboutMe user={profileData.user} />
//       <ProfileDocuments user={profileData.user} />
//       <ContactInfo user={profileData.user} />
//       <Resume
//         education={profileData.education}
//         experiences={profileData.experiences}
//         certifications={profileData.certifications}
//       />
//       <SocialLinks user={profileData.user} />
//     </div>
//   );
// }

"use client";

import AboutMe from "@/components/candidate/profile/about";
import ContactInfo from "@/components/candidate/profile/contact-info";
import ProfileDocuments from "@/components/candidate/profile/documents";
import Header from "@/components/candidate/profile/header";
import Resume from "@/components/candidate/profile/resume";
import SocialLinks from "@/components/candidate/profile/social-links";
import CandidateServices from "@/services/candidate-services";
import { useQuery } from "@tanstack/react-query";

// Skeleton components
function ProfileSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="relative">
        <div className="absolute top-0 bg-gradient-to-tr from-gray-200 to-gray-100 h-[84px] w-full rounded-t-[6px]" />
        <div className="px-4 lg:px-8 pt-16 lg:pt-10">
          <div className="relative flex gap-2 lg:gap-6 items-center border-b pb-6">
            <div className="shrink-0 relative">
              <div className="size-[72px] lg:size-40 aspect-square bg-gray-200 rounded-full border-4 border-white" />
            </div>
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>

      {/* About Me Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Contact Info Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>

      {/* Resume Skeleton */}
      <div className="space-y-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 border-b pb-4">
            <div className="h-5 bg-gray-200 rounded w-64"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => CandidateServices.getProfile(),
  });

  // Handle loading state with skeleton
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to load profile
          </h3>
          <p className="text-gray-600 mb-6">
            There was an error loading your profile data. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Handle no data
  if (!data?.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Profile incomplete
          </h3>
          <p className="text-gray-600 mb-6">
            Complete your profile to access all features and increase your
            chances with employers.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => (window.location.href = "/candidate/onboarding")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Complete Profile
            </button>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Refresh
            </button>
          </div>
        </div>
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