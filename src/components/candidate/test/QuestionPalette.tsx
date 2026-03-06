import { cn } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";

interface QuestionPaletteProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  onQuestionSelect: (index: number) => void;
}

export function QuestionPalette({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionSelect,
}: QuestionPaletteProps) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="font-medium text-gray-900 mb-3">Questions</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const questionNumber = index + 1;
          const isAnswered = answeredQuestions.has(index);
          const isCurrent = currentQuestion === index;

          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={cn(
                "relative p-2 text-sm font-medium rounded-md transition-all",
                "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brandOrange",
                isCurrent && "ring-2 ring-brandOrange bg-orange-50",
                isAnswered ? "text-green-700" : "text-gray-700",
              )}>
              <span>{questionNumber}</span>
              {isAnswered ? (
                <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-600" />
              ) : (
                <Circle className="absolute -top-1 -right-1 h-3 w-3 text-gray-400" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t text-xs space-y-1">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-3 w-3 text-green-600" />
          <span className="text-gray-600">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="h-3 w-3 text-gray-400" />
          <span className="text-gray-600">Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full ring-2 ring-brandOrange bg-orange-50" />
          <span className="text-gray-600">Current</span>
        </div>
      </div>
    </div>
  );
}
