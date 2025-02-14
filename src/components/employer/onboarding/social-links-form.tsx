import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../ui/input";

const formSchema = z.object({
  linkedin_url: z.string().optional(),
  twitter_url: z.string().optional(),
  facebook_url: z.string().optional(),
  instagram_url: z.string().optional(),
});

type SocialLinksFormValues = z.infer<typeof formSchema>;

export default function SocialLinksForm() {
  const form = useFormContext<SocialLinksFormValues>();

  const socialPlatforms = [
    { id: "linkedin_url", label: "LinkedIn" },
    { id: "twitter_url", label: "Twitter" },
    { id: "facebook_url", label: "Facebook" },
    { id: "instagram_url", label: "Instagram" },
  ];

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">Social Links</h2>
      </header>

      <div className="w-full pt-2">
        <Form {...form}>
          <div className="grid gap-4 w-full">
            {socialPlatforms.map((platform) => (
              <div key={platform.id} className="flex items-end w-full">
                <FormItem className="w-1/4">
                  <FormLabel>{platform.label}</FormLabel>
                </FormItem>
                <FormField
                  control={form.control}
                  name={
                    platform.id as
                      | "linkedin_url"
                      | "twitter_url"
                      | "facebook_url"
                      | "instagram_url"
                  }
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input
                          placeholder={`Enter your ${platform.label} URL`}
                          {...field}
                          className="rounded-l-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </Form>
      </div>
    </div>
  );
}
