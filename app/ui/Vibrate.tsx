"use client";

import { useEffect } from "react";

export function Vibration() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) {
        navigator.vibrate?.(30);
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);
  return null;
}
