import { Button } from "../../ui/button";
import Icons from "../../ui/icons";
import { Input } from "../../ui/input";

export default function Filters() {
  return (
    <div className="px-4 flex items-center divide-x shadow-[0px_2px_8px_0px_#1A1A1A1F] rounded-[6px]">
      <div className="flex items-center w-full px-4">
        <Icons.search />
        <Input
          placeholder="Search by: Job title, Position or Keywords..."
          className="h-20 focus:outline-none focus-visible:ring-0 border-none shadow-none w-full text-base"
        />
      </div>
      <div className="flex items-center w-full px-4">
        <Icons.locationOutlined />
        <Input
          placeholder="Search by: Job title, Position or Keywords..."
          className="h-20 focus:outline-none focus-visible:ring-0 border-none shadow-none w-full text-base"
        />
      </div>

      <div className="flex gap-4">
        <Button
          variant={"secondary"}
          className="rounded-[6px] text-[#1B1B1C] px-6"
        >
          <Icons.filter className="min-w-6 min-h-6" />
          Search
        </Button>
        <Button className="rounded-[6px] px-6">Search</Button>
      </div>
    </div>
  );
}
