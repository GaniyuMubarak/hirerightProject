import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useApplyToJob from "@/hooks/forms/use-apply-to-job";
import { useDialog } from "@/stores/dialog";
import { Loader } from "lucide-react";
import { Link } from "react-router";

export function ApplyDialog() {
  const { isOpen, close, payload } = useDialog<any>("apply-dialog");
  const { form, onSubmit } = useApplyToJob();
  return (
    <Dialog open={isOpen} onOpenChange={() => close()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apply to {payload?.company?.name}</DialogTitle>
          <DialogDescription>
            Is your profile up to date? Click{" "}
            <Link to={"/candidate/profile"} className="text-blue-700">
              here
            </Link>{" "}
            to verify how you will appear to recruiters.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cover_letter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="px-8"
                  disabled={form?.formState?.isSubmitting}
                >
                  Submit{" "}
                  {form?.formState?.isSubmitting && (
                    <Loader className="ml-2 animate-spin" />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
