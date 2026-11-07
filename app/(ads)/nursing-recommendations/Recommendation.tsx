"use client";

import Image from "next/image";
import { RecommendationType } from "../../types/types";
import Link from "next/link";
import { Link2 } from "lucide-react";

type Props = {
  recommendation: RecommendationType;
};

export function Recommendation({ recommendation }: Props) {
  return (
    <article>
      <h3>{recommendation.title}</h3>
      <Image
        alt=""
        src={recommendation.image}
        width={300}
        height={200}
        loading="eager"
      />
      <h4>{recommendation.recommendation}</h4>
      <Link href={recommendation.link}>
        <Link2 />
        goto recommendation
      </Link>
    </article>
  );
}
