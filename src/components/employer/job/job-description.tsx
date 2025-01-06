import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export default function JobDescriptionForm() {
  const form = useForm();

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-xl font-medium text-[#020C10]">Job Description </h2>
      </header>
      <div className="mt-2 flex gap-8">
        <div className="w-full">
          <Form {...form}>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="job-title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Text" {...field} />
                    </FormControl>

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
