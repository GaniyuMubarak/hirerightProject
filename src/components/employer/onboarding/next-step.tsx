import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../../ui/button";

export default function NextStep({
  step,
  setStep,
}: {
  step: number;
  setStep: (n: number) => void;
}) {
  const navigate = useNavigate();
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
          if (step === 3) {
            navigate("/employer/dashboard");
            return;
          }
          setStep(step + 1);
        }}
        variant={step === 3 ? "default" : "outline"}
        className="h-9 rounded-[8px] text-sm"
      >
        {step === 2 ? "Proceed" : "Next"} <ArrowRight size={3} />
      </Button>
    </div>
  );
}
