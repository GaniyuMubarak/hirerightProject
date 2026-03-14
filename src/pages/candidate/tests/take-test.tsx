import TakeTest from "@/components/candidate/test/take-test";
import { Button } from "@/components/ui/button";
import { useAssignedTests } from "@/hooks/use-candidate-tests";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router";

export default function TakeTestPage() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const numericId = Number(assignmentId);
  const { data, isLoading } = useAssignedTests();

  const test = data?.pending?.find((t) => t.id === numericId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-[#475467]" />
      </div>
    );
  }

  if (!test || isNaN(numericId)) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <p className="text-[#475467] text-sm">
            Test not found or already completed.
          </p>
          <Link to="/candidate/tests">
            <Button variant="secondary" className="rounded-[6px]">
              Back to Tests
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
      <Link
        to="/candidate/tests"
        className="inline-flex items-center gap-1.5 text-sm text-[#475467] hover:text-[#1B1B1C] mb-6">
        <ChevronLeft size={15} /> Back to Tests
      </Link>

      <TakeTest
        assignmentId={numericId}
        testTitle={test.test.title}
        durationMinutes={test.test.duration_minutes}
        // Pass job context so the intro screen shows which role this test is for
        jobTitle={test.job_application?.job?.title}
        companyName={test.job_application?.job?.company?.name}
      />
    </div>
  );
}