import CandidateTestServices from "@/services/candidate-test-services";
import type { SubmitTestPayload, TestAnswer } from "@/types/test";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const testQueryKeys = {
  all: ["candidate-tests"] as const,
  lists: () => [...testQueryKeys.all, "list"] as const,
  result: (assignmentId: number) =>
    [...testQueryKeys.all, "result", assignmentId] as const,
};

// ─── Fetch pending + completed tests ─────────────────────────────────────────

export function useAssignedTests() {
  return useQuery({
    queryKey: testQueryKeys.lists(),
    queryFn: () => CandidateTestServices.getAssignedTests(),
    select: (res) => res?.data,
  });
}

// ─── Fetch result for a completed test ───────────────────────────────────────

export function useTestResult(assignmentId: number) {
  return useQuery({
    queryKey: testQueryKeys.result(assignmentId),
    queryFn: () => CandidateTestServices.getTestResult(assignmentId),
    select: (res) => res?.data,
    enabled: !!assignmentId,
  });
}

// ─── Start a test session ─────────────────────────────────────────────────────

export function useStartTest(assignmentId: number) {
  return useMutation({
    mutationFn: () => CandidateTestServices.startTest(assignmentId),
    onError: () => {
      toast.error("Failed to start test. Please try again.");
    },
  });
}

// ─── Submit test answers ──────────────────────────────────────────────────────

export function useSubmitTest(assignmentId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answers: TestAnswer[]) => {
      const payload: SubmitTestPayload = { answers };
      return CandidateTestServices.submitTest(assignmentId, payload);
    },
    onSuccess: () => {
      // Invalidate test list so pending/completed counts update
      queryClient.invalidateQueries({ queryKey: testQueryKeys.lists() });
    },
    onError: () => {
      toast.error("Failed to submit test. Please try again.");
    },
  });
}