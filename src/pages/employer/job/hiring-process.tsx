// // ─────────────────────────────────────────────────────────────────────────
// // This page is for managing the hiring process of a specific job, including
// // viewing candidates who applied, their statuses, and taking actions like
// // scheduling interviews or sending offers.
// // Working perfectly
// // ─────────────────────────────────────────────────────────────────────────

// import CandidateHiringCard, {
//   type Application,
// } from "@/components/employer/job/candidate-hiring-card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Icons from "@/components/ui/icons";
// import CompanyServices from "@/services/company-services";
// import CompanyLogo from "@/components/ui/companyLogo";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router";
// import { Loader2 } from "lucide-react";

// export default function HiringProcess() {
//   const { jobId } = useParams<{ jobId: string }>();

//   const { data, isPending, isError } = useQuery({
//     queryKey: ["job-applications", jobId],
//     queryFn: () => CompanyServices.getJobApplications(jobId as string),
//     enabled: !!jobId,
//   });

//   const { data: jobData } = useQuery({
//     queryKey: ["job", jobId],
//     queryFn: () => CompanyServices.getJobById(jobId as string),
//     enabled: !!jobId,
//   });

//   const { data: companyData } = useQuery({
//     queryKey: ["employer-company"],
//     queryFn: () => CompanyServices.getCompany(),
//   });
//   const applications: Application[] = data?.data?.data ?? [];
//   const job = jobData?.data;
//   const company = companyData?.data;

//   return (
//     <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
//       {/* Job header */}
//       <div className="flex justify-between items-center gap-4 border p-4 bg-white rounded-[8px]">
//         <div className="flex items-center gap-3">
//           <CompanyLogo
//             logoUrl={company?.logo}
//             companyName={company?.name}
//             size="lg"
//           />
//           <div className="flex flex-col justify-between h-full space-y-2">
//             <span className="text-[#14151A] text-xl tracking-[-0.012em] font-medium leading-none">
//               {job?.title || "—"}
//             </span>
//             {job?.employment_type && (
//               <Badge className="py-0.5 px-2 w-fit rounded capitalize">
//                 {job.employment_type.replace("_", " ")}
//               </Badge>
//             )}
//           </div>
//         </div>
//         <Button variant="ghost" className="border-b rounded-none">
//           <Icons.more className="min-h-6 min-w-6" />
//         </Button>
//       </div>

//       {/* Section header */}
//       <header className="space-y-1 border-b pb-5">
//         <h1 className="text-2xl font-semibold">
//           Candidates ({applications.length})
//         </h1>
//         <p className="text-[#475467] text-sm">
//           Best AI matches from HIRE RIGHT
//         </p>
//       </header>

//       {/* Candidates list */}
//       {isPending ? (
//         <div className="flex justify-center py-20">
//           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//         </div>
//       ) : isError ? (
//         <div className="flex justify-center py-20">
//           <p className="text-destructive">Failed to load applications.</p>
//         </div>
//       ) : applications.length === 0 ? (
//         <p className="text-muted-foreground text-sm py-10 text-center">
//           No candidates have applied for this job yet.
//         </p>
//       ) : (
//         <div className="flex flex-col gap-6">
//           {applications.map((application) => (
//             <CandidateHiringCard
//               key={application.id}
//               application={application}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// ─────────────────────────────────────────────────────────────────────────
// This page is for managing the hiring process of a specific job, including
// viewing candidates who applied, their statuses, and taking actions like
// scheduling interviews or sending offers.
// Working perfectly
// ─────────────────────────────────────────────────────────────────────────

// import CandidateHiringCard, {
//   type Application,
// } from "@/components/employer/job/candidate-hiring-card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Icons from "@/components/ui/icons";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import CompanyServices from "@/services/company-services";
// import CompanyLogo from "@/components/ui/companyLogo";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router";
// import { Loader2 } from "lucide-react";

// const DROPPED_STATUSES = ["rejected"];
// const SHORTLISTED_STATUSES = ["shortlisted", "interview", "hired"];

// function EmptyState({ message }: { message: string }) {
//   return (
//     <p className="text-muted-foreground text-sm py-10 text-center">{message}</p>
//   );
// }

// export default function HiringProcess() {
//   const { jobId } = useParams<{ jobId: string }>();

//   const { data, isPending, isError } = useQuery({
//     queryKey: ["job-applications", jobId],
//     queryFn: () => CompanyServices.getJobApplications(jobId as string),
//     enabled: !!jobId,
//   });

//   const { data: jobData } = useQuery({
//     queryKey: ["job", jobId],
//     queryFn: () => CompanyServices.getJobById(jobId as string),
//     enabled: !!jobId,
//   });

//   const { data: companyData } = useQuery({
//     queryKey: ["employer-company"],
//     queryFn: () => CompanyServices.getCompany(),
//   });

//   const applications: Application[] = data?.data?.data ?? [];
//   const job = jobData?.data;
//   const company = companyData?.data;

//   const shortlisted = applications.filter((a) =>
//     SHORTLISTED_STATUSES.includes((a.status ?? "").toLowerCase()),
//   );
//   const dropped = applications.filter((a) =>
//     DROPPED_STATUSES.includes((a.status ?? "").toLowerCase()),
//   );

//   function CandidateList({
//     items,
//     emptyMessage,
//   }: {
//     items: Application[];
//     emptyMessage: string;
//   }) {
//     if (items.length === 0) return <EmptyState message={emptyMessage} />;
//     return (
//       <div className="flex flex-col gap-6">
//         {items.map((application) => (
//           <CandidateHiringCard
//             key={application.id}
//             application={application}
//           />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
//       {/* Job header */}
//       <div className="flex justify-between items-center gap-4 border p-4 bg-white rounded-[8px]">
//         <div className="flex items-center gap-3">
//           <CompanyLogo
//             logoUrl={company?.logo}
//             companyName={company?.name}
//             size="lg"
//           />
//           <div className="flex flex-col justify-between h-full space-y-2">
//             <span className="text-[#14151A] text-xl tracking-[-0.012em] font-medium leading-none">
//               {job?.title || "—"}
//             </span>
//             {job?.employment_type && (
//               <Badge className="py-0.5 px-2 w-fit rounded capitalize">
//                 {job.employment_type.replace("_", " ")}
//               </Badge>
//             )}
//           </div>
//         </div>
//         <Button variant="ghost" className="border-b rounded-none">
//           <Icons.more className="min-h-6 min-w-6" />
//         </Button>
//       </div>

//       {/* Section header */}
//       <header className="space-y-1 border-b pb-5">
//         <h1 className="text-2xl font-semibold">
//           Candidates ({applications.length})
//         </h1>
//         <p className="text-[#475467] text-sm">Best AI matches from HIRE RIGHT</p>
//       </header>

//       {/* Candidates list */}
//       {isPending ? (
//         <div className="flex justify-center py-20">
//           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//         </div>
//       ) : isError ? (
//         <div className="flex justify-center py-20">
//           <p className="text-destructive">Failed to load applications.</p>
//         </div>
//       ) : (
//         <Tabs defaultValue="all" className="w-full space-y-6">
//           <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
//             <TabsTrigger
//               value="all"
//               className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none pb-3">
//               All {applications.length > 0 && `(${applications.length})`}
//             </TabsTrigger>
//             <TabsTrigger
//               value="shortlisted"
//               className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none pb-3">
//               Shortlisted {shortlisted.length > 0 && `(${shortlisted.length})`}
//             </TabsTrigger>
//             <TabsTrigger
//               value="dropped"
//               className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none pb-3">
//               Dropped {dropped.length > 0 && `(${dropped.length})`}
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="all">
//             <CandidateList
//               items={applications}
//               emptyMessage="No candidates have applied for this job yet."
//             />
//           </TabsContent>

//           <TabsContent value="shortlisted">
//             <CandidateList
//               items={shortlisted}
//               emptyMessage="No shortlisted candidates yet."
//             />
//           </TabsContent>

//           <TabsContent value="dropped">
//             <CandidateList
//               items={dropped}
//               emptyMessage="No dropped candidates yet."
//             />
//           </TabsContent>
//         </Tabs>
//       )}
//     </div>
//   );
// }

import CandidateHiringCard, {
  type Application,
} from "@/components/employer/job/candidate-hiring-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyServices from "@/services/company-services";
import CompanyLogo from "@/components/ui/companyLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";

const DROPPED_STATUSES = ["rejected"];
const SHORTLISTED_STATUSES = ["shortlisted", "interview", "hired"];

function EmptyState({ message }: { message: string }) {
  return (
    <p className="text-muted-foreground text-sm py-10 text-center">{message}</p>
  );
}

export default function HiringProcess() {
  const { jobId } = useParams<{ jobId: string }>();
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["job-applications", jobId],
    queryFn: () => CompanyServices.getJobApplications(jobId as string),
    enabled: !!jobId,
  });

  const { data: jobData } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => CompanyServices.getJobById(jobId as string),
    enabled: !!jobId,
  });

  const { data: companyData } = useQuery({
    queryKey: ["employer-company"],
    queryFn: () => CompanyServices.getCompany(),
  });

  const closePostingMutation = useMutation({
    mutationFn: () =>
      CompanyServices.updateJobStatus(jobId as string, "closed"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["employer-jobs"] });
      toast.success("Job posting closed. Candidates can no longer apply.");
    },
    onError: () => {
      toast.error("Failed to close job posting. Please try again.");
    },
  });

  const applications: Application[] = data?.data?.data ?? [];
  const job = jobData?.data;
  const company = companyData?.data;
  const isClosed = job?.status === "closed";

  console.log("[HiringProcess] job data:", job);
  // const jobTestId = job?.test_id ?? null;
  const jobTestId = job?.test_id ?? job?.stages?.[0]?.tests?.[0]?.id ?? null;

  const shortlisted = applications.filter((a) =>
    SHORTLISTED_STATUSES.includes((a.status ?? "").toLowerCase()),
  );
  const dropped = applications.filter((a) =>
    DROPPED_STATUSES.includes((a.status ?? "").toLowerCase()),
  );

  function CandidateList({
    items,
    emptyMessage,
  }: {
    items: Application[];
    emptyMessage: string;
  }) {
    if (items.length === 0) return <EmptyState message={emptyMessage} />;
    return (
      <div className="flex flex-col gap-6">
        {items.map((application) => (
          <CandidateHiringCard
            key={application.id}
            application={application}
            jobTestId={jobTestId} // ← add this
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
      {/* Job header */}
      <div className="flex justify-between items-center gap-4 border p-4 bg-white rounded-[8px]">
        <div className="flex items-center gap-3">
          <CompanyLogo
            logoUrl={company?.logo}
            companyName={company?.name}
            size="lg"
          />
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-[#14151A] text-xl tracking-[-0.012em] font-medium leading-none">
              {job?.title || "—"}
            </span>
            <div className="flex items-center gap-2">
              {job?.employment_type && (
                <Badge className="py-0.5 px-2 w-fit rounded capitalize">
                  {job.employment_type.replace("_", " ")}
                </Badge>
              )}
              {isClosed && (
                <Badge
                  variant="destructive"
                  className="py-0.5 px-2 w-fit rounded">
                  Closed
                </Badge>
              )}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="border-b rounded-none">
              <Icons.more className="min-h-6 min-w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="text-destructive focus:text-destructive gap-2 cursor-pointer"
              disabled={isClosed || closePostingMutation.isPending}
              onSelect={() => closePostingMutation.mutate()}>
              {closePostingMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              {isClosed ? "Posting Closed" : "Close Posting"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Section header */}
      <header className="space-y-1 border-b pb-5">
        <h1 className="text-2xl font-semibold">
          Candidates ({applications.length})
        </h1>
        <p className="text-[#475467] text-sm">
          Best AI matches from HIRE RIGHT
        </p>
      </header>

      {/* Candidates list */}
      {isPending ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="flex justify-center py-20">
          <p className="text-destructive">Failed to load applications.</p>
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full space-y-6">
          <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none pb-3">
              All {applications.length > 0 && `(${applications.length})`}
            </TabsTrigger>
            <TabsTrigger
              value="shortlisted"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none pb-3">
              Shortlisted {shortlisted.length > 0 && `(${shortlisted.length})`}
            </TabsTrigger>
            <TabsTrigger
              value="dropped"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none pb-3">
              Dropped {dropped.length > 0 && `(${dropped.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <CandidateList
              items={applications}
              emptyMessage="No candidates have applied for this job yet."
            />
          </TabsContent>

          <TabsContent value="shortlisted">
            <CandidateList
              items={shortlisted}
              emptyMessage="No shortlisted candidates yet."
            />
          </TabsContent>

          <TabsContent value="dropped">
            <CandidateList
              items={dropped}
              emptyMessage="No dropped candidates yet."
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}