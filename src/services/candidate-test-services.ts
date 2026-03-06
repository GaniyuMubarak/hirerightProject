import requests from "./https-services";
import type {
  AssignedTestsResponse,
  StartTestResponse,
  SubmitTestPayload,
  SubmitTestResponse,
  TestResultResponse,
} from "@/types/test";

const CandidateTestServices = {
  /**
   * GET /candidates/tests
   * Returns pending (assigned, not yet taken) and completed tests.
   */
  getAssignedTests: async (): Promise<AssignedTestsResponse> => {
    return requests.get(`/candidates/tests`);
  },

  /**
   * POST /candidates/tests/:assignmentId/start
   * Starts the test session.
   * Returns session_id, time_remaining (seconds), and questions.
   */
  startTest: async (assignmentId: number): Promise<StartTestResponse> => {
    return requests.post(`/candidates/tests/${assignmentId}/start`, {});
  },

  /**
   * POST /candidates/tests/:assignmentId/submit
   * Submits answers. Returns the result immediately.
   *
   * Payload: { session_id?, answers: [{ question_id: number, answer: string | string[] }] }
   */
  submitTest: async (
    assignmentId: number,
    payload: SubmitTestPayload,
  ): Promise<SubmitTestResponse> => {
    return requests.post(`/candidates/tests/${assignmentId}/submit`, payload);
  },

  /**
   * GET /candidates/tests/:assignmentId/result
   * Fetches the result of a previously completed test.
   */
  getTestResult: async (assignmentId: number): Promise<TestResultResponse> => {
    return requests.get(`/candidates/tests/${assignmentId}/result`);
  },
};

export default CandidateTestServices;