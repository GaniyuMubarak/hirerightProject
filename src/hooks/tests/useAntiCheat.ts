import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

interface UseAntiCheatOptions {
  onTabSwitch?: () => void;
  onFullScreenExit?: () => void;
  maxTabSwitches?: number;
}

/**
 * useAntiCheat
 *
 * Detects and responds to cheating behaviour during a test session:
 *   1. Tab switching / window blur  — tracked with a violation counter
 *   2. Fullscreen exit              — warns and re-requests fullscreen
 *   3. Right-click context menu     — suppressed
 *   4. Copy / Cut keyboard shortcuts — suppressed
 *
 * When maxTabSwitches is exceeded the onTabSwitch callback fires,
 * which in TakeTest is wired to auto-submit.
 */
export function useAntiCheat({
  onTabSwitch,
  onFullScreenExit,
  maxTabSwitches = 3,
}: UseAntiCheatOptions) {
  const tabSwitchCount = useRef(0);
  const fsWarningActive = useRef(false);

  // ── 1. Tab switch via Visibility API ───────────────────────────────────────
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      tabSwitchCount.current += 1;
      const remaining = maxTabSwitches - tabSwitchCount.current;

      if (remaining > 0) {
        toast.warning(
          `Warning: Switching tabs is not allowed. ${remaining} warning${remaining !== 1 ? "s" : ""} left before auto-submit.`,
          { id: "anticheat-tab", duration: 5000 },
        );
      } else {
        toast.error(
          "Maximum tab switches exceeded. Your test is being submitted.",
          { id: "anticheat-tab", duration: 5000 },
        );
        onTabSwitch?.();
      }
    }
  }, [maxTabSwitches, onTabSwitch]);

  // ── 2. Window blur covers alt-tab / taskbar / other apps ──────────────────
  const handleWindowBlur = useCallback(() => {
    if (!document.hidden) {
      tabSwitchCount.current += 1;
      const remaining = maxTabSwitches - tabSwitchCount.current;

      if (remaining > 0) {
        toast.warning(
          `Warning: Leaving the test window is not allowed. ${remaining} warning${remaining !== 1 ? "s" : ""} left.`,
          { id: "anticheat-blur", duration: 5000 },
        );
      } else {
        toast.error(
          "Maximum focus losses exceeded. Your test is being submitted.",
          { id: "anticheat-blur", duration: 5000 },
        );
        onTabSwitch?.();
      }
    }
  }, [maxTabSwitches, onTabSwitch]);

  // ── 3. Fullscreen exit ─────────────────────────────────────────────────────
  const handleFullscreenChange = useCallback(() => {
    const isFullscreen = !!document.fullscreenElement;
    if (!isFullscreen && !fsWarningActive.current) {
      fsWarningActive.current = true;
      toast.warning("Please return to fullscreen to continue your test.", {
        id: "anticheat-fs",
        duration: 6000,
      });
      onFullScreenExit?.();

      // Re-request after 3 s
      setTimeout(() => {
        document.documentElement.requestFullscreen?.().catch(() => {});
        fsWarningActive.current = false;
      }, 3000);
    }
  }, [onFullScreenExit]);

  // ── 4. Right-click suppression ─────────────────────────────────────────────
  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    toast.info("Right-click is disabled during the test.", {
      id: "anticheat-ctx",
      duration: 2000,
    });
  }, []);

  // ── 5. Copy / Cut / Paste suppression ─────────────────────────────────────
  const handleCopyCut = useCallback((e: KeyboardEvent) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      ["c", "x", "v"].includes(e.key.toLowerCase())
    ) {
      e.preventDefault();
      toast.info("Copy/paste is disabled during the test.", {
        id: "anticheat-copy",
        duration: 2000,
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleCopyCut);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleCopyCut);
    };
  }, [
    handleVisibilityChange,
    handleWindowBlur,
    handleFullscreenChange,
    handleContextMenu,
    handleCopyCut,
  ]);
}
