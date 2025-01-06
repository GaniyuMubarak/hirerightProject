import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

const benefits = [
  {
    label: "Lorem Ipsum",
    value: 1,
  },
  {
    label: "Lorem Ipsum",
    value: 2,
  },
  {
    label: "Lorem Ipsum Ipsum",
    value: 3,
  },
  {
    label: "Lorem Ipsum",
    value: 4,
  },
  {
    label: "Lorem Ipsum Ipsum",
    value: 5,
  },
  {
    label: "Lorem Ipsum",
    value: 6,
  },
  {
    label: "Lorem Ipsum",
    value: 7,
  },
  {
    label: "Lorem Ipsum",
    value: 8,
  },
  {
    label: "Lorem Ipsum Ipsum",
    value: 9,
  },
];

export default function JobbenefitsForm() {
  const form = useForm();

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-xl font-medium text-[#020C10]">Job Benefits</h2>
      </header>

      <div className="mt-4 flex gap-8">
        <div className="w-full">
          <Form {...form}>
            <div className="flex gap-4 flex-wrap">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-2"
                      >
                        {benefits.map((benefit) => (
                          <FormItem
                            key={benefit.value}
                            className={cn(
                              "space-y-0 border-[1.5px] rounded-[3px]",
                              field.value == benefit.value &&
                                "border-primary bg-[#68BBE333]"
                            )}
                          >
                            <FormLabel className="font-normal space-y-1 w-full py-1 px-3 cursor-pointer flex items-center justify-between space-x-3">
                              <span>
                                {benefit.label} {field.value == benefit.value}
                              </span>
                              <FormControl>
                                <RadioGroupItem
                                  value={benefit.value + ""}
                                  className="hidden"
                                />
                              </FormControl>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
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
