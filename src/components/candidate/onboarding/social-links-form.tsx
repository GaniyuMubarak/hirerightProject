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
import { cn } from "@/lib/utils";
import { CirclePlus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const SOCIAL_PLATFORMS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter" },
  { value: "portfolio", label: "Portfolio" },
];

export default function SocialLinksForm() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "social_links",
  });

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">Social Links</h2>
      </header>

      <div className="w-full pt-2 space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              "relative ",
              fields?.length > 1 && "border rounded-lg p-4 "
            )}
          >
            {fields?.length > 1 && (
              <div className="absolute -top-3 -right-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex items-end w-full gap-4">
              <FormField
                control={form.control}
                name={`social_links.${index}.platform`}
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Platform</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SOCIAL_PLATFORMS.map((platform) => (
                          <SelectItem
                            key={platform.value}
                            value={platform.value}
                          >
                            {platform.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`social_links.${index}.url`}
                render={({ field }) => (
                  <FormItem className="w-2/3">
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6">
          <Button
            type="button"
            variant="ghost"
            className="font-semibold"
            onClick={() =>
              append({
                platform: "",
                url: "",
              })
            }
          >
            <CirclePlus className="min-w-6 min-h-6" /> Add Social Link
          </Button>
        </div>
      </div>
    </div>
  );
}
