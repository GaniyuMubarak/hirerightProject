import UploadFileForm from "@/components/shared/upload-file-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

export default function EmployerBasicInfoForm() {
  const form = useFormContext();

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
            <UploadFileForm fieldName="profile_image" />
          </div>
          <div className="space-y-1.5 w-full">
            <Label className="text-[#475467]">Banner Picture</Label>
            <UploadFileForm fieldName="banner_image" className="w-full" />
          </div>
        </div>
        <div className="w-full mt-8">
          <Form {...form}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
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
                name="about"
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
