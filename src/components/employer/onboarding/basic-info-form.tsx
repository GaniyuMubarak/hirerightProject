import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Icons from "../../ui/icons";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

export default function EmployerBasicInfoForm() {
  const form = useForm();

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">
          Basic Information
        </h2>
      </header>

      <div className="mt-2 ">
        <div className="flex gap-8 w-full">
          <div className="space-y-1.5">
            <Label className="text-[#475467]">Profile Picture</Label>
            <div className="flex flex-col gap-3 items-center w-72  border rounded-[12px] p-6 py-12 bg-[#F3F3F3]">
              <div className=" h-10 w-10 flex justify-center items-center">
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
          <div className="space-y-1.5 w-full">
            <Label className="text-[#475467]">Banner Picture</Label>
            <div className="flex flex-col gap-3 items-center w-full  border rounded-[12px] p-6 py-12 bg-[#F3F3F3]">
              <div className=" h-10 w-10 flex justify-center items-center">
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
        <div className="w-full mt-8">
          <Form {...form}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ABC.LTD"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="biography"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Us</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write short bio"
                        rows={4}
                        {...field}
                      />
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
