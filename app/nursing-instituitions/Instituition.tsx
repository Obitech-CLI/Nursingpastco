"use client";

import Image from "next/image";
import { InstitutionType } from "./Instituitions";

type Props = {
  instituition: InstitutionType;
};

export function Instituition({ instituition }: Props) {
  return (
    <article>
      <h2>{instituition.abbr}</h2>
      <Image
        src={instituition.logo}
        alt=""
        width={200}
        height={200}
        loading="eager"
      />
      <h3>{instituition.name}</h3>
      <p>{instituition.about}</p>
    </article>
  );
}
