// import { z } from "zod";

// // Add hiring stage schema
// const hiringStageSchema = z.object({
//   id: z.string(),
//   name: z.string().min(1, "Stage name is required"),
//   description: z.string().optional(),
//   order: z.number().min(1),
//   tests: z.array(z.number()).default([]),
// });

// // Update the jobPostingSchema
// export const jobPostingSchema = z.object({
//   title: z.string().min(1, "Job title is required"),
//   description: z.string().min(1, "Job description is required"),
//   requirements: z.string().optional(),
//   responsibilities: z.string().optional(),
//   employment_type: z.enum(["full_time", "part_time", "contract", "internship"]),
//   work_mode: z.enum(["remote", "onsite", "hybrid"]),
//   type: z.enum(["permanent", "temporary"]),
//   hide_salary: z.boolean().default(false),
//   is_featured: z.boolean().default(false),
//   is_published: z.boolean().default(true),
//   salary_min: z.number().optional(),
//   salary_max: z.number().optional(),
//   salary_currency: z.string().optional(),
//   salary_type: z.enum(["hourly", "monthly", "yearly"]).optional(),
//   location: z.string().optional(),
//   city: z.string().optional(),
//   state: z.string().optional(),
//   country: z.string().optional(),
//   benefits: z.array(z.string()).optional(),
//   application_deadline: z.string().optional(),
//   // vacancy: z.number().optional(),
//   positions_available: z.number().min(1),
//   min_years_experience: z.number(),
//   experience_level: z.string(),
//   remote_regions: z.array(z.string()).optional(),
//   deadline: z.string().optional(),
//   hiring_stages: z.array(hiringStageSchema).optional(),
// });

// export type JobPostingSchemaType = z.infer<typeof jobPostingSchema>;



import { z } from "zod";
// // Add hiring stage schema
const hiringStageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Stage name is required"),
  description: z.string().optional(),
  order: z.number().min(1),
  tests: z.array(z.number()).default([]),
});


export const jobPostingSchema = z.object({
  // Required fields (from validation errors)
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  employment_type: z.enum(["full_time", "part_time", "contract", "internship"]),
  work_mode: z.enum(["remote", "onsite", "hybrid"]),
  experience_level: z.string().min(1, "Experience level is required"),
  min_years_experience: z
    .number()
    .min(0, "Minimum years experience is required"),
  positions_available: z.number().min(1, "Positions available is required"),

  // Boolean fields with defaults
  hide_salary: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),

  // Optional fields
  salary_min: z.number().optional(),
  salary_max: z.number().optional(),
  salary_currency: z.string().optional(),
  salary_type: z.string().optional(),
  location: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  application_deadline: z.string().optional(),
  remote_regions: z.array(z.string()).optional(),
  deadline: z.string().optional(),
  type: z.string().optional(),

    hiring_stages: z.array(hiringStageSchema).optional(),
});

export type JobPostingSchemaType = z.infer<typeof jobPostingSchema>;