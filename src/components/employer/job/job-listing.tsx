import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import Icons from "../../ui/icons";

export default function EmployerJobListing({ job = {} }: { job: any }) {
  return (
    <div className="border rounded-[12px] p-4 lg:p-6 space-y-4">
      <header className="border-b pb-2.5">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium">My Jobs</h1>
        </div>
      </header>

      <div className="border-b">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="lg:w-[22%] w-[60%]">Job/s</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead className="max-lg:hidden">Candidates</TableHead>
              <TableHead className="max-lg:hidden">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {job?.data?.data.map((job: any) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div className="flex flex-col justify-between h-full space-y-2">
                    <span className="text-[#020C10] text-base font-normal lg:text-lg tracking-[-1px] leading-none">
                      {job.title}
                    </span>
                    <span className="text-[#475467] tracking-[-1px] flex items-center gap-1.5 text-base">
                      {job.employment_type === "part_time"
                        ? "Part Time"
                        : "Full Time"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="max-lg:hidden whitespace-nowrap">
                    {`${job.salary_currency} ${Number(
                      job.salary_min
                    ).toLocaleString()} - ${Number(
                      job.salary_max
                    ).toLocaleString()}`}
                  </span>
                  <span className="lg:hidden whitespace-nowrap overflow-hidden">
                    {`${job.salary_currency} ${Number(
                      job.salary_min
                    ).toLocaleString()} -`}
                  </span>
                </TableCell>
                <TableCell className="max-lg:hidden">
                  <div className="flex items-center gap-3">
                    <Icons.peopleSm />
                    {job.positions_available} Positions
                  </div>
                </TableCell>
                <TableCell className="max-lg:hidden">
                  <Badge>{job.status}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-4">
                  <div className="flex gap-4 justify-end">
                    <Link
                      to={`/employer/jobs/${job.id}/applications`}
                      className="max-lg:hidden"
                    >
                      <Button variant={"secondary"} className="rounded-[6px]">
                        View Applications
                      </Button>
                    </Link>
                    <Button
                      variant={"ghost"}
                      className=" border-b rounded-none"
                    >
                      <Icons.more className="min-h-6 min-w-6" />
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
