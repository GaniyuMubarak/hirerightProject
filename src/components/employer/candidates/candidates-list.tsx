// import JobPagination from "@/components/candidate/job/pagination";
// import { Button } from "@/components/ui/button";
// import Icons from "@/components/ui/icons";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import CandidateCard from "./candidate-card";
// import CandidateHeader from "./candidate-header";

// export default function CandidatesList() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
//       <CandidateHeader />
//       <Tabs defaultValue="all" className="w-full space-y-8">
//         <div className="flex justify-between items-end gap-4">
//           <TabsList className="border-b w-full justify-start ">
//             <TabsTrigger value="all">All (234)</TabsTrigger>
//             <TabsTrigger value="shotlisted">Shortlisted</TabsTrigger>
//             <TabsTrigger value="candidates">Dropped</TabsTrigger>
//           </TabsList>

//           <Button
//             variant={"outline"}
//             className="rounded-[1px] lg:px-6 max-lg:border-none"
//           >
//             <Icons.filter />
//             <span className="max-lg:hidden">Sort</span>
//           </Button>
//         </div>
//         <TabsContent value="all">
//           <div className="space-y-6">
//             <header className="lg:space-y-1 border-b pb-5">
//               <h1 className="text-lg lg:text-2xl font-semibold">
//                 AI Recommended for you
//               </h1>
//               <p className="text-[#475467] text-xs lg:text-sm">
//                 Best AI matches from HIRE RIGHT
//               </p>
//             </header>

//             <div className="grid lg:grid-cols-4 gap-6">
//               <CandidateCard aiRecommended />
//               {/* <CandidateCard aiRecommended />
//               <CandidateCard aiRecommended />
//               <CandidateCard aiRecommended />
//               <CandidateCard aiRecommended /> */}
//               {/* <CandidateCard aiRecommended /> */}
//             </div>

//             {/* Applicants  */}

//             <header className="space-y-1 border-b pb-5">
//               <h1 className="text-2xl font-semibold">Applicants</h1>
//             </header>

//             <div className="grid lg:grid-cols-4 gap-6">
//               <CandidateCard />
//               {/* <CandidateCard />
//               <CandidateCard />
//               <CandidateCard />
//               <CandidateCard />
//               <CandidateCard />
//               <CandidateCard /> */}
//             </div>

//             <JobPagination />
//           </div>
//         </TabsContent>
//         <TabsContent value="shotlisted"></TabsContent>
//         <TabsContent value="candidates"></TabsContent>
//       </Tabs>
//     </div>
//   );
// }

import JobPagination from "@/components/candidate/job/pagination";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyServices from "@/services/company-services";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import CandidateCard from "./candidate-card";
import CandidateHeader from "./candidate-header";

// function useCandidates() {
//   return useQuery({
//     queryKey: ["employer-candidates"],
//     queryFn: () => CompanyServices.getEmployerCandidates(),
//   });
// }

function useCandidates() {
  return useQuery({
    queryKey: ["employer-candidates"],
    queryFn: async () => {
      console.log("Calling API...");
      try {
        const response = await CompanyServices.getEmployerCandidates();
        console.log("Raw response from service:", response);

        // Check the structure
        console.log("Has candidates property?", response?.candidates);
        console.log("Has candidates.data?", response?.candidates?.data);
        console.log("Total:", response?.candidates?.total);

        return response;
      } catch (error) {
        console.error("Error in queryFn:", error);
        throw error;
      }
    },
  });
}



export default function CandidatesList() {
  const { data, isPending, isError } = useCandidates();

  const candidates = data?.candidates?.data ?? [];
  const total = data?.candidates?.total ?? 0;

  

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
      <CandidateHeader />
      <Tabs defaultValue="all" className="w-full space-y-8">
        <div className="flex justify-between items-end gap-4">
          <TabsList className="border-b w-full justify-start">
            <TabsTrigger value="all">
              All {total > 0 ? `(${total})` : ""}
            </TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="dropped">Dropped</TabsTrigger>
          </TabsList>

          <Button
            variant="outline"
            className="rounded-[1px] lg:px-6 max-lg:border-none">
            <Icons.filter />
            <span className="max-lg:hidden">Sort</span>
          </Button>
        </div>

        <TabsContent value="all">
          {isPending ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : isError ? (
            <div className="flex justify-center py-20">
              <p className="text-destructive">Failed to load candidates.</p>
            </div>
          ) : candidates.length === 0 ? (
            <p className="text-muted-foreground text-sm py-20 text-center">
              No candidates have applied yet.
            </p>
          ) : (
            <div className="space-y-6">
              <header className="lg:space-y-1 border-b pb-5">
                <h1 className="text-lg lg:text-2xl font-semibold">
                  All Applicants
                </h1>
              </header>

              <div className="grid lg:grid-cols-4 gap-6">
                {candidates.map((candidate: any) => (
                  <CandidateCard
                    key={candidate.id}
                    id={candidate.id}
                    fullName={`${candidate.first_name} ${candidate.last_name}`}
                    jobTitle={candidate.title}
                    avatarUrl={candidate.profile_image}
                    appliedAt={candidate.job_applications?.[0]?.applied_at}
                    resumeUrl={candidate.resume}
                  />
                ))}
              </div>

              <JobPagination />
            </div>
          )}
        </TabsContent>

        <TabsContent value="shortlisted" />
        <TabsContent value="dropped" />
      </Tabs>
    </div>
  );
}