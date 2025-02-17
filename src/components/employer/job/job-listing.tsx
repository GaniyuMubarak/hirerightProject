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
    <div className="border rounded-[12px] p-6 space-y-4">
      <header className="border-b pb-2.5">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium">My Jobs</h1>
        </div>
      </header>

      <div className="border-b">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="w-[22%] ">Job/s</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Candidates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {job?.data?.data.map((job: any) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div className="flex flex-col justify-between h-full space-y-2">
                    <span className="text-[#020C10] text-lg tracking-[-1px] leading-none">
                      {job.title}
                    </span>
                    <span className="text-[#475467] tracking-[-1px] flex items-center gap-1.5 text-base">
                      {job.employment_type === "part_time"
                        ? "Part Time"
                        : "Full Time"}{" "}
                      • {job.work_mode}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {`${job.salary_currency} ${Number(
                    job.salary_min
                  ).toLocaleString()} - ${Number(
                    job.salary_max
                  ).toLocaleString()}`}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Icons.peopleSm />
                    {job.positions_available} Positions
                  </div>
                </TableCell>
                <TableCell>
                  <Badge>{job.status}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-4">
                  <div className="flex gap-4 justify-end">
                    <Link to={`/employer/jobs/applications`}>
                      <Button variant={"secondary"} className="rounded-[6px]">
                        View Applications
                      </Button>
                    </Link>
                    <Button
                      variant={"ghost"}
                      className=" border-b rounded-none"
                    >
                      <Icons.more />
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
