"use client";

import Image from "next/image";
import { RecommendationType } from "../types/types";
import Link from "next/link";
import { Link2 } from "lucide-react";

type Props = {
  recommendation: RecommendationType;
};

export function Recommendation({ recommendation }: Props) {
  return (
    <article>
      <span>
        {new Date(recommendation.created_at).toLocaleDateString("en-US", {
          day: "numeric",
          weekday: "short",
          month: "short",
          year: "numeric",
        })}
      </span>
      <h3>{recommendation.title}</h3>
      <div>
        <Image alt="" src={recommendation.image} width={500} height={200} />
      </div>
      <span>posted by: {recommendation.author}</span>
      <h4>{recommendation.recommendation}</h4>
      <Link href={recommendation.link}>
        <Link2 />
        goto recommendation
      </Link>
    </article>
  );
}
