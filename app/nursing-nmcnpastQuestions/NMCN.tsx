"use client";

import { NMCNType } from "../types/types";

type Prop = {
  nmc: NMCNType;
};

export function NMCN({ nmc }: Prop) {
  return (
    <div>
      <button type="button">{nmc.title}</button>
    </div>
  );
}
