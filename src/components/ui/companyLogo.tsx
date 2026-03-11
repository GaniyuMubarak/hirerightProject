

import { cn } from "@/lib/utils";
import { useState } from "react";

const PALETTE: string[][] = [
  ["#1D4ED8", "#3B82F6"],
  ["#6D28D9", "#8B5CF6"],
  ["#0F766E", "#14B8A6"],
  ["#B45309", "#F59E0B"],
  ["#BE123C", "#FB7185"],
  ["#15803D", "#4ADE80"],
  ["#C2410C", "#FB923C"],
  ["#7C3AED", "#A78BFA"],
];

function getGradient(name: string) {
  const [from, to] = PALETTE[name.charCodeAt(0) % PALETTE.length];
  return { from, to };
}

interface CompanyLogoProps {
  logoUrl?: string | null;
  companyName?: string;
  size?: "sm" | "lg";
  className?: string;
}

const sizes = {
  sm: { container: "h-[55px] w-[55px]", text: "text-xl" },
  lg: {
    container: "w-10 h-10 lg:h-[100px] lg:w-[100px]",
    text: "text-xl lg:text-4xl",
  },
};

export default function CompanyLogo({
  logoUrl,
  companyName = "",
  size = "sm",
  className,
}: CompanyLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const { container, text } = sizes[size];
  const initial = companyName.trim().charAt(0).toUpperCase() || "?";
  const { from, to } = getGradient(companyName || "?");

  return (
    <div
      className={cn(
        "rounded-[8px] overflow-hidden flex-shrink-0 relative",
        "shadow-[0px_1px_2px_rgba(16,24,40,0.06),0px_1px_3px_rgba(16,24,40,0.10)]",
        "ring-1 ring-black/[0.06]",
        container,
        className,
      )}>
      {logoUrl && !imgFailed ? (
        <img
          src={logoUrl}
          alt={companyName}
          className="object-contain w-full h-full p-1.5 bg-white"
          onError={() => setImgFailed(true)}
        />
      ) : (
        // Fallback — shown only when no logo was provided or image fails to load
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
          }}>
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "120px 120px",
            }}
          />
          <span
            className={cn(
              "relative font-semibold text-white tracking-tight leading-none select-none",
              "drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]",
              text,
            )}>
            {initial}
          </span>
        </div>
      )}
    </div>
  );
}
