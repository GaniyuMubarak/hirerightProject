import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function NewsLetters() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="py-10 px-4">
      <div className="bg-primary py-6 px-8 max-w-5xl mx-auto rounded-[12px] grid lg:grid-cols-2 items-center gap-6">
        <div className="text-white space-y-3">
          <h2 className="text-xl font-medium tracking-[-0.012em]">
            Subscribe to our newsletter
          </h2>
          <p className="text-[#EFEFEF] tracking-[-0.01em]">
            Get a summary of what we’ve shipped during the last month, behind
            the scenes updates, and team picks.
          </p>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex max-lg:flex-col gap-4 items-center"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="bg-white w-full h-12"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="px-6 text-white bg-[#EE7B36] rounded-[6px] max-lg:w-full"
              >
                Subscribe
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
