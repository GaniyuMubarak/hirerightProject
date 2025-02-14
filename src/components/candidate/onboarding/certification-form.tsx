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

export default function CertificationForm() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certifications",
  });

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">
          Certifications
        </h2>
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
                name={`certifications.${index}.name`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <div className="flex justify-between items-end">
                      <FormLabel>Certificate Name</FormLabel>
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
                      <Input placeholder="AWS Certified Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`certifications.${index}.organization`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Issuing Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="Amazon Web Services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`certifications.${index}.issue_date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`certifications.${index}.expiration_date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                name: "",
                organization: "",
                issue_date: "",
                expiration_date: "",
                has_expiry: true,
                is_expired: false,
              })
            }
          >
            <CirclePlus className="min-w-6 min-h-6" /> Add Certification
          </Button>
        </div>
      </div>
    </div>
  );
}
