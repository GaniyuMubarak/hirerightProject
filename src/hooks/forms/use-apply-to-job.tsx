import CandidateServices from "@/services/candidate-services";
import { useDialog } from "@/stores/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  cover_letter: "",
  answers: [],
};

const useApplyToJob = () => {
  const [loading, setLoading] = useState(false);
  const { close, payload } = useDialog<any>("apply-dialog");
  const queryclient = useQueryClient();

  const form = useForm({
    defaultValues,
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const res = await CandidateServices.applyJob(payload?.id, data);
      toast.success(res?.message || "Application submitted successfully");
      queryclient.invalidateQueries({ queryKey: ["dashboard"] });
      close();
      form.reset(defaultValues);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    loading,
  };
};

export default useApplyToJob;
