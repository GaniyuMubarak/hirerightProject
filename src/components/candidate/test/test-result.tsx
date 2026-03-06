import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTestResult } from "@/hooks/use-candidate-tests";
import dayjs from "dayjs";
import {
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  XCircle,
} from "lucide-react";
import { Link } from "react-router";

export default function TestResult({ assignmentId }: { assignmentId: number }) {
  const { data: result, isLoading } = useTestResult(assignmentId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-[#475467]" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <p className="text-[#475467] text-sm">Result not found.</p>
        <Link to="/candidate/tests">
          <Button variant="secondary" className="rounded-[6px]">
            Back to Tests
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      {/* Score card */}
      <div
        className={`border rounded-[12px] p-8 text-center space-y-4 ${
          result.passed
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}>
        <div
          className={`size-16 rounded-full flex items-center justify-center mx-auto ${
            result.passed ? "bg-green-100" : "bg-red-100"
          }`}>
          {result.passed ? (
            <CheckCircle2 size={32} className="text-green-600" />
          ) : (
            <XCircle size={32} className="text-red-500" />
          )}
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#1B1B1C]">{result.score}%</h2>
          <Badge
            className={`rounded-[4px] ${
              result.passed
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-red-100 text-red-700 border-red-300"
            }`}
            variant="outline">
            {result.passed ? "Passed" : "Failed"}
          </Badge>
        </div>

        <p className="text-sm text-[#475467]">
          {result.passed
            ? "Congratulations! You passed the assessment."
            : `You needed ${result.score}% to pass. Keep practising!`}
        </p>

        {result.feedback && (
          <p className="text-sm text-[#344054] italic border-t pt-3">
            "{result.feedback}"
          </p>
        )}
      </div>

      {/* Summary */}
      <div className="border rounded-[12px] p-6 space-y-4 bg-white">
        <h3 className="font-medium text-[#1B1B1C]">Test Summary</h3>
        <Separator />
        <div className="space-y-3">
          <DetailRow
            icon={<Building2 size={15} className="text-[#667085]" />}
            label="Job"
            value={`${result.job?.title} — ${result.job?.company_name}`}
          />
          <DetailRow
            icon={<CheckCircle2 size={15} className="text-[#667085]" />}
            label="Score"
            value={`${result.correct_answers} / ${result.total_questions} correct`}
          />
          <DetailRow
            icon={<FileText size={15} className="text-[#667085]" />}
            label="Passing score"
            value={`${result.score}%`}
          />
          <DetailRow
            icon={<Clock size={15} className="text-[#667085]" />}
            label="Time taken"
            value={`${result.time_taken_minutes} min`}
          />
          <DetailRow
            icon={<Clock size={15} className="text-[#667085]" />}
            label="Completed"
            value={dayjs(result.completed_at).format("MMM DD, YYYY · h:mm A")}
          />
        </div>
      </div>

      {/* Per-question feedback if provided */}
      {result.question_feedback && result.question_feedback.length > 0 && (
        <div className="border rounded-[12px] p-6 space-y-3 bg-white">
          <h3 className="font-medium text-[#1B1B1C]">Question Breakdown</h3>
          <Separator />
          <div className="space-y-2">
            {result.question_feedback.map((qf, i) => (
              <div
                key={qf.question_id}
                className="flex items-start gap-3 text-sm">
                {qf.correct ? (
                  <CheckCircle2
                    size={15}
                    className="text-green-600 mt-0.5 shrink-0"
                  />
                ) : (
                  <XCircle size={15} className="text-red-500 mt-0.5 shrink-0" />
                )}
                <div className="space-y-0.5">
                  <p className="text-[#344054]">Question {i + 1}</p>
                  <p className="text-xs text-[#667085]">
                    {qf.points_earned} pt{qf.points_earned !== 1 ? "s" : ""}{" "}
                    earned
                    {qf.feedback ? ` · ${qf.feedback}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link to="/candidate/tests">
        <Button variant="secondary" className="rounded-[6px] w-full">
          Back to Tests
        </Button>
      </Link>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="flex justify-between w-full gap-4 min-w-0">
        <span className="text-sm text-[#667085] shrink-0">{label}</span>
        <span className="text-sm text-[#344054] text-right">{value}</span>
      </div>
    </div>
  );
}