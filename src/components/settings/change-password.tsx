import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Icons from "../ui/icons";
import { Input } from "../ui/input";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

export default function ChangePassword() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
    <div className="">
      <header className="space-y-1 border-b pb-4">
        <h2 className="text-xl font-semibold">Change Password</h2>
      </header>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=" mt-8 flex gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Icons.lock className="absolute inset-0 my-auto left-2" />
                        <Input
                          placeholder="********"
                          {...field}
                          type="password"
                          className="px-10"
                        />
                        <Button
                          variant="link"
                          type="button"
                          className="absolute inset-0 my-auto ml-auto right-0 w-fit"
                        >
                          <EyeOff />
                          {/* <Eye /> */}
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Icons.lock2 className="absolute inset-0 my-auto left-2" />
                        <Input
                          placeholder="********"
                          {...field}
                          type="password"
                          className="px-10"
                        />
                        <Button
                          variant="link"
                          type="button"
                          className="absolute inset-0 my-auto ml-auto right-0 w-fit"
                        >
                          <EyeOff />
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Icons.lock2 className="absolute inset-0 my-auto left-2" />
                        <Input
                          placeholder="********"
                          {...field}
                          type="password"
                          className="px-10"
                        />
                        <Button
                          variant="link"
                          type="button"
                          className="absolute inset-0 my-auto ml-auto right-0 w-fit"
                        >
                          <EyeOff />
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="w-fit rounded-[6px] h-9">
                Reset password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
