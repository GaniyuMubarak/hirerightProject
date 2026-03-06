// ─── Core Assignment & Test Types ────────────────────────────────────────────

/**
 * How the test reached the candidate:
 *  - "job_posting"  → test was attached to the job during posting;
 *                     auto-available once candidate is shortlisted
 *  - "manual"       → employer manually assigned via POST /employers/tests/:id/assign
 */
export type TestSource = "job_posting" | "manual";

export interface TestAssignment {
  id: number;
  test_id: number;
  test: {
    id: number;
    title: string;
    description: string;
    duration_minutes: number;
    passing_score: number;
    total_questions: number;
  };
  job_application: {
    id: number;
    status: "pending" | "shortlisted" | "interview" | "hired" | "rejected";
    job: {
      id: number;
      title: string;
      company: {
        name: string;
        logo_url?: string;
      };
    };
  };
  /** Tells the UI (and backend) where this test came from */
  source: TestSource;
  assigned_at: string;
  deadline: string;
  status: "pending" | "in_progress" | "completed" | "expired";
  score?: number;
  passed?: boolean;
  completed_at?: string;
  feedback?: string;
}

// ─── Question Types ───────────────────────────────────────────────────────────

export type QuestionType =
  | "single_choice"
  | "multiple_choice"
  | "true_false"
  | "short_answer";

export interface TestQuestion {
  id: number;
  question_text: string;
  question_type: QuestionType;
  points: number;
  options: Array<{
    id: number;
    option_text: string;
  }>;
}

// ─── Active Test Session ──────────────────────────────────────────────────────

export interface TestTakingData {
  assignment_id: number;
  test: {
    id: number;
    title: string;
    description: string;
    duration_minutes: number;
    passing_score: number;
    total_questions: number;
  };
  job_application: {
    id: number;
    job: {
      id: number;
      title: string;
      company: {
        name: string;
      };
    };
  };
  time_remaining: number; // seconds remaining
  questions: TestQuestion[];
  answers: Record<number, any>;
}

// ─── Submission ───────────────────────────────────────────────────────────────

export interface TestAnswer {
  question_id: number;
  answer: string | string[]; // string[] for multiple_choice
}

export interface SubmitTestPayload {
  session_id?: string;
  answers: TestAnswer[];
}

// ─── Result ───────────────────────────────────────────────────────────────────

export interface TestResult {
  score: number;
  passed: boolean;
  total_questions: number;
  correct_answers: number;
  time_taken_minutes: number;
  completed_at: string;
  feedback: string;
  job: {
    id: number;
    title: string;
    company_name: string;
  };
  question_feedback?: Array<{
    question_id: number;
    correct: boolean;
    points_earned: number;
    feedback?: string;
  }>;
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

export interface AssignedTestsResponse {
  status: string;
  data: {
    /**
     * Includes BOTH:
     *  1. Tests attached to jobs the candidate applied to (source: "job_posting")
     *     — only visible once application status is "shortlisted" or above
     *  2. Tests manually assigned by the employer (source: "manual")
     */
    pending: TestAssignment[];
    completed: TestAssignment[];
  };
}

export interface StartTestResponse {
  status: string;
  data: TestTakingData & { session_id: string };
}

export interface SubmitTestResponse {
  status: string;
  message: string;
  data: TestResult;
}

export interface TestResultResponse {
  status: string;
  data: TestResult;
}