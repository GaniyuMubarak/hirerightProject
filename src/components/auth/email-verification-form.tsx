import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useEmailVerificationForm from "@/hooks/forms/use-email-verification-form";
import { cn } from "@/lib/utils";

export function EmailVerificationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { form, onSubmit } = useEmailVerificationForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter code" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-fit px-12 mx-auto ">
              Verify email
            </Button>
          </div>
        </form>
      </Form>
      <div className="text-center text-sm text-[#475467] h-auto">
        Didn’t receive the email?{" "}
        <Button
          variant="link"
          className="font-semibold text-[#EE7B36] px-0 text-sm"
        >
          Click to resend
        </Button>
      </div>
    </div>
  );
}
