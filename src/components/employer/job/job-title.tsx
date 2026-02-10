import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";

const workModes = [
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  // { label: "Onsite", value: "onsite" },
  // { label: "Intern", value: "intern" },
  { label: "Onsite", value: "onsite" },
];

export default function JobTitleForm() {
  const { control } = useFormContext();

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full max-lg:pb-2">
        <h2 className="max-lg:hidden text-xl font-medium text-[#020C10]">
          Job Title
        </h2>
      </header>
      <div className="mt-2 flex gap-8">
        <div className="w-full">
          <div className="grid gap-6">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Senior Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="work_mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Mode</FormLabel>
                  <Select
                    // onValueChange={field.onChange}
                    // defaultValue={field.value}
                    value={field.value}
                    onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workModes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value}>
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
