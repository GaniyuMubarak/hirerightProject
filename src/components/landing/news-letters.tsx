import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNewsletter } from "@/hooks/forms/use-newsletter";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof FormSchema>;

// ─── SuccessMessage ───────────────────────────────────────────────────────────

const SuccessMessage = ({
  title,
  subtext,
}: {
  title: string;
  subtext: string;
}) => (
  <div className="flex flex-col items-center text-center space-y-2">
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brandOrange/20 text-brandOrange border border-brandOrange/30">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="stroke-current">
        <path
          d="M3 9.5L7 13.5L15 5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <p className="font-serif text-lg text-white">{title}</p>
    <p className="text-sm text-gray-400">{subtext}</p>
  </div>
);

// ─── NewsletterForm ───────────────────────────────────────────────────────────

const NewsletterForm = ({
  form,
  onSubmit,
  isLoading,
}: {
  form: ReturnType<typeof useForm<FormValues>>;
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder="you@example.com"
                disabled={isLoading}
                className="w-full bg-white/5 border border-gray-700 text-white placeholder-gray-500 focus:ring focus:ring-brandOrange focus:border-brandOrange rounded px-4 h-12 disabled:opacity-50"
                id="email"
              />
            </FormControl>
            <FormMessage className="text-xs text-brandOrange mt-1" />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-brandOrange text-black hover:bg-brandOrange/90 disabled:opacity-60 disabled:cursor-not-allowed">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Subscribing…
          </span>
        ) : (
          "Subscribe"
        )}
      </Button>
      <p className="text-xs text-gray-400 flex items-center gap-1 mt-2">
        <svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          className="stroke-current opacity-50">
          <rect x="1" y="5" width="8" height="7" rx="1" strokeWidth="1.2" />
          <path
            d="M3 5V3.5a2 2 0 014 0V5"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        No spam. Unsubscribe anytime.
      </p>
    </form>
  </Form>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NewsletterCard() {
  const { subscribe, isLoading } = useNewsletter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormValues) => {
    const success = await subscribe({ email: data.email });
    if (success) form.reset();
  };

  const isSubmitted =
    form.formState.isSubmitSuccessful && !form.formState.isDirty;

  return (
    <div className="max-w-4xl mx-auto my-12 bg-primary rounded shadow-lg overflow-hidden grid md:grid-cols-2">
      {/* Left */}
      <div className="p-8 border-r border-gray-700 md:border-r md:order-first order-last">
        <p className="text-xs uppercase tracking-widest text-brandOrange mb-2 flex items-center gap-2">
          Monthly Dispatch
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-2">
          Stories worth <em className="italic text-brandOrange">reading</em>,
          delivered.
        </h2>
        <p className="text-sm text-gray-400">
          A curated summary of what we've shipped, behind-the-scenes updates,
          and hand-picked reads — once a month, no noise.
        </p>
      </div>

      {/* Right */}
      <div className="p-8">
        {isSubmitted ? (
          <SuccessMessage
            title="You're subscribed."
            subtext="First issue lands next month."
          />
        ) : (
          <NewsletterForm
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
