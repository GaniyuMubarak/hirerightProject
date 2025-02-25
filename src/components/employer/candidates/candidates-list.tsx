import JobPagination from "@/components/candidate/job/pagination";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CandidateCard from "./candidate-card";
import CandidateHeader from "./candidate-header";

export default function CandidatesList() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      <CandidateHeader />
      <Tabs defaultValue="all" className="w-full space-y-8">
        <div className="flex justify-between items-end gap-4">
          <TabsList className="border-b w-full justify-start ">
            <TabsTrigger value="all">All (234)</TabsTrigger>
            <TabsTrigger value="shotlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="candidates">Dropped</TabsTrigger>
          </TabsList>

          <Button
            variant={"outline"}
            className="rounded-[1px] lg:px-6 max-lg:border-none"
          >
            <Icons.filter />
            <span className="max-lg:hidden">Sort</span>
          </Button>
        </div>
        <TabsContent value="all">
          <div className="space-y-6">
            <header className="lg:space-y-1 border-b pb-5">
              <h1 className="text-lg lg:text-2xl font-semibold">
                AI Recommended for you
              </h1>
              <p className="text-[#475467] text-xs lg:text-sm">
                Best AI matches from HIRE RIGHT
              </p>
            </header>

            <div className="grid lg:grid-cols-4 gap-6">
              <CandidateCard aiRecommended />
              <CandidateCard aiRecommended />
              <CandidateCard aiRecommended />
              <CandidateCard aiRecommended />
              <CandidateCard aiRecommended />
              <CandidateCard aiRecommended />
            </div>

            {/* Applicants  */}

            <header className="space-y-1 border-b pb-5">
              <h1 className="text-2xl font-semibold">Applicants</h1>
            </header>

            <div className="grid lg:grid-cols-4 gap-6">
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
            </div>

            <JobPagination />
          </div>
        </TabsContent>
        <TabsContent value="shotlisted"></TabsContent>
        <TabsContent value="candidates"></TabsContent>
      </Tabs>
    </div>
  );
}
