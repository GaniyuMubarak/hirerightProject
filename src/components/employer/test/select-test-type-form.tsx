// // import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
// // import * as React from "react";

// // import { Button } from "@/components/ui/button";
// // import {
// //   DropdownMenu,
// //   DropdownMenuCheckboxItem,
// //   DropdownMenuContent,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { Label } from "@/components/ui/label";
// // import { ChevronDown } from "lucide-react";
// // import { Link } from "react-router";

// // type Checked = DropdownMenuCheckboxItemProps["checked"];

// // export default function SelectTestTypeForm({
// //   step,
// //   setStep,
// // }: {
// //   step: number;
// //   setStep: (n: number) => void;
// // }) {
// //   const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
// //   const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);

// //   return (
// //     <div className="space-y-8">
// //       <h1 className="text-[28px] font-semibold text-[#1B1B1C]">
// //         Create a Test
// //       </h1>

// //       <div className="gap-1.5 flex flex-col">
// //         <Label className="text-[#475467]">Test type</Label>
// //         <DropdownMenu>
// //           <DropdownMenuTrigger>
// //             <Button
// //               variant="outline"
// //               className="w-full text-left justify-between rounded-[6px] font-normal text-[#667085]"
// //             >
// //               Select test type <ChevronDown className="min-w-6 min-h-6" />
// //             </Button>
// //           </DropdownMenuTrigger>
// //           <DropdownMenuContent className="w- min-w-full">
// //             <DropdownMenuCheckboxItem
// //               checked={showStatusBar}
// //               onCheckedChange={setShowStatusBar}
// //             >
// //               <div className="flex flex-col justify-start pr-20">
// //                 <h2 className="text-sm text-[#475467] font-medium">
// //                   Single Question Test
// //                 </h2>
// //                 <p className="whitespace-nowrap">
// //                   Best used for testing candidates on assessments(practical test
// //                   or take home tests)
// //                 </p>
// //               </div>
// //             </DropdownMenuCheckboxItem>
// //             <DropdownMenuCheckboxItem
// //               checked={showActivityBar}
// //               onCheckedChange={setShowActivityBar}
// //             >
// //               <div className="flex flex-col justify-start pr-20">
// //                 <h2 className="text-sm text-[#475467] font-medium">
// //                   Multiple Question Test
// //                 </h2>
// //                 <p className="whitespace-nowrap">
// //                   Best used when creating a multiple choice test (obj)
// //                 </p>
// //               </div>
// //             </DropdownMenuCheckboxItem>
// //           </DropdownMenuContent>
// //         </DropdownMenu>
// //       </div>
// //       <div className="flex justify-end">
// //         <Link to={"#"}>
// //           <Button
// //             className="rounded-[6px]"
// //             onClick={() => {
// //               setStep(step + 1);
// //             }}
// //           >
// //             Proceed
// //           </Button>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }





// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { Label } from "@/components/ui/label";
// import { ChevronDown, Check } from "lucide-react";

// export default function SelectTestTypeForm({
//   step,
//   setStep,
// }: {
//   step: number;
//   setStep: (n: number) => void;
// }) {
//   const [selectedType, setSelectedType] = React.useState<string>("");

//   const handleSelect = (type: string) => {
//     setSelectedType(type);
//   };

//   const handleProceed = () => {
//     if (!selectedType) {
//       alert("Please select a test type");
//       return;
//     }
//     console.log("Selected test type:", selectedType);
//     setStep(step + 1);
//   };

//   return (
//     <div className="space-y-8">
//       <h1 className="text-[28px] font-semibold text-[#1B1B1C]">
//         Create a Test
//       </h1>

//       <div className="gap-1.5 flex flex-col">
//         <Label className="text-[#475467]">Test type</Label>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="outline"
//               className="w-full text-left justify-between rounded-[6px] font-normal text-[#667085]">
//               {selectedType === "single"
//                 ? "Single Question Test"
//                 : selectedType === "multiple"
//                 ? "Multiple Question Test"
//                 : "Select test type"}
//               <ChevronDown className="min-w-6 min-h-6 ml-2" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-full">
//             <DropdownMenuItem
//               className="flex justify-between items-start cursor-pointer"
//               onClick={() => handleSelect("single")}>
//               <div className="flex flex-col">
//                 <h2 className="text-sm text-[#475467] font-medium">
//                   Single Question Test
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Best used for testing candidates on assessments
//                 </p>
//               </div>
//               {selectedType === "single" && (
//                 <Check className="h-4 w-4 text-primary" />
//               )}
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               className="flex justify-between items-start cursor-pointer"
//               onClick={() => handleSelect("multiple")}>
//               <div className="flex flex-col">
//                 <h2 className="text-sm text-[#475467] font-medium">
//                   Multiple Question Test
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Best used when creating a multiple choice test
//                 </p>
//               </div>
//               {selectedType === "multiple" && (
//                 <Check className="h-4 w-4 text-primary" />
//               )}
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="flex justify-end">
//         <Button
//           className="rounded-[6px]"
//           onClick={handleProceed}
//           disabled={!selectedType}>
//           Proceed
//         </Button>
//       </div>
//     </div>
//   );
// }






import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ChevronDown, Check } from "lucide-react";

interface SelectTestTypeFormProps {
  step: number;
  setStep: (n: number) => void;
  setTestType: (type: "single" | "multiple") => void;
}

export default function SelectTestTypeForm({
  step,
  setStep,
  setTestType,
}: SelectTestTypeFormProps) {
  const [selectedType, setSelectedType] = React.useState<
    "single" | "multiple" | ""
  >("");

  const handleSelect = (type: "single" | "multiple") => {
    setSelectedType(type);
  };

  const handleProceed = () => {
    if (!selectedType) {
      alert("Please select a test type");
      return;
    }

    console.log("Selected test type:", selectedType);

    // Save the test type to parent
    setTestType(selectedType);

    // Move to next step
    setStep(step + 1);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-[28px] font-semibold text-[#1B1B1C]">
        Create a Test
      </h1>

      <div className="gap-1.5 flex flex-col">
        <Label className="text-[#475467]">Test type</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full text-left justify-between rounded-[6px] font-normal text-[#667085]">
              {selectedType === "single"
                ? "Single Question Test"
                : selectedType === "multiple"
                ? "Multiple Question Test"
                : "Select test type"}
              <ChevronDown className="min-w-6 min-h-6 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem
              className="flex justify-between items-start cursor-pointer"
              onClick={() => handleSelect("single")}>
              <div className="flex flex-col">
                <h2 className="text-sm text-[#475467] font-medium">
                  Single Question Test
                </h2>
                <p className="text-sm text-gray-500">
                  Best used for testing candidates on assessments
                </p>
              </div>
              {selectedType === "single" && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-between items-start cursor-pointer"
              onClick={() => handleSelect("multiple")}>
              <div className="flex flex-col">
                <h2 className="text-sm text-[#475467] font-medium">
                  Multiple Question Test
                </h2>
                <p className="text-sm text-gray-500">
                  Best used when creating a multiple choice test
                </p>
              </div>
              {selectedType === "multiple" && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-end">
        <Button
          className="rounded-[6px]"
          onClick={handleProceed}
          disabled={!selectedType}>
          Proceed
        </Button>
      </div>
    </div>
  );
}
