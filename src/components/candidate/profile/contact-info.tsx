import { cn } from "@/lib/utils";
import Icons from "../../ui/icons";

export default function ContactInfo() {
  return (
    <div className="space-y-5 border-b pb-5">
      <h2 className="text-xl font-semibold text-[#020C10]">
        Contact Information
      </h2>
      <div className="grid lg:grid-cols-3 gap-3">
        <ContactCard
          icon={<Icons.phone />}
          title={"Phone"}
          desc={"+23489094944400"}
          title2={"Secondary phone"}
          desc2={"+23489094944400"}
        />
        <ContactCard
          icon={<Icons.mail2 />}
          title={"Email"}
          desc={"Olivarhye@gmail.com"}
        />
        <ContactCard
          icon={<Icons.locationOutlined className="min-w-8 min-h-8" />} //TODO: Fix stroke width
          title={"Location"}
          desc={"Lagos, Nogeria"}
        />
        <div className="col-span-3">
          <ContactCard
            icon={<Icons.link />}
            title={"Website"}
            desc={"http://localhost:5173/candidate/profile"}
            className="col-span-3"
          />
        </div>
      </div>
    </div>
  );
}

export function ContactCard({
  icon,
  title,
  desc,
  title2,
  desc2,
  className,
}: {
  icon: React.ReactElement;
  title: string;
  desc: string;
  title2?: string;
  desc2?: string;
  className?: string;
}) {
  return (
    <div>
      <div
        className={cn("flex gap-4 border rounded-[6px] p-4 w-full", className)}
      >
        {icon}

        <div className="flex flex-col gap-1.5 ">
          <span className="text-xs font-medium  tracking-[-0.01em] ">
            {title}
          </span>
          <span className="text-sm tracking-[-0.01em] whitespace-nowrap text-[#475467]">
            {desc}
          </span>

          {title2 && (
            <span className="text-xs font-medium  tracking-[-0.01em] ">
              {title2}
            </span>
          )}

          {desc2 && (
            <span className="text-sm tracking-[-0.01em] whitespace-nowrap text-[#475467]">
              {desc2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
