import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TestAssignment } from "@/types/test";
import { formatDistance } from "date-fns";
import {
  AlertCircle,
  Briefcase,
  Building2,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  XCircle,
} from "lucide-react";
import { Link } from "react-router";

interface TestCardProps {
  assignment: TestAssignment;
  type: "pending" | "completed";
}

export function TestCard({ assignment, type }: TestCardProps) {
  const isDeadlinePassed = new Date(assignment.deadline) < new Date();
  const isExpired =
    assignment.status === "expired" || (type === "pending" && isDeadlinePassed);

  const jobTitle = assignment.job_application?.job?.title;
  const companyName = assignment.job_application?.job?.company?.name;

  const getStatusBadge = () => {
    if (isExpired || assignment.status === "expired") {
      return <Badge variant="destructive">Expired</Badge>;
    }
    if (assignment.status === "completed") {
      return assignment.passed ? (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          Passed
        </Badge>
      ) : (
        <Badge variant="destructive">Failed</Badge>
      );
    }
    if (assignment.status === "in_progress") {
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
          In Progress
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
        Pending
      </Badge>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0">
            <CardTitle className="text-base leading-snug">
              {assignment.test.title}
            </CardTitle>

            {/* ── Job context — the most important piece of info ── */}
            <div className="space-y-0.5">
              <CardDescription className="flex items-center gap-1 text-[#344054] font-medium">
                <Briefcase className="h-3 w-3 shrink-0" />
                <span className="truncate">{jobTitle ?? "Role"}</span>
              </CardDescription>
              <CardDescription className="flex items-center gap-1">
                <Building2 className="h-3 w-3 shrink-0" />
                <span className="truncate">{companyName ?? "Company"}</span>
              </CardDescription>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Source label */}
        {assignment.source === "job_posting" && (
          <p className="text-[10px] text-[#667085] mt-1">
            Required for your application to{" "}
            <span className="font-medium text-[#344054]">{jobTitle}</span>
          </p>
        )}
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="h-4 w-4 shrink-0" />
            <span>{assignment.test.total_questions} Questions</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{assignment.test.duration_minutes} minutes</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-medium">Passing Score:</span>
            <span>{assignment.test.passing_score}%</span>
          </div>

          {type === "pending" && !isExpired && (
            <div className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                Due{" "}
                {formatDistance(new Date(assignment.deadline), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          )}

          {type === "completed" && assignment.score !== undefined && (
            <div className="flex items-center gap-2">
              {assignment.passed ? (
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600 shrink-0" />
              )}
              <span className="font-medium">Score: {assignment.score}%</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        {type === "pending" ? (
          <Link
            to={isExpired ? "#" : `/candidate/tests/${assignment.id}`}
            className="w-full"
            tabIndex={isExpired ? -1 : 0}>
            <Button className="w-full" disabled={isExpired}>
              {assignment.status === "in_progress"
                ? "Continue Test"
                : "Start Test"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <Link
            to={`/candidate/tests/${assignment.id}/result`}
            className="w-full">
            <Button variant="outline" className="w-full">
              View Results
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}