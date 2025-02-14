import { Checkbox } from "@/components/ui/checkbox";
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
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "NGN - Nigeria Naira", value: "NGN" },
];

export default function SalaryForm() {
  const { control } = useFormContext();

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-xl font-medium text-[#020C10]">Salary</h2>
      </header>

      <div className="mt-2 flex gap-8">
        <div className="w-full">
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={control}
                name="salary_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Salary</FormLabel>
                    <FormControl>
                      <NumericFormat
                        name={field.name}
                        value={field.value}
                        placeholder="Enter minimum salary"
                        min={0}
                        allowNegative={false}
                        onValueChange={(values) => {
                          field.onChange(
                            values.floatValue !== undefined
                              ? values.floatValue
                              : null
                          );
                        }}
                        decimalScale={2}
                        thousandSeparator=","
                        className={
                          "flex h-10 w-full rounded-[6px] border border-input bg-transparent px-3 py-1 text-base shadow-[0px_1px_2px_0px_#1018280D] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="salary_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Salary</FormLabel>
                    <FormControl>
                      <NumericFormat
                        name={field.name}
                        value={field.value}
                        placeholder="Enter maximum salary"
                        min={0}
                        allowNegative={false}
                        onValueChange={(values) => {
                          field.onChange(
                            values.floatValue !== undefined
                              ? values.floatValue
                              : null
                          );
                        }}
                        decimalScale={2}
                        thousandSeparator=","
                        className={
                          "flex h-10 w-full rounded-[6px] border border-input bg-transparent px-3 py-1 text-base shadow-[0px_1px_2px_0px_#1018280D] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="salary_currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.value}
                            value={currency.value}
                          >
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="hide_salary"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Hide salary range from job posting
                  </FormLabel>
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
