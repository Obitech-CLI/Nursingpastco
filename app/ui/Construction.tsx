"use client";

import { Construction } from "lucide-react";

export function UnderConstruction() {
  return (
    <div className="construction">
      <h1>building feature</h1>
      <Construction size={100} color="var(--bg-txt)" />
    </div>
  );
}
