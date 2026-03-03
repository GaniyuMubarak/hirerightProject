// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Separator } from "@/components/ui/separator";
// // import { cn } from "@/lib/utils";
// // import { Link } from "react-router";
// // import Icons from "../../ui/icons";

// // export default function CandidateHiringCard({
// //   candidate,
// //   aiRecommended,
// // }: {
// //   aiRecommended?: Boolean;
// //   candidate: any;
// // }) {
// //   return (
// //     <Link to="/employer/candidates/id">
// //       <div
// //         className={cn(
// //           "space-y-6 px-4 py-6 border rounded-[6px] flex gap-6",
// //           aiRecommended && "bg-[#F8F8FD]"
// //         )}
// //       >
// //         <div className="space-y-6 whitespace-nowrap w-[33%]">
// //           <div className="flex items-center gap-3">
// //             <div className="h-[64px] w-[64px] rounded-full">
// //               <img
// //                 src="/images/testimonies/avatar.png"
// //                 alt="Logo"
// //                 className="object-cover w-full h-full aspect-square"
// //               />
// //             </div>
// //             <div className="flex flex-col justify-between h-full space-y-2">
// //               <span className="text-base font-medium tracking-[-0.01em] leading-none">
// //                 {candidate?.candidate_name}
// //               </span>
// //               <span className="text-[#0F132499] tracking-[-0.01em] text-base">
// //                 {candidate?.job_title}
// //               </span>
// //             </div>
// //           </div>

// //           <Separator />
// //           <ul className="space-y-4 list-disc list-inside">
// //             <li>7+ Years of Experience</li>
// //             <li>Education : Masters Degree</li>
// //             <li>Applied: Jan 23, 2024</li>
// //           </ul>
// //         </div>

// //         <div className="w-full min-h-44 h-full flex flex-col justify-between">
// //           <div className="min-h-1">
// //             {aiRecommended && (
// //               <div className="flex justify-end text-[#175CD3] text-sm">
// //                 <div className="flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] rounded-[4px] px-3 py-1.5">
// //                   <Icons.bot />
// //                   <span>AI-recommended </span>
// //                   <Icons.stars />
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //           <div className="flex flex-1 justify-between items-center h-full">
// //             <div className="flex gap-12 text-center">
// //               <div>
// //                 <h3 className="text-[#1B1B1C] text-2xl font-semibold mb-3">
// //                   Senior Level
// //                 </h3>
// //                 <span className="text-lg text-[#475467] font-medium">
// //                   Experience Level
// //                 </span>
// //               </div>
// //               <div>
// //                 <h3 className="text-[#1B1B1C] text-2xl font-semibold  mb-3">
// //                   80
// //                 </h3>
// //                 <span className="text-lg text-[#475467] font-medium">
// //                   Test score
// //                 </span>
// //               </div>
// //               <div>
// //                 <div className=" mb-3">
// //                   <Badge className="bg-[#FEF6EE] border-[#F9DBAF] rounded-[16px] text-[#EE7B36] text-base font-medium">
// //                     Interview
// //                   </Badge>
// //                 </div>
// //                 <span className="text-lg text-[#475467] font-medium">
// //                   Hiring Stage
// //                 </span>
// //               </div>
// //             </div>

// //             <Button variant={"link"} className="px-0 h-11">
// //               <Icons.download className="min-w-4 min-h-4" /> Download CV
// //             </Button>
// //           </div>
// //           <div className="flex gap-2.5 justify-end">
// //             <Button
// //               variant={"secondary"}
// //               className="border-[#D0D5DD] px-6 h-11 rounded-[6px]"
// //             >
// //               Drop Candidate
// //             </Button>
// //             <Button className="px-6 h-11 rounded-[6px]">
// //               Advance to next stage
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }

// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Separator } from "@/components/ui/separator";
// // import { cn } from "@/lib/utils";
// // import { Link } from "react-router";
// // import Icons from "../../ui/icons";

// // const statusStyles: Record<
// //   string,
// //   { bg: string; border: string; text: string }
// // > = {
// //   shortlisted: {
// //     bg: "bg-[#FEF6EE]",
// //     border: "border-[#F9DBAF]",
// //     text: "text-[#EE7B36]",
// //   },
// //   interview: {
// //     bg: "bg-[#EFF8FF]",
// //     border: "border-[#B2DDFF]",
// //     text: "text-[#175CD3]",
// //   },
// //   hired: {
// //     bg: "bg-[#ECFDF3]",
// //     border: "border-[#ABEFC6]",
// //     text: "text-[#067647]",
// //   },
// //   rejected: {
// //     bg: "bg-[#FFF1F3]",
// //     border: "border-[#FECDD6]",
// //     text: "text-[#C01048]",
// //   },
// //   pending: {
// //     bg: "bg-[#F2F4F7]",
// //     border: "border-[#D0D5DD]",
// //     text: "text-[#475467]",
// //   },
// // };

// // export default function CandidateHiringCard({
// //   candidate,
// //   aiRecommended,
// // }: {
// //   aiRecommended?: boolean;
// //   candidate: any;
// // }) {
// //   const fullName =
// //     `${candidate?.first_name ?? ""} ${candidate?.last_name ?? ""}`.trim() ||
// //     "—";
// //   const latestApplication = candidate?.applications?.[0];
// //   const status = latestApplication?.status ?? "pending";
// //   const testScore = latestApplication?.test_results?.score;
// //   const appliedAt = latestApplication?.applied_at
// //     ? new Date(latestApplication.applied_at).toLocaleDateString("en-US", {
// //         month: "short",
// //         day: "numeric",
// //         year: "numeric",
// //       })
// //     : null;

// //   const badge = statusStyles[status.toLowerCase()] ?? statusStyles.pending;

// //   return (
// //     <Link to={`/employer/candidates/${candidate?.id}`}>
// //       <div
// //         className={cn(
// //           "space-y-6 px-4 py-6 border rounded-[6px] flex gap-6",
// //           aiRecommended && "bg-[#F8F8FD]",
// //         )}>
// //         {/* Left column */}
// //         <div className="space-y-6 whitespace-nowrap w-[33%]">
// //           <div className="flex items-center gap-3">
// //             <div className="h-[64px] w-[64px] rounded-full overflow-hidden">
// //               <img
// //                 src={candidate?.profile_image || "/images/default-avatar.png"}
// //                 alt={fullName}
// //                 className="object-cover w-full h-full aspect-square"
// //               />
// //             </div>
// //             <div className="flex flex-col justify-between h-full space-y-2">
// //               <span className="text-base font-medium tracking-[-0.01em] leading-none">
// //                 {fullName}
// //               </span>
// //               <span className="text-[#0F132499] tracking-[-0.01em] text-base">
// //                 {candidate?.title || "—"}
// //               </span>
// //             </div>
// //           </div>

// //           <Separator />

// //           <ul className="space-y-4 list-disc list-inside text-sm">
// //             {appliedAt && <li>Applied: {appliedAt}</li>}
// //             {candidate?.email && <li>{candidate.email}</li>}
// //             {candidate?.phone && <li>{candidate.phone}</li>}
// //           </ul>
// //         </div>

// //         {/* Right column */}
// //         <div className="w-full min-h-44 h-full flex flex-col justify-between">
// //           <div className="min-h-1">
// //             {aiRecommended && (
// //               <div className="flex justify-end text-[#175CD3] text-sm">
// //                 <div className="flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] rounded-[4px] px-3 py-1.5">
// //                   <Icons.bot />
// //                   <span>AI-recommended</span>
// //                   <Icons.stars />
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex flex-1 justify-between items-center h-full">
// //             <div className="flex gap-12 text-center">
// //               <div>
// //                 <h3 className="text-[#1B1B1C] text-2xl font-semibold mb-3">
// //                   {latestApplication?.job?.title || "—"}
// //                 </h3>
// //                 <span className="text-lg text-[#475467] font-medium">
// //                   Applied Role
// //                 </span>
// //               </div>
// //               <div>
// //                 <h3 className="text-[#1B1B1C] text-2xl font-semibold mb-3">
// //                   {testScore ?? "N/A"}
// //                 </h3>
// //                 <span className="text-lg text-[#475467] font-medium">
// //                   Test Score
// //                 </span>
// //               </div>
// //               <div>
// //                 <div className="mb-3">
// //                   <Badge
// //                     className={cn(
// //                       "rounded-[16px] text-base font-medium capitalize border",
// //                       badge.bg,
// //                       badge.border,
// //                       badge.text,
// //                     )}>
// //                     {status}
// //                   </Badge>
// //                 </div>
// //                 <span className="text-lg text-[#475467] font-medium">
// //                   Hiring Stage
// //                 </span>
// //               </div>
// //             </div>

// //             {candidate?.resume ? (
// //               <Button
// //                 variant="link"
// //                 className="px-0 h-11"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   window.open(candidate.resume, "_blank");
// //                 }}>
// //                 <Icons.download className="min-w-4 min-h-4" /> Download CV
// //               </Button>
// //             ) : (
// //               <Button
// //                 variant="link"
// //                 className="px-0 h-11 text-muted-foreground"
// //                 disabled>
// //                 <Icons.download className="min-w-4 min-h-4" /> No CV
// //               </Button>
// //             )}
// //           </div>

// //           <div className="flex gap-2.5 justify-end">
// //             <Button
// //               variant="secondary"
// //               className="border-[#D0D5DD] px-6 h-11 rounded-[6px]"
// //               onClick={(e) => e.preventDefault()}>
// //               Drop Candidate
// //             </Button>
// //             <Button
// //               className="px-6 h-11 rounded-[6px]"
// //               onClick={(e) => e.preventDefault()}>
// //               Advance to next stage
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }

// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Separator } from "@/components/ui/separator";
// // import { cn } from "@/lib/utils";
// // import { Link } from "react-router";
// // import Icons from "../../ui/icons";
// // import CompanyServices from "@/services/company-services";
// // import { useMutation, useQueryClient } from "@tanstack/react-query";
// // import { toast } from "sonner";

// // const statusStyles: Record<
// //   string,
// //   { bg: string; border: string; text: string }
// // > = {
// //   pending: {
// //     bg: "bg-[#F2F4F7]",
// //     border: "border-[#D0D5DD]",
// //     text: "text-[#475467]",
// //   },
// //   shortlisted: {
// //     bg: "bg-[#FEF6EE]",
// //     border: "border-[#F9DBAF]",
// //     text: "text-[#EE7B36]",
// //   },
// //   interview: {
// //     bg: "bg-[#EFF8FF]",
// //     border: "border-[#B2DDFF]",
// //     text: "text-[#175CD3]",
// //   },
// //   hired: {
// //     bg: "bg-[#ECFDF3]",
// //     border: "border-[#ABEFC6]",
// //     text: "text-[#067647]",
// //   },
// //   rejected: {
// //     bg: "bg-[#FFF1F3]",
// //     border: "border-[#FECDD6]",
// //     text: "text-[#C01048]",
// //   },
// // };

// // export default function CandidateHiringCard({
// //   application,
// // }: {
// //   application: any;
// // }) {
// //   const queryClient = useQueryClient();

// //   // application.candidate is the nested candidate object
// //   const candidate = application?.candidate;
// //   const fullName =
// //     `${candidate?.first_name ?? ""} ${candidate?.last_name ?? ""}`.trim() ||
// //     "—";
// //   const status = application?.status ?? "pending";
// //   const appliedAt = application?.applied_at
// //     ? new Date(application.applied_at).toLocaleDateString("en-US", {
// //         month: "short",
// //         day: "numeric",
// //         year: "numeric",
// //       })
// //     : null;

// //   const badge = statusStyles[status.toLowerCase()] ?? statusStyles.pending;

// //   const { mutate: updateStatus, isPending } = useMutation({
// //     mutationFn: (newStatus: string) =>
// //       CompanyServices.updateApplicationStatus(application.id, {
// //         status: newStatus as any,
// //       }),
// //     onSuccess: () => {
// //       toast.success("Application status updated successfully.");
// //       queryClient.invalidateQueries({ queryKey: ["job-applications"] });
// //     },
// //     onError: () => {
// //       toast.error("Failed to update status. Please try again.");
// //     },
// //   });

// //   return (
// //     <Link to={`/employer/candidates/${candidate?.id}`}>
// //       <div className="space-y-6 px-4 py-6 border rounded-[6px] flex gap-6">
// //         {/* Left column */}
// //         <div className="space-y-6 whitespace-nowrap w-[33%]">
// //           <div className="flex items-center gap-3">
// //             <div className="h-[64px] w-[64px] rounded-full overflow-hidden">
// //               <img
// //                 src={candidate?.profile_image || "/images/default-avatar.png"}
// //                 alt={fullName}
// //                 className="object-cover w-full h-full aspect-square"
// //               />
// //             </div>
// //             <div className="flex flex-col justify-between h-full space-y-2">
// //               <span className="text-base font-medium tracking-[-0.01em] leading-none">
// //                 {fullName}
// //               </span>
// //               <span className="text-[#0F132499] tracking-[-0.01em] text-base">
// //                 {candidate?.title || "—"}
// //               </span>
// //             </div>
// //           </div>

// //           <Separator />

// //           <ul className="space-y-4 list-disc list-inside text-sm">
// //             {appliedAt && <li>Applied: {appliedAt}</li>}
// //             {candidate?.email && <li>{candidate.email}</li>}
// //             {candidate?.phone && <li>{candidate.phone}</li>}
// //           </ul>
// //         </div>

// //         {/* Right column */}
// //         <div className="w-full min-h-44 h-full flex flex-col justify-between">
// //           <div className="flex flex-1 justify-between items-center h-full">
// //             <div className="flex gap-12 text-center">
// //               <div>
// //                 <h3 className="text-[#1B1B1C] text-2xl font-semibold mb-3">
// //                   {application?.job?.title || "—"}
// //                 </h3>
// //                 <span className="text-lg text-[#475467] font-medium">
// //                   Applied Role
// //                 </span>
// //               </div>
// //               <div>
// //                 <div className="mb-3">
// //                   <Badge
// //                     className={cn(
// //                       "rounded-[16px] text-base font-medium capitalize border",
// //                       badge.bg,
// //                       badge.border,
// //                       badge.text,
// //                     )}>
// //                     {status}
// //                   </Badge>
// //                 </div>
// //                 <span className="text-lg text-[#475467] font-medium">
// //                   Hiring Stage
// //                 </span>
// //               </div>
// //             </div>

// //             {candidate?.resume ? (
// //               <Button
// //                 variant="link"
// //                 className="px-0 h-11"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   window.open(candidate.resume, "_blank");
// //                 }}>
// //                 <Icons.download className="min-w-4 min-h-4" /> Download CV
// //               </Button>
// //             ) : (
// //               <Button
// //                 variant="link"
// //                 className="px-0 h-11 text-muted-foreground"
// //                 disabled>
// //                 <Icons.download className="min-w-4 min-h-4" /> No CV
// //               </Button>
// //             )}
// //           </div>

// //           <div className="flex gap-2.5 justify-end">
// //             <Button
// //               variant="secondary"
// //               className="border-[#D0D5DD] px-6 h-11 rounded-[6px]"
// //               disabled={isPending || status === "rejected"}
// //               onClick={(e) => {
// //                 e.preventDefault();
// //                 updateStatus("rejected");
// //               }}>
// //               Drop Candidate
// //             </Button>
// //             <Button
// //               className="px-6 h-11 rounded-[6px]"
// //               disabled={isPending || status === "hired"}
// //               onClick={(e) => {
// //                 e.preventDefault();
// //                 const next: Record<string, string> = {
// //                   pending: "shortlisted",
// //                   shortlisted: "interview",
// //                   interview: "hired",
// //                 };
// //                 const nextStatus = next[status.toLowerCase()];
// //                 if (nextStatus) updateStatus(nextStatus);
// //               }}>
// //               {isPending ? "Updating..." : "Advance to next stage"}
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { Link } from "react-router";
// import Icons from "../../ui/icons";
// import CompanyServices from "@/services/company-services";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// const statusStyles: Record<string, { bg: string; border: string; text: string }> = {
//   pending:     { bg: "bg-[#F2F4F7]", border: "border-[#D0D5DD]", text: "text-[#475467]" },
//   applied:     { bg: "bg-[#F2F4F7]", border: "border-[#D0D5DD]", text: "text-[#475467]" },
//   shortlisted: { bg: "bg-[#FEF6EE]", border: "border-[#F9DBAF]", text: "text-[#EE7B36]" },
//   interview:   { bg: "bg-[#EFF8FF]", border: "border-[#B2DDFF]", text: "text-[#175CD3]" },
//   hired:       { bg: "bg-[#ECFDF3]", border: "border-[#ABEFC6]", text: "text-[#067647]" },
//   rejected:    { bg: "bg-[#FFF1F3]", border: "border-[#FECDD6]", text: "text-[#C01048]" },
// };

// const stageProgression: Record<string, string> = {
//   applied:     "shortlisted",
//   pending:     "shortlisted",
//   shortlisted: "interview",
//   interview:   "hired",
// };

// export default function CandidateHiringCard({ application }: { application: any }) {
//   const queryClient = useQueryClient();

//   // Support both flat (actual API) and nested (documented API) response shapes
//   const candidateId = application?.candidate?.id;
//   const fullName = application?.candidate
//     ? `${application.candidate.first_name ?? ""} ${application.candidate.last_name ?? ""}`.trim()
//     : application?.candidate_name || "—";
//   const jobTitle = application?.candidate?.title || application?.job_title || "—";
//   const email = application?.candidate?.email || application?.candidate_email || "";
//   const profileImage = application?.candidate?.profile_image || "/images/default-avatar.png";
//   const status = application?.status ?? "pending";
//   const appliedAt = application?.applied_at
//     ? new Date(application.applied_at).toLocaleDateString("en-US", {
//         month: "short", day: "numeric", year: "numeric",
//       })
//     : null;

//   const badge = statusStyles[status.toLowerCase()] ?? statusStyles.pending;
//   const nextStatus = stageProgression[status.toLowerCase()];

//   const { mutate: updateStatus, isPending } = useMutation({
//     mutationFn: (newStatus: string) =>
//       CompanyServices.updateApplicationStatus(String(application.id), {
//         status: newStatus as any,
//       }),
//     onSuccess: () => {
//       toast.success("Application status updated.");
//       queryClient.invalidateQueries({ queryKey: ["job-applications"] });
//     },
//     onError: () => {
//       toast.error("Failed to update status.");
//     },
//   });

//   const CardContent = (
//     <div className="space-y-6 px-4 py-6 border rounded-[6px] flex gap-6">
//       {/* Left column */}
//       <div className="space-y-6 whitespace-nowrap w-[33%]">
//         <div className="flex items-center gap-3">
//           <div className="h-[64px] w-[64px] rounded-full overflow-hidden">
//             <img
//               src={profileImage}
//               alt={fullName}
//               className="object-cover w-full h-full aspect-square"
//             />
//           </div>
//           <div className="flex flex-col justify-between h-full space-y-2">
//             <span className="text-base font-medium tracking-[-0.01em] leading-none">
//               {fullName}
//             </span>
//             <span className="text-[#0F132499] tracking-[-0.01em] text-base">
//               {jobTitle}
//             </span>

// export default function CandidateHiringCard({
//   candidate,
//   aiRecommended,
// }: {
//   aiRecommended?: Boolean;
//   candidate: any;
// }) {
//   return (
//     // <Link to="/employer/candidates/id">
//     <Link to={`/employer/candidates/${candidate?.id}`}>
//       <div
//         className={cn(
//           "space-y-6 px-4 py-6 border rounded-[6px] flex gap-6",
//           aiRecommended && "bg-[#F8F8FD]",
//         )}>
//         <div className="space-y-6 whitespace-nowrap w-[33%]">
//           <div className="flex items-center gap-3">
//             <div className="h-[64px] w-[64px] rounded-full">
//               <img
//                 src="/images/testimonies/avatar.png"
//                 alt="Logo"
//                 className="object-cover w-full h-full aspect-square"
//               />
//             </div>
//             <div className="flex flex-col justify-between h-full space-y-2">
//               <span className="text-base font-medium tracking-[-0.01em] leading-none">
//                 {candidate?.candidate_name}
//               </span>
//               <span className="text-[#0F132499] tracking-[-0.01em] text-base">
//                 {candidate?.job_title}
//               </span>
//             </div>

//           </div>
//         </div>

//         <Separator />

//         <ul className="space-y-4 list-disc list-inside text-sm">
//           {appliedAt && <li>Applied: {appliedAt}</li>}
//           {email && <li>{email}</li>}
//         </ul>
//       </div>

//       {/* Right column */}
//       <div className="w-full min-h-44 h-full flex flex-col justify-between">
//         <div className="flex flex-1 justify-between items-center h-full">
//           <div className="flex gap-12 text-center">
//             <div>
//               <h3 className="text-[#1B1B1C] text-2xl font-semibold mb-3">
//                 {application?.job?.title || application?.job_title || "—"}
//               </h3>
//               <span className="text-lg text-[#475467] font-medium">Applied Role</span>
//             </div>
//             <div>
//               <div className="mb-3">
//                 <Badge
//                   className={cn(
//                     "rounded-[16px] text-base font-medium capitalize border",
//                     badge.bg, badge.border, badge.text
//                   )}
//                 >
//                   {status}
//                 </Badge>
//               </div>
//               <span className="text-lg text-[#475467] font-medium">Hiring Stage</span>
//             </div>

//         <div className="w-full min-h-44 h-full flex flex-col justify-between">
//           <div className="min-h-1">
//             {/* {aiRecommended && (
//               <div className="flex justify-end text-[#175CD3] text-sm">
//                 <div className="flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] rounded-[4px] px-3 py-1.5">
//                   <Icons.bot />
//                   <span>AI-recommended </span>
//                   <Icons.stars />
//                 </div>
//               </div>
//             )} */}
//           </div>
//           <div className="flex flex-1 justify-between items-center h-full">
//             <div className="flex gap-12 text-center">
//               <div>
//                 <h3 className="text-[#1B1B1C] text-2xl font-semibold mb-3">
//                   Senior Level
//                 </h3>
//                 <span className="text-lg text-[#475467] font-medium">
//                   Experience Level
//                 </span>
//               </div>
//               <div>
//                 <h3 className="text-[#1B1B1C] text-2xl font-semibold  mb-3">
//                   80
//                 </h3>
//                 <span className="text-lg text-[#475467] font-medium">
//                   Test score
//                 </span>
//               </div>
//               <div>
//                 <div className=" mb-3">
//                   <Badge className="bg-[#FEF6EE] border-[#F9DBAF] rounded-[16px] text-[#EE7B36] text-base font-medium">
//                     Interview
//                   </Badge>
//                 </div>
//                 <span className="text-lg text-[#475467] font-medium">
//                   Hiring Stage
//                 </span>
//               </div>
//             </div>

//             <Button variant={"link"} className="px-0 h-11">
//               <Icons.download className="min-w-4 min-h-4" /> Download CV
//             </Button>
//           </div>
//           <div className="flex gap-2.5 justify-end">
//             <Button
//               variant={"secondary"}
//               className="border-[#D0D5DD] px-6 h-11 rounded-[6px]">
//               Drop Candidate
//             </Button>
//             <Button className="px-6 h-11 rounded-[6px]">
//               Advance to next stage
//             </Button>

//           </div>
//         </div>

//         <div className="flex gap-2.5 justify-end">
//           <Button
//             variant="secondary"
//             className="border-[#D0D5DD] px-6 h-11 rounded-[6px]"
//             disabled={isPending || status === "rejected"}
//             onClick={(e) => {
//               e.preventDefault();
//               updateStatus("rejected");
//             }}
//           >
//             Drop Candidate
//           </Button>
//           <Button
//             className="px-6 h-11 rounded-[6px]"
//             disabled={isPending || !nextStatus}
//             onClick={(e) => {
//               e.preventDefault();
//               if (nextStatus) updateStatus(nextStatus);
//             }}
//           >
//             {isPending ? "Updating..." : "Advance to next stage"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );

//   // Only wrap in Link if we have a candidate ID
//   return candidateId ? (
//     <Link to={`/employers/candidates/${candidateId}`}>{CardContent}</Link>
//  {/* <Link to={`/employer/candidates/${candidateId}`}>{CardContent}</Link> */}
//   ) : (
//     <div className="cursor-default">{CardContent}</div>
//   );
// }

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import Icons from "../../ui/icons";
import CompanyServices from "@/services/company-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const statusStyles: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  pending: {
    bg: "bg-[#F2F4F7]",
    border: "border-[#D0D5DD]",
    text: "text-[#475467]",
  },
  applied: {
    bg: "bg-[#F2F4F7]",
    border: "border-[#D0D5DD]",
    text: "text-[#475467]",
  },
  shortlisted: {
    bg: "bg-[#FEF6EE]",
    border: "border-[#F9DBAF]",
    text: "text-[#EE7B36]",
  },
  interview: {
    bg: "bg-[#EFF8FF]",
    border: "border-[#B2DDFF]",
    text: "text-[#175CD3]",
  },
  hired: {
    bg: "bg-[#ECFDF3]",
    border: "border-[#ABEFC6]",
    text: "text-[#067647]",
  },
  rejected: {
    bg: "bg-[#FFF1F3]",
    border: "border-[#FECDD6]",
    text: "text-[#C01048]",
  },
};

const stageProgression: Record<string, string> = {
  applied: "shortlisted",
  pending: "shortlisted",
  shortlisted: "interview",
  interview: "hired",
};

export default function CandidateHiringCard({
  application,
}: {
  application: any;
}) {
  const queryClient = useQueryClient();

  // Support both flat (actual API) and nested (documented API) response shapes
  const candidateId = application?.candidate?.id;
  const fullName = application?.candidate
    ? `${application.candidate.first_name ?? ""} ${application.candidate.last_name ?? ""}`.trim()
    : application?.candidate_name || "—";
  const jobTitle =
    application?.candidate?.title || application?.job_title || "—";
  const email =
    application?.candidate?.email || application?.candidate_email || "";
  const profileImage =
    application?.candidate?.profile_image || "/images/default-avatar.png";
  const status = application?.status ?? "pending";
  const appliedAt = application?.applied_at
    ? new Date(application.applied_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const badge = statusStyles[status.toLowerCase()] ?? statusStyles.pending;
  const nextStatus = stageProgression[status.toLowerCase()];

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: (newStatus: string) =>
      CompanyServices.updateApplicationStatus(String(application.id), {
        status: newStatus as any,
      }),
    onSuccess: () => {
      toast.success("Application status updated.");
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
    onError: () => {
      toast.error("Failed to update status.");
    },
  });

  const CardContent = (
    <div className="space-y-6 px-4 py-6 border rounded-[6px] flex gap-6">
      {/* Left column */}
      <div className="space-y-6 whitespace-nowrap w-[33%]">
        <div className="flex items-center gap-3">
          <div className="h-[64px] w-[64px] rounded-full overflow-hidden">
            <img
              src={profileImage}
              alt={fullName}
              className="object-cover w-full h-full aspect-square"
            />
          </div>
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-base font-medium tracking-[-0.01em] leading-none">
              {fullName}
            </span>
            <span className="text-[#0F132499] tracking-[-0.01em] text-base">
              {jobTitle}
            </span>
          </div>
        </div>

        <Separator />

        <ul className="space-y-4 list-disc list-inside text-sm">
          {appliedAt && <li>Applied: {appliedAt}</li>}
          {email && <li>{email}</li>}
        </ul>
      </div>

      {/* Right column */}
      <div className="w-full min-h-44 h-full flex flex-col justify-between">
        <div className="flex flex-1 justify-between items-center h-full">
          <div className="flex gap-12 text-center">
            <div>
              <h3 className="text-[#1B1B1C] text-2xl font-semibold mb-3">
                {application?.job?.title || application?.job_title || "—"}
              </h3>
              <span className="text-lg text-[#475467] font-medium">
                Applied Role
              </span>
            </div>
            <div>
              <div className="mb-3">
                <Badge
                  className={cn(
                    "rounded-[16px] text-base font-medium capitalize border",
                    badge.bg,
                    badge.border,
                    badge.text,
                  )}>
                  {status}
                </Badge>
              </div>
              <span className="text-lg text-[#475467] font-medium">
                Hiring Stage
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 justify-end">
          <Button
            variant="secondary"
            className="border-[#D0D5DD] px-6 h-11 rounded-[6px]"
            disabled={isPending || status === "rejected"}
            onClick={(e) => {
              e.preventDefault();
              updateStatus("rejected");
            }}>
            Drop Candidate
          </Button>
          <Button
            className="px-6 h-11 rounded-[6px]"
            disabled={isPending || !nextStatus}
            onClick={(e) => {
              e.preventDefault();
              if (nextStatus) updateStatus(nextStatus);
            }}>
            {isPending ? "Updating..." : "Advance to next stage"}
          </Button>
        </div>
      </div>
    </div>
  );

  // Only wrap in Link if we have a candidate ID
  return candidateId ? (
    <Link to={`/employers/candidates/${candidateId}`}>{CardContent}</Link>
  ) : (
    <div className="cursor-default">{CardContent}</div>
  );
}