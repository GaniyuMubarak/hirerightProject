import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";

export default function StaffCard({ isEditable }: { isEditable?: Boolean }) {
  return (
    <div className="flex justify-between items-center border rounded-[8px] p-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg text-[#1B1B1C] font-medium">
          Oliviarhye@gmail.com
        </h3>
        <span className="text-[#475467]">Olivia Rhye</span>
        <Badge className="w-fit">Super Admin</Badge>
      </div>

      <div className="flex gap-3">
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-[#0A3BC81A] border-[#0A3BC8] px-5 h-11 w-auto rounded-[8px]"
        >
          <Icons.bellFilled className="min-w-4 min-h-4" />
        </Button>

        {isEditable && (
          <>
            <Button
              variant={"outline"}
              size={"icon"}
              className="bg-[#B60C0C1A] border-[#B60C0C] px-5 h-11 w-auto rounded-[8px]"
            >
              <Icons.delete className="min-w-4 min-h-4" />
            </Button>
            <Button
              variant={"secondary"}
              className="h-11 rounded-[8px] text-[#1B1B1C]"
            >
              Update access
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
