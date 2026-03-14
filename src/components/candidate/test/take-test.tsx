import { AntiCheatProvider } from "@/components/candidate/test/AntiCheatProvider";
import { QuestionPalette } from "@/components/candidate/test/QuestionPalette";
import { Timer } from "@/components/candidate/test/Timer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useStartTest, useSubmitTest } from "@/hooks/use-candidate-tests";
import type { TestAnswer, TestQuestion, TestTakingData } from "@/types/test";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  AlertTriangle,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

// ─── Session storage key (scoped per assignment) ──────────────────────────────
const sessionKey = (id: number) => `test_answers_${id}`;

// ─── Question renderer ────────────────────────────────────────────────────────

function QuestionView({
  question,
  index,
  total,
  answer,
  onAnswer,
}: {
  question: TestQuestion;
  index: number;
  total: number;
  answer: string | string[];
  onAnswer: (value: string | string[]) => void;
}) {
  const isMultiple = question.question_type === "multiple_choice";

  // Toggle an option for multiple_choice
  const toggleMultiple = (optId: string) => {
    const current = Array.isArray(answer) ? answer : [];
    const next = current.includes(optId)
      ? current.filter((v) => v !== optId)
      : [...current, optId];
    onAnswer(next);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="outline"
            className="rounded-[4px] text-xs text-[#475467]">
            Question {index + 1} of {total}
          </Badge>
          <Badge
            variant="outline"
            className="rounded-[4px] text-xs text-[#475467]">
            {question.points} pt{question.points !== 1 ? "s" : ""}
          </Badge>
          <Badge
            variant="outline"
            className="rounded-[4px] text-xs text-[#475467] capitalize">
            {question.question_type.replace("_", " ")}
          </Badge>
        </div>
        <p className="text-base font-medium text-[#1B1B1C] leading-relaxed">
          {question.question_text}
        </p>
        {isMultiple && (
          <p className="text-xs text-[#667085]">Select all that apply.</p>
        )}
      </div>

      {/* Single choice / True-False / Multiple choice */}
      {question.question_type !== "short_answer" &&
        question.options.length > 0 && (
          <div className="space-y-3">
            {question.options.map((opt) => {
              const optId = String(opt.id);
              const selected = isMultiple
                ? Array.isArray(answer) && answer.includes(optId)
                : answer === optId;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    isMultiple ? toggleMultiple(optId) : onAnswer(optId)
                  }
                  className={`w-full text-left px-4 py-3 rounded-[8px] border text-sm transition-all ${
                    selected
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-[#D0D5DD] text-[#344054] hover:border-primary/40 hover:bg-[#F9FAFB]"
                  }`}>
                  <span className="flex items-center gap-3">
                    {/* Checkbox for multiple, radio for single */}
                    <span
                      className={`shrink-0 flex items-center justify-center border-2 ${
                        isMultiple
                          ? "size-4 rounded-[3px]"
                          : "size-5 rounded-full"
                      } ${selected ? "border-primary" : "border-[#D0D5DD]"}`}>
                      {selected &&
                        (isMultiple ? (
                          <span className="size-2 rounded-sm bg-primary" />
                        ) : (
                          <span className="size-2.5 rounded-full bg-primary" />
                        ))}
                    </span>
                    {opt.option_text}
                  </span>
                </button>
              );
            })}
          </div>
        )}

      {/* Short answer */}
      {question.question_type === "short_answer" && (
        <Textarea
          value={typeof answer === "string" ? answer : ""}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={4}
          className="resize-none text-sm"
        />
      )}
    </div>
  );
}

// ─── Main TakeTest component ──────────────────────────────────────────────────

interface TakeTestProps {
  assignmentId: number;
  testTitle: string;
  durationMinutes: number;
  jobTitle?: string;
  companyName?: string;
}

export default function TakeTest({
  assignmentId,
  testTitle,
  durationMinutes,
  jobTitle,
  companyName,
}: TakeTestProps) {
  const navigate = useNavigate();

  // ── Phase management ────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<"intro" | "active" | "submitting">(
    "intro",
  );

  // ── Session data from API ───────────────────────────────────────────────────
  const [sessionData, setSessionData] = useState<
    (TestTakingData & { session_id: string }) | null
  >(null);

  // ── Timer (seconds countdown) ───────────────────────────────────────────────
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Navigation & answers ────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  // ── Dialogs ─────────────────────────────────────────────────────────────────
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  // ── Mutations ───────────────────────────────────────────────────────────────
  const startMutation = useStartTest(assignmentId);
  const submitMutation = useSubmitTest(assignmentId);

  const questions: TestQuestion[] = sessionData?.questions ?? [];
  const totalSeconds = durationMinutes * 60;

  // ── Restore answers from sessionStorage on mount ────────────────────────────
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(sessionKey(assignmentId));
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    } catch {
      // corrupted storage — ignore
    }
  }, [assignmentId]);

  // ── Auto-save answers to sessionStorage ─────────────────────────────────────
  // Security note: this only saves locally for crash recovery.
  // The actual submitted payload goes to the server — client state is cosmetic.
  useEffect(() => {
    if (phase !== "active") return;
    try {
      sessionStorage.setItem(sessionKey(assignmentId), JSON.stringify(answers));
    } catch {
      // quota exceeded — not critical
    }
  }, [answers, phase, assignmentId]);

  // ── Countdown timer ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "active" || secondsLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auto-submit on timer expire ─────────────────────────────────────────────
  useEffect(() => {
    if (phase === "active" && secondsLeft === 0 && sessionData) {
      toast.warning("Time's up! Your test is being submitted automatically.");
      handleSubmit(true);
    }
  }, [secondsLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Start test ──────────────────────────────────────────────────────────────
  const handleStart = async () => {
    try {
      const res = await startMutation.mutateAsync();
      setSessionData(res.data);
      setSecondsLeft(res.data.time_remaining);
      setPhase("active");

      // Enter fullscreen
      document.documentElement.requestFullscreen?.().catch(() => {});
    } catch {
      // error toast handled in hook
    }
  };

  // ── Answer management ───────────────────────────────────────────────────────
  const setAnswer = (questionId: number, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (forced = false) => {
      if (!forced) setConfirmSubmit(false);
      setPhase("submitting");
      clearInterval(timerRef.current!);

      const payload: TestAnswer[] = questions.map((q) => ({
        question_id: q.id,
        answer: answers[q.id] ?? "",
      }));

      try {
        const res = await submitMutation.mutateAsync(payload);
        // Clear saved answers after successful submit
        sessionStorage.removeItem(sessionKey(assignmentId));

        // Exit fullscreen
        if (document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        }

        const result = res.data;
        toast.success(
          result.passed
            ? `Submitted! You scored ${result.score}% — Passed 🎉`
            : `Submitted. You scored ${result.score}%. Passing score was ${result.score}%.`,
        );
        navigate(`/candidate/tests/${assignmentId}/result`);
      } catch {
        setPhase("active");
        // Restart timer from where it left off
        timerRef.current = setInterval(() => {
          setSecondsLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    },
    [answers, questions, assignmentId, submitMutation, navigate],
  );

  // ── Anti-cheat violation handler ───────────────────────────────────────────
  // Security: auto-submit on max violations to prevent the candidate from
  // freely switching context without consequence.
  const handleViolation = useCallback(() => {
    if (phase === "active") {
      handleSubmit(true);
    }
  }, [phase, handleSubmit]);

  const answeredCount = Object.keys(answers).length;
  const answeredSet = new Set(
    questions
      .map((q, i) =>
        answers[q.id] !== undefined &&
        answers[q.id] !== "" &&
        !(
          Array.isArray(answers[q.id]) &&
          (answers[q.id] as string[]).length === 0
        )
          ? i
          : -1,
      )
      .filter((i) => i !== -1),
  );
  const progress =
    questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
  const currentQuestion = questions[currentIndex];

  // ── Intro screen ────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="max-w-xl mx-auto space-y-6 py-10">
        <div className="border rounded-[12px] p-8 space-y-5 text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[#1B1B1C]">
              {testTitle}
            </h2>

            {/* Job context — shows where this test came from */}
            {jobTitle && companyName && (
              <div className="inline-flex items-center gap-1.5 bg-[#F2F4F7] rounded-[6px] px-3 py-1.5 text-sm text-[#344054]">
                <Briefcase size={13} className="text-[#667085]" />
                <span>
                  Required for <span className="font-medium">{jobTitle}</span>{" "}
                  at <span className="font-medium">{companyName}</span>
                </span>
              </div>
            )}

            <p className="text-sm text-[#475467]">
              You have{" "}
              <span className="font-medium text-[#1B1B1C]">
                {durationMinutes} minutes
              </span>{" "}
              to complete this assessment.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-[8px] p-4 text-left space-y-1.5">
            <p className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
              <AlertTriangle size={13} /> Before you begin
            </p>
            <ul className="text-xs text-amber-700 space-y-1 list-disc pl-4">
              <li>The timer starts the moment you click "Start Test".</li>
              <li>Switching tabs or windows will count as a violation.</li>
              <li>After 3 violations your test will be auto-submitted.</li>
              <li>The test will run in fullscreen — do not exit.</li>
              <li>Right-click and copy/paste are disabled.</li>
              <li>Unanswered questions are submitted blank on time expiry.</li>
            </ul>
          </div>

          <Button
            className="rounded-[6px] px-8 w-full"
            onClick={handleStart}
            disabled={startMutation.isPending}>
            {startMutation.isPending && (
              <Loader2 className="animate-spin mr-2" size={16} />
            )}
            Start Test
          </Button>
        </div>
      </div>
    );
  }

  // ── Active test ─────────────────────────────────────────────────────────────
  return (
    <AntiCheatProvider onViolation={handleViolation}>
      {/* Confirm submit dialog */}
      <AlertDialog open={confirmSubmit} onOpenChange={setConfirmSubmit}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {answeredCount} of {questions.length} questions.{" "}
              {answeredCount < questions.length && (
                <span className="text-amber-600 font-medium">
                  {questions.length - answeredCount} unanswered.{" "}
                </span>
              )}
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-[6px]"
              disabled={phase === "submitting"}>
              Go Back
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-[6px]"
              onClick={() => handleSubmit(false)}
              disabled={phase === "submitting"}>
              {phase === "submitting" && (
                <Loader2 className="animate-spin mr-2" size={14} />
              )}
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-6xl mx-auto space-y-4 py-6">
        {/* ── Top bar ───────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 border rounded-[10px] px-5 py-3 bg-white">
          <div className="min-w-0">
            <h1 className="text-base font-semibold text-[#1B1B1C] truncate">
              {testTitle}
            </h1>
            <p className="text-xs text-[#475467]">
              {answeredCount}/{questions.length} answered
            </p>
          </div>
          <Timer seconds={secondsLeft} totalSeconds={totalSeconds} />
        </div>

        {/* ── Progress bar ──────────────────────────────────────────────────── */}
        <Progress value={progress} className="h-1.5" />

        {/* ── Main area: question + palette ────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_220px] gap-4 items-start">
          {/* Question card */}
          <div className="border rounded-[12px] p-6 min-h-[340px] bg-white">
            {currentQuestion ? (
              <QuestionView
                question={currentQuestion}
                index={currentIndex}
                total={questions.length}
                answer={answers[currentQuestion.id] ?? ""}
                onAnswer={(val) => setAnswer(currentQuestion.id, val)}
              />
            ) : (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin" />
              </div>
            )}
          </div>

          {/* Question palette sidebar */}
          <QuestionPalette
            totalQuestions={questions.length}
            currentQuestion={currentIndex}
            answeredQuestions={answeredSet}
            onQuestionSelect={setCurrentIndex}
          />
        </div>

        {/* ── Navigation ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            className="rounded-[6px]"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0 || phase === "submitting"}>
            <ChevronLeft size={16} className="mr-1" /> Previous
          </Button>

          {currentIndex < questions.length - 1 ? (
            <Button
              variant="outline"
              className="rounded-[6px]"
              onClick={() =>
                setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
              }
              disabled={phase === "submitting"}>
              Next <ChevronRight size={16} className="ml-1" />
            </Button>
          ) : (
            <Button
              className="rounded-[6px] px-6"
              onClick={() => setConfirmSubmit(true)}
              disabled={phase === "submitting" || submitMutation.isPending}>
              {phase === "submitting" && (
                <Loader2 className="animate-spin mr-2" size={16} />
              )}
              Submit Test
            </Button>
          )}
        </div>
      </div>
    </AntiCheatProvider>
  );
}