import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
// import ProgressBar from "@/components/candidate/onboarding/progress-bar";
import ProgressBar from "./progress-bar";

// Industry codes that match your backend
const INDUSTRY_CODES = [
  { code: "IT", name: "Information Technology" },
  { code: "FIN", name: "Finance & Banking" },
  { code: "HLT", name: "Healthcare" },
  { code: "EDU", name: "Education" },
  { code: "MFG", name: "Manufacturing" },
  { code: "RET", name: "Retail" },
  { code: "CON", name: "Construction" },
  { code: "TRN", name: "Transportation" },
  { code: "ENG", name: "Engineering" },
  { code: "MED", name: "Media & Entertainment" },
  { code: "TEL", name: "Telecommunications" },
  { code: "AGR", name: "Agriculture" },
  { code: "NGO", name: "Non-Profit" },
  { code: "GOV", name: "Government" },
  { code: "SVC", name: "Services" },
];

// Company sizes for selection
const COMPANY_SIZES = [
  { min: 1, max: 10, label: "1-10 employees" },
  { min: 11, max: 50, label: "11-50 employees" },
  { min: 51, max: 200, label: "51-200 employees" },
  { min: 201, max: 500, label: "201-500 employees" },
  { min: 501, max: 1000, label: "501-1000 employees" },
  { min: 1001, max: 5000, label: "1001-5000 employees" },
  { min: 5001, max: 10000, label: "5000+ employees" },
];

// Countries list
const COUNTRIES = [
  { code: "NG", name: "Nigeria" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "KE", name: "Kenya" },
  { code: "GH", name: "Ghana" },
  { code: "ZA", name: "South Africa" },
  { code: "IN", name: "India" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "CN", name: "China" },
  // Add more countries as needed
];

export default function EmployerCompanyForm() {
  const form = useFormContext();

  // Generate years for establishment (last 100 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-2xl font-semibold text-[#020C10]">
          Company Information
        </h2>
        <p className="text-sm text-gray-500">
          Provide your company details. All fields with * are required.
        </p>
      </header>

      <div className="mt-6 space-y-6">
        {/* Company Name - REQUIRED */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Company Name
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Acme Corporation Inc."
                  {...field}
                  value={field.value || ""}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Email - REQUIRED (MISSING FROM YOUR FORM!) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Company Email
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="contact@company.com"
                  {...field}
                  value={field.value || ""}
                  className="w-full"
                />
              </FormControl>
              <p className="text-xs text-gray-500 mt-1">
                Official company email address for communication
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Country - REQUIRED (MISSING FROM YOUR FORM!) */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Country
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Industry Code - REQUIRED */}
          <FormField
            control={form.control}
            name="industry_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Industry
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INDUSTRY_CODES.map((industry) => (
                      <SelectItem key={industry.code} value={industry.code}>
                        {industry.code} - {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* About Company - REQUIRED */}
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Company Description
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your company's mission, vision, products/services, and culture..."
                  rows={5}
                  {...field}
                  value={field.value || ""}
                  className="w-full" required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Size - REQUIRED */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="size_min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Company Size
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const selected = COMPANY_SIZES.find(s => s.label === value);
                      if (selected) {
                        form.setValue("size_min", selected.min);
                        form.setValue("size_max", selected.max);
                      }
                    }}
                    defaultValue=""
                    value={COMPANY_SIZES.find(
                      s => s.min === form.watch("size_min") && s.max === form.watch("size_max")
                    )?.label || ""} required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem key={size.label} value={size.label}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Website - REQUIRED */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Website
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.example.com"
                      {...field}
                      value={field.value || ""}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone and Location Fields */}
          <div className="space-y-4">
            {/* Phone - REQUIRED */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Phone Number
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1234567890"
                      {...field}
                      value={field.value || ""}
                      className="w-full"
                      // maxLength={15} required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City and State - REQUIRED */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      City
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lagos"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      State/Province
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lagos State"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Address and Postal Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Address
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main Street"
                    {...field}
                    value={field.value || ""}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="100001"
                    {...field}
                    value={field.value || ""}
                    className="w-full" required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Social Media Links */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="linkedin_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/company/yourcompany"
                    {...field}
                    value={field.value || ""}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/yourcompany"
                    {...field}
                    value={field.value || ""}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        {/* Additional Notes */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            Required Fields for Backend API
          </h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• <code>name</code>: Company name</li>
            <li>• <code>email</code>: Company email address</li>
            <li>• <code>country</code>: Country where company is based</li>
            <li>• <code>phone</code>: Company phone number</li>
            <li>• <code>about</code>: Company description</li>
            <li>• <code>industry_code</code>: Industry classification</li>
            <li>• <code>size_min</code> & <code>size_max</code>: Employee range</li>
            <li>• <code>website</code>: Company website URL</li>
            <li>• <code>address</code>, <code>city</code>, <code>state</code>: Location details</li>
          </ul>
        </div>
      </div>
    </div>
  );
}