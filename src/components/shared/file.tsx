import React from "react";

export default function File({
  icon,
  title,
  size,
}: {
  icon: React.ReactElement;
  title: string;
  size: string;
}) {
  return (
    <div className="flex gap-3 items-center border rounded-[12px] py-4 px-6 h-fit">
      {icon}
      <div className="flex flex-col">
        <p className="text-sm font-medium text-[#101828]">{title}</p>
        <p className="text-sm text-[#475467]">{size}</p>
      </div>
    </div>
  );
}
