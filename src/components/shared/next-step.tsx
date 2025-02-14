import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

interface NextStepProps {
  step: number;
  setStep: (n: number) => void;
  totalSteps?: number;
}

const NextStep = memo(function NextStep({
  step,
  setStep,
  totalSteps = 3,
}: NextStepProps) {
  const form = useFormContext();

  const handleNext = async () => {
    if (step === totalSteps) return;

    // const isValid = await form.trigger();
    // if (isValid) {
    setStep(step + 1);
    // }
  };

  const handlePrevious = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  return (
    <div className="border-t flex justify-between items-center p-4 bg-white">
      <Button
        onClick={handlePrevious}
        disabled={step === 0}
        variant="outline"
        className="h-10 px-4 rounded-[8px] text-sm"
        type="button"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <Button
        className={cn("h-10 px-4 rounded-[8px] text-sm", {
          hidden: step !== totalSteps,
        })}
        disabled={step < totalSteps || form.formState.isSubmitting}
      >
        Proceed
        <ArrowRight className="w-4 h-4 ml-2" />
        {form.formState.isSubmitting && (
          <Loader className="animate-spin ml-2" />
        )}
      </Button>
      <Button
        variant={"outline"}
        onClick={handleNext}
        className={cn("h-10 px-4 rounded-[8px] text-sm", {
          hidden: step === totalSteps,
        })}
        type={"button"}
        disabled={form.formState.isSubmitting}
      >
        Next
        <ArrowRight className="w-4 h-4 ml-2" />
        {form.formState.isSubmitting && (
          <Loader className="animate-spin ml-2" />
        )}
      </Button>
    </div>
  );
});

export default NextStep;
