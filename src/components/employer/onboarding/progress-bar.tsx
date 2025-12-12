import { useEffect, useState } from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
  showPercentage?: boolean;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  stepTitles = [],
  showPercentage = true,
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  // Calculate progress percentage
  useEffect(() => {
    const calculatedProgress = (currentStep / totalSteps) * 100;
    setProgress(calculatedProgress);
  }, [currentStep, totalSteps]);

  // Get current step title
  const currentStepTitle = stepTitles[currentStep - 1] || `Step ${currentStep}`;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Step indicators */}
      <div className="flex justify-between items-center mb-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-primary text-white border-2 border-primary"
                    : "bg-gray-200 text-gray-500 border-2 border-gray-300"
                }`}>
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`text-xs font-medium ${
                  isCurrent ? "text-primary" : "text-gray-500"
                }`}>
                {stepTitles[index] || `Step ${stepNumber}`}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            {currentStepTitle}
          </span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}%
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step counter */}
      <div className="text-center text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}