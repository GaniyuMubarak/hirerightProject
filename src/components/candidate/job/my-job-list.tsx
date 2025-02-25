import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Link } from "react-router";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

export default function MyJobList({ job = {} }: { job: any }) {
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
              <TableHead className="lg:w-[22%] w-[60%] ">Job</TableHead>
              <TableHead className="">Company</TableHead>
              <TableHead className="max-lg:hidden">Applied At</TableHead>
              <TableHead className="max-lg:hidden">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {job?.data?.map((job: any) => (
              <TableRow key={job.id}>
                <TableCell>{job.job_title}</TableCell>
                <TableCell>{job.company_name}</TableCell>
                <TableCell className="max-lg:hidden">
                  {dayjs(job.applied_at).format("MMM DD, YYYY")}
                </TableCell>

                <TableCell className="max-lg:hidden">
                  <Badge className="capitalize">{job.status}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-4">
                  <div className="flex gap-4 justify-end">
                    <Link to={`/candidate/jobs/${job.job_id}`}>
                      <Button variant={"secondary"} className="rounded-[6px]">
                        View <span className="max-lg:hidden">Application</span>
                      </Button>
                    </Link>
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
