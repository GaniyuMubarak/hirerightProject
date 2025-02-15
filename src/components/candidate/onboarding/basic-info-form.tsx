import UploadFileForm from "@/components/shared/upload-file-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Icons from "@/components/ui/icons";
import { useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

export default function BasicInfoForm() {
  const form = useFormContext();

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">
          Basic Information
        </h2>
      </header>

      <div className="mt-2 flex gap-8">
        <UploadFileForm fieldName="profile_picture" />

        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="user.first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Joe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="000000000" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Joe@gmail.com"
                        {...field}
                        type="email"
                        className="pl-9"
                      />
                      <Icons.mail className="absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.title"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Title/Headline</FormLabel>
                  <FormControl>
                    <Input placeholder="Lead Product designer" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="20A, Omonirie Johnson St., Lekki Phase 1, Lagos, Nigeria"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.website"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Website link</FormLabel>
                  <FormControl>
                    <Input placeholder="joe.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.bio"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Biography</FormLabel>
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
        </div>
      </div>
    </div>
  );
}
