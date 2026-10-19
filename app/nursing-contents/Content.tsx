"use client";

import Image from "next/image";
import { ContentType } from "../types/types";

type Props = {
  content: ContentType;
};

export function Content({ content }: Props) {
  return (
    <>
      <article>
        <span>
          {new Date(content.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            weekday: "short",
            month: "short",
            year: "numeric",
          })}
        </span>
        <h3>{content.title}</h3>
        <div>
          {["mp4", "webm", "mov", "m4v"].includes(
            content.file.slice(content.file.lastIndexOf(".") + 1).toLowerCase(),
          ) && <video src={content.file} controls />}
          {["jpg", "jpeg", "png", "gif", "webp", "avif", "svg"].includes(
            content.file.slice(content.file.lastIndexOf(".") + 1).toLowerCase(),
          ) && (
            <Image
              alt=""
              src={content.file}
              width={200}
              height={200}
              loading="eager"
            />
          )}
        </div>
        <span>posted by: {content.author}</span>
        <p>{content.content}</p>
      </article>
    </>
  );
}
