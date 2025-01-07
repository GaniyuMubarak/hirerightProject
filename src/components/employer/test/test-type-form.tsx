import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Input } from "../../ui/input";

export default function TestTypeForm({
  step,
  setStep,
}: {
  step: number;
  setStep: (n: number) => void;
}) {
  const form = useForm();

  return (
    <div className="space-y-8">
      <h1 className="text-[28px] font-semibold text-[#1B1B1C]">
        Single Question Test
      </h1>

      <div className="gap-1.5 flex flex-col">
        <Form {...form}>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Test Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">...</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">...</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-1.5">
              <Label className="text-[#475467]">File upload</Label>
              <div className="flex flex-col gap-3 items-center w-72  border rounded-[12px] p-6 py-12 ">
                <div
                  className=" h-10 w-10 flex justify-center items-center border rounded-[8px] shadow-[0px_1px_2px_0px_#1018280D]
"
                >
                  <Icons.cloudUpload />
                </div>
                <div className="flex flex-col text-[#475467] text-center space-y-1">
                  <p className="text-sm ">
                    <span className="text-[#EE7B36] font-medium">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                    <br />
                  </p>

                  <p className="text-xs">
                    {" "}
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div className="flex justify-end">
        <Link to={"#"}>
          <Button
            className="rounded-[6px]"
            onClick={() => {
              setStep(step + 1);
            }}
          >
            Proceed
          </Button>
        </Link>
      </div>
    </div>
  );
}
