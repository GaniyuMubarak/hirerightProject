import SelectTestTypeForm from "@/components/employer/test/select-test-type-form";
import TestTypeForm from "@/components/employer/test/test-type-form";
import { useState } from "react";

export default function EmployerCreatText() {
  const [step, setStep] = useState(0);
  return (
    <div className="max-w-5xl mx-auto pt-6 space-y-8">
      {step === 0 && <SelectTestTypeForm step={step} setStep={setStep} />}
      {step === 1 && <TestTypeForm step={step} setStep={setStep} />}
    </div>
  );
}
