import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CirclePlus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

export default function ExperienceForm() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">Experience</h2>
      </header>

      <div className="w-full pt-2 space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              "relative ",
              fields?.length > 1 && "border rounded-lg p-4 "
            )}
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`experience.${index}.company_name`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <div className="flex justify-between items-end">
                      <FormLabel>Company Name</FormLabel>
                      {fields?.length > 1 && (
                        <div className="absolute -top-3 -right-3">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.start_date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.end_date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        disabled={form.watch(`experience.${index}.is_current`)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.job_title`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.description`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Job description"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6">
          <Button
            type="button"
            variant="ghost"
            className="font-semibold"
            onClick={() =>
              append({
                company_name: "",
                start_date: "",
                end_date: "",
                job_title: "",
                description: "",
                is_current: false,
              })
            }
          >
            <CirclePlus className="min-w-6 min-h-6" /> Add Experience
          </Button>
        </div>
      </div>
    </div>
  );
}
