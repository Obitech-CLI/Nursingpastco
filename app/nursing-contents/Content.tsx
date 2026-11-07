"use client";

import Image from "next/image";
import { ContentType } from "../types/types";
import { useState } from "react";

type Props = {
  content: ContentType;
};

export function Content({ content }: Props) {
  const [show, setShow] = useState(false);
  return (
    <>
      <article>
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
        <p className={show ? "show" : ""}>{content.content}</p>
        <button type="button" onClick={() => setShow(!show)}>
          {show ? "finish reading" : "continue reading"}
        </button>
      </article>
    </>
  );
}
