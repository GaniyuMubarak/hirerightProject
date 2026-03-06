import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAssignedTests } from "@/hooks/use-candidate-tests";
import type { TestAssignment } from "@/types/test";
import { ClipboardList, Loader2 } from "lucide-react";
import { TestCard } from "./test-card";

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <ClipboardList size={40} className="text-[#D0D5DD]" strokeWidth={1.5} />
      <p className="text-[#475467] text-sm">{label}</p>
    </div>
  );
}

export default function TestList() {
  const { data, isLoading } = useAssignedTests();

  const pending: TestAssignment[] = data?.pending ?? [];
  const completed: TestAssignment[] = data?.completed ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-[#475467]" />
      </div>
    );
  }

  return (
    <div className="border rounded-[12px] p-6 space-y-4">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-medium">My Tests</h1>
        <p className="text-sm text-[#475467] mt-1">
          Assessments assigned to you by employers
        </p>
      </header>

      <Tabs defaultValue="pending">
        <TabsList className="rounded-[6px] bg-[#F9FAFB] border h-10">
          <TabsTrigger value="pending" className="rounded-[4px] text-sm">
            Pending
            {pending.length > 0 && (
              <span className="ml-1.5 bg-amber-100 text-amber-700 text-xs rounded-full px-1.5 py-0.5 font-medium">
                {pending.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="rounded-[4px] text-sm">
            Completed
            {completed.length > 0 && (
              <span className="ml-1.5 bg-green-100 text-green-700 text-xs rounded-full px-1.5 py-0.5 font-medium">
                {completed.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          {pending.length === 0 ? (
            <EmptyState label="No pending tests. Once an employer assigns you a test, it will appear here." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pending.map((test) => (
                <TestCard key={test.id} assignment={test} type="pending" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          {completed.length === 0 ? (
            <EmptyState label="No completed tests yet." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {completed.map((test) => (
                <TestCard key={test.id} assignment={test} type="completed" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}