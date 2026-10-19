"use client";

import Image from "next/image";
import { NewsType } from "../types/types";

type Props = {
  news: NewsType;
};

export function New({ news }: Props) {
  return (
    <article>
      <span>
        {new Date(news.created_at).toLocaleDateString("en-US", {
          day: "numeric",
          weekday: "short",
          month: "short",
          year: "numeric",
        })}
      </span>
      <h3>{news.title}</h3>
      <div>
        <Image alt="" src={news.image} width={200} height={200} />
      </div>
      <span>posted by: {news.author}</span>
      <p>{news.news}</p>
    </article>
  );
}
