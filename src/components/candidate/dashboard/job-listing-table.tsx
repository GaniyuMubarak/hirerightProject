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
    <div className="border rounded-[12px] p-6 space-y-4">
      <header className="flex justify-between items-center gap-4 border-b pb-2.5">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium">Jobs Recommended for you</h1>
          <p className="text-[#475467] text-sm">
            Best AI matches from HIRE RIGHT
          </p>
        </div>

        <Link
          to="/candidate/jobs"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-[#D0D5DD] shadow-[0px_1px_2px_0px_#1018280D] h-9"
          )}
        >
          View All <ArrowRight />
        </Link>
      </header>

      <div className="border-b">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="w-[%] ">Company</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs?.data?.map((job: any) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-[60px] w-[60px] rounded-[6px] shadow-[0px_3px_4px_-1px_#10182814]">
                      <img
                        src="/logo.svg"
                        alt="Logo"
                        className="object-cover w-full h-full aspect-square"
                      />
                    </div>
                    <div className="flex flex-col justify-between h-full space-y-2">
                      <span className="text-[#020C10] text-lg tracking-[-1px] leading-none">
                        {job.title}
                      </span>
                      <span className="text-[#475467] tracking-[-1px] flex items-center gap-1.5 text-base">
                        <Icons.locationOutlined /> Lagos, Nigeria{" "}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {" "}
                  {job.employment_type === "part_time"
                    ? "Part Time"
                    : "Full Time"}{" "}
                  • {job.work_mode}
                </TableCell>
                <TableCell>
                  {`${job.salary_currency} ${Number(
                    job.salary_min
                  ).toLocaleString()} - ${Number(
                    job.salary_max
                  ).toLocaleString()}`}
                </TableCell>
                <TableCell>
                  <Badge className="capitalize">{job.status}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-4">
                  <Link to={`/candidate/jobs/${job.id}`}>
                    <Button variant={"secondary"} className="rounded-[6px]">
                      View Details
                    </Button>
                  </Link>
                  <Button
                    className="px-6 rounded-[6px]"
                    onClick={() => open("view", job)}
                  >
                    Apply
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
