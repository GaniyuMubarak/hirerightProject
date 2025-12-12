import AboutMe from "@/components/candidate/profile/about";
import ContactInfo from "@/components/candidate/profile/contact-info";
import ProfileDocuments from "@/components/candidate/profile/documents";
import Resume from "@/components/candidate/profile/resume";
import SocialLinks from "@/components/candidate/profile/social-links";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Link } from "react-router";

export default function CandidateDetails() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-5 lg:space-y-8 ">
      <div className="p-4 bg-[#F8F8FD]  rounded-[8px] space-y-6">
        <div className="flex max-lg:flex-col justify-between lg:items-center gap-4 border p-4 bg-white rounded-[8px]">
          <div className="flex items-center gap-3">
            <div className="h-12 lg:h-[100px] w-12 lg:w-[100px] rounded-[6px]">
              <img
                src="/images/testimonies/avatar.png"
                alt="Logo"
                className="object-cover w-full h-full aspect-square"
              />
            </div>
            <div className="flex flex-col justify-between h-full space-y-2">
              <span className="text-[#14151A] text-xl tracking-[-0.012em] font-medium leading-none">
                Senior Product Designer
              </span>
              <p className="text-[#0F132499] tracking-[-0.01em]">
                UI/UX Designer
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <Button variant={"outline"}>
              <Icons.bookmarkSm className="min-h-6 min-w-6" />
            </Button>
            <Link to="/employer/jobs/applications">
              <Button className="rounded-[6px]">
                Hiring Stage <Icons.arrowRight className="min-h-6 min-w-6" />
              </Button>
            </Link>
          </div>
        </div>

        <div className=" border p-4 bg-white rounded-[8px] space-y-6">
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






// export default function CandidateDetails({ data }) {
//   const avatarUrl =
//     data?.user?.profile_image_url || "/images/default-avatar.png";

//   return (
//     <div className="max-w-7xl mx-auto px-4 pt-8 space-y-5 lg:space-y-8 ">
//       <div className="p-4 bg-[#F8F8FD] rounded-[8px] space-y-6">
//         <div className="flex max-lg:flex-col justify-between lg:items-center gap-4 border p-4 bg-white rounded-[8px]">
//           <div className="flex items-center gap-3">
//             <div className="h-12 lg:h-[100px] w-12 lg:w-[100px] rounded-[6px] overflow-hidden">
//               <img
//                 src={avatarUrl}
//                 alt="Candidate avatar"
//                 className="object-cover w-full h-full"
//               />
//             </div>

//             <div className="flex flex-col justify-between h-full space-y-2">
//               <span className="text-[#14151A] text-xl font-medium leading-none">
//                 {data?.user?.job_title || "Senior Product Designer"}
//               </span>
//               <p className="text-[#0F132499]">
//                 {data?.user?.role || "UI/UX Designer"}
//               </p>
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

//         <div className="border p-4 bg-white rounded-[8px] space-y-6">
//           <AboutMe />
//           <ProfileDocuments />
//           <ContactInfo />
//           <Resume />
//           <SocialLinks />
//         </div>
//       </div>
//     </div>
//   );
// }
