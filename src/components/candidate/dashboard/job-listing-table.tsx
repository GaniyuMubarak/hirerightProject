import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useDialog } from "@/stores/dialog";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../../ui/badge";
import { Button, buttonVariants } from "../../ui/button";
import Icons from "../../ui/icons";

export default function JobListingTable({ jobs = {} }: { jobs: any }) {
  const { open } = useDialog<any>("apply-dialog");

  return (
    <div className="border rounded-[12px] p-3 lg:p-6 space-y-4">
      <header className="flex justify-between items-center gap-4 border-b pb-2.5">
        <div className="space-y-1">
          <h1 className="text-lg lg:text-2xl font-medium text-[#020C10]">
            Jobs Recommended for you
          </h1>
          <p className="text-[#475467] text-sm">
            Best AI matches from HIRE RIGHT
          </p>
        </div>

        <Link
          to="/candidate/jobs"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-[#D0D5DD] shadow-[0px_1px_2px_0px_#1018280D] h-9 max-lg:px-2"
          )}
        >
          View All <ArrowRight />
        </Link>
      </header>

      <div className="border-b">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="lg:w-auto w-[60%] ">Job Opening</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead className="max-lg:hidden">Salary</TableHead>
              <TableHead className="max-lg:hidden">Status</TableHead>
              <TableHead className="text-right max-lg:w-[10%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs?.data?.map((job: any) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10  h-10 lg:h-[60px] lg:w-[60px] rounded-[6px] lg:shadow-[0px_3px_4px_-1px_#10182814]">
                      <img
                        src="/logo.svg"
                        alt="Logo"
                        className="object-contain lg:object-cover w-full h-full aspect-square"
                      />
                    </div>
                    <div className="flex flex-col justify-between h-full space-y-2">
                      <span className="text-[#020C10] text-base lg:text-lg tracking-[-1px] leading-none">
                        {job.title}
                      </span>
                      <span className="text-[#475467] tracking-[-1px] flex items-center gap-1.5 text-base">
                        <Icons.locationOutlined className="max-lg:w-4 max-lg:h-4" />{" "}
                        Lagos, Nigeria{" "}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {job.employment_type === "part_time"
                    ? "Part Time"
                    : "Full Time"}{" "}
                </TableCell>
                <TableCell className="max-lg:hidden">
                  {`${job.salary_currency} ${Number(
                    job.salary_min
                  ).toLocaleString()} - ${Number(
                    job.salary_max
                  ).toLocaleString()}`}
                </TableCell>
                <TableCell className="max-lg:hidden">
                  <Badge className="capitalize">{job.status}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-4">
                  <div className="flex gap-4 justify-end">
                    <Link
                      to={`/candidate/jobs/${job.id}`}
                      className="max-lg:hidden"
                    >
                      <Button variant={"secondary"} className="rounded-[6px] ">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      className="max-lg:bg-transparent max-lg:shadow-none px-2 lg:px-6 rounded-[6px]"
                      onClick={() => open("view", job)}
                    >
                      <span className="max-lg:hidden">Apply</span>{" "}
                      <Icons.more className="lg:hidden min-w-6 min-h-6" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
