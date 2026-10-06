"use client";

import { useEffect } from "react";

export function Vibration() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) {
        navigator.vibrate?.(30);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return null;
}
