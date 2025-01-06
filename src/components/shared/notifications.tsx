import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "../ui/icons";

export default function Notifications() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
          <Icons.bell className="text-[#475467]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-72 mt-6">
          <DropdownMenuLabel>No Recent Notifications</DropdownMenuLabel>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
