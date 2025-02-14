import { jobPostingSchema, JobPostingSchemaType } from "@/lib/validators/job";
import JobServices from "@/services/job-services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useJobForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<JobPostingSchemaType>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      employment_type: "full_time",
      work_mode: "remote",
      type: "permanent",
      hide_salary: false,
      is_featured: false,
      is_published: true,
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const payload = {
        ...data,
        benefits: data.benefits?.join(","),
      };
      await JobServices.createJob(payload);
      toast.success("Job created successfully");
      navigate("/employer/jobs");
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

export default useJobForm;
