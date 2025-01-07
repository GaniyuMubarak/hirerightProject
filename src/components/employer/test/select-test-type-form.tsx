import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function SelectTestTypeForm({
  step,
  setStep,
}: {
  step: number;
  setStep: (n: number) => void;
}) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);

  return (
    <div className="space-y-8">
      <h1 className="text-[28px] font-semibold text-[#1B1B1C]">
        Create a Test
      </h1>

      <div className="gap-1.5 flex flex-col">
        <Label className="text-[#475467]">Test type</Label>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              className="w-full text-left justify-between rounded-[6px] font-normal text-[#667085]"
            >
              Select test type <ChevronDown className="min-w-6 min-h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w- min-w-full">
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              <div className="flex flex-col justify-start pr-20">
                <h2 className="text-sm text-[#475467] font-medium">
                  Single Question Test
                </h2>
                <p className="whitespace-nowrap">
                  Best used for testing candidates on assessments(practical test
                  or take home tests)
                </p>
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              <div className="flex flex-col justify-start pr-20">
                <h2 className="text-sm text-[#475467] font-medium">
                  Multiple Question Test
                </h2>
                <p className="whitespace-nowrap">
                  Best used when creating a multiple choice test (obj)
                </p>
              </div>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
