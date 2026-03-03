// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { Link } from "react-router";
// import Icons from "../../ui/icons";

// export default function CandidateCard({
//   aiRecommended,
// }: {
//   aiRecommended?: Boolean;
// }) {
//   return (
//     <Link to="/employer/candidates/id">
//       <div
//         className={cn(
//           "space-y-4 lg:space-y-6 px-4 p-4 lg:py-6 border rounded-[6px]",
//           aiRecommended && "bg-[#F8F8FD]"
//         )}
//       >
//         {aiRecommended && (
//           <div className="flex justify-end text-[#175CD3] text-sm">
//             <div className="flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] rounded-[4px] px-3 py-1.5">
//               <Icons.bot />
//               <span>AI-recommended </span>
//               <Icons.stars />
//             </div>
//           </div>
//         )}

//         <div className="flex items-center gap-3">
//           <div className="h-[64px] w-[64px] rounded-full">
//             <img
//               src="/images/testimonies/avatar.png"
//               alt="Logo"
//               className="object-cover w-full h-full aspect-square"
//             />
//           </div>
//           <div className="flex flex-col justify-between h-full space-y-2">
//             <span className="text-base font-medium tracking-[-0.01em] leading-none">
//               Samson Bond
//             </span>
//             <span className="text-[#0F132499] tracking-[-0.01em] text-base">
//               UI/UX Designer
//             </span>
//           </div>
//         </div>
//         <Separator />
//         <ul className="space-y-4 list-disc list-inside">
//           <li>7+ Years of Experience</li>
//           <li>Education : Masters Degree</li>
//           <li>Applied: Jan 23, 2024</li>
//         </ul>

//         <div className="flex gap-2.5">
//           <Button variant={"link"} className="px-0 h-11">
//             <Icons.download /> Download CV
//           </Button>
//           <Button variant={"outline"} className="px-6 h-11 bg-transparent">
//             <Icons.bookmarkSm className="min-h-6 min-w-6" />
//           </Button>
//         </div>
//       </div>
//     </Link>
//   );
// }

// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { Link } from "react-router";
// import Icons from "../../ui/icons";

// export type Candidate = {
//   id: string;
//   name: string;
//   role: string;
//   avatarUrl?: string;
//   yearsOfExperience: number;
//   education: string;
//   appliedAt: string | Date;
//   cvUrl?: string;
// };

// export default function CandidateCard({
//   candidate,
//   aiRecommended,
// }: {
//   candidate: Candidate;
//   aiRecommended?: boolean;
// }) {
//   const formattedDate = new Date(candidate.appliedAt).toLocaleDateString(
//     "en-US",
//     {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     },
//   );

//   return (
//     <Link to={`/employer/candidates/${candidate.id}`}>
//       <div
//         className={cn(
//           "space-y-4 lg:space-y-6 px-4 p-4 lg:py-6 border rounded-[6px]",
//           aiRecommended && "bg-[#F8F8FD]",
//         )}>
//         {aiRecommended && (
//           <div className="flex justify-end text-[#175CD3] text-sm">
//             <div className="flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] rounded-[4px] px-3 py-1.5">
//               <Icons.bot />
//               <span>AI-recommended</span>
//               <Icons.stars />
//             </div>
//           </div>
//         )}

//         <div className="flex items-center gap-3">
//           <div className="h-[64px] w-[64px] rounded-full overflow-hidden">
//             <img
//               src={candidate.avatarUrl ?? "/images/testimonies/avatar.png"}
//               alt={candidate.name}
//               className="object-cover w-full h-full aspect-square"
//             />
//           </div>
//           <div className="flex flex-col justify-between h-full space-y-2">
//             <span className="text-base font-medium tracking-[-0.01em] leading-none">
//               {candidate.name}
//             </span>
//             <span className="text-[#0F132499] tracking-[-0.01em] text-base">
//               {candidate.role}
//             </span>
//           </div>
//         </div>

//         <Separator />

//         <ul className="space-y-4 list-disc list-inside">
//           <li>{candidate.yearsOfExperience}+ Years of Experience</li>
//           <li>Education: {candidate.education}</li>
//           <li>Applied: {formattedDate}</li>
//         </ul>

//         <div className="flex gap-2.5">
//           <Button
//             variant={"link"}
//             className="px-0 h-11"
//             onClick={(e) => {
//               e.preventDefault();
//               if (candidate.cvUrl) window.open(candidate.cvUrl, "_blank");
//             }}>
//             <Icons.download /> Download CV
//           </Button>
//           <Button variant={"outline"} className="px-6 h-11 bg-transparent">
//             <Icons.bookmarkSm className="min-h-6 min-w-6" />
//           </Button>
//         </div>
//       </div>
//     </Link>
//   );
// }

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import Icons from "../../ui/icons";

interface CandidateCardProps {
  aiRecommended?: boolean;
  id: number | string;
  fullName: string;
  jobTitle?: string;
  avatarUrl?: string;
  appliedAt?: string;
  resumeUrl?: string;
}

export default function CandidateCard({
  aiRecommended,
  id,
  fullName,
  jobTitle,
  avatarUrl,
  appliedAt,
  resumeUrl,
}: CandidateCardProps) {
  return (
    <Link to={`/employer/candidates/${id}`}>
      <div
        className={cn(
          "space-y-4 lg:space-y-6 px-4 p-4 lg:py-6 border rounded-[6px]",
          aiRecommended && "bg-[#F8F8FD]",
        )}>
        {aiRecommended && (
          <div className="flex justify-end text-[#175CD3] text-sm">
            <div className="flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] rounded-[4px] px-3 py-1.5">
              <Icons.bot />
              <span>AI-recommended</span>
              <Icons.stars />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="h-[64px] w-[64px] rounded-full overflow-hidden">
            <img
              src={avatarUrl || "/images/default-avatar.png"}
              alt={fullName}
              className="object-cover w-full h-full aspect-square"
            />
          </div>
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-base font-medium tracking-[-0.01em] leading-none">
              {fullName}
            </span>
            <span className="text-[#0F132499] tracking-[-0.01em] text-base">
              {jobTitle || "—"}
            </span>
          </div>
        </div>

        <Separator />

        <ul className="space-y-4 list-disc list-inside">
          {appliedAt && (
            <li>
              Applied:{" "}
              {new Date(appliedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </li>
          )}
        </ul>

        <div className="flex gap-2.5">
          {resumeUrl ? (
            <Button
              variant="link"
              className="px-0 h-11"
              onClick={(e) => {
                e.preventDefault();
                window.open(resumeUrl, "_blank");
              }}>
              <Icons.download /> Download CV
            </Button>
          ) : (
            <Button
              variant="link"
              className="px-0 h-11 text-muted-foreground"
              disabled>
              <Icons.download /> No CV
            </Button>
          )}
          <Button
            variant="outline"
            className="px-6 h-11 bg-transparent"
            onClick={(e) => e.preventDefault()}>
            <Icons.bookmarkSm className="min-h-6 min-w-6" />
          </Button>
        </div>
      </div>
    </Link>
  );
}