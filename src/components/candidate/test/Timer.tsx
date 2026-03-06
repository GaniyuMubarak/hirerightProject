import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface TimerProps {
  seconds: number;
  totalSeconds: number;
  onExpire?: () => void;
  className?: string;
}

export function Timer({
  seconds,
  totalSeconds,
  onExpire,
  className,
}: TimerProps) {
  const [isWarning, setIsWarning] = useState(false);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (seconds <= 300 && !isWarning) {
      setIsWarning(true);
    }
    if (seconds === 0 && onExpire) {
      onExpire();
    }
  }, [seconds, onExpire, isWarning]);

  const getColor = () => {
    if (seconds > 300) return "text-green-600";
    if (seconds > 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-1000", getColor())}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("text-sm font-bold", getColor())}>
            {minutes}:{secs.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {isWarning && (
        <div className="flex items-center gap-2 text-red-600 animate-pulse">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Less than 5 min!</span>
        </div>
      )}
    </div>
  );
}
