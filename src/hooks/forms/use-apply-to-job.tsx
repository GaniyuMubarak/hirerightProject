// import CandidateServices from "@/services/candidate-services";
// import { useDialog } from "@/stores/dialog";
// import { useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// const defaultValues = {
//   cover_letter: "",
//   answers: [] as { answer: string }[],
// };

// const useApplyToJob = () => {
//   const [loading, setLoading] = useState(false);
//   const { close, payload } = useDialog<any>("apply-dialog");
//   const queryClient = useQueryClient();

//   const form = useForm({ defaultValues });

//   useEffect(() => {
//     if (payload?.questions) {
//       form.reset({
//         cover_letter: "",
//         answers: payload.questions.map(() => ({ answer: "" })),
//       });
//     }
//   }, [payload]);

//   const handleClose = () => {
//     close();
//     form.reset(defaultValues);
//   };

//   const onSubmit = async (data: any) => {
//     setLoading(true);
//     try {
//       const res = await CandidateServices.applyJob(payload?.id, data);
//       toast.success(res?.message || "Application submitted successfully");
//       queryClient.invalidateQueries({ queryKey: ["dashboard"] });
//       handleClose();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { form, onSubmit, loading, handleClose };
// };

// export default useApplyToJob;





import CandidateServices from "@/services/candidate-services";
import { useDialog } from "@/stores/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";

const defaultValues = {
  cover_letter: "",
  answers: [] as { answer: string }[],
};

// ✅ Fix #8: whitelist safe backend messages instead of surfacing raw API text.
// Only show backend message for known safe status codes (400, 409, 422).
// Everything else falls back to a generic user-friendly message.
// function getApplyErrorMessage(err: any): string {
//   const status = err?.response?.status;
//   const backendMessage = err?.response?.data?.message;

//   const safeStatuses = [400, 409, 422];

//   if (status && safeStatuses.includes(status) && backendMessage) {
//     return backendMessage;
//   }

//   // Known cases
//   if (status === 401) return "Please sign in to apply for this job.";
//   if (status === 403) return "You are not eligible to apply for this job.";
//   if (status === 429)
//     return "Too many requests. Please wait a moment and try again.";

//   return "Failed to submit application. Please try again.";
// }

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
      // toast.error(getApplyErrorMessage(err));
      toast.error(getApiErrorMessage(err, "Failed to submit application. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading, handleClose };
};

export default useApplyToJob;