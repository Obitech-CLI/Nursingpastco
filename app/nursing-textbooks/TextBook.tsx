"use client";

import Image from "next/image";
import { TextbookType } from "../types/types";

type Prop = {
  textbook: TextbookType;
};

export function TextBook({ textbook }: Prop) {
  return (
    <div>
      <button type="button">
        <Image src={textbook.cover} alt="" width={100} height={200} />
      </button>
    </div>
  );
}
