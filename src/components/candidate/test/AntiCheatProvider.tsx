import { ReactNode } from "react";
import { useAntiCheat } from "@/hooks/tests/useAntiCheat";

interface AntiCheatProviderProps {
  children: ReactNode;
  onViolation?: () => void;
}

export function AntiCheatProvider({
  children,
  onViolation,
}: AntiCheatProviderProps) {
  useAntiCheat({
    onTabSwitch: onViolation,
    onFullScreenExit: onViolation,
    maxTabSwitches: 3,
  });

  return <>{children}</>;
}
