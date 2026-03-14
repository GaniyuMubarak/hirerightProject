import JobPagination from "@/components/candidate/job/pagination";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyServices from "@/services/company-services";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import CandidateCard from "./candidate-card";
import CandidateHeader from "./candidate-header";

function useCandidates() {
  return useQuery({
    queryKey: ["employer-candidates"],
    queryFn: () => CompanyServices.getEmployerCandidates(),
  });
}

function useCompany() {
  return useQuery({
    queryKey: ["employer-company"],
    queryFn: () => CompanyServices.getCompany(),
  });
}

export default function CandidatesList() {
  const { data, isPending, isError } = useCandidates();
  const { data: companyData } = useCompany();

  const candidates = data?.candidates?.data ?? [];
  const total = data?.candidates?.total ?? 0;
  const companyName = companyData?.data?.name;
  const companyLogo = companyData?.data?.logo;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
      <CandidateHeader
        companyName={companyName}
        companyLogo={companyLogo}
        total={total}
      />
      <Tabs defaultValue="all" className="w-full space-y-8">
        <div className="flex justify-between items-end gap-4">
          {/* <TabsList className="border-b w-full justify-start">
            <TabsTrigger value="all">
              All {total > 0 ? `(${total})` : ""}
            </TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="dropped">Dropped</TabsTrigger>
          </TabsList> */}

          {/* <Button
            variant="outline"
            className="rounded-[1px] lg:px-6 max-lg:border-none">
            <Icons.filter />
            <span className="max-lg:hidden">Sort</span>
          </Button> */}
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