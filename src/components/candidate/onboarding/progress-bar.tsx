import { useEffect, useState } from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  // Calculate progress percentage
  useEffect(() => {
    const calculatedProgress = (currentStep / totalSteps) * 100;
    setProgress(calculatedProgress);
  }, [currentStep, totalSteps]);

  return (
    <div className="flex flex-col gap-2 max-w-xs mx-auto space-y-1.5 text-xs font-medium">
      <span>Setup progress</span>
      <div className="flex gap-2 items-center w-full">
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
}