import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

const benefits = [
  { label: "Health Insurance", value: "health_insurance" },
  { label: "Dental Coverage", value: "dental_coverage" },
  { label: "Vision Coverage", value: "vision_coverage" },
  { label: "401(k) Plan", value: "401k" },
  { label: "Paid Time Off", value: "pto" },
  { label: "Remote Work", value: "remote_work" },
  { label: "Flexible Hours", value: "flexible_hours" },
  { label: "Professional Development", value: "professional_development" },
  { label: "Gym Membership", value: "gym_membership" },
  { label: "Stock Options", value: "stock_options" },
  { label: "Performance Bonus", value: "performance_bonus" },
  { label: "Parental Leave", value: "parental_leave" },
];

export default function JobbenefitsForm() {
  const { control } = useFormContext();

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-xl font-medium text-[#020C10]">Job Benefits</h2>
      </header>

      <div className="mt-4 flex gap-8">
        <div className="w-full">
          <FormField
            control={control}
            name="benefits"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {benefits.map((item) => (
                    <FormField
                      key={item.value}
                      control={control}
                      name="benefits"
                      render={({ field }) => (
                        <FormItem
                          key={item.value}
                          className={cn(
                            "flex items-center space-x-2 space-y-0 border rounded-md px-3 py-2",
                            field.value?.includes(item.value) &&
                              "border-primary bg-[#68BBE333]"
                          )}
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.value)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                if (checked) {
                                  field.onChange([
                                    ...currentValues,
                                    item.value,
                                  ]);
                                } else {
                                  field.onChange(
                                    currentValues.filter(
                                      (value: string) => value !== item.value
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
