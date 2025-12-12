import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function SocialLinksForm() {
  const form = useFormContext();

  return (
    <div>
      <FormField
        control={form.control}
        name="linkedin_url" // ← Changed from "linkedin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LinkedIn URL</FormLabel>
            <FormControl>
              <Input
                placeholder="https://linkedin.com/company/..."
                {...field}
                value={field.value || ""} // Prevent undefined
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="twitter_url" // ← Changed from "twitter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Twitter URL</FormLabel>
            <FormControl>
              <Input
                placeholder="https://twitter.com/company"
                {...field}
                value={field.value || ""} // Prevent undefined
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website</FormLabel>
            <FormControl>
              <Input
                placeholder="https://example.com"
                {...field}
                value={field.value || ""} // Prevent undefined
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}