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
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SocialLinksForm() {
  const form = useForm();

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">Social Links</h2>
      </header>

      <div className="w-full pt-2">
        <Form {...form}>
          <div className="grid gap-4 w-full ">
            <div className="flex items-end w-full ">
              <FormField
                control={form.control}
                name="link1"
                render={({ field }) => (
                  <FormItem className="w-1/4">
                    <FormLabel>Social Link 1</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-r-none">
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="w-3/4">
                    <FormControl>
                      <Input
                        placeholder="2020"
                        {...field}
                        className="rounded-l-none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Form>

        <div className="flex justify-center mt-6">
          <Button type="button" variant={"ghost"} className="font-semibold">
            <CirclePlus className="min-w-6 min-h-6" />
            Add Row
          </Button>
        </div>
      </div>
    </div>
  );
}
