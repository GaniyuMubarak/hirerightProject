import { cn } from "@/lib/utils";
import { ReactElement } from "react";

export default function StatsCard({
  className,
  value,
  description,
  icon,
}: {
  className?: string;
  value?: string | number;
  description?: string | number;
  icon: ReactElement;
}) {
  return (
    <div
      className={cn(
        "w-full flex justify-between p-8 border rounded-[6px]",
        className
      )}
    >
      <header className="space-y-4">
        <h3 className="text-3xl text-[#14151A] font-semibold">{value}</h3>
        <p className="text-[#0F132499] font-medium">{description}</p>
      </header>

      <div className="h-20 w-20 rounded-full bg-white flex justify-center items-center">
        {icon}
      </div>
    </div>
  );
}
