import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";

export default function NextStep({
  step,
  setStep,
}: {
  step: number;
  setStep: (n: number) => void;
}) {
  return (
    <div className="border-t flex justify-between items-center py-2">
      <Button
        onClick={() => {
          if (step === 0) return;
          setStep(step - 1);
        }}
        disabled={step === 0}
        variant={"outline"}
        className="h-9 rounded-[8px] text-sm"
      >
        <ArrowLeft size={3} />
        Previous
      </Button>
      <Button
        onClick={() => {
          if (step === 2) return;
          setStep(step + 1);
        }}
        disabled={step === 2}
        variant={"outline"}
        className="h-9 rounded-[8px] text-sm"
      >
        Next <ArrowRight size={3} />
      </Button>
    </div>
  );
}
