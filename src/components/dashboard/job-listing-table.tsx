import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import Icons from "../ui/icons";

export default function JobListingTable() {
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
          to="jobs"
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
              <TableHead className="w-[33%] ">Company</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
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
                      Product Designer
                    </span>
                    <span className="text-[#475467] tracking-[-1px] flex items-center gap-1.5 text-base">
                      <Icons.locationOutlined /> Lagos, Nigeria{" "}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>Full Time</TableCell>
              <TableCell>N230,500 - N400,000</TableCell>
              <TableCell>
                <Badge>Active</Badge>
              </TableCell>
              <TableCell className="text-right space-x-4">
                <Button variant={"secondary"} className="rounded-[6px]">
                  View Details
                </Button>
                <Button className="px-6 rounded-[6px]">Apply</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-[60px] w-[60px] rounded-[6px] bg-slate-100"></div>
                  <div className="flex flex-col justify-between h-full space-y-2">
                    <span className="text-[#020C10] text-lg tracking-[-0.01em] leading-none">
                      Product Designer
                    </span>
                    <span className="text-[#475467] tracking-[-1px] flex items-center gap-1.5 text-base">
                      <Icons.locationOutlined /> Lagos, Nigeria{" "}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>Full Time</TableCell>
              <TableCell>N230,500 - N400,000</TableCell>
              <TableCell>
                <Badge>Active</Badge>
              </TableCell>
              <TableCell className="text-right space-x-4">
                <Button variant={"secondary"} className="rounded-[6px]">
                  View Details
                </Button>
                <Button className="px-6 rounded-[6px]">Apply</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
