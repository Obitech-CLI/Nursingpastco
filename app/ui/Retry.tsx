"use client";

import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export function RetryButton() {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.refresh()}>
      <RotateCcw /> retry
    </button>
  );
}
