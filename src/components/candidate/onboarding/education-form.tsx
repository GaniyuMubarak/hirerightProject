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

export default function EducationForm() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">Education</h2>
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
            <div className="grid grid-cols-2 gap-4 ">
              <FormField
                control={form.control}
                name={`education.${index}.institution`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <div className="flex justify-between items-end">
                      <FormLabel>Name of Institution</FormLabel>
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
                      <Input placeholder="University of Lagos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.start_date`}
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
                name={`education.${index}.end_date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.field_of_study`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Course of study</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} />
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
                institution: "",
                start_date: "",
                end_date: "",
                field_of_study: "",
              })
            }
          >
            <CirclePlus className="min-w-6 min-h-6" /> Add Education
          </Button>
        </div>
      </div>
    </div>
  );
}
