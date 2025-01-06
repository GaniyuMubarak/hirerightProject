import { Button } from "../../ui/button";
import Icons from "../../ui/icons";

export default function DeleteAccount() {
  return (
    <div className=" border-b pb-6 space-y-1">
      <header className="space-y-2.5 pb-4">
        <h2 className="text-xl font-semibold border-b pb-2">Delete Account</h2>
        <div className=" border-t pt-2">
          <p className="text-[#475467] text-sm w-2/5">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. 
          </p>
        </div>
      </header>

      <Button variant={"link"} className="text-[#D30000]">
        <Icons.trash className="min-w-6 min-h-6" /> Delete Account
      </Button>
    </div>
  );
}
