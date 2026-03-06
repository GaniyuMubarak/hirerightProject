import TestResult from "@/components/candidate/test/test-result";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router";

export default function TestResultPage() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const numericId = Number(assignmentId);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
      <Link
        to="/candidate/tests"
        className="inline-flex items-center gap-1.5 text-sm text-[#475467] hover:text-[#1B1B1C] mb-6">
        <ChevronLeft size={15} /> Back to Tests
      </Link>
      <TestResult assignmentId={numericId} />
    </div>
  );
}