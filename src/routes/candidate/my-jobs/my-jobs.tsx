import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router";

export default function MyJobs() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-3 py-16">
        <p>You don't have any applications.</p>
        <p> Click HERE to start applying</p>
        <Link
          to="/candidate/jobs"
          className={cn(buttonVariants({ variant: "ghost" }), "text-primary")}
        >
          <CirclePlus strokeWidth={1.5} />
          Apply
        </Link>
      </div>
    </div>
  );
}
