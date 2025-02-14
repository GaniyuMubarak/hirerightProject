import StaffCard from "@/components/employer/staff/staff-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function StaffList() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      <div className="border rounded-[8px] p-6 space-y-2.5">
        <h2 className="text-sm text-[#475467] font-medium">Manager</h2>
        <StaffCard />
      </div>
      <div className="border rounded-[8px] p-6 space-y-8">
        <div className="flex justify-between items-center">
          <header className="space-y-1 border-b pb-5 w-full">
            <h1 className="text-2xl font-semibold">Staff accounts</h1>
            <p className="text-[#475467] text-sm">
              Add other staff members to your dashboard
            </p>
          </header>
          <Button className="rounded-[6px]">
            <PlusCircle />
            Add Staff
          </Button>
        </div>
        <StaffCard isEditable />
        <StaffCard isEditable />
        <StaffCard isEditable />
      </div>
    </div>
  );
}
