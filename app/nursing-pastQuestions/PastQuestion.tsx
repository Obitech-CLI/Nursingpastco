"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PastQuestionType } from "../types/types";

type Props = {
  pastQuestion: PastQuestionType;
  course?: string;
};

export function PastQuestion({ pastQuestion, course }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("course", "");
    router.replace(`/nursing-pastQuestions?${params}`);
  };

  useEffect(() => {
    document.body.style.overflow = course ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [course]);
  return (
    <div
      className="select pastQuestion_pdf"
      style={{
        padding: "7.8rem 0 4rem",
      }}
    >
      <button
        type="button"
        onClick={handleSearch}
        style={{
          padding: "0",
          backgroundColor: "transparent",
        }}
      >
        <X />
      </button>
      <h3>{pastQuestion.title}</h3>
      <iframe
        src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pastQuestion.pdf)}`}
        width="100%"
        height="100%"
      />
    </div>
  );
}
