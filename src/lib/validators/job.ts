import { z } from "zod";

export const jobPostingSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  requirements: z.string().min(1),
  responsibilities: z.string().min(1),
  benefits: z.array(z.string()),
  employment_type: z.enum(["full_time", "part_time", "contract"]),
  work_mode: z.enum(["remote", "hybrid", "office"]),
  type: z.enum(["permanent", "temporary", "contract"]),
  positions_available: z.number().min(1),
  experience_level: z.string(),
  min_years_experience: z.number(),
  salary_min: z.number().optional(),
  salary_max: z.number().optional(),
  salary_currency: z.string().optional(),
  hide_salary: z.boolean().optional(),
  location: z.string(),
  remote_regions: z.array(z.string()).optional(),
  deadline: z.string(),
  is_featured: z.boolean(),
  is_published: z.boolean(),
});

export type JobPostingSchemaType = z.infer<typeof jobPostingSchema>;
