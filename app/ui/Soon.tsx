"use client";

import { Clock3, Rocket } from "lucide-react";

export function ComingSoon() {
  return (
    <div className="coming-soon">
      <h1>Coming Soon</h1>
      <Clock3 size={100} color="var(--bg-txt)" />
      <div>
        stay tuned
        <Rocket size={30} />
      </div>
    </div>
  );
}
