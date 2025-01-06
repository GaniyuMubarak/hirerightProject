import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export default function CertificationForm() {
  const form = useForm();

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">
          Certifications
        </h2>
      </header>

      <div className="w-full pt-2">
        <Form {...form}>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Certificate Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Foundations in UI/UX Design"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Year Obtained</FormLabel>
                  <FormControl>
                    <Input placeholder="2020" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Host Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="Coursera" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
