import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import Icons from "../../ui/icons";

export default function EmployerTestListing() {
  return (
    <div className="border rounded-[12px] p-6 space-y-4">
      <div className="border-b">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="w-[22%] ">Test</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>No. of questions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex flex-col justify-between h-full space-y-2">
                  <span className="text-[#020C10] text-lg tracking-[-1px] leading-none">
                    Graphics Designer
                  </span>
                  <span className="text-[#475467] tracking-[-1px] flex items-center gap-1.5 text-base">
                    Full Time
                  </span>
                </div>
              </TableCell>
              <TableCell>60mins</TableCell>
              <TableCell>50</TableCell>
              <TableCell>
                <Badge>Active</Badge>
              </TableCell>
              <TableCell className="text-right space-x-4">
                <div className="flex gap-4 justify-end">
                  <Button variant={"ghost"} className=" border-b rounded-none">
                    <Icons.more />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex flex-col justify-between h-full space-y-2">
                  <span className="text-[#020C10] text-lg tracking-[-1px] leading-none">
                    Product Designer
                  </span>
                  <span className="text-[#475467] tracking-[-1px] flex items-center gap-1.5 text-base">
                    Full Time
                  </span>
                </div>
              </TableCell>
              <TableCell>60mins</TableCell>
              <TableCell>50</TableCell>
              <TableCell>
                <Badge>Active</Badge>
              </TableCell>
              <TableCell className="text-right space-x-4">
                <div className="flex gap-4 justify-end">
                  <Button variant={"ghost"} className=" border-b rounded-none">
                    <Icons.more />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
