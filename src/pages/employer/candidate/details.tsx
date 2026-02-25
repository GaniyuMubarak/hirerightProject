import AboutMe from "@/components/candidate/profile/about";
import ContactInfo from "@/components/candidate/profile/contact-info";
import ProfileDocuments from "@/components/candidate/profile/documents";
import Resume from "@/components/candidate/profile/resume";
import SocialLinks from "@/components/candidate/profile/social-links";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Link } from "react-router";
export default function CandidateDetails({ data }) {
  const avatarUrl =
    data?.user?.profile_image_url || "/images/default-avatar.png";

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-5 lg:space-y-8 ">
      <div className="p-4 bg-[#F8F8FD] rounded-[8px] space-y-6">
        <div className="flex max-lg:flex-col justify-between lg:items-center gap-4 border p-4 bg-white rounded-[8px]">
          <div className="flex items-center gap-3">
            <div className="h-12 lg:h-[100px] w-12 lg:w-[100px] rounded-[6px] overflow-hidden">
              <img
                src={avatarUrl}
                alt="Candidate avatar"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-2">
              <span className="text-[#14151A] text-xl font-medium leading-none">
                {data?.user?.job_title || "Senior Product Designer"}
              </span>
              <p className="text-[#0F132499]">
                {data?.user?.role || "UI/UX Designer"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button variant="outline">
              <Icons.bookmarkSm className="min-h-6 min-w-6" />
            </Button>

            <Link to="/employer/jobs/applications">
              <Button className="rounded-[6px]">
                Hiring Stage <Icons.arrowRight className="min-h-6 min-w-6" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="border p-4 bg-white rounded-[8px] space-y-6">
          <AboutMe />
          <ProfileDocuments />
          <ContactInfo />
          <Resume />
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}



//WAITING FOR API ENDPOINT TO GET CANDIDATE DETAILS

// import AboutMe from "@/components/candidate/profile/about";
// import ContactInfo from "@/components/candidate/profile/contact-info";
// import ProfileDocuments from "@/components/candidate/profile/documents";
// import Resume from "@/components/candidate/profile/resume";
// import SocialLinks from "@/components/candidate/profile/social-links";
// import { Button } from "@/components/ui/button";
// import Icons from "@/components/ui/icons";
// import CandidateServices from "@/services/candidate-services";
// import { useQuery } from "@tanstack/react-query";
// import { Link, useParams } from "react-router";
// import { Loader2 } from "lucide-react";


// // ── Query hook ───────────────────────────────────────────────────────────────

// function useCandidateById(id: string) {
//   return useQuery({
//     queryKey: ["candidate", id],
//     queryFn: () => CandidateServices.getCandidateById(id),
//     enabled: !!id,
//   });
// }



// // ── Component ────────────────────────────────────────────────────────────────

// export default function CandidateDetails() {
//   const { id } = useParams<{ id: string }>();
//   const { data, isPending, isError, error } = useCandidateById(id!);

//   if (isPending) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 pt-8 flex items-center justify-center min-h-[400px]">
//         {/* <Icons.spinner className="h-8 w-8 animate-spin text-muted-foreground" /> */}
//         {/* <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /> */}
//         <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 pt-8 flex flex-col items-center justify-center min-h-[400px] gap-3">
//         <p className="text-destructive font-medium">
//           Failed to load candidate profile
//         </p>
//         <p className="text-sm text-muted-foreground">
//           {(error as Error).message}
//         </p>
//       </div>
//     );
//   }

//   const avatarUrl =
//     data?.user?.profile_image_url || "/images/default-avatar.png";

//   return (
//     <div className="max-w-7xl mx-auto px-4 pt-8 space-y-5 lg:space-y-8">
//       <div className="p-4 bg-[#F8F8FD] rounded-[8px] space-y-6">
//         {/* Header card */}
//         <div className="flex max-lg:flex-col justify-between lg:items-center gap-4 border p-4 bg-white rounded-[8px]">
//           <div className="flex items-center gap-3">
//             <div className="h-12 lg:h-[100px] w-12 lg:w-[100px] rounded-[6px] overflow-hidden">
//               <img
//                 src={avatarUrl}
//                 alt={`${data?.user?.full_name ?? "Candidate"} avatar`}
//                 className="object-cover w-full h-full"
//               />
//             </div>

//             <div className="flex flex-col justify-between h-full space-y-2">
//               <span className="text-[#14151A] text-xl font-medium leading-none">
//                 {data?.user?.full_name || "—"}
//               </span>
//               <p className="text-[#0F132499]">{data?.user?.job_title || "—"}</p>
//             </div>
//           </div>

//           <div className="flex gap-4 justify-end">
//             <Button variant="outline">
//               <Icons.bookmarkSm className="min-h-6 min-w-6" />
//             </Button>

//             <Link to="/employer/jobs/applications">
//               <Button className="rounded-[6px]">
//                 Hiring Stage <Icons.arrowRight className="min-h-6 min-w-6" />
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Profile sections */}
//         <div className="border p-4 bg-white rounded-[8px] space-y-6">
//           <AboutMe data={data} />
//           <ProfileDocuments data={data} />
//           <ContactInfo data={data} />
//           <Resume data={data} />
//           <SocialLinks data={data} />
//         </div>
//       </div>
//     </div>
//   );
// }