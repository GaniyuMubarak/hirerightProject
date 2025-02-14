import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

import CountrySelect from "@/components/ui/country-select";
import RegionSelect from "@/components/ui/region-select";
import { useState } from "react";

const remoteRegions = [
  { label: "North America", value: "north_america" },
  { label: "South America", value: "south_america" },
  { label: "Europe", value: "europe" },
  { label: "Asia", value: "asia" },
  { label: "Africa", value: "africa" },
  { label: "Oceania", value: "oceania" },
];

export default function LocationForm() {
  const { control, watch } = useFormContext();
  const [selectedCountry, setSelectedCountry] = useState("");
  const isRemote = watch("work_mode") === "remote";

  return (
    <div className="">
      <header className="space-y-1 border-b pb-2 w-full">
        <h2 className="text-xl font-medium text-[#020C10]">Location</h2>
      </header>

      <div className="mt-2 flex gap-8">
        <div className="w-full">
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <CountrySelect
                        onChange={(value) => {
                          setSelectedCountry(value);
                          field.onChange(`${value}`);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/Region</FormLabel>
                    <FormControl>
                      <RegionSelect
                        onChange={(value) => console.log(value)}
                        countryCode={selectedCountry}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isRemote && (
              <FormField
                control={control}
                name="remote_regions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remote Work Regions</FormLabel>
                    <div className="grid grid-cols-3 gap-4">
                      {remoteRegions.map((region) => (
                        <FormItem
                          key={region.value}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(region.value)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                if (checked) {
                                  field.onChange([
                                    ...currentValues,
                                    region.value,
                                  ]);
                                } else {
                                  field.onChange(
                                    currentValues.filter(
                                      (value: string) => value !== region.value
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {region.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
