import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function JobPagination() {
  return (
    <div className="border-t flex justify-between items-center py-3 px-6">
      <Button variant={"outline"} className="h-9 rounded-[8px] text-sm">
        <ArrowLeft size={3} />
        Previous
      </Button>
      <Button variant={"outline"} className="h-9 rounded-[8px] text-sm">
        Next <ArrowRight size={3} />
      </Button>
    </div>
  );
}
