import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

const FormSchema = z.object({
  type: z.enum(["candidate", "employer"], {
    required_error: "You need to select a notification type.",
  }),
});

export function AccountTypeForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Signup data>>", data);
    if (data.type === "employer") {
      navigate("/employer/onboarding");
      return;
    }
    navigate("/onboarding");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className="space-y-8"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-medium text-[#020C10]">
            Welcome to{" "}
            <span className="text-primary font-abhaya font-extrabold">
              Hire Right
            </span>
          </h1>
          <p className="text-balance text-base text-[#475467] font-medium">
            Choose account type
          </p>
        </div>
        <div className=" mt-8 pb-12">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-5"
                  >
                    <FormItem className=" space-y-0 border-2 rounded-[8px]">
                      <FormLabel className="font-normal space-y-1 w-full p-4 cursor-pointer flex items-center justify-between space-x-3">
                        <div className="space-y-1">
                          <h3 className="text-[#020C10] text-lg font-medium ">
                            Candidate
                          </h3>
                          <p className="text-[#667074] text-base">
                            Looking for opportunities.
                          </p>
                        </div>

                        <FormControl>
                          <RadioGroupItem value="candidate" />
                        </FormControl>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="space-y-0 border-2  rounded-[8px] ">
                      <FormLabel className="font-normal space-y-1 w-full p-4 cursor-pointer flex items-center justify-between space-x-3">
                        <div className="space-y-1">
                          <h3 className="text-[#020C10] text-lg font-medium">
                            Employer
                          </h3>
                          <p className="text-[#667074] text-base">
                            Looking for the best candidate.
                          </p>
                        </div>
                        <FormControl>
                          <RadioGroupItem value="employer" />
                        </FormControl>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Proceed
        </Button>

        <div className="text-center font-mediu">
          Already have an account?{" "}
          <Link to="/sign-up" className="font-bold text-primary">
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
}
