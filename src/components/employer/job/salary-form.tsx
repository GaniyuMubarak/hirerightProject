import {
  Form,
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
import { useForm } from "react-hook-form";

export default function SalaryForm() {
  const form = useForm();

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-xl font-medium text-[#020C10]">Salary</h2>
      </header>

      <div className="mt-2 flex gap-8">
        <div className="w-full">
          <Form {...form}>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="job-role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Salary</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <div className="relative h-10">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Platform" />
                          </SelectTrigger>{" "}
                          <span className="absolute top-2 bottom-0 my-auto right-8 -z-10">
                            USD
                          </span>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">...</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job-role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Salary</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <div className="relative h-10">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Platform" />
                          </SelectTrigger>{" "}
                          <span className="absolute top-2 bottom-0 my-auto right-8 -z-10">
                            USD
                          </span>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">...</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job-role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <div className="relative h-10">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Platform" />
                          </SelectTrigger>{" "}
                          <span className="absolute top-2 bottom-0 my-auto right-8 -z-10">
                            USD
                          </span>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">...</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
