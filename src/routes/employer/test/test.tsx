import EmployerTestListing from "@/components/employer/test/tests-listing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export default function EmployerTests() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      <header className="space-y-1 border-b pb-5 flex justify-between ">
        <h1 className="text-2xl font-semibold">Manage your tests</h1>
        <Link
          to={"/employer/tests/create"}
          className={cn(buttonVariants(), "rounded-[6px]")}
        >
          Create a Test
        </Link>
      </header>
      <EmployerTestListing />
    </div>
  );
}
