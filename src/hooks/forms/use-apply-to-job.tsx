import CandidateServices from "@/services/candidate-services";
import { useDialog } from "@/stores/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  cover_letter: "",
  answers: [] as { answer: string }[],
};

const useApplyToJob = () => {
  const [loading, setLoading] = useState(false);
  const { close, payload } = useDialog<any>("apply-dialog");
  const queryClient = useQueryClient();

  const form = useForm({ defaultValues });

  useEffect(() => {
    if (payload?.questions) {
      form.reset({
        cover_letter: "",
        answers: payload.questions.map(() => ({ answer: "" })),
      });
    }
  }, [payload]);

  const handleClose = () => {
    close();
    form.reset(defaultValues);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await CandidateServices.applyJob(payload?.id, data);
      toast.success(res?.message || "Application submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      handleClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading, handleClose };
};

export default useApplyToJob;